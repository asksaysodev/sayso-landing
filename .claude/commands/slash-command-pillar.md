# /pillar Slash Command — Production Prompt

**Usage:** `/pillar "[target keyword]"`
**Example:** `/pillar "real estate cold call scripts"`

When this command is invoked, follow the two-phase process below. **Phase 1** researches the competitive landscape. **Phase 2** writes the post using that research. The final output must be a single `.mdx` file with YAML frontmatter + markdown body that can be dropped directly into `content/blog/` with zero manual reformatting.

---

## PHASE 1: COMPETITIVE RESEARCH (Do This First)

Before writing a single word, research the target keyword. Use the WebSearch and WebFetch tools to complete the following steps:

### Step 1: Search the Target Keyword
- Run a web search for the exact target keyword (e.g., `real estate cold call scripts`)
- Run a second search appending "2025" or "2026" to catch recent content

### Step 2: Analyze the Top 5 Ranking Pages
- Fetch and read the top 5 organic results (skip ads, forums, and YouTube)
- For each page, extract:
  - **Title and H1**
  - **H2/H3 heading structure** (the outline)
  - **Key scripts or frameworks** they include
  - **Statistics or data points** they cite
  - **Unique angles or insights** they offer
  - **Word count estimate** (short/medium/long)

### Step 3: Identify "People Also Ask" and Related Searches
- From the search results, note any "People Also Ask" questions Google surfaces
- Note related search suggestions at the bottom of results
- These feed directly into the FAQ section and may reveal H2 topics competitors miss

### Step 4: Build a Competitive Brief
After researching, compile a brief (for your own reference — do NOT include this in the final output) with:

1. **Common topics every competitor covers** — these are table stakes; the post must cover them too
2. **Content gaps** — topics, angles, or script types that fewer than 2 of the top 5 cover. These are opportunities for Information Gain
3. **Overused patterns to avoid** — generic advice, cliché openings, or frameworks that appear in 4+ results. Do not repeat these without adding a new angle
4. **Best scripts found** — specific language from competitors that is strong. Do NOT copy these. Use them as a quality benchmark, then write original scripts that are equally specific or better
5. **Data points worth referencing** — statistics, percentages, or benchmarks from credible sources. Cite the insight (not the source URL) naturally in prose
6. **PAA questions** — "People Also Ask" questions to target in the FAQ section
7. **Keyword variations** — semantic keyword variations found across competitor content that should be woven into headings and body text

### Research Rules
- Spend the research phase reading and analyzing. Do NOT start writing the post until the brief is complete
- If a competitor page is behind a paywall or fails to load, skip it and move to the next result
- Focus on extracting structure and angles, not copying content
- The goal is to understand what exists so the post can be **genuinely different and more useful**

---

## PHASE 2: WRITE THE POST

Using the competitive brief from Phase 1, write the complete pillar post following every rule below. The brief should inform:
- Which H2 topics to include (cover the table-stakes topics + at least 1 gap topic)
- What Information Gain elements to emphasize (angles competitors miss)
- Which FAQ questions to target (prioritize PAA questions)
- What keyword variations to weave into headings
- What level of script specificity to match or exceed

---

## CONTEXT: What You're Writing For

**Product:** SaySo (asksayso.com) — an AI-powered real-time coaching tool for real estate agents and ISAs. During live phone calls, SaySo displays on-screen prompts telling agents what to say, how to handle objections, and when to ask for the appointment. It also auto-generates call notes and syncs them to CRMs (Follow Up Boss, Sierra Interactive, KVCore).

**What makes SaySo different from competitors:**
- **Shilo AI** — focuses on post-call grading and analysis. Reviews calls AFTER they happen. Good for team leaders who want reports, but doesn't help the agent during the actual call.
- **MaverickRE** — broader platform (lead routing, accountability, reporting) with AI role-play for practice. Agents train with simulated calls, but again, the AI isn't there during real calls.
- **SaySo's edge** — real-time, live-call coaching. The AI is listening and suggesting during the conversation, not reviewing it after. This is the key differentiator.

**Target audience:** Real estate agents (solo and team), ISAs (Inside Sales Agents), team leaders, and brokerage managers in the US. They make 20-100+ calls per day. They're practical, time-pressed, and skeptical of tools that don't immediately help them book more appointments.

---

## OUTPUT FORMAT

### Frontmatter

```yaml
---
title: "[H1 — must contain target keyword, signal comprehensiveness]"
description: "[Meta description — 150-160 chars, contains keyword, includes benefit + CTA]"
slug: "[url-slug-with-keyword]"
type: "pillar"
cluster: "[cluster-name-kebab-case]"
category: "[same as cluster]"
tags: ["[3-5 relevant tags]"]
author:
  name: "Sayso Team"
  role: "Team"
  avatar: "/logo-sayso.png"
publishedAt: "[today's date YYYY-MM-DD]"
featured: false
coverImage: "/blog/covers/[slug].jpg"
---
```

Cluster reference — use the correct cluster name:
| Cluster | Slug |
|---|---|
| Cold Calling | `cold-calling` |
| Appointment Setting | `appointment-setting` |
| Conversation Skills | `conversation-skills` |
| Follow-Up | `follow-up` |

### Body Content

Standard markdown. The following custom MDX components are available (use them — they make content more engaging and scannable):

**`<CalloutBox type="tip|warning|key-takeaway">`** — for tips, warnings, or key insights
```mdx
<CalloutBox type="tip">
Always lead with a question, not a pitch. The first 10 seconds determine whether the lead stays on the line.
</CalloutBox>
```

**`<ScriptExample label="[context]">`** — for formatted phone scripts agents can reference
```mdx
<ScriptExample label="Expired Listing Opener">
Hi [Name], this is [Your Name] with [Brokerage]. I noticed your home on [Street] — are you still looking to sell, or has that situation changed?
</ScriptExample>
```

Use `<ScriptExample>` at least 3 times in a pillar post. Agents come to these pages for scripts — give them what they came for.

---

## SEO RULES

### Keyword Placement (Non-Negotiable)
1. **H1:** Contains the exact target keyword. Front-load it. Signal comprehensiveness (e.g., "The Complete Guide," "Everything You Need to Know").
2. **First 100 words:** Exact target keyword in sentence 1 or 2.
3. **Meta title:** `[Target Keyword]: [Benefit or Scope] | SaySo` — max 60 characters.
4. **Meta description:** 150-160 characters. Contains keyword. Format: "[Keyword context]. [What this guide covers]. [CTA]."
5. **URL slug:** Keyword in slug, lowercase, hyphens.
6. **First H2:** Contains the keyword or a strong semantic variation.
7. **Image alt text:** Describe image + include keyword variation naturally.

### Keyword Density
- **Exact keyword:** 5-8 times across the full page.
- **Semantic variations:** 10-15 times. Include sub-topics that supporting posts cover.
- **Never stuff.** Every instance must read naturally. If you have to force it, use a variation instead.

### Heading Structure
- **One H1 only.**
- **5-8 H2s.** Each H2 covers a major sub-topic.
- **H3s** for subsections within H2s. Use liberally — pillar posts need granular structure.
- **Never skip levels** (no H1 → H3 without H2).
- Multiple H2s should contain semantic keyword variations (not the exact keyword repeated).
- Every H2 should be scannable — a reader skimming headings alone should understand what the page covers.

### Word Count
- **2,500-3,500 words.** Enough to be comprehensive without padding.
- If you find yourself adding filler to hit word count, stop — the content should earn its length.
- If you find yourself cutting essential content to stay under, go to 4,000. Completeness beats brevity for pillar posts.

---

## E-E-A-T & INFORMATION GAIN REQUIREMENTS

**This section is critical.** Google's March 2026 core update elevated Experience as the primary ranking signal. Generic AI content that restates existing knowledge is being penalized. Your pillar post MUST include elements that demonstrate first-hand experience and add genuinely new information to the search results.

### Experience Markers (Include at Least 3)
- **Specific scenario descriptions** — not "agents struggle with objections" but "when a lead says 'I already have an agent' 45 seconds into a cold call, most agents say 'oh, okay' and hang up. Here's what to say instead."
- **Real numbers and specifics** — "The average cold call lasts 47 seconds. The ones that book appointments last 3-4 minutes. The difference is what happens in the first 10 seconds."
- **Process descriptions** — walk through what actually happens on a call step by step, not abstract advice.
- **Common mistakes with specific consequences** — "If you lead with 'I was just calling to see if...' you've already lost. That opening signals uncertainty, and the lead will mirror it."
- **Tool/workflow context** — reference how agents actually work: dialing from Follow Up Boss, working through a call list, toggling between CRM and scripts on screen.

### Information Gain (What Makes This Post Different)
Your post must offer at least ONE thing that a reader cannot find in the top 5 existing results for this keyword:
- A framework or mental model for the topic (e.g., "The 3-Phase Cold Call Structure: Open, Qualify, Close")
- A counter-intuitive insight backed by reasoning (e.g., "Don't ask 'is now a good time?' — it gives them an exit. Ask 'do you have a quick minute?' instead. The word 'quick' implies brevity and lowers resistance.")
- A comparison or taxonomy that organizes the topic differently than competitors (e.g., organizing scripts by lead temperature rather than lead type)
- Specific script language that competitors' posts don't include

### What to AVOID (Google Penalizes This)
- Generic advice that could apply to any industry ("building rapport is important")
- Restating what's already in the top search results without adding anything new
- Filler sentences that don't teach, persuade, or link
- Overly formal or academic tone — agents want coach-talk, not textbook language
- Opening with "In today's competitive real estate market..." or any similar throat-clearing

---

## CONTENT STRUCTURE (Follow This Framework)

### 1. H1: [Keyword-Driven Title — Definitive and Specific]

Good examples:
- `Real Estate Cold Call Scripts: The Complete Guide for 2026`
- `How to Book More Real Estate Appointments: Scripts, Strategies, and Systems`

Bad examples:
- `Cold Calling Tips for Real Estate` (too vague, doesn't signal depth)
- `Everything About Real Estate Cold Calling You Need to Know` (wordy, keyword buried)

### 2. Opening Section (No H2 — Directly Under H1)

3-5 sentences. Rules:
- Exact keyword in sentence 1 or 2
- State what this guide covers and who it's for
- Include a "what you'll learn" signal so the reader knows this is worth scrolling
- **No fluff.** Open with the problem or the promise, not background context
- End with a subtle product mention if natural: "These are the scripts we built SaySo's real-time coaching around."

### 3. H2 Sections — The Core Content (5-8 Sections)

Each H2 covers a major sub-topic. Each section is essentially a **preview** of what a supporting post covers in full depth. Rules:

- **Give real value in each section** — don't just tease the supporting post. Include a usable script, a specific technique, or an actionable tip. The pillar should stand on its own even if no supporting posts existed.
- **Link DOWN to the corresponding supporting post** with descriptive anchor text: "For the complete expired listing script library, see our [expired listing scripts guide](/blog/expired-listing-scripts/)."
- **Use `<ScriptExample>` in at least 3 H2 sections.** Agents are scanning for copy-paste scripts.
- **Use `<CalloutBox>` in at least 2 H2 sections.** Highlight tips or common mistakes.
- **Keep each H2 section to 300-500 words.** Deep enough to be useful, shallow enough that the supporting post has room to go deeper.

### 4. H2: Key Takeaways

A synthesis section tying everything together. Options:
- Numbered list of the top 5-7 principles from the guide
- "What separates good [topic] from great [topic]"
- A framework summary

### 5. H2: How SaySo Helps

Product tie-in section. Rules:
- 4-6 sentences maximum
- Connect the pillar topic directly to SaySo's real-time coaching: "Instead of memorizing all these scripts, SaySo feeds you the right words while you're on the call."
- Be specific about what SaySo does — not "SaySo helps with calls" but "When a lead says 'I'm not interested,' SaySo shows you a proven response on screen in under 2 seconds."
- CTA: Link to `/demo/`
- Do NOT make this a product brochure. One focused paragraph about the specific value, one CTA.

### 6. H2: FAQ

4-6 questions and answers. Rules:
- Target long-tail keyword variations that don't have their own supporting posts
- First question should be a rephrasing of the H1 keyword as a question
- Include at least one "how many" or "how often" question (these get featured snippets)
- Keep answers to 2-4 sentences each
- These feed the auto-generated FAQPage schema

---

## INTERNAL LINKING RULES

Pillar posts are the most link-dense pages on the site. Rules:

- **Link DOWN to every supporting post in the cluster.** This is the pillar's #1 SEO job. Each supporting post gets at least one link with descriptive anchor text (the supporting post's target keyword).
- **Link to 2-3 relevant objection pages** (e.g., `/objections/not-interested/`, `/objections/call-me-later/`)
- **Link to 1-2 feature pages** (e.g., `/features/real-time-coaching/`, `/features/objection-handling/`)
- **Link to 1 persona page** if relevant (e.g., `/for/new-agents/`)
- **Link to the glossary** when industry terms appear (e.g., first mention of "circle prospecting" → `/glossary/circle-prospecting/`)
- **Link to 1 comparison page** if naturally relevant (e.g., mentioning coaching software → `/compare/sayso-vs-shilo/`)
- **Total: 10-18 internal links.** This is significantly more than any other page type.
- **Anchor text must be descriptive.** Never "click here" or "read more." Use the target keyword of the destination page.
- **Link to supporting posts even if they don't exist yet.** The broken link checker will track what's missing, and the links activate automatically when posts are published.

Supporting posts in each cluster for reference:

**Cold Calling:** expired-listing-scripts, fsbo-scripts, circle-prospecting-scripts, buyer-lead-scripts, how-to-start-a-real-estate-call, appointment-setting-script, best-real-estate-call-coaching-software

**Appointment Setting:** how-to-close-for-appointment, how-many-times-ask-for-appointment, why-prospects-dont-commit, how-to-get-same-day-appointments

**Conversation Skills:** how-to-build-rapport-calls, how-to-qualify-leads-on-phone, questions-to-ask-real-estate-leads, how-to-guide-a-sales-conversation, how-to-keep-control-of-a-call, what-top-agents-say-on-calls, what-real-time-call-coaching-looks-like

**Follow-Up:** follow-up-scripts-cold-leads, how-often-follow-up-real-estate, how-to-revive-dead-leads, what-to-say-to-old-leads

---

## CTA PLACEMENT

Pillar posts get 3 CTAs because they're long enough to warrant it:

1. **Early CTA (after the first H2 section):** One-liner. Example: "SaySo coaches you through scripts like these in real time. [See how it works →](/demo/)"
2. **Product section CTA (in the "How SaySo Helps" H2):** The primary CTA linking to `/demo/`.
3. **End-of-post CTA (after the FAQ):** Standalone call to action. Example: "Stop memorizing scripts. Start winning calls. [Book a demo →](/demo/)"

---

## FORMATTING RULES

- **Paragraphs:** Max 3-4 sentences. Pillar posts can breathe slightly more than micro pages, but keep them scannable. Agents read between calls — on mobile, on the go.
- **Short sentences.** Vary length but lean short. Punch over polish.
- **Tone:** Authoritative but conversational. You're an experienced coach sharing everything you know over coffee — confident, direct, not academic.
- **Banned phrases:** "In today's competitive market," "It's no secret that," "As a real estate professional," "In the ever-evolving world of," "Let's dive in," "Without further ado." Any sentence that could be deleted without losing information should be deleted.
- **Use bold sparingly** — only for key terms or phrases a scanner's eye should catch. Not every other sentence.

---

## WHAT THE TEMPLATE HANDLES AUTOMATICALLY

Do NOT include these in your content — the blog template generates them:

- Schema markup (BlogPosting + FAQPage)
- Canonical URL with trailing slash
- Cluster navigation sidebar (auto-generated for pillar posts)
- Early CTA banner (auto-injected for pillar posts)
- Mid-page CTA (auto-injected at content midpoint)
- Newsletter CTA (auto-injected at bottom)
- "Posts in This Guide" cluster navigation section
- Breadcrumbs
- Reading time
- Open Graph / Twitter meta tags

Your job is the content, the heading structure, the internal links within the prose, and the frontmatter. Everything else is handled.

---

## QUALITY CHECKLIST (Self-Audit Before Output)

Before finalizing, verify:

- [ ] Competitive research was completed (top 5 pages analyzed, PAA questions collected)
- [ ] At least 1 content gap from research is addressed in the post
- [ ] FAQ includes at least 2 questions sourced from PAA or related searches
- [ ] H1 contains the exact target keyword
- [ ] First 100 words contain the exact target keyword
- [ ] Meta title is under 60 characters and keyword-first
- [ ] Meta description is 150-160 characters with keyword + benefit + CTA
- [ ] 5-8 H2s, no skipped heading levels
- [ ] At least 3 `<ScriptExample>` components
- [ ] At least 2 `<CalloutBox>` components
- [ ] At least 3 E-E-A-T experience markers (specific scenarios, real numbers, process descriptions)
- [ ] At least 1 Information Gain element (something not in the top 5 results)
- [ ] 10-18 internal links with descriptive anchor text
- [ ] Links DOWN to every supporting post in the cluster
- [ ] 3 CTAs (early, product section, end-of-post)
- [ ] Word count 2,500-3,500
- [ ] No banned filler phrases
- [ ] No generic advice that could apply to any industry
- [ ] Frontmatter includes type: "pillar", cluster, and no pillar field
- [ ] Tone is coach-like, not academic
