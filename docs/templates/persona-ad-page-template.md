# Persona Ad Landing Page Template

This document describes the layout, style, and component pattern used for persona-specific ad landing pages (e.g. `/broker`). Use this as the reference when building pages for other personas (agent, ISA, sales-leader, etc.).

---

## File Locations

| File | Purpose |
|------|---------|
| `components/landing/BrokerAdPage.tsx` | The broker page layout - use this as the template |
| `app/broker/page.tsx` | Next.js route - just imports and renders `BrokerAdPage` |
| `components/landing/PersonaAdShared/PersonaStepWidget.tsx` | The real Sayso widget (toolbar or live cues) in the How It Works step cards |

---

## Design Principles

- **No navbar** - ad landing pages strip navigation to reduce exit points
- **No heavy animations** - static layout only, no framer-motion or interactive panels
- **Centered single column** - `max-w-xl mx-auto` (~576px) for all content
- **Same footer** - uses the standard `<Footer />` component
- **Sayso brand styles** throughout: Manrope (`font-hero`, 800) for headings, `#10233A` / `#1D4871` navy for text, `#F4F4F5` page background, soft shadows (`shadow-card`), and the blue `#2367EE` pill button (`Button` primary). Never Bangers.

---

## Page Sections (top to bottom)

### 1. Hero

- Page background `#F4F4F5`
- Logo centered at top (links to `/`, uses `logo-pos-horizontal.png`)
- Audience eyebrow above the `h1`: Manrope 12px 700, 0.12em tracking, `#556B86`, shown as written
- `h1` in `font-hero text-[30px] sm:text-[40px] font-extrabold tracking-[-0.03em] text-[#10233A]` - no bold/strong tags
- Subtext paragraph in `text-base text-[#1D4871]/70`
- The Sure Send demo form (`PersonaDemoForm`) in a white card with a soft shadow. The `.persona-demo-form` styles in `app/globals.css` give it Manrope labels, rounded inputs and a blue `#2367EE` pill submit labeled "Book my demo". On phones the consent text sits under the button so the button stays above the fold.
- Under the form: "Next: pick a time on the calendar. Most demos take 20 minutes."

### 2. Trust Strip

- Thin horizontal rule on each side with centered text between them
- Copy pattern: "Built for **[audience descriptor]** [supporting phrase]"
- `rainmakers` (or equivalent) bolded with `font-bold text-[#1D4871]`

### 3. Problem Section

- `text-center`, `max-w-xl mx-auto`
- `h2` in `font-hero font-extrabold tracking-[-0.02em] text-[#10233A]` - no bold/strong tags
- Bullet list using `<Check>` icon from lucide-react in `text-[#2367EE]`
- Bullet text: `text-sm italic text-[#1D4871]/75`
- First bullet restates the persona's core frustration; subsequent bullets are specific pain points

### 4. Mid-Hook

- Single Manrope 800 statement that reinforces the core problem
- `text-xl sm:text-2xl text-[#10233A]`, centered
- No bullet, no icon - standalone emphasis line

### 5. How It Works (gray panel)

- Full-width section with the `#E3E8EC` wash background
- Inner content constrained to `max-w-xl mx-auto px-6`
- `h2` heading in `font-hero font-extrabold tracking-[-0.02em] text-[#10233A]`
- **Two-column grid** (`grid grid-cols-2 gap-4`) of white cards:
  - Each card: `bg-white rounded-[20px] overflow-hidden shadow-card`
  - Card header: `font-hero text-lg font-bold` title + `text-xs text-[#1D4871]/60` description
  - Card visual: `h-36 mx-3 mb-3 rounded-xl overflow-hidden` containing a `PersonaStepWidget`
  - Step 1 uses `<PersonaStepWidget preset="bar" />` - the real Sayso toolbar mid-call
  - Step 2 uses `<PersonaStepWidget preset="cues" />` - the real Sayso widget with live cues open

### 6. Benefits (inside the gray panel)

- Sits directly below the two step cards, still inside the wash
- **Three-column grid** (`grid grid-cols-3 gap-4 mt-4`)
- Each benefit: `bg-white rounded-[20px] shadow-card p-4`
- Icon in a `w-9 h-9 rounded-full bg-[#2367EE]/10` circle, icon color `text-[#2367EE]`
- Title: `font-hero font-bold text-[#10233A] text-sm`
- Description: `text-xs text-[#1D4871]/65`
- Icons from lucide-react (`Zap`, `TrendingUp`, `Users` - swap as appropriate per persona)

### 7. Closing CTA

- Back to the page background, centered
- `h2` in `font-hero font-extrabold tracking-[-0.02em] text-[#10233A]` - no bold/strong tags
- `AdPageCTAButton`: blue pill "Book my demo" that scrolls to the hero form

### 8. Footer

- Standard `<Footer />` component, no changes

---

## CTA Button Pattern

```tsx
<button
  onClick={openDemoCalendar}
  className="inline-flex items-center justify-center rounded-full bg-[#FFDE59] px-6 py-3 text-base font-semibold text-[#1D4871] border-2 border-[#1D4871]"
  style={{ boxShadow: '3px 3px 0px #1D4871' }}
>
  <LightningIcon size={16} className="mr-2 flex-shrink-0" />
  Book a Demo
</button>
```

---

## How to Create a New Persona Ad Page

1. **Copy** `components/landing/BrokerAdPage.tsx` → e.g. `AgentAdPage.tsx`
2. **Update the copy** in the new file:
   - Hero headline and subtext
   - Trust strip audience descriptor
   - Problem `h2` and bullet list items
   - Mid-hook line
   - Benefit titles and descriptions
   - Closing headline
3. **Update the page route** in `app/[persona]/page.tsx` to import and render your new component
4. **Update metadata** (title, description, canonical URL, OG tags) in the page file

No new components needed - the layout and all visuals are fully reusable.

---

## Color Reference

| Token | Value | Use |
|-------|-------|-----|
| Brand blue | `#1D4871` | All headings and body text |
| Brand yellow | `#FFDE59` | CTA button background |
| Link blue | `#2367EE` | Checklist icons, benefit icons, interactive elements |
| Body muted | `#1D4871` at `/70` or `/75` opacity | Subtext, descriptions |
| Gray panel | `#f0f2f5` | How It Works section background |
| White card | `#ffffff` + `shadow-sm` | Step cards, benefit cards |
