# SaySo Onboarding Flow — Implementation Plan

## Overview

A 7-screen onboarding flow that launches when a user clicks **"Activate Sayso"** anywhere on the V4 landing page. The flow uses an engagement-first micro-commitment strategy: easy emotional/behavioral questions first, contact info last, ending with a mock Stripe checkout. The entire flow is **UI/UX only** — no data is persisted or sent anywhere.

The page is **clean and distraction-free** (no navbar, no footer) but inherits the V4 visual language: same colors, fonts, sizing, and rounded card aesthetic — without the comic-book effects (no halftone, starburst, ZAP/BOOM badges, or tilted cards).

---

## Tech Stack (matches existing project)

| Concern | Tool |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS (existing config + CSS custom properties) |
| Animation | Framer Motion (already installed, v12.29.2) |
| Fonts | Manrope (headings), Helvetica Neue (body) — already loaded in `layout.tsx` |
| State | React `useState` (local component state only, no persistence) |

---

## Design Tokens (from existing `tailwind.config.ts` and `globals.css`)

```
Primary (text, borders):   #1D4871
CTA (buttons, accents):    #2367EE
Accent (highlights):       #FFDE59
Background (page):         #F4F4F5
Accent BG (cards):         #D7DEE1
White:                     #FFFFFF
```

### Typography (from tailwind config)
- **Headings:** `font-hero` (Manrope 700) — used for screen headers
- **Body:** `font-sans` (Helvetica Neue) — used for descriptions, labels
- **Sizes:** `text-hero` (30px), `text-heading` (18px), `text-body` (16px), `text-small` (12px)
- Screen headers should use `text-2xl md:text-3xl lg:text-4xl font-bold text-[#1D4871]`
- Subheadings/descriptions: `text-base md:text-lg text-[#1D4871]/70`

---

## File Structure

```
app/
  get-started/
    page.tsx                    ← Route entry point (Server Component)
    layout.tsx                  ← Clean layout (no navbar/footer)

components/
  onboarding/
    OnboardingFlow.tsx          ← Main client component (state machine, screen router)
    OnboardingProgress.tsx      ← Progress bar + SaySo logo header
    OnboardingNavButtons.tsx    ← Back / Continue buttons (shared across screens)
    screens/
      FeelingCheckScreen.tsx    ← Screen 1: Emoji emotion cards
      CallFrequencyScreen.tsx   ← Screen 2: Vertical selection list
      SupportTechScreen.tsx     ← Screen 3: Multi-select toggle cards
      LeadTypeScreen.tsx        ← Screen 4: Collapsible multi-select chips
      GoalsScreen.tsx           ← Screen 5: Home sale range selector + commission calc
      ContactInfoScreen.tsx     ← Screen 6: Form (name, email, phone, company)
      AnalyzingScreen.tsx       ← Screen 6.5: Loading/analyzing animation
      VerdictScreen.tsx         ← Screen 7: "SaySo is perfect for you" + mock Stripe
```

---

## Routing & Layout

### `app/get-started/layout.tsx`
- A **minimal layout** with no navbar and no footer
- White background, vertically centered content
- Only renders the SaySo logo at the top (small, horizontal variant: `/logo-pos-horizontal.png`)
- The progress bar lives in the `OnboardingProgress` component, which this layout includes

### `app/get-started/page.tsx`
- Server Component that renders `<OnboardingFlow />`
- No props needed — all state is internal

### Navigation Update
- In `SaysoNavbar.tsx`: Change all `href="#get-started"` links to `href="/get-started"`
- In `HeroWithVideo.tsx`: Change the "Activate Sayso" button to `href="/get-started"` (currently calls `openDemoCalendar()`)
- In `TransformationSectionV4.tsx`: Change the "Activate Sayso" `<a>` tag `href` from `#get-started` to `/get-started`

---

## Shared Components

### `OnboardingProgress.tsx`
A thin header bar pinned to the top of every screen.

**Layout:**
```
┌──────────────────────────────────────────────┐
│  [SaySo Logo]                    Step 3 of 7 │
│  ████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
└──────────────────────────────────────────────┘
```

**Specs:**
- SaySo logo: `/logo-pos-horizontal.png`, height `h-6 md:h-8`
- Step indicator: `text-small text-[#1D4871]/50 font-sans`
- Progress bar: Full-width bar below header, `h-1.5 rounded-full bg-[#D7DEE1]`
- Fill: `bg-[#2367EE]` with `transition-all duration-500 ease-out`
- Progress percentage = `(currentStep / totalSteps) * 100`
- Total steps = 7 (the analyzing screen does NOT count as a step)
- Max-width container: `max-w-2xl mx-auto px-6`

### `OnboardingNavButtons.tsx`
Persistent bottom navigation for every question screen.

**Layout:**
```
┌──────────────────────────────────────────────┐
│  [← Back]                        [Continue →]│
└──────────────────────────────────────────────┘
```

**Specs:**
- **Continue button:** `rounded-full bg-[#2367EE] text-white font-bold px-8 py-3.5 text-lg` — matches the existing V4 CTA button style
- **Back button:** `rounded-full bg-white text-[#1D4871] font-bold px-6 py-3.5 text-lg border-2 border-[#1D4871]`
- Continue is **disabled** (opacity-50, pointer-events-none) until the user makes a selection on the current screen
- Back button is **hidden** on Screen 1
- Both buttons have `focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2`
- Fixed to bottom of viewport on mobile: `fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#D7DEE1] md:relative md:border-0 md:mt-10`

---

## Main Controller: `OnboardingFlow.tsx`

### State Shape
```typescript
interface OnboardingState {
  currentStep: number;                    // 1-7 (analyzing is a substep of 6→7)
  feeling: string | null;                 // Screen 1
  callFrequency: string | null;           // Screen 2
  support: string[];                      // Screen 3 (multi-select)
  leadTypes: string[];                    // Screen 4 (multi-select)
  homesTarget: string | null;             // Screen 5 (range selection)
  commissionGoal: number;                 // Screen 5 (auto-calculated)
  contactInfo: {                          // Screen 6
    fullName: string;
    email: string;
    phone: string;
    company: string;
  };
  isAnalyzing: boolean;                   // Controls analyzing animation
}
```

### Screen Transitions
- Use **Framer Motion `AnimatePresence`** with horizontal slide animations
- Going **forward** (Next): slide current screen left, new screen enters from right
- Going **back**: slide current screen right, new screen enters from left
- Animation config: `x: ±300, opacity: 0 → 1, duration: 0.3s, ease: easeInOut`

### Screen Router Logic
```
currentStep === 1  → <FeelingCheckScreen />
currentStep === 2  → <CallFrequencyScreen />
currentStep === 3  → <SupportTechScreen />
currentStep === 4  → <LeadTypeScreen />
currentStep === 5  → <GoalsScreen />
currentStep === 6  → <ContactInfoScreen />
isAnalyzing        → <AnalyzingScreen />       (auto-advances after animation)
currentStep === 7  → <VerdictScreen />
```

---

## Screen Specifications

### Screen 1: The Feeling Check
**Component:** `FeelingCheckScreen.tsx`

**Header:** "When you think about making sales calls, how do you feel?"
- Style: `text-2xl md:text-3xl lg:text-4xl font-bold text-[#1D4871] text-center`

**UI:** Grid of large clickable cards (radio selection — only one active at a time)

**Card Grid:** `grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto mt-8`

**Options:**

| Emoji | Label |
|-------|-------|
| 😰 | Anxious |
| 😬 | Nervous |
| 😨 | Scared |
| 🤩 | Excited |
| 😎 | Confident |

**Card Specs (unselected):**
```
rounded-2xl bg-white border-2 border-[#D7DEE1] p-6 cursor-pointer
text-center transition-all duration-200
hover:border-[#2367EE] hover:shadow-md
```

**Card Specs (selected):**
```
rounded-2xl bg-[#2367EE]/5 border-2 border-[#2367EE] p-6 cursor-pointer
text-center shadow-md ring-2 ring-[#2367EE]/20
```

**Card Content:**
- Emoji: `text-4xl md:text-5xl mb-2` (plain emoji character, not an image)
- Label: `text-base font-bold text-[#1D4871]`

---

### Screen 2: Call Frequency
**Component:** `CallFrequencyScreen.tsx`

**Header:** "How often do you currently make sales calls?"

**UI:** Vertical selection list (radio — one selection)

**List Container:** `flex flex-col gap-3 max-w-md mx-auto mt-8`

**Options:**
1. Daily
2. 2-3 times a week
3. Once a week
4. I'm just getting started

**Item Specs (unselected):**
```
w-full rounded-xl bg-white border-2 border-[#D7DEE1] px-6 py-4 cursor-pointer
text-left transition-all duration-200
hover:border-[#2367EE] hover:shadow-sm
flex items-center justify-between
```

**Item Specs (selected):**
```
w-full rounded-xl bg-[#2367EE]/5 border-2 border-[#2367EE] px-6 py-4 cursor-pointer
text-left shadow-sm ring-2 ring-[#2367EE]/20
flex items-center justify-between
```

**Item Content:**
- Label: `text-lg font-semibold text-[#1D4871]` (left-aligned)
- Selected indicator: A blue circle with white checkmark on the right side
  - Unselected: `w-6 h-6 rounded-full border-2 border-[#D7DEE1]`
  - Selected: `w-6 h-6 rounded-full bg-[#2367EE] flex items-center justify-center` with white check SVG

---

### Screen 3: Support & Tech Stack
**Component:** `SupportTechScreen.tsx`

**Header:** "Do you currently use any technology for making calls or have a conversation coach?"

**UI:** Multi-select toggle cards (user can select multiple)

**Card Container:** `flex flex-col gap-3 max-w-md mx-auto mt-8`

**Options:**
1. 🎯 I have a conversation coach
2. 💻 I use sales technology tools
3. 🙋 I'm currently working solo

**Card Specs (unselected):**
```
w-full rounded-xl bg-white border-2 border-[#D7DEE1] px-6 py-4 cursor-pointer
text-left transition-all duration-200
hover:border-[#2367EE] hover:shadow-sm
flex items-center gap-4
```

**Card Specs (selected):**
```
w-full rounded-xl bg-[#2367EE]/5 border-2 border-[#2367EE] px-6 py-4 cursor-pointer
text-left shadow-sm ring-2 ring-[#2367EE]/20
flex items-center gap-4
```

**Card Content:**
- Emoji: `text-2xl` (left side)
- Label: `text-lg font-semibold text-[#1D4871]` (right of emoji)
- Checkbox indicator (right side):
  - Unselected: `w-6 h-6 rounded-md border-2 border-[#D7DEE1] ml-auto`
  - Selected: `w-6 h-6 rounded-md bg-[#2367EE] ml-auto flex items-center justify-center` with white check

**Note:** Continue button is enabled if at least one option is selected.

---

### Screen 4: Lead Specialization
**Component:** `LeadTypeScreen.tsx`

**Header:** "What types of leads do you focus on?"

**UI:** Multi-select chips/tags organized under collapsible category headers

**Container:** `max-w-lg mx-auto mt-8 flex flex-col gap-6`

**Categories (collapsible sections):**

**Category Header:**
```
flex items-center justify-between cursor-pointer py-2
```
- Category name: `text-lg font-bold text-[#1D4871]`
- Chevron icon: Rotates 180deg when expanded (`transition-transform duration-200`)
- Default state: Both categories **expanded**

**Category 1: Sellers**
- Chips: `Expireds`, `FSBOs (For Sale By Owner)`

**Category 2: Buyers**
- Chips: `Portal Leads`, `Pond Leads`, `Open House Leads`

**Chip Specs (unselected):**
```
inline-flex items-center px-4 py-2 rounded-full bg-white border-2 border-[#D7DEE1]
text-sm font-semibold text-[#1D4871] cursor-pointer
transition-all duration-200
hover:border-[#2367EE] hover:bg-[#2367EE]/5
```

**Chip Specs (selected):**
```
inline-flex items-center px-4 py-2 rounded-full bg-[#2367EE] border-2 border-[#2367EE]
text-sm font-semibold text-white cursor-pointer
```

**Chip Container (per category):** `flex flex-wrap gap-2 mt-2`

**Note:** Continue enabled if at least one chip is selected.

---

### Screen 5: The North Star (Goals)
**Component:** `GoalsScreen.tsx`

**Header:** "What are your targets for the next 12 months?"

**UI:** Two question blocks stacked vertically

**Container:** `max-w-md mx-auto mt-8 flex flex-col gap-8`

#### Question 1: "How many homes do you want to sell?"

**UI:** Horizontal selection cards (radio — one selection)

**Card Container:** `grid grid-cols-2 sm:grid-cols-4 gap-3`

**Options:**

| Label |
|-------|
| 1–5 |
| 5–10 |
| 10–20 |
| 25+ |

**Card Specs (unselected):**
```
rounded-xl bg-white border-2 border-[#D7DEE1] py-4 px-2 cursor-pointer
text-center transition-all duration-200
hover:border-[#2367EE] hover:shadow-sm
```

**Card Specs (selected):**
```
rounded-xl bg-[#2367EE]/5 border-2 border-[#2367EE] py-4 px-2 cursor-pointer
text-center shadow-sm ring-2 ring-[#2367EE]/20
```

**Card Content:** `text-xl font-bold text-[#1D4871]`

#### Question 2: "How much commission will that earn you?"

**UI:** Auto-calculated read-only display that updates when the user selects a home range above.

**Calculation Logic (hard-coded defaults):**
```typescript
const AVG_HOME_PRICE = 420_000;
const AVG_COMMISSION_RATE = 0.03; // 3%
const commissionPerHome = AVG_HOME_PRICE * AVG_COMMISSION_RATE; // $12,600

// Use midpoint of selected range:
// "1–5"   → midpoint 3   → $37,800
// "5–10"  → midpoint 7.5 → $94,500
// "10–20" → midpoint 15  → $189,000
// "25+"   → use 30       → $378,000
```

**Display:**
```
┌─────────────────────────────────────────┐
│  💰 Estimated Commission                │
│  $189,000                               │
│  Based on 15 homes × $12,600 avg        │
└─────────────────────────────────────────┘
```

**Display Specs:**
```
rounded-xl bg-[#FFDE59]/10 border-2 border-[#FFDE59] p-6 text-center
```
- Label: `text-sm font-semibold text-[#1D4871]/60 uppercase tracking-wide`
- Amount: `text-4xl md:text-5xl font-bold text-[#1D4871] mt-2` — animate on change with Framer Motion `layoutId` or number counter
- Subtitle: `text-sm text-[#1D4871]/50 mt-1`

**Note:** Continue enabled when a home range is selected. Commission display is hidden until a range is selected.

---

### Screen 6: Identity & Company
**Component:** `ContactInfoScreen.tsx`

**Header:** "Almost there! Where should we send your custom setup?"

**UI:** Traditional form with 4 fields

**Form Container:** `max-w-md mx-auto mt-8 flex flex-col gap-5`

**Fields:**

| Field | Type | Placeholder | Required |
|-------|------|-------------|----------|
| Full Name | text | "Jane Smith" | Yes |
| Email Address | email | "jane@example.com" | Yes |
| Phone Number | tel | "(555) 123-4567" | Yes |
| Company Name | text | "Acme Realty" | Yes |

**Input Specs:**
```
w-full rounded-xl border-2 border-[#D7DEE1] px-5 py-3.5 text-lg text-[#1D4871]
placeholder:text-[#1D4871]/30 font-sans
transition-all duration-200
focus:outline-none focus:border-[#2367EE] focus:ring-2 focus:ring-[#2367EE]/20
```

**Label Specs:**
```
text-sm font-bold text-[#1D4871] mb-1.5 block
```

**Validation:**
- Email: Basic regex check (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- Phone: At least 10 digits after stripping non-numeric characters
- Name and Company: Non-empty after trimming
- Show inline error text below invalid fields: `text-sm text-red-500 mt-1`
- Validation runs on blur and on Continue click
- Continue button text changes to **"See My Results"** on this screen

---

### Screen 6.5: Analyzing Animation
**Component:** `AnalyzingScreen.tsx`

This is a **full-screen transitional animation** that plays between Screen 6 and Screen 7. It is NOT a step in the progress bar — the progress bar stays at step 6 during this screen, then jumps to full (step 7) when the verdict appears.

**Duration:** ~3.5 seconds total, then auto-advances to Screen 7.

**Layout:** Centered vertically and horizontally, no nav buttons visible.

**Animation Sequence:**

| Time | Text | Icon |
|------|------|------|
| 0.0s | "Analyzing your responses..." | Spinning loader |
| 1.2s | "Building your custom profile..." | Spinning loader |
| 2.4s | "Crunching the numbers..." | Spinning loader |
| 3.2s | Fade out, auto-advance to Screen 7 | — |

**Specs:**
- Text: `text-xl md:text-2xl font-bold text-[#1D4871] text-center` — fades in/out for each message
- Spinner: A circular SVG spinner in `text-[#2367EE]`, 40x40px, `animate-spin`
- Background: Same `bg-[#F4F4F5]` as other screens
- Use Framer Motion `AnimatePresence` with `mode="wait"` to crossfade each text message
- After the last message, call `setIsAnalyzing(false)` and `setCurrentStep(7)`

---

### Screen 7: The Verdict & Mock Stripe Checkout
**Component:** `VerdictScreen.tsx`

This screen has **two sections** stacked vertically: the personalized verdict at the top, and a mock Stripe checkout below.

**No Back button on this screen.** No standard nav buttons — custom CTA only.

#### Section 1: The Verdict

**Layout:**
```
┌──────────────────────────────────────────────┐
│                    🎉                        │
│          SaySo is perfect for you!           │
│                                              │
│  Based on your goal to earn $189,000 in      │
│  commission, our tools are designed to help   │
│  you bridge the gap. Start your 3-day trial   │
│  to get full access.                          │
└──────────────────────────────────────────────┘
```

**Specs:**
- Emoji: `text-5xl md:text-6xl mb-4` (centered)
- Headline: `text-3xl md:text-4xl font-bold text-[#1D4871] text-center`
- Subtext: `text-base md:text-lg text-[#1D4871]/70 text-center max-w-md mx-auto mt-4 leading-relaxed`
- Dynamic value: Insert `commissionGoal` formatted as USD currency (e.g., `$189,000`). If no range was selected on Screen 5 (shouldn't happen due to validation), fall back to `"your commission goals"`.
- Entrance animation: `Framer Motion` fade-in + scale from 0.95 to 1, duration 0.5s

#### Section 2: Mock Stripe Checkout

**Container:** `max-w-md mx-auto mt-10 rounded-2xl border-2 border-[#D7DEE1] bg-white p-6 md:p-8`

**Layout:**
```
┌──────────────────────────────────────────────┐
│  SaySo Pro — 3-Day Free Trial               │
│  ──────────────────────────────────────────  │
│                                              │
│  💳  Card Number                             │
│  ┌──────────────────────────────────────┐    │
│  │  4242 4242 4242 4242                 │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  Expiry            CVC                       │
│  ┌──────────────┐  ┌──────────────┐          │
│  │  12 / 28     │  │  123         │          │
│  └──────────────┘  └──────────────┘          │
│                                              │
│  Then $49/mo after trial                     │
│                                              │
│  ┌──────────────────────────────────────┐    │
│  │     ⚡ Start Free Trial              │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  🔒 Secured by Stripe                       │
└──────────────────────────────────────────────┘
```

**This is entirely a UI mockup — no Stripe integration.**

**Specs:**
- **Plan header:** `text-xl font-bold text-[#1D4871]`
- **Divider:** `h-px bg-[#D7DEE1] my-4`
- **Input fields:** Same input style as Screen 6 fields but **pre-filled with placeholder values** and **read-only**
  - Card: `4242 4242 4242 4242`
  - Expiry: `12 / 28`
  - CVC: `123`
- **Price text:** `text-sm text-[#1D4871]/60 mt-4`
- **CTA button:**
  ```
  w-full rounded-full bg-[#2367EE] text-white font-bold text-lg py-4 mt-6
  flex items-center justify-center gap-2
  hover:bg-[#1b56cc] transition-colors
  ```
  - Lightning bolt SVG icon (same one used in navbar) before text
  - Text: "Start Free Trial"
  - On click: `alert('This is a demo! Stripe checkout would launch here.')` or show a small toast/modal
- **Security badge:** `flex items-center justify-center gap-2 mt-4 text-sm text-[#1D4871]/40`
  - Lock icon (🔒 or SVG) + "Secured by Stripe"

---

## Animations & Transitions

### Screen Transitions (Framer Motion)
```typescript
// In OnboardingFlow.tsx
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

// direction = 1 for forward, -1 for back
<AnimatePresence mode="wait" custom={direction}>
  <motion.div
    key={currentStep}
    custom={direction}
    variants={variants}
    initial="enter"
    animate="center"
    exit="exit"
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
    {renderCurrentScreen()}
  </motion.div>
</AnimatePresence>
```

### Card/Chip Selection
- On select: brief `scale(0.97)` → `scale(1)` bounce using `transition: transform 0.15s ease`
- Border color transitions: `transition-all duration-200`

### Commission Number Counter (Screen 5)
- When the home range changes, animate the commission value counting up/down
- Use Framer Motion `useSpring` or a simple `requestAnimationFrame` counter
- Duration: ~600ms

### Analyzing Screen Text Cycle
- Each message fades in (`opacity: 0 → 1, y: 10 → 0`) over 300ms
- Holds for ~900ms
- Fades out (`opacity: 1 → 0, y: 0 → -10`) over 200ms
- Next message begins

---

## Page Layout Structure

Every screen shares this layout:

```
┌────────────────────────────────────────────────┐
│ [Logo]                           Step X of 7   │  ← OnboardingProgress
│ ████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
├────────────────────────────────────────────────┤
│                                                │
│              [Screen Header]                   │
│              [Screen Subtext]                  │  ← Vertically centered
│                                                │     content area
│              [Interactive UI]                  │
│                                                │
│                                                │
├────────────────────────────────────────────────┤
│ [← Back]                        [Continue →]   │  ← OnboardingNavButtons
└────────────────────────────────────────────────┘
```

**Page wrapper:**
```
min-h-screen bg-[#F4F4F5] flex flex-col
```

**Content area:**
```
flex-1 flex flex-col items-center justify-center px-6 py-8
max-w-2xl mx-auto w-full
```

**Mobile considerations:**
- Nav buttons stick to bottom of viewport on small screens
- Content area has `pb-24 md:pb-0` to account for fixed bottom nav on mobile
- Cards and form fields are full-width on mobile, max-width constrained on desktop

---

## Implementation Order

### Phase 1: Scaffolding
1. Create `app/get-started/layout.tsx` (clean layout)
2. Create `app/get-started/page.tsx` (renders OnboardingFlow)
3. Create `components/onboarding/OnboardingFlow.tsx` (state + screen router + transitions)
4. Create `components/onboarding/OnboardingProgress.tsx`
5. Create `components/onboarding/OnboardingNavButtons.tsx`

### Phase 2: Screens (build in order)
6. Screen 1: `FeelingCheckScreen.tsx`
7. Screen 2: `CallFrequencyScreen.tsx`
8. Screen 3: `SupportTechScreen.tsx`
9. Screen 4: `LeadTypeScreen.tsx`
10. Screen 5: `GoalsScreen.tsx`
11. Screen 6: `ContactInfoScreen.tsx`
12. Screen 6.5: `AnalyzingScreen.tsx`
13. Screen 7: `VerdictScreen.tsx`

### Phase 3: Polish & Connect
14. Wire up Framer Motion slide transitions between screens
15. Add the analyzing animation sequence
16. Update `SaysoNavbar.tsx` — change `#get-started` hrefs to `/get-started`
17. Update `HeroWithVideo.tsx` — change "Activate Sayso" to link to `/get-started`
18. Update `TransformationSectionV4.tsx` — change "Activate Sayso" href to `/get-started`
19. Test full flow on mobile and desktop
20. Verify all V4 visual consistency (colors, fonts, spacing, border-radius)

---

## CSS to Add to `globals.css`

```css
/* === Onboarding Flow === */

/* Spinner for analyzing screen */
@keyframes onboardingSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.onboarding-spinner {
  animation: onboardingSpin 1s linear infinite;
}
```

No other custom CSS is needed — everything else uses existing Tailwind utilities and the existing design tokens already defined in `tailwind.config.ts`.

---

## Key Implementation Notes

1. **No data persistence.** All state lives in `OnboardingFlow.tsx` via `useState`. Refreshing the page resets everything.
2. **No API calls.** The contact form doesn't submit anywhere. The Stripe checkout is a visual mockup only.
3. **No comic-book effects.** Do NOT use: `v2-halftone`, `v2-starburst`, `v2-comic-shadow`, `v2-tilt-*`, `v2-pow-badge`, `v4-hero-glow`, `v4-hero-float`, or `SoundEffectBadge`. Keep it clean.
4. **DO use:** The V4 color palette, font families, font sizes, `rounded-xl`/`rounded-2xl` border radiuses, and the `border-2 border-[#D7DEE1]` → `border-2 border-[#2367EE]` selection pattern.
5. **Mobile-first.** Build for mobile, then adjust for desktop breakpoints (`md:`, `lg:`).
6. **Accessibility:** All interactive elements need `focus-visible` rings. Cards should be keyboard navigable (use `role="radio"` / `role="checkbox"` with proper ARIA attributes, or use actual hidden inputs with styled labels).
