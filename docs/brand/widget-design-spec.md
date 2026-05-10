# Sayso Widget Design Spec

Reference doc for recreating the coach widget UI on any surface (landing page, web app, marketing, etc.). All values pulled directly from `origin/development` source files as of May 2026.

---

## Overall Layout

The widget is two side-by-side panels. Both use the same dark glassmorphism background.

```
[ LEFT PANEL — Coach Window / Pulse ]  [ RIGHT PANEL — Playbooks ]
```

The left panel stacks vertically:
1. Toolbar bar (single pill-shaped row)
2. Zip Code / Market Data dropdown (expands below toolbar)
3. Live Cue / AI insight toasts (animated bubbles)
4. LPMAMA row (letter dots at the bottom)

The right panel is a separate floating card that slides in from the right.

---

## Color Palette

These are the exact CSS custom properties from `src/coachWindow/styles/Colors.css`:

```css
--sayso-coach-bg:          #1D2D40E5;   /* main dark background (90% opacity) */
--sayso-blue:              #2367EE;     /* primary CTA blue */
--sayso-indigo:            #1D4871;     /* secondary buttons, toggle states */
--sayso-darkgray:          #18181B;     /* call timer background */
--sayso-lightgray:         #71717A;
--sayso-border:            #E4E4E7;
--sayso-white:             rgb(244,244,245);
--sayso-destructive:       #DC2626;     /* stop button */
--sayso-reset-orange:      #ea9e0fdc;   /* reset button */
--sayso-success:           #219e66;     /* smart capture active toggle */
--sayso-warning:           #fba30b;

/* Raw hex values used directly in some components */
--zip-input-bg:            #3C4A5C;     /* zip code pill (inactive) */
--zip-input-bg-active:     #487AB3;     /* zip code pill (valid zip entered) */
--prospect-pill-bg:        #515C6C;     /* selected prospect name pill */
--right-side-btn-bg:       #2B4A6D;     /* playbook/list icon buttons */
--insight-active-bg:       #3B516C;     /* highlighted (first) insight card */
```

---

## Typography

Font family: `Helvetica, Arial, sans-serif`

The widget has three font-size tiers (S/M/L) controlled by `data-font-size` on `:root`. Use S (default) as the base for landing page:

| Token | S (default) | Usage |
|---|---|---|
| `--cw-fs-prospect-select` | 14px | Prospect/lead type button text |
| `--cw-fs-launch-btn` | 14px | Start button, call timer |
| `--cw-fs-insight` | 13.5px | Insight/cue bubble text |
| `--cw-fs-icon` | 18px | Toolbar icons |
| `--cw-fs-icon-sm` | 16px | Close/action icons |
| `--cw-fs-dropdown-item` | 16px | Prospect list items |
| `--cw-fs-zip-input` | 16px | Zip code input text |
| `--cw-fs-zip-fact` | 14px | Market data values |
| `--cw-fs-lpmama` | 14px | LPMAMA letter dots |
| `--cw-fs-zip-result` | 15px | Zip + city text |

---

## Shared Surface Style (Glassmorphism)

All panels and cards use this same treatment:

```css
background: #1D2D40E5;              /* --sayso-coach-bg */
backdrop-filter: blur(200px);
-webkit-backdrop-filter: blur(200px);
box-shadow: inset 0 1px 0 rgba(114, 126, 137, 0.6);
border-radius: 16px;
```

Inner cards (insight items, zip data box) use a lighter glass layer:

```css
background: rgba(255, 255, 255, 0.08);
border: 0.5px solid rgba(255, 255, 255, 0.15);
backdrop-filter: blur(20px);
box-shadow: 0 2px 8px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.06);
border-radius: 12px;
padding: 10px 14px;
```

---

## Panel 1 — Toolbar (Top Bar)

Single horizontal row, pill shaped (`border-radius: 24px`, `height: 48px`).

Left to right:
1. Drag handle icon (grip dots, `color: white`, `font-size: 24px`)
2. Vertical divider: `width: 1px`, `height: 28px`, `background: rgba(255,255,255,0.4)`
3. Lead type button (B/S circle + "Buyer"/"Seller" label) — see Lead Type Pill below
4. Zip Code input pill — see Zip Code Pill below
5. Prospect avatar + name pill — see Prospect Pill below
6. Start/Stop/Reset buttons + Call Timer — see Buttons below
7. Right-side icon buttons (Playbooks, Insights eye) — see Right Side Buttons below

### Lead Type Pill

Circle with letter (`B` or `S`) in `--sayso-white` background, black text, `font-size: 16px`, `font-weight: 500`, `width/height: 32px`, `border-radius: 100px`. Followed by "Buyer"/"Seller" text in white, `font-size: 14px`.

### Zip Code Pill

```css
background: #3C4A5C;          /* inactive */
background: #487AB3;          /* active (valid zip entered) */
border-radius: 100px;
padding: 0 12px;
height: 32px;
display: flex; align-items: center; gap: 6px;
```

Contains: search icon (white, `font-size: 14px`) + numeric input (transparent bg, `color: white`, `width: 66px`, placeholder `"Zip Code"`, `color: rgba(255,255,255,0.6)`) + chevron toggle (shows when zip valid).

### Prospect Pill (selected state)

Avatar circle (32x32, `border-radius: 100px`, `background: --sayso-white`, black initials) overlapping a tag:

```css
/* Tag behind avatar */
background: #515C6C;
border-radius: 100px (right side only);
padding-left: 22px; padding-right: 12px;
height: 30px;
color: white;
font-size: 14px;
margin-left: -24px; /* overlap with avatar */
```

### Start Button

```css
background: #2367EE;           /* --sayso-blue */
color: white;
border-radius: 100px;
height: 32px;
padding: 0 16px 0 14px;
font-size: 14px;
border: none;
```

### Stop Button

```css
background: #DC2626;           /* --sayso-destructive */
width: 32px; height: 32px;
border-radius: 100px;
```

### Reset Button

```css
background: #ea9e0fdc;         /* --sayso-reset-orange */
width: 32px; height: 32px;
border-radius: 100px;
```

### Call Timer

```css
background: #18181B;           /* --sayso-darkgray */
color: white;
border-radius: 100px;
height: 32px; width: 90px;
font-size: 14px;
font-weight: 200;
text-align: center;
```

Format: `h:mm:ss` (e.g. `0:14:00`)

### Right Side Icon Buttons (Playbooks, Eye/Insights)

```css
background: #2B4A6D;
width: 32px; height: 32px;
border-radius: 100px;
color: white;
opacity: 0.8;

/* hover */
background: #1D4871;           /* --sayso-indigo */
opacity: 1;

/* active (toggled on) */
background: #487AB3;
opacity: 1;
```

---

## Panel 1 — Zip Code / Market Data Dropdown

Expands below the toolbar when chevron is clicked. Uses the shared glass surface style.

### Outer container

```css
/* same as shared glass surface */
border-radius: 16px;
padding: 9px;
```

### Inner card

```css
background: rgba(255,255,255,0.08);
border: 0.5px solid rgba(255,255,255,0.15);
border-radius: 8px;
padding: 10px 14px;
```

### States

**Loading:** spinner + "Processing Information" text, `color: #C7C7C7`, `font-size: 15px`

**Error:** red error icon + message text + optional "Try again" link in `#487AB3`

**Property type selection (initial):**
- Label: "Select Property Type" (`color: #c7c7c7`, `font-size: 14px`)
- Pill options: SFR / Multifamily / Townhouse/Condo
  - Default: `background: #515C6C`, `border-radius: 24px`, `padding: 4px 12px`
  - Selected: `background: #487AB3`
- Search button: `background: #2367EE`, `color: white`, `border-radius: 24px`, `padding: 4px 12px`

**Results found (matches screenshot):**

```
33331             <- zip (font-weight: 600, font-size: 15px)
Miami, FL         <- city/state (font-size: 15px)

• Average Days on Market of zip: 90
• Last 90 days price trend: Up  ↗   <- trend arrow green (#4ADE80) for up
• Average Price ft2 of zip: $120,00
• Inventory level: Low
```

Facts grid: `display: grid; grid-template-columns: 1fr 1fr; column-gap: 10px; row-gap: 2px`

Fact structure:
- Bullet: `color: #c7c7c7`
- Label text: `color: #c7c7c7`, `font-size: 14px`
- Value text: `color: white`, `font-weight: 500`

Trend icons:
- Up: `MoveUpRight` icon, `color: #4ADE80`
- Down: `MoveDownRight` icon, `color: #F59E0B`
- Neutral: `Equal` icon, `color: white`

---

## Panel 1 — Live Cue / AI Insight Bubble

The AI-generated coaching prompt bubble that appears to the right of the toolbar.

```css
/* Outer toast */
min-width: 300px;
max-width: 380px;
min-height: 40px;
padding: 6px 14px;
margin-left: 12px;
border-radius: 24px;             /* resting state: pill */
border-radius: 8px;              /* visible state */
background: rgba(2, 25, 47, 0.9);
backdrop-filter: blur(200px);
box-shadow: inset 0 1px 0 rgba(114,126,137,0.6);

/* Left-pointing triangle pointer */
::before {
  left: -8px;
  top: 28px;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 8px solid rgba(2,25,47,0.9);
}

/* Text */
color: rgba(255,255,255,0.87);
font-size: 14px;
line-height: 1.5;
```

Entrance animation:

```css
@keyframes slideInFromLeft {
  from { transform: translateX(-150px) scale(0.5); opacity: 0; }
  to   { transform: translateX(0)      scale(1);   opacity: 1; }
}
/* timing: 300ms cubic-bezier(0.34, 1.56, 0.64, 1) — spring bounce */
```

Exit animation:

```css
@keyframes slideOutToLeft {
  from { transform: translateX(0)       scale(1);    opacity: 1; }
  to   { transform: translateX(-150px)  scale(0.85); opacity: 0; }
}
```

Screenshot example text: *"It sounds like that bigger house by the beach could really enhance our family lifestyle. What would that change bring ou that you're missing now?"*

---

## Panel 1 — Insights Vertical Layout (Eye Panel)

Stacked list of AI insights, shown when the eye toggle is active.

```css
/* Container */
border-radius: 16px;
padding: 9px;
/* same glass surface as toolbar */

/* Each insight card */
border-radius: 12px;
padding: 10px 14px;
border: 0.5px solid rgba(255,255,255,0.15);
background: rgba(255,255,255,0.08);
```

Active (top) insight card:

```css
background: #3B516C;
border: 0.5px solid rgba(255,255,255,0.2);
box-shadow: 0 4px 16px rgba(0,0,0,0.18), inset 0 1px 1px rgba(255,255,255,0.08);
```

Queue items fade progressively: `opacity: 0.75` (2nd), `0.68` (3rd), `0.58` (4th), `0.48` (5th), `0.38` (6th).

Entrance animation: `macosSlideInFromRight` — slides in from the right, `400ms cubic-bezier(0.16, 1, 0.3, 1)`.

Exit animation: `macosSlideOutUp` — slides up + fades, `250ms`.

Text: `color: rgba(255,255,255,0.92)`, `font-size: 13.5px`, `line-height: 1.45`, `font-weight: 400`, `letter-spacing: -0.01em`.

Close button: appears on hover, top-right corner, `background: --sayso-coach-bg`, `border-radius: 100px`, `width/height: ~24px`.

---

## Panel 1 — LPMAMA Row

Row of 6 letter dots at the bottom of the insights panel. Tracks conversation qualification fields.

```css
/* Row */
display: flex; flex-direction: row; align-items: center;
gap: 6px; padding: 8px 4px 2px;

/* Each dot */
width: 26px; height: 26px;
border-radius: 50%;
background: #31455D;             /* default (no data) */
color: white;
font-size: 14px; font-weight: 500;
```

Per-field colors when data is captured:

| Letter | Field | Color |
|---|---|---|
| L | location | `#4F508E` (indigo) |
| P | price | `#754F8E` (purple) |
| M | motivation | `#8E764F` (gold) |
| A | agent | `#4F7E8E` (teal) |
| M | mortgage | `#4F8E50` (green) |
| A | appointment | `#8B8E4F` (olive) |

Copy button (after the 6 dots): same dot style, `margin-left: 10px`, shows `Copy` icon, turns green (`--sayso-success`) with `Check` icon on success, `transform: scale(1.08)`.

Tooltip on hover:

```css
background: var(--dot-color);   /* or #31455D if no data */
color: white; font-size: 14px;
padding: 6px 12px; border-radius: 10px;
position: absolute; top: calc(100% + 9px); left: 0;
max-width: 280px;
/* arrow: top: -6px, left: 8px, border-bottom: 6px solid var(--dot-color) */
```

---

## Panel 2 — Playbooks (Right Panel)

Separate floating card to the right of the main widget.

```css
/* Outer card — same glass surface */
background: #1D2D40E5;
backdrop-filter: blur(200px);
border-radius: 16px;
padding: 9px;
```

### Header

"Playbooks" text (white, `font-weight: 600`, ~16px) + dropdown chevron on left, minus/collapse icon on right.

### Content

Scrollable text content with section headers and bullet lists.

Section header: white text, `font-weight: 500`, ~14px (e.g. "Introduction", "Transition")

Bullet items: `- ` prefix, `color: rgba(255,255,255,0.87)`, `font-size: 14px`, `line-height: 1.5`

Variable placeholders shown in brackets with highlight color (e.g. `[Name]`, `[Your first name]`, `[Street]` in `#487AB3` blue).

Example content structure:
```
Introduction
- Hey [Name], this is [Your first name]. I'm calling about your home on [Street]. Are you still trying to sell it, or are you waiting for something to change?

If still trying to sell:
- Got it.
- On a scale of 1 to 7, how frustrated are you with how it played out?
- When you first listed, where were you planning on going?
- Is that move still important?
- If you had to do it again, what would you change?

Transition
- Got it.
- On a scale of 1 to 7, how frustrated are you with how it played out?
...
```

Scrollbar (thin, white):

```css
scrollbar-width: thin;
scrollbar-color: rgba(255,255,255,0.2) transparent;
/* webkit: width 4px, thumb rgba(255,255,255,0.2), border-radius 3px */
```

---

## Source File Locations (origin/development)

| File | Purpose |
|---|---|
| `src/coachWindow/styles/Colors.css` | All CSS custom property color tokens |
| `src/coachWindow/styles/CoachWindow.css` | Main layout, toolbar, zip code, buttons |
| `src/coachWindow/styles/InsightVerticalLayout.css` | Insight cards, LPMAMA, animations |
| `src/coachWindow/styles/Cue.css` | AI coaching bubble / toast |
| `src/coachWindow/components/Pulse.tsx` | Zip code input pill |
| `src/coachWindow/components/ZipCodeDropdown.tsx` | Market data dropdown |
| `src/coachWindow/components/LpmamaRow.tsx` | LPMAMA letter dots |
| `src/coachWindow/components/InsightsVerticalLayout.tsx` | Stacked insight cards |
| `src/coachWindow/components/CoachWindowMain.tsx` | Root layout container |

All these files are on `origin/development` branch of `github.com/asksaysodev/sayso-frontend`.
