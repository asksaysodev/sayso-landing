# /standalone-post Slash Command - Production Prompt

**Usage:** `/standalone-post "[target keyword]" category:[category-slug]`
**Examples:**
- `/standalone-post "real estate call notes template" category:crm-notes`
- `/standalone-post "i hate cold calling real estate" category:mindset`
- `/standalone-post "real estate call statistics" category:real-estate`

When this command is invoked, follow the two-phase process below. **Phase 1** checks the Ultimate Script Book for relevant principles, reads related site content, and researches the competitive landscape. **Phase 2** writes the post using that research. The final output must be a single `.mdx` file with YAML frontmatter + markdown body that can be dropped directly into `content/blog/` with zero manual reformatting.

### Input Parsing

From the command input, extract:
1. **Target keyword** - the quoted string (e.g., "real estate call notes template")
2. **Category** - the value after `category:` (e.g., `crm-notes`)

If no category is provided, infer from the keyword and topic using the Category Reference Table below. If ambiguous, ask the user before generating.

### Category Reference Table

Standalone posts are not part of a pillar cluster. They live in one of three content groups, each with its own category slug and tonal considerations:

| Category Slug | Content Group | Topic Examples | Tonal Notes |
|---|---|---|---|
| `crm-notes` | CRM and Notes | Call note templates, how to take notes, CRM workflows after calls | Practical, template-heavy. Agents want copy-paste formats. Use `<ScriptExample>` for note templates. |
| `mindset` | Struggle and Emotional | I hate calling, why leads ghost, how to recover a bad call, how to not freeze | Empathetic, reframing, human. Less script-heavy. More about technique and mental model than copy-paste language. |
| `real-estate` | Data and Authority | Call statistics studies, AI coaching results, what separates top agents | Data-driven, research-backed. Longer word count. Requires original analysis or a unique synthesis of existing data. |

### Current Standalone Posts Planned (for cross-linking reference)

**CRM and Notes:** real-estate-call-notes-template, how-to-take-notes-during-calls, crm-note-examples-real-estate, how-to-stay-organized-with-leads, what-to-write-in-crm-after-call, day-in-the-life-agent-using-ai-coaching

**Struggle and Emotional:** i-hate-cold-calling, why-leads-ghost-after-calls, how-to-recover-a-bad-call, how-to-not-freeze-on-calls, how-to-not-sound-salesy, how-to-think-on-your-feet-sales

**Data and Authority:** real-estate-call-data-study, ai-coaching-results-study, what-separates-top-agents-calls

---

## PHASE 1: RESEARCH (Do This First)

Before writing a single word, complete the Script Book check, internal content review, AND competitive research. Standalone posts have no parent pillar, so the internal review focuses on related content across the whole site.

### Step 1: Check the Ultimate Script Book for Relevant Sections

Standalone posts are off-cluster, so Script Book relevance varies by topic. Check first, then incorporate only what genuinely fits. The Script Book lives at `docs/content/Ultimate Script Book (1).md`.

**Category-level mapping:**

| Category | Likely Relevance | Where to Look |
|---|---|---|
| `crm-notes` | Partial. Script Book has no dedicated note-taking section, but principles like "Keep the Calls Moving" (line 222), LPMAMA discovery fields (lines 516-630), and post-call next-step language from Book the Meeting (line 29) inform what good CRM notes capture. | Use MENTALITY principles (lines 27-230) as background. Pull language patterns around "what to capture after a call" from LPMAMA and the various call-script sections. |
| `mindset` | Strong. The Script Book's "Why Most Agents Will Not Do This" mindset (line 496), "Urgency Creates Action" (line 181), "The Real Shift" (line 496), and the general "coaching tone" throughout directly inform mindset posts. | Read MENTALITY (lines 27-230) and the 10 Days of Pain mindset sections (lines 496-514) in full. These are the voice of mindset posts. |
| `real-estate` (data/authority) | Gap. The Script Book is not a data source. Use it for voice and Sayso's perspective on what the data means, but competitor research and original analysis drive the content. | Read TLDR/Purpose (line 1) and MENTALITY principles for voice only. Do not force frameworks where they do not fit the topic. |

**Rules:**
- Check the Script Book's table of contents (grep for `^#[# ]` headings) before writing. If a section applies to the topic, read it.
- Standalone posts do not need to draw from the Script Book as heavily as pillars or supporting posts. Use it when the topic aligns, skip it when it does not.
- Mindset posts should sound like they were written by someone who has actually coached agents through this. Script Book language is the shortcut to that voice.
- If nothing in the Script Book applies, note that in your brief and proceed without it.

### Step 2: Read Related Existing Site Content

Standalone posts do not link up to a pillar, but they should reference relevant existing content. Identify 3 to 5 candidates:

- **Existing blog posts** in `content/blog/` that touch on adjacent topics. Read their H2 structure and key angles so your post complements rather than duplicates them.
- **Pillar posts from related clusters.** For example, a CRM/Notes post may link to the cold-calling pillar or the conversation-skills pillar. A Mindset post may link to the cold-calling pillar. Read the pillar briefly to understand its angle.
- **Other standalone posts** in the same category group (see the "Current Standalone Posts Planned" list above). Your post should avoid overlapping with siblings.

### Step 3: Search the Target Keyword

- Run a web search for the exact target keyword
- Run a second search appending "2025" or "2026" to catch recent content

### Step 4: Analyze the Top 5 Ranking Pages

- Fetch and read the top 5 organic results (skip ads, forums, and YouTube)
- For each page, extract:
  - **Title and H1**
  - **H2/H3 heading structure** (the outline)
  - **Key scripts, frameworks, or data points** they include
  - **Unique angles or insights** they offer
  - **Word count estimate** (short/medium/long)

### Step 5: Identify "People Also Ask" and Related Searches

- From the search results, note any "People Also Ask" questions Google surfaces
- Note related search suggestions
- These feed directly into the FAQ section and may reveal angles competitors miss

### Step 6: Build a Competitive Brief

After researching, compile a brief (for your own reference, do NOT include this in the final output) with:

1. **What related site content already covers** - so this post complements rather than duplicates it
2. **Sibling standalone posts' angles** - so you avoid overlap within the same category group
3. **Common topics every competitor covers** - table stakes your post must hit
4. **Content gaps** - angles or techniques fewer than 2 of the top 5 cover. These are your Information Gain opportunities
5. **Overused patterns to avoid** - generic advice or cliche framing that appears in 4+ results
6. **Best content found** - use as a quality benchmark, then write original material that is equally specific or better. Do NOT copy
7. **PAA questions** - "People Also Ask" questions to target in the FAQ section
8. **Keyword variations** - semantic variations found across competitor content to weave into headings and body

### Research Rules

- Spend the research phase reading and analyzing. Do NOT start writing until the brief is complete
- If a competitor page is behind a paywall or fails to load, skip it and move to the next result
- Focus on extracting structure and angles, not copying content
- The goal is to understand what exists so this post is **genuinely different and more useful**

---

## PHASE 2: WRITE THE POST

Using the competitive brief from Phase 1, write the complete standalone post following every rule below. The brief should inform:
- Which H2 topics to include (cover table-stakes topics + at least 1 gap topic)
- What Information Gain elements to emphasize (angles competitors miss)
- Which FAQ questions to target (prioritize PAA questions)
- What keyword variations to weave into headings

---

## CONTEXT: What You're Writing For

**Product:** Sayso (asksayso.com) is an AI-powered real-time coaching tool for real estate agents and ISAs. During live phone calls, Sayso displays on-screen prompts telling agents what to say, how to handle objections, and when to ask for the appointment. It also auto-generates call notes and syncs them to CRMs (Follow Up Boss, Sierra Interactive, KVCore).

**What makes Sayso different from competitors:**
- **Shilo AI** focuses on post-call grading and analysis. Reviews calls after they happen. Does not help the agent during the actual call.
- **MaverickRE** is a broader platform (lead routing, accountability, reporting) with AI role-play for practice. Agents train with simulated calls, but the AI is not there during real calls.
- **Sayso's edge** is real-time, live-call coaching. The AI is listening and suggesting during the conversation, not reviewing it after.

**Target audience:** Real estate agents (solo and team), ISAs, team leaders, and brokerage managers in the US. They make 20 to 100+ calls per day. Practical, time-pressed, skeptical of tools that do not immediately help them book more appointments. Sayso helps with both buyer and seller prospecting, so all content must stay lead-type agnostic unless the topic is explicitly seller-only (e.g., FSBO) or buyer-only.

**Writing rules (non-negotiable, from CLAUDE.md):**
- Brand name is always "Sayso" - never "SaySo", "SAYSO", "Say So", or "say so"
- Never use em dashes. Use commas, colons, periods, or rephrase
- Never use "run/running" when talking about phone calls. Use "make calls", "dial", "get on the phone"
- Avoid "cold call(s)" as a noun. Use "call(s)" unless the topic is specifically cold calling as a concept
- Never say "phone call(s)". Use "call(s)"
- Never refer to real estate agents as "reps" or "representatives". Only "agents" or "real estate agents"
- Never refer to clients or prospects as "deals". Use "prospect", "lead", "client", or "appointment"
- Never say "close a deal" or "win/lose deals". Agents "book appointments" and turn prospects into clients
- Never use short punchy fragmented "tagline" sentences like "Not pressure. Not pitch. Just value." Write full natural sentences
- Never use "Not X. Not Y. Just Z." sentence structures. Rewrite affirmatively

---

## OUTPUT FORMAT

### Frontmatter

```yaml
---
title: "[H1 - must contain target keyword, parenthetical benefit optional]"
description: "[Meta description - 150-160 chars, contains keyword, specific value + CTA]"
slug: "[url-slug-with-keyword]"
type: "standalone"
category: "[category from input]"
tags: ["[3-5 relevant tags]"]
author:
  name: "Sayso Team"
  role: "Team"
  avatar: "/logo-sayso.png"
publishedAt: "2099-01-01"
featured: false
coverImage: "/blog/covers/[slug].jpg"
---
```

**Important:** Set `publishedAt` to `"2099-01-01"` (placeholder). Real publish dates are assigned after team review per [docs/reference/blog-publishing-plan.md](../../docs/reference/blog-publishing-plan.md). Do NOT put today's date or a guess at a real publish date in the frontmatter.

**Do NOT include:** `cluster` or `pillar` fields. Standalone posts have neither.

### Body Content

Standard markdown. The following custom MDX components are available, use them where appropriate:

**`<CalloutBox type="tip|warning|key-takeaway">`** for tips, warnings, or key insights
```mdx
<CalloutBox type="tip">
Write notes in the lead's own words whenever possible. "Wife needs 4th bedroom before 2027 school year" is more useful on follow-up than "family needs more space."
</CalloutBox>
```

**`<ScriptExample label="[context]">`** for formatted scripts, templates, or structured examples
```mdx
<ScriptExample label="Post-Call CRM Note Template">
Lead: [Name] | Date: [YYYY-MM-DD] | Duration: [min]
Situation: [buyer/seller, timeline, urgency]
What they said: [direct quote that reveals motivation]
Next step: [specific action + date]
</ScriptExample>
```

Component use by category:
- **crm-notes posts:** at least 2 `<ScriptExample>` components (templates, note formats)
- **mindset posts:** at least 1 `<ScriptExample>` component (the post still needs something actionable) plus at least 2 `<CalloutBox>` components for reframes or tips
- **data-authority posts:** at least 1 `<ScriptExample>` if relevant (e.g., showing what a top agent's opener sounds like) plus at least 2 `<CalloutBox>` components for key findings

---

## SEO RULES

### Keyword Placement (Non-Negotiable)

1. **H1:** Contains the exact target keyword. For mindset posts, a parenthetical benefit helps CTR (e.g., "I Hate Cold Calling in Real Estate (and How to Make It Suck Less)"). For crm-notes and data-authority, the keyword alone often works.
2. **First 100 words:** Exact target keyword in sentence 1 or 2.
3. **Meta title:** `[Target Keyword] | Sayso` or `[Target Keyword]: [Specific Value] | Sayso`. Max 60 characters.
4. **Meta description:** 150-160 characters. Contains keyword. Format: "[Keyword context]. [Specific value this post delivers]. [CTA]."
5. **URL slug:** Keyword in slug, lowercase, hyphens.
6. **First H2:** Contains the keyword or a strong semantic variation.
7. **Image alt text:** Describe image + include keyword variation naturally.

### Keyword Density

- **Exact keyword:** 4 to 7 times across the full page.
- **Semantic variations:** 8 to 12 times. Synonyms, related phrases, rephrased versions.
- **Never stuff.** If it sounds forced, use a variation.

### Heading Structure

- **One H1 only.**
- **4 to 6 H2s.** Standalone posts sit between supporting (3 to 5) and pillar (5 to 8) in depth.
- **H3s** for subsections when needed.
- **Never skip levels.**
- At least one H2 should contain a semantic variation of the keyword.

### Word Count

- **crm-notes and mindset posts:** 1,500 to 2,200 words
- **data-authority posts:** 2,000 to 3,000 words (these need to present and analyze data, which takes more space)

If the topic genuinely requires more depth, data-authority posts can stretch to 3,500 words. crm-notes and mindset should stay under 2,500.

---

## E-E-A-T & INFORMATION GAIN REQUIREMENTS

Google's March 2026 core update rewards first-hand experience and penalizes generic content. Standalone posts are especially vulnerable because they often target practical or emotional queries where generic AI content floods the results. Your post must stand out.

### Experience Markers (Include at Least 3)

- **Specific scenario descriptions.** Not "keeping notes is important" but "You just hung up with a lead who said her listing expired in March because their agent never called them back. Three weeks from now, when you open the CRM, what do you need to see to pick up where you left off?"
- **Real numbers and specifics.** "The average agent spends 4 minutes writing call notes. Top performers spend 90 seconds and capture 3x the information."
- **Process descriptions.** Walk through what actually happens, step by step. Not abstract advice.
- **Common mistakes with specific consequences.** "If you write 'called seller, nice conversation' you have no idea who to call back first in a week. The note is useless."
- **Tool and workflow context.** Reference how agents actually work: dialing from Follow Up Boss, tabbing between a CRM and a script doc, trying to type notes with a phone on speaker.
- **For mindset posts specifically:** name the feeling directly (dread, freezing, spiraling after a bad call) rather than dancing around it. Agents reading these posts want to feel understood, not lectured.

### Information Gain (What Makes This Post Different)

Your post must offer at least ONE thing that a reader cannot find in the top 5 existing results for this keyword:

- A framework or mental model for the topic (e.g., "The 3-Line Note: the only three lines you need in every CRM entry")
- A counter-intuitive insight backed by reasoning (e.g., "Don't fill in every field in your CRM. Fill in 3. More fields = less read on follow-up.")
- A specific technique that other posts on this topic miss
- A synthesis or taxonomy that organizes the advice differently than competitors

### What to AVOID (Google Penalizes This)

- Generic advice that could apply to any industry ("staying organized is important")
- Restating what is already in the top search results without adding anything new
- Filler sentences that do not teach, persuade, or link
- Overly formal or academic tone. Agents want coach-talk
- Opening with "In today's competitive real estate market..." or any similar throat-clearing
- For mindset posts: toxic positivity ("just believe in yourself!"), platitudes, or "mindset reset" language without concrete techniques

---

## CONTENT STRUCTURE (Follow This Framework)

### 1. H1: [Keyword-Driven Title]

Good examples by category:

**crm-notes:**
- `Real Estate Call Notes Template (Copy-Paste Ready for Any CRM)`
- `What to Write in Your CRM After Every Real Estate Call`

**mindset:**
- `I Hate Cold Calling in Real Estate (and How to Make It Suck Less)`
- `How to Recover from a Bad Real Estate Sales Call (Fast)`

**data-authority:**
- `Real Estate Call Statistics: What 10,000 Calls Taught Us About Booking Appointments`
- `What Separates Top Real Estate Agents on Calls (Data-Backed Analysis)`

Bad examples:
- `Tips for Taking Notes` (too vague, no keyword)
- `Everything About Real Estate Call Notes You Need to Know` (wordy, keyword buried)

### 2. Opening Paragraph (2 to 4 Sentences)

Rules:
- State the specific problem or question this post addresses. One sentence. Direct.
- Include the exact keyword in sentence 1 or 2.
- Signal what the reader will get: a template, a framework, a reframe, a data point.
- **No fluff.** No backstory. No throat-clearing.

Example for a crm-notes post:
> A real estate call notes template saves you from the worst feeling in the business: opening a CRM entry from 3 weeks ago and having no idea what the lead actually said or what you promised. This post gives you a copy-paste template, three variations for different call types, and the one field most agents get wrong.

Example for a mindset post:
> If you hate cold calling in real estate, you are not alone, and you are not broken. The agents who make 100 calls a day are not doing it because they love it. They have a system that makes the dread survivable, and a few tricks for the moments when it actually gets easier. Here is what works.

### 3. H2 Sections (4 to 6 Sections)

Each H2 covers a distinct aspect of the topic. Rules:

- **Be actionable and specific.** Use examples, scripts, templates, or scenarios. Not theory.
- **Each H2 should teach one distinct thing.** If two H2s could be merged without losing anything, merge them.
- **Keep each section to 300 to 450 words.** Standalone posts go deep but stay focused.
- **Use `<ScriptExample>` at least 1 to 2 times** (more for crm-notes, fewer for mindset).
- **Use `<CalloutBox>` at least 2 times** across the post.

### 4. H2: How Sayso Helps (Or Equivalent Product Tie-In)

The product tie-in varies by category:

- **crm-notes posts:** direct fit. "Sayso auto-generates call notes in real time while you're on the phone, so you never have to retype what the lead said. It syncs straight to Follow Up Boss, Sierra, or KVCore." Link to `/products/smart-capture/`.
- **mindset posts:** subtle fit. The product tie-in should feel like relief, not a pitch. Example: "The hardest part of calling is the second of silence before you speak. Sayso removes that second by putting the next line on your screen before you need it." Link to `/products/cue/` or `/demo/`.
- **data-authority posts:** authority fit. The product angle is credibility-based. Example: "The data in this post comes from analyzing calls across Sayso's agent network in 2026." Link to `/demo/` or `/case-studies/`.

In all cases:
- 3 to 5 sentences maximum. Standalone posts are not product brochures.
- Be specific about what Sayso does, not "Sayso helps with calls" but "Sayso auto-fills the lead's name, address, and key concerns into your call note so you just approve and save."
- CTA: link to `/demo/` or a relevant feature page.

### 5. H2: FAQ (Recommended)

3 to 5 questions and answers. Rules:

- Target long-tail keyword variations that did not fit in the main body.
- First question should be a rephrasing of the H1 keyword as a question.
- Include at least one "how long" or "how often" question (these get featured snippets).
- Keep answers to 2 to 4 sentences each.
- These feed the auto-generated FAQPage schema.

---

## INTERNAL LINKING RULES

Standalone posts have no parent pillar, so their linking pattern differs from supporting posts. The goal is to weave the post into the broader site structure without a pillar anchor.

### Required Links

1. **Link to 1 to 2 related cluster pillars** from other clusters. Example: a CRM/Notes post about call notes might link to the cold-calling pillar (`/blog/real-estate-cold-calling-guide/`) and the conversation-skills pillar (`/blog/real-estate-conversation-guide/`). Use the pillar's target keyword as anchor text.

2. **Link to 2 to 3 other standalone posts or supporting posts** in related topic areas. Link to them even if they do not exist yet. The broken link checker will track missing ones, and links activate when posts publish.

3. **Link to 1 to 2 objection pages** if the topic involves calls (most do). Example: `/objections/not-interested/`, `/objections/call-me-later/`.

4. **Link to 1 feature page** that fits the post's topic. Map by category:
   - crm-notes posts → `/products/smart-capture/`
   - mindset posts → `/products/cue/` (real-time prompts help with freezing and not knowing what to say)
   - data-authority posts → `/products/pulse/` (data-driven feature) or `/compare/sayso-vs-shilo/`

5. **Link to 1 glossary page** if an industry term appears that has a glossary entry. Example: first mention of "ISA" goes to `/glossary/isa-real-estate/`.

6. **Link to 1 persona page** if the post speaks to a specific role (e.g., ISAs, new agents). Example: `/for/new-agents/` for posts about mindset and skill-building.

### Total: 6 to 10 internal links per post.

### Anchor Text Rules

- **Always descriptive.** Never "click here" or "read more."
- Use the target keyword of the destination page as the anchor text.
- Make links feel natural within the sentence. If you have to restructure the sentence to fit the link, rewrite the sentence.

### What NOT to Include

- Do NOT include a "pillar uplink" section. Standalone posts have no pillar.
- Do NOT link to every post on the site. 6 to 10 links is the target. Quality over quantity.

---

## CTA PLACEMENT

Standalone posts get 2 CTAs:

1. **Product section CTA (in the "How Sayso Helps" H2):** Primary CTA linking to `/demo/` or a feature page.
2. **End-of-post CTA (after the FAQ):** Standalone call to action. One sentence. Example for a CRM post: "Stop retyping what the lead just told you. See how Sayso auto-captures every call. [Book a demo](/demo/)."

Do NOT put a CTA before delivering real value. The reader must get at least one useful technique, template, or insight before seeing any product mention.

For mindset posts specifically: keep CTAs extra light. A heavy sales pitch in a post about struggling on calls feels tone-deaf. The product is part of the solution, not the solution.

---

## FORMATTING RULES

- **Paragraphs:** Max 3 to 4 sentences. Agents read between calls on mobile.
- **Short sentences.** Vary length but lean short.
- **Tone by category:**
  - crm-notes: practical, efficient, template-focused. Like a senior colleague showing you their system.
  - mindset: empathetic, direct, anti-platitude. Like a coach who has been in the seat and knows the feeling. Never toxic-positive.
  - data-authority: confident, analytical, specific. Like a research director walking through findings. Use numbers precisely.
- **Banned phrases:** "In today's competitive market," "It's no secret that," "As a real estate professional," "In the ever-evolving world of," "Let's dive in," "Without further ado," "At the end of the day." Any sentence that could be deleted without losing information should be deleted.
- **Bold sparingly.** Only for key terms or phrases a scanner's eye should catch.
- **No em dashes.** Use commas, colons, or periods.

---

## CONTENT DIFFERENTIATION BY CATEGORY

### crm-notes posts

- Include actual templates the reader can copy-paste today. Multiple variations where useful (e.g., "buyer intake," "seller follow-up," "after a voicemail").
- Cover the workflow, not just the content. When do you write the note? How fast? What do you capture first vs. last?
- Tie back to Sayso's Smart Capture feature where natural, but the post must stand alone if Sayso did not exist.

### mindset posts

- Name the feeling honestly in the first 2 paragraphs. Readers who hate calling or freeze on calls have had dozens of "mindset" articles lecture them. Do not lecture.
- Offer 2 to 3 concrete techniques, not a 10-item list of tips. Depth beats volume here.
- Include at least one reframe (e.g., "you are not 'bothering' them, you are offering a service for a decision they are already making").
- Do not promise the feeling will go away. Promise it will get more manageable with specific techniques.

### data-authority posts

- Lead with the finding, not the methodology. "The average agent asks for the appointment 1.3 times per call. Top agents ask 3.8 times." Then explain the data.
- Use original numbers where available. If citing external data, cite the insight (not the source URL) naturally in prose.
- Include at least one chart or data table (as markdown, the template renders it with proper styling).
- Longer than other standalones. 2,000 to 3,000 words is normal. Reader is coming for depth.

---

## WHAT THE TEMPLATE HANDLES AUTOMATICALLY

Do NOT include these in your content, the blog template generates them:

- Schema markup (BlogPosting + FAQPage)
- Canonical URL with trailing slash
- Mid-page CTA (auto-injected at content midpoint)
- Newsletter CTA (auto-injected at bottom)
- Breadcrumbs showing: Blog > [Category] > [Post Title]
- Reading time
- Open Graph / Twitter meta tags

**NOT shown for standalone posts** (these are pillar/supporting features only):
- Early CTA banner (pillar only)
- Cluster navigation sidebar (pillar only)
- "More in This Series" cluster section (supporting only)
- Pillar uplink banner (supporting only)

Your job is the content, the heading structure, the internal links within the prose, and the frontmatter. Everything else is handled.

---

## QUALITY CHECKLIST (Self-Audit Before Output)

Before finalizing, verify:

- [ ] Ultimate Script Book was checked for topic-relevant sections (even if none applied)
- [ ] For mindset-category posts, MENTALITY principles informed the voice
- [ ] Competitive research was completed (top 5 pages analyzed, PAA questions collected)
- [ ] Related site content was reviewed for overlap or linking opportunities
- [ ] At least 1 content gap from research is addressed in the post
- [ ] FAQ includes at least 1 question sourced from PAA or related searches
- [ ] H1 contains the exact target keyword
- [ ] First 100 words contain the exact target keyword
- [ ] Meta title is under 60 characters and keyword-first
- [ ] Meta description is 150-160 characters with keyword + value + CTA
- [ ] 4 to 6 H2s, no skipped heading levels
- [ ] ScriptExample and CalloutBox counts match the category's requirements
- [ ] At least 3 E-E-A-T experience markers (specific scenarios, real numbers, process descriptions)
- [ ] At least 1 Information Gain element (verified against actual competitor content)
- [ ] 6 to 10 internal links with descriptive anchor text
- [ ] Links to 1 to 2 related cluster pillars
- [ ] 2 CTAs (product section + end-of-post)
- [ ] Word count is in the correct range for the category
- [ ] No banned filler phrases
- [ ] No em dashes
- [ ] No generic advice, every tip is specific to real estate calling
- [ ] Brand name is "Sayso" everywhere, never "SaySo"
- [ ] Content stays lead-type agnostic unless the topic is explicitly buyer-only or seller-only
- [ ] No "deals", "close a deal", "phone call(s)", "cold calls" (as noun), or "reps" language
- [ ] No "Not X. Not Y. Just Z." tagline structures
- [ ] Frontmatter includes type: "standalone", category, NO cluster, NO pillar fields
- [ ] `publishedAt` is set to "2099-01-01" (placeholder, real dates assigned after review)
- [ ] Tone matches the category (practical for crm-notes, empathetic for mindset, analytical for data-authority)
