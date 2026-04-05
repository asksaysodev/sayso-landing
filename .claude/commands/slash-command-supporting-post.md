# /supporting-post Slash Command - Production Prompt

**Usage:** `/supporting-post "[target keyword]" cluster:[cluster-name]`
**Examples:**
- `/supporting-post "how to build rapport real estate calls" cluster:conversation-skills`
- `/supporting-post "expired listing scripts" cluster:cold-calling`
- `/supporting-post "how to revive dead leads real estate" cluster:follow-up`

When this command is invoked, follow the two-phase process below. **Phase 1** researches the competitive landscape and reads existing cluster content. **Phase 2** writes the post using that research. The final output must be a single `.mdx` file with YAML frontmatter + markdown body that can be dropped directly into `content/blog/` with zero manual reformatting.

### Input Parsing

From the command input, extract:
1. **Target keyword** - the quoted string (e.g., "how to build rapport real estate calls")
2. **Cluster** - the value after `cluster:` (e.g., `conversation-skills`)
3. **Pillar slug** - look up from the cluster reference table below. Every cluster has exactly one pillar.

If no cluster is provided, attempt to infer from the keyword using the cluster reference table. If ambiguous, ask the user before generating.

### Cluster Reference Table

| Cluster | Pillar Slug | Pillar Keyword |
|---|---|---|
| `cold-calling` | `real-estate-cold-calling-guide` | "real estate cold call scripts" |
| `appointment-setting` | `how-to-book-appointments-real-estate` | "how to book appointments real estate" |
| `conversation-skills` | `real-estate-conversation-guide` | "how to talk to real estate leads" |
| `follow-up` | `real-estate-follow-up-guide` | "real estate follow up scripts" |

### Supporting Posts Per Cluster

**Cold Calling:** expired-listing-scripts, fsbo-scripts, circle-prospecting-scripts, buyer-lead-scripts, how-to-start-a-real-estate-call, appointment-setting-script, best-real-estate-call-coaching-software

**Appointment Setting:** how-to-close-for-appointment, how-many-times-ask-for-appointment, why-prospects-dont-commit, how-to-get-same-day-appointments

**Conversation Skills:** how-to-build-rapport-calls, how-to-qualify-leads-on-phone, questions-to-ask-real-estate-leads, how-to-guide-a-sales-conversation, how-to-keep-control-of-a-call, what-top-agents-say-on-calls, what-real-time-call-coaching-looks-like

**Follow-Up:** follow-up-scripts-cold-leads, how-often-follow-up-real-estate, how-to-revive-dead-leads, what-to-say-to-old-leads

---

## PHASE 1: RESEARCH (Do This First)

Before writing a single word, complete both competitive research AND internal content review.

### Step 1: Read the Parent Pillar Post

- Read the pillar post for this cluster from `content/blog/[pillar-slug].mdx`
- Note exactly what the pillar says about this sub-topic: how many words, which scripts it includes, what angle it takes
- Your supporting post must go **significantly deeper** than the pillar's treatment - not repeat it. Knowing exactly what the pillar covers is the only way to guarantee differentiation

### Step 2: Read Sibling Supporting Posts

- Check `content/blog/` for any other supporting posts already published in this cluster
- Note their topics, angles, and scripts to avoid content overlap
- If a sibling post covers adjacent territory, find a way to link to it and differentiate from it

### Step 3: Search the Target Keyword

- Run a web search for the exact target keyword
- Run a second search appending "2025" or "2026" to catch recent content

### Step 4: Analyze the Top 5 Ranking Pages

- Fetch and read the top 5 organic results (skip ads, forums, and YouTube)
- For each page, extract:
  - **Title and H1**
  - **H2/H3 heading structure** (the outline)
  - **Key scripts or techniques** they include
  - **Unique angles or insights** they offer
  - **Word count estimate** (short/medium/long)

### Step 5: Identify "People Also Ask" and Related Searches

- From the search results, note any "People Also Ask" questions Google surfaces
- Note related search suggestions
- These feed directly into the FAQ section and may reveal angles competitors miss

### Step 6: Build a Competitive Brief

After researching, compile a brief (for your own reference - do NOT include this in the final output) with:

1. **What the pillar already covers** - so you don't repeat it
2. **What sibling posts already cover** - so you don't overlap
3. **Common topics every competitor covers** - table stakes your post must hit
4. **Content gaps** - angles or techniques fewer than 2 of the top 5 cover. These are your Information Gain opportunities
5. **Overused patterns to avoid** - generic advice or cliché framing that appears in 4+ results
6. **Best scripts found** - use as a quality benchmark, then write original scripts that are equally specific or better. Do NOT copy
7. **PAA questions** - "People Also Ask" questions to target in the FAQ section
8. **Keyword variations** - semantic variations found across competitor content to weave into headings and body

### Research Rules

- Spend the research phase reading and analyzing. Do NOT start writing until the brief is complete
- If a competitor page is behind a paywall or fails to load, skip it and move to the next result
- Focus on extracting structure and angles, not copying content
- The goal is to understand what exists - both on your own site and competitors' - so this post is **genuinely different and more useful**

---

## PHASE 2: WRITE THE POST

Using the competitive brief from Phase 1, write the complete supporting post following every rule below. The brief should inform:
- Which H2 topics to include (cover table-stakes topics + at least 1 gap topic)
- What Information Gain elements to emphasize (angles the pillar and competitors miss)
- Which FAQ questions to target (prioritize PAA questions)
- What keyword variations to weave into headings
- How to go deeper than the pillar's treatment without repeating it

---

## CONTEXT: What You're Writing For

**Product:** SaySo (asksayso.com) - an AI-powered real-time coaching tool for real estate agents and ISAs. During live phone calls, SaySo displays on-screen prompts telling agents what to say, how to handle objections, and when to ask for the appointment. It also auto-generates call notes and syncs them to CRMs (Follow Up Boss, Sierra Interactive, KVCore).

**What makes SaySo different from competitors:**
- **Shilo AI** - focuses on post-call grading and analysis. Reviews calls AFTER they happen. Doesn't help the agent during the actual call.
- **MaverickRE** - broader platform (lead routing, accountability, reporting) with AI role-play for practice. Agents train with simulated calls, but the AI isn't there during real calls.
- **SaySo's edge** - real-time, live-call coaching. The AI is listening and suggesting during the conversation, not reviewing it after.

**Target audience:** Real estate agents (solo and team), ISAs, team leaders, and brokerage managers in the US. They make 20-100+ calls per day. Practical, time-pressed, skeptical of tools that don't immediately help them book more appointments.

---

## OUTPUT FORMAT

### Frontmatter

```yaml
---
title: "[H1 - must contain target keyword, add parenthetical benefit for CTR]"
description: "[Meta description - 150-160 chars, contains keyword, specific value + CTA]"
slug: "[url-slug-with-keyword]"
type: "supporting"
cluster: "[cluster from input]"
pillar: "[pillar slug from cluster reference table]"
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

### Body Content

Standard markdown. The following custom MDX components are available - use them to make the content more scannable and actionable:

**`<CalloutBox type="tip|warning|key-takeaway">`** - for tips, warnings, or key insights
```mdx
<CalloutBox type="tip">
Don't ask "is now a good time?" - it gives them an exit. Ask "do you have a quick minute?" instead.
</CalloutBox>
```

**`<ScriptExample label="[context]">`** - for formatted phone scripts agents can reference
```mdx
<ScriptExample label="Rapport-Building Opener">
Hey [Name], this is [Your Name]. Before I jump into why I'm calling - I saw you're in [Neighborhood]. How's that area been lately?
</ScriptExample>
```

Use `<ScriptExample>` at least 2 times in a supporting post. These posts need to give agents something they can use immediately.

---

## SEO RULES

### Keyword Placement (Non-Negotiable)
1. **H1:** Contains the exact target keyword. Add a parenthetical benefit or objection-buster for CTR (e.g., "How to Build Rapport on Real Estate Calls (Without Sounding Fake)").
2. **First 100 words:** Exact target keyword in sentence 1 or 2.
3. **Meta title:** `[Target Keyword] | SaySo` - max 60 characters.
4. **Meta description:** 150-160 characters. Contains keyword. Format: "[Keyword context]. [Specific value this post delivers]. [CTA]."
5. **URL slug:** Keyword in slug, lowercase, hyphens.
6. **First H2:** Contains the keyword or a strong semantic variation.
7. **Image alt text:** Describe image + include keyword variation naturally.

### Keyword Density
- **Exact keyword:** 3-6 times across the full page.
- **Semantic variations:** 6-10 times. Keep these natural - synonyms, related phrases, rephrased versions of the keyword.
- **Never stuff.** If it sounds forced, use a variation.

### Heading Structure
- **One H1 only.**
- **3-5 H2s.** Supporting posts are focused - they don't need as many sections as pillars.
- **H3s** for subsections when needed.
- **Never skip levels.**
- At least one H2 should contain a semantic variation of the keyword.

### Word Count
- **1,200-1,800 words.** More focused than pillar posts, more substantial than objection or glossary pages.
- Supporting posts go deep on ONE specific sub-topic. If you find yourself covering 5 different things, you're writing a pillar post.
- If the topic genuinely requires more depth, stretch to 2,000 - but that's the ceiling.

---

## E-E-A-T & INFORMATION GAIN REQUIREMENTS

Google's March 2026 core update rewards first-hand experience and penalizes generic content. Supporting posts are especially vulnerable because they target specific, often how-to queries where Google can easily compare your answer against competitors. Your post must stand out.

### Experience Markers (Include at Least 2)
- **Walk through a specific scenario step by step** - not "you should build rapport" but "when the lead picks up and says 'who is this?', here's exactly what to say in the next 5 seconds and why it works."
- **Include a specific mistake and its consequence** - "If you jump straight to 'I have a great listing in your area,' you've positioned yourself as a salesperson. The lead's guard goes up. Instead, start with a question about their situation."
- **Reference a real workflow** - "You're on your third hour of cold calling from Follow Up Boss. You've hit 40 dials. Lead #41 actually picks up. Your brain freezes. Here's the framework that prevents that."
- **Provide a counter-intuitive insight** - something the reader won't find in the top 5 Google results for this keyword. A specific technique, a reframe, or a "most people do X but Y actually works better" moment.

### Information Gain
Every supporting post must offer at least ONE thing that differentiates it from existing search results:
- A script or technique that other posts on this topic don't include
- A framework that organizes the advice differently (e.g., "The 3-Second Rule for Cold Call Openers" instead of a generic list of tips)
- A specific connection between this sub-topic and a broader principle (e.g., connecting rapport-building to appointment conversion rates)

### What to AVOID
- Generic advice reworded from competitor articles ("building rapport is important because it builds trust")
- Filler sentences that could be deleted without losing information
- Overly broad coverage - stay in your lane. This post owns ONE topic.
- Academic or formal tone. Agents want coach-talk: direct, practical, from someone who's been on the phones.

---

## CONTENT STRUCTURE (Follow This Framework)

### 1. H1: [Keyword + Parenthetical Benefit]

Good examples:
- `How to Build Rapport on Real Estate Calls (Without Sounding Fake)`
- `Expired Listing Scripts That Actually Get Callbacks`
- `How to Follow Up with Cold Leads (Without Being Annoying)`

The parenthetical serves two purposes: improves CTR by addressing the reader's fear/objection, and adds a secondary keyword or phrase.

### 2. Opening Paragraph (2-4 Sentences)

Rules:
- State the specific problem this post solves. One sentence. Direct.
- Include the exact keyword in sentence 1 or 2.
- Signal what the reader will get: a script, a framework, a technique.
- **No fluff.** No backstory. No "In today's market..." throat-clearing.

Example:
> Building rapport on real estate calls is what separates a 30-second hangup from a 4-minute conversation that ends in an appointment. Most agents either skip it entirely or force it with awkward small talk. Here's a framework that makes it natural - and a script you can use on your next call.

### 3. Pillar Uplink (Within First 300 Words)

**This is non-negotiable.** Within the first 300 words of the body, include a natural link back to the parent pillar post. The template auto-generates a banner above the content, but an in-content link carries more SEO weight.

Format it naturally - don't make it feel forced:
> "For the complete breakdown of cold calling strategies, see our [real estate cold calling guide](/blog/real-estate-cold-calling-guide/)."

Or weave it into context:
> "This technique is part of our broader [guide to talking to real estate leads](/blog/real-estate-conversation-guide/), but it deserves its own deep dive."

Use the pillar's target keyword as the anchor text.

### 4. H2 Sections - The Core Content (2-3 Sections)

Each H2 covers a distinct aspect of the topic. This is the meat of the post. Rules:

- **Be actionable and specific.** Use examples, scripts, and scenarios. Not theory.
- **Use `<ScriptExample>` at least 2 times total.** Agents come to these posts for words they can use.
- **Use `<CalloutBox>` at least once.** Highlight a key tip or common mistake.
- **Keep each section to 250-450 words.** Deep enough to be genuinely useful, focused enough to stay on-topic.
- **Each H2 should teach one distinct thing.** If two H2s could be merged without losing anything, merge them.

Example H2 structure for "how to build rapport real estate calls":
- H2: The 10-Second Rule - Why the First Thing You Say Determines Everything
- H2: 3 Rapport Techniques That Work on Cold Calls (With Scripts)
- H2: What to Do When a Lead Won't Open Up

### 5. H2: How SaySo Helps

Brief product tie-in. Rules:
- 2-4 sentences maximum. Supporting posts are lighter on product promotion than pillars.
- Connect this specific topic to a specific SaySo feature. Not "SaySo helps with calls" but "When you're struggling to build rapport and the lead goes quiet, SaySo suggests a conversation-starter on screen - in real time."
- CTA: Link to `/demo/` or a relevant feature page (e.g., `/features/real-time-coaching/`).

### 6. H2: FAQ (Optional but Recommended)

2-4 questions and answers. Rules:
- Target long-tail keyword variations that didn't fit in the main body.
- Keep answers to 2-3 sentences each.
- These feed the auto-generated FAQPage schema.

---

## INTERNAL LINKING RULES

Supporting posts are the connective tissue of the cluster. Their linking job is simpler than a pillar's but just as important.

### Required Links
1. **Link UP to the pillar post** - within the first 300 words. Use the pillar's target keyword as anchor text. This is the most important link on the page.
2. **Link ACROSS to 2-3 other supporting posts** in the same cluster. Use their target keywords as anchor text. Link to them even if they don't exist yet.
3. **Link to 1-2 objection pages** if the topic involves phone calls (most do). Example: `/objections/not-interested/`, `/objections/call-me-later/`
4. **Link to 1 feature page** if naturally relevant. Example: `/features/real-time-coaching/`, `/features/call-notes/`
5. **Link to 1 glossary page** if an industry term appears that has a glossary entry. Example: first mention of "FSBO" → `/glossary/fsbo/`

### Total: 5-8 internal links per post.

### Anchor Text Rules
- **Always descriptive.** Never "click here" or "read more."
- Use the target keyword of the destination page as the anchor text.
- Make links feel natural within the sentence. If you have to restructure the sentence to fit the link, rewrite the sentence.

---

## CTA PLACEMENT

Supporting posts get 1-2 CTAs. Keep them lighter than pillar posts.

1. **Product section CTA (in the "How SaySo Helps" H2):** Single CTA linking to `/demo/` or a feature page.
2. **Optional soft CTA earlier in the post** - only if a SaySo feature is directly relevant to the technique being discussed. One sentence, inline: "This is exactly what SaySo does - feeds you rapport-building prompts in real time. [See how it works →](/demo/)"

Do NOT put a CTA before delivering real value. The reader should get at least one useful technique before seeing any product mention.

---

## FORMATTING RULES

- **Paragraphs:** Max 3 sentences. Agents read between calls on mobile.
- **Short sentences.** Punch over polish. Vary length but lean short.
- **Tone:** Practical, coach-like, direct. You're someone who's made 10,000 calls and is sharing what actually works. Not a professor, not a marketer - a coach.
- **Banned phrases:** "In today's competitive market," "It's no secret that," "As a real estate professional," "In the ever-evolving world of," "Let's dive in," "Without further ado," "At the end of the day." Any sentence that could be deleted without losing information should be deleted.
- **Bold sparingly** - only for key terms or phrases a scanner's eye should catch.

---

## CONTENT DIFFERENTIATION FROM PILLAR

A supporting post is NOT a section of the pillar copy-pasted into its own page. The supporting post must go deeper than the pillar's treatment of the same sub-topic:

- **More detailed scripts and examples** - the pillar gives one script per sub-topic; the supporting post gives 2-3 variations with context for each.
- **More specific scenarios** - the pillar says "here's an expired listing opener"; the supporting post covers openers for listings expired <30 days, 30-90 days, and 90+ days.
- **Common mistakes with explanations** - the pillar might list one mistake; the supporting post breaks down 3-5 with specific consequences.
- **Fresh angles** - approach the topic from a direction the pillar doesn't cover.

If the pillar gives 300 words on this sub-topic, the supporting post gives 1,200-1,800 words with significantly more depth, scripts, and actionable detail.

---

## WHAT THE TEMPLATE HANDLES AUTOMATICALLY

Do NOT include these in your content - the blog template generates them:

- Schema markup (BlogPosting with `isPartOf` referencing the pillar + FAQPage)
- Canonical URL with trailing slash
- Pillar uplink banner above the content (auto-injected for supporting posts - but you STILL write an in-content uplink in the first 300 words because it carries more SEO weight)
- Mid-page CTA (auto-injected at content midpoint)
- Newsletter CTA (auto-injected at bottom)
- "More in This Series" cluster navigation section
- Breadcrumbs showing: Blog > [Pillar Title] > [Post Title]
- Reading time
- Open Graph / Twitter meta tags

**NOT shown for supporting posts** (pillar-only features):
- Early CTA banner
- Cluster navigation sidebar

Your job is the content, the heading structure, the internal links within the prose, and the frontmatter. Everything else is handled.

---

## QUALITY CHECKLIST (Self-Audit Before Output)

Before finalizing, verify:

- [ ] Competitive research was completed (top 5 pages analyzed, PAA questions collected)
- [ ] Parent pillar post was read - this post goes deeper without repeating the pillar's scripts or angles
- [ ] Sibling supporting posts were checked for overlap
- [ ] At least 1 content gap from research is addressed in the post
- [ ] FAQ includes at least 1 question sourced from PAA or related searches
- [ ] H1 contains the exact target keyword + parenthetical benefit
- [ ] First 100 words contain the exact target keyword
- [ ] Meta title is under 60 characters and keyword-first
- [ ] Meta description is 150-160 characters with keyword + value + CTA
- [ ] 3-5 H2s, no skipped heading levels
- [ ] Pillar uplink within first 300 words with descriptive anchor text
- [ ] At least 2 `<ScriptExample>` components
- [ ] At least 1 `<CalloutBox>` component
- [ ] At least 2 E-E-A-T experience markers (specific scenarios, real workflows, counter-intuitive insights)
- [ ] At least 1 Information Gain element (verified against actual competitor content)
- [ ] 5-8 internal links with descriptive anchor text
- [ ] Links to 2-3 other supporting posts in the same cluster
- [ ] 1-2 CTAs maximum (not before delivering value)
- [ ] Word count 1,200-1,800
- [ ] No banned filler phrases
- [ ] No generic advice - every tip is specific to real estate calling
- [ ] Content goes deeper than the pillar's coverage of this sub-topic
- [ ] Frontmatter includes type: "supporting", cluster, AND pillar slug
- [ ] Tone is coach-like, not academic
