# SEO Indexing Cleanup Plan

**Status:** Proposed (planning doc, no code changes yet)
**Owner:** _unassigned_
**Created:** 2026-06-13
**Branch:** `chore/seo-indexing-cleanup`

This plan turns the "Discovered – currently not indexed" audit (59 URLs in Google Search Console) into a prioritized, mergeable set of changes. It is the follow-on to [`docs/seo-next-steps.md`](../seo-next-steps.md), which already fixed the `www` canonical and redirect-error issues. That work is **not** repeated here.

---

## The one thing to understand first

Every URL in the GSC export shows `Last crawled: 1969-12-31`. That epoch placeholder means **Google has never actually crawled these pages.** They were discovered (mostly via the sitemap) and never made it off the crawl queue. So the problem is not "Google rejected these pages." It is:

1. We are spending a young domain's tiny crawl budget on URLs that **can never be indexed** (noindex pages in the sitemap) or **shouldn't be** (thin utility pages).
2. Many genuinely good pages have **no internal links from already-indexed content**, so Google has no signal that they're worth crawling.
3. Boilerplate in the programmatic templates makes unique pages **look** duplicate.

The other half of the cause is domain authority and backlinks. That is real, it is the dominant factor for the Bucket B pages below, and it is **out of scope here** because it's handled separately. We only fix what's in the code.

### Sanity check that this is mostly a queue/trust problem

Google has already indexed at least one page of every template type: 9 blog posts, the `cold-calling-real-estate` glossary term, `/compare/sayso-vs-shilo/`, all four `/products/*` subpages, `/for/solo-agents/`, `/pricing/`, and `/demo/`. No template is categorically blocked. That means the page-level differences in this plan (especially internal links) are the deciding factor, not a systemic technical fault.

---

## Triage summary

| Bucket | Meaning | Count | What we do |
|--------|---------|-------|------------|
| **A** | Fixable on-page (links, boilerplate, cannibalization, technical) | 19 | Fix in this cleanup. |
| **B** | Genuinely fine, waiting on domain trust + time | 33 | Leave content alone; only add inlinks / request indexing. |
| **C** | Shouldn't be indexed at all | 7 | Noindex, redirect, or drop from sitemap. |

### The five patterns driving the backlog

1. **Sitemap pollution.** All 4 `/blog/category/*` pages are `noindex, follow` but submitted in the sitemap. Low-value utility pages (`/founderpricing/`, `/request-demo/`, `/resources/`) are pulled into the sitemap automatically by footer nav.
2. **Programmatic clusters are internally isolated.** 10 of 14 objection pages and 4 of 9 glossary terms have zero or one contextual link from real content; their only inlinks are sibling "related" boxes and hub cards, which are themselves uncrawled.
3. **Template boilerplate inflates apparent duplication.** 11 of 14 objections open "How Sayso Helps" with the same "Tools like Sayso [verb] in real time…" sentence; all 14 point `relatedBlogPost` at the same guide; several `howSaysoHelps` fields are nearly empty.
4. **Persona cannibalization.** `/for/isas/` vs `/isa/`, `/for/team-leaders/` vs `/sales-leader/` and `/broker/`. The ad pages are indexable with self-canonicals and split the signal.
5. **Iframe-only utility pages.** `/affiliate/`, `/referral/`, `/contact/`, `/request-demo/` render a heading plus a Notion iframe; Google sees almost no page text.

---

## Work plan (phased, in priority order)

Each phase is a self-contained PR. Phase 1 is the highest-leverage and should ship first.

### Phase 1 — Sitemap & indexability hygiene (highest leverage, ~1 hour)

Goal: stop wasting crawl budget. Convert the sitemap from 59 competing URLs into a smaller set where every URL is one Google *can* index and has a reason to crawl.

- [ ] **Remove `/blog/category/*` from the sitemap.** They are `noindex` ([`app/blog/category/[slug]/page.tsx:42-45`](../../app/blog/category/%5Bslug%5D/page.tsx)) and can never index. Delete the category block in [`app/sitemap.ts:73-80`](../../app/sitemap.ts). (Keep the pages live; internal `follow` links still help crawl discovery.)
- [ ] **Noindex `/request-demo/`** ([`app/request-demo/page.tsx`](../../app/request-demo/page.tsx)) — duplicates `/demo/` (sitemap priority 0.9, already indexed). Keep live for the footer link; add `robots: { index: false, follow: true }`. Decision needed: noindex vs 301 to `/demo/` (see Open Questions).
- [ ] **Noindex `/founderpricing/`** ([`app/founderpricing/page.tsx`](../../app/founderpricing/page.tsx)) while the promo runs; overlaps `/pricing/`. Add a TODO to 301 → `/pricing/` when the program closes.
- [ ] **Noindex or de-sitemap `/resources/`** ([`app/(content)/resources/page.tsx`](../../app/%28content%29/resources/page.tsx)) — pure gateway that repeats the nav. Re-enable when it becomes a real library.
- [ ] **Noindex the four persona ad pages** `/isa/`, `/agent/`, `/broker/`, `/sales-leader/` (e.g. [`app/isa/page.tsx`](../../app/isa/page.tsx)). They exist for paid traffic and currently cannibalize the `/for/*` pages. This also closes Phase 4's cannibalization issue.
- [ ] Verify none of the above remain in the generated sitemap (`npm run build` then inspect `/sitemap.xml`, or run the extended `/seo-check` from Phase 6).

**Acceptance:** sitemap contains zero `noindex` URLs; `/founderpricing/`, `/request-demo/`, `/resources/` absent; the four ad pages return `noindex`.

### Phase 2 — Internal linking (the ~25 missing inlinks)

Goal: give every Bucket-A content page ≥2 contextual links from already-published pages, preferring indexed sources. These are plain in-body links / related-array entries, edited into the **source** pages.

**Objections** (add contextual links from the named indexed posts; also add to siblings' `relatedObjections`):

- [ ] `want-to-sell-ourselves` ← `fsbo-scripts.mdx` + `/glossary/fsbo` *(cheapest high-relevance fix: indexed FSBO post on the identical topic currently links other objections instead)*
- [ ] `need-to-think-about-it` ← `why-prospects-dont-commit.mdx` + `how-to-close-for-appointment.mdx` *(both literally discuss "let me think about it")*
- [ ] `my-spouse-needs-to-decide` ← `how-to-close-for-appointment.mdx` + `why-prospects-dont-commit.mdx` (weakest-linked page in the cluster)
- [ ] `price-too-high` ← `expired-listing-scripts.mdx` + Pulse product page
- [ ] `market-is-bad` ← `why-prospects-dont-commit.mdx` + Pulse product page
- [ ] `bad-experience-with-agents` ← `expired-listing-scripts.mdx` + `how-to-build-rapport-real-estate-calls.mdx`
- [ ] `just-looking` ← `how-to-talk-to-real-estate-leads.mdx` + `questions-to-ask-real-estate-leads.mdx`
- [ ] `just-send-listings` ← `real-estate-follow-up-scripts.mdx` + `how-to-talk-to-real-estate-leads.mdx`
- [ ] `how-much-is-your-commission` ← `expired-listing-scripts.mdx` + `/glossary/listing-appointment`

**Glossary** (link from the obvious pillar; also set a `deeperLink` where missing):

- [ ] `door-knocking` ← `real-estate-cold-calling-guide.mdx` + `how-to-start-a-real-estate-call.mdx`
- [ ] `drip-campaign` ← `real-estate-follow-up-scripts.mdx`; set `deeperLink` → that pillar
- [ ] `lead-nurturing` ← `real-estate-follow-up-scripts.mdx`; set `deeperLink` → that pillar; add `relatedPersona`
- [ ] `sphere-of-influence` ← `how-to-talk-to-real-estate-leads.mdx` or `circle-prospecting-scripts.mdx`; set a `deeperLink`

**Blog:**

- [ ] `real-estate-follow-up-scripts` (pillar, only 1 inlink): add the 5 pending back-links from [`docs/content/pending-internal-links.md`](../content/pending-internal-links.md) **now** as plain contextual links — don't wait for the TODO supporting posts. The follow-up cluster has zero published supporting posts, so the pillar is nearly orphaned.

**Acceptance:** every page in this list has ≥2 contextual inlinks from content pages (not nav, not hub cards, not sibling related-boxes). Run the new inlink check from Phase 6.

### Phase 3 — De-boilerplate the programmatic templates

Goal: kill the verbatim/near-verbatim repetition that makes unique pages look templated. Content work, not code.

- [ ] **Objections `howSaysoHelps`:** rewrite the 11 files that open with "Tools like Sayso [verb] in real time…" Each should reference the specific moment in *that* objection and run 60–100 words. Fill the near-empty ones: `market-is-bad`, `well-wait-for-spring` (effectively blank), `price-too-high` (8 words), `bad-experience-with-agents` (9), `not-interested` (10), `not-ready-yet` (13).
- [ ] **Objections `relatedBlogPost`:** all 14 currently point at `/blog/real-estate-cold-calling-guide`. Repoint each to its most relevant published post (≥6 have a closer match).
- [ ] **Glossary close:** vary the shared "[Book a demo](/demo/)" CTA sentence across the 10 terms.
- [ ] **Comparison FAQ:** the free-trial answer is verbatim-identical across all three comparison pages ([`lib/content/comparisons/`](../../lib/content/comparisons/)). Rewrite two of them.
- [ ] `well-wait-for-spring`: expand the 15-word opening paragraph.

**Acceptance:** grep each cluster directory for any sentence that appears in >1 file's Sayso-pitch or CTA → zero matches.

### Phase 4 — Cannibalization resolution

Mostly handled by Phase 1's noindex of the ad pages. Remaining:

- [ ] Add a cross-link from `/glossary/isa-real-estate` → `/for/isas/` (definitional → commercial intent, kept distinct).
- [ ] In [`docs/architecture/site-architecture.md`](../architecture/site-architecture.md), mark `/isa/`, `/agent/`, `/broker/`, `/sales-leader/` as **paid-only / noindex** rows, and add an **intent** column (definitional / how-to / commercial) so ISA, FSBO, cold-calling, and expired-listing topics can coexist deliberately with required cross-links.
- [ ] Watch `real-estate-phone-script-for-leads` vs the cold-calling pillar; if both index and compete, steer this post toward inbound-lead scripts.

### Phase 5 — Thin utility page treatment

- [ ] **`/affiliate/`** and **`/referral/`**: add 300+ words of native, crawlable content (commission/reward structure, who qualifies, payout terms, a short FAQ with `FAQPage` schema) so the page isn't just a Notion iframe. Migrate both to `buildMetadata()`.
- [ ] **`/contact/`**: minor — add the `| Sayso` suffix to the title; otherwise leave (thin is normal for contact).
- [ ] Copy-rule fixes surfaced during the audit: [`lib/content/hubs/for.ts`](../../lib/content/hubs/for.ts) intro contains an em dash; [`lib/content/hubs/resources.ts`](../../lib/content/hubs/resources.ts) says "closing more deals" (violates project writing rules #7 and #8).

### Phase 6 — Fix the generation system (prevent recurrence)

The prompts produce good prose but lack enforcement. Edits:

- [ ] **Mandatory back-link step** in [`.claude/skills/slash-command-objection.md`](../../.claude/skills/slash-command-objection.md) and [`slash-command-glossary.md`](../../.claude/skills/slash-command-glossary.md): before opening the PR, add ≥2 contextual links to the new page from existing published pages (edit those source files in the same PR; prefer indexed pages; otherwise register in `pending-internal-links.md`). These prompts currently only forbid linking *out* to unbuilt pages and never require links *in*.
- [ ] **Anti-boilerplate rules** in the objection + glossary skills: ban the stock openers ("Tools like Sayso", "Sayso coaches you in real time", "[Book a demo](/demo/)" as the only CTA); require a grep of the cluster dir for any reused Sayso-pitch/CTA sentence before commit; require `relatedBlogPost` to be the most relevant published post, not the default guide.
- [ ] **Keyword gate**: add step 0 to every generation skill — grep [`docs/architecture/site-architecture.md`](../architecture/site-architecture.md) for the target keyword and its head term; stop and flag if a live/planned URL already targets it.
- [ ] **Extend [`/seo-check`](../../.claude/skills/slash-command-seo-check.md)** with three checks:
  - sitemap-vs-noindex that actually inspects dynamic `generateMetadata` robots (the category-page case it currently misses);
  - "every sitemapped content URL has ≥2 content inlinks" (a ~40-line grep over `content/` and `lib/content/`);
  - "no two pages share a target keyword" against the architecture map.
- [ ] **Process rule**: cap new programmatic pages at 3–5/week, each shipping with its back-links and a same-day GSC URL Inspection submit. Bulk-publishing 14 objections + 10 glossary terms at once on a young domain is how this backlog formed.

### Phase 7 — Google Search Console actions (after each PR is live)

- [ ] Resubmit `https://www.asksayso.com/sitemap.xml` (Indexing → Sitemaps).
- [ ] URL-Inspect → Request Indexing for the highest-value uncrawled pages first: the pillars (`real-estate-cold-calling-guide`, `how-to-book-appointments-real-estate`, `how-to-talk-to-real-estate-leads`, `real-estate-follow-up-scripts`), then the objection/glossary pages whose inlinks were added in Phase 2.
- [ ] For any page whose links you edited, also request indexing on the **source** page so Google re-crawls and sees the new links.
- [ ] Timeline: expect 1–3 weeks per recrawl cycle. Track indexed count weekly.

---

## Go-forward publishing checklist (bake into every content PR)

1. **Word count** (enforced by script): blog supporting ≥1,200, pillar ≥2,500, objection/glossary ≥700 source words, comparisons ≥1,200.
2. **Inlinks**: ≥2 contextual links from existing published pages, edited into them in the same PR, ≥1 from an indexed page when available. Nav, hub cards, sibling related-boxes don't count.
3. **Outlinks**: per existing prompt rules (pillar 10–18; supporting 5–8 incl. pillar uplink in first 300 words; objection/glossary related arrays + a blog `deeperLink` when relevant).
4. **One keyword per page**, checked against `site-architecture.md` before generation; collisions resolved by intent differentiation + cross-link, or not built.
5. **No recycled sentences**: grep the cluster dir for your Sayso-pitch and CTA sentences before commit; zero verbatim matches.
6. **Metadata via `buildMetadata()` only**; title ≤60 chars with `| Sayso`; description 150–160 chars; correct schema type (BlogPosting / HowTo / DefinedTerm / WebPage+SoftwareApplication).
7. **Sitemap hygiene**: nothing noindexed, temporary, or paid-only enters the sitemap; run extended `/seo-check` in CI.
8. **On publish day**: request indexing for the new URL and any pages you edited links into.

---

## Open questions (need a decision before some tasks)

1. **`/request-demo/`**: noindex-and-keep, or 301 → `/demo/`? Depends on whether the Notion intake form is still a wanted flow distinct from Calendly booking.
2. **Persona ad pages**: confirm `/isa/`, `/agent/`, `/broker/`, `/sales-leader/` are paid-traffic landers (→ noindex is correct). If any is meant to rank organically, we instead consolidate it with its `/for/*` twin.
3. **`/resources/`**: noindex now and rebuild later, or invest now in making it a real resource library?

---

## Appendix — full per-URL triage

Words = unique source prose (rendered pages add ~100–150 template words). Inlinks = contextual links from content pages, excluding nav/sitemap/hub-cards/sibling-boxes; "+N sib" = sibling related-box links.

### Blog (15 posts + index)

| URL | Words | Inlinks | Bucket | Action |
|---|---|---|---|---|
| /blog/ | listing | nav | B | Wait |
| /blog/real-estate-cold-calling-guide/ | 2,885 | 31 | B | Request indexing (most-linked page, pure authority/time case) |
| /blog/how-to-book-appointments-real-estate/ | 4,156 | 4 | B | Request indexing |
| /blog/how-to-talk-to-real-estate-leads/ | 3,028 | 8 | B | Request indexing |
| /blog/real-estate-follow-up-scripts/ | 4,396 | 1 | **A** | Add 5 pending inlinks now (Phase 2) |
| /blog/how-to-build-rapport-real-estate-calls/ | 1,885 | 7 | B | Wait |
| /blog/how-to-close-for-appointment/ | 1,806 | 5 | B | Wait |
| /blog/how-to-get-same-day-appointments/ | 2,105 | 3 | B | Wait |
| /blog/how-to-guide-a-sales-conversation/ | 1,772 | 3 | B | Wait |
| /blog/how-to-keep-control-of-a-call/ | 1,839 | 5 | B | Wait |
| /blog/how-to-practice-real-estate-scripts/ | 1,752 | 1 | B | Optional: +2 links from indexed cold-calling posts |
| /blog/how-to-qualify-real-estate-leads/ | 1,749 | 8 | B | Wait |
| /blog/how-to-start-a-real-estate-call/ | 1,662 | 11 | B | Wait |
| /blog/questions-to-ask-real-estate-leads/ | 1,767 | 7 | B | Wait |
| /blog/real-estate-phone-script-for-leads/ | 1,572 | 2 | B | Wait; watch cannibalization vs pillar |
| /blog/why-prospects-dont-commit/ | 1,973 | 3 | B | Wait |

### Blog categories (4) — all `noindex` but sitemapped

| URL | Bucket | Action |
|---|---|---|
| /blog/category/appointment-setting/ | **C** | Remove from sitemap (Phase 1) |
| /blog/category/cold-calling/ | **C** | Remove from sitemap |
| /blog/category/conversation-skills/ | **C** | Remove from sitemap |
| /blog/category/follow-up/ | **C** | Remove from sitemap |

### Objections (14 + hub)

| URL | Words | Inlinks | Bucket | Action |
|---|---|---|---|---|
| /objections/ | 555 | nav + 12 | B | Wait |
| /objections/not-interested/ | 845 | 19 +8 sib | B | Wait (optional: expand Sayso section) |
| /objections/call-me-later/ | 833 | 14 +7 sib | B | Wait |
| /objections/not-ready-yet/ | 922 | 5 +10 sib | B | Wait (optional: expand) |
| /objections/already-have-an-agent/ | 763 | 3 +3 sib | B | Wait |
| /objections/just-looking/ | 861 | 1 +6 sib | **A** | +2 inlinks (Phase 2) |
| /objections/just-send-listings/ | 984 | 1 +1 sib | **A** | +2 inlinks; add to more siblings |
| /objections/how-much-is-your-commission/ | 869 | 1 +2 sib | **A** | +2 inlinks |
| /objections/bad-experience-with-agents/ | 831 | 0 +2 sib | **A** | +2 inlinks; rewrite empty Sayso section |
| /objections/market-is-bad/ | 952 | 0 +2 sib | **A** | +2 inlinks; fill empty Sayso section |
| /objections/my-spouse-needs-to-decide/ | 944 | 0 +1 sib | **A** | +inlinks (weakest in cluster) |
| /objections/need-to-think-about-it/ | 905 | 0 +8 sib | **A** | +2 inlinks |
| /objections/price-too-high/ | 897 | 0 +3 sib | **A** | +2 inlinks; fill Sayso section |
| /objections/want-to-sell-ourselves/ | 899 | 0 +2 sib | **A** | +2 inlinks (cheapest high-relevance fix) |
| /objections/well-wait-for-spring/ | 951 | 1 +3 sib | **A** | Expand opening + Sayso; +1 inlink |

### Glossary (9 + hub)

| URL | Words | Inlinks | Bucket | Action |
|---|---|---|---|---|
| /glossary/ | 303 | nav + 5 | B | Wait |
| /glossary/circle-prospecting/ | 694 | 2 +8 sib | B | Wait |
| /glossary/expired-listing/ | 820 | 2 +3 sib | B | Wait |
| /glossary/fsbo/ | 759 | 3 +2 sib | B | Wait |
| /glossary/isa-real-estate/ | 881 | 4 +4 sib | B | Wait; +cross-link to /for/isas/ |
| /glossary/listing-appointment/ | 831 | 2 +8 sib | B | Wait |
| /glossary/door-knocking/ | 774 | 0 +3 sib | **A** | +2 inlinks |
| /glossary/drip-campaign/ | 811 | 0 +3 sib | **A** | +inlink; set deeperLink |
| /glossary/lead-nurturing/ | 739 | 0 +8 sib | **A** | +inlink; set deeperLink + relatedPersona |
| /glossary/sphere-of-influence/ | 883 | 0 +3 sib | **A** | +inlink; set deeperLink |

### Compare / For / Products (7)

| URL | Words | Inlinks | Bucket | Action |
|---|---|---|---|---|
| /compare/ | ~122 | nav + 5 | B | Wait |
| /compare/sayso-vs-manual-coaching/ | 1,379 | 2 | B | Wait; vary shared FAQ (Phase 3) |
| /compare/sayso-vs-maverickre/ | 1,320 | 2 | B | Wait; vary shared FAQ |
| /for/ | ~196 | nav + many | B | Fix em-dash in intro (Phase 5) |
| /for/isas/ | 1,444 | 8 | **A** | Resolve via noindex of /isa/ (Phase 1/4) |
| /for/new-agents/ | 1,357 | 8 | B | Wait |
| /for/team-leaders/ | 1,397 | 8 | **A** | Resolve via noindex of /sales-leader/, /broker/ |
| /products/ | ~178 | nav + many | B | Wait |

### Utility pages (6)

| URL | Words | Bucket | Action |
|---|---|---|---|
| /affiliate/ | ~52 + iframe | **A** | Add 300+ native words + FAQ schema (Phase 5) |
| /referral/ | ~54 + iframe | **A** | Same |
| /contact/ | ~20 | B | Add `\| Sayso` to title; else leave |
| /request-demo/ | ~18 | **C** | Noindex or 301 → /demo/ (Phase 1) |
| /founderpricing/ | minimal | **C** | Noindex now; 301 → /pricing/ when promo ends |
| /resources/ | ~99 | **C** | Noindex / de-sitemap until it's a real library |

---

## First PR (do this one first)

The single highest-leverage change, all in Phase 1 + the cheapest Phase 2 links:

1. Remove the 4 category pages, `/founderpricing/`, `/request-demo/`, `/resources/` from the sitemap (7 wasted crawl slots).
2. Noindex the four persona ad pages.
3. Add the ~25 contextual inlinks named in Phase 2.
4. Resubmit the sitemap and request indexing on the four pillars.

That alone converts the sitemap from 59 competing URLs into a focused set where every URL is indexable and has a reason to be crawled.
