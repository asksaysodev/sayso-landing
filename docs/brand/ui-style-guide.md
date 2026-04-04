# Sayso Landing Page UI/UX Rules (Style 1 — Clean, Quiet Confidence)

**Goal:** A minimal, premium landing page that communicates Sayso in seconds: *real-time, in-call guidance that helps agents say the right thing at the right moment.*  
**Reference vibe:** clean + decisive like Cluely; professional + trust-forward like Hedy.  
**Core principle:** *Nothing extra. Every element earns its place.*

---

## 1) Overall Feel

### The vibe in one sentence
**Calm, crisp, confident — like a premium tool that stays out of your way.**

### What the user should feel
- “I understand what this does in 5 seconds.”
- “This feels premium and simple.”
- “It’s a coach in my ear — not another complicated platform.”

### Page behavior
- Fast to scan, short sections, high whitespace.
- Copy is punchy and conversational (not corporate).
- Navigation and layout are CTA-forward but not pushy.

---

## 2) Visual Design Rules

### 2.1 White space & density
- **Low density**: fewer elements per section, more padding, more breathing room.
- Favor **short blocks**: 1 headline + 1 subhead + 1 CTA + 1 visual per major section.
- Avoid long paragraphs. If text grows, convert to bullets.

### 2.2 Minimalism rules (“No clutter” checklist)
Do NOT add:
- busy backgrounds, gradients, heavy patterns
- multiple competing CTAs in the same view
- dense feature grids above the fold
- “marketing noise” (badges, stickers, random decorative icons)

Only include:
- what helps the user understand product + trust + next step.

### 2.3 Sections should be “tight”
- Each section does **one job**.
- Prefer 4–6 sections total on the page, each with a single core message.

---

## 3) Brand Tokens (Fonts + Type)

### 3.1 Typefaces (from brand spec)
- **Hero / Headlines:** Manrope Bold
- **Section Headers:** Helvetica Bold
- **Body / Supporting Text:** Helvetica Regular

### 3.2 Type hierarchy (style intent)
> Note: Pixel values can scale responsively, but the *hierarchy* must hold.

- Eyebrow / label: small, uppercase or subtle weight (12–13px)
- Hero headline: large, bold, compact line breaks
- Subhead: short, readable, slightly muted
- Body: 16px, short lines
- Small text: 12px, used sparingly (footer, captions, legal)

### 3.3 Copy formatting rules
- Headlines should be **short** (6–10 words).
- Subheads should be **1–2 lines max**.
- Body text: **2–3 lines max** per block.
- Prefer “strong verbs + outcome” language.

---

## 4) Color Rules (Sayso Palette)

### 4.1 Base palette (from brand spec)
- Background: `#F4F4F5`
- Accent background: `#D7DEE1`
- Primary (serious / text / structural): `#1D4871`
- CTA (attention): `#2367EE`
- Accent (use with caution): `#FFDE59`

### 4.2 How to use color (strict)
**Default page is light.** White/near-white dominates.

- `#F4F4F5` is the default surface.
- `#D7DEE1` is used only for subtle section separation or card backgrounds.
- `#2367EE` is the *only strong attention color*:
  - primary CTA button
  - key links
  - tiny highlights (underline, icon accent)
- `#1D4871` is for:
  - nav text, headings, high-contrast body text
  - outlines/dividers when needed
- `#FFDE59` is **rare**:
  - 1–2 uses per page max
  - only for tiny emphasis (tag, “moment” highlight, small pill)
  - never a full-width section background

### 4.3 Contrast and “premium” rule
- Avoid overly saturated combinations and large areas of bright color.
- Use color for **meaning**, not decoration.

---

## 5) Layout & Page Structure

### 5.1 Top navigation
- **Minimal sticky nav**:
  - Left: logo
  - Middle or right: 2–3 links max (e.g., How it works, Pricing, FAQ)
  - Right: primary CTA
- Mobile: use a clean drawer/sheet.

### 5.2 Above the fold (must be decisive)
Hero structure:
1. Eyebrow (small): e.g., “Real-Time Sales Coaching”
2. **One bold headline**
3. 1–2 line subhead
4. **Primary CTA** (optional secondary “Watch demo”)
5. Product visual area (mock UI card / screenshot / simple demo frame)

Rules:
- No feature grid above the fold.
- No long explanation.
- No multiple stacked CTAs.

### 5.3 Scroll flow (recommended order)
1. Hero (promise + CTA + product visual)
2. “Why this matters” (3-card “moments you lose the deal”)
3. How it works (3 steps)
4. Proof (logos/testimonials + 1–3 stats)
5. Trust / privacy (short, clean bullets, professional tone)
6. Final CTA + FAQ + Footer

---

## 6) Components: Shape, Borders, Shadows

### 6.1 Card style
- Clean cards with:
  - thin border (subtle)
  - large radius (soft corners)
  - very light shadow (nearly invisible)
- Cards should feel “quiet” not loud.

### 6.2 Buttons
Button set:
- Primary: solid `#2367EE` with white text
- Secondary: outline (border + text) in `#1D4871` or neutral
- Tertiary: text button/link style

Button behavior:
- Hover: subtle darken + slight lift (tiny translateY)
- Active: press in
- Loading: spinner + disabled state
- Disabled: muted background, no shadow, no lift

### 6.3 Dividers and section separation
- Use spacing first.
- If needed: thin dividers or alternating `#F4F4F5` / `#D7DEE1` sections.
- Avoid heavy lines.

---

## 7) Interaction & Motion Rules

### 7.1 Motion philosophy
**Subtle and utility-driven.** Motion should communicate clarity, not flash.

### 7.2 Allowed motion patterns
- Fade/slide-in on section entry (gentle)
- CTA hover micro-interaction (lift)
- Smooth anchor scrolling
- Small product visual “live” hints (optional):
  - cursor blink
  - pulsing dot
  - callout appearing

### 7.3 Motion limits
Avoid:
- bouncy animations
- excessive parallax
- constant moving backgrounds
- anything that feels “gimmicky”

---

## 8) Trust & Safety Presentation (Important)

Because Sayso is “in-call guidance,” the page must feel responsible and professional.

### 8.1 Trust section format
- Short headline: “Private by design” / “Built for real calls”
- 3–5 bullets max:
  - simple language
  - no legal walls
- Optional badges (small, clean), but no clutter.

### 8.2 Tone
- Calm, confident, transparent.
- No exaggerated claims. No fear-based messaging.

---

## 9) Content Style Rules (Microcopy)

### 9.1 Voice
- Direct, friendly, “founder-simple”
- Short sentences
- Strong outcomes

### 9.2 Message priorities
1. Outcome: “Say the right thing at the right moment”
2. Real-time: “during the call”
3. Ease: “no extra work / stays out of your way”
4. Trust: “professional, privacy-forward”

---

## 10) Do / Don’t Summary

### DO
- Keep it minimal and CTA-forward
- Use whitespace as the main design tool
- Keep copy punchy and short
- Use `#2367EE` sparingly but decisively for CTAs
- Make the product visual feel “live” in a subtle way
- Use tight sections, each doing one job

### DON’T
- Add clutter, busy patterns, or heavy gradients
- Stack multiple loud CTAs
- Use large areas of yellow
- Make long text blocks
- Add flashy animations or gimmicks
- Overcomplicate nav or layout

---

## 11) Implementation Notes (for Cursor / Component Page)

When building the component showroom page:
- Include a “Style 1” section at top with:
  - color swatches
  - typography scale
  - buttons (all states)
  - cards, shadows, borders
- Then include full landing sections in order:
  - Nav
  - Hero
  - 3-card problem section
  - 3-step how-it-works
  - Social proof
  - Trust block
  - Final CTA + FAQ + footer

**Success criteria:** someone can scroll the page once and approve the entire look/feel without needing the full site build.

---
