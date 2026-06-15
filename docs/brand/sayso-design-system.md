# Sayso Design System

> **Single source of truth for the Sayso visual language.**
> This is the only design/UI/brand reference doc. If you make any UI change to the web app (a new color, font, utility class, component pattern, or motion), update this file in the same PR. Treat it as living documentation.
>
> **Portable use:** This guide is written so it can be dropped into another project to reproduce the Sayso look and feel. Everything here is grounded in the real source: `tailwind.config.ts`, `app/globals.css`, and `app/layout.tsx`.

---

## 1. Brand Identity & Vibe

Sayso is real-time, in-call guidance that helps real estate agents say the right thing at the right moment. The site turns that promise into a **comic-book / superhero** visual language: bold panels, hard offset shadows, halftone dot textures, action starbursts, and a friendly superhero character. The agent is the hero; Sayso is the sidekick in their ear.

**The feel in one line:** confident, energetic, and human, with comic-book punch instead of generic SaaS minimalism.

What the visual system communicates:
- **Bold and decisive** through thick borders and hard "comic" shadows rather than soft, subtle elevation.
- **Energetic** through starbursts, speed lines, and floating/flying motion.
- **Friendly and approachable** through the superhero character, rounded shapes, and warm yellow accents.
- **Trustworthy** through the steady navy primary and a clean, readable body typeface.

---

## 2. Brand Name & Voice

### Name
The correct spelling is **Sayso** (capital S, lowercase a-y-s-o). Never write "SaySo", "SAYSO", "Say So", or "say so". This applies to all code, copy, and content.

### Writing rules (apply to all copy and content)
1. **No em dashes (—).** Use commas, periods, colons, or rephrase.
2. **No "Not X. Not Y. Just Z" structures.** Use affirmative phrasing.
3. **No staccato "tagline" fragments** like "No pressure. No pitch. Just value." or "More calls. More clients. More growth." Write in full, natural sentences like a real person.
4. **Never use "run / running" for calls.** Use "make calls", "dial", "get on the phone".
5. **Avoid "cold call(s)"**; use "call(s)" unless cold calling is the explicit topic.
6. **Never "phone call(s)"**; use "call(s)".
7. **Agents, not "reps" or "representatives."** Refer to real estate agents as "agents".
8. **Prospects are not "deals."** Use "prospect", "lead", "client", or "appointment". Agents book appointments and turn prospects into clients; they do not "close deals".
9. **Lead-type agnostic.** Sayso helps with both buyers and sellers; never assume only one.

### Voice
Direct, friendly, and founder-simple. Short sentences. Strong outcomes. Message priorities: outcome first ("say the right thing at the right moment"), then real-time ("during the call"), then ease ("stays out of your way"), then trust ("professional, privacy-forward").

### Meta titles and JSX lists
- Page/tab meta titles use `|` as the separator: `Page Title | Sayso`.
- JSX bullet lists use `•` as the marker character.

---

## 3. Color Palette

Defined in `tailwind.config.ts` and mirrored as CSS custom properties in `app/globals.css`.

| Name | Hex | CSS variable | Tailwind token | Role |
|------|-----|--------------|----------------|------|
| Background | `#F4F4F5` | `--color-background` | `bg-background` | Default page surface (~90% of the page) |
| Accent Background | `#D7DEE1` | `--color-accent-bg` | `bg-accent-bg` | Card surfaces, alternating sections, slider tracks |
| Primary (navy) | `#1D4871` | `--color-primary` | `text-primary` / `bg-primary` | Text, headings, comic borders + shadows, dark sections, footer |
| CTA (blue) | `#2367EE` | `--color-cta` | `bg-cta` | Primary buttons, links, interactive states, glow |
| Accent (yellow) | `#FFDE59` | `--color-accent` | `bg-accent` | Highlights, POW badges, narrator badge, accent stripes (use sparingly) |

```ts
// tailwind.config.ts
colors: {
  background: '#F4F4F5',
  'accent-bg': '#D7DEE1',
  primary: '#1D4871',
  cta: '#2367EE',
  accent: '#FFDE59',
}
```

### Usage rules
- **Navy `#1D4871`** is the workhorse: body text, headings, and crucially the color of every comic border and hard shadow. It is also the dark-section / footer background.
- **CTA blue `#2367EE`** is the only strong attention color for primary actions, links, and glow effects. Use white text on it.
- **Yellow `#FFDE59`** is the signature accent but is used in small doses: POW badges, the narrator badge over the hero video, the footer top border, pricing-card accent top, and the starburst pattern. Never use it for large backgrounds or body text.
- **Light surfaces** (`#F4F4F5` / `#D7DEE1`) dominate; dark navy sections are used for emphasis (transformation section, footer, CTA banners).

### Contrast (WCAG AA)
- Navy on Background: 9.2:1 (excellent)
- White on CTA blue: 5.1:1 (pass)
- Navy on Accent BG: 7.8:1 (pass)
- Navy on Yellow: 3.2:1 (fail; never use yellow behind body text)

---

## 4. Typography

Four font families are in play. Manrope and Bangers load globally in `app/layout.tsx`; Caveat loads only on the `/agent` and `/isa` ad-page routes (scoped in their own `layout.tsx`).

| Tailwind token | Family | CSS variable | Loaded | Use |
|----------------|--------|--------------|--------|-----|
| `font-hero` | Manrope (Bold 700) | `--font-manrope` | Global | Hero headlines, large display text |
| `font-comic` | Bangers (400) | `--font-bangers` | Global | Comic-style headers, POW badges, punchy labels |
| `font-sans` | Helvetica Neue / Helvetica / Arial / system-ui | (system stack) | Always | Body, UI, section headers (the default `body` font) |
| `font-handwriting` | Caveat (400/500) | `--font-caveat` | `/agent`, `/isa` only | Handwritten accents on ad pages |

```ts
// tailwind.config.ts
fontFamily: {
  hero: ['var(--font-manrope)', 'sans-serif'],
  comic: ['var(--font-bangers)', 'cursive'],
  sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'system-ui', 'sans-serif'],
  handwriting: ['var(--font-caveat)', 'cursive'],
},
fontSize: {
  hero:    ['30px', { lineHeight: '1.2', fontWeight: '700' }],
  heading: ['18px', { lineHeight: '1.4', fontWeight: '700' }],
  body:    ['16px', { lineHeight: '1.5', fontWeight: '400' }],
  small:   ['12px', { lineHeight: '1.4', fontWeight: '400' }],
},
```

```tsx
// To load Manrope + Bangers globally (next/font)
import { Manrope, Bangers } from 'next/font/google'
const manrope = Manrope({ subsets: ['latin'], weight: ['700'], variable: '--font-manrope', display: 'swap' })
const bangers = Bangers({ subsets: ['latin'], weight: ['400'], variable: '--font-bangers', display: 'swap' })
// Apply `${manrope.variable} ${bangers.variable}` on <html>/<body>
```

Type scale tokens (`text-hero` 30px, `text-heading` 18px, `text-body` 16px, `text-small` 12px) can scale responsively, but the hierarchy must hold. Headlines stay short (6 to 10 words); body blocks stay to a few lines.

---

## 5. The Comic-Book Visual System (signature)

These utility classes live in `app/globals.css` under the `V2 Comic Book` block. They are the heart of the Sayso look. Navy `#1D4871` is the shadow/border color; blue `#2367EE` and yellow `#FFDE59` are the accents.

### Hard comic shadows
Offset solid shadows (no blur) give the flat, printed-panel feel.
```css
.v2-comic-shadow      { box-shadow: 4px 4px 0px #1D4871; }
.v2-comic-shadow-sm   { box-shadow: 3px 3px 0px #1D4871; }
.v2-comic-shadow-blue { box-shadow: 4px 4px 0px #2367EE; }
```

### Comic borders
```css
.v2-comic-border       { border: 2.5px solid #1D4871; }
.v2-comic-border-light { border: 2px solid #1D4871; }
```

### Halftone dot pattern
A subtle printed-dot texture overlay (navy dots on light, white dots on dark).
```css
.v2-halftone::before {
  content: ''; position: absolute; inset: 0;
  background-image: radial-gradient(circle, #1D4871 0.5px, transparent 0.5px);
  background-size: 12px 12px;
  opacity: 0.03; pointer-events: none; z-index: 0;
}
/* dark variant: white dots, opacity 0.05 */
.v4-halftone-dark::before {
  background-image: radial-gradient(circle, rgba(255,255,255,0.5) 0.5px, transparent 0.5px);
  background-size: 12px 12px; opacity: 0.05;
}
```

### Starburst, action lines, speed lines
Energy effects placed behind elements.
```css
/* Yellow radial starburst (conic gradient, opacity 0.15, behind content) */
.v2-starburst::before { /* see globals.css for full conic-gradient definition */ }

/* Faint blue radiating action lines */
.v2-action-lines::before {
  background: repeating-conic-gradient(from 0deg, transparent 0deg 8deg, rgba(35,103,238,0.06) 8deg 10deg);
}

/* Short blue speed lines to the left of an element */
.v2-speed-lines::after {
  background: repeating-linear-gradient(to right, #2367EE 0 2px, transparent 2px 6px);
  opacity: 0.2;
}
```

### Tilted cards
Slight rotation that straightens on hover.
```css
.v2-tilt-left  { transform: rotate(-1.5deg); transition: transform .2s ease; }
.v2-tilt-left:hover  { transform: rotate(0deg); }
.v2-tilt-right { transform: rotate(1.5deg);  transition: transform .2s ease; }
.v2-tilt-right:hover { transform: rotate(0deg); }
```

### POW / Zap badge
Yellow badge with comic font and navy border + shadow.
```css
.v2-pow-badge {
  background: #FFDE59; color: #1D4871;
  font-family: var(--font-bangers), cursive;
  border: 2.5px solid #1D4871;
  box-shadow: 2px 2px 0px #1D4871;
  letter-spacing: 0.05em;
}
```

### Comic button
The signature interactive element: a hard shadow that grows on hover and presses in on click.
```css
.v2-comic-btn {
  transition: transform .15s ease, box-shadow .15s ease;
  box-shadow: 3px 3px 0px #1D4871;
}
.v2-comic-btn:hover  { transform: translate(-1px,-1px); box-shadow: 5px 5px 0px #1D4871; }
.v2-comic-btn:active { transform: translate(2px,2px);   box-shadow: 1px 1px 0px #1D4871; }
```

---

## 6. Superhero Layer (V4)

The `V4 Superhero` block in `app/globals.css` adds the hero character and section-level motion.

```css
/* Floating hero character */
.v4-hero-float { animation: v4HeroFloat 3s ease-in-out infinite; }       /* translateY 0 -> -12px */

/* Pulsing glow on hero buttons (keeps the comic shadow, adds blue glow) */
.v4-hero-glow  { animation: v4HeroGlow 2s ease-in-out infinite; }

/* Entrance motion */
.v4-slide-in-left { animation: v4SlideInLeft .6s cubic-bezier(.16,1,.3,1) forwards; }      /* text */
.v4-fly-in-right  { animation: v4FlyInRight .8s cubic-bezier(.34,1.56,.64,1) forwards; }   /* hero, delay .3s */
.v4-badge-pop     { animation: v4BadgePop .5s cubic-bezier(.34,1.56,.64,1) forwards; }     /* badges, delay .6s */

/* Scroll reveal for panels */
.v4-panel-hidden  { opacity: 0; transform: translateY(30px); }
.v4-panel-reveal  { animation: v4PanelReveal .6s ease-out forwards; }

/* Thicker comic panel for V4 + accent top for pricing cards */
.v4-panel-border  { border: 3px solid #1D4871; border-radius: 16px; }
.v4-accent-top    { border-top: 4px solid #FFDE59; }
```

Motion philosophy: bounce and spring easing (`cubic-bezier(.34,1.56,.64,1)`) are on-brand here, in contrast to typical "subtle only" guidance. Keep it purposeful: float, glow, slide/fly on entrance, reveal on scroll. Avoid constant background motion that competes with content.

---

## 7. Glassmorphism / Product Surface

The product-showcase and in-app coach widget use a dark glassmorphism surface. The landing page replicates it with `.showcase-glass` so the demo feels like the real product.

```css
/* Landing-page showcase glass (app/globals.css) */
.showcase-glass {
  background: rgba(2, 25, 47, 0.85);
  backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px);
}
.showcase-glass-strong {
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(12px);
  border: 0.5px solid rgba(255,255,255,0.18);
  box-shadow: 0 4px 16px rgba(0,0,0,.18), inset 0 1px 1px rgba(255,255,255,.08);
}
```

The real coach widget (in the web app) uses these reference tokens. Match them when recreating the widget on any surface:

| Token | Value | Use |
|-------|-------|-----|
| Coach background | `#1D2D40E5` (90% opacity dark navy) | Panels, toolbar |
| Sayso blue | `#2367EE` | Primary CTA, start button |
| Sayso indigo | `#1D4871` | Secondary buttons, toggle states |
| Border | `#E4E4E7` | Hairlines |
| White | `rgb(244,244,245)` | Avatars, light text |
| Destructive | `#DC2626` | Stop button |
| Success | `#219e66` | Active capture toggle |

Widget surface treatment: `border-radius: 16px`, `backdrop-filter: blur(200px)`, `box-shadow: inset 0 1px 0 rgba(114,126,137,0.6)`. Inner cards use `rgba(255,255,255,0.08)` with a `0.5px solid rgba(255,255,255,0.15)` border and `border-radius: 12px`. Widget typography is the Helvetica stack at 13.5 to 16px. Pills and buttons are `border-radius: 100px`, 32px tall. Coaching cue bubbles slide in from the left with a spring (`300ms cubic-bezier(.34,1.56,.64,1)`).

---

## 8. Component Patterns

| Component | Treatment |
|-----------|-----------|
| **Navbar** | Sticky `top-4`, rounded pill, white background, comic border. Logo left, nav links center, primary CTA right. Mobile: hamburger drawer that closes on Escape / outside click. The page reserves `scrollbar-gutter: stable` so popups do not shift the centered navbar. |
| **Footer** | Dark navy `#1D4871` background with a yellow top border. Multi-column links, newsletter signup, social links. |
| **Cards / panels** | Comic border (`v2-comic-border` / `v4-panel-border`) + hard shadow (`v2-comic-shadow`), large radius (12 to 16px). Often tilted (`v2-tilt-left/right`) and on a halftone surface. |
| **Primary button (comic)** | Solid CTA blue, white text, `v2-comic-btn` hard shadow, rounded. The signature button. |
| **Primary button (clean `Button.tsx`)** | `rounded-full px-6 py-3`, `bg-[#2367EE]` white text, soft shadow, `-translate-y-0.5` lift on hover, focus ring. Used where a quieter button fits. |
| **Secondary button** | Transparent with `border-[#1D4871]/20`, navy text, subtle hover fill + lift. |
| **Badges** | `v2-pow-badge` (yellow, Bangers, navy border + shadow) for comic emphasis; smaller pills for categories and the narrator badge over the hero video. |
| **Sections / containers** | `Section` wrapper: full-width, `py-16 sm:py-24`, `default` or `accent` background variant. `Container`: centered, max-width ~1200px, `px-6 md:px-8 lg:px-12`. Alternate `background` and `accent-bg`, or drop into a dark navy section for emphasis. |
| **Pricing cards** | Light surface with halftone, 3-column grid, popular plan highlighted with blue shadow/accent, `v4-accent-top` yellow top border, checkmark feature lists. |
| **Blog content** | Helvetica prose, blue links, blockquotes with a yellow left border, gray code blocks, dark-header tables, yellow bottom border on the blog hero banner. |

There is a fuller catalog of the actual React components in `docs/reference/ui-component-inventory.md`. This design-system doc covers the reusable visual language; that inventory lists the specific components that implement it.

---

## 9. Motion Reference

Keyframes defined in `app/globals.css` (use these names rather than reinventing):

- **Product showcase:** `signalPop`, `fadeIn`, `highlightFadeIn`, `glowPulse`, `audioBar`, `audioBarDialer`
- **Conversation:** `messageSlideIn`, `promptPop`, `fadeInUp`, `popupSlideIn`, `slideInUp`
- **Superhero (V4):** `v4HeroFloat`, `v4HeroGlow`, `v4SlideInLeft`, `v4FlyInRight`, `v4BadgePop`, `v4PanelReveal`
- **Onboarding:** `onboardingSpin`

Easing conventions: spring/overshoot `cubic-bezier(0.34, 1.56, 0.64, 1)` for entrances and pops; smooth `cubic-bezier(0.16, 1, 0.3, 1)` for slides; `ease-in-out` for loops (float, glow, audio bars).

---

## 10. Layout & Page Structure

Recommended homepage flow (matches the live page): Hero (promise + CTAs + product visual with superhero) → pain points ("Without Sayso") → transformation / victory metrics (dark navy + starburst) → three-step how-it-works (comic arrow connectors) → product showcase (glassmorphism demo) → social proof → final CTA + footer.

Each section does one job. Favor whitespace and short blocks. The comic system supplies the visual energy, so copy and layout can stay clean and scannable.

---

## 11. Do / Don't

**Do**
- Use navy `#1D4871` for borders and hard shadows; it is what makes the comic look read.
- Keep the comic system consistent: borders + offset shadows + halftone + the occasional starburst.
- Reserve yellow for small, high-impact accents.
- Use Bangers (`font-comic`) for punchy headers and badges, Manrope for hero headlines, Helvetica for everything else.
- Lean into purposeful bounce/spring motion on entrances and the hero.

**Don't**
- Use em dashes, "deal" language, "cold call", or staccato tagline fragments (see Section 2).
- Use large areas of yellow or yellow behind body text.
- Use soft, blurred drop shadows where the comic hard shadow belongs.
- Add constant moving backgrounds or motion that competes with reading.
- Introduce new colors or fonts outside the tokens above without updating this doc.

---

## 12. Maintaining This Doc

This is the single source of truth for Sayso UI. When any UI change lands in the web app (new token, font, utility class in `globals.css`, component pattern, or motion), update the relevant section here in the same PR. The source files to keep this in sync with are:

- `tailwind.config.ts` (colors, fonts, type scale)
- `app/globals.css` (utility classes, animations, glass surfaces)
- `app/layout.tsx` and route-level layouts (font loading)
- `docs/reference/ui-component-inventory.md` (component catalog)
