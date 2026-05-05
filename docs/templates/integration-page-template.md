# Integration Page Template

This document is the complete reference for creating `/integrations/[slug]` CRM integration pages. It covers SEO rules, content structure, the TypeScript data interface, internal linking requirements, and a step-by-step process for adding new integration pages at scale.

**Reference implementation:** `lib/content/integrations/follow-up-boss.ts`

---

## Table of Contents

1. [File Locations](#file-locations)
2. [What an Integration Page Is (and Is Not)](#what-an-integration-page-is-and-is-not)
3. [SEO Rules - Universal](#seo-rules--universal)
4. [SEO Rules - Integration-Specific](#seo-rules--integration-specific)
5. [Page Structure (Section by Section)](#page-structure-section-by-section)
6. [TypeScript Data Interface](#typescript-data-interface)
7. [Internal Linking Requirements](#internal-linking-requirements)
8. [CTA Placement](#cta-placement)
9. [Schema Markup (JSON-LD)](#schema-markup-json-ld)
10. [Writing Guidelines](#writing-guidelines)
11. [CRM-Specific Tailoring](#crm-specific-tailoring)
12. [Content Quality Checklist](#content-quality-checklist)
13. [How to Create a New Integration Page](#how-to-create-a-new-integration-page)
14. [Planned Integration Pages](#planned-integration-pages)
15. [SEO Audit Checklist](#seo-audit-checklist)

---

## File Locations

| File | Purpose |
|------|---------|
| `lib/content/integrations/types.ts` | `IntegrationEntry` TypeScript interface - every content field |
| `lib/content/integrations/index.ts` | Content loader - exports `getAllIntegrationEntries()`, `getIntegrationBySlug()`, `getAllIntegrationSlugs()` |
| `lib/content/integrations/*.ts` | Individual integration content files (one per CRM) |
| `components/pages/IntegrationPage.tsx` | Shared page template component - renders all integration pages |
| `app/(content)/integrations/[slug]/page.tsx` | Next.js dynamic route - handles metadata + static params |
| `app/(content)/integrations/page.tsx` | Integrations hub listing page |
| `lib/content/hubs/integrations.ts` | Hub page config - lists all child integration pages |
| `lib/seo/metadata.ts` | `buildMetadata()` - generates title, description, canonical, OG tags |
| `lib/seo/schema.ts` | JSON-LD generators - `generateSoftwareAppJsonLd()`, `generateFAQPageJsonLd()` |

---

## What an Integration Page Is (and Is Not)

Integration pages are **trust signals and conversion aids.** An agent who already uses a specific CRM (Follow Up Boss, Sierra Interactive, kvCORE) is on the Sayso site and wants to confirm Sayso integrates before signing up. These pages exist to answer that question and convert the visitor.

From the site architecture doc: CRM-specific keywords may have near-zero search volume today. These pages are primarily trust signals, not traffic drivers. However, as "AI integration" searches grow in the CRM space, these pages will be positioned to capture that emerging traffic.

From the programmatic SEO training: these pages follow the micro keyword principle - combining two specific concepts (CRM name + AI capability) that have almost no competition right now.

**An integration page IS:**
- A concise page confirming that Sayso works with a specific CRM and explaining how the integration works
- Designed to reassure existing CRM users that Sayso fits their workflow
- A conversion aid - the reader is already interested in Sayso and checking compatibility
- A future SEO asset for emerging "[CRM] AI integration" searches

**An integration page is NOT:**
- A feature page (that is `/products/`)
- A competitor comparison (that is `/compare/`)
- A persona pitch (that is `/for/`)
- A detailed technical integration guide (keep it simple and benefit-oriented)

**Key principle: concise and functional.** Integration pages are the most functional pages on the site. Every sentence should inform or reassure. The reader wants to confirm the integration exists and works - not read an essay.

---

## SEO Rules - Universal

These rules apply to every integration page without exception.

### Keyword Placement - Required Locations

| Location | Rule | Example |
|----------|------|---------|
| **H1** | Must contain the CRM name and Sayso. Use an em-dash to separate the CRM pairing from the benefit clause. | `Sayso + Follow Up Boss - Real-Time Coaching Meets Your CRM` |
| **First 100 words** | The exact target keyword must appear within the first 100 words of body content (the opening description). Ideally in the first 2 sentences. | `The Follow Up Boss AI integration with Sayso adds real-time coaching to every prospecting call...` |
| **Meta title** | Format: `[CRM Name] + Sayso AI Integration`. The `| Sayso` suffix is added automatically by the root layout template. Your `seoTitle` field should NOT include "| Sayso". Max 60 characters for the `seoTitle` value. | `seoTitle: 'Follow Up Boss + Sayso AI Integration'` (42 chars + " \| Sayso" = 50 total) |
| **Meta description** | 150-160 characters max. Must contain the target keyword. Format: `[CRM Name] users: [what Sayso adds]. [Key benefit]. [CTA].` | `Follow Up Boss users: get real-time AI coaching and automatic call notes with Sayso. Every call logged to your CRM. Try it free.` |
| **URL slug** | CRM name as slug, lowercase, hyphenated. | `/integrations/follow-up-boss/` |
| **First H2** | Must contain the CRM name and a semantic variation of the keyword. Use the `howItWorksHeading` field. | `How Sayso Works with Follow Up Boss` |
| **Image alt text** | Include the CRM name and Sayso together, enriched with the keyword. | `Follow Up Boss AI integration with Sayso` |

### Keyword Density

| Type | Target | Rule |
|------|--------|------|
| **Exact target keyword** | 3-4 times | Spread across opening, howItWorks, whyChoose, and FAQ. These pages are shorter so 3-4 is sufficient. Never stuff. |
| **Semantic variations** | 5-8 times | Include the CRM name alone, "Sayso + [CRM]," "AI coaching for [CRM] users," "[CRM] integration," "connect Sayso to [CRM]." |

**Counting note:** The `keyword`, `seoTitle`, and `seoDescription` fields are metadata - they do NOT render in the page body. Only count occurrences in fields that produce visible text: `h1`, `openingDescription`, `howItWorks[].description`, `benefits[].body`, `whyChoose`, `getStarted`, and `faq[].question`/`faq[].answer`.

### Heading Structure

- **One H1 only** - the page title.
- **H2s:** 5 per page (How It Works, What You Get, Why Choose, Get Started, FAQ). The FAQ component adds the 5th H2 ("Frequently Asked Questions").
- **Never skip heading levels** (no H1 → H3 without an H2 between them).
- **At least one H2** must contain the CRM name - the `howItWorksHeading` field handles this.
- The inline CTA renders an `<h3>` inside the CTA box ("See It in Action" or custom), which is proper hierarchy under the preceding H2.

### Canonical URL

- Built automatically by `buildMetadata()` in `lib/seo/metadata.ts`.
- Format: `https://asksayso.com/integrations/[slug]/`
- **Always includes a trailing slash.** This is enforced in the metadata builder.

### Brand Name

The correct spelling is **Sayso** (capital S, lowercase a-y-s-o). Never write "SaySo", "SAYSO", "Say So", or "say so".

---

## SEO Rules - Integration-Specific

### Keyword Selection

Integration page keywords follow this format: `[CRM name] AI integration`

Examples:
- `follow up boss AI integration`
- `sierra interactive AI coaching`
- `kvcore AI integration`

These keywords may have near-zero volume today. That is expected. The pages serve two purposes:
1. **Trust signal** - confirms compatibility for visitors already on the site
2. **Future SEO** - positions for emerging "[CRM] AI" searches as the category grows

### Content Constraints

- **Paragraphs:** Max 3 sentences per paragraph.
- **Total word count:** 600-1,000 words. Integration pages should be concise. The reader wants to confirm the integration exists and works - not read an essay.
- **Tone:** Clear, confident, technical-but-accessible. These readers are already using CRM software - they understand tech basics. Do not over-explain.
- **No filler.** Every sentence should inform or reassure. Integration pages are the most functional pages on the site.
- **No vaporware.** Only describe integration capabilities that exist today.

### CRM-Specific Terminology

Each integration page must reference specific elements of that CRM's workflow. Do not write generic integration copy. Reference the CRM's actual terminology and workflows.

| CRM | Key Workflow Elements | SaySo Tie-In |
|---|---|---|
| Follow Up Boss | Contact records, smart lists, calling from FUB, timeline | Notes sync to contact record, coaching during FUB-initiated calls, works alongside smart lists |
| Sierra Interactive | Lead routing, website integration, lead activity, dialer | Real-time coaching when Sierra leads call in, notes enrich lead profiles |
| kvCORE | Smart campaigns, behavioral automation, dialer, contact management | Coaching prompts during kvCORE dialer sessions, notes enrich contact data |

**You must mention at least 2-3 CRM-specific workflow elements** in the page content. Spread them across benefits, FAQ, and how-it-works steps.

---

## Page Structure (Section by Section)

The `IntegrationPage.tsx` component renders sections in this exact order:

### 1. JSON-LD Schema (invisible)
- `SoftwareApplication` schema with integration feature list
- `BreadcrumbList` schema (via the Breadcrumb component)
- `FAQPage` schema (injected by the FAQ component)

### 2. Breadcrumb Navigation
- Visual breadcrumb: Home > Integrations > [CRM Name]
- Links to `/` and `/integrations/` hub

### 3. Partner Logos
- Sayso logo + "+" + CRM logo placeholder
- The `ImagePlaceholder` component renders with the `logoAlt` value as alt text
- **Alt text must be keyword-enriched** (e.g., "Follow Up Boss AI integration with Sayso")

### 4. H1
- Format: `Sayso + [CRM Name] - [Benefit Statement]`
- Must contain both brand names
- The benefit clause should describe what the integration delivers
- Examples:
  - `Sayso + Follow Up Boss - Real-Time Coaching Meets Your CRM`
  - `Sayso + Sierra Interactive: AI Coaching That Works Inside Your CRM`

### 5. Opening Description
- 2-3 sentences, centered text
- Content from `openingDescription` field
- **The exact target keyword must appear in the first 2 sentences.**
- Sentence 1: State what the CRM is and its role in the agent's workflow
- Sentence 2: Introduce the integration with the exact keyword phrase
- Keep it direct - this is a confirmation, not a sales pitch

### 6. How It Works
- **H2:** Custom heading from `howItWorksHeading` (should contain CRM name). Falls back to "How It Works."
- **Steps:** 3-5 numbered steps. Each has a bold step title and a 1-2 sentence description.
- Keep steps concrete and simple: connect, call, get coached, notes sync
- Include **one occurrence of the exact keyword** naturally in one step description
- Reference CRM-specific terminology (e.g., "FUB workspace," "contact record," "smart lists")

### 7. Inline CTA
- `ContentInlineCTA` component - positioned immediately after "How It Works"
- Customizable headline and subheading via `inlineCtaHeadline` and `inlineCtaSubheading` fields
- **Headline should include the CRM name:** "Ready to Connect Sayso to [CRM Name]?"
- Renders "Book a Demo" (`/demo`) and "Download Sayso" (`/`) buttons
- This is the first of 2 CTAs - placed at a natural decision point

### 8. What You Get (Benefits)
- **H2:** "What You Get"
- 3-5 benefit cards in a 2-column grid (stacked on mobile)
- Each card has a bold title and a 1-2 sentence body
- Focus on **workflow improvements specific to this CRM's users:** less manual note-taking, better follow-up data, consistent coaching across calls
- **Mention CRM-specific elements** in at least one benefit body (e.g., smart lists, calling from FUB, contact records)
- Do not list Sayso's full feature set - only what is relevant to this CRM's users

### 9. Why [CRM Name] Users Choose Sayso
- **H2:** Rendered by the component: `Why {crmName} Users Choose Sayso`
- 1 paragraph from `whyChoose` field
- Brief social proof or use case section
- If you have testimonials from users of this CRM, include them
- If not, describe a typical scenario: "A Follow Up Boss user making 50+ calls a day uses Sayso to..."
- Include **one occurrence of the exact keyword** naturally
- Max 3 sentences

### 10. Get Started
- **H2:** "Get Started"
- 1 paragraph from `getStarted` field - 2-3 sentences
- Setup instructions (brief) - how easy it is to connect
- Mention the time to set up (e.g., "under two minutes")

### 11. Related Pages
- Rendered if `relatedLinks` has items
- Displays as styled link cards with a label (e.g., "Related feature") and a title with arrow
- Links to features, personas, pricing, and other cross-section pages
- **Only link to pages that actually exist** - verify before adding

### 12. Other Integrations (conditional)
- Rendered if `relatedIntegrations` has items
- **H2:** "Other Integrations"
- Bulleted links to other integration pages
- **Only populate this when the linked integration pages have content files.** Set `relatedIntegrations: []` if the target pages would 404.

### 13. FAQ
- **H2:** "Frequently Asked Questions" (rendered by the FAQ component)
- Expandable accordion with 3-5 Q&A pairs
- Automatically generates `FAQPage` JSON-LD
- See FAQ content rules below

### 14. Closing CTA
- `ContentCTA` component - full-width dark section with "Book a Demo" and "Download Sayso" buttons

---

## TypeScript Data Interface

Every integration page is defined by an `IntegrationEntry` object in `lib/content/integrations/types.ts`:

```typescript
export interface IntegrationEntry {
  slug: string;                    // URL slug: "follow-up-boss"
  crmName: string;                 // Display name: "Follow Up Boss"
  keyword: string;                 // Target SEO keyword: "follow up boss AI integration"
  seoTitle: string;                // Meta title (max 60 chars - "| Sayso" added by layout)
  seoDescription: string;          // Meta description (max 160 chars)
  h1: string;                      // Page H1 - CRM + Sayso + benefit
  openingDescription: string;      // Intro paragraph - keyword in first 2 sentences
  howItWorksHeading?: string;      // Custom H2 for "How It Works" (include CRM name)
  howItWorks: { step: string; description: string }[];  // 3-5 numbered steps
  benefits: { title: string; body: string }[];           // 3-5 benefit cards
  whyChoose: string;               // Why CRM users choose Sayso - 1 paragraph
  getStarted: string;              // Setup instructions - 2-3 sentences
  faq: { question: string; answer: string }[];           // 3-5 Q&A pairs
  relatedIntegrations: { name: string; slug: string }[]; // Links to other integration pages
  featureList: string[];           // For SoftwareApplication JSON-LD schema
  logoAlt: string;                 // Alt text for CRM logo placeholder (keyword-enriched)
  ogImage?: string;                // Custom OG image (defaults to /og-default.png)
  relatedLinks?: { label: string; title: string; href: string }[];  // Cross-section internal links
  inlineCtaHeadline?: string;      // Override headline for inline CTA
  inlineCtaSubheading?: string;    // Override subheading for inline CTA
}
```

### Field-by-Field Guidance

| Field | Max Length / Count | Notes |
|-------|-------------------|-------|
| `slug` | - | CRM name, lowercase, hyphenated. e.g., `follow-up-boss`, `sierra-interactive`, `kvcore`. |
| `crmName` | - | Display name used in H2 headings. Capitalize properly: "Follow Up Boss", "Sierra Interactive", "kvCORE". |
| `keyword` | - | Format: `[crm name] AI integration` (or `AI coaching` for Sierra). |
| `seoTitle` | 60 chars | Format: `[CRM Name] + Sayso AI Integration`. Do NOT include "Sayso" suffix - layout appends " \| Sayso". Dev build warns if over 60. |
| `seoDescription` | 160 chars | Format: `[CRM] users: [benefit]. [Key benefit]. [CTA].` Dev build warns if over 160. |
| `h1` | - | Format: `Sayso + [CRM Name] - [Benefit Statement]`. Include both brand names. |
| `openingDescription` | 2-3 sentences | **Exact keyword in first 2 sentences.** Sentence 1 = what the CRM is. Sentence 2 = what the integration does (include keyword). |
| `howItWorksHeading` | - | Format: `How Sayso Works with [CRM Name]`. Always populate this - do not use the default. |
| `howItWorks` | 3-5 steps | Each step: bold title + 1-2 sentence description. Include keyword once in any step description. Reference CRM terminology. |
| `benefits` | 3-5 items | Title = bold text. Body = 1-2 sentences. Focus on CRM-specific workflow improvements. Mention CRM elements in at least 1 benefit. |
| `whyChoose` | 1 paragraph, max 3 sentences | Include keyword once. Social proof or typical use case. |
| `getStarted` | 2-3 sentences | How easy setup is. Include time estimate ("under two minutes"). |
| `faq` | 3-5 items | Must include required questions (see FAQ rules below). Answers are 2-3 sentences each. |
| `relatedIntegrations` | 0-3 items | **Only include integration slugs that have content files.** Set to `[]` if target pages do not exist yet. |
| `featureList` | 3-6 items | Short strings for SoftwareApplication schema. e.g., "Follow Up Boss CRM integration", "Real-time call coaching". |
| `logoAlt` | - | Keyword-enriched. Format: `[CRM Name] AI integration with Sayso`. |
| `relatedLinks` | 3-5 items | Cross-section links. Only link to pages that exist. Check `lib/content/products/`, `lib/content/for/`, and `app/pricing/` before adding. |
| `inlineCtaHeadline` | - | Format: `Ready to Connect Sayso to [CRM Name]?` |
| `inlineCtaSubheading` | - | 1 sentence describing the key benefit + ease of setup. |

### FAQ Content Rules

Every integration page FAQ must include these question patterns:

| Required Question | Example | Why |
|------------------|---------|-----|
| "Does Sayso integrate with [CRM]?" | "Does Sayso integrate with Follow Up Boss?" | Directly targets the search intent - the #1 question visitors have |
| "How long does setup take?" | "How long does the Follow Up Boss integration take to set up?" | Addresses friction - visitors want to know it is easy |
| "Will it slow down my workflow?" | "Will Sayso slow down my Follow Up Boss workflow?" | Addresses the main objection - CRM users are protective of their workflow |
| "Does it cost extra?" | "Does it cost extra to use the Follow Up Boss integration?" | Pricing transparency - removes a buying obstacle |

Additional recommended questions (pick 1):
- "Does Sayso work with [CRM-specific feature]?" (e.g., "Follow Up Boss smart lists and calling from FUB?")
- "What data syncs between Sayso and [CRM]?"
- "Can my team use Sayso with [CRM]?"

**Answer guidelines:**
- 2-3 sentences each
- Be specific and direct - these are functional answers, not marketing copy
- Include the exact keyword in at least one answer (ideally the first)
- Reference CRM-specific terminology in at least one answer

---

## Internal Linking Requirements

Every integration page must include **4-6 internal links**. The component handles some automatically, but most come from the `relatedLinks` field.

| Link Target | How It Gets There | Required? |
|-------------|-------------------|-----------|
| `/integrations/` hub | Breadcrumb | Yes (automatic) |
| `/` (homepage) | Breadcrumb + "Download Sayso" buttons | Yes (automatic) |
| `/demo` | Inline CTA + closing CTA | Yes (automatic) |
| 1 feature page | `relatedLinks` entry | Yes (content file) |
| 1 persona page | `relatedLinks` entry | Yes (content file) |
| `/pricing/` | `relatedLinks` entry | Yes (content file) |
| Other integration pages | `relatedIntegrations` array | Only when those pages exist |

**Automatic links:** 3 (home, integrations hub, demo)
**Content-provided links:** 3+ (feature, persona, pricing via `relatedLinks`)

### Which Pages to Link To

Before populating `relatedLinks`, verify that the target pages exist:

| Link Type | Where to Check | Currently Available |
|-----------|---------------|-------------------|
| Feature pages | `lib/content/products/index.ts` | `/products/cue` |
| Persona pages | `lib/content/for/index.ts` | `/for/solo-agents` |
| Pricing | `app/pricing/` directory | `/pricing` |
| Blog posts | `content/blog/` directory | `/blog/real-estate-cold-calling-guide`, `/blog/how-to-build-rapport-calls` |

**Never link to pages that do not exist.** As new feature and persona pages are created, update `relatedLinks` on integration pages to include them.

**Priority links for integration pages:**
1. Feature page for call notes (`/products/smart-capture/`) - when it exists, this should be the primary feature link since auto-syncing notes is a key integration benefit
2. Team leaders persona page (`/for/team-leaders/`) - when it exists, this is the best persona link since teams care most about CRM integration
3. `/pricing/` - always available

---

## CTA Placement

Integration pages carry **2 CTAs**. These are functional, conversion-focused pages - keep the CTAs direct and low-friction.

| Position | Component | Placement | Why Here |
|----------|-----------|-----------|----------|
| **Inline CTA** | `ContentInlineCTA` | Immediately after the "How It Works" section | Natural decision point - the reader just saw how easy the integration is |
| **Closing CTA** | `ContentCTA` | Full-width block at the very bottom | Final catch-all after FAQ |

**CTA copy guidance:**
- Inline CTA headline should include the CRM name: "Ready to Connect Sayso to [CRM Name]?"
- Keep subheading to one sentence about the key benefit + ease
- The closing CTA uses the global "Ready to Win the Moment?" copy (shared component)

---

## Schema Markup (JSON-LD)

Each integration page includes three JSON-LD blocks:

### 1. SoftwareApplication
Generated by `generateSoftwareAppJsonLd()`. Includes the `featureList` from the content file.
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Sayso",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web, macOS, Windows",
  "featureList": "Follow Up Boss CRM integration, Automatic call note syncing, Real-time call coaching, Contact record matching",
  "publisher": { "@type": "Organization", "name": "Sayso" }
}
```

**Always populate `featureList`** with 3-6 items that mention the CRM name and integration capabilities.

### 2. BreadcrumbList
Generated automatically by the `Breadcrumb` component.
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://asksayso.com/" },
    { "@type": "ListItem", "position": 2, "name": "Integrations", "item": "https://asksayso.com/integrations" },
    { "@type": "ListItem", "position": 3, "name": "[CRM Name]", "item": "https://asksayso.com/integrations/[slug]" }
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

## Writing Guidelines

### Tone and Voice

Integration pages require a specific balance:

- **Clear and confident.** The reader is checking compatibility - be direct.
- **Technical-but-accessible.** These readers already use CRM software. They understand tech basics. Do not over-explain what a CRM is.
- **Functional, not salesy.** Every sentence should inform or reassure. This is the most functional page type on the site.
- **CRM-literate.** Reference the specific CRM's terminology (contact records, smart lists, dialer, lead routing). This shows you actually understand their workflow.

### Paragraph Structure

- Max 3 sentences per paragraph
- Lead with the most important information
- Use concrete details: "under two minutes," "syncs to the contact record," "no developer needed"
- Write in second person ("you", "your") to speak directly to the reader

### What Makes Integration Pages Different from Other Page Types

| Characteristic | Integration Pages | Feature Pages | Comparison Pages |
|---------------|-------------------|---------------|-----------------|
| **Word count** | 600-1,000 | 800-1,500 | 1,500-2,500 |
| **CTA count** | 2 | 3 | 3 |
| **Primary goal** | Confirm compatibility | Explain capability | Convert switchers |
| **Reader mindset** | "Does it work with my CRM?" | "What does this do?" | "Which tool is better?" |
| **Tone** | Functional, direct | Confident, educational | Fair, evaluative |
| **Keyword density** | 3-4 exact | 3-5 exact | 4-6 exact |

### Word Count Targets by Section

| Section | Target Words | Notes |
|---------|-------------|-------|
| Opening description | 30-50 | 2-3 sentences. State the integration + keyword. |
| How It Works | 100-150 | 3-5 steps, 1-2 sentences each |
| Benefits | 100-150 | 3-5 cards, 1-2 sentences each |
| Why Choose | 50-80 | 1 paragraph, max 3 sentences |
| Get Started | 30-50 | 2-3 sentences |
| FAQ | 150-250 | 3-5 Q&A pairs, 2-3 sentences per answer |
| **Total** | **600-1,000** | |

---

## CRM-Specific Tailoring

Each integration page must be tailored to its CRM. Use this reference table when writing content:

### Follow Up Boss

| Element | Details |
|---------|---------|
| **CRM terminology to use** | Contact records, smart lists, calling from FUB, FUB timeline, FUB workspace, pipeline metrics |
| **Key workflow** | Agents dial from FUB or their normal workflow, manage leads via smart lists, track activity in contact timelines |
| **Sayso tie-in** | Notes sync to contact record timeline, coaching works during FUB-initiated calls, works alongside smart lists, team leaders see coaching data with pipeline metrics |
| **Typical user** | High-volume prospectors making 20+ calls/day who need consistent follow-up |

### Sierra Interactive

| Element | Details |
|---------|---------|
| **CRM terminology to use** | Lead routing, website integration, lead activity feed, Sierra dialer, lead profiles |
| **Key workflow** | Leads come in via Sierra website → routed to agents → contacted via Sierra dialer → activity tracked in lead profiles |
| **Sayso tie-in** | Real-time coaching when Sierra leads call in, notes enrich lead profiles, coaching works with Sierra's lead routing |
| **Typical user** | Teams using Sierra's full ecosystem - website + CRM + dialer |

### kvCORE

| Element | Details |
|---------|---------|
| **CRM terminology to use** | Smart campaigns, behavioral automation, kvCORE dialer, contact management, lead scores |
| **Key workflow** | Leads enter smart campaigns → behavioral automation qualifies them → agents call via kvCORE dialer → contacts managed in kvCORE |
| **Sayso tie-in** | Coaching prompts during kvCORE dialer sessions, notes enrich contact data, insights complement behavioral automation data |
| **Typical user** | Tech-savvy agents/teams leveraging kvCORE's automation features |

---

## Content Quality Checklist

Use this before submitting any new integration page:

### Copy Quality
- [ ] Opening description includes the exact keyword in the first 2 sentences
- [ ] Each section is concise - no filler, no essays
- [ ] CRM-specific terminology is used in at least 3 places (benefits, FAQ, how-it-works)
- [ ] No paragraph exceeds 3 sentences
- [ ] Tone is functional and direct - not salesy
- [ ] Brand name is "Sayso" (not SaySo, SAYSO, Say So)
- [ ] No features described that are not live in the product

### SEO Compliance
- [ ] `seoTitle` is under 60 characters and does NOT include "| Sayso"
- [ ] `seoTitle` follows format: `[CRM Name] + Sayso AI Integration`
- [ ] `seoDescription` is 130-160 characters, follows `[CRM] users: [benefit]. [Key benefit]. [CTA].` format
- [ ] Exact target keyword appears 3-4 times in visible content
- [ ] Semantic variations appear 5-8 times total
- [ ] Keyword is in H1, first 100 words, meta title, meta description, first H2, and at least one FAQ
- [ ] `logoAlt` is keyword-enriched (not just "CRM and Sayso logos")

### Structure
- [ ] Word count is 600-1,000
- [ ] 3-5 steps in "How It Works"
- [ ] 3-5 benefit cards focused on CRM-specific workflow improvements
- [ ] 3-5 FAQ items including all 4 required question patterns
- [ ] `howItWorksHeading` is populated with CRM name (not using default)
- [ ] `inlineCtaHeadline` includes the CRM name
- [ ] `relatedLinks` has 3+ links to existing pages
- [ ] `relatedIntegrations` only contains slugs with existing content files (or is `[]`)
- [ ] `featureList` populated for SoftwareApplication schema

---

## How to Create a New Integration Page

### Step 1: Choose and validate the keyword

Before writing anything:
- Keyword format is always `[CRM name] AI integration` (or `AI coaching` if that fits better)
- These keywords will likely have near-zero volume today - that is expected
- The page's primary value is as a trust signal for site visitors
- Verify the CRM is real, active, and used by real estate agents

### Step 2: Research the CRM

Before writing the content:
- Visit the CRM's website and note their actual features and terminology
- Identify the key workflow elements (see [CRM-Specific Tailoring](#crm-specific-tailoring))
- Understand how agents use the CRM day-to-day
- Note 2-3 specific workflow elements to reference throughout the page

### Step 3: Create the content file

Create a new TypeScript file in `lib/content/integrations/`:

```
lib/content/integrations/[slug].ts
```

Export an `IntegrationEntry` object following the interface and all the rules above. Use `follow-up-boss.ts` as your reference.

**Variable naming:** Use camelCase matching the CRM name. Examples:
```typescript
export const sierraInteractive: IntegrationEntry = { ... };
export const kvcore: IntegrationEntry = { ... };
```

**Template for a new integration entry:**

```typescript
import type { IntegrationEntry } from './types';

export const yourCrm: IntegrationEntry = {
  slug: 'your-crm',
  crmName: 'Your CRM',
  keyword: 'your crm AI integration',
  seoTitle: 'Your CRM + Sayso AI Integration',
  seoDescription:
    'Your CRM users: get real-time AI coaching and automatic call notes with Sayso. [Key benefit]. [CTA].',
  h1: 'Sayso + Your CRM - [Benefit Statement]',
  logoAlt: 'Your CRM AI integration with Sayso',
  openingDescription:
    '[What Your CRM is]. The Your CRM AI integration with Sayso [what it does] - [key outcome].',
  howItWorksHeading: 'How Sayso Works with Your CRM',
  howItWorks: [
    { step: 'Connect your [CRM] account', description: '...' },
    { step: 'Start a prospecting call', description: '...' },
    { step: 'Get coached in real time', description: '...' },
    { step: 'Notes sync automatically', description: '...' },
  ],
  inlineCtaHeadline: 'Ready to Connect Sayso to Your CRM?',
  inlineCtaSubheading: '[Key benefit] - set up in under two minutes.',
  benefits: [
    { title: '...', body: '...' },
    { title: '...', body: '...' },
    { title: '...', body: '...' },
    { title: '...', body: '...' },
  ],
  whyChoose: '... this Your CRM AI integration fits into the workflow ...',
  getStarted: 'Connecting Sayso to Your CRM takes under two minutes. ...',
  featureList: [
    'Your CRM integration',
    'Automatic call note syncing',
    'Real-time call coaching',
    'Contact record matching',
  ],
  faq: [
    { question: 'Does Sayso integrate with Your CRM?', answer: 'Yes. The Your CRM AI integration ...' },
    { question: 'How long does the Your CRM integration take to set up?', answer: '...' },
    { question: 'Will Sayso slow down my Your CRM workflow?', answer: '...' },
    { question: 'Does it cost extra to use the Your CRM integration?', answer: '...' },
    { question: 'Does Sayso work with [CRM-specific feature]?', answer: '...' },
  ],
  relatedIntegrations: [],  // Populate when other integration pages exist
  relatedLinks: [
    { label: 'Related feature', title: 'Real-Time Coaching', href: '/products/cue' },
    { label: "Who it's for", title: 'Solo Agents', href: '/for/solo-agents' },
    { label: 'Pricing', title: 'View Pricing', href: '/pricing' },
  ],
};
```

### Step 4: Register it in the content loader

Open `lib/content/integrations/index.ts` and:

1. Import your new entry:
   ```typescript
   import { sierraInteractive } from './sierra-interactive';
   ```

2. Add it to the `entries` array:
   ```typescript
   const entries: IntegrationEntry[] = [followUpBoss, sierraInteractive];
   ```

That is it. The dynamic route at `app/(content)/integrations/[slug]/page.tsx` automatically picks up new entries via `generateStaticParams()`.

### Step 5: Update the integrations hub (if needed)

If your CRM is not already listed in `lib/content/hubs/integrations.ts`, add it to the `childPages` array with:
- `title` - CRM display name (e.g., "Sierra Interactive")
- `slug` - must match your content file slug (e.g., "sierra-interactive")
- `description` - one-liner for the hub listing
- `keyword` - the target keyword
- `linkText` - CTA text on the hub page (MUST vary per page for SEO)

### Step 6: Cross-link from other integration pages

Once your new page exists, update `relatedIntegrations` arrays on other integration pages to include your new slug. Integration pages should cross-link to each other when the target pages exist.

Also update `relatedLinks` if your new CRM integration page is relevant as a link from feature or persona pages.

### Step 7: Verify

1. Run `npm run build` - check for TypeScript errors and dev-mode SEO warnings.
2. Run `npm run dev` and visit `http://localhost:3001/integrations/[slug]`.
3. Check the rendered page:
   - Browser tab shows `[CRM] + Sayso AI Integration | Sayso`
   - H1 renders with both brand names
   - First H2 contains the CRM name ("How Sayso Works with [CRM]")
   - Inline CTA appears after "How It Works" (not after "Why Choose")
   - Related Pages section shows links (no 404s)
   - FAQ has 3-5 questions
   - No broken links
4. View page source and verify:
   - Meta title and description contain the keyword
   - Canonical URL ends with trailing slash
   - SoftwareApplication JSON-LD present with CRM-specific feature list
   - FAQPage JSON-LD has the correct number of items
   - BreadcrumbList JSON-LD present
5. Count keyword occurrences in visible page text - should be 3-4 exact + 5-8 semantic.
6. Run the page through the [SEO Audit Checklist](#seo-audit-checklist) below.

---

## Planned Integration Pages

These are defined in the integrations hub (`lib/content/hubs/integrations.ts`):

| CRM | Slug | Target Keyword | Status |
|-----|------|----------------|--------|
| Follow Up Boss | `follow-up-boss` | follow up boss AI integration | Done |
| Sierra Interactive | `sierra-interactive` | sierra interactive AI coaching | Not started |
| kvCORE | `kvcore` | kvcore AI integration | Not started |

**Note:** When Sierra Interactive and kvCORE pages are created, update the `relatedIntegrations` array in `follow-up-boss.ts` to link to them. Currently it is set to `[]` because those pages do not exist yet.

---

## SEO Audit Checklist

Run through this after creating or editing any integration page:

### Keyword Placement (all must pass)
- [ ] Target keyword in H1 (or CRM name + Sayso pairing)
- [ ] Target keyword in first 100 words of body content (opening description)
- [ ] Target keyword in `seoTitle`
- [ ] Target keyword in `seoDescription`
- [ ] CRM name in first H2 (`howItWorksHeading`)
- [ ] `logoAlt` contains keyword or keyword variation
- [ ] Keyword in at least one FAQ answer

### Keyword Density
- [ ] Exact keyword appears 3-4 times in visible content
- [ ] Semantic variations appear 5-8 times total
- [ ] No keyword stuffing - every usage reads naturally

### Technical SEO
- [ ] `seoTitle` is ≤60 characters (layout adds " | Sayso")
- [ ] `seoDescription` is 130-160 characters
- [ ] Canonical URL ends with trailing slash
- [ ] SoftwareApplication JSON-LD present (requires `featureList`)
- [ ] BreadcrumbList JSON-LD present
- [ ] FAQPage JSON-LD present
- [ ] OG title, description, and image are set

### Content Structure
- [ ] Single H1 - contains both CRM name and Sayso
- [ ] 5 H2s (How It Works, What You Get, Why Choose, Get Started, FAQ)
- [ ] No heading levels skipped
- [ ] All paragraphs ≤3 sentences
- [ ] Total word count 600-1,000
- [ ] 3-5 How It Works steps
- [ ] 3-5 benefit cards
- [ ] 3-5 FAQ items including all 4 required question patterns

### Internal Links (4-6 total)
- [ ] Link to `/integrations/` hub (breadcrumb - automatic)
- [ ] Link to `/demo` (inline CTA + closing CTA - automatic)
- [ ] Link to 1+ feature page (`relatedLinks`)
- [ ] Link to 1+ persona page (`relatedLinks`)
- [ ] Link to `/pricing/` (`relatedLinks`)
- [ ] Links to other integration pages (`relatedIntegrations`) - only when those pages exist
- [ ] Zero broken links / 404s on the page

### CTAs
- [ ] Inline CTA after "How It Works" section (not after "Why Choose")
- [ ] Inline CTA headline includes CRM name
- [ ] Closing CTA at bottom of page

### CRM-Specific Content
- [ ] At least 2-3 CRM-specific workflow elements referenced in content
- [ ] CRM terminology used in benefits, FAQ, and/or how-it-works
- [ ] Content is not generic - it specifically addresses this CRM's users and workflow
