# /glossary Slash Command - Production Prompt

**Usage:** `/glossary [target keyword]`
**Examples:**
- `/glossary what does ISA mean in real estate`
- `/glossary what is a listing appointment`
- `/glossary what does FSBO mean`

When this command is invoked, follow the two-phase process below. **Phase 1** researches the competitive landscape and reads existing glossary content. **Phase 2** writes the glossary entry using that research. The final output must be a complete TypeScript file that exports a `GlossaryEntry` object, plus the registration code for `index.ts`.

### Input Parsing

From the command input, extract:
1. **Target keyword** - the full string after `/glossary` (e.g., "what does ISA mean in real estate")
2. **Slug** - look up from the glossary reference table below
3. **Term** - the human-readable term name from the reference table

If the keyword does not match any entry in the reference table, ask the user to confirm the slug and term before proceeding.

### Glossary Reference Table

| Term | Slug | Keyword |
|---|---|---|
| Circle Prospecting | `circle-prospecting` | "what is circle prospecting" |
| ISA (Inside Sales Agent) | `isa-real-estate` | "what does ISA mean in real estate" |
| Listing Appointment | `listing-appointment` | "what is a listing appointment" |
| Expired Listing | `expired-listing` | "what is an expired listing real estate" |
| FSBO | `fsbo` | "what does FSBO mean" |
| Cold Calling | `cold-calling-real-estate` | "what is cold calling in real estate" |
| Lead Nurturing | `lead-nurturing` | "what is lead nurturing real estate" |
| Sphere of Influence | `sphere-of-influence` | "what is sphere of influence real estate" |
| Door Knocking | `door-knocking` | "what is door knocking real estate" |
| Drip Campaign | `drip-campaign` | "what is a drip campaign real estate" |

**Important:** Do NOT rely on this table for build status. Always read `lib/content/glossary/index.ts` at runtime to determine which glossary pages are actually live.

---

## PHASE 1: RESEARCH (Do This First)

Before writing a single word, complete the research steps below.

### Step 1: Read Existing Glossary Content

- Read `lib/content/glossary/index.ts` to see which glossary entries are currently registered (live). You will need this for the `relatedTerms` field.
- Read `lib/content/glossary/circle-prospecting.ts` as the approved tone and style reference. Study the sentence length, paragraph density, how the definition is structured, and the conversational-but-informative tone. Your output must match this style.
- Read `lib/content/glossary/types.ts` to confirm the `GlossaryEntry` interface.

### Step 2: Identify Cross-Linking Targets

Scan `docs/architecture/site-architecture.md` and identify which of the following pages are marked as DONE:

**Feature pages** (for `relatedFeature`):
- `/products/cue/` - live on-screen coaching during calls
- `/products/smart-capture/` - automatic call summaries synced to CRM
- `/products/playbook/` - custom scripts and strategies
- `/products/pulse/` - real-time market data during calls

**Persona pages** (for `relatedPersona`):
- `/for/solo-agents/`

**Blog posts** (for `deeperLink`):
- `/blog/real-estate-cold-calling-guide/` (pillar)
- `/blog/expired-listing-scripts/`
- Check for any other DONE blog posts relevant to this term

Choose the most relevant DONE page for each cross-link. If no relevant page exists for a field, omit that field entirely.

### Step 3: Search the Target Keyword

- Run one web search for the exact target keyword
- Glossary terms are evergreen definitions, so no need for a "2025" or "2026" recency search

### Step 4: Analyze the Top 3 Ranking Pages

- Fetch and read the top 3 organic results (skip ads, forums, YouTube, and dictionary sites with one-sentence definitions)
- For each page, extract:
  - **Title and H1** - how they frame the definition
  - **Definition phrasing** - the exact way they define the term
  - **Sub-topics covered** - what sections appear after the definition
  - **FAQ questions** - any questions they answer about the term
  - **Unique angles** - practical advice or examples they include

### Step 5: Build a Lightweight Competitive Brief

For your own reference only (do NOT include in the final output):

1. **Common definition phrasing** - how competitors define this term (so yours is different and better)
2. **Sub-topics covered** - what sections appear across all 3 competitors
3. **Content gaps** - angles or practical advice fewer than 2 of 3 cover
4. **FAQ questions** - questions from PAA boxes or competitor FAQ sections (feed into the `faq` field)
5. **Keyword variations** - semantic variants to weave into the content naturally

### Research Rules

- Spend the research phase reading and analyzing. Do NOT start writing until the brief is complete
- If a competitor page is behind a paywall or fails to load, skip it and move to the next result
- This is a definitional page, not a comprehensive guide. Keep research focused on definitions and practical context
- Total research should be lighter than blog post research - 3 competitors, not 5

---

## PHASE 2: WRITE THE GLOSSARY ENTRY

Using the competitive brief from Phase 1, write the complete glossary entry following every rule below.

---

## CONTEXT: What You're Writing For

**Product:** Sayso (asksayso.com) is an AI-powered real-time coaching tool for real estate agents and ISAs. During live calls, Sayso displays on-screen prompts telling agents what to say, how to handle objections, and when to ask for the appointment. It also auto-generates call notes and syncs them to CRMs (Follow Up Boss, Sierra Interactive, KVCore).

**Key features (for linking in `howSaysoHelps`):**
- **Real-Time Coaching** (`/products/cue/`) - live on-screen prompts during calls
- **Call Notes** (`/products/smart-capture/`) - automatic call summaries synced to CRM
- **Playbook** (`/products/playbook/`) - custom scripts and strategies
- **Pulse** (`/products/pulse/`) - real-time market data during calls

**Target audience:** Real estate agents (solo and team), ISAs, team leaders, and brokerage managers in the US. They make 20-100+ calls per day. Practical, time-pressed, skeptical of tools that don't immediately help them book more appointments.

**What makes Sayso different:**
- **Shilo AI** - post-call grading and analysis. Reviews calls AFTER they happen.
- **MaverickRE** - broader platform with AI role-play for practice. Not present during real calls.
- **Sayso's edge** - real-time, live-call coaching. The AI is listening and suggesting during the conversation, not reviewing it after.

---

## OUTPUT FORMAT

### Output 1: The Content File

Write a complete TypeScript file at `lib/content/glossary/[slug].ts`. The file must:
- Import the `GlossaryEntry` type
- Export a named constant (camelCase version of the slug)
- Match the `GlossaryEntry` interface exactly

**Template structure:**

```typescript
import type { GlossaryEntry } from './types';

export const camelCaseName: GlossaryEntry = {
  slug: '...',
  term: '...',
  keyword: '...',
  seoTitle: '...',
  seoDescription: '...',
  h1: '...',
  definition: '...',
  howItWorks: ['...', '...'],
  whyItMatters: ['...', '...'],
  tips: [{ title: '...', body: '...' }, ...],
  howSaysoHelps: ['...', '...'],
  relatedTerms: [],
  deeperLink: { title: '...', href: '...' },
  relatedFeature: { title: '...', href: '...' },
  relatedPersona: { title: '...', href: '...' },
  faq: [{ question: '...', answer: '...' }, ...],
};
```

### Field-by-Field Rules

**`slug`**: Must match the slug from the glossary reference table. Lowercase, hyphenated.

**`term`**: Human-readable term name. Title Case. If the term is an acronym, include the expansion in parentheses: "ISA (Inside Sales Agent)", "FSBO (For Sale By Owner)".

**`keyword`**: The exact target keyword from the user's input. Lowercase.

**`seoTitle`**: Max 60 characters. Format: "What Is [Term] in Real Estate" or "What Does [Term] Mean in Real Estate". The layout automatically appends " | Sayso", so do NOT include "| Sayso" in this field.

**`seoDescription`**: 150-160 characters. Must contain the target keyword or core term. Format: "[Term] is [short definition]. Learn [what the page covers]. [CTA or value signal mentioning Sayso]."

**`h1`**: Question form: "What Is [Term]?" or "What Does [Term] Mean?" Must contain the target keyword or the core term.

**`definition`**: Exactly 2 sentences. This is the featured snippet target.
- **Sentence 1:** Clean, standalone definition under 45 words. Format: "[Term] is [definition]." Must work as a complete answer on its own.
- **Sentence 2:** Context about why it matters to real estate agents or how it fits into their workflow.
- Combined target: 50-70 words.

**`howItWorks`**: Array of 2-3 strings. Each string renders as its own `<p>` tag. Each paragraph max 3 sentences. Describe how this concept works in practice for a real estate agent. Be specific and concrete, not abstract. The target keyword or a semantic variation must appear in the first paragraph.

**`whyItMatters`**: Array of 2-3 strings. Each paragraph max 3 sentences. Explain why this matters to real estate agents specifically. Connect it to booking appointments, building pipeline, or agent efficiency. Include a semantic keyword variation.

**`tips`**: Array of 4-6 objects with `title` and `body`.
- Each `title` should be an actionable imperative (e.g., "Call within 48 hours of the trigger event").
- Each `body` should be 1-2 sentences explaining why this tip works or matters.
- Be specific: include numbers, timeframes, or concrete actions where possible.

**`howSaysoHelps`**: Array of 2-3 strings. This is the product tie-in section.
- Must connect the specific glossary term to a specific Sayso feature. Not "Sayso helps with calls" but "When a homeowner asks about their home's value, Sayso shows you the right response instantly."
- Supports inline markdown: `[text](/url/)` for links. Include `[Book a demo](/demo/)` in the last paragraph.
- Reference at least one specific Sayso feature by name (Real-Time Coaching, Call Notes, Pulse, or Playbook).

**`relatedTerms`**: Array of `{ term: string; slug: string }` objects. Only include glossary entries that are currently registered in `lib/content/glossary/index.ts` (confirmed live in Step 1 of research). If only circle-prospecting exists and it is relevant, include it. If no relevant live entries exist, use an empty array `[]`. Never link to unbuilt glossary pages.

**`deeperLink`**: Optional. Link to a relevant blog post that is DONE. Format: `{ title: 'Post Title', href: '/blog/post-slug' }`. If no relevant blog post exists yet, omit this field entirely. Do not link to unbuilt posts.

**`faq`**: Array of 3-4 objects with `question` and `answer`.
- First question must rephrase the H1/keyword as a question (e.g., "What is [term] in real estate?").
- Include at least one "how" question (e.g., "How do I get started with [term]?" or "How many/how often...").
- Answers: 2-3 sentences max each.
- Target PAA questions from the research phase where possible.

**`heroImage`**: Omit for now. No images are available for glossary pages yet.

**`relatedFeature`**: Link to the most relevant DONE feature page. Format: `{ title: 'Feature Name', href: '/products/feature-slug' }`. Choose based on relevance:
- Call-related terms -> `/products/cue/`
- Notes/CRM terms -> `/products/smart-capture/`
- Script-related terms -> `/products/playbook/`
- Market data terms -> `/products/pulse/`

**`relatedPersona`**: Link to a relevant DONE persona page. Currently only `/for/solo-agents/` is built. Format: `{ title: 'Sayso for Solo Agents', href: '/for/solo-agents' }`. If not relevant, omit this field.

**`ogImage`**: Omit (the default OG image will be used).

### Output 2: The index.ts Registration

After the content file, show the exact changes needed for `lib/content/glossary/index.ts`:

1. The new import statement to add
2. The updated `entries` array with the new entry included

Write the updated file directly. Do not just show a diff.

### Output 3: Cross-Link Updates

If any existing glossary entries should add the new term to their `relatedTerms` array, show the exact code change for each affected file. Only update entries where the terms are genuinely related.

---

## GLOBAL WRITING RULES (from CLAUDE.md)

These are non-negotiable. Every violation must be caught before output.

1. **Brand name is "Sayso"** - capital S, lowercase a-y-s-o. Never "SaySo", "SAYSO", "Say So", or "say so".
2. **Never use "Not X. Not Y. Just Z" sentence structures.** Rewrite with affirmative phrasing.
3. **Never use "run" or "running" when talking about calls.** Use "make calls", "dial", "get on the phone".
4. **Avoid "cold call(s)".** Use "call(s)" instead, unless you are specifically discussing cold calling as a topic (e.g., the cold-calling-real-estate glossary entry).
5. **Never say "phone call(s)".** Use "call(s)" instead.
6. **Never refer to real estate agents as "reps" or "representatives".** Only "agents" or "real estate agents".
7. **Never refer to clients or prospects as "deals".** Use "prospect", "lead", "client", or "appointment".
8. **Never say "close a deal" or "win/lose deals".** Agents book appointments and turn prospects into clients.
9. **Never use em dashes.** Use commas, periods, colons, or rephrase. En dashes for number ranges (e.g., "50-200") are acceptable.
10. **Copy must be lead type agnostic.** Sayso helps agents with both buyers and sellers. Do not assume the prospect is only buying or only selling.

---

## GLOSSARY-SPECIFIC WRITING RULES

1. **No CTA before the `howSaysoHelps` section.** The definition, howItWorks, whyItMatters, and tips fields are purely educational.
2. **Paragraphs max 3 sentences.** Agents read on mobile between calls.
3. **Tone: practical and clear.** Like a coach explaining a term to a new agent. Not a textbook, not a dictionary.
4. **No filler.** Every sentence must teach or clarify. If a sentence could be deleted without losing information, delete it.
5. **Banned phrases:** "In today's competitive market," "It's no secret that," "As a real estate professional," "In the ever-evolving world of," "Let's dive in," "Without further ado," "At the end of the day," "In this guide," "It's important to note."
6. **String escaping:** Single quotes within TypeScript strings must be escaped with `\'`. Double-check every apostrophe and contraction (e.g., "agent\'s", "don\'t", "you\'re").
7. **Total word count: 600-900 words** across all content fields combined. This is a glossary entry, not a blog post. Be concise.

---

## SEO RULES

### Keyword Placement (Non-Negotiable)

| Location | Rule |
|----------|------|
| **H1** | Contains the exact target keyword or core term |
| **First 100 words** | Exact keyword in the `definition` field (sentence 1 or 2) |
| **seoTitle** | Contains the keyword, max 60 chars |
| **seoDescription** | Contains the keyword, 150-160 chars |
| **First H2 content** | Target keyword or strong semantic variation in the first paragraph of `howItWorks` |
| **FAQ question 1** | Rephrases the keyword as a question |

### Keyword Density

- **Exact target keyword:** 3-5 times across all content fields combined
- **Semantic variations:** 5-10 times (plural forms, related phrases, synonyms)
- **Never stuff.** If it sounds forced, use a variation instead.

### Featured Snippet Optimization

The `definition` field is the featured snippet target:
- Sentence 1 must be a clean, standalone definition under 45 words
- Format: "[Term] is [definition]."
- Must work as a complete answer if Google pulls just this sentence

---

## WHAT THE TEMPLATE HANDLES AUTOMATICALLY

Do NOT include any of these in the content file. The `GlossaryPage` component and route handler generate them automatically:

- DefinedTerm JSON-LD schema markup
- BreadcrumbList JSON-LD (Home > Glossary > [Term])
- FAQPage JSON-LD (from the `faq` array)
- "Part of the Real Estate Glossary" text link to `/glossary/`
- ContentInlineCTA component (appears after "How Sayso Helps" section)
- ContentCTA component (full-width block at page bottom)
- Open Graph / Twitter meta tags (via `buildMetadata`)
- Canonical URL with trailing slash

Your job is the content data only. Everything else is handled by the existing infrastructure.

---

## QUALITY CHECKLIST (Self-Audit Before Output)

Before finalizing, verify every item:

### Research
- [ ] `lib/content/glossary/index.ts` was read to check which entries are live
- [ ] `circle-prospecting.ts` was read as a tone/style reference
- [ ] Top 3 competitor pages were analyzed
- [ ] Competitive brief was built before writing began

### Content Structure
- [ ] `definition` is exactly 2 sentences, sentence 1 under 45 words
- [ ] `howItWorks` has 2-3 paragraphs, each max 3 sentences
- [ ] `whyItMatters` has 2-3 paragraphs, each max 3 sentences
- [ ] `tips` has 4-6 items with actionable titles
- [ ] `howSaysoHelps` has 2-3 paragraphs connecting the term to a specific Sayso feature
- [ ] `howSaysoHelps` contains `[Book a demo](/demo/)` inline markdown link
- [ ] `faq` has 3-4 items, first rephrases the keyword
- [ ] Total word count is 600-900 across all content fields

### SEO
- [ ] `seoTitle` is under 60 characters and does NOT include "| Sayso"
- [ ] `seoDescription` is 150-160 characters and contains the keyword
- [ ] Target keyword appears 3-5 times across all fields
- [ ] Semantic variations appear 5-10 times
- [ ] Keyword is in: definition, first howItWorks paragraph, and first FAQ answer

### Writing Rules
- [ ] Brand name is "Sayso" everywhere (not SaySo, SAYSO, Say So)
- [ ] No em dashes anywhere
- [ ] No "phone call(s)", no "run/running" for calls
- [ ] No "reps/representatives", no "deals", no "close a deal"
- [ ] No banned filler phrases
- [ ] No "Not X. Not Y. Just Z." structures
- [ ] Copy is lead type agnostic (covers buyers and sellers)
- [ ] Tone matches circle-prospecting.ts (coach-like, practical, clear)

### Technical
- [ ] All single quotes in strings are escaped with `\'`
- [ ] File exports a named constant matching the camelCase slug
- [ ] Object matches the `GlossaryEntry` interface exactly
- [ ] `relatedTerms` only includes entries confirmed live in index.ts
- [ ] `deeperLink` only points to a DONE blog post (or is omitted)
- [ ] `relatedFeature` points to a DONE feature page
- [ ] `relatedPersona` points to a DONE persona page (or is omitted)
- [ ] index.ts registration code is included
- [ ] Cross-link updates for existing glossary pages are listed (if applicable)
