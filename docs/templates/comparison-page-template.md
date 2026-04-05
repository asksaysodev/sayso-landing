# Comparison Page Template

This document is the complete reference for creating `/compare/[slug]` competitor comparison pages. It covers SEO rules, content structure, the TypeScript data interface, internal linking requirements, and a step-by-step process for adding new comparison pages at scale.

**Reference implementation:** `lib/content/comparisons/sayso-vs-shilo.ts`

---

## Table of Contents

1. [File Locations](#file-locations)
2. [What a Comparison Page Is (and Is Not)](#what-a-comparison-page-is-and-is-not)
3. [SEO Rules - Universal](#seo-rules--universal)
4. [SEO Rules - Comparison-Specific](#seo-rules--comparison-specific)
5. [Page Structure (Section by Section)](#page-structure-section-by-section)
6. [TypeScript Data Interface](#typescript-data-interface)
7. [Internal Linking Requirements](#internal-linking-requirements)
8. [CTA Placement](#cta-placement)
9. [Schema Markup (JSON-LD)](#schema-markup-json-ld)
10. [Writing Guidelines](#writing-guidelines)
11. [Content Quality Checklist](#content-quality-checklist)
12. [How to Create a New Comparison Page](#how-to-create-a-new-comparison-page)
13. [Planned Comparison Pages](#planned-comparison-pages)
14. [SEO Audit Checklist](#seo-audit-checklist)

---

## File Locations

| File | Purpose |
|------|---------|
| `lib/content/comparisons/types.ts` | `ComparisonEntry` TypeScript interface - every content field |
| `lib/content/comparisons/index.ts` | Content loader - exports `getAllComparisonEntries()`, `getComparisonBySlug()`, `getAllComparisonSlugs()` |
| `lib/content/comparisons/*.ts` | Individual comparison content files (one per competitor) |
| `components/pages/ComparisonPage.tsx` | Shared page template component - renders all comparison pages |
| `app/(content)/compare/[slug]/page.tsx` | Next.js dynamic route - handles metadata + static params |
| `app/(content)/compare/page.tsx` | Compare hub listing page |
| `lib/content/hubs/compare.ts` | Hub page config - lists all child comparison pages |
| `lib/seo/metadata.ts` | `buildMetadata()` - generates title, description, canonical, OG tags |
| `lib/seo/schema.ts` | JSON-LD generators - `generateWebPageJsonLd()`, `generateSoftwareAppJsonLd()`, `generateFAQPageJsonLd()` |
| `lib/utils/render-inline-markdown.tsx` | Inline link renderer - parses `[text](/url/)` syntax in content strings into Next.js `<Link>` components |

---

## What a Comparison Page Is (and Is Not)

Comparison pages are the **highest-intent pages on the site.** Someone searching "[competitor] alternative" has already decided they want something different. This is not an informational search - it is a buying search.

From the Bildad SEO training: competitor alternative articles drove most of the early SEO wins in the case study (3K to 130K impressions in 70 days). These pages convert at the highest rate because the searcher is already in decision mode.

**A comparison page IS:**
- A fair, honest side-by-side evaluation of Sayso and a specific competitor
- Designed to rank for "[competitor] alternative" keywords and convert visitors who are actively evaluating options
- A bottom-of-funnel page - the reader is ready to switch or already comparing tools

**A comparison page is NOT:**
- A feature page (that is `/features/`)
- A persona pitch (that is `/for/`)
- A one-sided sales page (credibility IS the conversion strategy here)
- A blog post or educational article

**Key principle: honesty converts.** A reader who trusts your comparison will trust your product. Never fabricate competitor limitations, and always acknowledge where the competitor has an edge. One-sided content destroys credibility on these pages.

---

## SEO Rules - Universal

These rules apply to every comparison page without exception.

### Keyword Placement - Required Locations

| Location | Rule | Example |
|----------|------|---------|
| **H1** | Must contain the exact target keyword. Include the year for freshness signaling. Use a "Best [Competitor] Alternative" format. | `Best Shilo Alternative for Real Estate Call Coaching (2026)` |
| **First 100 words** | The exact target keyword must appear within the first 100 words of body content (the TLDR). Ideally in the first 2 sentences. | `If you are looking for a Shilo alternative that coaches you during live calls...` |
| **Meta title** | Format: `[Target Keyword] - Top Pick for [Year]`. The `| Sayso` suffix is added automatically by the root layout template. Your `seoTitle` field should NOT include "Sayso". Max 60 characters for the `seoTitle` value. | `seoTitle: 'Shilo Alternative - Top Pick for 2026'` (37 chars + " \| Sayso" = 46 total) |
| **Meta description** | 150-160 characters max. Must contain the target keyword. Follow the format: `Looking for a [competitor] alternative? [Key differentiator]. [CTA].` | `Looking for a Shilo alternative? Sayso coaches you during live calls - not after. Compare features, pricing, and see why agents switch.` |
| **URL slug** | Simple format: `sayso-vs-[competitor]`. | `/compare/sayso-vs-shilo/` |
| **First H2** | Must contain the keyword or a strong semantic variation. The component renders "Why People Look for [Competitor] Alternatives" automatically. | `Why People Look for Shilo Alternatives` |

### Keyword Density

| Type | Target | Rule |
|------|--------|------|
| **Exact target keyword** | 4-6 times in visible content | Spread across H1, TLDR, whyLooking, whoItsFor, and FAQ. Never stuff. |
| **Semantic variations** | 6-10 times | Include: "alternative to [Competitor]," "switch from [Competitor]," "[Competitor] vs Sayso," "compared to [Competitor]," "better than [Competitor]," "switching from [Competitor]." |

**Counting note:** The `keyword`, `seoTitle`, and `seoDescription` fields are metadata - they do NOT render in the page body. Only count occurrences in fields that produce visible text: `h1`, `tldr`, `whyLooking`, `whereSaysoWins`, `whereSaysoWinsDetails[].body`, `whereCompetitorWins`, `whoItsFor`, `pricing`, and `faq[].question`/`faq[].answer`.

### Heading Structure

- **One H1 only** - the page title.
- **H2s:** 6 per page (Why Looking, Feature Comparison, Where Sayso Wins, Where Competitor Wins, Who Best For, Pricing). The FAQ component adds a 7th H2 ("Frequently Asked Questions").
- **H3s:** Used for subsections within "Where Sayso Wins" via `whereSaysoWinsDetails`.
- **Never skip heading levels** (no H1 → H3 without an H2 between them).
- **At least one H2** must contain a semantic variation of the keyword - the auto-rendered "Why People Look for [Competitor] Alternatives" covers this.
- "More Comparisons" renders as a styled `<p>`, NOT an H2, to keep the H2 count within range.

### Canonical URL

- Built automatically by `buildMetadata()` in `lib/seo/metadata.ts`.
- Format: `https://asksayso.com/compare/[slug]/`
- **Always includes a trailing slash.** This is enforced in the metadata builder.

### Brand Name

The correct spelling is **Sayso** (capital S, lowercase a-y-s-o). Never write "SaySo", "SAYSO", "Say So", or "say so".

---

## SEO Rules - Comparison-Specific

### Keyword Selection

From the Bildad training, these are the rules for choosing comparison page keywords:

- Target keywords with **very low keyword difficulty** (KD 10-20 range when starting out).
- **Volume matters less than intent.** Even 30-70 monthly searches are worth it because these searchers are buyers, not browsers.
- Check **trends** before committing - make sure the keyword is rising or stable, not dying.
- The keyword format is always `[competitor name] alternative`.

### Content Constraints

- **Paragraphs:** Max 3 sentences per paragraph. Content strings support `\n\n` for paragraph breaks - each segment renders as its own `<p>` tag.
- **Total word count:** 1,500-2,500 words. Comparison pages must be comprehensive enough to rank but focused enough to convert.
- **Tone:** Confident, fair, professional. You are helping the reader make a decision, not attacking a competitor.
- **No filler.** Every section should add information that helps the reader decide.
- **No vaporware.** Only describe Sayso features that exist today.

### Inline Links

Content strings support `[link text](/url/)` markdown syntax via the `renderInlineMarkdown()` utility. Internal links become Next.js `<Link>` components. Use this to embed links to `/features/`, `/for/`, `/pricing/`, and `/demo/` pages naturally within prose.

Example in a content string:
```
'Sayso surfaces [real-time coaching prompts](/features/real-time-coaching/) directly on your screen.'
```

### Honesty Rules

These are non-negotiable:

- **Never make claims you cannot back up.** If you do not know a competitor's pricing, write "Contact [Competitor] for pricing" instead of guessing.
- **Never fabricate competitor limitations.** If you are unsure about a feature gap, leave it out.
- **Always be fair in the comparison table.** Mark features honestly for both sides.
- **Be specific about both products.** Vague claims like "better" or "more powerful" without evidence undermine credibility.

Credibility IS the conversion strategy on these pages. A reader who trusts your comparison will trust your product.

---

## Page Structure (Section by Section)

The `ComparisonPage.tsx` component renders sections in this exact order:

### 1. JSON-LD Schema (invisible)
- `WebPage` schema with title, description, and URL
- `SoftwareApplication` schema (conditional - only if `featureList` is provided)
- `FAQPage` schema (injected by the FAQ component)

### 2. Breadcrumb Navigation
- Visual breadcrumb: Home > Compare > Sayso vs [Competitor]
- Links to `/` and `/compare/` hub

### 3. H1
- Keyword-driven title with year
- Format: `Best [Competitor] Alternative for [Use Case] ([Year])`
- The year signals freshness and improves CTR

### 4. TLDR Box
- Yellow-bordered card immediately after H1
- 3-5 sentences with a clear recommendation
- **The exact target keyword must appear in the first 2 sentences.**
- Ends with a "Book a Demo" CTA button linking to `/demo/`
- This is one of the highest-converting elements on the page - readers who do not need convincing will act here

Content guidance for the TLDR:
- Sentence 1: "If you are looking for a [competitor] alternative..." - establishes relevance and includes keyword
- Sentence 2: State the core differentiator (e.g., real-time vs post-call)
- Sentence 3: Who Sayso is best for
- Optional: Include an inline link to `/demo/` using markdown syntax

### 5. Why People Look for [Competitor] Alternatives
- **H2:** Rendered by the component: `Why People Look for {competitor} Alternatives`
- Content from `whyLooking` field - split on `\n\n` into paragraphs
- 3-4 paragraphs covering common pain points
- Be factual and fair - state limitations without being snarky
- Include the exact keyword in the first paragraph ("If you are researching a [competitor] alternative...")
- Common reasons to cover: missing features, pricing concerns, integration gaps, workflow mismatches
- Link to relevant `/features/` pages naturally (e.g., "the need for [real-time coaching](/features/real-time-coaching/)")

### 6. Feature Comparison Table
- **H2:** Rendered by the component: `{competitor} vs Sayso - Feature Comparison`
- The comparison table is **the single most important element on the page.** From the Bildad training: pros/cons tables and pricing tables were specifically called out as elements that pushed articles to #1.
- Content from `comparisonTable` array - renders as a 3-column table (Feature, Sayso, Competitor)
- Include 5-8 features that matter to the buyer
- Be honest - if the competitor does something well, say so
- Use concise cell values: "Yes - live prompts on screen", "Limited", "Varies"

### 7. Inline CTA
- `ContentInlineCTA` component - positioned immediately after the comparison table
- This is a natural decision point - the reader just saw the feature breakdown

### 8. Where Sayso Wins
- **H2:** `Where Sayso Wins`
- Intro paragraph from `whereSaysoWins` field - summarize the key difference in 2-3 sentences
- **H3 subsections** from `whereSaysoWinsDetails[]` - 2-3 subsections, each with:
  - A descriptive heading (renders as `<h3>`)
  - 1-2 paragraphs explaining the advantage in detail
  - Inline links to relevant `/features/` pages
- Focus on what matters to the searcher - they are looking for an alternative, so emphasize what is different or better
- Use specific details, not vague claims ("saves 30-60 minutes of manual note-taking" not "saves time")

### 9. Feature Links
- Rendered below "Where Sayso Wins" subsections if `featureLinks` is provided
- Displays as "Learn more about [Feature Title] →" links

### 10. Where [Competitor] Might Be Better
- **H2:** `Where {competitor} Might Be Better`
- 2-3 paragraphs from `whereCompetitorWins` field
- Acknowledge where the competitor has an edge - this builds trust
- Be brief but honest
- Common angles: existing user base, specific workflow fit, transition cost
- This section is SHORT - it acknowledges reality without dwelling on it

### 11. Who Sayso Is Best For
- **H2:** `Who Sayso Is Best For`
- 2-3 paragraphs from `whoItsFor` field - split on `\n\n`
- Include the exact keyword once ("Sayso is the best [competitor] alternative for agents who...")
- Cover 2-3 persona types with specific use cases
- Link to relevant `/for/` persona pages using inline markdown: `[Solo agents](/for/solo-agents/) who prospect daily...`

### 12. Persona Links
- Rendered below "Who Sayso Is Best For" if `personaLinks` is provided
- Displays as "Sayso for [Persona Title] →" links

### 13. Pricing
- **H2:** `Pricing`
- 1-2 paragraphs from `pricing` field - split on `\n\n`
- Include Sayso pricing framing (transparent, free trial, no hidden fees)
- For competitor pricing: if you know it, compare it. If not, write "Contact [Competitor] for pricing" - never guess.
- Link to `/pricing/` using inline markdown
- The component also renders a standalone "See Sayso pricing →" link below the pricing text

### 14. More Comparisons
- Renders as a styled `<p>` (NOT an H2) to keep heading count in range
- Links from `relatedComparisons[]` to other comparison pages
- Only renders if `relatedComparisons` has items

### 15. FAQ
- **H2:** "Frequently Asked Questions" (rendered by the FAQ component)
- Expandable accordion with 4-6 Q&A pairs
- Automatically generates `FAQPage` JSON-LD
- See FAQ content rules below

### 16. Closing CTA
- `ContentCTA` component - full-width dark section with "Book a Demo" and "Download Sayso" buttons

---

## TypeScript Data Interface

Every comparison page is defined by a `ComparisonEntry` object in `lib/content/comparisons/types.ts`:

```typescript
export interface ComparisonTableRow {
  feature: string;
  sayso: string;
  competitor: string;
}

export interface ComparisonEntry {
  slug: string;                    // URL slug: "sayso-vs-shilo"
  competitor: string;              // Display name: "Shilo"
  keyword: string;                 // Target SEO keyword: "shilo alternative"
  seoTitle: string;                // Meta title (max 60 chars - "| Sayso" added by layout)
  seoDescription: string;          // Meta description (max 160 chars)
  h1: string;                      // Page H1 - keyword + year
  tldr: string;                    // TLDR summary - keyword in first 2 sentences, supports [link](/url/) syntax
  whyLooking: string;              // Why people switch - \n\n separated paragraphs, supports inline links
  comparisonTable: ComparisonTableRow[];  // 5-8 feature rows
  whereSaysoWins: string;          // Intro paragraph for "Where Sayso Wins" - 2-3 sentences
  whereCompetitorWins: string;     // Fair competitor acknowledgment - \n\n separated, 2-3 paragraphs
  whoItsFor: string;               // Target audience - \n\n separated, link to /for/ pages
  pricing: string;                 // Pricing framing - \n\n separated, link to /pricing/
  faq: { question: string; answer: string }[];  // 4-6 Q&A pairs
  relatedComparisons: { title: string; slug: string }[];  // Links to other comparison pages
  ogImage?: string;                // Custom OG image (defaults to /og-default.png)

  // Optional structured fields (recommended - these improve SEO and page depth)
  whereSaysoWinsDetails?: { heading: string; body: string }[];  // H3 subsections within "Where Sayso Wins"
  personaLinks?: { title: string; href: string }[];              // Links to /for/ pages after "Who It's For"
  featureLinks?: { title: string; href: string }[];              // Links to /features/ pages after "Where Sayso Wins"
  featureList?: string[];                                         // Feature list for SoftwareApplication JSON-LD
}
```

### Field-by-Field Guidance

| Field | Max Length / Count | Notes |
|-------|-------------------|-------|
| `slug` | - | Format: `sayso-vs-[competitor]`. Lowercase, hyphenated. |
| `competitor` | - | Display name used in H2 headings and table headers. Capitalize properly. |
| `keyword` | - | Always format: "[competitor name] alternative". Validate with search volume data before using. |
| `seoTitle` | 60 chars | Do NOT include "Sayso" - layout appends " \| Sayso". Format: `[Keyword] - Top Pick for [Year]`. Dev build warns if over 60. |
| `seoDescription` | 160 chars | Format: Question with keyword. Differentiator. CTA. Dev build warns if over 160. |
| `h1` | - | Format: `Best [Keyword] for [Use Case] ([Year])`. Include the year. |
| `tldr` | 3-5 sentences | Keyword in first 2 sentences. End with inline link to `/demo/`. Supports `[text](/url/)` links. |
| `whyLooking` | 3-4 paragraphs | Separate with `\n\n`. Include keyword in first paragraph. Link to relevant `/features/` pages. |
| `comparisonTable` | 5-8 rows | Be honest. Use concise, specific cell values - not just "Yes"/"No" when you can say more. |
| `whereSaysoWins` | 2-3 sentences | Short intro paragraph. The detail goes in `whereSaysoWinsDetails`. |
| `whereSaysoWinsDetails` | 2-3 items | Each item: `heading` (renders as H3) + `body` (1-2 paragraphs, supports inline links). Cover the key differentiators in depth. |
| `whereCompetitorWins` | 2-3 paragraphs | Separate with `\n\n`. Be honest and fair. Keep it shorter than "Where Sayso Wins". |
| `whoItsFor` | 2-3 paragraphs | Separate with `\n\n`. Include keyword once. Link to `/for/` persona pages using `[text](/url/)` syntax. |
| `personaLinks` | 1-3 links | Only link to persona pages that actually exist. Check `lib/content/for/` before adding. |
| `featureLinks` | 1-2 links | Only link to feature pages that actually exist. Check `lib/content/features/` before adding. |
| `pricing` | 1-2 paragraphs | Separate with `\n\n`. Include Sayso pricing framing. If competitor pricing unknown, say "Contact [Competitor]". Link to `/pricing/`. |
| `faq` | 4-6 items | Must include required questions (see FAQ rules below). Answers are 2-4 sentences each. |
| `relatedComparisons` | 1-3 items | Link to other comparison page slugs. |
| `featureList` | 4-6 items | Short strings for SoftwareApplication schema. e.g., "Real-time call coaching". |

### FAQ Content Rules

Every comparison page FAQ must include these question patterns:

| Required Question | Example | Why |
|------------------|---------|-----|
| "Is Sayso a good alternative to [Competitor]?" | "Is Sayso a good alternative to Shilo?" | Directly targets the search intent |
| "Can I switch from [Competitor] to Sayso?" | "Can I switch from Shilo to Sayso easily?" | Addresses transition concerns |
| "Is [Competitor] better than Sayso?" | "Is Shilo better than Sayso?" | Shows fairness, captures reverse-comparison searches |
| "How much does [Competitor] cost?" | "How much does Shilo cost?" | Captures pricing-related searches |

Additional recommended questions (pick 1-2):
- "Does Sayso offer a free trial?"
- "What is the best [competitor] alternative for real estate agents?" (includes the keyword)
- "Does Sayso work with [specific integration]?"

**Answer guidelines:**
- 2-4 sentences each
- Be honest and specific
- Include the keyword in at least one answer (ideally the first answer)
- If you do not know competitor details, say so rather than guessing

---

## Internal Linking Requirements

Every comparison page must include **5-8 internal links**. The component handles some automatically, but most come from inline links in content strings.

| Link Target | How It Gets There | Required? |
|-------------|-------------------|-----------|
| `/demo/` | TLDR CTA button + inline CTA + closing CTA | Yes (automatic) |
| `/compare/` hub | Breadcrumb | Yes (automatic) |
| `/pricing/` | "See Sayso pricing →" link + inline in pricing text | Yes (automatic + content file) |
| `/` (homepage) | Breadcrumb | Yes (automatic) |
| 1+ feature pages | Inline `[text](/url/)` links in content + `featureLinks` | Yes (content file) |
| 1+ persona pages | Inline `[text](/url/)` links in whoItsFor + `personaLinks` | Yes (content file) |
| 1+ other comparison pages | `relatedComparisons` array | Yes (content file) |

**Automatic links:** 4 (home, compare hub, demo x3, pricing link)
**Content-provided links:** 4-6 (inline feature links + inline persona links + related comparisons + pricing inline link)

### Where to Place Inline Links

| Content Field | What to Link | Example |
|--------------|-------------|---------|
| `whyLooking` | Link to the primary feature that addresses the pain point | `[real-time coaching](/features/real-time-coaching/)` |
| `whereSaysoWinsDetails[].body` | Link to the feature being discussed in that subsection | `[real-time coaching prompts](/features/real-time-coaching/)` |
| `whoItsFor` | Link to persona pages for each audience type mentioned | `[Solo agents](/for/solo-agents/) who prospect daily...` |
| `pricing` | Link to the pricing page inline | `Visit the [pricing page](/pricing/) for current plans` |
| `tldr` | Optional link to demo | `[Sayso is the better fit](/demo/)` |

---

## CTA Placement

Comparison pages carry **3 CTAs** because the reader is in decision mode:

| Position | Component | Placement | Why Here |
|----------|-----------|-----------|----------|
| **TLDR CTA** | "Book a Demo" button | Inside the TLDR box at the top | Catches readers who do not need convincing |
| **Inline CTA** | `ContentInlineCTA` | Immediately after the comparison table | Natural decision point - reader just saw the feature breakdown |
| **Closing CTA** | `ContentCTA` | Full-width block at the very bottom | Final catch-all after FAQ |

---

## Schema Markup (JSON-LD)

Each comparison page includes up to three JSON-LD blocks:

### 1. WebPage
Always present. Generated by `generateWebPageJsonLd()`.
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "[seoTitle]",
  "description": "[seoDescription]",
  "url": "https://asksayso.com/compare/[slug]",
  "publisher": { "@type": "Organization", "name": "Sayso" }
}
```

### 2. SoftwareApplication (conditional)
Only present if `featureList` is provided. Generated by `generateSoftwareAppJsonLd()`. **Always provide `featureList`** - this schema helps Google understand the product.
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Sayso",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web, macOS, Windows",
  "featureList": "Real-time call coaching, Live objection handling prompts, ...",
  "publisher": { "@type": "Organization", "name": "Sayso" }
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

## Writing Guidelines

### Tone and Voice

Comparison pages require a specific balance:

- **Confident but not arrogant.** You believe in Sayso, but you are not dismissing the competitor.
- **Specific, not vague.** "Saves 30-60 minutes of manual note-taking per day" beats "saves time."
- **Fair, not sycophantic.** Acknowledging competitor strengths builds trust. But keep the "Where Competitor Wins" section shorter than "Where Sayso Wins."
- **Direct, not salesy.** The reader is already comparing tools. Help them decide - do not hard-sell.

### Paragraph Structure

- Max 3 sentences per paragraph
- Lead each paragraph with the most important point
- Use concrete examples and numbers when possible
- Write in second person ("you", "your") to speak directly to the reader

### Comparison Table Best Practices

The table is the most-scanned element on the page. Make it count:

- **Feature names should be descriptive.** "Real-time coaching during calls" not "Coaching."
- **Sayso column should be specific.** "Yes - live prompts on screen" not just "Yes."
- **Competitor column should be honest.** Use "Limited", "Varies", "No", or a specific description. Never write "No" if you are not certain.
- **Order features by importance to the reader.** Lead with the biggest differentiator.
- **Do not pad.** If both tools do the same thing equally well, you can include the row (it builds credibility), but do not add rows just to make the table longer.

### Word Count Targets by Section

| Section | Target Words | Notes |
|---------|-------------|-------|
| TLDR | 50-80 | Concise - this is a summary, not an intro |
| Why Looking | 200-300 | 3-4 paragraphs covering specific pain points |
| Where Sayso Wins (intro) | 40-60 | Short framing paragraph - detail goes in subsections |
| Where Sayso Wins (subsections) | 300-500 | 2-3 H3 subsections, ~100-170 words each |
| Where Competitor Wins | 100-200 | 2-3 paragraphs, honest but brief |
| Who It's For | 100-200 | 2-3 paragraphs with persona references |
| Pricing | 60-120 | 1-2 paragraphs |
| FAQ | 250-400 | 4-6 Q&A pairs, 2-4 sentences per answer |
| **Total** | **1,500-2,500** | |

---

## Content Quality Checklist

Use this before submitting any new comparison page:

### Copy Quality
- [ ] H1 contains the exact target keyword and the current year
- [ ] TLDR is a genuine summary - not a restated intro
- [ ] TLDR contains the keyword in the first 2 sentences
- [ ] "Why Looking" covers real, specific pain points
- [ ] Comparison table is honest - competitor marked fairly
- [ ] "Where Sayso Wins" includes specific details and numbers, not vague claims
- [ ] "Where Competitor Wins" honestly acknowledges at least one competitor advantage
- [ ] No paragraph exceeds 3 sentences
- [ ] Tone is confident and fair - not aggressive toward the competitor
- [ ] Brand name is "Sayso" (not SaySo, SAYSO, Say So)
- [ ] No features described that are not live in the product
- [ ] No fabricated competitor information

### SEO Compliance
- [ ] `seoTitle` is under 60 characters and does NOT include "Sayso"
- [ ] `seoDescription` is 130-160 characters, follows Question/Differentiator/CTA format
- [ ] Exact target keyword appears 4-6 times in visible content
- [ ] Semantic variations appear 6-10 times total
- [ ] Keyword is in H1, first 100 words (TLDR), meta title, meta description, and at least one FAQ
- [ ] At least one FAQ question contains the exact keyword or a close variation

### Structure
- [ ] Word count is 1,500-2,500
- [ ] Comparison table has 5-8 rows
- [ ] "Where Sayso Wins" has 2-3 H3 subsections (`whereSaysoWinsDetails`)
- [ ] 4-6 FAQ items including all required question patterns
- [ ] `personaLinks` populated with relevant existing `/for/` pages
- [ ] `featureLinks` populated with relevant existing `/features/` pages
- [ ] `relatedComparisons` links to 1-3 other comparison pages
- [ ] `featureList` populated for SoftwareApplication schema

---

## How to Create a New Comparison Page

### Step 1: Choose and validate the keyword

Before writing anything:
- The keyword is always `[competitor name] alternative`
- Check search volume - even 30-70 monthly searches are worth it (high intent)
- Check keyword difficulty - target KD 10-20 when starting out
- Check trends - make sure the keyword is rising or stable, not dying
- Verify the competitor is real and active in the real estate call coaching space

### Step 2: Research the competitor

Before writing the content:
- Visit the competitor's website and note their actual features
- Check their pricing page (or note if pricing is not public)
- Identify their CRM integrations
- Find 2-3 legitimate limitations (do not fabricate)
- Identify 1-2 areas where they genuinely have an edge over Sayso

### Step 3: Create the content file

Create a new TypeScript file in `lib/content/comparisons/`:

```
lib/content/comparisons/sayso-vs-[competitor].ts
```

Export a `ComparisonEntry` object following the interface and all the rules above. Use `sayso-vs-shilo.ts` as your reference.

**Variable naming:** Use camelCase matching the competitor name. Example:
```typescript
export const saysoVsMaverickre: ComparisonEntry = { ... };
```

### Step 4: Register it in the content loader

Open `lib/content/comparisons/index.ts` and:

1. Import your new entry:
   ```typescript
   import { saysoVsMaverickre } from './sayso-vs-maverickre';
   ```

2. Add it to the `entries` array:
   ```typescript
   const entries: ComparisonEntry[] = [saysoVsShilo, saysoVsMaverickre];
   ```

That is it. The dynamic route at `app/(content)/compare/[slug]/page.tsx` automatically picks up new entries via `generateStaticParams()`.

### Step 5: Update the compare hub (if needed)

If your competitor is not already listed in `lib/content/hubs/compare.ts`, add it to the `childPages` array with:
- `title` - display name (e.g., "Sayso vs MaverickRE")
- `slug` - must match your content file slug (e.g., "sayso-vs-maverickre")
- `description` - one-liner for the hub listing
- `keyword` - the target keyword
- `linkText` - CTA text on the hub page (MUST vary per page for SEO)

### Step 6: Cross-link from other comparison pages

Open other existing comparison content files and add your new page to their `relatedComparisons` array. Comparison pages should cross-link to each other.

### Step 7: Verify

1. Run `npm run build` - check for TypeScript errors and dev-mode SEO warnings.
2. Run `npm run dev` and visit `http://localhost:3001/compare/[slug]`.
3. View page source and verify:
   - Meta title contains the keyword and does NOT double up on "Sayso"
   - Meta description contains the keyword and is 130-160 chars
   - Canonical URL has trailing slash
   - JSON-LD blocks are present (WebPage, SoftwareApplication, FAQPage)
4. Count keyword occurrences in the rendered page text - should be 4-6 exact + 6-10 semantic.
5. Run the page content through the [SEO Audit Checklist](#seo-audit-checklist) below.

---

## Planned Comparison Pages

These are defined in the compare hub (`lib/content/hubs/compare.ts`):

| Competitor | Slug | Target Keyword | Status |
|-----------|------|----------------|--------|
| Shilo | `sayso-vs-shilo` | shilo alternative | Done |
| MaverickRE | `sayso-vs-maverickre` | maverickre alternative | Not started |
| Sayso vs Manual Coaching | `sayso-vs-manual-coaching` | real estate coaching AI vs manual | Not started |

---

## SEO Audit Checklist

Run through this after creating or editing any comparison page:

### Keyword Placement (all must pass)
- [ ] Target keyword in H1
- [ ] Target keyword in first 100 words of body content (TLDR)
- [ ] Target keyword in `seoTitle`
- [ ] Target keyword in `seoDescription`
- [ ] Keyword or semantic variation in first H2 (auto-rendered by component)
- [ ] Keyword in at least one FAQ question
- [ ] Keyword in at least one FAQ answer

### Keyword Density
- [ ] Exact keyword appears 4-6 times in visible content
- [ ] Semantic variations appear 6-10 times total
- [ ] No keyword stuffing - every usage reads naturally

### Technical SEO
- [ ] `seoTitle` is ≤60 characters (layout adds " | Sayso")
- [ ] `seoDescription` is 130-160 characters
- [ ] Canonical URL ends with trailing slash
- [ ] WebPage JSON-LD present
- [ ] SoftwareApplication JSON-LD present (requires `featureList`)
- [ ] FAQPage JSON-LD present
- [ ] OG title, description, and image are set

### Content Structure
- [ ] Single H1 - keyword + year
- [ ] 6 H2s in article + 1 FAQ H2 = 7 total
- [ ] 2-3 H3s under "Where Sayso Wins" (`whereSaysoWinsDetails`)
- [ ] No heading levels skipped
- [ ] All paragraphs ≤3 sentences
- [ ] Total word count 1,500-2,500
- [ ] Comparison table has 5-8 rows

### Internal Links (5-8 total)
- [ ] Link to `/compare/` hub (breadcrumb)
- [ ] Link to `/demo/` (TLDR CTA + inline CTA + closing CTA)
- [ ] Link to `/pricing/` (standalone link + inline in pricing text)
- [ ] 1+ links to `/features/` pages (inline in content + `featureLinks`)
- [ ] 1+ links to `/for/` persona pages (inline in whoItsFor + `personaLinks`)
- [ ] 1+ links to other comparison pages (`relatedComparisons`)

### CTAs
- [ ] TLDR CTA at top of page
- [ ] Inline CTA after comparison table
- [ ] Closing CTA at bottom of page

### Honesty
- [ ] Comparison table is honest for both sides
- [ ] "Where Competitor Wins" acknowledges at least one real advantage
- [ ] No fabricated competitor information
- [ ] Competitor pricing stated honestly or marked as "Contact [Competitor]"
