# Sayso Design System

> **Single source of truth for the Sayso visual language.**
> This is the only design/UI/brand reference doc. If you make any UI change to the web app (a new color, font, utility class, component pattern, or motion), update this file in the same PR. Treat it as living documentation.
>
> **Portable use:** This guide is written so it can be dropped into another project to reproduce the Sayso look and feel. Everything here is grounded in the real source: `tailwind.config.ts`, `app/globals.css`, and `app/layout.tsx`.

---

## 1. Brand Identity & Vibe

Sayso is real-time, in-call guidance that helps real estate agents say the right thing at the right moment. Since the November 2026 redesign the site is **clean and product-first**: a light, flat page with soft shadows and hairline borders, built around the real Sayso widget. The comic and superhero identity stays, in small doses.

**The feel in one line:** calm, confident and practical, with a little comic personality.

What the visual system communicates:
- **The product is the hero.** Wherever the site shows Sayso, it shows the real widget (toolbar, cues, LPMAMA, Pulse, Playbook), not an illustration or a made-up screen.
- **Calm and trustworthy** through flat surfaces, soft elevation, the steady navy and generous whitespace.
- **Friendly** through the yellow labels, Bangers on small headings and the superhero in the final call to action.

### Where the comic identity still appears
- Yellow section labels and badges (`v2-pow-badge`, Bangers, no border or shadow).
- Bangers on small headings: menu columns, footer columns, FAQ group titles.
- The superhero illustration in the closing call to action and the end of the homepage demo.
- The halftone dot texture on light section backgrounds, kept very faint.

Hard offset shadows, thick navy borders, tilted cards, glows, starbursts and speed lines are retired. The ad landing pages (`/founderpricing`, `/webinar/offer`) keep the old look for now by wrapping their page in `.legacy-comic`; remove that wrapper when they are redesigned.

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

Five font families are in play. Manrope (700 and 800), Bangers and Inter load globally in `app/layout.tsx`; Caveat loads only on the `/agent` and `/isa` ad-page routes (scoped in their own `layout.tsx`). Inter is only used inside the Sayso widget rebuild, to match the real app.

| Tailwind token | Family | CSS variable | Loaded | Use |
|----------------|--------|--------------|--------|-----|
| `font-hero` | Manrope (700, 800) | `--font-manrope` | Global | Hero headlines, large display text. The homepage headlines use 800 (`font-extrabold`) |
| `font-comic` | Bangers (400) | `--font-bangers` | Global | Comic-style headers, POW badges, punchy labels |
| `font-sans` | Helvetica Neue / Helvetica / Arial / system-ui | (system stack) | Always | Body, UI, section headers (the default `body` font) |
| `font-handwriting` | Caveat (400/500) | `--font-caveat` | `/agent`, `/isa` only | Handwritten accents on ad pages |
| (none, CSS variable only) | Inter (400/500/600) | `--font-inter` | Global | The Sayso widget (`components/SaysoWidget`) and the homepage Features panel |

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

## 5. The Comic-Book Utilities (legacy)

These utility classes live in `app/globals.css` under the `V2 Comic Book` block. **They now render flat everywhere** except inside `.legacy-comic`: the `Flat redesign` block right after them turns hard shadows into soft ones, thick borders into hairlines, and switches off tilts, glows, starbursts, speed lines and action lines. Do not use them in new work; use the flat patterns in Section 8. The definitions below describe what they still do inside `.legacy-comic`.

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

## 7. Product Surface: the Sayso Widget

Wherever the site shows the product it shows the widget, rebuilt as a React component in `components/SaysoWidget/`. It is a faithful copy of the desktop app's widget, not an illustration. PR 3 of the redesign reuses it on the product pages.

### Using it

```tsx
import SaysoWidget, { WidgetScaler } from '@/components/SaysoWidget';
import { WIDGET_PRESETS } from '@/components/SaysoWidget/data';

<WidgetScaler width={604}>
  <SaysoWidget {...WIDGET_PRESETS.cues} />
</WidgetScaler>
```

- **Props-driven.** Every visible state is a prop (`types.ts` documents them all): `view` (`alert` or `widget`), `lead`, `live`, `time`, `insightOpen`, `cues`, `captured`, `note`, `pulseOpen`, `playbookOpen`, `stacked`, plus guided-demo highlights (`highlight`, `highlightDot`, `watchInsight`).
- **Static or live.** Leave `interactive` off for a picture: it is hidden from assistive tech and ignores the pointer. Turn it on and pass `onAction(control)` / `onDotSelect(index)` to drive a live demo, as `components/landing/HomeLiveDemo` does.
- **Presets.** `WIDGET_PRESETS` in `data.ts` has the standard static views: `alert`, `bar`, `cues`, `notes`, `smartCapture`, `pulse`, `playbook`. Import presets from `data.ts`, not from the client `index.tsx`, so server components get plain objects.
- **Scaling.** The widget is drawn at its true size (584px column, 604px design width; 1010px with Playbook beside it). `WidgetScaler` scales it down uniformly to fit (never above 1, never distorted). `narrowWidth` switches to the stacked layout below 760px of container width (Playbook stacks under the column). `maxHeight` fixes the frame height and fits the widget inside it. `initialHeight` reserves space before the first measurement so nothing shifts.
- **Sample data.** Market numbers (zip 33331, Miami) and the LPMAMA notes are sample data. Any page that shows them labels them, e.g. "Sample call and market data".

### What it contains

| Part | Behavior |
|------|----------|
| Call alert | White Sayso bolt (`/images/bolt-white.png`), "Sayso identified a call", Start and an X with a 12s countdown ring. Start morphs it into the toolbar. |
| Toolbar | Grip, lead pill (B Buyer / S Seller), zip pill, reset / stop / timer while live, check button (cues and LPMAMA panel) and list button (Playbook). |
| Pulse | One-line labels: avg days on market, 90-day price trend, avg price per ft², inventory. Optional count-up when it opens. |
| Cues | Arrow cues only, newest on top and highlighted, up to four. No timestamps and no header. |
| LPMAMA | Six letters. A captured letter takes its color (`DOT_COLORS`) with a small pop. Its note bubble always sits under its letter and follows it as the panel grows. Copy button shows "Copied notes for your CRM". |
| Playbook | The script for the lead type, `[Placeholders]` highlighted. Opens beside the column, or under it when stacked. |

### Tokens

Styles live in `components/SaysoWidget/SaysoWidget.module.css` as CSS variables on the widget root:

| Token | Value | Use |
|-------|-------|-----|
| `--sw-bg` | `linear-gradient(115deg, #2d4560, #1f3550 38%, #284665 52%, #1a2e48)` | Every widget surface |
| `--sw-card` / `--sw-card-2` | `rgba(255,255,255,.09)` / `.13` | Pulse card, cue list |
| `--sw-text` / `--sw-dim` / `--sw-ph` | `#F4F4F5` / `rgba(244,244,245,.68)` / `#8FA9CB` | Text, secondary text, placeholders |
| `--sw-pill` / `--sw-zip` | `rgba(255,255,255,.16)` / `#2450C9` | Lead pill, zip pill |
| `--sw-reset` / `--sw-stop` / `--sw-timer` | `#D8932B` / `#DC2626` / `#141518` | Live controls |
| `--sw-icon` | `#2B4A6D` (blue `#2367EE` when pressed) | Round icon buttons |

Surfaces are 26px radius with `inset 0 1px 0 rgba(140,160,182,.55)` and a soft drop shadow; the toolbar is 58px tall with 36px pills. Font is Inter at 13.5 to 17px. Motion: spring `cubic-bezier(.34,1.56,.64,1)` for pops and cues, smooth `cubic-bezier(.16,1,.3,1)` for panels opening. All widget motion is switched off under `prefers-reduced-motion`.

The guided demo marks the control to press with a pulsing yellow ring (`.target`) and the panel to watch with a yellow outline (`.watch`); the stage adds a yellow "Click here" pointer.

### Older glass utilities

`.showcase-glass` and `.showcase-glass-strong` in `app/globals.css` still serve the older product showcases (`components/landing/showcases`, `CRMDialerShowcase`). Do not use them in new work; use the widget.

---

## 8. Component Patterns

| Component | Treatment |
|-----------|-----------|
| **Navbar** (`components/landing/SaysoNavbar/`) | Full-width sticky bar, transparent at the top and blurred `#F4F4F5` with a hairline once the page scrolls. Logo left; How it works, Features, Pricing, FAQ and a **Resources** menu in the middle; Log in and a white Book a demo pill on the right (blue is reserved for Get Sayso; white is always Book a demo). The Resources menu shows Blog and the Prospecting Calculator on top, then Products, Solutions and About columns, then an All resources link. Links come from `lib/navigation.ts`. Mobile: a right-side drawer with a Resources accordion. |
| **Footer** | Navy `#1D4871` with a yellow top border. Logo, Beehiiv newsletter and Instagram/LinkedIn on the left; Programs, Get in Touch and Legal columns on the right (`footerNav`); copyright row underneath. |
| **Cards / panels** | White, radius 16 to 20px, `shadow-card` (hairline ring `rgba(16,35,58,.12)` plus a soft drop shadow), `hover:shadow-card-hover` when the whole card is a link. No tilt, no offset shadow. |
| **Primary button** (`Button.tsx`, `variant="primary"`) | 48px pill, solid `#2367EE`, white semibold text, `shadow-button`, 1px lift on hover. The main download CTA reads "Get Sayso" everywhere. Internal `href`s ("/...") render a `next/link`; pass `external` for off-site links (new tab, `rel="noopener noreferrer"`); with no `href` it renders a `type="button"` button. |
| **Secondary button** (`variant="secondary"`) | White pill, `shadow-card-sm` and dark text; `shadow-card-sm-hover` darkens the ring on hover. |
| **Badges and labels** | Yellow `v2-pow-badge` style label in Bangers, flat (no border or shadow), for section labels and small emphasis. |
| **Sections / containers** | `Section` wrapper: full-width, `py-16 sm:py-24`, `default` or `accent` background variant. `Container`: centered, max-width ~1200px, `px-6 md:px-8 lg:px-12`. Alternate `background` and `accent-bg`, or drop into a dark navy section for emphasis. |
| **Pricing cards** | Light surface with halftone, 3-column grid, popular plan highlighted with blue shadow/accent, `v4-accent-top` yellow top border, checkmark feature lists. |
| **Blog content** | Helvetica prose, blue links, blockquotes with a yellow left border, gray code blocks, dark-header tables, yellow bottom border on the blog hero banner. |
| **Blog inline CTA** | A compact version of the mid-article CTA: navy-to-blue gradient card with the comic shadow, a white Bangers heading, one line of white body text (full white for contrast) and a white pill button with navy text. Sits after a post's second paragraph when the post sets `ctaVariant`. |
| **Hub quick answers and related reading** | Optional blocks on hub pages (`HubPage.tsx`, set by `quickAnswers` and `relatedReading` in the hub config). Quick answers is a white rounded list with thin navy dividers: each row is a bold navy phrase over a one-line muted answer, the whole row links to the child page and turns blue on hover. Related reading is a Bangers heading over muted navy paragraphs with inline links. Both use the 800px content column. |

### Shadow tokens

Flat surfaces use these `boxShadow` tokens from `tailwind.config.ts`. Use the token instead of pasting the raw `shadow-[...]` string; add a new token here and in the config if a shadow repeats.

| Class | Value | Use |
|-------|-------|-----|
| `shadow-card` | `0 0 0 1px rgba(16,35,58,0.12), 0 14px 34px -16px rgba(16,35,58,0.25)` | Default white card or panel |
| `shadow-card-hover` | `0 0 0 1px rgba(16,35,58,0.2), 0 20px 40px -18px rgba(16,35,58,0.32)` | Hover state for linked cards |
| `shadow-card-sm` | `0 0 0 1px rgba(16,35,58,0.12), 0 1px 2px rgba(16,35,58,0.06)` | Small surfaces: secondary buttons, chips, inputs, list rows |
| `shadow-card-sm-hover` | `0 0 0 1px rgba(16,35,58,0.22), 0 4px 12px -4px rgba(16,35,58,0.15)` | Hover state for `shadow-card-sm` |
| `shadow-popover` | `0 0 0 1px rgba(16,35,58,0.12), 0 24px 48px -20px rgba(16,35,58,0.35)` | Floating panels such as the Resources menu |
| `shadow-button` | `0 1px 2px rgba(16,35,58,0.18), 0 8px 20px -8px rgba(35,103,238,0.55)` | Blue CTA buttons (primary `Button`: Get Sayso) |

The blue button token is `shadow-button`, not `shadow-cta`: `cta` is already a color, and Tailwind's shadow-color utility `shadow-cta` would override the shadow.

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

### Homepage (November 2026)

`app/page.tsx` composes these sections, in order. Each lives in its own folder under `components/landing/`:

1. **Top strip** (`HomeTopStrip`): NEW pill, "Sayso for teams", opens the Calendly demo pop-up (`openDemoCalendar`, `cta-team-platform-strip`).
2. **Navbar** (shared, `SaysoNavbar`).
3. **Hero** (`HomeHero`): blog pill, H1 "Know what to say on every call.", lede, Get Sayso / Book a demo / Try it, meta line, centered social proof with a rotating quote, Ask AI links.
4. **Guided live demo** (`HomeLiveDemo`, `#demo`): step card above the stage, then the live widget. Six steps: Start, watch cues, Smart Capture note, Pulse, Playbook, hang up. Ends with the superhero card.
5. **How it works** (`HomeHowItWorks`, `#how`): three cards with static widget views.
6. **Features** (`HomeFeatures`, `#features`): dark app-style panel, product tabs on the left, fixed-height panel on the right.
7. **Made to fit** (`HomeFitCards`, `#fits`): six cards (CRM, dialers, lead types, scripts, the bar, setup).
8. **Compare** (`HomeCompare`, `#compare`): Sayso versus role-play, call recording review and printed scripts.
9. **Reviews** (`HomeReviews`, `#reviews`): four agent quotes linking to their videos, then a two-row team logo marquee (rows scroll in opposite directions, pause on hover, sit still with reduced motion). Logos are black silhouettes in `public/team-logos/`; the hero bubbles use square crops in `public/team-logos/marks/`.
10. **Pricing** (`HomePricing`, `#pricing`): monthly / annual toggle, Individual Agent+ and Teams and Brokerages.
11. **FAQ** (`HomeFAQ`, `#faq`): grouped questions. The same data feeds the FAQPage JSON-LD in `app/page.tsx`.
12. **Final call to action** (`HomeFinalCta`) with the floating superhero, then the footer.

### Layout rules

- Page column: 1160px max with a 16px gutter (`wrap` in `components/landing/HomeShared/styles.ts`). Sections use `section` (96px vertical, 68px at 640px and below) and alternate the page background `#F4F4F5` with the `wash` background `#E3E8EC` plus faint halftone dots.
- Section headers: yellow Bangers label, Manrope 800 headline with a muted second half (`#6b7f99`, at least 3:1 on `#F4F4F5` and the `#E3E8EC` wash).
- Breakpoints: 960px (grids become carousels, Features stacks), 640px (tighter spacing).
- **Carousels** (`components/ui/Carousel`): a grid on desktop; at 960px and below a swipeable scroll-snap row with peeking edges and prev/next arrows. Finite for How it works and Compare, infinite (`loop`) for Made to fit and Reviews. Arrow presses use a timer-based tween because smooth scrolling is unreliable with scroll-snap. Clones are aria-hidden and their links are out of the tab order.
- Section ids `#how`, `#features`, `#pricing` and `#faq` are linked from the navbar; keep them.

Each section does one job. Favor whitespace and short blocks.

---

## 11. Do / Don't

**Do**
- Show the real Sayso widget wherever the site shows the product.
- Use flat surfaces: hairline rings and soft shadows for cards, solid pills for buttons.
- Reserve yellow for small, high-impact accents and section labels.
- Use Bangers (`font-comic`) for small headings and labels only, Manrope for headlines, Helvetica for everything else.
- Keep motion purposeful: the widget's own animations, small entrance fades, nothing that competes with reading.

**Don't**
- Use em dashes, "deal" language, "cold call", or staccato tagline fragments (see Section 2).
- Use large areas of yellow or yellow behind body text.
- Use hard offset shadows, thick navy borders, tilted cards, starbursts or speed lines in new work.
- Draw a fake version of the product (made-up dialers, notes cards or dashboards).
- Add constant moving backgrounds or motion that competes with reading.
- Introduce new colors or fonts outside the tokens above without updating this doc.

---

## 12. Maintaining This Doc

This is the single source of truth for Sayso UI. When any UI change lands in the web app (new token, font, utility class in `globals.css`, component pattern, or motion), update the relevant section here in the same PR. The source files to keep this in sync with are:

- `tailwind.config.ts` (colors, fonts, type scale)
- `app/globals.css` (utility classes, animations, glass surfaces)
- `app/layout.tsx` and route-level layouts (font loading)
- `docs/reference/ui-component-inventory.md` (component catalog)
