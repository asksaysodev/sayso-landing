# Glossary Page Template

This document is the complete reference for creating `/glossary/[slug]` pages. It covers SEO rules, content structure, the TypeScript data interface, internal linking requirements, and a step-by-step process for adding new glossary pages at scale.

**Reference implementation:** `lib/content/glossary/circle-prospecting.ts`

---

## Table of Contents

1. [File Locations](#file-locations)
2. [What a Glossary Page Is (and Is Not)](#what-a-glossary-page-is-and-is-not)
3. [SEO Rules - Universal](#seo-rules--universal)
4. [SEO Rules - Glossary-Specific](#seo-rules--glossary-specific)
5. [Page Structure (Section by Section)](#page-structure-section-by-section)
6. [TypeScript Data Interface](#typescript-data-interface)
7. [Internal Linking Requirements](#internal-linking-requirements)
8. [CTA Placement](#cta-placement)
9. [Schema Markup (JSON-LD)](#schema-markup-json-ld)
10. [Content Quality Checklist](#content-quality-checklist)
11. [How to Create a New Glossary Page](#how-to-create-a-new-glossary-page)
12. [Planned Glossary Pages](#planned-glossary-pages)
13. [SEO Audit Checklist](#seo-audit-checklist)

---

## File Locations

| File | Purpose |
|------|---------|
| `lib/content/glossary/types.ts` | `GlossaryEntry` TypeScript interface - every content field |
| `lib/content/glossary/index.ts` | Content loader - exports `getAllGlossaryEntries()`, `getGlossaryBySlug()`, `getAllGlossarySlugs()` |
| `lib/content/glossary/*.ts` | Individual glossary content files (one per term) |
| `components/pages/GlossaryPage.tsx` | Shared page template component - renders all glossary pages |
| `app/(content)/glossary/[slug]/page.tsx` | Next.js dynamic route - handles metadata + static params |
| `app/(content)/glossary/page.tsx` | Glossary hub listing page |
| `lib/content/hubs/glossary.ts` | Hub page config - lists all child glossary pages |
| `lib/seo/metadata.ts` | `buildMetadata()` - generates title, description, canonical, OG tags |
| `lib/seo/schema.ts` | JSON-LD generators - `generateDefinedTermJsonLd()`, `generateFAQPageJsonLd()` |
| `lib/utils/render-inline-markdown.tsx` | Inline `[text](/url/)` → `<Link>` renderer - used in the "How Sayso Helps" section |

---

## What a Glossary Page Is (and Is Not)

Glossary pages sit at the **top of the funnel**. The visitor is searching for the definition of a real estate industry term. They want a clear, fast answer - then they might explore further.

**A glossary page IS:**
- A concise definition page that explains a real estate term in plain language
- Designed to rank for "what is [term]" keywords and build topical authority
- A hub for internal linking - connecting definitions to deeper content across the site

**A glossary page is NOT:**
- A product page (that is a `/products/` page)
- A how-to guide (that is a blog post)
- An objection-handling script (that is an `/objections/` page)
- A competitor comparison (that is a `/compare/` page)

If you find yourself describing Sayso features in detail, you are writing a feature page. The product gets one brief section near the end. Keep the focus on the term, the definition, and practical context.

---

## SEO Rules - Universal

These rules apply to every glossary page without exception.

### Keyword Placement - Required Locations

| Location | Rule | Example |
|----------|------|---------|
| **H1** | Contains the exact target keyword. The H1 IS the question. | `What Is Circle Prospecting?` |
| **First 100 words** | The exact target keyword must appear in the first 2 sentences. Open with the direct answer. | `Circle prospecting is the practice of calling homeowners in a specific geographic area...` |
| **Meta title** | Format: `[Target Keyword Phrase]`. The `| Sayso` suffix is added automatically by the root layout template. Your `seoTitle` field should just be the keyword phrase. Max 60 characters for the `seoTitle` value. | `seoTitle: 'What Is Circle Prospecting in Real Estate'` (44 chars + " \| Sayso" = 53 total) |
| **Meta description** | 150-160 characters max. Must contain the target keyword. Format: `[Direct answer]. [Why it matters]. [CTA or value prop].` | `Circle prospecting is calling homeowners near a recent listing or sale to generate new leads. Learn how it works and tips to do it right. See how Sayso coaches you in real time.` |
| **URL slug** | Core term only, hyphenated. Does not include "what is." | `/glossary/circle-prospecting/` (not `/glossary/what-is-circle-prospecting/`) |
| **First H2** | Must contain the keyword or a strong semantic variation. | `How Circle Prospecting Works in Practice` |
| **Image alt text** | If an image is present, describe the image AND include the keyword or a variation naturally. | `Real estate agent circle prospecting homeowners near a new listing with Sayso coaching on screen` |

### Keyword Density

| Type | Target | Rule |
|------|--------|------|
| **Exact target keyword** | 3-5 times | Spread across H1, definition, "How It Works," meta title/description. Never stuff. |
| **Semantic variations** | 5-10 times | Include the term without the "what is" prefix, plural forms, and related concepts (e.g., "geographic farming," "cold calling," "neighborhood outreach"). |

### Heading Structure

- **One H1 only** - the page title (the question).
- **H2s:** 5-6 per page. Each major section gets an H2.
- **H3s:** Used for subsections under an H2 (if needed).
- **Never skip heading levels** (no H1 → H3 without an H2 between them).
- **Every H2 should be scannable.**
- At least one H2 must contain a semantic variation of the keyword.

### Canonical URL

- Built automatically by `buildMetadata()` in `lib/seo/metadata.ts`.
- Format: `https://asksayso.com/glossary/[slug]/`
- **Always includes a trailing slash.** This is enforced in the metadata builder.

### Brand Name

The correct spelling is **Sayso** (capital S, lowercase a-y-s-o). Never write "SaySo", "SAYSO", "Say So", or "say so".

---

## SEO Rules - Glossary-Specific

### Content Constraints

- **Paragraphs:** Max 3 sentences per paragraph. The `howItWorks`, `whyItMatters`, and `howSaysoHelps` fields are `string[]` - each string renders as its own `<p>` tag.
- **Total word count:** 600-900 words. Glossary pages are concise by design. Do not pad.
- **Tone:** Clear, educational, approachable. Think "smart friend explaining it" - not a Wikipedia article or textbook.
- **No filler openers.** Do not start with "In the ever-evolving world of real estate..." Get to the definition immediately.

### Featured Snippet Optimization

The `definition` field is your featured snippet target. Follow these rules:

- **Sentence 1** must be a clean, standalone definition that Google can pull directly. Under 45 words.
- Use the format: `[Term] is [definition].`
- **Sentence 2** should add context - who uses it, why it matters, or how it fits into the workflow.
- The full definition should be 2 sentences and work as a standalone answer.

### Tips Section

- 4-6 actionable tips in a numbered list.
- Each tip has a bold title and a 1-2 sentence explanation.
- Practical, specific advice - not generic platitudes.
- At least one tip should reference a specific number or timeframe.

### FAQ

- 3-4 questions and answers.
- First question should be a variation of the H1 (e.g., "What does circle prospecting mean in real estate?").
- Must include at least one "how to" / "how do I" question related to the term.
- Keep answers to 2-3 sentences each.

---

## Page Structure (Section by Section)

The `GlossaryPage.tsx` component renders sections in this exact order:

### 1. JSON-LD Schema (invisible)
- `DefinedTerm` schema with term name, description, and URL
- `BreadcrumbList` schema (injected by Breadcrumb component)
- `FAQPage` schema (injected by FAQ component)

### 2. Breadcrumb Navigation
- Visual breadcrumb: Home > Glossary > [Term]
- Links to `/` and `/glossary/` hub
- Automatically injects `BreadcrumbList` JSON-LD

### 3. H1
- The question format: `What Is [Term]?`
- Must contain the exact target keyword

### 4. Definition (Featured Snippet Target)
- 2 sentences. Sentence 1 = clean definition (under 45 words). Sentence 2 = added context.
- Rendered in bold (`<strong>`) for visual emphasis.
- This is what Google pulls for featured snippets.

### 5. Glossary Hub Link
- "Part of the Real Estate Glossary" with a link to `/glossary/`
- Provides an in-content link UP to the hub (not just the breadcrumb)

### 6. Optional Hero Image
- Only renders if `heroImage` is provided
- Uses Next.js `<Image>` component with keyword-optimized alt text
- Placed after the definition

### 7. How [Term] Works in Practice (H2)
- 2-3 paragraphs from `howItWorks[]`. Each paragraph is max 3 sentences.
- Explain the concept with a concrete, real-world example.
- Walk through what it actually looks like: who does it, when, and why.

### 8. Why [Term] Matters for Real Estate Agents (H2)
- 2-3 paragraphs from `whyItMatters[]`. Each paragraph is max 3 sentences.
- Connect the concept to outcomes: more listings, more conversations, more appointments.
- This section bridges informational intent toward product awareness.

### 9. Tips for [Term] (H2)
- 4-6 numbered tips. Each has a bold title and 1-2 sentence body.
- Practical, specific advice. Include numbers and timeframes where possible.

### 10. How Sayso Helps with [Term] (H2)
- 2-3 paragraphs from `howSaysoHelps[]`. Brief product tie-in.
- Connect the term to a specific Sayso feature (e.g., circle prospecting → real-time coaching during cold calls).
- **Must include an inline CTA link** using markdown: `[Book a demo](/demo/)`. The `renderInlineMarkdown` utility converts this into a clickable Next.js `<Link>`.
- Keep it brief - this is not a feature page.

### 11. Inline CTA
- `ContentInlineCTA` component - "Book a Demo" + "Download Sayso"
- Appears immediately after the "How Sayso Helps" section (never before it)

### 12. Related Terms (H2) - Conditional
- Only renders if `relatedTerms` has entries.
- Links to 3-5 other glossary pages.
- Use the term name as anchor text.
- **Only include terms that have live pages.** Do not link to planned-but-unbuilt glossary entries.

### 13. Cross-Section Links - Conditional
- Links to a related feature page (`relatedFeature`) and/or persona page (`relatedPersona`).
- Rendered as styled link cards with arrow indicators.
- Provides cross-section diversity for internal linking.

### 14. Deeper Content Link - Conditional
- Only renders if `deeperLink` is provided.
- Links to a related blog post for readers who want to go deeper.
- **Only set this field if the blog post exists.** Do not link to planned-but-unwritten posts.

### 15. FAQ
- Rendered by the `FAQ` component with accordion behavior.
- Automatically generates `FAQPage` JSON-LD.

### 16. Closing CTA
- `ContentCTA` component - full-width bottom section.

---

## TypeScript Data Interface

Every glossary page is defined by a `GlossaryEntry` object in `lib/content/glossary/types.ts`:

```typescript
export interface GlossaryEntry {
  slug: string;
  term: string;
  keyword: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  /** 2 sentences. Sentence 1 under 45 words: "[Term] is [definition]." */
  definition: string;
  /** Each string renders as its own paragraph. Target: 2-3 paragraphs, max 3 sentences each. */
  howItWorks: string[];
  /** Each string renders as its own paragraph. Target: 2-3 paragraphs, max 3 sentences each. */
  whyItMatters: string[];
  tips: { title: string; body: string }[];
  /** Each string renders as its own paragraph. Supports [text](/url/) inline markdown for CTA links. */
  howSaysoHelps: string[];
  relatedTerms: { term: string; slug: string }[];
  /** Link to a deeper blog post. Optional - omit if the post does not exist yet. */
  deeperLink?: { title: string; href: string };
  faq: { question: string; answer: string }[];
  /** Optional hero/inline image with alt text for keyword placement. */
  heroImage?: { src: string; alt: string };
  /** Cross-section link to a feature page. */
  relatedFeature?: { title: string; href: string };
  /** Cross-section link to a persona page. */
  relatedPersona?: { title: string; href: string };
  ogImage?: string;
}
```

### Field-by-Field Guidance

| Field | Max Length / Count | Notes |
|-------|-------------------|-------|
| `slug` | - | Lowercase, hyphenated. The core term only (e.g., `circle-prospecting`). |
| `term` | - | Display name of the term (e.g., `Circle Prospecting`). Used in headings. |
| `keyword` | - | Full target keyword including "what is" (e.g., `what is circle prospecting`). |
| `seoTitle` | 60 chars | Should be the keyword phrase. Layout appends " \| Sayso". Dev build warns if over 60. |
| `seoDescription` | 150-160 chars | Format: Direct answer. Why it matters. CTA/value prop. Dev build warns if over 160. |
| `h1` | - | The question form of the keyword: `What Is [Term]?` |
| `definition` | 2 sentences | Featured snippet target. Sentence 1: clean definition under 45 words. Sentence 2: added context. |
| `howItWorks` | 2-3 strings | Each string = one `<p>`. Walk through a real-world example. Max 3 sentences per paragraph. |
| `whyItMatters` | 2-3 strings | Each string = one `<p>`. Connect to outcomes. Max 3 sentences per paragraph. |
| `tips` | 4-6 items | Each item: bold title + 1-2 sentence body. Be specific - include numbers and timeframes. |
| `howSaysoHelps` | 2-3 strings | Brief product tie-in. Last paragraph must include `[Book a demo](/demo/)` inline markdown link. |
| `relatedTerms` | 0-5 items | Only include terms with live glossary pages. Set to `[]` if no pages exist yet. |
| `deeperLink` | 0-1 item | Link to a related blog post. Only set if the post exists. |
| `faq` | 3-4 items | First Q = H1 variation. One "how to" Q required. Answers 2-3 sentences. |
| `heroImage` | 0-1 item | Image src + keyword-rich alt text. Optional but recommended for SEO. |
| `relatedFeature` | 0-1 item | Link to a related feature page (e.g., `/products/cue`). |
| `relatedPersona` | 0-1 item | Link to a related persona page (e.g., `/for/solo-agents`). |

---

## Internal Linking Requirements

Every glossary page must include **at least 4 internal links** with cross-section diversity. The component handles some automatically, but the content file must provide the data.

| Link Target | How It Gets There | Required? |
|-------------|-------------------|-----------|
| `/glossary/` hub | Breadcrumb + "Part of the Real Estate Glossary" text link | Yes (automatic) |
| `/` (homepage) | Breadcrumb + CTA buttons | Yes (automatic) |
| `/demo/` | Inline markdown in `howSaysoHelps` + CTA buttons | Yes (content file + automatic) |
| 3-5 other glossary pages | `relatedTerms` array | Yes when pages exist (content file) |
| 1 blog post | `deeperLink` field | Yes when post exists (content file) |
| 1 feature page | `relatedFeature` field | Yes (content file) |
| 1 persona page | `relatedPersona` field | Recommended (content file) |

**Total automatic links:** 3 (home, glossary hub, demo via CTA)
**Content-provided links:** 3-8 (demo inline CTA + related terms + blog post + feature + persona)

**Cross-section diversity is critical.** Do not only link within `/glossary/`. Every page should link to at least one feature page and one blog post (when available).

---

## CTA Placement

Glossary pages are informational - earn trust with the content before pitching.

| Position | Component | Placement |
|----------|-----------|-----------|
| **Inline CTA text** | `[Book a demo](/demo/)` in `howSaysoHelps` | Within the "How Sayso Helps" paragraphs |
| **Inline CTA** | `ContentInlineCTA` | Immediately after the "How Sayso Helps" section |
| **Closing CTA** | `ContentCTA` | Full-width block at the very bottom of the page |

**No CTA appears before the "How Sayso Helps" section.** This is a hard rule. The reader came for a definition, not a sales pitch.

---

## Schema Markup (JSON-LD)

Each glossary page includes three JSON-LD blocks:

### 1. DefinedTerm
Generated by `generateDefinedTermJsonLd()` in the GlossaryPage component. URLs are normalized with trailing slashes.
```json
{
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  "name": "Circle Prospecting",
  "description": "Circle prospecting is the practice of calling homeowners...",
  "url": "https://asksayso.com/glossary/circle-prospecting/",
  "inDefinedTermSet": {
    "@type": "DefinedTermSet",
    "name": "Sayso Real Estate Glossary",
    "url": "https://asksayso.com/glossary/"
  }
}
```

### 2. BreadcrumbList
Injected automatically by the `Breadcrumb` component.
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://asksayso.com/" },
    { "@type": "ListItem", "position": 2, "name": "Glossary", "item": "https://asksayso.com/glossary" },
    { "@type": "ListItem", "position": 3, "name": "Circle Prospecting", "item": "" }
  ]
}
```

### 3. FAQPage
Generated automatically by the `FAQ` component when `faq` items are provided.
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "...", "acceptedAnswer": { "@type": "Answer", "text": "..." } }
  ]
}
```

---

## Content Quality Checklist

Use this before submitting any new glossary page:

### Copy Quality
- [ ] H1 is the question form: `What Is [Term]?`
- [ ] Definition sentence 1 is a clean, standalone answer (under 45 words)
- [ ] Definition is 2 sentences total
- [ ] No paragraph exceeds 3 sentences
- [ ] Tips are specific and actionable - include numbers and timeframes
- [ ] `howSaysoHelps` is 2-3 paragraphs, not a feature page - keep it brief
- [ ] `howSaysoHelps` includes `[Book a demo](/demo/)` inline markdown link
- [ ] Tone is clear, educational, approachable - not a textbook
- [ ] No filler openers ("In the ever-evolving world of real estate...")
- [ ] Brand name is "Sayso" (not SaySo, SAYSO, Say So)

### SEO Compliance
- [ ] `seoTitle` is under 60 characters
- [ ] `seoDescription` is 150-160 characters, follows Answer/Why/CTA format
- [ ] Exact target keyword appears 3-5 times across all rendered content
- [ ] Semantic variations appear 5-10 times
- [ ] Keyword is in H1, first 100 words, meta title, meta description, and first H2
- [ ] If `heroImage` is set, alt text includes keyword or variation
- [ ] At least one FAQ question contains a variation of the keyword

### Structure
- [ ] Word count is 600-900
- [ ] `howItWorks` has 2-3 paragraphs (2-3 strings in the array)
- [ ] `whyItMatters` has 2-3 paragraphs (2-3 strings in the array)
- [ ] `tips` has 4-6 items
- [ ] `howSaysoHelps` has 2-3 paragraphs
- [ ] 3-4 FAQ items (first Q = H1 variation, one "how to" Q required)
- [ ] `relatedTerms` only links to live glossary pages (empty `[]` if none exist)
- [ ] `deeperLink` only set if the blog post exists
- [ ] `relatedFeature` links to an existing feature page
- [ ] `relatedPersona` links to an existing persona page (if relevant)

---

## How to Create a New Glossary Page

### Step 1: Create the content file

Create a new TypeScript file in `lib/content/glossary/`:

```
lib/content/glossary/[slug].ts
```

Export a `GlossaryEntry` object following the interface and all the rules above. Use `circle-prospecting.ts` as your reference.

**Example skeleton:**

```typescript
import type { GlossaryEntry } from './types';

export const yourTerm: GlossaryEntry = {
  slug: 'your-term',
  term: 'Your Term',
  keyword: 'what is your term',
  seoTitle: 'What Is Your Term in Real Estate',
  seoDescription:
    'Your term is [definition]. Learn how it works, why it matters, and tips to do it right. See how Sayso helps you [outcome].',
  h1: 'What Is Your Term?',
  definition:
    'Your term is [clean definition under 45 words]. [Second sentence adding context about who uses it or why it matters].',
  howItWorks: [
    '[Paragraph 1 - set the scene with a concrete example. Max 3 sentences.]',
    '[Paragraph 2 - walk through what happens step by step. Max 3 sentences.]',
    '[Paragraph 3 - what the outcome looks like. Max 3 sentences.]',
  ],
  whyItMatters: [
    '[Paragraph 1 - the core reason this matters. Max 3 sentences.]',
    '[Paragraph 2 - connect to agent outcomes. Max 3 sentences.]',
    '[Paragraph 3 - reinforce with a broader takeaway. Max 3 sentences.]',
  ],
  tips: [
    { title: 'Tip title with a specific action', body: '1-2 sentence explanation.' },
    { title: 'Another specific tip', body: '1-2 sentence explanation.' },
    { title: 'Include a number or timeframe', body: '1-2 sentence explanation.' },
    { title: 'Fourth tip', body: '1-2 sentence explanation.' },
    { title: 'Fifth tip', body: '1-2 sentence explanation.' },
  ],
  howSaysoHelps: [
    'Sayso [specific feature connection to this term]. [How it changes the workflow].',
    '[Additional benefit]. [Book a demo](/demo/) to see how it works on a real call.',
  ],
  relatedTerms: [
    // Only include terms with live glossary pages
    // { term: 'Circle Prospecting', slug: 'circle-prospecting' },
  ],
  deeperLink: {
    // Only set if the blog post exists
    title: 'Related Blog Post Title',
    href: '/blog/related-post-slug',
  },
  relatedFeature: {
    title: 'Real-Time Coaching',
    href: '/products/cue',
  },
  relatedPersona: {
    title: 'Sayso for Solo Agents',
    href: '/for/solo-agents',
  },
  faq: [
    {
      question: 'What is [term] in real estate?',
      answer: '[Variation of the definition - 2-3 sentences].',
    },
    {
      question: '[Practical question about the term]?',
      answer: '[2-3 sentence answer].',
    },
    {
      question: 'How do I [action related to term]?',
      answer: '[2-3 sentence answer with specific steps].',
    },
    {
      question: '[Fourth question]?',
      answer: '[2-3 sentence answer].',
    },
  ],
};
```

### Step 2: Register it in the content loader

Open `lib/content/glossary/index.ts` and:

1. Import your new entry:
   ```typescript
   import { yourTerm } from './your-term';
   ```

2. Add it to the `entries` array:
   ```typescript
   const entries: GlossaryEntry[] = [circleProspecting, yourTerm];
   ```

That is it. The dynamic route at `app/(content)/glossary/[slug]/page.tsx` automatically picks up new entries via `generateStaticParams()`.

### Step 3: Update the hub (if needed)

If your term is not already listed in `lib/content/hubs/glossary.ts`, add it to the `childPages` array with:
- `title` - display name of the term
- `slug` - must match your content file slug
- `description` - one-liner definition for the hub listing
- `keyword` - the target keyword (e.g., `what is cold calling in real estate`)
- `linkText` - CTA text on the hub page (e.g., `Get the cold calling definition`)

### Step 4: Cross-link from other glossary pages

Open other existing glossary content files and add your new page to their `relatedTerms` array where relevant. Glossary pages should cross-link to each other once their pages are live.

### Step 5: Verify

1. Run `npx tsc --noEmit` - check for TypeScript errors.
2. Run `npm run dev` and visit `http://localhost:3001/glossary/[slug]`.
3. Verify in the browser:
   - H1 renders as the question
   - Definition is 2 sentences in bold
   - "Part of the Real Estate Glossary" link appears below definition
   - howItWorks / whyItMatters render as separate `<p>` tags (not one block)
   - "Book a demo" in the Sayso section renders as a clickable link
   - Cross-section links to feature/persona pages appear
   - Deeper link points to an existing blog post
   - FAQ shows 3-4 items
   - Related Terms section only appears if entries exist
4. View page source and verify:
   - Meta title is `[seoTitle] | Sayso`
   - Meta description contains the keyword and a CTA
   - Canonical URL has trailing slash: `.../glossary/[slug]/`
   - DefinedTerm JSON-LD URL has trailing slash
   - FAQPage JSON-LD includes all FAQ items
5. Run the page content through the [SEO Audit Checklist](#seo-audit-checklist) below.

---

## Planned Glossary Pages

These are defined in the glossary hub (`lib/content/hubs/glossary.ts`) but not yet implemented (unless noted):

| Term | Slug | Target Keyword | Status |
|------|------|----------------|--------|
| Circle Prospecting | `circle-prospecting` | what is circle prospecting | Done |
| ISA (Inside Sales Agent) | `isa-real-estate` | what does ISA mean in real estate | Not started |
| Listing Appointment | `listing-appointment` | what is a listing appointment | Not started |
| Expired Listing | `expired-listing` | what is an expired listing real estate | Not started |
| FSBO | `fsbo` | what does FSBO mean | Not started |
| Cold Calling in Real Estate | `cold-calling-real-estate` | what is cold calling in real estate | Not started |
| Lead Nurturing | `lead-nurturing` | what is lead nurturing real estate | Not started |
| Sphere of Influence | `sphere-of-influence` | what is sphere of influence real estate | Not started |
| Door Knocking | `door-knocking` | what is door knocking real estate | Not started |
| Drip Campaign | `drip-campaign` | what is a drip campaign real estate | Not started |

**Note:** Before building each page, validate the keyword with actual search volume data. Some hub keywords may benefit from long-tail variations.

**Important:** As you build new glossary pages, go back and update the `relatedTerms` arrays on existing pages to cross-link to the new entries. For example, once `cold-calling-real-estate` is built, add it to `circle-prospecting.ts`'s `relatedTerms`.

---

## SEO Audit Checklist

Run through this after creating or editing any glossary page:

### Keyword Placement (all must pass)
- [ ] Target keyword in H1
- [ ] Target keyword in first 2 sentences of definition
- [ ] Target keyword in `seoTitle`
- [ ] Target keyword in `seoDescription`
- [ ] Keyword or semantic variation in first H2 ("How [Term] Works in Practice")
- [ ] If `heroImage` exists, keyword or variation in alt text
- [ ] Keyword variation in at least one FAQ question

### Keyword Density
- [ ] Exact keyword appears 3-5 times in rendered content
- [ ] Semantic variations appear 5-10 times total
- [ ] No keyword stuffing - every usage reads naturally

### Featured Snippet
- [ ] Definition sentence 1 is under 45 words
- [ ] Definition is 2 sentences and works as a standalone answer
- [ ] Uses the format: `[Term] is [definition].`

### Technical SEO
- [ ] `seoTitle` is ≤60 characters (layout adds " | Sayso")
- [ ] `seoDescription` is 150-160 characters
- [ ] Canonical URL ends with trailing slash
- [ ] DefinedTerm JSON-LD present with matching trailing-slash URL
- [ ] BreadcrumbList JSON-LD present (automatic via Breadcrumb component)
- [ ] FAQPage JSON-LD present (automatic via FAQ component)
- [ ] OG title, description, and image are set

### Content Structure
- [ ] Single H1 - the question form with exact keyword
- [ ] 5-6 H2s - at least one contains keyword variation
- [ ] No heading levels skipped
- [ ] All paragraphs ≤3 sentences
- [ ] Total word count 600-900
- [ ] `howItWorks` has 2-3 paragraphs
- [ ] `whyItMatters` has 2-3 paragraphs
- [ ] `tips` has 4-6 items
- [ ] `howSaysoHelps` has 2-3 paragraphs with inline `/demo/` link

### Internal Links (4+ total with cross-section diversity)
- [ ] Link to `/glossary/` hub (automatic - breadcrumb + in-content text link)
- [ ] Link to `/demo/` (inline markdown in howSaysoHelps + CTA components)
- [ ] 3-5 links to other glossary pages (only if live)
- [ ] 1 link to a related blog post (only if it exists)
- [ ] 1 link to a related feature page
- [ ] 1 link to a related persona page (recommended)

### CTAs
- [ ] No CTA before the "How Sayso Helps" section
- [ ] Inline `[Book a demo](/demo/)` link in `howSaysoHelps` text
- [ ] `ContentInlineCTA` after "How Sayso Helps"
- [ ] `ContentCTA` at bottom of page
