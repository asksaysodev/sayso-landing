# /objection Slash Command - Production Prompt

**Usage:** `/objection [target keyword]`
**Examples:**
- `/objection how to handle "already working with agent"`
- `/objection how to respond to "just looking" real estate`
- `/objection FSBO objection handling`

When this command is invoked, follow the two-phase process below. **Phase 1** reads the Ultimate Script Book, researches the competitive landscape, and reads existing objection content. **Phase 2** writes the objection entry using that research. The final output must be a complete TypeScript file that exports an `ObjectionEntry` object, plus the registration code for `index.ts`.

### Input Parsing

From the command input, extract:
1. **Target keyword** - the full string after `/objection` (e.g., "how to handle "already working with agent"")
2. **Slug** - look up from the objection reference table below
3. **Objection phrase** - the human-readable "what the prospect says" from the reference table

If the keyword does not match any entry in the reference table, ask the user to confirm the slug and objection phrase before proceeding.

### Objection Reference Table

| Objection | Slug | Keyword | Objection Quote |
|---|---|---|---|
| "I'm Not Ready Yet" | `not-ready-yet` | how to handle "not ready yet" real estate | I'm not ready yet. |
| "Already Working with an Agent" | `already-have-an-agent` | how to handle "already working with agent" | I already have an agent. |
| "Just Looking" | `just-looking` | how to respond to "just looking" real estate | I'm just looking. |
| "Call Me Later" | `call-me-later` | real estate script for "call me later" | Can you call me later? |
| "The Price Is Too High" | `price-too-high` | how to handle price objection real estate | The price is too high. |
| "We Want to Sell Ourselves" | `want-to-sell-ourselves` | FSBO objection handling | We want to sell it ourselves. |
| "I Need to Think About It" | `need-to-think-about-it` | what to say when prospect shuts down | I need to think about it. |
| "Not Interested" | `not-interested` | what to say when lead is not interested | I'm not interested. |
| "Already Listed" | `already-listed` | how to handle already listed objection | We're already listed with someone. |
| "Bad Experience with Agents" | `bad-experience-with-agents` | how to handle bad agent experience objection | I had a bad experience with an agent before. |
| "The Market Is Bad" | `market-is-bad` | how to handle market objection real estate | The market is bad right now. |
| "Just Send Me Listings" | `just-send-listings` | how to redirect a conversation real estate | Just send me some listings. |
| "How Much Is Your Commission?" | `how-much-is-your-commission` | how to handle commission question real estate | How much is your commission? |
| "We'll Wait for Spring" | `well-wait-for-spring` | how to handle timing objection real estate | We'll wait for spring. |
| "My Spouse Needs to Decide" | `my-spouse-needs-to-decide` | how to handle third-party objection real estate | My spouse needs to decide. |

**Important:** Do NOT rely on this table for build status. Always read `lib/content/objections/index.ts` at runtime to determine which objection pages are actually live.

### Script Book Mapping Table

The Ultimate Script Book (`docs/content/Ultimate Script Book (1).md`) contains real-world call scripts and prospect psychology. Use this table to find the relevant sections for each objection. Read these sections FIRST in Phase 1 before any web research.

| Slug | Script Book Sections (line numbers) | Coverage |
|---|---|---|
| `already-have-an-agent` | "If They Say They're Working With an Agent" (line 898), LPMAMA Agent questions (line 559), O.H. "If They Have an Agent" (line 1675) | Strong |
| `just-looking` | "If They Say 'Just Looking'" (line 890), Cold lead classification (line 720) | Strong |
| `call-me-later` | "10 Days of Pain" framework (line 233), follow-up examples (lines 281-410), "Keep the Calls Moving" (line 222) | Partial |
| `price-too-high` | "If affordability or rates" showing response (line 1934), LPMAMA Price questions (line 538), strategy session positioning (line 1966) | Partial |
| `want-to-sell-ourselves` | Full FSBO script section (line 1316) | Strong |
| `need-to-think-about-it` | Hesitation handling at off-market listing (line 1545), warm lead "not ready" language (line 700), "Urgency Creates Action" (line 181) | Strong |
| `not-interested` | No dedicated section. Use "Motivation Is Everything" (line 67), "Three Layers of Motivation" (line 96), general validate-then-redirect pattern | Gap |
| `already-listed` | Expired listing script (line 1369), "If relisting with same agent" (line 1412) | Partial |
| `bad-experience-with-agents` | LPMAMA Agent question "Are you currently working with an agent?" (line 559), general trust-building language throughout | Gap |
| `market-is-bad` | Market insight examples (line 333), "Urgency Creates Action" (line 181), risk-without-pressure example (line 361) | Gap |
| `just-send-listings` | "Don't Default to Sending Homes" (line 46), "When Someone Asks for Homes" (line 50), "just send it to me" showing script (line 1941), second appointment redirect (line 1971) | Strong |
| `how-much-is-your-commission` | "Are you planning to interview more than one agent?" (line 1605), Commitment Standard (line 192) | Weak |
| `well-wait-for-spring` | Warm lead "lease ends next spring" (line 704), "Motivation Reveals the Timeline" (line 79), timing follow-ups (line 448), "biggest mistake I see" risk framing (line 361) | Partial |
| `my-spouse-needs-to-decide` | "Would you want your partner or spouse with you?" pattern (lines 779, 1032, 1083, 1263, 1305, 1355, 1398), "Will all decision makers be present?" (line 1613) | Partial |

**For "Gap" coverage objections:** The Script Book has no dedicated section. Read the general Mentality/Principles sections (lines 27-230): "Motivation Is Everything," "Three Layers of Motivation," "Urgency Creates Action," "Book the Meeting," and "The Commitment Standard." Extract the general validate-then-redirect pattern and motivation-discovery framework, then lean more heavily on web research in Steps 4-5. For "Weak" coverage, do the same but also read the specific partial sections listed.

---

## PHASE 1: RESEARCH (Do This First)

Before writing a single word, complete the research steps below.

### Step 1: Read the Ultimate Script Book

- Read `docs/content/Ultimate Script Book (1).md`
- Using the Script Book Mapping Table above, locate the sections relevant to the target objection
- Extract:
  - **Exact language/scripts** that agents use when facing this objection (these will inform your safe/stronger/advanced responses)
  - **Psychology and motivation insights** that explain why prospects say this (feeds into `whyTheySayThis`)
  - **Response frameworks** (validate, redirect, close patterns) observed in the scripts
  - **Mistakes or anti-patterns** mentioned (e.g., "sending homes weakens your position") for `commonMistakes`
  - **Transition language** for what to say after the initial response (feeds into `whatToSayNext`)
- Note the coverage level. If "Strong," the Script Book should heavily inform the response scripts. If "Gap," treat the Script Book as background context for general principles and rely more on web research.

### Step 2: Read Existing Objection Content

- Read `lib/content/objections/index.ts` to see which objection entries are currently registered (live). You will need this for the `relatedObjections` field.
- Read `lib/content/objections/not-ready-yet.ts` as the approved tone and style reference. Study the script length, the "why it works" explanations, the opening paragraph format, and the practical, empathetic tone. Your output must match this style.
- Read `lib/content/objections/types.ts` to confirm the `ObjectionEntry` interface.

### Step 3: Identify Cross-Linking Targets

Scan `docs/architecture/site-architecture.md` and identify which of the following pages are marked as DONE:

**Feature pages** (for `relatedFeature`):
- `/products/cue/` - live on-screen coaching during calls
- `/products/smart-capture/` - automatic call summaries synced to CRM
- `/products/playbook/` - custom scripts and strategies
- `/products/pulse/` - real-time market data during calls

**Blog posts** (for `relatedBlogPost`):
- `/blog/real-estate-cold-calling-guide/` (pillar)
- `/blog/expired-listing-scripts/`
- Check for any other DONE blog posts relevant to this objection

Choose the most relevant DONE page for each cross-link. If no relevant page exists for a field, omit that field entirely. Do not link to unbuilt posts or features.

### Step 4: Search the Target Keyword

- Run one web search for the exact target keyword
- Run a second web search for "[objection phrase] real estate script" to find script-focused competitors
- For "Gap" coverage objections (see mapping table), run a third search: "[objection phrase] real estate response" to compensate for limited Script Book content

### Step 5: Analyze the Top 3 Ranking Pages

- Fetch and read the top 3 organic results (skip ads, forums, YouTube, and thin pages with no scripts)
- For each page, extract:
  - **Title and H1** - how they frame the objection
  - **Response scripts** - do they provide actual scripts? How many levels?
  - **Psychology section** - do they explain WHY the prospect says this?
  - **Mistakes section** - do they cover what NOT to do?
  - **FAQ questions** - any questions they answer about the objection
  - **Unique angles** - role-play examples, downloadable scripts, video content

### Step 6: Build a Lightweight Competitive Brief

For your own reference only (do NOT include in the final output):

1. **Script quality comparison** - how do competitor scripts compare to the Script Book scripts? Where can you improve?
2. **Psychology depth** - what explanation of prospect psychology do competitors offer? Can the Script Book's motivation framework add depth?
3. **Content gaps** - angles or practical advice fewer than 2 of 3 competitors cover
4. **FAQ questions** - questions from PAA boxes or competitor FAQ sections (feed into the `faq` field)
5. **Keyword variations** - semantic variants to weave into the content naturally

### Research Rules

- Spend the research phase reading and analyzing. Do NOT start writing until the brief is complete
- If a competitor page is behind a paywall or fails to load, skip it and move to the next result
- The Script Book is your primary source of authenticity. Competitor research shapes structure and SEO coverage. The Script Book shapes voice and language.
- Total research should be light: the Script Book + 3 competitors

---

## PHASE 2: WRITE THE OBJECTION ENTRY

Using the competitive brief and Script Book insights from Phase 1, write the complete objection entry following every rule below.

---

## CONTEXT: What You're Writing For

**Product:** Sayso (asksayso.com) is an AI-powered real-time coaching tool for real estate agents and ISAs. During live calls, Sayso displays on-screen prompts telling agents what to say, how to handle objections, and when to ask for the appointment. It also auto-generates call notes and syncs them to CRMs (Follow Up Boss, Sierra Interactive, KVCore).

**Key features (for use in `howSaysoHelps` and `relatedFeature`):**
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

Write a complete TypeScript file at `lib/content/objections/[slug].ts`. The file must:
- Import the `ObjectionEntry` type
- Export a named constant (camelCase version of the slug)
- Match the `ObjectionEntry` interface exactly

**Template structure:**

```typescript
import type { ObjectionEntry } from './types';

export const camelCaseName: ObjectionEntry = {
  slug: '...',
  keyword: '...',
  seoTitle: '...',
  seoDescription: '...',
  h1: '...',
  objectionQuote: '...',
  openingParagraph: '...',
  whyTheyTitle: '...',
  whyTheySayThis: '...',
  responses: {
    safe: { label: 'The Safe Response', script: '...', whyItWorks: '...' },
    stronger: { label: 'The Stronger Response', script: '...', whyItWorks: '...' },
    advanced: { label: 'The Advanced Response', script: '...', whyItWorks: '...' },
  },
  whatToSayNext: '...',
  commonMistakes: ['...', '...', '...', '...'],
  howSaysoHelps: '...',
  relatedObjections: [{ title: '...', slug: '...', keyword: '...' }, ...],
  faq: [{ question: '...', answer: '...' }, ...],
  relatedBlogPost: { title: '...', href: '...' },
  relatedFeature: { title: '...', href: '...' },
};
```

### Field-by-Field Rules

**`slug`**: From the reference table. Lowercase, hyphenated. The objection phrase only (e.g., `not-ready-yet`), not "how-to-handle-..."

**`keyword`**: The exact target keyword from the reference table.

**`seoTitle`**: Max 60 characters. Should match or closely mirror the H1. The layout automatically appends " | Sayso", so do NOT include "| Sayso" in this field.

**`seoDescription`**: 150-160 characters. Must contain the target keyword. Format: `[What page teaches]. [Benefit/outcome]. [Optional CTA].`

**`h1`**: Must contain the exact target keyword. Format: `How to Handle "[Objection]" in Real Estate`

**`objectionQuote`**: The exact words the prospect says. Short, natural language (e.g., `I'm not ready yet.`). Used in the speech bubble visual element.

**`openingParagraph`**: 2-3 sentences. This is the featured snippet target.
- **Sentence 1:** Clean, standalone answer under 45 words. Format: `Knowing how to handle "[objection]" in real estate [rest of sentence].`
- Must work as a complete answer if Google pulls just this paragraph.

**`whyTheyTitle`**: Custom H2. Format: `Why Prospects Say "[Objection]"`. Must contain the keyword or a semantic variation.

**`whyTheySayThis`**: 2-3 paragraphs separated by `\n\n`. Explain the psychology behind the objection. Include 1 keyword instance woven in naturally. Draw from the Script Book's motivation framework (Three Layers of Motivation, surface vs. emotional vs. consequential) where applicable.

**`responses.safe`**: Label is always `"The Safe Response"`. Script should be conversational, validating, low-risk. Informed by Script Book language where coverage exists. `whyItWorks` is 1-2 sentences explaining the psychology.

**`responses.stronger`**: Label is always `"The Stronger Response"`. More direct, forces specificity or reframes the conversation. `whyItWorks` is 1-2 sentences.

**`responses.advanced`**: Label is always `"The Advanced Response"`. High confidence, reframes the objection as an advantage or offers a value play. `whyItWorks` is 1-2 sentences.

**Script authenticity rule:** Scripts must sound like something a real agent would say on a call. Draw language patterns from the Script Book: conversational contractions, direct questions, simple phrasing. Avoid overly polished marketing-speak. The `not-ready-yet.ts` reference shows the right tone.

**`whatToSayNext`**: 1 paragraph. Transition advice after the initial response. Include 1 keyword instance. Focus on discovery questions and keeping the conversation going, not closing. Draw from the Script Book's transition-to-meeting patterns.

**`commonMistakes`**: Array of 4-6 strings. Each is a short, specific mistake description. Focus on mistakes that actually cost agents appointments. Not platitudes.

**`howSaysoHelps`**: A single string, 2-4 sentences. Brief product tie-in connecting the objection to a specific Sayso feature (Real-Time Coaching, Call Notes, Pulse, or Playbook). This is NOT a feature page. Keep it concise.

**`relatedObjections`**: Array of 3-5 objects with `title`, `slug`, `keyword`. Include both live and planned objections from the hub config where they are genuinely related. The existing `not-ready-yet.ts` reference links to planned (unbuilt) objection pages, so follow this pattern.

**`faq`**: Array of 3-4 objects with `question` and `answer`.
- First question must rephrase the H1/keyword as a question (e.g., `What does "[objection]" really mean in real estate?`).
- Include at least one "how to" question related to the objection.
- Include one question about how AI/Sayso helps with objection handling.
- Answers: 2-3 sentences max each.
- Target PAA questions from the research phase where possible.

**`relatedBlogPost`**: Optional. Link to a relevant DONE blog post. Format: `{ title: 'Post Title', href: '/blog/post-slug' }`. If no relevant blog post exists, omit this field entirely.

**`relatedFeature`**: Optional. Link to the most relevant DONE feature page. Choose based on relevance:
- Objection handling during calls -> `/products/cue/`
- Scripts and playbooks -> `/products/playbook/`
- Market data objections -> `/products/pulse/`
- Notes/follow-up -> `/products/smart-capture/`

**`heroImage`**: Omit for now. No images are available for objection pages yet.

**`ogImage`**: Omit (the default OG image will be used).

### Output 2: The index.ts Registration

After the content file, show the exact changes needed for `lib/content/objections/index.ts`:

1. The new import statement to add
2. The updated `entries` array with the new entry included

Write the updated file directly. Do not just show a diff.

### Output 3: Cross-Link Updates

If any existing objection entries should add the new page to their `relatedObjections` array, show the exact code change for each affected file. Only update entries where the objections are genuinely related.

---

## GLOBAL WRITING RULES (from CLAUDE.md)

These are non-negotiable. Every violation must be caught before output.

1. **Brand name is "Sayso"** - capital S, lowercase a-y-s-o. Never "SaySo", "SAYSO", "Say So", or "say so".
2. **Never use "Not X. Not Y. Just Z" sentence structures.** Rewrite with affirmative phrasing.
3. **Never use "run" or "running" when talking about calls.** Use "make calls", "dial", "get on the phone".
4. **Avoid "cold call(s)".** Use "call(s)" instead, unless you are specifically discussing cold calling as a topic.
5. **Never say "phone call(s)".** Use "call(s)" instead.
6. **Never refer to real estate agents as "reps" or "representatives".** Only "agents" or "real estate agents".
7. **Never refer to clients or prospects as "deals".** Use "prospect", "lead", "client", or "appointment".
8. **Never say "close a deal" or "win/lose deals".** Agents book appointments and turn prospects into clients.
9. **Never use em dashes.** Use commas, periods, colons, or rephrase. En dashes for number ranges (e.g., "3-6 months") are acceptable.
10. **Copy must be lead type agnostic.** Sayso helps agents with both buyers and sellers. Do not assume the prospect is only buying or only selling.

---

## OBJECTION-SPECIFIC WRITING RULES

1. **No CTA before the `howSaysoHelps` section.** The opening paragraph, why they say this, responses, what to say next, and common mistakes are purely educational.
2. **Paragraphs max 3 sentences.** Agents read on mobile between calls.
3. **Scripts must sound natural.** Agents should be able to say these words out loud on a call. Avoid marketing-speak in scripts.
4. **Tone: conversational and empathetic.** Like an experienced agent coaching a newer agent. Not a textbook, not a dictionary.
5. **No filler.** Every sentence must teach or clarify. If a sentence could be deleted without losing information, delete it.
6. **Banned phrases:** "In today's competitive market," "It's no secret that," "As a real estate professional," "In the ever-evolving world of," "Let's dive in," "Without further ado," "At the end of the day," "In this guide," "It's important to note."
7. **String escaping:** Single quotes within TypeScript strings must be escaped with `\'`. Double-check every apostrophe and contraction (e.g., "agent\'s", "don\'t", "you\'re", "I\'m").
8. **Total word count: 600-900 words** across all content fields combined. This is a concise practical resource, not a blog post.
9. **Response scripts use double quotes inside the string.** The pattern from the reference implementation wraps scripts in outer single quotes (TypeScript string delimiter) with double quotes for the spoken words inside.

---

## SEO RULES

### Keyword Placement (Non-Negotiable)

| Location | Rule |
|----------|------|
| **H1** | Contains the exact target keyword |
| **First 100 words** | Exact keyword in `openingParagraph` sentence 1 or 2 |
| **seoTitle** | Contains the keyword, max 60 chars |
| **seoDescription** | Contains the keyword, 150-160 chars |
| **First H2** (`whyTheyTitle`) | Target keyword or strong semantic variation |
| **Image alt text** | If `heroImage` present, keyword or variation in alt text |
| **FAQ question 1** | Rephrases the keyword as a question |

### Keyword Density

- **Exact target keyword:** 3-5 times across all content fields combined
- **Semantic variations:** 5-10 times (the objection phrase itself, variations, and related concepts like "objection handling," "prospecting objection," "when a prospect says")
- **Never stuff.** If it sounds forced, use a variation instead.

### Featured Snippet Optimization

The `openingParagraph` is the featured snippet target:
- Sentence 1 must be a clean, standalone answer under 45 words
- Format: `Knowing how to handle "[objection]" in real estate [rest of sentence].`
- The full opening paragraph should be 2-3 sentences and work as a standalone answer if Google pulls it

---

## WHAT THE TEMPLATE HANDLES AUTOMATICALLY

Do NOT include any of these in the content file. The `ObjectionPage` component and route handler generate them automatically:

- HowTo JSON-LD schema markup (generated from the 3 response frameworks)
- BreadcrumbList JSON-LD (Home > Objections > [H1])
- FAQPage JSON-LD (from the `faq` array)
- "OBJECTION" badge above the H1
- Objection quote speech bubble styling
- ContentInlineCTA component (appears after "How Sayso Helps" section)
- ContentCTA component (full-width block at page bottom)
- Open Graph / Twitter meta tags (via `buildMetadata`)
- Canonical URL with trailing slash
- Response card styling (yellow-bordered blockquotes)

Your job is the content data only. Everything else is handled by the existing infrastructure.

---

## QUALITY CHECKLIST (Self-Audit Before Output)

Before finalizing, verify every item:

### Research
- [ ] `docs/content/Ultimate Script Book (1).md` was read and relevant sections were identified
- [ ] `lib/content/objections/index.ts` was read to check which entries are live
- [ ] `not-ready-yet.ts` was read as a tone/style reference
- [ ] `docs/architecture/site-architecture.md` was scanned for DONE blog and feature pages
- [ ] Top 3 competitor pages were analyzed
- [ ] Competitive brief was built before writing began

### Content Structure
- [ ] `openingParagraph` is 2-3 sentences, sentence 1 under 45 words
- [ ] `whyTheySayThis` has 2-3 paragraphs (separated by `\n\n`), each max 3 sentences
- [ ] All 3 response frameworks have a script and a "why it works" explanation
- [ ] Scripts sound natural and draw from Script Book language patterns where applicable
- [ ] `whatToSayNext` is 1 paragraph with transition advice
- [ ] `commonMistakes` has 4-6 specific, actionable items
- [ ] `howSaysoHelps` is 2-4 sentences connecting the objection to a specific Sayso feature
- [ ] `faq` has 3-4 items (first = H1 variation, one "how to" Q, one AI/Sayso Q)
- [ ] `relatedObjections` has 3-5 related objection pages
- [ ] Total word count is 600-900 across all content fields

### SEO
- [ ] `seoTitle` is under 60 characters and does NOT include "| Sayso"
- [ ] `seoDescription` is 150-160 characters and contains the keyword
- [ ] Target keyword appears 3-5 times across all fields
- [ ] Semantic variations appear 5-10 times
- [ ] Keyword is in: H1, openingParagraph, whyTheyTitle, seoTitle, seoDescription, first FAQ

### Writing Rules
- [ ] Brand name is "Sayso" everywhere (not SaySo, SAYSO, Say So)
- [ ] No em dashes anywhere
- [ ] No "phone call(s)", no "run/running" for calls
- [ ] No "reps/representatives", no "deals", no "close a deal"
- [ ] No banned filler phrases
- [ ] No "Not X. Not Y. Just Z." structures
- [ ] Copy is lead type agnostic (covers buyers and sellers)
- [ ] Tone matches not-ready-yet.ts (coach-like, practical, empathetic)

### Technical
- [ ] All single quotes in strings are escaped with `\'`
- [ ] File exports a named constant matching the camelCase slug
- [ ] Object matches the `ObjectionEntry` interface exactly
- [ ] `relatedBlogPost` only points to a DONE blog post (or is omitted)
- [ ] `relatedFeature` points to a DONE feature page (or is omitted)
- [ ] index.ts registration code is included
- [ ] Cross-link updates for existing objection pages are listed (if applicable)
