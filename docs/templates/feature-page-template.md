# Feature Page Template

This document is the complete reference for creating `/features/[slug]` pages. It covers SEO rules, content structure, the TypeScript data interface, internal linking requirements, and a step-by-step process for adding new feature pages at scale.

**Reference implementation:** `lib/content/features/real-time-coaching.ts`

---

## Table of Contents

1. [File Locations](#file-locations)
2. [What a Feature Page Is (and Is Not)](#what-a-feature-page-is-and-is-not)
3. [SEO Rules — Universal](#seo-rules--universal)
4. [SEO Rules — Feature-Specific](#seo-rules--feature-specific)
5. [Page Structure (Section by Section)](#page-structure-section-by-section)
6. [TypeScript Data Interface](#typescript-data-interface)
7. [Internal Linking Requirements](#internal-linking-requirements)
8. [CTA Placement](#cta-placement)
9. [Schema Markup (JSON-LD)](#schema-markup-json-ld)
10. [Content Quality Checklist](#content-quality-checklist)
11. [How to Create a New Feature Page](#how-to-create-a-new-feature-page)
12. [Planned Feature Pages](#planned-feature-pages)
13. [SEO Audit Checklist](#seo-audit-checklist)

---

## File Locations

| File | Purpose |
|------|---------|
| `lib/content/features/types.ts` | `FeatureEntry` TypeScript interface — every content field |
| `lib/content/features/index.ts` | Content loader — exports `getAllFeatureEntries()`, `getFeatureBySlug()`, `getAllFeatureSlugs()` |
| `lib/content/features/*.ts` | Individual feature content files (one per feature) |
| `components/pages/FeaturePage.tsx` | Shared page template component — renders all feature pages |
| `app/(content)/features/[slug]/page.tsx` | Next.js dynamic route — handles metadata + static params |
| `app/(content)/features/page.tsx` | Features hub listing page |
| `lib/content/hubs/features.ts` | Hub page config — lists all child feature pages |
| `lib/seo/metadata.ts` | `buildMetadata()` — generates title, description, canonical, OG tags |
| `lib/seo/schema.ts` | JSON-LD generators — `generateSoftwareAppJsonLd()`, `generateBreadcrumbJsonLd()`, `generateFAQPageJsonLd()` |

---

## What a Feature Page Is (and Is Not)

Feature pages sit at the **mid-to-bottom of the funnel**. The visitor is solution-aware — they know what kind of tool they want and are checking whether Sayso delivers it.

**A feature page IS:**
- A product page that describes what Sayso does and why it matters
- Designed to both rank for its target keyword AND convert visitors toward a demo or trial
- Focused on a specific capability (real-time coaching, call notes, objection handling, etc.)

**A feature page is NOT:**
- A how-to guide or tutorial (that is a blog post)
- An educational article (that is a glossary page)
- A competitor comparison (that is a `/compare/` page)
- A persona pitch (that is a `/for/` page)

If you find yourself writing a "how to" guide, you are writing a blog post, not a feature page. Keep the focus on what Sayso does, how it works, and why it matters.

---

## SEO Rules — Universal

These rules apply to every feature page without exception.

### Keyword Placement — Required Locations

| Location | Rule | Example |
|----------|------|---------|
| **H1** | Must contain the target keyword naturally. Must be benefit-oriented — sell the outcome, not just the feature name. Use an em-dash to separate keyword from benefit clause. | `Real-Time Sales Help — AI That Coaches You Through Every Call` |
| **First 100 words** | The exact target keyword must appear within the first 100 words of body content (the hero paragraphs). Ideally in the first 2 sentences. | `Sayso gives you real-time sales help for real estate agents who prospect on the phone...` |
| **Meta title** | Format: `[Target Keyword Phrase] | Sayso`. The `| Sayso` suffix is added automatically by the root layout template. Your `seoTitle` field should just be the keyword phrase portion. Max 60 characters for the `seoTitle` value. | `seoTitle: 'Real-Time Sales Help for Real Estate Agents'` (48 chars + " | Sayso" = 57 total) |
| **Meta description** | 150-160 characters max. Must contain the target keyword. Follow the format: `[Problem]. [How Sayso solves it]. [CTA].` | `Freeze on a call and lose the listing. Sayso gives real-time sales help for real estate agents with live coaching prompts on screen. Book a demo.` |
| **URL slug** | Short, descriptive. Does not need to match the keyword exactly. | `/features/real-time-coaching/` |
| **First H2** | Must contain the keyword or a strong semantic variation. Use the `howItWorksHeading` field to customize. | `How Real-Time Sales Help Works` |
| **Image alt text** | Describe the image AND include the keyword or a variation. Reference both the feature and the real estate context. | `Sayso real-time sales help prompt appearing on screen during a live real estate prospecting call` |

### Keyword Density

| Type | Target | Rule |
|------|--------|------|
| **Exact target keyword** | 3-5 times | Spread across H1, hero, "Who This Is For," FAQ, and differentiators heading. Never stuff. |
| **Semantic variations** | 6-10 times | Include the feature name, related problem statements, and outcome phrases (e.g., "live coaching," "on-call guidance," "real-time prompts"). |

### Heading Structure

- **One H1 only** — the page title.
- **H2s:** 5-7 per page. Each major section gets an H2.
- **H3s:** Used for subsections (e.g., differentiator titles under the differentiators H2).
- **Never skip heading levels** (no H1 → H3 without an H2 between them).
- **At least one H2** must contain a semantic variation of the target keyword.
- The differentiators H2 should include the brand: `What Makes Sayso's [Feature] Different`.

### Canonical URL

- Built automatically by `buildMetadata()` in `lib/seo/metadata.ts`.
- Format: `https://asksayso.com/features/[slug]/`
- **Always includes a trailing slash.** This is enforced in the metadata builder.

### Brand Name

The correct spelling is **Sayso** (capital S, lowercase a-y-s-o). Never write "SaySo", "SAYSO", "Say So", or "say so".

---

## SEO Rules — Feature-Specific

### Content Constraints

- **No vaporware.** Only describe features that exist today. Features listed as "Coming Soon" on pricing must NOT be referenced in content pages until they are live.
- **Paragraphs:** Max 3 sentences per paragraph. The `heroDescription` and `whoItsFor` fields are `string[]` — each string renders as its own `<p>` tag.
- **Total word count:** 800-1,500 words. Feature pages should be thorough but not bloated. Aim for the 800-1,000 range.
- **Tone:** Confident and clear. You are showing someone what the product does — be specific, not vague.

### Differentiators

- Compare against the **generic way** agents handle this problem (manual scripts, post-call reviews, memorization).
- Do NOT compare against specific competitors — that is what `/compare/` pages are for.
- Each differentiator should be 2-3 sentences.
- Differentiator titles render as `<h3>` tags for proper heading hierarchy.

### Social Proof

- If real testimonials exist, use them.
- If no testimonials exist yet, frame it as outcomes: "Agents using [feature] report [specific outcome]."
- Always populate the `socialProof` field — even an outcome-framed statement is better than leaving the section empty.

### FAQ

- 4-5 questions and answers.
- Must include questions about:
  - How the feature works
  - Integration / compatibility
  - Whether it is useful for experienced agents (not just beginners)
  - **Pricing and getting started** (always include this one)
- Answers should be 2-3 sentences each.
- At least one FAQ question should include the exact target keyword.
- The FAQ component automatically generates `FAQPage` JSON-LD schema.

---

## Page Structure (Section by Section)

The `FeaturePage.tsx` component renders sections in this exact order:

### 1. JSON-LD Schema (invisible)
- `SoftwareApplication` schema with feature list
- `BreadcrumbList` schema (Home > Features > [Feature Title])
- `FAQPage` schema (injected by the FAQ component)

### 2. Breadcrumb Navigation
- Visual breadcrumb: Home > Features > [H1]
- Links to `/` and `/features/` hub

### 3. Hero Section
- **H1:** Benefit-oriented title with keyword + em-dash benefit clause
- **Body:** 2-3 paragraphs from `heroDescription[]`. Each paragraph is max 3 sentences.
  - Paragraph 1: State the **problem** this feature solves. Lead with the pain.
  - Paragraph 2: Introduce **Sayso's solution**. Include the exact target keyword here.
  - Paragraph 3: Reinforce the outcome — what changes for the agent.
- **Hero CTA:** Two buttons — "Book a Demo" (`/demo`) and "Download Sayso" (`/`)
- **Screenshot placeholder:** Image placeholder with keyword-rich alt text

### 4. How It Works
- **H2:** Custom heading from `howItWorksHeading` (should contain keyword variation). Falls back to "How It Works."
- **Steps:** 3-5 numbered steps. Each has a bold step title and a 1-2 sentence description.
- Keep it concrete: "When a lead says X, Sayso shows Y on your screen."

### 5. Secondary CTA (Inline)
- `ContentInlineCTA` component — positioned immediately after "How It Works."
- Customizable headline and subheading via props.

### 6. Who This Is For
- **H2:** "Who This Is For"
- **Body:** 2-4 paragraphs from `whoItsFor[]`. Each paragraph covers a different persona or use case:
  - Solo agents
  - ISAs / high-volume callers
  - New agents
  - Team leaders / managers
- **Persona links:** Rendered below the text. Links to relevant `/for/` pages.
- **Pricing link:** Always rendered — "View Pricing" linking to `/pricing/`.

### 7. Differentiators
- **H2:** Custom heading from `differentiatorsHeading`. Format: `What Makes Sayso's [Feature Name] Different`. Falls back to "What Makes This Different."
- **Cards:** 3-4 differentiators in a 2-column grid.
- Each card has an `<h3>` title and a `<p>` body (2-3 sentences).

### 8. Social Proof
- **H2:** "What Agents Are Saying"
- **Blockquote:** Styled with yellow left border. Italic text.
- Only renders if `socialProof` is defined (but it should always be defined — see rules above).

### 9. Related Features
- **H2:** "Related Features"
- List of 2-3 links to other feature pages.
- Includes a "See all features" link to the `/features/` hub.

### 10. Related Blog Posts
- **H2:** "From the Blog"
- 1-2 links to relevant blog posts that support this feature's topic.

### 11. FAQ
- **H2:** "Frequently Asked Questions" (rendered by the FAQ component)
- Expandable accordion with 4-5 Q&A pairs.
- Automatically generates `FAQPage` JSON-LD.

### 12. Closing CTA
- `ContentCTA` component — full-width dark section with "Book a Demo" button.

---

## TypeScript Data Interface

Every feature page is defined by a `FeatureEntry` object in `lib/content/features/types.ts`:

```typescript
export interface FeatureEntry {
  slug: string;                  // URL slug: "real-time-coaching"
  keyword: string;               // Target SEO keyword
  seoTitle: string;              // Meta title (max 60 chars — "| Sayso" added by layout)
  seoDescription: string;        // Meta description (max 160 chars)
  h1: string;                    // Page H1 — keyword + benefit clause
  heroDescription: string[];     // Each string = one <p> in the hero (max 3 sentences each)
  howItWorksHeading?: string;    // Custom H2 for "How It Works" (include keyword variation)
  howItWorks: { step: string; description: string }[];  // 3-5 numbered steps
  whoItsFor: string[];           // Each string = one <p> in "Who This Is For"
  personaLinks?: { title: string; href: string }[];     // Links to /for/ pages
  differentiatorsHeading?: string;  // Custom H2: "What Makes Sayso's [X] Different"
  differentiators: { title: string; body: string }[];   // 3-4 differentiator cards
  socialProof?: string;          // Testimonial or outcome-framed statement
  faq: { question: string; answer: string }[];          // 4-5 Q&A pairs
  relatedFeatures: { title: string; slug: string }[];   // 2-3 other feature slugs
  relatedBlogPosts: { title: string; href: string }[];  // 1-2 blog post links
  featureList: string[];         // For SoftwareApplication JSON-LD schema
  screenshotAlt: string;         // Alt text for hero image placeholder
  ogImage?: string;              // Custom OG image path (defaults to /og-default.png)
}
```

### Field-by-Field Guidance

| Field | Max Length / Count | Notes |
|-------|-------------------|-------|
| `slug` | — | Lowercase, hyphenated. Should describe the feature clearly. |
| `keyword` | — | The exact long-tail keyword you are targeting. |
| `seoTitle` | 60 chars | Layout appends " \| Sayso". Dev build warns if over 60. |
| `seoDescription` | 160 chars | Format: Problem. Solution. CTA. Dev build warns if over 160. |
| `h1` | — | Keyword + em-dash + benefit. e.g., `[Keyword] — [Benefit Clause]` |
| `heroDescription` | 2-3 strings | Paragraph 1 = problem. Paragraph 2 = solution + keyword. Paragraph 3 = outcome. |
| `howItWorksHeading` | — | Include a keyword variation. e.g., `How [Keyword Phrase] Works` |
| `howItWorks` | 3-5 steps | Each step: bold title + 1-2 sentence description. |
| `whoItsFor` | 2-4 strings | One paragraph per persona/use case. Include keyword in the first paragraph. |
| `personaLinks` | 1-3 links | Only link to persona pages that actually exist. Currently only `/for/solo-agents`. |
| `differentiatorsHeading` | — | Format: `What Makes Sayso's [Feature Name] Different` |
| `differentiators` | 3-4 items | Title = `<h3>`. Body = 2-3 sentences. Compare against generic approaches, not competitors. |
| `socialProof` | — | Real testimonial preferred. Otherwise, outcome-framed statement. |
| `faq` | 4-5 items | Must include pricing/getting-started Q. At least one Q should contain the keyword. |
| `relatedFeatures` | 2-3 items | Link to other feature slugs. |
| `relatedBlogPosts` | 1-2 items | Link to blog posts that support this feature's topic. |
| `featureList` | 3-6 items | Short strings for SoftwareApplication schema. e.g., "Real-time call coaching" |
| `screenshotAlt` | — | Describe the image + include keyword or variation + real estate context. |

---

## Internal Linking Requirements

Every feature page must include **5-8 internal links**. The component handles most of these automatically, but the content file must provide the data.

| Link Target | How It Gets There | Required? |
|-------------|-------------------|-----------|
| `/features/` hub | Breadcrumb + "See all features" in Related Features | Yes (automatic) |
| `/demo/` | Hero CTA button + inline CTA + closing CTA | Yes (automatic) |
| `/pricing/` | "View Pricing" link in "Who This Is For" section | Yes (automatic) |
| 2-3 other feature pages | `relatedFeatures` array | Yes (content file) |
| 1-2 blog posts | `relatedBlogPosts` array | Yes (content file) |
| 1+ persona pages | `personaLinks` array | Yes if pages exist (content file) |
| `/` (homepage) | "Download Sayso" button in hero | Yes (automatic) |

**Total automatic links:** 6 (home, features hub, demo x3, pricing)
**Content-provided links:** 3-5 (related features + blog posts + persona pages)

---

## CTA Placement

Feature pages carry 3 CTAs because the visitor is already solution-aware:

| Position | Component | Placement |
|----------|-----------|-----------|
| **Hero CTA** | Inline buttons | Right after the hero paragraphs, before the screenshot |
| **Secondary CTA** | `ContentInlineCTA` | Immediately after the "How It Works" section |
| **Closing CTA** | `ContentCTA` | Full-width block at the very bottom of the page |

---

## Schema Markup (JSON-LD)

Each feature page includes three JSON-LD blocks:

### 1. SoftwareApplication
Generated by `generateSoftwareAppJsonLd()`. Includes the `featureList` from the content file.
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

### 2. BreadcrumbList
Generated by `generateBreadcrumbJsonLd()`. Injected in the FeaturePage component.
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://asksayso.com/" },
    { "@type": "ListItem", "position": 2, "name": "Features", "item": "https://asksayso.com/features" },
    { "@type": "ListItem", "position": 3, "name": "[H1]", "item": "https://asksayso.com/features/[slug]" }
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

Use this before submitting any new feature page:

### Copy Quality
- [ ] H1 is benefit-oriented, not just the feature name
- [ ] Hero paragraph 1 leads with the problem, not the product
- [ ] No paragraph exceeds 3 sentences
- [ ] Tone is confident and specific — no vague marketing language
- [ ] No "how-to" instructional content (that belongs in blog posts)
- [ ] Brand name is "Sayso" (not SaySo, SAYSO, Say So)
- [ ] No features described that are not live in the product

### SEO Compliance
- [ ] `seoTitle` is under 60 characters
- [ ] `seoDescription` is 150-160 characters, follows Problem/Solution/CTA format
- [ ] Exact target keyword appears 3-5 times across all content
- [ ] Semantic variations appear 6-10 times
- [ ] Keyword is in H1, first 100 words, meta title, meta description, and at least one H2
- [ ] `screenshotAlt` includes the keyword or a variation
- [ ] At least one FAQ question contains the exact keyword

### Structure
- [ ] Word count is 800-1,500
- [ ] 3-5 steps in "How It Works"
- [ ] 2-4 paragraphs in "Who This Is For" covering different personas
- [ ] 3-4 differentiators comparing against generic approaches (not competitors)
- [ ] `socialProof` is populated (outcome-framed if no testimonials)
- [ ] 4-5 FAQ items including a pricing/getting-started question
- [ ] `personaLinks` includes all existing `/for/` pages that are relevant
- [ ] `relatedFeatures` has 2-3 other feature page slugs
- [ ] `relatedBlogPosts` has 1-2 relevant blog post links

---

## How to Create a New Feature Page

### Step 1: Create the content file

Create a new TypeScript file in `lib/content/features/`:

```
lib/content/features/[slug].ts
```

Export a `FeatureEntry` object following the interface and all the rules above. Use `real-time-coaching.ts` as your reference.

### Step 2: Register it in the content loader

Open `lib/content/features/index.ts` and:

1. Import your new entry:
   ```typescript
   import { yourFeature } from './your-feature';
   ```

2. Add it to the `entries` array:
   ```typescript
   const entries: FeatureEntry[] = [realTimeCoaching, yourFeature];
   ```

That is it. The dynamic route at `app/(content)/features/[slug]/page.tsx` automatically picks up new entries via `generateStaticParams()`.

### Step 3: Update the features hub (if needed)

If your feature is not already listed in `lib/content/hubs/features.ts`, add it to the `childPages` array with:
- `title` — display name
- `slug` — must match your content file slug
- `description` — one-liner for the hub listing
- `keyword` — the target keyword
- `linkText` — CTA text on the hub page

### Step 4: Update related features on other pages

Open other existing feature content files and add your new page to their `relatedFeatures` array where relevant. Feature pages should cross-link to each other.

### Step 5: Verify

1. Run `npm run build` — check for TypeScript errors and dev-mode SEO warnings.
2. Run `npm run dev` and visit `http://localhost:3001/features/[slug]`.
3. View page source and verify:
   - Meta title and description contain the keyword
   - Canonical URL has trailing slash
   - All three JSON-LD blocks are present (SoftwareApplication, BreadcrumbList, FAQPage)
4. Run the page content through the [SEO Audit Checklist](#seo-audit-checklist) below.

---

## Planned Feature Pages

These are defined in the features hub (`lib/content/hubs/features.ts`) but not yet implemented:

| Feature | Slug | Target Keyword | Status |
|---------|------|----------------|--------|
| Real-Time Coaching | `real-time-coaching` | real-time sales help for real estate agents | Done |
| Objection Handling | `objection-handling` | real estate objection handling scripts | Not started |
| Call Notes | `call-notes` | automatic call notes real estate | Not started |

**Removed pages:** Call Grading and Role Play were removed as feature pages (Sayso doesn't offer these as standalone features). Their keywords ("how to improve call performance real estate" and "how to practice scripts real estate") have been moved to blog posts in the Conversation Skills and Cold Calling clusters respectively.

**Note:** The keywords listed for unbuilt pages are the originals from the hub config. Before building each page, validate the keyword with actual search volume data and consider using long-tail variants (as was done for real-time-coaching: `real time sales help` became `real-time sales help for real estate agents`).

---

## SEO Audit Checklist

Run through this after creating or editing any feature page:

### Keyword Placement (all must pass)
- [ ] Target keyword in H1
- [ ] Target keyword in first 100 words of body content
- [ ] Target keyword in `seoTitle`
- [ ] Target keyword in `seoDescription`
- [ ] Keyword or semantic variation in first H2 (`howItWorksHeading`)
- [ ] Keyword or variation in `screenshotAlt`
- [ ] Keyword in at least one FAQ question

### Keyword Density
- [ ] Exact keyword appears 3-5 times total
- [ ] Semantic variations appear 6-10 times total
- [ ] No keyword stuffing — every usage reads naturally

### Technical SEO
- [ ] `seoTitle` is ≤60 characters (layout adds " | Sayso")
- [ ] `seoDescription` is 150-160 characters
- [ ] Canonical URL ends with trailing slash
- [ ] SoftwareApplication JSON-LD present
- [ ] BreadcrumbList JSON-LD present
- [ ] FAQPage JSON-LD present
- [ ] OG title, description, and image are set

### Content Structure
- [ ] Single H1 — benefit-oriented with keyword
- [ ] 5-7 H2s — at least one contains keyword variation
- [ ] H3s used for differentiator titles (proper hierarchy)
- [ ] No heading levels skipped
- [ ] All paragraphs ≤3 sentences
- [ ] Total word count 800-1,500

### Internal Links (5-8 total)
- [ ] Link to `/features/` hub
- [ ] Link to `/demo/` (CTA)
- [ ] Link to `/pricing/`
- [ ] 2-3 links to other feature pages
- [ ] 1-2 links to relevant blog posts
- [ ] Links to relevant `/for/` persona pages

### CTAs
- [ ] Hero CTA after opening section
- [ ] Secondary CTA after "How It Works"
- [ ] Closing CTA at bottom of page
