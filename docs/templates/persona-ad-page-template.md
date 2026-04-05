# Persona Ad Landing Page Template

This document describes the layout, style, and component pattern used for persona-specific ad landing pages (e.g. `/broker`). Use this as the reference when building pages for other personas (agent, ISA, sales-leader, etc.).

---

## File Locations

| File | Purpose |
|------|---------|
| `components/landing/BrokerAdPage.tsx` | The broker page layout - use this as the template |
| `app/broker/page.tsx` | Next.js route - just imports and renders `BrokerAdPage` |
| `components/landing/ThreeStepsSection/StepVisuals.tsx` | Reusable dark UI mockups used in the How It Works cards |

---

## Design Principles

- **No navbar** - ad landing pages strip navigation to reduce exit points
- **No heavy animations** - static layout only, no framer-motion or interactive panels
- **Centered single column** - `max-w-xl mx-auto` (~576px) for all content
- **Same footer** - uses the standard `<Footer />` component
- **Sayso brand styles** throughout: `font-comic` (Bangers) for headings, `#1D4871` dark blue for text, `#FFDE59` yellow for the primary CTA button with `3px 3px 0px #1D4871` cartoon shadow

---

## Page Sections (top to bottom)

### 1. Hero

- White background (`bg-white`)
- Logo centered at top (links to `/`, uses `logo-pos-horizontal.png`)
- `h1` in `font-comic text-3xl sm:text-4xl text-[#1D4871]` - no bold/strong tags, uniform weight
- Subtext paragraph in `text-base text-[#1D4871]/70`
- Single CTA button: yellow `bg-[#FFDE59]`, `border-2 border-[#1D4871]`, `boxShadow: '3px 3px 0px #1D4871'`, with `<LightningIcon>` prefix
- CTA uses `openDemoCalendar()` from `useDemoCalendar()` hook

### 2. Trust Strip

- Thin horizontal rule on each side with centered text between them
- Copy pattern: "Built for **[audience descriptor]** [supporting phrase]"
- `rainmakers` (or equivalent) bolded with `font-bold text-[#1D4871]`

### 3. Problem Section

- `text-center`, `max-w-xl mx-auto`
- `h2` in `font-comic` - no bold/strong tags
- Bullet list using `<Check>` icon from lucide-react in `text-[#2367EE]`
- Bullet text: `text-sm italic text-[#1D4871]/75`
- First bullet restates the persona's core frustration; subsequent bullets are specific pain points

### 4. Mid-Hook

- Single `font-comic` statement that reinforces the core problem
- `text-xl sm:text-2xl text-[#1D4871]`, centered
- No bullet, no icon - standalone emphasis line

### 5. How It Works (gray panel)

- Full-width section with `bg-[#f0f2f5]` light gray background
- Inner content constrained to `max-w-xl mx-auto px-6`
- `h2` heading in `font-comic`
- **Two-column grid** (`grid grid-cols-2 gap-4`) of white cards:
  - Each card: `bg-white rounded-2xl overflow-hidden shadow-sm`
  - Card header: `font-comic text-lg` title + `text-xs text-[#1D4871]/60` description
  - Card visual: `h-36 mx-3 mb-3 rounded-xl overflow-hidden` containing a `StepVisual` component
  - Step 1 uses `<StepVisualStartSayso />` - shows the "Launch Coach" toggle stacked above "Select Prospect" button on a dark gradient background
  - Step 2 uses `<StepVisualPrompts />` - shows the Sayso status bar + live prompt suggestion card on a dark gradient background

### 6. Benefits (inside the gray panel)

- Sits directly below the two step cards, still inside `bg-[#f0f2f5]`
- **Three-column grid** (`grid grid-cols-3 gap-4 mt-4`)
- Each benefit: `bg-white rounded-2xl shadow-sm p-4`
- Icon in a `w-9 h-9 rounded-full bg-[#2367EE]/10` circle, icon color `text-[#2367EE]`
- Title: `font-semibold text-[#1D4871] text-sm`
- Description: `text-xs text-[#1D4871]/65`
- Icons from lucide-react (`Zap`, `TrendingUp`, `Users` - swap as appropriate per persona)

### 7. Closing CTA

- Back to white background, centered
- `h2` in `font-comic` - no bold/strong tags
- Same yellow CTA button as hero

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
