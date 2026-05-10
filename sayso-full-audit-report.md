# Sayso (asksayso.com) Full Audit Report

**Date:** May 8, 2026
**Frameworks Applied:** Julian's 14-Section Landing Page Framework, Sam Dunning's Money Keyword / SEO Framework
**Live Data Sources:** Google Search Console (scraped May 8, 2026), GTM workspace (scraped May 8, 2026)
**Primary Goal:** Get people to download Sayso

---

## Table of Contents

1. [Google Search Console: Real Data Analysis](#1-google-search-console-real-data-analysis)
2. [Landing Page Audit vs. Julian's 14-Section Framework](#2-landing-page-audit-vs-julians-14-section-framework)
3. [SEO Audit vs. Sam Dunning's Money Keyword Framework](#3-seo-audit-vs-sam-dunnings-money-keyword-framework)
4. [GTM and Tracking Findings](#4-gtm-and-tracking-findings)
5. [Action Items: Prioritized by Impact](#5-action-items-prioritized-by-impact)

---

## 1. Google Search Console: Real Data Analysis

### Performance Summary (Last 3 Months)

| Metric | Value |
|--------|-------|
| Total Clicks | 17 |
| Total Impressions | 163 |
| Average CTR | 10.4% |
| Average Position | 6.6 |

**What this means:** 17 clicks and 163 impressions over 3 months is essentially zero organic traffic. For context, a site with healthy SEO might expect 1,000+ impressions per day. The 10.4% CTR is actually good when people do see the site, but nobody is seeing it.

**Important context:** The sitemap was submitted April 18, 2026 and first read April 21, 2026. This site is approximately 3 weeks old from Google's perspective. Many of these numbers will improve naturally, but only if the right content and structure is in place.

---

### Top Queries (All Impressions, Last 3 Months)

| Query | Clicks | Impressions | CTR | Position |
|-------|--------|-------------|-----|----------|
| sayso | 0 | 13 | 0% | 5.7 |
| sayso.ai | 0 | 2 | 0% | 34.0 |
| expired listing script | 0 | 2 | 0% | 39.5 |
| expired listing scripts | 0 | 2 | 0% | 41.5 |
| ask sage, inc. | 0 | 1 | 0% | 1.0 |
| sayso ai | 0 | 1 | 0% | 6.0 |
| sayso reviews | 0 | 1 | 0% | 6.0 |
| sayso says tour | 0 | 1 | 0% | 6.0 |
| saysosayso | 0 | 1 | 0% | 11.0 |
| text for expired listings | 0 | 1 | 0% | 20.0 |
| expired listings calls | 0 | 1 | 0% | 33.0 |
| expired listings scripts | 0 | 1 | 0% | 37.0 |

**Critical finding: Every single query is either a brand name search or buried on page 4+.**

- Branded queries (sayso, sayso.ai, sayso ai, sayso reviews): These are people who already know you exist. They don't represent new demand discovery.
- "Expired listing script" family at positions 39-41: This is the only non-branded category showing up at all, and it's completely off the first two pages. These pages exist in the sitemap but have no domain authority to rank.
- "Ask sage, inc." at position 1: This is a different company - likely a brand confusion artifact.
- There are zero impressions for any real estate agent pain point terms (e.g., "prospecting call app", "real estate objection handler", "appointment booking for real estate agents").

**The site is invisible for any query a potential customer would type who doesn't already know Sayso exists.**

---

### Index Coverage

- **Errors:** 8 pages with indexing errors
- **Valid pages:** Not captured (requires clicking into the report)
- **Sitemap:** https://www.asksayso.com/sitemap.xml - 73 pages submitted, status: Success, last read April 21, 2026

The 8 errors need to be investigated directly in GSC. Common causes: 404s from redirected URLs, blocked by robots.txt, server errors on specific pages.

---

### External Backlinks

The links report shows only 3 external sites linking in:
- jackdrechsler.com (founder's personal site)
- rocketreach.co (public profile directory)
- skool.com (community platform)

**There are zero authoritative SEO backlinks pointing to asksayso.com.** No industry publications, no real estate tech blogs, no tool comparison sites, no partner sites. This is the single biggest reason the site can't rank for competitive terms.

---

### Core Web Vitals

Both mobile and desktop show "Not enough usage data in the last 90 days for this device type."

This is a data threshold issue. Google needs approximately 1,000+ real Chrome user visits to generate Core Web Vitals field data. The fact that this threshold hasn't been met is itself a data point: the site has very low real-user traffic.

Until traffic increases, use PageSpeed Insights (lab data) to monitor CWV performance.

---

### Manual Actions and Security

**Manual Actions: None.** No Google penalties. Clean slate.

---

## 2. Landing Page Audit vs. Julian's 14-Section Framework

### Overview of Current Page Structure

| Section | Component | Present? |
|---------|-----------|---------|
| HeroWithVideo | H1, tagline, 3 logos, Download CTA | Yes |
| TestimonialsSection | 1 testimonial (Alejandro, 12x stat, video) | Partial |
| PainPointPanel | "Without SaySo..." - 2 comic image panels | Partial |
| TransformationSection | "With SaySo, You're Unstoppable" + 4 metric cards | Partial |
| ThreeStepsSection | 3-step how-it-works | Yes |
| Footer | Links, CTA | Yes |

---

### Section-by-Section Scorecard Against Julian's Framework

#### Section 1: Niche - FAILING

**What Julian requires:** The H1 must trigger a binary decision. Either you want this or you don't, and you leave. It must be a tangible outcome statement, not brand language.

**Current H1:** "Win the Moment"

**Why it fails:**
- Does not state who it's for (real estate agents)
- Does not state the outcome (booked appointments)
- Does not state what type of product this is (live call coaching app)
- Any product in any industry could use this headline
- Fails the 6-word-or-less clarity test

Julian's rule: "In three or four words, you wanna be able to tell people what niche your product is in. If you can't say what your product is in six words or less, then you maybe don't know what your product is about yet or who it's for."

The **tagline** below the H1 ("Real-time guidance during prospecting calls to help agents handle objections, ask better questions, book more appointments, and automatically capture call notes in their CRM") is doing far more work than the headline. It should be elevated or merged into the H1.

**Julian's H1 formula:** Specific Action + Desirable Outcome + [Time/Effort] + Objection Handled

**Example rewrites to consider:**
- "Book More Appointments from Your Prospecting Calls, Without Blanking on Objections"
- "Real-Time Coaching for Real Estate Agents Who Want to Turn More Calls Into Meetings"
- "Never Lose a Prospecting Call Again: Live Guidance That Keeps Agents on Track"

---

#### Section 2: Main Offer - PARTIAL

**What Julian requires:** 4 pieces: (1) what type of product is this, (2) credibility, (3) the problem, (4) the solution and outcome. This should be a compressed version of the entire value proposition.

**Current state:** The tagline describes the product functionality. The 3 logos (eXp Realty, Anderson Group, Olaf) provide some credibility. But the outcome is still fuzzy ("book more appointments" is generic).

**What's missing:**
- The main offer doesn't have a specific, tangible outcome with a number ("2x more appointments", "handle 9 out of 10 objections without losing your place")
- No credibility statement ("Trusted by X agents" or "Used on 10,000+ prospecting calls")
- The problem isn't stated in the hero - it goes straight to solution

---

#### Section 3: Who It's For - MISSING

**What Julian requires:** Three audience types addressed explicitly:
- The Dreamer: wants to get better but doesn't know how to start
- The Wanderer: tried scripts, training, other tools, got lost
- The Doer: already grinding calls but not booking enough appointments

**Current state:** This section does not exist anywhere on the page.

**Why it matters:** Without this section, visitors who don't self-identify as the perfect customer bounce. The dreamer needs permission to read on. The wanderer needs to know this is different from what they already tried. The doer needs to know this will unlock the next level.

---

#### Section 4: Testimonials - PARTIAL (1 of dozens needed)

**What Julian requires:** Quotes, video, and long-form success stories. "You don't want two or three. You want dozens, if not hundreds."

**Current state:** 1 video testimonial from Alejandro Barrera (Anderson Real Estate Group, eXp Long Beach) with the 12x stat. This is genuinely strong social proof: a real person, a specific number, a video. The problem is there's only one.

**What's missing:**
- At least 5-10 more written testimonials from other agents
- Testimonials representing different use cases (ISAs, team leads, solo agents)
- A written "success story" case study format
- Testimonials are shown before the pain points section (Julian's order: niche, offer, who it's for, THEN testimonials)

---

#### Section 5: Pain Points - PARTIAL (images only, no text)

**What Julian requires:** A list of the 3-5 most urgent problems your target customer faces, made tangible with specific language that makes the reader say "that's me."

**Current state:** Two comic-style image panels under "Without SaySo..." The images are:
- `without_sayso_part_1.jpg`: alt text says "Agent freezes on a call without SaySo"
- `without_sayso_part_2.png`: alt text says "Missed questions, missed appointments, missed revenue without SaySo"

**Problems with this approach:**
1. It's entirely image-based. No text copy means no SEO value and no impact for visitors with slow connections or images disabled.
2. The pain isn't verbalized in Julian's language: name the specific fear, name the consequence. "You're mid-call. The prospect raises an objection you've heard a hundred times. Your mind goes blank. You stumble. They sense it. The call ends. No appointment."
3. Only 2 pain points are shown. There are likely 3-5 high-potency pains worth stating.

---

#### Section 6: Benefits Unlocked - PARTIAL (vague)

**What Julian requires:** Headers that are skimmable and state either "X problem is gone" or "Y outcome is unlocked." Tangible, specific, not generic.

**Current state:** 4 metric cards in TransformationSection:
- "More Appointments" - vague
- "Better Conversations" - vague
- "Automatic Notes" - specific and clear
- "Works With Your Tech" - specific and clear

**The first two fail Julian's tangibility test.** Every sales tool on earth promises "more appointments" and "better conversations." These headers need numbers or specifics: "2x more appointments from the same call list" or "Handle every objection without losing your place in the conversation."

The 12x stat from Alejandro's testimonial should be living here as the anchor number.

---

#### Section 7: How It Works - PRESENT

The ThreeStepsSection is the strongest section on the page:
1. Launch Coach - Turn Sayso on while making calls
2. Stay in Control - Shows what to say, organizes notes live
3. Win The Moment - Helps earn the meeting at the right moment

This section is clear, visual, and walks through the exact customer action. The only improvement is more specificity in step 2 ("Sayso shows you what to say" - what does it actually show? A script? A prompt? A suggestion bubble?).

---

#### Section 8: Credibility / Founder Story - MISSING

**What Julian requires:** Who built this, how long they've been in the industry, what credibility or achievements they have, their transformation story (zero to hero).

**Current state:** Zero. No founder section exists anywhere on the landing page.

**Why it matters:** For a product asking agents to use real-time AI during their most important professional activity (live calls with prospects), trust in the creator matters. Who built this? Have they been in real estate? Do they understand what it feels like to freeze on a call?

---

#### Section 9: What You Get (Sneak Peek / Features) - MISSING

**What Julian requires:** A tangible list of what the customer receives - the specific features, the specific capabilities, what they'll have access to.

**Current state:** The hero has a product demo (ProductShowcaseDesktop), but there's no dedicated features section that lists what Sayso actually includes.

What the page doesn't answer: Does this work with any dialer? What does the coaching prompt look like? Does it transcribe calls? Does it connect to your CRM automatically? How does it know what to suggest?

The "Works with existing dialer or CRM!" badge in the hero hints at a common question but doesn't answer it. A dedicated "What you get" or "Features" section would handle this.

---

#### Section 10: Pricing - MISSING

**What Julian requires:** Show price only after recapping everything the customer gets. "You always wanna repeat the offer stack before dropping the price."

**Current state:** No pricing on the page at all. CTAs go to a download flow or demo calendar. Visitors have no idea if this costs $20/month or $500/month.

**The risk:** Many visitors will assume an enterprise price point and leave. The "Book a Demo" CTA signals a sales process, which signals cost, which signals hesitation for agents who just want to try something quickly.

---

#### Section 11: FAQ - MISSING

**What Julian requires:** The 5 most common questions - typically: how much does it cost, how much time does it take, is it for my specific situation, can I get a refund, how long until I see results.

**Current state:** No FAQ. The page doesn't answer: "Does this record my calls?" "Will this distract me while I'm on a call?" "What CRMs does it work with?" "What dialers are supported?" "Is there a free trial?" "How long is the setup?"

---

#### Sections 12-14: Refund Policy, Final CTAs - PARTIAL

CTAs exist (Download Sayso, Book a Demo) but there's no risk reversal. No "free trial," no "no credit card required," no money-back guarantee language. For a product asking agents to trust it on live calls, lowering the perceived risk of trying it would increase conversion.

---

### Summary Score

| Category | Score |
|----------|-------|
| Niche / H1 | 2/10 |
| Main Offer | 5/10 |
| Who It's For | 0/10 |
| Testimonials | 4/10 |
| Pain Points | 3/10 |
| Benefits Unlocked | 5/10 |
| How It Works | 8/10 |
| Credibility / Founder | 0/10 |
| What You Get / Features | 2/10 |
| Pricing | 0/10 |
| FAQ | 0/10 |
| Risk Reversal | 1/10 |
| **Overall** | **3/10** |

---

## 3. SEO Audit vs. Sam Dunning's Money Keyword Framework

### The Fundamental Problem: Zero Non-Branded Organic Traffic

The GSC data confirms what Sam Dunning would call being caught in the "traffic trap" - except in reverse. The site has no traffic trap because it has no traffic at all from non-branded searches.

All 12 visible search queries are branded (someone searching "sayso") or deeply buried non-branded terms (pages 4-5). This means:

1. The site's SEO is not generating any new demand discovery
2. Every visitor who finds the site through search already knew Sayso existed
3. The content strategy has not yet produced pages that rank for purchase-intent keywords

---

### Sam's Money Keyword Matrix Applied to Sayso

Sam's framework: build a matrix of (1) ways customers refer to your solution, (2) industries you serve, (3) competitors that come up on sales calls, (4) jobs-to-be-done / struggling moments.

#### Column 1: Ways Customers Refer to Your Solution
- Real estate prospecting app
- Call coaching software for real estate
- AI sales coach for agents
- Real estate objection handler
- Prospecting call assistant
- Live call guidance for agents
- Real estate appointment setting tool

#### Column 2: Industries / Niches You've Sold Into
- eXp Realty agents
- Real estate teams
- ISAs (Inside Sales Agents) for real estate
- Real estate brokerages
- Solo real estate agents doing cold prospecting

#### Column 3: Competitors That Come Up on Sales Calls
Based on the space, likely: Follow Up Boss (CRM with calling), LionDesk, Mojo Dialer, REDX, Vulcan7, SalesRabbit, Lofty/Chime
*(Verify this list with your sales team - these are the names that should be in your comparison pages)*

#### Column 4: Struggling Moments / Jobs to Be Done
- "How to handle real estate objections on the phone"
- "Expired listing script for real estate agents"
- "How to book more appointments from cold calls"
- "Real estate prospecting call tracker"
- "What to say when a seller says they're not ready"
- "How to overcome the 'I have an agent' objection"

---

### Current SEO Infrastructure Assessment

**What exists in the sitemap (73 pages submitted):**
- Blog posts (18+ articles)
- /comparisons/ pages
- /for/ pages (use case targeting)
- /products/ pages
- /objections/ pages
- /glossary/ pages

This is the right structure. The problem is the site is only 3 weeks old in Google's index and has no external authority pointing to it.

**What's working (barely):**
- "Expired listing script" family is showing at positions 39-41. This is the first sign that the objection/script content is in the right territory. With 3-6 months of aging and a few backlinks, these could reach page 1.

**What's not working:**
- No impressions at all for prospecting tool terms, AI coaching terms, or appointment booking terms
- No visibility for any comparison queries (alternatives, vs, reviews)
- The domain has no external authority (only personal and directory links)

---

### The Category Demand Problem

Sam's warning is relevant here: "If you're in a new or emerging category where people don't know your solution exists... SEO is a bit of a tricky beast."

"Real estate prospecting call coaching app" is a very new category. Agents don't search for this by name because they don't know this type of product exists. This means:

1. **Direct category keywords will have low search volume.** Don't expect thousands of monthly searches for "real estate call coaching software." Start with Sam's bottom-of-funnel strategy and work up.

2. **Pain-point keywords are your entry point.** "How to handle expired listing objections," "real estate cold calling tips," "what to say on prospecting calls" - agents search these. If you rank for these, you introduce them to Sayso at the exact moment of need.

3. **Competitor comparison pages are your fastest path to new user discovery.** Agents use Mojo Dialer, REDX, Vulcan7, Follow Up Boss. They search "[product] alternatives" when frustrated. A page titled "Best Alternatives to Mojo Dialer for Real Estate Agents in 2026" positions Sayso as the answer to their frustration.

---

### Backlink Situation: Critical Gap

The links report shows 3 external sites linking in. Sam's framework is clear: without backlinks from authoritative sites in your niche, competitive keywords cannot rank.

**Fastest backlink acquisition opportunities:**
1. Get listed on real estate tech resource pages (Inman, The Close, RealTrends)
2. Get listed on "best real estate apps" listicles (these are Sam's "external listicle" strategy)
3. Partner with real estate coaching programs for guest content or tool features
4. eXp Realty has a massive agent community - leverage the existing eXp relationship for content or community features
5. Podcast appearances on real estate agent-focused shows (ListenNotes strategy Sam describes)

---

## 4. GTM and Tracking Findings

### What Was Found in GTM Workspace (GTM-P5WG8HHB)

| Item | Count | Notes |
|------|-------|-------|
| Published tags | 1 | "cHTML - YouTube Script" (Custom HTML, All Pages) |
| Triggers | 4 | All Clicks, All Form Submissions, All Link Clicks, All YouTube Videos |
| Associated tags per trigger | 0 | None of the 4 triggers have any tags attached |
| Unpublished workspace changes | 11 | Sitting in draft for 7+ months |
| Conversion tracking tags | 0 | Completely absent |
| GA4 event tracking | Unknown | No GA4 event tags visible in published workspace |

### The Core Problem: You Are Flying Blind

There is no conversion tracking on this site. The "Download Sayso" button is the primary CTA and the entire reason this landing page exists. There is no GTM tag tracking when it's clicked. There is no GA4 event recorded when someone downloads. You have no data on:

- How many people click "Download Sayso"
- What percentage of page visitors click the CTA (conversion rate)
- Which sections of the page people scroll past before clicking
- Whether desktop or mobile converts better
- Whether people from Google search convert better than direct visitors

This makes every landing page optimization decision a guess.

### The 11 Unpublished Changes

There are 11 changes sitting unpublished in the GTM workspace. These were set up 7+ months ago and never published. Before adding any new tags, you need to audit what these 11 changes are. Publishing unknown draft changes without reviewing them could either (a) break existing tracking or (b) accidentally fire duplicate tags.

---

## 5. Action Items: Prioritized by Impact

### Tier 1: Fix Within 7 Days (Tracking and Data)

These items are blocking your ability to make any data-informed decisions about the site.

---

**Action 1.1: Audit the 11 GTM Draft Changes**
- Log into tagmanager.google.com
- Open the Default Workspace for GTM-P5WG8HHB
- Review every one of the 11 unpublished changes
- Delete anything outdated or redundant
- Determine if any of them are safe to publish

**Action 1.2: Set Up Conversion Tracking in GTM**

Add these tags to GTM and publish:
1. **GA4 Configuration Tag** - verify the Measurement ID matches your GA4 property
2. **GA4 Event: download_cta_click** - fires when the "Download Sayso" button is clicked
   - Trigger: Click - Button text contains "Download Sayso" or element ID `cta-download-hero`
3. **GA4 Event: demo_book_click** - fires when "Book a Demo" is clicked
4. **GA4 Event: scroll_depth** - fires at 25%, 50%, 75%, 90% page scroll
5. Mark `download_cta_click` and `demo_book_click` as Key Events in GA4

**Action 1.3: Verify GA4 Is Receiving Data**
- Open GA4 > Admin > DebugView
- Visit asksayso.com in a browser
- Click "Download Sayso"
- Confirm the event appears in DebugView within 30 seconds
- If it doesn't, the GA4 measurement ID or GTM tag is misconfigured

**Action 1.4: Fix the 8 GSC Index Errors**
- Open Google Search Console > Pages > Error
- Identify what the 8 errors are (likely 404s, redirect chains, or crawl errors)
- Fix each one (redirect broken URLs, fix server errors, update internal links)
- Request re-indexing after fixing

---

### Tier 2: Landing Page Rewrites (Do This Month)

These are the highest-conversion-impact changes you can make to the page itself.

---

**Action 2.1: Rewrite the H1**

The current H1 "Win the Moment" needs to be replaced with a tangible outcome statement.

Recommended new H1:
> "Book More Appointments from Your Prospecting Calls"

With a subheadline:
> "Real-time coaching during live calls helps agents handle objections, stay on track, and automatically log notes in your CRM."

This states: what product it is (coaching), who it's for (agents), what it does (handle objections), what the outcome is (book more appointments), and the key feature (automatic notes).

---

**Action 2.2: Replace Vague Benefit Cards with Specific Outcomes**

In the TransformationSection, update the 4 metric cards:

| Current (Vague) | Replace With (Specific) |
|-----------------|------------------------|
| "More Appointments" | "More Appointments Booked" + "Alejandro: 12x more efficient at booking appointments - or your own stat" |
| "Better Conversations" | "Handle Any Objection" + "Real-time prompts surface the right response before you stumble" |
| "Automatic Notes" | Keep as is - this is already clear |
| "Works With Your Tech" | Keep as is - this is already clear |

---

**Action 2.3: Add Text Copy to the PainPointPanel**

Under each comic panel, add 2-4 lines of copy that name the specific pain.

**Under Panel 1 (agent freezes):**
> "You're mid-call. The seller raises an objection. Your mind goes blank. You stumble. They sense it. The conversation dies. No appointment."

**Under Panel 2 (wasted opportunity):**
> "You follow up on that call later and realize you knew the right thing to say. But the moment had passed. That deal is gone."

---

**Action 2.4: Add a "Who It's For" Section**

Add a new section between TestimonialsSection and PainPointPanel. Three short blocks:

**Block 1 - The Dreamer:**
> "You want to prospect more but every call feels like starting from scratch. You know you could book more appointments if you just had more confidence on the call."

**Block 2 - The Wanderer:**
> "You've tried scripts. You've taken cold calling courses. Nothing sticks when you're live with a seller. The pressure makes everything you learned disappear."

**Block 3 - The Doer:**
> "You're already making calls every day. You're booking some appointments. But you know you're leaving deals on the table because a few objections still trip you up."

---

**Action 2.5: Add a FAQ Section**

Add before the final CTA. Minimum 6 questions:

1. **Does Sayso record my calls?** [answer]
2. **What dialers does Sayso work with?** [list the specific dialers]
3. **What CRMs does Sayso sync with?** [list the specific CRMs]
4. **Will this distract me while I'm on a live call?** [answer]
5. **How long does setup take?** [answer]
6. **Is there a free trial?** [answer]

---

**Action 2.6: Add a Founder/Credibility Section**

One paragraph, one photo. Who built Sayso, what problem they personally experienced, why they're the right person to solve it. Example structure:

> "[Name] spent [X] years in real estate / building sales tools. After watching hundreds of agents freeze on prospecting calls and lose deals they should have won, they built Sayso. [One sentence about the solution]. [One sentence about early results]."

---

**Action 2.7: Add Pricing to the Page**

Even if pricing is custom or team-based, add a Pricing section. Minimum:
- If it's a free trial: make that the hero CTA, not "Book a Demo"
- If it's subscription: show starting price with a comparison table
- If it's enterprise: explain the pricing model and set expectations before the demo

Visitors who have no idea what something costs will assume the worst and leave.

---

### Tier 3: SEO Content Strategy (Do This Quarter)

These items build the long-term organic traffic engine.

---

**Action 3.1: Fix the 8 GSC Indexing Errors**
(Also listed in Tier 1 - fix these immediately since they prevent pages from being indexed)

**Action 3.2: Audit Existing Content Quality**

The sitemap has 73 pages, but zero non-branded impressions. Likely explanation: the content is thin or the pages haven't been indexed long enough. For each page in /comparisons/, /for/, /products/, /objections/:
- Is it 800+ words?
- Does it include real product screenshots?
- Does it have a clear CTA to download Sayso?
- Does it answer the specific intent of the query it's targeting?
- Does it have internal links from other pages?

**Action 3.3: Build Out the "Expired Listing Script" Content**

The queries "expired listing script" and "expired listing scripts" are appearing at positions 39-41. This is the first sign of non-branded SEO traction. To move these to page 1:
- Make the page the most comprehensive expired listing script resource on the internet (1,500+ words, specific scripts, video, downloadable templates)
- Add internal links to that page from other pages on the site
- Get 2-3 backlinks pointing specifically to that URL
- This can rank on page 1 within 90 days per Sam's framework for low-difficulty intent terms

**Action 3.4: Build Competitor Comparison Pages**

Research what dialers and CRMs come up on every Sayso sales call. Build dedicated comparison pages for each one. Page title formula: "[Competitor] Alternative for Real Estate Agents Who Want to Book More Appointments"

These rank fast (Sam: within 90 days), drive bottom-of-funnel traffic, and now appear in LLM citations when people ask for product comparisons.

**Action 3.5: Get Listed on External Real Estate Tech Listicles**

Search Google for "best real estate apps 2026," "best tools for real estate agents," "top real estate prospecting tools." Make a list of every article on the first 2 pages. Reach out to each author requesting inclusion.

Sam's approach: "Saw your article on X. Nice work. I had a weird idea - would you be open to a quick chat?" Then offer a value exchange: inclusion on Sayso's resources page, co-authored content, or product trial access for their readers.

**Action 3.6: Pursue Podcast Appearances**

Real estate agent podcasts have audiences that are exactly Sayso's ICP. Search ListenNotes for top real estate agent podcasts (2%, 5% tier shows). Pitch appearances focused on: "Why agents freeze on objections and how to stop" or "The future of AI-assisted prospecting calls."

Each appearance generates a backlink from a relevant site, brand mentions that help LLM visibility, and direct lead flow from the audience.

---

### Summary Priority Matrix

| Priority | Action | Impact | Effort |
|----------|--------|--------|--------|
| P0 | Set up conversion tracking in GTM | Critical | Low |
| P0 | Verify GA4 is receiving data | Critical | Low |
| P0 | Fix 8 GSC indexing errors | High | Low |
| P1 | Rewrite H1 | High | Low |
| P1 | Add specific numbers to benefit cards | High | Low |
| P1 | Add text copy to pain point section | High | Low |
| P2 | Add "Who It's For" section | High | Medium |
| P2 | Add FAQ section | Medium | Low |
| P2 | Add Founder / Credibility section | Medium | Low |
| P2 | Add Pricing or pricing explanation | High | Medium |
| P3 | Audit + beef up existing SEO content | High | High |
| P3 | Build competitor comparison pages | High | Medium |
| P3 | Build "expired listing script" page to #1 | Medium | Medium |
| P3 | Get listed on external real estate tech listicles | High | Medium |
| P3 | Podcast appearances for backlinks | Medium | High |

---

*Report generated: May 8, 2026*
*GSC data scraped: May 8, 2026 via automated Playwright audit*
*Tool: `c:\Bussiness Ideas\google-audit\` - run `npm run audit:gsc` to refresh GSC data*
