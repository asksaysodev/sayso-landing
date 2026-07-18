# Sayso: SEO Initiatives Overview

**Prepared for:** External SEO consultant evaluation
**Site:** https://www.asksayso.com
**Business:** Sayso is a real-time call-coaching and prospecting assistant for residential real estate agents and teams. It listens during live prospecting calls and surfaces context, scripts, objection responses, and structured notes so agents book more appointments. Sold to solo agents, team leaders, new agents, and inside sales agents (ISAs), US-focused.
**Document date:** June 8, 2026
**Method:** Facts below were pulled directly from the production codebase (Next.js App Router source, sitemap/robots generators, JSON-LD builders, MDX content, and a keyword research file). Google Search Console figures are quoted from an internal audit dated May 8, 2026 and are explicitly labeled as such.


---

## 1. Executive Summary

**What Sayso is, honestly, in SEO terms:** a well-built, technically clean, content-rich site on a brand-new domain with effectively zero organic authority. The engineering is ahead of the results, which is normal for a site this young. The gap between "this site is well-made" and "this site gets traffic" is almost entirely domain age and backlinks, not on-page quality.

**Strengths**
- Modern, fast, statically generated Next.js stack with clean URL structure and trailing-slash consistency.
- A genuine topic-cluster content model: 4 pillar blog posts with 20 supporting posts, all interlinked, plus programmatic page layers (objections, glossary, comparisons, products, personas).
- Structured data is wired up per page type (Article, FAQ, HowTo, DefinedTerm, SoftwareApplication, WebPage, BreadcrumbList, Organization, SiteNavigation).
- Meta hygiene is centralized and enforced (single helper builds titles/descriptions/canonicals/OG with length warnings in dev).
- Keyword research is real and organized into 8 named clusters (~205 keywords with volume, difficulty, CPC, competition, and an opportunity score).
- No Google manual actions or penalties. Clean slate.

**The real reasons traffic is low (candid)**
- **Domain age.** Google first read the sitemap on April 21, 2026. From Google's perspective the site is only a couple of months old. Per the May 8 audit, GSC showed **17 clicks and 163 impressions over 3 months** — essentially zero.
- **Zero authoritative backlinks.** The May 8 audit found only 3 referring domains: the founder's personal site (jackdrechsler.com), a RocketReach profile, and a Skool community page. No industry, tech, or comparison-site links. This is the single biggest ranking blocker.
- **Visibility is brand-only.** Every query producing impressions was either branded ("sayso", "sayso ai", "sayso reviews") or buried at position 39-41 ("expired listing script" family). The site is invisible for any non-brand term a new customer would actually type.
- **Index coverage errors.** The May 8 audit noted 8 pages with indexing errors in GSC that were not yet diagnosed.
- **No first-party analytics confirmed in-repo.** GA4 / GTM / Meta Pixel are wired but environment-gated (see Section 11), so it cannot be verified from code that they are firing in production.

**Bottom line for the consultant conversation:** the content and technical foundation are above average for a startup. The growth lever is off-page (links, digital PR, partnerships) plus patience for indexation and authority to accrue. A consultant who leads with "you need a technical overhaul" is misreading the site; the honest priority is authority-building and link acquisition.

---

## 2. Technology & Architecture

- **Framework:** Next.js 14 (App Router) with React 18 and TypeScript.
- **Rendering:** Predominantly static site generation. Dynamic route segments (blog posts, glossary, objections, products, use-cases, comparisons) use `generateStaticParams`, so pages are pre-rendered to static HTML at build time. This is ideal for SEO crawlability and speed.
- **Styling:** Tailwind CSS 3, with Manrope and Bangers (Google Fonts via `next/font`, `display: swap`).
- **Content pipeline:** Blog posts are MDX (`next-mdx-remote`, `gray-matter`, `remark-gfm`, `rehype-slug`, `rehype-autolink-headings`, `reading-time`). Programmatic page content (objections, glossary, products, etc.) lives in typed TypeScript data modules under `lib/content/`, rendered by shared React page components under `components/pages/`.
- **Hosting:** Vercel (inferred from `@vercel/analytics` and `@vercel/speed-insights` integration; the analytics/CWV instrumentation is Vercel-native).
- **URL conventions:** `trailingSlash: true` is enforced globally, and canonicals are normalized to match. Permanent (301) redirects are configured for legacy paths, renamed routes (`/features/* → /products/*`), and deleted blog posts.
- **Image handling:** `next/image` is used widely (≈29 components) for automatic optimization; only one raw `<img>` remains. `sharp` is installed for build-time image processing.

---

## 3. Page Inventory (Indexable)

Counts are derived from the live sitemap generator and content loaders as of this document's date. Note the May 8 GSC reading recorded **73 URLs submitted** in the sitemap; the content has grown since, so the current generated count is slightly higher.

| Page type | Count | Indexed in sitemap | Notes |
|---|---|---|---|
| Homepage | 1 | Yes | priority 1.0 |
| Core / conversion pages | ~9 | Yes | demo, download, pricing, about, security, contact, request-demo, why-sayso, plus utility |
| Hub / category landing pages | 6 | Yes | /products, /for, /objections, /glossary, /resources, /blog |
| Product (feature) pages | 4 | Yes | cue, smart-capture, pulse, playbook |
| Solution / persona use-case pages (`/for/`) | 4 | Yes | solo-agents, team-leaders, new-agents, isas |
| Objection-handling pages (`/objections/`) | 14 | Yes | one per common seller/buyer objection |
| Glossary pages (`/glossary/`) | 10 | Yes | real estate prospecting terms |
| Blog posts | 24 | Yes | 4 pillars + 20 supporting |
| Blog category pages | 4 | In sitemap but `noindex` | see hygiene note below |

**Approximate total indexable URLs:** ~71 (excluding the 4 `noindex` category pages, which are still listed in the sitemap).

**Explicitly excluded / gated (not in sitemap):**
- `/privacy`, `/terms`, `/feedback`, `/paywall-preview`, `/ui` (excluded by design).
- `/integrations` and its one article (`follow-up-boss`) and `/case-studies` and its one entry (`example-team`) are built but **commented out / gated** pending real content.
- Standalone legacy persona pages (`/agent`, `/broker`, `/isa`, `/sales-leader`) and campaign/utility pages (`/affiliate`, `/referral`, `/founderpricing`, `/confirmation`, `/newsletter-confirmation`, `/export/*`) exist in the app but are not registered in nav and therefore are not in the sitemap. These should be audited for orphan/duplication risk (see Sections 8 and 13).

---

## 4. Landing-Page Layer (Methodology & Topic Selection)

**Important framing:** Sayso is a SaaS product, not a local/brick-and-mortar business, so there are **no geographic "location" pages** (no city/state landing pages). Treating the prompt's "location/landing page" section accurately: the programmatic landing-page layer is **intent- and persona-based**, not geo-based. It has three families:

1. **Persona / "Solutions" pages (`/for/`, 4 pages):** solo agents, team leaders, new agents, ISAs. Each targets a buyer segment and maps that segment's pain to product capabilities.
2. **Objection-handling pages (`/objections/`, 14 pages):** one page per real objection an agent hears on a call (e.g., "already have an agent", "just looking", "price too high", "we'll wait for spring"). These target bottom-of-funnel, high-intent "how do I respond to X" search behavior and double as product demonstrations.
3. **Glossary pages (`/glossary/`, 10 pages):** definitional terms (circle prospecting, FSBO, expired listing, ISA, sphere of influence, door knocking, drip campaign, lead nurturing, listing appointment, cold calling). Top-of-funnel, definition-intent capture with `DefinedTerm` schema.

**Methodology / how topics were selected:** topic selection is driven by the keyword research file (`sayso_keywords_volume.csv`), which organizes ~205 keywords into 8 named clusters (A-H). Each landing-page family maps to one or more clusters:
- Objection pages → cluster D (Objection handling, 24 keywords).
- Glossary pages → clusters B/C (Cold calling / prospecting; Scripts and lead types).
- Persona pages → cluster F (Personas and roles, 18 keywords).
- Comparison pages → cluster H (Competitors, brand, and feature, 24 keywords).
- Product pages → cluster A (Product category / software, 30 keywords).

Pages are written as original, structured editorial content (not spun templates): each has a unique SEO title/description, breadcrumb, page-type-specific schema, and internal links into the blog and product layers.

---

## 5. Product / Service Pages

Sayso markets four named product capabilities, each with its own page under `/products/` (plus a `/products` hub):

| Page | URL | Positioning |
|---|---|---|
| Cue | `/products/cue/` | Real-time, context-based coaching during the call |
| Smart Capture | `/products/smart-capture/` | Structured call notes captured automatically |
| Pulse | `/products/pulse/` | Live market analysis surfaced mid-call |
| Playbook | `/products/playbook/` | Custom scripts for every prospecting scenario |
| Pricing | `/pricing/` | Plans / conversion page |

Each product page emits `SoftwareApplication` + `BreadcrumbList` JSON-LD. An `/integrations/` layer exists in code (with a Follow Up Boss article) but is currently gated out of nav and sitemap.

---

## 6. Content / Blog Strategy

The blog runs a strict **pillar-and-cluster** model. There are **24 posts**: 4 pillar guides and 20 supporting posts, grouped into 4 topic clusters. Schema reinforces the structure: pillars emit `hasPart` referencing supporting posts; supporting posts emit `isPartOf` referencing their pillar.

**Cluster 1 — Cold Calling / Prospecting** (pillar: *Real Estate Cold Call Scripts: The Complete Guide for 2026*)
- real-estate-cold-calling-guide (pillar)
- expired-listing-scripts
- fsbo-scripts
- circle-prospecting-scripts
- how-to-practice-real-estate-scripts
- how-to-start-a-real-estate-call
- real-estate-phone-script-for-leads
- appointment-setting-script
- best-real-estate-call-coaching-software

**Cluster 2 — Appointment Setting** (pillar: *How to Book Appointments in Real Estate: 2026 Guide*)
- how-to-book-appointments-real-estate (pillar)
- how-many-times-ask-for-appointment
- how-to-close-for-appointment
- how-to-get-same-day-appointments
- why-prospects-dont-commit

**Cluster 3 — Conversation Skills** (pillar: *How to Talk to Real Estate Leads: The 2026 Playbook*)
- how-to-talk-to-real-estate-leads (pillar)
- how-to-build-rapport-real-estate-calls
- how-to-guide-a-sales-conversation
- how-to-improve-call-performance
- how-to-keep-control-of-a-call
- how-to-qualify-real-estate-leads
- questions-to-ask-real-estate-leads
- what-real-time-call-coaching-looks-like
- what-top-agents-say-on-calls

**Cluster 4 — Follow-Up** (pillar: *Real Estate Follow Up Scripts: The Complete Guide for 2026*)
- real-estate-follow-up-scripts (pillar) — **no supporting posts yet** (cluster is a stub; see gaps)

**Funnel logic:** glossary (definition/awareness) → blog (how-to/consideration) → objections and comparisons (decision) → product/pricing/demo (conversion). Pillars target the broad head term; supporting posts capture long-tail and question-intent queries and funnel link equity up to the pillar and across to product pages. Publishing cadence is roughly weekly (posts dated March through June 2026).

---

## 7. Keyword Strategy

Keyword architecture comes from `sayso_keywords_volume.csv` (~205 keywords) split into 8 strategic clusters:

| Cluster | Theme | Keywords | Example head terms (monthly volume) |
|---|---|---|---|
| A | Product category / software | 30 | conversation intelligence software (590), ai sales coaching (390), real estate ai tools (320) |
| B | Cold calling / prospecting | 20 | real estate cold calling (390), real estate prospecting (260) |
| C | Scripts and lead types | 41 | real estate cold calling scripts (390), expired listing scripts (260), real estate scripts (210) |
| D | Objection handling | 24 | (maps to the 14 objection pages) |
| E | Call skills and conversion | 25 | how to get listings (140), how to get more listings (140) |
| F | Personas and roles | 18 | real estate agent training (14,800), real estate isa (390) |
| G | Adjacent tools and category | 23 | redx (60,500), follow up boss (60,500), mojo dialer (9,900), vulcan7 (5,400) |
| H | Competitors, brand, and feature | 24 | sayso (8,100), shilo ai (320), maverickre (170), ai sales training (260) |

**Primary / secondary / question-intent architecture:**
- **Primary (head) terms** map to pillars and hub pages (e.g., "real estate cold calling scripts" → cold-calling pillar; "conversation intelligence software" → product category).
- **Secondary terms** map to supporting blog posts and persona/comparison pages.
- **Question-intent** ("how to start a real estate call", "how many times to ask for the appointment", "why prospects don't commit") map directly to supporting posts and are reinforced with FAQ schema.

**Honest read on the keyword set:** the highest-volume terms (redx, follow up boss at 60.5k; real estate agent training at 14.8k) sit in cluster G (adjacent/competitor tools) and F (training) — these are aspirational, high-difficulty, and mostly navigational toward other brands. The realistic near-term wins are the low-difficulty, lower-volume script/objection/question terms in clusters C, D, and E, where difficulty scores are frequently 0-10. The brand term "sayso" (8,100 volume, difficulty 4) is also contested by unrelated entities (the May 8 audit flagged "Ask Sage, Inc." brand confusion).

---

## 8. Technical SEO

**Structured data (schema)** — wired per page type via dedicated builders:
| Page type | Schema emitted |
|---|---|
| Site-wide (root layout) | Organization, ItemList/SiteNavigationElement |
| Blog post | BlogPosting (with hasPart/isPartOf), FAQPage (parsed from `## FAQ`), BreadcrumbList |
| Objection | HowTo (response framework) |
| Glossary | DefinedTerm (in a DefinedTermSet) |
| Product | SoftwareApplication + BreadcrumbList |
| Comparison | WebPage + SoftwareApplication |
| Persona (`/for/`) | WebPage + BreadcrumbList |
| FAQ component | FAQPage |

**Meta hygiene:** centralized `buildMetadata()` helper produces title, description, canonical (trailing-slash-normalized), Open Graph (1200×630 default OG image), and Twitter `summary_large_image` for every programmatic page. Dev-mode console warnings fire when titles exceed 60 chars or descriptions exceed 160. Root layout sets a global title template (`%s | Sayso`), `metadataBase`, favicons, and default OG. *(Note: this uses `|` as the title separator and avoids em dashes, consistent with house style.)*

**Canonical / OG:** canonicals are explicit and self-referential on programmatic pages; OG/Twitter present site-wide.

**Sitemap:** dynamically generated (`/sitemap.xml`) from nav registry + blog posts + category pages + all content loaders, with per-type priority and weekly change frequency. Excludes privacy/terms/feedback/paywall-preview/ui and the gated integrations/case-studies sections.

**Robots:** allows all, disallows `/api/`, `/feedback`, `/paywall-preview`, `/ui`; references the sitemap. Clean and conventional.

**Redirects:** 301s configured for `/features/* → /products/*`, legacy `/index.html`, an old `/demo-974294` path, and two deleted blog posts → comparison pages. Persona-page redirects (`/agent → /for/solo-agents`, etc.) are staged but commented out.

**Core Web Vitals / performance:** static generation + `next/image` + `next/font` with `swap` gives a strong performance baseline. **However**, the May 8 audit reported GSC showed *"not enough usage data"* for CWV on both mobile and desktop — a direct consequence of low real-user traffic, not a performance defect. Lab data (PageSpeed Insights) should be used until field data accumulates. `@vercel/speed-insights` is instrumented.

**Image optimization:** `next/image` across ~29 components; `sharp` installed; only one raw `<img>` remaining.

**Crawl / spam / hygiene issues to flag candidly:**
- **8 index-coverage errors** were reported in GSC (May 8) and have not been diagnosed in this review.
- **Conflicting signal on blog category pages:** they are emitted in the sitemap (priority 0.4) but carry `robots: noindex`. Including `noindex` URLs in a sitemap is a mild inconsistency worth cleaning up (either drop them from the sitemap or make them indexable).
- **Multiple third-party tracking scripts** load on every page (see Section 11) — worth auditing for performance/privacy and redundancy.
- **Orphaned/legacy pages** (`/agent`, `/broker`, `/isa`, `/sales-leader`, `/export/*`, campaign pages) exist outside nav and sitemap; confirm they are intentionally `noindex` or redirected to avoid thin-content/duplication signals.

---

## 9. AI Search / Answer-Engine Optimization (AEO)

- **`llms.txt` / `llms-full.txt`: NOT present.** This is a clear, easy gap. Adding an `llms.txt` that summarizes what Sayso is, its key pages, and product positioning would help AI answer engines extract accurate information.
- **Schema that AI engines can extract: strong.** FAQPage, HowTo, DefinedTerm, SoftwareApplication, and BreadcrumbList are exactly the structured formats LLM-based search surfaces favor. The objection pages (HowTo) and glossary pages (DefinedTerm) are particularly well-suited to being quoted in AI answers.
- **Content format is AEO-friendly:** question-intent post titles, explicit `## FAQ` sections parsed into FAQ schema, and definitional glossary entries align well with how answer engines pull extractive snippets.
- **Opportunity:** publish `llms.txt`, expand FAQ blocks across more page types, and ensure the Organization schema includes richer `description`/`sameAs` for entity recognition (currently LinkedIn + Instagram only).

---

## 10. Internal Linking

- **Topic-cluster interlinking** is the backbone: every supporting post links up to its pillar (and opens with an explicit "part of our complete guide" link); pillars reference supporting posts via schema and body links.
- **Cross-layer linking:** blog posts link into glossary terms (e.g., FSBO posts link to `/glossary/fsbo/`) and toward product/demo CTAs.
- **Global nav and footer** provide site-wide links from a centralized navigation registry (header: Home, Products, Solutions, Resources, Compare, About; footer: Products, Solutions, Resources, Company, plus more), which also feeds the sitemap and SiteNavigation schema, keeping nav, sitemap, and structured data in sync.
- **Breadcrumbs** on programmatic pages add hierarchical internal links and BreadcrumbList schema.
- A `check-blog-links` script exists for link validation.

This is a genuinely good internal-linking design. The limiting factor is **external** links into the site, not internal structure.

---

## 11. Analytics & Google Connections

| Tool | Status (from code) | Notes |
|---|---|---|
| Vercel Analytics | **Active** | `@vercel/analytics` mounted in root layout |
| Vercel Speed Insights | **Active** | `@vercel/speed-insights` mounted (CWV/RUM) |
| Google Tag Manager | **Conditional** | Loads only if `NEXT_PUBLIC_GTM_ID` env var is set; container ID is not in the repo. The May 8 audit referenced a live GTM workspace, so it is likely configured in production. |
| Meta (Facebook) Pixel | **Conditional** | Loads only if `NEXT_PUBLIC_META_PIXEL_ID` env var is set |
| GA4 | **Not directly in code** | No standalone GA4 snippet; if present, it is fired via GTM. Treat GA4 as "verify in GTM," not confirmed from source. |
| Google Search Console | **Connected** | Per May 8 audit: sitemap submitted April 18, first read April 21, 2026; performance and coverage data flowing |
| Google Business Profile | **N/A / not applicable** | Sayso is a SaaS product, not a local business |
| Bing Webmaster Tools | **Not verifiable from code** | No evidence either way; flag as "confirm" |
| Other third-party scripts | **Active** | Leadsy.ai visitor-identification tag, Vector.co pixel, Beehiiv newsletter attribution |

**Gaps / verify-with-owner:** confirm GA4 is actually firing (via GTM) and that conversion events (demo booked, download, request-demo) are tracked; confirm GTM and Meta Pixel env vars are populated in the production environment; confirm whether Bing Webmaster Tools is set up. *(Per the no-sensitive-data rule, no container IDs, pixel IDs, property IDs, or verification tokens are reproduced in this document, even where they appear in client-side code.)*

---

## 12. Off-Page / Authority Plan

This is the **highest-leverage area** and the site's biggest weakness.

- **Backlinks (critical):** the May 8 audit found only 3 referring domains, none authoritative. Priorities: digital PR in real estate / proptech publications, guest posts and expert quotes (HARO-style), partnerships with CRM/dialer ecosystems (Follow Up Boss, REDX, Vulcan7 adjacency is already mapped in cluster G), inclusion in "best real estate AI tools" roundups and software directories (G2, Capterra, Product Hunt), and comparison/alternative pages on third-party sites.
- **Brand entity / disambiguation:** the brand term "sayso" competes with unrelated entities ("Ask Sage, Inc." confusion was flagged). Strengthen entity signals: consistent NAP-style brand info, richer Organization schema, Crunchbase/LinkedIn/Wikipedia-style citations, and consistent "Sayso" + "asksayso.com" co-occurrence.
- **Local SEO:** **not applicable** — Sayso is a national SaaS product, not a local business, so Google Business Profile and citation-building are out of scope (the audience is real estate agents nationwide, but Sayso itself has no local service area to optimize).
- **Reviews / social proof:** software-directory reviews (G2/Capterra) double as authoritative backlinks and conversion assets.

---

## 13. Strengths, Gaps, and Questions for the Consultant

**Strengths to preserve**
- Clean, fast, statically generated architecture with disciplined URL/canonical/redirect hygiene.
- Mature topic-cluster content model with correct schema reinforcement.
- Centralized, enforced meta and sitemap generation (low risk of drift).
- Real, well-organized keyword research already mapped to page types.

**Gaps / weaknesses (a consultant will find these anyway)**
- **Authority:** ~3 referring domains, none authoritative — the core ranking blocker.
- **Domain age:** only weeks old in Google's eyes at last reading; results lag.
- **8 unresolved GSC index-coverage errors.**
- **No `llms.txt`** for AI answer engines.
- **Sitemap/noindex conflict** on blog category pages.
- **Follow-up cluster is a stub** (1 pillar, 0 supporting posts).
- **Gated/orphan pages** (integrations, case-studies, legacy persona pages, export pages) need an explicit index/redirect decision.
- **Conversion tracking not confirmed from source** (GA4 via GTM, event setup).
- **No confirmed Bing presence.**

**Good questions to ask the consultant (to evaluate them)**
1. Given the domain is new with ~3 backlinks, what is your 90-day vs 6-month plan, and how do you separate "indexation maturing" from "your work"?
2. What is your specific link-acquisition strategy for proptech/real estate, and roughly how many authoritative links per month do you target?
3. How would you resolve the "Sayso" brand-confusion / entity-disambiguation problem?
4. Which keyword clusters would you prioritize first, and why? (Listen for whether they pick the low-difficulty C/D/E terms over the vanity G/F head terms.)
5. How would you diagnose and clear the 8 index-coverage errors?
6. What's your approach to AI/answer-engine optimization (llms.txt, schema, extractive content)?
7. How will you instrument and report on conversions (demo, download), not just rankings/traffic?
8. What would you change about the existing topic-cluster structure, if anything? (A good answer is "little — focus on links.")
9. How do you measure ROI on this engagement, and what does success look like at 3, 6, and 12 months?

---

