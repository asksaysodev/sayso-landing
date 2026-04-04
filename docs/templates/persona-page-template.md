# Persona Page Template

This document is the complete reference for creating `/for/[slug]` persona pages. It covers SEO rules, content structure, the TypeScript data interface, internal linking requirements, and a step-by-step process for adding new persona pages at scale.

**Reference implementation:** `lib/content/for/solo-agents.ts`

**Not to be confused with:** `persona-ad-page-template.md`, which covers ad landing pages (`/broker`, `/agent`, `/isa`) — those are standalone marketing pages with no navbar. The `/for/` pages documented here are SEO-driven content pages with a completely different structure.

---

## Table of Contents

1. [File Locations](#file-locations)
2. [What a Persona Page Is (and Is Not)](#what-a-persona-page-is-and-is-not)
3. [SEO Rules — Universal](#seo-rules--universal)
4. [SEO Rules — Persona-Specific](#seo-rules--persona-specific)
5. [Page Structure (Section by Section)](#page-structure-section-by-section)
6. [TypeScript Data Interface](#typescript-data-interface)
7. [Internal Linking Requirements](#internal-linking-requirements)
8. [CTA Placement](#cta-placement)
9. [Schema Markup (JSON-LD)](#schema-markup-json-ld)
10. [Persona-Specific Guidance](#persona-specific-guidance)
11. [Content Quality Checklist](#content-quality-checklist)
12. [How to Create a New Persona Page](#how-to-create-a-new-persona-page)
13. [Planned Persona Pages](#planned-persona-pages)
14. [SEO Audit Checklist](#seo-audit-checklist)

---

## File Locations

| File | Purpose |
|------|---------|
| `lib/content/for/types.ts` | `UseCaseEntry` TypeScript interface — every content field |
| `lib/content/for/index.ts` | Content loader — exports `getAllUseCaseEntries()`, `getUseCaseBySlug()`, `getAllUseCaseSlugs()` |
| `lib/content/for/*.ts` | Individual persona content files (one per persona) |
| `components/pages/PersonaPage.tsx` | Shared page template component — renders all persona pages |
| `app/(content)/for/[slug]/page.tsx` | Next.js dynamic route — handles metadata + static params |
| `app/(content)/for/page.tsx` | Solutions hub listing page |
| `lib/content/hubs/for.ts` | Hub page config — lists all child persona pages |
| `lib/seo/metadata.ts` | `buildMetadata()` — generates title, description, canonical, OG tags |
| `lib/seo/schema.ts` | JSON-LD generators — `generateWebPageJsonLd()`, `generateBreadcrumbJsonLd()`, `generateFAQPageJsonLd()` |

---

## What a Persona Page Is (and Is Not)

Persona pages are **mid-funnel**. The visitor knows they have a problem (efficiency, lead conversion, call quality) but may not know Sayso exists yet. The keyword is usually a problem statement ("how to have better sales conversations in real estate"), not a product search.

**A persona page IS:**
- A problem-first content page that speaks directly to a specific type of user
- Designed to validate the visitor's pain point, build empathy, and introduce Sayso as the answer
- A **micro keyword page** — combining persona + pain point for low-competition, high-relevance searches

**A persona page is NOT:**
- A product brochure (that is a `/features/` page)
- A competitor comparison (that is a `/compare/` page)
- A tutorial or how-to guide (that is a blog post)
- An ad landing page (that is `/broker`, `/agent`, etc. — see `persona-ad-page-template.md`)

The key difference from feature pages: persona pages **earn credibility before selling**. The first half of the page should not mention Sayso at all. You are someone who understands their world, not a salesperson.

---

## SEO Rules — Universal

These rules apply to every persona page without exception.

### Keyword Placement — Required Locations

| Location | Rule | Example |
|----------|------|---------|
| **H1** | Must contain the target keyword naturally. Should feel like a direct answer to the search query. Use a "How to..." format. | `How to Have Better Sales Conversations in Real Estate` |
| **First 100 words** | The exact target keyword must appear within the first 100 words of body content (the opening empathy section). Ideally in the first 2 sentences. | `Knowing how to have better sales conversations in real estate is the difference between booking the appointment and hearing "I will think about it."` |
| **Meta title** | Format: `[Keyword Phrase] — [Persona] | Sayso`. The `| Sayso` suffix is added automatically by the root layout template. Your `seoTitle` field should NOT include "Sayso" (it creates a double-Sayso problem). Max 60 characters. | `seoTitle: 'Better Sales Conversations in Real Estate — Solo Agents'` (55 chars + " \| Sayso" = 64 total) |
| **Meta description** | 150-160 characters max. Must contain the target keyword. Format: `[Empathy about persona's problem]. [How Sayso helps]. [CTA].` | `Solo agents lose deals when conversations stall. Learn how to have better sales conversations in real estate with live AI coaching on every call. Try Sayso.` |
| **URL slug** | Persona-focused, not keyword-focused. | `/for/solo-agents/` |
| **First H2** | Must contain the keyword or a strong semantic variation. Use the `theProblemHeading` field to customize. | `Why Most Sales Conversations Fall Apart` |
| **At least one other H2** | Should contain a keyword variation. | `A Better Approach to Sales Conversations` |

### Keyword Density

| Type | Target | Rule |
|------|--------|------|
| **Exact target keyword** | 3-5 times | Spread across H1, opening empathy, "A Better Approach" section, and FAQ. Never stuff. |
| **Semantic variations** | 6-10 times | Include the persona name, related pain points, and outcome phrases (e.g., "prospecting calls," "phone conversations," "sales calls," "call quality"). |

### Heading Structure

- **One H1 only** — the page title.
- **H2s:** 5-8 per page. Each major content section gets an H2, plus Related Features, Objection Scripts, From the Blog, and FAQ.
- **H3s:** Used for feature card titles under the "How Sayso Works for [Persona]" H2.
- **Never skip heading levels** (no H1 → H3 without an H2 between them).
- **At least two H2s** should contain a semantic variation of the target keyword.

### Canonical URL

- Built automatically by `buildMetadata()` in `lib/seo/metadata.ts`.
- Format: `https://asksayso.com/for/[slug]/`
- **Always includes a trailing slash.** This is enforced in the metadata builder.

### Brand Name

The correct spelling is **Sayso** (capital S, lowercase a-y-s-o). Never write "SaySo", "SAYSO", "Say So", or "say so".

---

## SEO Rules — Persona-Specific

### Content Constraints

- **Empathy first, product second.** The first ~40% of the page (opening + problem + what they try) should NOT mention Sayso. Earn credibility before selling.
- **Paragraphs:** Max 3 sentences per paragraph. All prose fields are `string[]` — each string renders as its own `<p>` tag.
- **Total word count:** 1,000-1,800 words. Persona pages need enough space to empathize AND convert.
- **Tone:** Empathetic, direct, insider. Use "you" language heavily. You are someone who has been in their shoes.
- **No generic advice.** Every tip, example, or scenario should be specific to this persona's reality. A solo agent page should not read like a team leader page with the name swapped.
- **No filler.** Cut any sentence that could apply to any real estate agent. Be specific to the persona.

### The "What They Try" Section

- Cover common approaches the persona uses: memorizing scripts, hiring coaches, recording calls, willpower, etc.
- Explain why each one has limitations — time, cost, inconsistency, not real-time.
- This section sets up Sayso as the alternative without explicitly selling.
- 3-4 paragraphs. Be concrete about the failure modes.

### The "Better Approach" Section

- Introduce the **concept** of real-time coaching first (not Sayso specifically).
- Then introduce Sayso as the tool that delivers this concept.
- Include 1-2 specific scenarios showing how Sayso helps THIS persona.
- Example: "A lead says 'I already have an agent.' Instead of stammering, you see a proven response on your screen."
- This is where the target keyword should appear again.

### How Sayso Works Cards

- Pick the 3-4 features most relevant to THIS persona — not a full feature dump.
- Each card should have a link (`href`) to the relevant `/features/` page.
- Card titles render as `<h3>` tags with optional links.

### Get Started Section

- Short closing section (2-3 sentences) before FAQ.
- References booking a demo and/or viewing pricing.
- The component renders a "Book a Demo" button and "View Pricing" link.
- Always populate this field.

### FAQ

- 4-5 questions and answers.
- Must include questions about:
  - How Sayso helps this specific persona (include the target keyword)
  - Whether a team plan is required (for solo personas)
  - Whether Sayso replaces existing tools/coaching
  - Time savings or measurable outcomes
  - **Pricing and getting started** (always include this one)
- Answers should be 2-3 sentences each.
- At least one FAQ question should include the exact target keyword.
- The FAQ component automatically generates `FAQPage` JSON-LD schema.

---

## Page Structure (Section by Section)

The `PersonaPage.tsx` component renders sections in this exact order:

### 1. JSON-LD Schema (invisible)
- `WebPage` schema with title, description, and URL
- `BreadcrumbList` schema (Home > Solutions > [Persona Name])
- `FAQPage` schema (injected by the FAQ component)

### 2. Breadcrumb Navigation
- Visual breadcrumb: Home > Solutions > [Persona Name]
- Links to `/` and `/for/` hub

### 3. H1
- Problem-statement title matching the search query
- "How to..." format works best for persona pages

### 4. Opening Empathy (NO product mention)
- 2-3 paragraphs from `openingEmpathy[]`.
- **Paragraph 1:** Describe the persona's daily reality and core challenge. Include the target keyword in the first 2 sentences.
- **Paragraph 2-3:** Deepen the empathy. Show you understand what it is like to be in their shoes.
- **Do NOT mention Sayso in this section.** Earn credibility first.

### 5. The Real Problem
- **H2:** Custom heading from `theProblemHeading` (should contain keyword variation). Falls back to "The Real Problem."
- 2-3 paragraphs from `theProblem[]`.
- Dig into the specific challenge. Use scenarios the persona will recognize.
- Validate their frustration before offering a solution.

### 6. What Most [Persona] Try
- **H2:** Custom heading from `whatTheyTryHeading`. Falls back to "What Most [Persona] Try (And Why It Falls Short)."
- 3-4 paragraphs from `whatTheyTry[]`.
- Cover common approaches and explain their limitations.
- Sets up Sayso as the alternative without explicitly selling.

### 7. A Better Approach
- **H2:** Custom heading from `betterApproachHeading`. Falls back to "A Better Approach — Real-Time Coaching."
- 3-4 paragraphs from `betterApproach[]`.
- Introduce the concept, then introduce Sayso, then give persona-specific scenarios.
- Include the target keyword again here.

### 8. Soft CTA (Inline)
- `ContentInlineCTA` component — positioned immediately after "A Better Approach."
- **No CTA appears before this point.** The first half of the page is empathy-only.

### 9. How Sayso Works for [Persona]
- **H2:** "How Sayso Works for [Persona Name]"
- 3-4 feature cards in a 2-column grid.
- Each card: `<h3>` title (optionally linked to `/features/` page) + `<p>` description.
- Pick features most relevant to this persona, not a full feature list.

### 10. Get Started
- **H2:** "Get Started"
- 2-3 sentence closing paragraph from `getStarted`.
- "Book a Demo" button linking to `/demo/`.
- "View Pricing" link to `/pricing/`.

### 11. Related Features
- **H2:** "Related Features"
- 2-3 links to feature pages.
- Includes a "See all solutions" link to the `/for/` hub.

### 12. Objection Scripts (conditional)
- **H2:** "Objection Scripts"
- Only renders if `relatedObjections` has items.
- Links to relevant `/objections/` pages.

### 13. Related Blog Posts
- **H2:** "From the Blog"
- 1-2 links to relevant blog posts.

### 14. FAQ
- **H2:** "Frequently Asked Questions" (rendered by the FAQ component)
- Expandable accordion with 4-5 Q&A pairs.
- Automatically generates `FAQPage` JSON-LD.

### 15. Closing CTA
- `ContentCTA` component — full-width dark section.
- Headline: "Get Started Today"
- Subheading: "See how Sayso helps [persona] sound better on every call."

---

## TypeScript Data Interface

Every persona page is defined by a `UseCaseEntry` object in `lib/content/for/types.ts`:

```typescript
export interface UseCaseEntry {
  slug: string;                    // URL slug: "solo-agents"
  persona: string;                 // Display name: "Solo Agents"
  keyword: string;                 // Target SEO keyword
  seoTitle: string;                // Meta title (max 60 chars — "| Sayso" added by layout, do NOT include "Sayso")
  seoDescription: string;         // Meta description (max 160 chars)
  h1: string;                     // Page H1 — "How to..." problem statement with keyword
  openingEmpathy: string[];       // Each string = one <p>. NO product mention. Keyword in first 2 sentences.
  theProblemHeading?: string;     // Custom H2 (include keyword variation). Defaults to "The Real Problem"
  theProblem: string[];           // Each string = one <p>. Dig into the specific challenge.
  whatTheyTryHeading?: string;    // Custom H2. Defaults to "What Most [Persona] Try (And Why It Falls Short)"
  whatTheyTry: string[];          // Each string = one <p>. Common approaches + their limitations.
  betterApproachHeading?: string; // Custom H2 (include keyword variation). Defaults to "A Better Approach — Real-Time Coaching"
  betterApproach: string[];       // Each string = one <p>. Concept → Sayso → scenarios.
  getStarted?: string;            // Closing text before FAQ. Rendered with demo button + pricing link.
  howSaysoWorks: { feature: string; description: string; href?: string }[];  // 3-4 feature cards
  faq: { question: string; answer: string }[];   // 4-5 Q&A pairs
  relatedFeatures: { title: string; href: string }[];   // 2-3 feature page links
  relatedBlogPosts: { title: string; href: string }[];  // 1-2 blog post links
  relatedObjections?: { title: string; href: string }[]; // Objection page links
  ogImage?: string;               // Custom OG image (defaults to /og-default.png)
}
```

### Field-by-Field Guidance

| Field | Max Length / Count | Notes |
|-------|-------------------|-------|
| `slug` | — | Lowercase, hyphenated. Persona-focused: `solo-agents`, `team-leaders`, `new-agents`, `isas`. |
| `persona` | — | Display name used in H2 headings and CTA copy: "Solo Agents", "Team Leaders", etc. |
| `keyword` | — | Long-tail problem-statement keyword. Validate with search volume data before using. |
| `seoTitle` | 60 chars | Do NOT include "Sayso" — layout appends " \| Sayso". Format: `[Keyword Phrase] — [Persona]`. |
| `seoDescription` | 160 chars | Format: Empathy. Solution. CTA. Dev build warns if over 160. |
| `h1` | — | "How to..." format matching the search query. Contains the target keyword. |
| `openingEmpathy` | 2-3 strings | NO product mention. Keyword in first 2 sentences. Max 3 sentences per paragraph. |
| `theProblemHeading` | — | Include keyword variation. e.g., `Why Most Sales Conversations Fall Apart` |
| `theProblem` | 2-3 strings | Specific challenges this persona faces. Use recognizable scenarios. |
| `whatTheyTryHeading` | — | Can include persona name. e.g., `What Most Solo Agents Try (And Why It Falls Short)` |
| `whatTheyTry` | 3-4 strings | Cover 3-4 common approaches (scripts, coaching, recordings, willpower) and their failure modes. |
| `betterApproachHeading` | — | Include keyword variation. e.g., `A Better Approach to Sales Conversations` |
| `betterApproach` | 3-4 strings | Para 1 = concept. Para 2 = Sayso + keyword. Para 3 = specific scenario. Para 4 = after-call benefit. |
| `getStarted` | — | 2-3 sentences. Reference demo and pricing. Always populate this. |
| `howSaysoWorks` | 3-4 items | Feature title (`<h3>`) + description + optional `href` to `/features/` page. Pick features relevant to THIS persona. |
| `faq` | 4-5 items | Must include pricing Q. At least one Q should contain the target keyword. |
| `relatedFeatures` | 2-3 items | Link to the most relevant feature pages for this persona. |
| `relatedBlogPosts` | 1-2 items | Link to blog posts relevant to this persona's pain points. |
| `relatedObjections` | 1-2 items | Link to objection pages this persona commonly encounters. |

---

## Internal Linking Requirements

Every persona page must include **5-8 internal links**. The component handles most of these automatically, but the content file must provide the data.

| Link Target | How It Gets There | Required? |
|-------------|-------------------|-----------|
| `/for/` hub | Breadcrumb + "See all solutions" in Related Features | Yes (automatic) |
| `/demo/` | Inline CTA + "Get Started" section + closing CTA | Yes (automatic) |
| `/pricing/` | "View Pricing" link in "Get Started" section | Yes (automatic) |
| 2-3 feature pages | `relatedFeatures` array + `howSaysoWorks[].href` | Yes (content file) |
| 1-2 blog posts | `relatedBlogPosts` array | Yes (content file) |
| 1+ objection pages | `relatedObjections` array | Yes if relevant (content file) |
| `/` (homepage) | Breadcrumb | Yes (automatic) |

**Total automatic links:** 5 (home, solutions hub, demo x2, pricing)
**Content-provided links:** 4-7 (features + feature card hrefs + blog posts + objection pages)

---

## CTA Placement

Persona pages carry **2 CTAs** — fewer than feature pages because the first half builds empathy:

| Position | Component | Placement | Why Here |
|----------|-----------|-----------|----------|
| **Soft CTA** | `ContentInlineCTA` | After "A Better Approach" section | Sayso has just been introduced — visitor is warm |
| **Get Started** | Inline button + link | After "How Sayso Works" section | Visitor has seen the feature highlights |
| **Closing CTA** | `ContentCTA` | Full-width block at the very bottom | Final catch-all |

**Critical rule: No CTA appears before the "A Better Approach" section.** The opening empathy, problem, and "what they try" sections are product-free zones that build trust.

---

## Schema Markup (JSON-LD)

Each persona page includes three JSON-LD blocks:

### 1. WebPage
Generated by `generateWebPageJsonLd()`. Generic page schema — persona pages do not need SoftwareApplication schema.
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "[seoTitle]",
  "description": "[seoDescription]",
  "url": "https://asksayso.com/for/[slug]",
  "publisher": { "@type": "Organization", "name": "Sayso" }
}
```

### 2. BreadcrumbList
Generated by `generateBreadcrumbJsonLd()`. Injected in the PersonaPage component.
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://asksayso.com/" },
    { "@type": "ListItem", "position": 2, "name": "Solutions", "item": "https://asksayso.com/for" },
    { "@type": "ListItem", "position": 3, "name": "[Persona]", "item": "https://asksayso.com/for/[slug]" }
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

## Persona-Specific Guidance

Use this table when choosing keywords, tone, and feature focus for each persona:

| Persona | Key Pain Point | Keyword Direction | Feature Focus | Tone Nuance |
|---------|---------------|-------------------|---------------|-------------|
| **Solo Agents** | Doing everything alone, no backup on calls | Conversations, efficiency, phone skills | Real-time coaching, call notes (saves time) | "You're already doing the work of 3 people" |
| **Team Leaders** | Inconsistent performance across agents, can't scale coaching | Managing agents, call quality at scale | Call grading, coaching at scale, onboarding | "You can't sit in on every call" |
| **New Agents** | Don't know what to say, fear of rejection, long ramp time | Cold calling, getting better, confidence | Objection handling, scripts, role play | "Everyone was new once — this accelerates the learning" |
| **ISAs** | High call volume, low conversion rate, script fatigue | Conversion scripts, booking rate, lead handling | Real-time prompts, conversion scripts | "Every call counts when you're dialing 100+ a day" |

### Important: Every persona page must feel distinct.

If you can swap the persona name and the page still reads the same, it is too generic. Check:
- Are the scenarios specific to this persona's daily workflow?
- Are the pain points unique to their role?
- Are the feature highlights ordered by what matters most to THEM?
- Does the "What They Try" section describe approaches THIS persona actually uses?

---

## Content Quality Checklist

Use this before submitting any new persona page:

### Copy Quality
- [ ] H1 matches the search query format ("How to...")
- [ ] Opening empathy does NOT mention Sayso
- [ ] Opening describes THIS persona's specific daily reality (not generic agent life)
- [ ] "What They Try" covers real approaches this persona uses
- [ ] "A Better Approach" introduces the concept before the product
- [ ] At least one specific scenario showing Sayso in action for this persona
- [ ] No paragraph exceeds 3 sentences
- [ ] "You" language used throughout
- [ ] Brand name is "Sayso" (not SaySo, SAYSO, Say So)
- [ ] Content is NOT interchangeable with another persona page

### SEO Compliance
- [ ] `seoTitle` is under 60 characters and does NOT include "Sayso"
- [ ] `seoDescription` is 150-160 characters, follows Empathy/Solution/CTA format
- [ ] Exact target keyword appears 3-5 times across all content
- [ ] Semantic variations appear 6-10 times
- [ ] Keyword is in H1, first 100 words, meta title, meta description, and at least one H2
- [ ] At least one FAQ question contains the exact keyword

### Structure
- [ ] Word count is 1,000-1,800
- [ ] Opening empathy is 2-3 paragraphs
- [ ] "The Real Problem" is 2-3 paragraphs
- [ ] "What They Try" is 3-4 paragraphs
- [ ] "A Better Approach" is 3-4 paragraphs with persona-specific scenarios
- [ ] 3-4 feature cards with `href` links to `/features/` pages
- [ ] "Get Started" section is populated
- [ ] 4-5 FAQ items including pricing/getting-started
- [ ] `relatedObjections` populated if persona's challenge involves phone calls

---

## How to Create a New Persona Page

### Step 1: Choose and validate the keyword

Before writing anything, decide on the target keyword:
- Use a **problem-statement format** ("how to...", "why...", "best way to...")
- Target **long-tail keywords** that combine the persona + their pain point
- Validate with search volume data — avoid broad, competitive terms
- The keyword should map to something Sayso actually solves

Example evolution: `how to be more efficient real estate agent` (too broad) → `how to have better sales conversations in real estate` (specific, maps to Sayso).

### Step 2: Create the content file

Create a new TypeScript file in `lib/content/for/`:

```
lib/content/for/[slug].ts
```

Export a `UseCaseEntry` object following the interface and all the rules above. Use `solo-agents.ts` as your reference.

### Step 3: Register it in the content loader

Open `lib/content/for/index.ts` and:

1. Import your new entry:
   ```typescript
   import { teamLeaders } from './team-leaders';
   ```

2. Add it to the `entries` array:
   ```typescript
   const entries: UseCaseEntry[] = [soloAgents, teamLeaders];
   ```

The dynamic route at `app/(content)/for/[slug]/page.tsx` automatically picks up new entries via `generateStaticParams()`.

### Step 4: Update the solutions hub (if needed)

If your persona is not already listed in `lib/content/hubs/for.ts`, add it to the `childPages` array with:
- `title` — display name
- `slug` — must match your content file slug
- `description` — one-liner for the hub listing
- `keyword` — the target keyword
- `linkText` — CTA text on the hub page (MUST vary per page for SEO)

### Step 5: Cross-link from other pages

- Add the new persona to `personaLinks` on relevant feature pages (`lib/content/features/*.ts`)
- If other persona pages reference this one, update their content too

### Step 6: Verify

1. Run `npm run build` — check for TypeScript errors and dev-mode SEO warnings.
2. Run `npm run dev` and visit `http://localhost:3001/for/[slug]`.
3. View page source and verify:
   - Meta title does NOT contain double "Sayso"
   - Meta description contains the keyword and is ≤160 chars
   - Canonical URL has trailing slash
   - All three JSON-LD blocks are present (WebPage, BreadcrumbList, FAQPage)
   - No CTA appears before the "A Better Approach" section
4. Run the page content through the [SEO Audit Checklist](#seo-audit-checklist) below.

---

## Planned Persona Pages

These are defined in the solutions hub (`lib/content/hubs/for.ts`) but only one is implemented:

| Persona | Slug | Target Keyword | Status |
|---------|------|----------------|--------|
| Solo Agents | `solo-agents` | how to have better sales conversations in real estate | Done |
| Team Leaders | `team-leaders` | how to manage high volume leads real estate | Not started |
| New Agents | `new-agents` | how to get better at cold calling real estate | Not started |
| ISAs | `isas` | ISA conversion scripts real estate | Not started |

**Note:** The keywords listed for unbuilt pages are the originals from the hub config. Before building each page, validate the keyword with actual search volume data and consider using long-tail variants (as was done for solo-agents: `how to be more efficient real estate agent` became `how to have better sales conversations in real estate`).

---

## SEO Audit Checklist

Run through this after creating or editing any persona page:

### Keyword Placement (all must pass)
- [ ] Target keyword in H1
- [ ] Target keyword in first 100 words of body content (opening empathy)
- [ ] Target keyword in `seoTitle` (without including "Sayso")
- [ ] Target keyword in `seoDescription`
- [ ] Keyword or semantic variation in first H2 (`theProblemHeading`)
- [ ] Keyword or semantic variation in at least one other H2
- [ ] Keyword in at least one FAQ question

### Keyword Density
- [ ] Exact keyword appears 3-5 times total
- [ ] Semantic variations appear 6-10 times total
- [ ] No keyword stuffing — every usage reads naturally

### Technical SEO
- [ ] `seoTitle` is ≤60 characters and does NOT include "Sayso"
- [ ] `seoDescription` is 150-160 characters
- [ ] Canonical URL ends with trailing slash
- [ ] WebPage JSON-LD present
- [ ] BreadcrumbList JSON-LD present
- [ ] FAQPage JSON-LD present
- [ ] OG title, description, and image are set

### Content Structure
- [ ] Single H1 — problem-statement format with keyword
- [ ] 5-8 H2s — at least two contain keyword variations
- [ ] H3s used for feature card titles (proper hierarchy)
- [ ] No heading levels skipped
- [ ] All paragraphs ≤3 sentences
- [ ] Total word count 1,000-1,800
- [ ] Opening empathy does NOT mention Sayso

### Internal Links (5-8 total)
- [ ] Link to `/for/` hub ("See all solutions")
- [ ] Link to `/demo/` (CTA)
- [ ] Link to `/pricing/` ("View Pricing" in Get Started)
- [ ] 2-3 links to feature pages (Related Features + feature card hrefs)
- [ ] 1-2 links to relevant blog posts
- [ ] Links to relevant objection pages

### CTAs
- [ ] No CTA before "A Better Approach" section
- [ ] Soft CTA after "A Better Approach"
- [ ] "Get Started" section with demo button + pricing link
- [ ] Closing CTA at bottom of page
