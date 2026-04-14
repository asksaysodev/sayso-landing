# Sayso Brand Guidelines

## Font System

### Font Families

#### Manrope (Display/Hero)
- **Source**: Google Fonts via `next/font`
- **Usage**: Hero headlines, large display text
- **Weight**: Bold (700)
- **Implementation**: 
```typescript
import { Manrope } from 'next/font/google'
const manrope = Manrope({ subsets: ['latin'], weight: ['700'] })
```

#### Helvetica (System Stack)
- **Fallback chain**: `"Helvetica Neue", Helvetica, Arial, system-ui, sans-serif`
- **Usage**: Headers, body text, UI elements
- **Weights**: Regular (400), Bold (700)
- **Note**: System font - no web font loading required

### Font Tokens & Sizes

Define these in Tailwind config:

| Token | Font Family | Size | Weight | Use Case |
|-------|-------------|------|--------|----------|
| `font-hero` | Manrope | 30px | Bold | Hero headlines, primary CTAs |
| `font-heading` | Helvetica | 18px | Bold | Section headers, card titles |
| `font-body` | Helvetica | 16px | Regular | Paragraphs, descriptions, body text |
| `font-small` | Helvetica | 12px | Regular | Captions, metadata, fine print |

### Tailwind Configuration Example

```typescript
// tailwind.config.ts
fontFamily: {
  hero: ['var(--font-manrope)', 'sans-serif'],
  sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'system-ui', 'sans-serif'],
},
fontSize: {
  hero: ['30px', { lineHeight: '1.2', fontWeight: '700' }],
  heading: ['18px', { lineHeight: '1.4', fontWeight: '700' }],
  body: ['16px', { lineHeight: '1.5', fontWeight: '400' }],
  small: ['12px', { lineHeight: '1.4', fontWeight: '400' }],
}
```

### Usage Examples

```tsx
// Hero text
<h1 className="font-hero text-hero">Transform Your Landing Pages</h1>

// Section header
<h2 className="font-sans text-heading">Key Features</h2>

// Body text
<p className="font-sans text-body">Our platform enables...</p>

// Small text
<span className="font-sans text-small">Last updated: Jan 2026</span>
```

---

## Color Palette

### Primary Colors

| Name | Hex | CSS Variable | Tailwind Token | Usage |
|------|-----|--------------|----------------|--------|
| Background | `#F4F4F5` | `--color-background` | `bg-background` | Main page background |
| Accent Background | `#D7DEE1` | `--color-accent-bg` | `bg-accent-bg` | Card surfaces, alternating sections |
| Primary Dark | `#1D4871` | `--color-primary` | `text-primary` | Primary text, logos, dark elements |
| Call To Action | `#2367EE` | `--color-cta` | `bg-cta` | Primary buttons, links, interactive elements |
| Accent Yellow | `#FFDE59` | `--color-accent` | `bg-accent` | Small highlights, badges, emphasis (use sparingly) |

### Semantic Color Mapping

```typescript
// tailwind.config.ts colors
colors: {
  background: '#F4F4F5',
  'accent-bg': '#D7DEE1',
  primary: '#1D4871',
  cta: '#2367EE',
  accent: '#FFDE59',
}
```

### Color Usage Guidelines

#### Background Colors
- **`#F4F4F5` (Background)**: Default page background. Use for 90% of page area.
- **`#D7DEE1` (Accent Background)**: Use for:
  - Card surfaces that need subtle elevation
  - Alternating section backgrounds
  - Content containers that need visual separation
  - Secondary surfaces

**Example Pattern:**
```tsx
<section className="bg-background">
  <div className="bg-accent-bg rounded-lg p-6">
    Card content here
  </div>
</section>
```

#### Text Colors
- **`#1D4871` (Primary Dark)**: Default text color for all body copy and headers
- **High contrast**: Primary dark on light backgrounds ensures WCAG AA compliance
- **Never use**: Primary dark on accent background without checking contrast

#### CTA (Call To Action) Usage
- **`#2367EE` (CTA Blue)**: Use exclusively for:
  - Primary action buttons ("Get Started", "Sign Up", "Contact Us")
  - Active navigation states
  - Primary links in body text
  - Form submit buttons

**Rules:**
- ✅ Maximum 1-2 CTA buttons per viewport
- ✅ Use white text on CTA blue background
- ❌ Don't use for decorative elements
- ❌ Don't overuse - creates visual noise

**Example:**
```tsx
<button className="bg-cta text-white px-6 py-3 rounded-lg hover:bg-cta/90">
  Get Started
</button>
```

#### Accent Yellow Usage ⚠️
- **`#FFDE59` (Accent Yellow)**: Use with extreme caution
  - Small badges or labels (e.g., "New", "Popular")
  - Subtle underlines or highlights
  - Small icons or decorative elements
  - Typically < 5% of visible content

**Rules:**
- ✅ Small areas only (badges, icons, borders)
- ✅ Use as accent, not primary color
- ❌ Never use for large backgrounds
- ❌ Never use for body text (poor readability)
- ❌ Don't combine with CTA blue (creates visual conflict)

**Example:**
```tsx
// Good: Small badge
<span className="bg-accent text-primary text-small px-2 py-1 rounded">New</span>

// Bad: Large background
<section className="bg-accent"> ❌ Too much yellow!</section>
```

---

## Component Styling Guidelines

### Buttons

#### Primary Button (CTA)
```tsx
className="bg-cta text-white font-sans text-body px-6 py-3 rounded-lg 
           hover:bg-cta/90 transition-colors"
```

#### Secondary Button
```tsx
className="bg-accent-bg text-primary font-sans text-body px-6 py-3 rounded-lg 
           hover:bg-accent-bg/80 transition-colors"
```

#### Ghost Button
```tsx
className="bg-transparent text-primary font-sans text-body px-6 py-3 rounded-lg 
           border border-primary hover:bg-primary hover:text-white transition-all"
```

### Cards

#### Default Card
```tsx
className="bg-accent-bg rounded-lg p-6 shadow-sm"
```

#### Elevated Card
```tsx
className="bg-white rounded-lg p-6 shadow-md border border-accent-bg"
```

### Sections

#### Standard Section
```tsx
<section className="bg-background py-16">
  <div className="container mx-auto px-4">
    {/* Content */}
  </div>
</section>
```

#### Alternating Section
```tsx
<section className="bg-accent-bg py-16">
  <div className="container mx-auto px-4">
    {/* Content */}
  </div>
</section>
```

---

## Accessibility & Contrast

### Contrast Ratios (WCAG AA)
- ✅ Primary (#1D4871) on Background (#F4F4F5): **9.2:1** (Excellent)
- ✅ White on CTA (#2367EE): **5.1:1** (Pass AA)
- ✅ Primary (#1D4871) on Accent BG (#D7DEE1): **7.8:1** (Pass AA)
- ⚠️ Primary (#1D4871) on Accent (#FFDE59): **3.2:1** (Fail - avoid for text)

### Recommendations
- Always use Primary dark for body text
- White text on CTA blue for buttons
- Never place body text on yellow accent
- Test any custom color combinations before use

---

## Design Principles

1. **Whitespace**: Generous padding and margins - let content breathe
2. **Hierarchy**: Use font sizes and weights to create clear visual hierarchy
3. **Consistency**: Stick to the defined tokens - avoid arbitrary values
4. **Restraint**: Less is more - especially with accent yellow
5. **Performance**: Minimize web font usage (only Manrope for hero text)

---

## Quick Reference

### Most Common Classes

```tsx
// Hero headline
className="font-hero text-hero text-primary"

// Section heading
className="font-sans text-heading text-primary font-bold"

// Body paragraph
className="font-sans text-body text-primary"

// Primary button
className="bg-cta text-white px-6 py-3 rounded-lg"

// Card container
className="bg-accent-bg rounded-lg p-6"

// Page section
className="bg-background py-16"
```

---

**Last Updated**: January 2026  
**Version**: 1.0.0
