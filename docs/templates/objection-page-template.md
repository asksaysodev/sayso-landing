# Objection Page Template

This document is the complete reference for creating `/objections/[slug]` pages. It covers SEO rules, content structure, the TypeScript data interface, internal linking requirements, and a step-by-step process for adding new objection pages at scale.

**Reference implementation:** `lib/content/objections/not-ready-yet.ts`

---

## Table of Contents

1. [File Locations](#file-locations)
2. [What an Objection Page Is (and Is Not)](#what-an-objection-page-is-and-is-not)
3. [SEO Rules - Universal](#seo-rules--universal)
4. [SEO Rules - Objection-Specific](#seo-rules--objection-specific)
5. [Page Structure (Section by Section)](#page-structure-section-by-section)
6. [TypeScript Data Interface](#typescript-data-interface)
7. [Internal Linking Requirements](#internal-linking-requirements)
8. [CTA Placement](#cta-placement)
9. [Schema Markup (JSON-LD)](#schema-markup-json-ld)
10. [Content Quality Checklist](#content-quality-checklist)
11. [How to Create a New Objection Page](#how-to-create-a-new-objection-page)
12. [Planned Objection Pages](#planned-objection-pages)
13. [SEO Audit Checklist](#seo-audit-checklist)

---

## File Locations

| File | Purpose |
|------|---------|
| `lib/content/objections/types.ts` | `ObjectionEntry` and `ObjectionResponse` TypeScript interfaces |
| `lib/content/objections/index.ts` | Content loader - exports `getAllObjectionEntries()`, `getObjectionBySlug()`, `getAllObjectionSlugs()` |
| `lib/content/objections/*.ts` | Individual objection content files (one per objection) |
| `components/pages/ObjectionPage.tsx` | Shared page template component - renders all objection pages |
| `app/(content)/objections/[slug]/page.tsx` | Next.js dynamic route - handles metadata + static params |
| `app/(content)/objections/page.tsx` | Objections hub listing page |
| `lib/content/hubs/objections.ts` | Hub page config - lists all child objection pages |
| `lib/seo/metadata.ts` | `buildMetadata()` - generates title, description, canonical, OG tags |
| `lib/seo/schema.ts` | JSON-LD generators - `generateHowToJsonLd()`, `generateBreadcrumbJsonLd()`, `generateFAQPageJsonLd()` |

---

## What an Objection Page Is (and Is Not)

Objection pages sit at the **top-to-mid funnel**. The visitor is searching for help handling a specific real estate prospecting objection. They want scripts, context, and practical advice - not a product pitch.

**An objection page IS:**
- A practical resource that teaches agents how to respond to a specific prospect objection
- Designed to rank for "how to handle [objection]" keywords and build topical authority
- Structured around 3 response frameworks at different confidence levels (safe, stronger, advanced)

**An objection page is NOT:**
- A product page (that is a `/features/` page)
- A general how-to guide (that is a blog post)
- A definition page (that is a `/glossary/` page)
- A competitor comparison (that is a `/compare/` page)

If you find yourself describing Sayso features in detail, you are writing a feature page. Keep the focus on the objection, the psychology behind it, and the response scripts. Sayso gets a single brief section near the end.

---

## SEO Rules - Universal

These rules apply to every objection page without exception.

### Keyword Placement - Required Locations

| Location | Rule | Example |
|----------|------|---------|
| **H1** | Must contain the exact target keyword naturally. Format: `How to Handle "[Objection]" in Real Estate` | `How to Handle "Not Ready Yet" in Real Estate` |
| **First 100 words** | The exact target keyword must appear within the first 2 sentences of the opening paragraph. The first sentence is the featured snippet target. | `Knowing how to handle "not ready yet" in real estate is one of the most important prospecting skills...` |
| **Meta title** | Format: `[Target Keyword Phrase] \| Sayso`. The `\| Sayso` suffix is added automatically by the root layout template. Your `seoTitle` field should just be the keyword phrase. Max 60 characters for the `seoTitle` value. | `seoTitle: 'How to Handle "Not Ready Yet" in Real Estate'` (46 chars + " \| Sayso" = 55 total) |
| **Meta description** | 150-160 characters max. Must contain the target keyword. Format: `[What the page teaches]. [Benefit/outcome]. [Optional CTA].` | `Learn how to handle "not ready yet" in real estate with 3 proven response frameworks. Keep the conversation alive and book more appointments.` |
| **URL slug** | Core objection term only, hyphenated. Does not include "how to handle." | `/objections/not-ready-yet/` (not `/objections/how-to-handle-not-ready-yet/`) |
| **First H2** | Must contain the keyword or a strong semantic variation. | `Why Prospects Say "I'm Not Ready Yet"` |
| **Image alt text** | If an image is present, describe it AND include the keyword or a variation naturally. | `Real estate agent handling the not ready yet objection on a prospecting call with Sayso coaching on screen` |

### Keyword Density

| Type | Target | Rule |
|------|--------|------|
| **Exact target keyword** | 3-5 times | Spread across H1, opening paragraph, "Why They Say This," "What to Say Next," and meta title/description. Never stuff. |
| **Semantic variations** | 5-10 times | Include the objection phrase itself ("not ready yet"), variations ("not ready," "I'm not ready"), and related concepts ("objection handling," "prospecting objection," "when a prospect says"). |

### Heading Structure

- **One H1 only** - the page title.
- **H2s:** 5-6 per page. Each major section gets an H2.
- **H3s:** Used for subsections (response framework labels under "3 Ways to Respond," and "What to Say Next").
- **Never skip heading levels** (no H1 -> H3 without an H2 between them).
- **At least one H2** must contain a semantic variation of the target keyword.

### Canonical URL

- Built automatically by `buildMetadata()` in `lib/seo/metadata.ts`.
- Format: `https://asksayso.com/objections/[slug]/`
- **Always includes a trailing slash.** This is enforced in the metadata builder.

### Brand Name

The correct spelling is **Sayso** (capital S, lowercase a-y-s-o). Never write "SaySo", "SAYSO", "Say So", or "say so".

---

## SEO Rules - Objection-Specific

### Content Constraints

- **Paragraphs:** Max 3 sentences per paragraph. The `whyTheySayThis` field supports `\n\n` to split into multiple paragraphs.
- **Total word count:** 600-900 words. Objection pages are practical and concise. Do not pad with filler.
- **Tone:** Clear, conversational, empathetic. Think "experienced agent coaching a newer agent" - not a textbook or Wikipedia article.
- **No filler openers.** Do not start with "In the competitive world of real estate..." or similar. Get to the answer immediately.

### Featured Snippet Optimization

The opening paragraph is your featured snippet target. Follow these rules:

- **Sentence 1** must be a clean, standalone answer to the H1 question. Under 45 words.
- Use the format: `Knowing how to handle "[objection]" in real estate [rest of sentence].`
- The full opening paragraph should be 2-3 sentences max and work as a standalone answer if Google pulls it.

### Response Frameworks

Every objection page provides 3 response frameworks at different confidence levels:

| Level | Label | Purpose |
|-------|-------|---------|
| **Safe** | "The Safe Response" | Low-risk, validating. Good for agents who are new to handling this objection. |
| **Stronger** | "The Stronger Response" | More direct. Forces specificity or reframes the conversation. |
| **Advanced** | "The Advanced Response" | High-confidence. Reframes the objection as an advantage or uses a value offer. |

Each response includes:
- A **script** - the exact words to say, in quotes, italic
- A **"Why it works"** explanation - 1-2 sentences explaining the psychology

### "Why They Say This" Section

- Explain the psychology behind the objection. Why does the prospect say this?
- 2-3 short paragraphs (split with `\n\n` in the content string).
- This section builds empathy and helps agents understand the prospect's mindset.

### Common Mistakes

- 4-6 bullet points describing what NOT to do when hearing this objection.
- Each mistake should be a short, specific statement - not a paragraph.
- Focus on mistakes that actually cost agents deals.

### FAQ

- 3-4 questions and answers.
- First question should be a variation of the H1 (e.g., `What does "I'm not ready yet" really mean in real estate?`).
- Include at least one "how to" question related to the objection.
- Include one question about how AI/Sayso helps with objection handling.
- Keep answers to 2-3 sentences each.

---

## Page Structure (Section by Section)

The `ObjectionPage.tsx` component renders sections in this exact order:

### 1. JSON-LD Schema (invisible)
- `HowTo` schema with the 3 response frameworks as steps
- `BreadcrumbList` schema (injected by Breadcrumb component)
- `FAQPage` schema (injected by FAQ component)

### 2. Breadcrumb Navigation
- Visual breadcrumb: Home > Objections > [H1]
- Links to `/` and `/objections/` hub
- Automatically injects `BreadcrumbList` JSON-LD

### 3. Badge + H1
- "OBJECTION" badge above the H1
- H1 contains the exact target keyword

### 4. Objection Quote
- Styled speech bubble showing the exact words the prospect says
- Pulls from `objectionQuote` field
- Visual element - not crawled as main content, but reinforces the topic

### 5. Opening Paragraph (Featured Snippet Target)
- 2-3 sentences max
- Sentence 1: clean definition/answer with exact keyword (under 45 words)
- This is what Google pulls for featured snippets

### 6. Optional Hero Image
- Only renders if `heroImage` is provided
- Uses Next.js `<Image>` component with keyword-optimized alt text
- Placed after the opening paragraph

### 7. Why They Say This (H2)
- Custom heading from `whyTheyTitle`
- 2-3 paragraphs explaining the psychology behind the objection
- Should contain one instance of the target keyword woven in naturally

### 8. 3 Ways to Respond (H2)
- Three response cards (safe, stronger, advanced) - each as an H3
- Each card: script in a yellow-bordered blockquote + "Why it works" explanation
- **"What to Say Next" (H3)** - merged under this section as a final subsection
  - Transition advice for after the initial response
  - Should contain one instance of the target keyword

### 9. Common Mistakes to Avoid (H2)
- Bulleted list with red "X" markers
- 4-6 specific mistakes

### 10. How Sayso Helps (H2)
- Brief product tie-in (2-4 sentences)
- Connect the objection to a specific Sayso feature
- Keep it brief - this is not a feature page

### 11. Inline CTA
- `ContentInlineCTA` component - "Book a Demo" + "Download Sayso"
- Appears after the Sayso section (never before it)

### 12. Related Objections (H2)
- Links to 3-5 other objection pages
- Each shows the objection title + target keyword

### 13. Cross-Section Links
- **Deeper reading:** Link to a related blog post (if `relatedBlogPost` exists)
- **Related feature:** Link to a related feature page (if `relatedFeature` exists)
- Styled as boxed link cards with arrow indicators

### 14. FAQ
- Rendered by the `FAQ` component with accordion behavior
- Automatically generates `FAQPage` JSON-LD

### 15. Closing CTA
- `ContentCTA` component - full-width bottom section

---

## TypeScript Data Interface

Every objection page is defined by an `ObjectionEntry` object in `lib/content/objections/types.ts`:

```typescript
export interface ObjectionResponse {
  label: string;       // e.g., "The Safe Response"
  script: string;      // The exact words to say (in quotes)
  whyItWorks: string;  // 1-2 sentence explanation
}

export interface ObjectionEntry {
  slug: string;                  // URL slug: "not-ready-yet"
  keyword: string;               // Target SEO keyword: 'how to handle "not ready yet" real estate'
  seoTitle: string;              // Meta title (max 60 chars - "| Sayso" added by layout)
  seoDescription: string;        // Meta description (max 160 chars)
  h1: string;                    // Page H1 - must contain exact target keyword
  objectionQuote: string;        // Exact prospect words: "I'm not ready yet."
  openingParagraph: string;      // 2-3 sentences, featured snippet target
  whyTheyTitle: string;          // Custom H2 for "Why They Say This"
  whyTheySayThis: string;        // 2-3 paragraphs separated by \n\n
  responses: {
    safe: ObjectionResponse;     // Low-risk response
    stronger: ObjectionResponse; // More direct response
    advanced: ObjectionResponse; // High-confidence response
  };
  whatToSayNext: string;         // Transition advice after initial response
  commonMistakes: string[];      // 4-6 mistake descriptions
  howSaysoHelps: string;         // Brief product tie-in (2-4 sentences)
  relatedObjections: { title: string; slug: string; keyword: string }[];  // 3-5 related objections
  faq: { question: string; answer: string }[];  // 3-4 Q&A pairs
  relatedBlogPost?: { title: string; href: string };   // Down-funnel blog link
  relatedFeature?: { title: string; href: string };    // Cross-section feature link
  heroImage?: { src: string; alt: string };            // Optional image with keyword-rich alt
  ogImage?: string;              // Custom OG image (defaults to /og-default.png)
}
```

### Field-by-Field Guidance

| Field | Max Length / Count | Notes |
|-------|-------------------|-------|
| `slug` | - | Lowercase, hyphenated. The objection phrase only (e.g., `not-ready-yet`). |
| `keyword` | - | Full target keyword. Format: `how to handle "[objection]" real estate` |
| `seoTitle` | 60 chars | Should match or closely mirror the H1. Layout appends " \| Sayso". |
| `seoDescription` | 150-160 chars | Format: What page teaches. Benefit. Optional CTA. Dev build warns if over 160. |
| `h1` | - | Must contain the exact target keyword. Format: `How to Handle "[Objection]" in Real Estate` |
| `objectionQuote` | - | The exact words a prospect says. Used in the speech bubble. e.g., `I'm not ready yet.` |
| `openingParagraph` | 2-3 sentences | Featured snippet target. Sentence 1 under 45 words with exact keyword. |
| `whyTheyTitle` | - | Custom H2. Format: `Why Prospects Say "[Objection]"` |
| `whyTheySayThis` | 2-3 paragraphs | Separate paragraphs with `\n\n`. Include 1 keyword instance. |
| `responses.safe` | - | Label: "The Safe Response". Script + why it works. |
| `responses.stronger` | - | Label: "The Stronger Response". Script + why it works. |
| `responses.advanced` | - | Label: "The Advanced Response". Script + why it works. |
| `whatToSayNext` | 1 paragraph | Transition advice. Include 1 keyword instance. |
| `commonMistakes` | 4-6 items | Short, specific strings. Each is a single mistake description. |
| `howSaysoHelps` | 2-4 sentences | Brief. Connect objection to a Sayso feature. Not a feature page. |
| `relatedObjections` | 3-5 items | Other objection slugs. Include title, slug, and keyword for each. |
| `faq` | 3-4 items | First Q = variation of H1. One "how to" Q. One AI/Sayso Q. Answers 2-3 sentences. |
| `relatedBlogPost` | 0-1 item | Link to a related blog post. Title + href. |
| `relatedFeature` | 0-1 item | Link to a related feature page. Title + href. |
| `heroImage` | 0-1 item | Image src + keyword-rich alt text. |

---

## Internal Linking Requirements

Every objection page must include **6-8 internal links** with cross-section diversity. The component handles some automatically, but the content file must provide the data.

| Link Target | How It Gets There | Required? |
|-------------|-------------------|-----------|
| `/objections/` hub | Breadcrumb | Yes (automatic) |
| `/` (homepage) | Breadcrumb + CTA buttons | Yes (automatic) |
| `/demo/` | Inline CTA + closing CTA | Yes (automatic) |
| 3-5 other objection pages | `relatedObjections` array | Yes (content file) |
| 1 blog post | `relatedBlogPost` field | Yes (content file) |
| 1 feature page | `relatedFeature` field | Yes (content file) |

**Total automatic links:** 4 (home, objections hub, demo x2)
**Content-provided links:** 5-7 (related objections + blog post + feature page)

**Cross-section diversity is critical.** Do not only link within `/objections/`. Every page must link to at least one blog post and one feature page.

---

## CTA Placement

Objection pages are informational - earn trust with the content before pitching.

| Position | Component | Placement |
|----------|-----------|-----------|
| **Inline CTA** | `ContentInlineCTA` | After the "How Sayso Helps" section - never before it |
| **Closing CTA** | `ContentCTA` | Full-width block at the very bottom of the page |

**No CTA appears before the product section.** This is a hard rule. The reader came for objection-handling advice, not a sales pitch.

---

## Schema Markup (JSON-LD)

Each objection page includes three JSON-LD blocks:

### 1. HowTo
Generated by `generateHowToJsonLd()`. Uses the 3 response frameworks as steps.
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Respond When a Prospect Says \"I'm not ready yet.\"",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "The Safe Response", "text": "..." },
    { "@type": "HowToStep", "position": 2, "name": "The Stronger Response", "text": "..." },
    { "@type": "HowToStep", "position": 3, "name": "The Advanced Response", "text": "..." }
  ]
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
    { "@type": "ListItem", "position": 2, "name": "Objections", "item": "https://asksayso.com/objections" },
    { "@type": "ListItem", "position": 3, "name": "[H1]", "item": "" }
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

Use this before submitting any new objection page:

### Copy Quality
- [ ] H1 contains the exact target keyword
- [ ] Opening paragraph starts with a clean definition sentence (under 45 words)
- [ ] Opening paragraph is 2-3 sentences max
- [ ] No paragraph exceeds 3 sentences
- [ ] Scripts sound natural - agents would actually say these words
- [ ] "Why it works" explanations reference specific psychology, not generic praise
- [ ] Common mistakes are specific, not platitudes
- [ ] `howSaysoHelps` is 2-4 sentences, not a feature page
- [ ] Tone is conversational and empathetic, not textbook
- [ ] No filler openers ("In the world of real estate...")
- [ ] Brand name is "Sayso" (not SaySo, SAYSO, Say So)

### SEO Compliance
- [ ] `seoTitle` is under 60 characters
- [ ] `seoDescription` is 150-160 characters, follows What/Benefit/CTA format
- [ ] Exact target keyword appears 3-5 times across all rendered content
- [ ] Semantic variations appear 5-10 times
- [ ] Keyword is in H1, first 100 words, meta title, meta description, and first H2
- [ ] If `heroImage` is set, alt text includes keyword or variation
- [ ] At least one FAQ question contains a variation of the keyword

### Structure
- [ ] Word count is 600-900
- [ ] 3 response frameworks (safe, stronger, advanced) with scripts + why it works
- [ ] 2-3 paragraphs in "Why They Say This"
- [ ] 4-6 common mistakes
- [ ] 3-4 FAQ items (first Q = H1 variation, one "how to" Q, one AI/Sayso Q)
- [ ] `relatedObjections` has 3-5 other objection slugs
- [ ] `relatedBlogPost` links to a relevant blog post
- [ ] `relatedFeature` links to a relevant feature page

---

## How to Create a New Objection Page

### Step 1: Create the content file

Create a new TypeScript file in `lib/content/objections/`:

```
lib/content/objections/[slug].ts
```

Export an `ObjectionEntry` object following the interface and all the rules above. Use `not-ready-yet.ts` as your reference.

### Step 2: Register it in the content loader

Open `lib/content/objections/index.ts` and:

1. Import your new entry:
   ```typescript
   import { yourObjection } from './your-objection';
   ```

2. Add it to the `entries` array:
   ```typescript
   const entries: ObjectionEntry[] = [notReadyYet, yourObjection];
   ```

That is it. The dynamic route at `app/(content)/objections/[slug]/page.tsx` automatically picks up new entries via `generateStaticParams()`.

### Step 3: Update the hub (if needed)

If your objection is not already listed in `lib/content/hubs/objections.ts`, add it to the `childPages` array with:
- `title` - the objection in quotes (e.g., `"Already Working with an Agent"`)
- `slug` - must match your content file slug
- `description` - one-liner describing what the page covers
- `keyword` - the target keyword
- `linkText` - CTA text on the hub page

### Step 4: Cross-link from other objection pages

Open other existing objection content files and add your new page to their `relatedObjections` array where relevant. Objection pages should cross-link to each other.

### Step 5: Verify

1. Run `npm run build` - check for TypeScript errors and dev-mode SEO warnings.
2. Run `npm run dev` and visit `http://localhost:3001/objections/[slug]`.
3. View page source and verify:
   - Meta title and description contain the keyword
   - Canonical URL has trailing slash
   - All three JSON-LD blocks are present (HowTo, BreadcrumbList, FAQPage)
4. Run the page content through the [SEO Audit Checklist](#seo-audit-checklist) below.

---

## Planned Objection Pages

These are defined in the objections hub (`lib/content/hubs/objections.ts`) but not yet implemented (unless noted):

| Objection | Slug | Target Keyword | Status |
|-----------|------|----------------|--------|
| "I'm Not Ready Yet" | `not-ready-yet` | how to handle "not ready yet" real estate | Done |
| "Already Working with an Agent" | `already-have-an-agent` | how to handle "already working with agent" | Not started |
| "Just Looking" | `just-looking` | how to respond to "just looking" real estate | Not started |
| "Call Me Later" | `call-me-later` | real estate script for "call me later" | Not started |
| "The Price Is Too High" | `price-too-high` | how to handle price objection real estate | Not started |
| "We Want to Sell Ourselves" | `want-to-sell-ourselves` | FSBO objection handling | Not started |
| "I Need to Think About It" | `need-to-think-about-it` | what to say when prospect shuts down | Not started |
| "Not Interested" | `not-interested` | what to say when lead is not interested | Not started |
| "Already Listed" | `already-listed` | how to handle already listed objection | Not started |
| "Bad Experience with Agents" | `bad-experience-with-agents` | how to handle bad agent experience objection | Not started |
| "The Market Is Bad" | `market-is-bad` | how to handle market objection real estate | Not started |
| "Just Send Me Listings" | `just-send-listings` | how to redirect a conversation real estate | Not started |
| "How Much Is Your Commission?" | `how-much-is-your-commission` | how to handle commission question real estate | Not started |
| "We'll Wait for Spring" | `well-wait-for-spring` | how to handle timing objection real estate | Not started |
| "My Spouse Needs to Decide" | `my-spouse-needs-to-decide` | how to handle third-party objection real estate | Not started |

**Note:** Before building each page, validate the keyword with actual search volume data. Some hub keywords may benefit from long-tail variations.

---

## SEO Audit Checklist

Run through this after creating or editing any objection page:

### Keyword Placement (all must pass)
- [ ] Target keyword in H1
- [ ] Target keyword in first 2 sentences of opening paragraph
- [ ] Target keyword in `seoTitle`
- [ ] Target keyword in `seoDescription`
- [ ] Keyword or semantic variation in first H2 (`whyTheyTitle`)
- [ ] If `heroImage` exists, keyword or variation in alt text
- [ ] Keyword variation in at least one FAQ question

### Keyword Density
- [ ] Exact keyword appears 3-5 times in rendered content
- [ ] Semantic variations appear 5-10 times total
- [ ] No keyword stuffing - every usage reads naturally

### Featured Snippet
- [ ] Opening paragraph sentence 1 is under 45 words
- [ ] Opening paragraph is 2-3 sentences and works as a standalone answer
- [ ] Uses the format: `Knowing how to handle "[objection]" in real estate [rest of sentence].`

### Technical SEO
- [ ] `seoTitle` is ≤60 characters (layout adds " | Sayso")
- [ ] `seoDescription` is 150-160 characters
- [ ] Canonical URL ends with trailing slash
- [ ] HowTo JSON-LD present with 3 response steps
- [ ] BreadcrumbList JSON-LD present (automatic via Breadcrumb component)
- [ ] FAQPage JSON-LD present (automatic via FAQ component)
- [ ] OG title, description, and image are set

### Content Structure
- [ ] Single H1 - contains exact target keyword
- [ ] 5-6 H2s - at least one contains keyword variation
- [ ] H3s used for response labels + "What to Say Next" (proper hierarchy under "3 Ways to Respond" H2)
- [ ] No heading levels skipped
- [ ] All paragraphs ≤3 sentences
- [ ] Total word count 600-900

### Internal Links (6-8 total with cross-section diversity)
- [ ] Link to `/objections/` hub (breadcrumb)
- [ ] Link to `/demo/` (CTA)
- [ ] 3-5 links to other objection pages
- [ ] 1 link to a related blog post
- [ ] 1 link to a related feature page

### CTAs
- [ ] No CTA before the "How Sayso Helps" section
- [ ] Inline CTA after "How Sayso Helps"
- [ ] Closing CTA at bottom of page
