# Sayso blog program: execution plan

**Prepared:** October 24, 2026
**Goal:** write every new blog post and refresh every existing one from the October 21 keyword research in a single autonomous run, using one skill, one style and one call-to-action system, then launch them all at once.
**Source data:** `docs/seo/keyword-map/` (backlog, search groups, page-one results). Research method and findings: the "Sayso keyword map" dashboard and `GAME-PLAN.md` in the research folder.

---

## 1. Decisions this plan is built on

| Decision | What it means for the work |
|---|---|
| Blogs are the strategy | New posts plus refreshes of existing posts; no separate landing pages |
| One run, one launch | All 38 pieces are written in one autonomous run and launch together when the launch PR is merged; no drip schedule (section 10) |
| No posts about other companies' products | The 7 dialer and CRM posts are removed (section 5). The coaching program posts stay: they compare programs agents buy, using each program's own published facts, as approved in PR #117 |
| No demo-booking attribution work | Success is measured in Search Console (impressions, positions, clicks), not demos |
| Nothing merges without the owner | Every batch goes up as a draft PR to `development`; Jack merges |

---

## 2. The skill: `/seo-blog`

One skill does both new posts and refreshes: `.claude/skills/seo-blog/`. It is already in PR #117 and needs the upgrades below before it runs at scale (most come from the outside SEO review).

### What it does today

1. Loads the post's saved search data (top ten, People Also Ask, related searches, AI Overview).
2. Reads the top-ranking articles and records what they cover, what they miss and every fact with its source.
3. Writes a brief to `docs/content/briefs/<slug>.md`.
4. Writes the post with the format, CTA and brand rules.
5. Checks brand rules, title and description lengths, keyword placement, links and FAQ format.

### Upgrades before the next post (day 1)

| Upgrade | Why |
|---|---|
| **Queue and status.** The skill picks the next item from this plan's list and records its status in `blog_backlog.csv`: drafted, in review, ready, published | Stops it writing the same post twice or skipping refreshes |
| **Refresh mode.** For an existing URL: keep the slug, publish date, cluster and anything that already works; record the Search Console baseline; write a one-line "what this refresh should change" before editing | The current skill only knows how to write new posts |
| **No other companies' products.** Never write a post about a dialer, CRM or other vendor's product; mention one only as context, never review or compare it | The new rule from section 1 |
| **Format check.** When videos, PDFs or forums lead page one, say what that means for the post (add a downloadable script, a demo, a worked example) instead of skipping those results | Some searches want more than an article (role play leads with video) |
| **Fact statuses.** Mark every fact confirmed (with URL and date), not published, or could not access. Never turn "could not access" into "not published" | The first post nearly did this |
| **Incoming links.** After writing, add links to the post from its hub and from at least one non-blog page, and check `docs/content/pending-internal-links.md` | New posts need a path in, not just links out |
| **Human review step.** The skill ends at "in review"; a person checks facts and prices before the post is marked ready | Google's guidance on AI-assisted content; protects accuracy |
| **Softer mechanical rules.** Title and description lengths, keyword placement and FAQ become guidance, not hard requirements; FAQ is optional | Rigid templates read as mass-produced |

### Code fixes before scaling (day 1)

| Fix | Why |
|---|---|
| Place the inline CTA using a safe method that cannot split inside a `<CalloutBox>` or `<ScriptExample>` | The outside review reproduced a build failure with the current paragraph counter |
| Raise contrast of the inline CTA's small text (white at full strength) | Meets the 4.5:1 accessibility minimum |
| Point the inline CTA at the matching product or persona page instead of `/demo/` for every variant (section 7) | Builds a path from post to product page to demo |
| Remove the `dialer` and `crm` variants | No longer used |
| Show the generic mid-article block only on posts without an inline CTA | Avoids three product blocks in one post |
| Represent "Sayso Team" as an Organization in structured data | It is not a person |

---

## 3. Blog types (formats)

Every post uses one of these. The full outlines live in `.claude/skills/seo-blog/references/formats.md`.

| Format | Use for | Shape |
|---|---|---|
| **Comparison guide** | Coaching programs | Direct answer, how we compared, comparison table, one section per option with sourced price and a limitation, how to choose, where live call coaching fits, closing section |
| **Cost guide** | Coaching cost | Price range in one sentence, price table with sources and dates, what changes the price, hidden costs, is it worth it, closing section |
| **Script post** | Seller, buyer, voicemail, just listed and just sold, withdrawn, referral, negotiation, new agents, role play | Opening line, when to use it, one script block per situation with "what they say next" branches, voicemail versions, mistakes, closing section |
| **How-to guide** | Listing appointments, converting leads, finding expired listings, coaching agents, prospecting plan and strategies | Steps as headings, what to do and what to say on each call, a checklist or template to copy, closing section |
| **Explainer** | Reverse prospecting, real estate coach | Definition first, how agents use it, what to say on the resulting call, closing section |
| **Refresh** | Existing posts and glossary pages | Keep what works; change only what the refresh note says (section 6) |

---

## 4. New posts to write (22, plus post 1 already written)

Numbers come from the October 21 research. Searches per month are Google Ads estimates and include close variants. Page one: **open** means 2 or more small sites rank, **contested** 1, **closed** none. Difficulty is DataForSEO's 0 to 100 score.

### Coaching and team leaders (cluster: coaching, new hub)

| # | Post | Main keyword (searches / difficulty / page one) | Total searches covered | Format | CTA variant |
|---:|---|---|---:|---|---|
| 1 | Best real estate coaching programs (**written, in PR #117; hub of this cluster**) | real estate coaching programs (390 / 12 / open) | 1,940 | Comparison guide | coaching |
| 3 | Do you need a real estate coach? What they do and how to choose | real estate coach (1,900 / 20 / contested) | 2,040 | Explainer | coaching |
| 25 | How much does real estate coaching cost? | how much does real estate coaching cost (40 / 0 / closed) | 230 | Cost guide | coaching |
| 39 | How to coach real estate agents on their calls | team coaching for real estate agents (n/a / n/a / closed) | 30 | How-to guide | team |

### Scripts (clusters: cold-calling, conversation-skills, follow-up, objection-handling)

| # | Post | Main keyword | Total | Format | Hub | CTA |
|---:|---|---|---:|---|---|---|
| 9 | Real estate role play: scenarios and scripts to practice | real estate role play (10 / 0 / open) | 40 | Script post | conversation-skills | script |
| 15 | Real estate voicemail scripts | realtor voicemail script (50 / 14 / closed) | 110 | Script post | cold-calling | script |
| 27 | Seller scripts for real estate agents | seller script real estate (40 / 2 / contested) | 50 | Script post | conversation-skills | script |
| 31 | Just listed and just sold call scripts | just sold script real estate (10 / n/a / contested) | 20 | Script post | cold-calling | script |
| 33 | Real estate scripts for new agents (with examples) | realtor script (170 / 16 / closed) | 230 | Script post | cold-calling | script |
| 42 | Buyer lead scripts | buyer scripts real estate (40 / 48 / closed) | 70 | Script post | conversation-skills | script |
| 44 | Withdrawn listing scripts | withdrawn listing script (10 / 43 / closed) | 20 | Script post | cold-calling | script |
| 45 | Referral scripts: asking past clients and your sphere | asking for real estate referrals script (10 / 0 / closed) | 20 | Script post | follow-up | script |
| 46 | Real estate negotiation scripts | real estate negotiation scripts (10 / 0 / closed) | 10 | Script post | objection-handling | script |

### Leads and appointments (clusters: appointment-setting, conversation-skills, cold-calling)

| # | Post | Main keyword | Total | Format | Hub | CTA |
|---:|---|---|---:|---|---|---|
| 19 | How to get more listing appointments | how to get listing appointments (10 / 0 / closed) | 50 | How-to guide | appointment-setting | leads |
| 23 | How to prepare for a listing appointment: a checklist | how to prepare for a listing appointment (10 / 2 / contested) | 90 | How-to guide | appointment-setting | leads |
| 34 | Real estate agent and client conversation examples | conversation between real estate agent and customer (90 / 0 / closed) | 180 | Script post | conversation-skills | leads |
| 38 | How to find expired listings | how to find expired listings (90 / 0 / closed) | 140 | How-to guide | cold-calling | prospecting |
| 41 | How to convert real estate leads | converting real estate leads (50 / 0 / closed) | 70 | How-to guide | conversation-skills | leads |

### Prospecting (cluster: cold-calling)

| # | Post | Main keyword | Total | Format | CTA |
|---:|---|---|---:|---|---|
| 29 | Real estate prospecting: strategies that work | prospecting real estate (260 / 13 / closed) | 360 | How-to guide | prospecting |
| 36 | What is reverse prospecting in real estate? | what is reverse prospecting in real estate (90 / 0 / closed) | 150 | Explainer | prospecting |
| 37 | Cold calling services and VAs vs making calls yourself (no company names) | real estate cold calling service (50 / 15 / closed) | 140 | How-to guide | prospecting |
| 43 | Real estate prospecting plan (with a weekly template) | real estate prospecting plan (10 / 52 / closed) | 30 | How-to guide | prospecting |
| 35 | Types of real estate prospecting tools (**needs your decision, see section 10**) | real estate prospecting tools (50 / 10 / closed) | 170 | Explainer, no company names | prospecting |

---

## 5. Removed from the plan (other companies' products)

| # | Post | Why removed |
|---:|---|---|
| 5 | Mojo Dialer pricing | Another company's product |
| 7 | Best dialers for real estate agents | Compares other companies' products |
| 11 | How to use Mojo Dialer | Another company's product |
| 13 | Mojo Dialer review | Another company's product |
| 17 | Mojo Dialer vs PhoneBurner, Vulcan7, REDX | Compares other companies' products |
| 21 | Follow Up Boss review | Another company's product |
| 40 | Follow Up Boss dialer | Another company's product |

These searches (about 3,700 a month together) are left to the product companies themselves. Sayso's integrations page still covers how Sayso works alongside these tools.

---

## 6. Existing posts to refresh (16)

"Sayso now" is the last 90 days in Search Console (impressions, average position). The first nine are refresh-first: Sayso already ranks within position 30, or Google has not indexed the page.

| # | Page | Main keyword (searches / page one) | Sayso now | What the refresh changes |
|---:|---|---|---|---|
| 2 | Expired listing scripts | expired listing scripts (210 / contested) | 417 at ~29 | Answer "best time to call expired listings" near the top; compare script styles without copying them |
| 4 | How to talk to real estate leads (hub) | questions to ask real estate leads (10 / open) | 90 at ~12 | Check the recent query mix first; make the question list scannable; link the new lead posts |
| 6 | Circle prospecting scripts and glossary | circle prospecting (210 / closed) | 245 at ~19 | Exact phrase in titles; glossary and post link to each other |
| 8 | Real estate phone script for leads | real estate prospecting scripts (30 / closed) | not indexed | Target general script searches; link from the script posts |
| 10 | Listing appointment glossary | listing appointment (90 / contested) | 293 at ~10 | Check query mix and AI Overview before touching the title; link the two new listing appointment posts |
| 12 | FSBO scripts | fsbo scripts (70 / contested) | 62 at ~28 | Lead with a complete call script, then objection branches |
| 14 | FSBO glossary | fsbo meaning (1,600 / closed) | 22 at ~21 | Crisp definition first, then the agent's angle and the scripts link |
| 16 | How to book appointments (hub) | agent appointment (210 / closed; mixed meaning) | not indexed | Tighten it, remove overlap with the appointment setting script, link it in, request indexing |
| 18 | How to revive dead leads | dead leads (90 / closed) | 34 at ~29 | Answer "what is a dead lead" first |
| 20 | Real estate cold calling guide (hub) | cold calling real estate (320 / contested) | 502 at ~33 | Decide with the glossary which page owns the head term; put "scripts" in the title; link all new cold-calling posts |
| 22 | Objection handling hub (/objections/) | real estate objection handling scripts (20 / closed) | 223 at ~31 | Scannable list of objections with one-line answers linking each page |
| 24 | Appointment setting script | how to set more appointments as a real estate agent (10 / contested) | 10 at ~64 | Sections for new agents and for ISAs |
| 26 | ISA glossary | isa real estate (390 / closed) | 36 at ~36 | Fix the gambling-site canonical first; direct definition |
| 28 | ISA scripts | isa scripts (110 / closed) | none yet | Check indexing; give it a distinct job from the glossary |
| 30 | Real estate follow-up scripts (hub) | real estate follow up scripts (30 / contested) | 1 at ~31 | Follow-up schedule table; link the referral scripts post |
| 32 | Best call coaching software | best cold calling software for real estate (50 / closed) | 7 at ~46 | Get it indexed; write the opening for real estate teams; link from product pages and the coaching hub |

**Monitor only (already written and scheduled):** LPMAMA, buyer consultation questions, do-not-call rules, and the five queued script posts (open house, pre-foreclosure, absentee owner, probate, divorce). Check each is indexed and linked once it goes live.

---

## 7. Calls to action and where they point

Each post has at most three Sayso touches, always after the reader has something useful.

| Touch | Where | What it is |
|---|---|---|
| 1. Inline CTA | After paragraph two (automatic from `ctaVariant`) | Compact navy-to-blue card: one heading, one line, one button |
| 2. In-context mention | Inside the section where Sayso solves that exact problem | One to three sentences written as advice, linking one product page |
| 3. Closing section | End of the post | Three or four sentences about the reader's next call, one link to `/demo/` or Download |

### Inline CTA by variant

| Variant | Used by | Heading | Button goes to |
|---|---|---|---|
| script | Script posts | Want the next line on screen while you are on the call? | `/products/playbook/` (custom scripts on screen) |
| coaching | Coaching posts | Want help during the call, not just between calls? | `/why-sayso/` |
| leads | Lead and appointment posts | Want to know what to ask next while the lead is talking? | `/products/cue/` (real-time coaching) |
| prospecting | Prospecting posts | Want every prospecting call to end with a next step? | `/products/cue/` |
| team | Team leader posts | Want to coach every agent without listening in on every call? | `/for/team-leaders/` |

### The path each CTA builds

```
Blog post
  ├─ inline CTA ────────────► product or persona page (Playbook, Cue, Why Sayso, Team leaders)
  ├─ in-context mention ────► the one feature page that fits (Playbook, Cue, Smart Capture, Pulse)
  └─ closing section ───────► /demo/ (Book a demo) or Download Sayso
Product and persona pages ──► their own Book a demo and Download buttons
```

### In-context product link by topic

| Topic | Feature to link |
|---|---|
| Scripts, role play, new agents, voicemail | Playbook (your scripts on screen during the call) |
| Objections, negotiation, seller and buyer conversations | Cue (live objection responses) |
| Listing appointments, pricing conversations | Pulse (live market data on the call) |
| Follow-up, referrals, converting leads | Smart Capture (notes written for you, so follow-up is easy) |
| Coaching and team leaders | Why Sayso, and the team leaders page |

Persona links where they fit: new agents to `/for/new-agents/`, ISA content to `/for/isas/`, team content to `/for/team-leaders/`, everything else to `/for/solo-agents/`.

---

## 8. How posts link to each other

The site already builds links within a cluster: a post marked `type: "supporting"` with a `cluster` and `pillar` shows a banner back to its hub and a "more in this series" list. Every new post uses that, plus written links.

| Cluster | Hub (pillar) | New posts that join it | Refreshes in it |
|---|---|---|---|
| cold-calling | Real estate cold calling guide | 15 voicemail, 31 just listed and just sold, 33 scripts for new agents, 44 withdrawn, 38 find expired listings, 29 prospecting strategies, 36 reverse prospecting, 37 cold calling services, 43 prospecting plan, 35 prospecting tools | 2 expired, 6 circle prospecting, 8 phone script, 12 FSBO |
| conversation-skills | How to talk to real estate leads | 9 role play, 27 seller scripts, 42 buyer lead scripts, 34 conversation examples, 41 convert leads | 4 the hub itself |
| appointment-setting | How to book appointments | 19 get more listing appointments, 23 listing appointment checklist | 16 the hub, 24 appointment setting script |
| follow-up | Real estate follow-up scripts | 45 referral scripts | 18 dead leads, 30 the hub |
| objection-handling | Real estate objection handling | 46 negotiation scripts | 22 objections hub |
| coaching (new) | Best real estate coaching programs (post 1) | 3 real estate coach, 25 coaching cost, 39 coach agents on calls | 32 call coaching software |

### Linking rules for every post

- **Links out:** one to its hub, two or three to sibling posts in the same cluster, one or two to a glossary or objection page where the term comes up, one product page (the in-context mention), and the closing CTA.
- **Links in:** the hub's body links to every post in its cluster (the hub refreshes in section 6 add these), and at least one non-blog page links in: the matching glossary entry, objection page, persona page or the prospecting calculator.
- **Glossary and objection pages** get a "related reading" link to the posts that use their term (for example, the listing appointment glossary links to posts 19 and 23; the expired listing glossary links to posts 2 and 38).
- **Pending links:** before writing, check `docs/content/pending-internal-links.md` and restore any back-links waiting for that slug.

---

## 9. Style

- **Voice:** plain, practical, agent to agent. Full sentences that read like an experienced colleague explaining something, never tagline fragments.
- **Brand rules (CLAUDE.md):**
  - "Sayso" spelling; no em dashes.
  - Agents, never reps; prospects, leads and clients, never deals.
  - "Calls", never "phone calls"; "cold call" only when the topic is cold calling.
  - Works for buyer and seller leads.
  - No free-trial language.
  - American spelling.
- **Opening:** answer the search in the first two or three sentences, then say what the post covers. No Sayso in the title, description or first two paragraphs.
- **Original material in every post:** at least one thing the ranking pages lack, such as annotated script branches, a worked example, a checklist or template, or sourced current prices.
- **Facts:** every price, number or program detail comes from a page checked during research, with the source in the brief. Prices are rechecked right before publishing.
- **Length:** as long as the topic needs to be more useful than the ranking pages, usually 1,200 to 2,500 words. No padding.
- **FAQ:** optional; include it when People Also Ask shows real questions the post has not already answered.
- **Images:** rotate the existing covers for now; new cover art can follow from `docs/content/blog-cover-image-prompts.md`.

---

## 10. The run

The whole program runs in one pass, start to finish, without stopping for approval. Order matters only where later work depends on earlier work.

| Step | Work |
|---|---|
| 1. Foundations | Skill upgrades and code fixes (section 2); remove the dialer and CRM posts and the wrong-meaning searches from the backlog; correct post 1 from the outside review |
| 2. New posts | Write all 22 new posts with the skill (coaching, scripts, leads and appointments, prospecting) |
| 3. Refreshes | Refresh all 16 existing posts and glossary pages |
| 4. Links pass | Hubs link to every post in their cluster; glossary, objection and persona pages link in; pending-links registry restored |
| 5. Quality pass | Brand-rule and fact check across every post, type check and full build |
| 6. Launch PR | One draft PR with all content, opened against `development` after PR #117 |

**Publish dates:** every new post and refresh carries the same launch date, so everything goes live together the moment the launch PR is merged. Posts already queued for October and November keep their own dates.

**Review:** one human read of the whole set in the launch PR before it is merged. Facts and prices carry their check date in each brief.

## 11. Measuring it

- Before publishing, save each URL's Search Console baseline (`scripts/pull_gsc.py` in the research folder).
- Check every post and refresh at 28 and 56 days after it is indexed: impressions, average position, clicks.
- Refresh the keyword map dashboard after the 56-day check and decide what to expand.

---

## 12. Defaults used for the run

Change any of these in review and the affected posts are updated.

1. **Post 35 (prospecting tools):** written about the types of tools, with no company named.
2. **Publishing:** one launch; every post carries the same date.
3. **Reviewer:** one human review of the full set in the launch PR; author stays "Sayso Team" until a named reviewer is chosen.
4. **Review load:** handled in that single review rather than daily.
5. **Mid-article block:** shown only on posts without the inline CTA card.
