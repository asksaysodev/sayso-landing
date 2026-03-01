# SaySo Onboarding Flow — Implementation Reference

## Overview

A branching onboarding flow that launches at `/start`. Users are routed into one of two paths based on their role:

- **Path A** — Individual Agent or Team Agent → 6 question steps
- **Path B** — Team Lead or Office Broker/Manager → 7 question steps

Both paths share a welcome screen, the role-selection question, a "Sayso is activating" animation, a contact info form, an analyzing animation, and a paywall. The final paywall screen adapts further based on **Mac vs PC** selection.

The flow is **UI/UX only** — no data is persisted or sent anywhere.

---

## Flow Diagram

Copy the diagram below into a Google Doc using a monospace font (e.g. Courier New, Consolas).

```
                        +-------------------------------+
                        |           WELCOME             |
                        |     "Welcome to Sayso"        |
                        |       [Get Started]           |
                        +---------------+---------------+
                                        |
                        +---------------v---------------+
                        |    STEP 1  -  ROLE            |
                        |    "What is your role?"       |
                        +---------------+---------------+
                                        |
              +-------------------------+-------------------------+
              |                                                   |
              | Individual Agent / Team Agent                     | Team Lead / Office Broker/Manager
              v                                                   v
  +-----------+----------------+                 +---------------+----------+
  |       PATH A               |                 |       PATH B             |
  |  Individual / Team Agent   |                 |  Team Lead / Broker      |
  |      6 question steps      |                 |      7 question steps    |
  +-----------+----------------+                 +---------------+----------+
              |                                                   |
  +-----------v----------------+                 +---------------v----------+
  |  STEP 2                    |                 |  STEP 2                  |
  |  "How do you feel when you |                 |  "How many agents are on |
  |   think about making       |                 |   your team?"            |
  |   calls?"                  |                 |  + "How many make calls  |
  |  (emoji card - pick one)   |                 |    consistently?"        |
  +-----------+----------------+                 |  (slider + radio)        |
              |                                  +---------------+----------+
  +-----------v----------------+                                 |
  |  STEP 3                    |                 +---------------v----------+
  |  "How often do you make    |                 |  STEP 3                  |
  |   prospecting calls?"      |                 |  "How confident are you  |
  |  (pick one)                |                 |   in your agents during  |
  +-----------+----------------+                 |   live prospecting       |
              |                                  |   conversations?"        |
  +-----------v----------------+                 |  (1-5 emoji scale)       |
  |  STEP 4                    |                 +---------------+----------+
  |  "What's helping you       |                                 |
  |   create better            |                 +---------------v----------+
  |   conversations?"          |                 |  STEP 4                  |
  |  (multi-select)            |                 |  "How often does your    |
  +-----------+----------------+                 |   average team agent     |
              |                                  |   have dedicated         |
  +-----------v----------------+                 |   prospecting blocks?"   |
  |  STEP 5                    |                 |  (pick one)              |
  |  "What types of calls do   |                 +---------------+----------+
  |   you make consistently?"  |                                 |
  |  (chips - Sellers/Buyers)  |                 +---------------v----------+
  +-----------+----------------+                 |  STEP 5                  |
              |                                  |  "How do you help your   |
  +-----------v----------------+                 |   agents create better   |
  |  STEP 6                    |                 |   conversations?"        |
  |  "What type of computer    |                 |  (multi-select)          |
  |   do you use?"             |                 +---------------+----------+
  |  Mac  /  PC                |                                 |
  +-----------+----------------+                 +---------------v----------+
              |                                  |  STEP 6                  |
              |                                  |  "What leads do your     |
              |                                  |   agents call?"          |
              |                                  |  (chips - Sellers/Buyers)|
              |                                  +---------------+----------+
              |                                                   |
              |                                  +---------------v----------+
              |                                  |  STEP 7                  |
              |                                  |  "What hardware does     |
              |                                  |   your team have?"       |
              |                                  |  Mac  /  PC  /  Mix      |
              |                                  +---------------+----------+
              |                                                   |
              +-------------------------+-------------------------+
                                        |
                        +---------------v---------------+
                        |   SAYSO ACTIVATING            |
                        |   "Sayso is activating..."    |
                        |   (progress bar, ~2.5s)       |
                        |        then reveals:          |
                        |  "Sayso is a great fit        |
                        |   for you!"                   |
                        |   (auto-advances after 6s)    |
                        +---------------+---------------+
                                        |
                         Mac / Mix               PC
                              |                   |
          +-------------------v--+   +------------v----------+
          |   CONTACT INFO       |   |  WINDOWS COMING SOON  |
          |  "Get started        |   |  "SaySo is coming     |
          |   setting up your    |   |   soon to Windows"    |
          |   Sayso account"     |   |  ⚠️ Not available yet  |
          |  Name / Email /      |   |  — sign up for early  |
          |  Phone / Company     |   |  access               |
          +-------------------+--+   |  Name / Email /       |
                              |      |  Phone / Company      |
                              |      +------------+----------+
                              |                   |
                              +---------+---------+
                                        |
                        +---------------v---------------+
                        |   ANALYZING                   |
                        |   (loading animation,         |
                        |    auto-advances ~3.5s)       |
                        +---------------+---------------+
                                        |
                        +---------------v---------------+
                        |          PAYWALL              |
                        |   (adapts by computer type)   |
                        +-------+---------------+-------+
                                |               |
               +----------------v--+         +--v-----------------+
               |   Mac / Mix       |         |      PC            |
               |  "Sayso is        |         |  "Lock in your     |
               |   perfect for     |         |   early access     |
               |   you!"           |         |   rate."           |
               |  Regular pricing  |         |  50% off pricing   |
               |                   |         |                    |
               |  Path A: 1 card   |         |  Path A: 1 card    |
               |  Individual Agent |         |  Individual Agent  |
               |  ($69/mo)         |         |  ($35/mo)          |
               |                   |         |                    |
               |  Path B: 2 cards  |         |  Path B: 2 cards   |
               |  Individual Agent |         |  Individual Agent  |
               |  + Teams (custom) |         |  + Teams           |
               +-------------------+         |  (both 50% off)    |
                                             +--------------------+
```

---

## Tech Stack

| Concern | Tool |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion (v12) |
| Fonts | Manrope (headings), Helvetica Neue (body) |
| State | React `useState` — no persistence |

---

## Design Tokens

```
Primary (text, borders):   #1D4871
CTA (buttons, accents):    #2367EE
Accent (highlights):       #FFDE59
Background (page):         #F4F4F5
Accent BG (cards):         #D7DEE1
White:                     #FFFFFF
```

---

## Route

The flow lives at **`/start`** → `app/start/page.tsx` renders `<OnboardingFlow />` inside a centered card.

---

## File Structure

```
app/
  start/
    page.tsx                      <- Route entry point

components/
  onboarding/
    OnboardingFlow.tsx            <- Main controller (state machine, screen router)
    OnboardingModal.tsx           <- Modal wrapper variant
    OnboardingProgress.tsx        <- Progress bar + logo header
    OnboardingNavButtons.tsx      <- Back / Continue buttons
    screens/
      RoleScreen.tsx              <- Step 1 (shared): role selection + path branch
      FeelingCheckScreen.tsx      <- Path A Step 2: emoji feeling picker
      CallFrequencyScreen.tsx     <- Path A Step 3: prospecting call frequency
      SupportTechScreen.tsx       <- Path A Step 4: tools / support (multi-select)
      LeadTypeScreen.tsx          <- Path A Step 5: lead types (Sellers/Buyers chips)
      ComputerScreen.tsx          <- Path A Step 6 / Path B Step 7: Mac / PC / Mix
      TeamSizeScreen.tsx          <- Path B Step 2: team size slider + callers radio
      ConfidenceScreen.tsx        <- Path B Step 3: confidence in agents (1-5 emoji)
      TeamCallFrequencyScreen.tsx <- Path B Step 4: team prospecting frequency
      TeamSupportTechScreen.tsx   <- Path B Step 5: team coaching tools (multi-select)
      TeamLeadTypeScreen.tsx      <- Path B Step 6: team lead types (Sellers/Buyers)
      SaysoHelpScreen.tsx         <- Shared: "Sayso is activating" -> fit result
      ContactInfoScreen.tsx       <- Shared: name / email / phone / company form
      AnalyzingScreen.tsx         <- Shared: loading animation (auto-advances)
      PaywallScreen.tsx           <- Shared: pricing - adapts by computerType + path
      WindowsComingSoonScreen.tsx <- Contact form variant for PC users (disclaimer + early access)
      VerdictScreen.tsx           <- Unused / archived (replaced by PaywallScreen)
```

---

## Path Logic

```
Path A:  role === 'Individual Agent' || role === 'Team Agent'      -> TOTAL_STEPS = 6
Path B:  role === 'Team Lead' || role === 'Office Broker/Manager'  -> TOTAL_STEPS = 7

CONTACT_STEP = TOTAL_STEPS + 1
VERDICT_STEP = TOTAL_STEPS + 2
```

### Screen Router (condensed)

```
Step 0          -> Welcome ("Welcome to Sayso" + Get Started button)
Step 1          -> RoleScreen                    [both paths]

Path A steps:
  Step 2        -> FeelingCheckScreen
  Step 3        -> CallFrequencyScreen
  Step 4        -> SupportTechScreen
  Step 5        -> LeadTypeScreen
  Step 6        -> ComputerScreen (Mac / PC)

Path B steps:
  Step 2        -> TeamSizeScreen
  Step 3        -> ConfidenceScreen
  Step 4        -> TeamCallFrequencyScreen
  Step 5        -> TeamSupportTechScreen
  Step 6        -> TeamLeadTypeScreen
  Step 7        -> ComputerScreen (Mac / PC / Mix)

After last step -> SaysoHelpScreen               [both paths, shared]
  (auto-advances after 6s or user clicks "Get Started")
Contact step    -> ContactInfoScreen             [both paths, shared]
Analyzing       -> AnalyzingScreen               [both paths, shared, auto-advances]
Verdict step    -> PaywallScreen                 [both paths, adapts by computerType + isPathB]
```

---

## Screen Specifications

### Welcome (Step 0)
- Header: "Welcome to Sayso"
- Subtext: "Let's see if it's the right fit for you."
- CTA button: "Get Started" -> advances to Step 1

---

### Step 1 — Role (Shared branch point)
**Component:** `RoleScreen.tsx`
**Question:** "What is your role?"
**UI:** Vertical radio list (auto-advances on selection)
**Options:** Individual Agent · Team Agent · Team Lead · Office Broker/Manager
**Branch:** Individual Agent / Team Agent -> Path A (6 steps) | Team Lead / Office Broker -> Path B (7 steps)

---

### Path A — Step 2: Feeling Check
**Component:** `FeelingCheckScreen.tsx`
**Question:** "How do you feel when you think about making calls?"
**UI:** Emoji card grid (pick one, auto-advances)
**Options:** Anxious · Nervous · Scared · Excited · Confident

---

### Path A — Step 3: Call Frequency
**Component:** `CallFrequencyScreen.tsx`
**Question:** "How often do you make prospecting calls?"
**UI:** Vertical radio list (auto-advances)
**Options:** Daily · 2-3 times a week · Once a week · I'm just getting started

---

### Path A — Step 4: Support & Tech
**Component:** `SupportTechScreen.tsx`
**Question:** "What's helping you create better conversations?"
**UI:** Multi-select toggle list (at least one required)
**Options:** I have a conversation coach · I use a CRM / Dialer · I role-play with AI or friends

---

### Path A — Step 5: Lead Types
**Component:** `LeadTypeScreen.tsx`
**Question:** "What types of calls do you make consistently?"
**UI:** Chips organized under two category headers (multi-select, at least one required)
- **Sellers:** Portal (Homelight, etc), Expireds, FSBOs, SOI, Open House, Home Value Requests, Social Media
- **Buyers:** Portal Leads (Zillow, Redfin, etc), Pond Leads, Open House Leads, Social Media, SOI
- **Also:** "All of the above" chip (selects all)

---

### Path A — Step 6: Computer
**Component:** `ComputerScreen.tsx` (isTeam=false)
**Question:** "What type of computer do you use?"
**UI:** Two large icon cards (auto-advances)
**Options:** Mac · PC

---

### Path B — Step 2: Team Size
**Component:** `TeamSizeScreen.tsx`
**Questions (two-part screen):**
- Part 1: "How many agents are on your team?" — slider (1-100)
- Part 2: "How many make calls consistently?" — radio (All of them · Some of them · Not enough)
**Auto-advances** when both parts are answered

---

### Path B — Step 3: Confidence
**Component:** `ConfidenceScreen.tsx`
**Question:** "How confident are you in your agents during live prospecting conversations?"
**UI:** 1-5 emoji scale (pick one, auto-advances)
**Scale:** 1 = Not confident -> 5 = Very confident

---

### Path B — Step 4: Team Call Frequency
**Component:** `TeamCallFrequencyScreen.tsx`
**Question:** "How often does your average team agent have dedicated prospecting blocks?"
**UI:** Vertical radio list (auto-advances)
**Options:** Daily · 2-3 times a week · Once a week · I'm not sure

---

### Path B — Step 5: Team Support & Tech
**Component:** `TeamSupportTechScreen.tsx`
**Question:** "How do you help your agents create better conversations?"
**UI:** Multi-select toggle list (at least one required)
**Options:** Our agents get coached · We use a CRM / Dialer · We do group role play

---

### Path B — Step 6: Team Lead Types
**Component:** `TeamLeadTypeScreen.tsx`
**Question:** "What leads do your agents call?"
**UI:** Chips organized under Sellers / Buyers (same chip set as Path A)

---

### Path B — Step 7: Team Computer
**Component:** `ComputerScreen.tsx` (isTeam=true)
**Question:** "What hardware does your team have?"
**UI:** Three large icon cards (auto-advances)
**Options:** Mac · PC · Mix

---

### Shared — Sayso Activating
**Component:** `SaysoHelpScreen.tsx`
**UI:** Two-phase animation
1. "Sayso is activating..." + animated progress bar (~2.5s)
2. Reveals: "Sayso is a great fit for you!" + benefit list
**Auto-advances to Contact after 6s** (or user clicks "Get Started")
**Note:** Does NOT count as a numbered step in the progress bar

---

### Shared — Contact Info
**Branches based on `computerType`:**

| computerType | Component | Heading | Notes |
|---|---|---|---|
| Mac / Mix | `ContactInfoScreen.tsx` | "Get started setting up your Sayso account" | Standard form |
| PC | `WindowsComingSoonScreen.tsx` | "SaySo is coming soon to Windows" | Shows yellow disclaimer banner + "Do you actually use Apple?" link |

**PC disclaimer banner:** ⚠️ "SaySo isn't available for Windows yet — sign up to get early access when it launches."
**"Do you actually use Apple?" link:** Sets `computerType` to `'Mac'` and switches to the standard `ContactInfoScreen` without navigating away.
**Fields (both variants):** Full Name · Email Address · Phone Number · Company Name
**Validation:** Email regex, phone 10+ digits, all fields non-empty

---

### Shared — Analyzing
**Component:** `AnalyzingScreen.tsx`
**UI:** Loading animation cycling through messages, auto-advances after ~3.5s
**Note:** Progress bar stays at last question step during this screen

---

### Shared — Paywall (Verdict)
**Component:** `PaywallScreen.tsx`
**Adapts based on `computerType` and `isPathB`:**

| computerType | isPathB | Headline | Cards shown |
|---|---|---|---|
| Mac / Mix | false | "Sayso is perfect for you!" | Individual Agent ($69/mo) |
| Mac / Mix | true | "Sayso is perfect for you!" | Individual Agent ($69/mo) + Teams (custom) |
| PC | false | "Lock in your early access rate." | Individual Agent ($35/mo — 50% off) |
| PC | true | "Lock in your early access rate." | Individual Agent ($35/mo) + Teams (50% off) |

**No Back button on this screen.**

---

## Shared Components

### `OnboardingProgress.tsx`
Progress bar pinned to top on every screen except Welcome and Paywall.
```
[SaySo Logo]                         Step 3 of 6
████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
```
- Total steps = 6 (Path A) or 7 (Path B)
- SaysoHelp screen shows progress at last step; Analyzing shows step beyond total

### `OnboardingNavButtons.tsx`
Back / Continue buttons at bottom of every question screen.
- **Back** hidden on Step 1
- **Continue** disabled until screen validation passes
- Auto-advancing screens (single-select) skip this — they advance on tap

---

## Animations & Transitions

### Screen Transitions (Framer Motion)
- Forward: current screen slides left, new screen enters from right
- Back: current screen slides right, new screen enters from left
- Config: `x: ±300, opacity: 0->1, duration: 0.3s, ease: easeInOut`

### Auto-Advance (single-select screens)
- 300ms debounced `setTimeout` after selection
- Applies to: Role, Feeling Check, Call Frequency, Confidence, Computer, TeamSize (when both parts filled)

### SaysoHelp Sequence
- Progress bar animates 0->100% over 2.5s
- At 2.5s: result panel fades in + slides up
- At 6s: auto-advances to Contact form

### Analyzing Screen
- Cycles through loading messages with fade-in/out
- Auto-calls `onComplete` after ~3.5s -> sets step to Verdict

---

## Key Implementation Notes

1. **No data persistence.** All state lives in `OnboardingFlow.tsx` via `useState`. Refreshing resets everything.
2. **No API calls.** Forms don't submit anywhere. Paywall is a visual mockup only.
3. **`VerdictScreen.tsx`** exists in the codebase but is not wired into the current flow (archived). **`WindowsComingSoonScreen.tsx`** is active — it renders at the contact step when `computerType === 'PC'`.
4. **Mobile-first.** Nav buttons are fixed to bottom of viewport on mobile; relative on desktop.
5. **Accessibility.** All interactive elements have `focus-visible` rings. Auto-advancing screens use native `<button>` elements.
