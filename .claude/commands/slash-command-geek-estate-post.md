# /geek-estate-post Slash Command - Production Prompt

**Usage:** `/geek-estate-post "[post title or topic]" [author:Name] [series:pillar|deep-dive]`

**Examples:**
- `/geek-estate-post "The AI-Native Agent: 10 Workflows Worth Stealing" series:pillar`
- `/geek-estate-post "The 5-Minute Lead: Winning the Speed-to-Lead Race With AI" series:deep-dive`
- `/geek-estate-post "Where AI Hurts the Sale" author:Jack Drechsler`

This command writes a **guest post for Geek Estate Blog** (geekestateblog.com) — an external, value-first proptech publication where Sayso is contributing articles to build authority and earn a backlink. This is **not** a post for Sayso's own site. The whole point is to write something genuinely useful for *their* audience, in *their* voice, that earns the right to a backlink rather than reading like a Sayso ad.

Read this entire prompt before doing anything. Then follow the phases in order.

---

## WHY THIS COMMAND EXISTS (read first)

Geek Estate Blog (GEB) is a bylined, guest-contributed real estate technology blog for **industry professionals** (agents, brokers, proptech founders, vendors, investors), not consumers. Sayso has an opening to contribute a series of value-adding articles. The strategic goal is a backlink to Sayso, but GEB's editorial rules make the path very specific:

1. **Value-first, never pitchy.** GEB's stated rule: vendors may contribute but must write "without pimping their own products or clients." Obvious self-promotion gets rejected.
2. **In-body links are earned, not given.** GEB explicitly states: "No text links within the body of the post will be given unless you write at least 2-3 quality posts first." So the backlink lives in the **author bio**, not the article body.
3. **First-hand experience is required.** GEB rejects generic content: "If you don't have real world real estate experience and learnings to share, this is the wrong outlet." Posts must read like a practitioner sharing what they've actually learned.
4. **Original only.** Content must not be posted anywhere else on the web first. These drafts are for GEB exclusively.

Because of this, the post body is **vendor-neutral and value-dense**, and Sayso shows up (if at all) only as one illustrative example among others, with no link. The backlink is delivered cleanly through the byline/bio. This is also the SEO-safe play: a contextual bio link from a relevant, established industry site passes link value, while a body stuffed with optimized anchor links to Sayso reads as a paid-link scheme and risks both rejection and a Google penalty.

---

## PHASE 0: INPUTS & CONFIG

Parse the command input:

1. **Topic / working title** — the quoted string. May be a full title or a loose topic.
2. **Author** — the value after `author:`. **Default: Kuvaal Patel.** Override per run when Jack (or anyone else) is the submitting author.
3. **Series role** — the value after `series:`:
   - `pillar` — the hub/overview piece that surveys many workflows at a breadth level (e.g. "10 Workflows Worth Stealing"). Slightly longer, list-framed, each item a tight section.
   - `deep-dive` — a spin-off that takes ONE idea from the pillar and goes deep with first-hand detail. This is the default if not specified.

If the topic is ambiguous about which series role it plays, infer from the title shape (a numbered "N things" title is almost always `pillar`; a single-concept title is `deep-dive`).

### The Sayso content series (for context and cross-referencing)

This is the planned GEB series. Knowing the full map keeps each post distinct and lets you reference sibling ideas naturally (in prose only — never as a link, since none are published yet).

**Pillar:** The AI-Native Agent: 10 Workflows Worth Stealing

**Spin-off deep dives:**
1. The 5-Minute Lead: Winning the Speed-to-Lead Race With AI
2. What to Say Next: Real-Time Call Coaching and the Death of the Sales Script ★
3. The Follow-Up Problem: How AI Turns Cold Leads Into Booked Appointments ★
4. The Objection Playbook: Training New Agents With AI Instead of Role-Play ★
5. AI for Listing Marketing: Copy, Photos, and Video That Used to Take All Day
6. Your CRM Is Lying to You: AI and the Truth About Your Pipeline
7. Where AI Hurts the Sale: The Conversations That Have to Stay Human

★ marks the topics where Sayso (real-time, live-call coaching for real estate agents) is the most natural illustrative example. On those posts you may reference Sayso once in the body as one example among others; on the rest, keep Sayso out of the body entirely and let the bio carry it.

---

## PHASE 1: RESEARCH (do this before writing a single word)

### Step 1: Re-read Geek Estate Blog live

GEB's voice and current themes shift over time, so read it fresh each run rather than trusting a stale summary. Use WebFetch.

- Fetch the index: `https://geekestateblog.com/blog/`
- Fetch the contributor rules: `https://geekestateblog.com/contribute/`
- Read **3-5 recent full posts**, prioritizing analytical/thought-leadership pieces over community announcements.

Extract and hold onto:
- **House voice:** confident first-person, opinionated, grounded in experience. Authors make definitive market claims ("From where I sit, the proptech market is entering a period of transition") rather than neutral how-tos.
- **Structure norms:** essay with descriptive subheads, occasional bullet lists, a hook/thesis intro, a forward-looking conclusion. Roughly 900-1,500 words for analytical posts.
- **Register:** assumes the reader knows the industry (MLS, IDX, CRM, proptech VC). No beginner hand-holding, no consumer framing.
- **How product mentions are handled** in practice: woven in as illustrative evidence, with the author's company surfacing in the bio, never as a CTA.

### Step 2: Ground the post in real Sayso domain experience

The author writes from first-hand experience in real estate AI and calling. Pull authentic, specific detail to draw on (paraphrase, never copy verbatim, and keep it vendor-neutral in the body):

- `docs/content/ultimate-script-book.md` — real call dynamics, objection patterns, follow-up cadences, prospect psychology. This is what lets the post describe what *actually* happens on calls instead of theorizing.
- `docs/content/blog-content-guide.md` — Sayso's understanding of the agent's day and pain points.

The goal: the post should contain specifics only a practitioner would know (real numbers, real scenarios, the actual texture of an agent's workflow), which is exactly the first-hand experience GEB demands.

### Step 3: Research the topic on the open web

- WebSearch the core topic, plus a variant with "2026" for recency.
- Read 3-5 of the strongest sources to understand current thinking, recent data, and what's already been said.
- Capture concrete, citable facts/numbers worth referencing (cite the insight naturally in prose; link to a primary source only where GEB-style posts do, e.g. a stat from NAR, the Fed, or a named study).

### Step 4: Build a brief (for your own reference, not part of the output)

1. **GEB voice notes** — 3-4 specifics about their current tone to match.
2. **The thesis** — the single opinionated argument this post makes. GEB posts have a point of view, not just a topic.
3. **First-hand specifics to use** — the concrete scenarios/numbers from Step 2 that make this credible.
4. **Information gain** — at least one angle, framework, or claim a reader won't get from the obvious top results.
5. **Series fit** — what this post owns and what it deliberately leaves to sibling posts, so the series doesn't repeat itself.
6. **Where (if anywhere) Sayso fits** as an illustrative example — only on ★ topics, only once, no link.

Do not start writing until the brief is complete.

---

## PHASE 2: WRITE THE POST

Write a complete guest post in GEB's voice. The author is a real person sharing real learnings, not "the Sayso team."

### Voice & point of view
- **First person, confident, opinionated.** Open with a thesis or a contrarian framing the reader will want to argue with or nod along to.
- **Practitioner register.** Write like someone who has been close to thousands of real estate calls and has watched AI change the workflow, talking to peers who already know the industry.
- **Conversational but credible.** Grounded, occasionally blunt. Not academic, not clickbait, not motivational.

### Structure
- **Hook/thesis intro** (2-4 sentences). State the argument or the shift. No "In today's market" throat-clearing.
- **Descriptive subheads** (H2, and H3 where useful). A reader skimming headings should get the argument.
- **Occasional bullet lists** within sections where they aid scanning. Don't turn the whole post into a listicle unless the title is explicitly a numbered list (pillar role).
- **Forward-looking conclusion** — a takeaway about where this is heading, in the GEB style ("As X matures, Y is becoming more valuable than Z").

### Length
- **deep-dive:** 900-1,400 words. Go deep on one idea.
- **pillar:** 1,300-1,800 words. Survey breadth; each list item is a tight, self-contained mini-section with one concrete example.
- Word count is a scoping target, not a floor. If the argument is fully made, stop.

### First-hand experience (include at least 2, this is non-negotiable for GEB)
- A specific scenario walked through step by step (what an agent actually does, not "agents should").
- A real number or benchmark with the texture of experience behind it.
- A specific mistake and its consequence.
- A counter-intuitive insight from having watched this play out repeatedly.

### Promotional discipline (the core rule)
- The **body is vendor-neutral.** Do not pitch Sayso. Do not link to Sayso in the body.
- On ★ topics only, Sayso may appear **once** as one illustrative example among others (e.g. naming it alongside other tools in the category), with no link and no superlatives. If it would feel like an ad, cut it.
- The backlink is delivered entirely through the author bio (see Output).
- Never frame the post as building toward Sayso. It should be useful and complete even if Sayso did not exist.

### Global writing rules (from CLAUDE.md — apply everywhere)
- Brand name is always **Sayso** (capital S only). Never "SaySo", "SAYSO", "Say So", or "say so".
- **Never use em dashes (—).** Use commas, colons, periods, or rephrase.
- **Never write short, punchy, fragmented "tagline" sentences** ("Faster leads. Smarter calls. More clients."). Write full, natural sentences with normal flow, like a real person writing an essay.
- **Never use "Not X. Not Y. Just Z." structures.** Rewrite affirmatively.
- When discussing real estate agents, call them "agents" or "real estate agents", never "reps" or "representatives".
- Don't call prospects or clients "deals". Agents book appointments and turn prospects into clients.
- Avoid "phone call(s)" and "cold call(s)" as throwaway nouns; use "call(s)" (cold calling as a *topic* is fine).
- Don't use "run/running" for making calls; use natural language ("make calls", "dial", "get on the phone").

### What to avoid
- Generic advice that could apply to any industry ("AI is transforming everything").
- Consumer-facing framing (this audience is industry pros, not buyers/sellers).
- Restating the obvious top search results without adding a point of view.
- Any sentence that could be deleted without losing information.

---

## PHASE 3: OUTPUT

Produce a single markdown file saved to:

```
content/guest-posts/geek-estate/[slug].md
```

Use a kebab-case slug derived from the title. The file is **plain markdown** (GEB does not use Sayso's MDX components — no `<ScriptExample>`, no `<CalloutBox>`). Structure the file as a submission packet:

```markdown
---
title: "[Final post title]"
proposed_titles:
  - "[Alt title option 1]"
  - "[Alt title option 2]"
author: "[Author name]"
target: "Geek Estate Blog (geekestateblog.com)"
series: "[pillar | deep-dive]"
status: "draft"
word_count: [approx]
---

# [Post title]

[Full post body in plain markdown, GEB voice, value-first.]

---

## Author bio (for submission — this carries the backlink)

[2-3 sentence first-person bio establishing the author's real estate / AI credibility, ending with a single natural link to Sayso. Example shape: "Kuvaal Patel works on AI tools for real estate teams at [Sayso](https://asksayso.com), where ..."]

## Submission notes (not for publication)

- **Suggested GEB category:** [Founders and Tech | Agents and Brokers | etc.]
- **Pitch email blurb to Drew Meyers:** [3-4 sentence pitch the author can paste into an email: who they are, what the post argues, why it fits GEB's audience, confirmation it's original and exclusive to GEB.]
- **Originality:** Confirm this draft has not been published elsewhere and must not be cross-posted before GEB runs it.
```

After writing the file, give the user a short summary in chat: the title, word count, the one-line thesis, whether Sayso appears in the body, and the file path.

---

## QUALITY CHECKLIST (self-audit before output)

- [ ] GEB read live this run (index + contribute page + 3-5 posts); voice matched
- [ ] Post has a clear, opinionated thesis, not just a topic
- [ ] Written in confident first-person practitioner voice (the named author, not "Sayso Team")
- [ ] At least 2 first-hand experience markers (specific scenario, real number, real mistake, or earned insight)
- [ ] At least 1 information-gain element beyond the obvious top results
- [ ] Audience is industry pros, not consumers; register assumes industry knowledge
- [ ] Body is vendor-neutral; Sayso appears in the body only on ★ topics, only once, with no link (or not at all)
- [ ] Backlink lives only in the author bio, as a single natural link
- [ ] Essay structure: hook intro, descriptive subheads, forward-looking close
- [ ] Length on target for the series role
- [ ] No em dashes; "Sayso" spelled correctly; no fragmented tagline sentences; no "Not X. Not Y." structures
- [ ] No content overlap with sibling series posts; siblings referenced in prose only, never linked
- [ ] Original and exclusive to GEB (stated in submission notes)
- [ ] Saved to content/guest-posts/geek-estate/[slug].md as plain markdown with the submission packet

---

## NOTE ON THE BACKLINK + AUTHOR-IDENTITY QUESTION

A guest-post backlink from a relevant, established industry site like GEB does pass link value. Having the same person named as the author on both the Sayso site and the GEB post does **not** cause Google to "suppress" the link; co-authorship is not a negative ranking signal. The real constraints are the ones this command is built around:

1. GEB only grants in-body links after 2-3 quality posts, so the early backlink belongs in the **author bio**, which is a normal, accepted guest-author convention.
2. Link value at scale comes from the posts being genuinely good and the link being natural. Guest posts that exist only to drop optimized anchor-text links into the body are what Google's link-spam systems target. A clean bio link from a real, useful article is the safe and effective play.
3. Vary the bio link's anchor text across the series (the author's name or "Sayso", not a keyword-stuffed phrase), and keep every post genuinely useful on its own.
