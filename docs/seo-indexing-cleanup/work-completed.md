# SEO Indexing Cleanup — Work Completed Report

**Branch:** `chore/seo-indexing-cleanup` (PR #74, base `development`)
**Status:** Phases 1, 2, 3, 4, 6 executed. Phase 5 skipped (blocked on real terms). Phase 7 is manual/post-merge.
**Generated:** 2026-06-13
**Companion docs:** the plan is in [README.md](./README.md); the keyword map updates are in [../architecture/site-architecture.md](../architecture/site-architecture.md).

This report lists every change made so it can be checked back against the original "Discovered – currently not indexed" audit (59 URLs). Nothing here is merged yet; reviewer merges PR #74.

---

## 1. Commits (one per phase)

| Commit | Phase | Summary |
|---|---|---|
| `ae9f3ae` | Plan | Add the cleanup plan doc |
| `b2e91b4` | 1 | Sitemap & indexability hygiene |
| `e52784f` | 6 | Generation-prompt guardrails |
| `69e1094` | 2 | Contextual internal links |
| `265bd8e` | 3 | De-boilerplate objection/glossary/comparison copy |
| `e6717ef` | 4 | Keyword intent + cannibalization map, ISA cross-link |

**46 files changed, +492 / -74** vs `development`.

**Verification run after every phase:** `tsc --noEmit` clean, `next build` passes (117 static pages), internal link audit (`scripts/audit-all-links.ts`) shows no new broken links (only a pre-existing `/url/` placeholder in `types.ts` / `render-inline-markdown.tsx`, unrelated to this work).

---

## 2. Scorecard vs the original audit's 5 patterns

| # | Pattern from the audit | Status | How |
|---|---|---|---|
| 1 | Sitemap pollution (noindexed/utility URLs submitted) | ✅ Fixed | Phase 1: removed category pages + 3 utility pages from sitemap; deduped URLs |
| 2 | Programmatic clusters internally isolated (no inlinks) | ◑ Partially fixed | Phase 2: added 9 contextual inbound links where a natural anchor exists; some deferred to avoid stuffing (see §6). Phase 6 prevents recurrence |
| 3 | Template boilerplate inflating duplication | ✅ Fixed | Phase 3: de-boilerplated objection/glossary/comparison copy. Phase 6 prevents recurrence |
| 4 | Persona cannibalization (`/for/*` vs ad pages) | ✅ Fixed | Phase 1: noindexed the 4 ad pages. Phase 4: cannibalization map + ISA cross-link |
| 5 | Iframe-only utility pages (thin) | ◑ Partial | `/request-demo` noindexed (Phase 1); `/affiliate` + `/referral` deferred to Phase 5 (blocked on real program terms) |

---

## 3. Scorecard vs the original A / B / C buckets

Original triage: **19 A**, **33 B**, **7 C**.

### Bucket C (7) — should not be indexed → 7/7 addressed ✅
| URL | Action taken | Phase |
|---|---|---|
| /blog/category/appointment-setting/ | Removed from sitemap (page stays live, noindex) | 1 |
| /blog/category/cold-calling/ | Removed from sitemap | 1 |
| /blog/category/conversation-skills/ | Removed from sitemap | 1 |
| /blog/category/follow-up/ | Removed from sitemap | 1 |
| /request-demo/ | `noindex, follow` + removed from sitemap | 1 |
| /founderpricing/ | `noindex, follow` + removed from sitemap (TODO: 301→/pricing when promo ends) | 1 |
| /resources/ | `noindex, follow` + removed from sitemap | 1 |

### Bucket A (19) — fixable on-page → 15 fully/partly fixed, 4 deferred
| URL | Action taken | Status |
|---|---|---|
| /blog/real-estate-follow-up-scripts/ | +1 contextual inbound link (from why-prospects-dont-commit) | ✅ |
| /objections/just-looking/ | +2 inbound links; howSaysoHelps de-boilerplated; relatedBlogPost repointed | ✅ |
| /objections/just-send-listings/ | +1 inbound link; de-boilerplated; repointed | ✅ |
| /objections/bad-experience-with-agents/ | +1 inbound link; repointed | ✅ |
| /objections/my-spouse-needs-to-decide/ | +1 inbound link; de-boilerplated; repointed | ✅ |
| /objections/need-to-think-about-it/ | +1 inbound link; de-boilerplated; repointed | ✅ |
| /objections/want-to-sell-ourselves/ | +1 inbound link; de-boilerplated; repointed | ✅ |
| /objections/how-much-is-your-commission/ | de-boilerplated; repointed (already had 1 inlink; no natural 2nd anchor) | ◑ link deferred |
| /objections/market-is-bad/ | de-boilerplated (relatedBlogPost kept) | ◑ link deferred |
| /objections/price-too-high/ | de-boilerplated; repointed | ◑ link deferred |
| /objections/well-wait-for-spring/ | de-boilerplated; repointed | ◑ link deferred |
| /glossary/lead-nurturing/ | +1 inbound link; deeperLink set; de-boilerplated | ✅ |
| /glossary/drip-campaign/ | deeperLink set; de-boilerplated | ◑ prose inlink deferred |
| /glossary/door-knocking/ | de-boilerplated (in-person topic, no natural anchor in call posts) | ◑ link deferred |
| /glossary/sphere-of-influence/ | deeperLink set; de-boilerplated | ◑ prose inlink deferred |
| /for/isas/ | competing ad page `/isa/` noindexed; +cross-link from ISA glossary; documented in cannibalization map | ✅ |
| /for/team-leaders/ | competing ad pages `/broker/`, `/sales-leader/` noindexed; documented in map | ✅ |
| /affiliate/ | **Not done** — Phase 5 skipped (needs real commission/payout/eligibility terms) | ❌ deferred |
| /referral/ | **Not done** — Phase 5 skipped (needs real terms) | ❌ deferred |

"◑ link deferred" = the page got de-boilerplate/cross-link improvements, but a new in-body inbound link was intentionally NOT forced because no source page has a natural anchor. Forcing one would be keyword/link stuffing. These need either the relevant TODO supporting posts to be written, or a small approved content addition.

### Bucket B (33) — authority/time
Content intentionally left unchanged (these pages are genuinely fine). Many still received marginal improvements as a side effect: objection/glossary B pages were de-boilerplated (Phase 3), and a few received inbound links (Phase 2). Their indexing primarily awaits domain authority + the Phase 7 GSC requests. No B page was harmed.

---

## 4. Full change log by phase

### Phase 1 — Sitemap & indexability hygiene (`b2e91b4`)
- `app/sitemap.ts` — removed the `/blog/category/*` block; added `/founderpricing`, `/request-demo`, `/resources` to `EXCLUDED_PATHS`; removed now-unused `getCategories` import; **deduped output by URL** (was 93 entries with 11 duplicates → 82 unique; `/for/*`, `/products/*`, `/compare/*` child pages had been emitted twice).
- `lib/seo/metadata.ts` — `buildMetadata({ noindex })` now emits `index:false, follow:true` (was `nofollow`).
- `app/(content)/resources/page.tsx` — `noindex: true`.
- `app/request-demo/page.tsx`, `app/founderpricing/page.tsx` — `robots: { index:false, follow:true }`.
- `app/agent/page.tsx`, `app/isa/page.tsx`, `app/broker/page.tsx`, `app/sales-leader/page.tsx` — `robots: { index:false, follow:true }` (paid ad landers).

### Phase 6 — Generation guardrails (`e52784f`)
- `.claude/commands/slash-command-objection.md` and `.claude/commands/slash-command-glossary.md` — each gained:
  1. **"Output 4: Inbound Internal Links (Required)"** — new pages must add ≥2 contextual links to themselves from existing published pages (or register in `pending-internal-links.md`); sibling related-arrays and the hub do not count.
  2. **"No recycled boilerplate"** writing rule — grep the cluster dir before writing; no sentence may repeat across files; bans the stock "Tools like Sayso" / "coaches you in real time" openers (glossary keeps the required `[Book a demo]` link but must vary the sentence).
  3. Matching self-audit checklist items.
- No change to tone/voice of the prompts; additive only.

### Phase 2 — Internal links (`69e1094`)
9 contextual inbound links + 3 glossary `deeperLink`s:
- `content/blog/why-prospects-dont-commit.mdx` → `/objections/need-to-think-about-it/` and `/blog/real-estate-follow-up-scripts/`
- `content/blog/how-to-close-for-appointment.mdx` → `/objections/my-spouse-needs-to-decide/`
- `content/blog/how-to-talk-to-real-estate-leads.mdx` → `/objections/just-looking/`
- `content/blog/questions-to-ask-real-estate-leads.mdx` → `/objections/just-looking/`
- `content/blog/expired-listing-scripts.mdx` → `/objections/bad-experience-with-agents/`
- `content/blog/fsbo-scripts.mdx` → `/objections/want-to-sell-ourselves/`
- `content/blog/real-estate-follow-up-scripts.mdx` → `/objections/just-send-listings/` and `/glossary/lead-nurturing/`
- `lib/content/glossary/lead-nurturing.ts`, `drip-campaign.ts`, `sphere-of-influence.ts` — `deeperLink` added to the relevant pillar.

### Phase 3 — De-boilerplate (`265bd8e`) — 36 edits, no targeting/structure changes
- **12 objection `howSaysoHelps` rewrites** (removed the repeated "After the call, Sayso captures your notes and syncs them to your CRM" closer + "coaches you in real time" opener): call-me-later, how-much-is-your-commission, just-looking, just-send-listings, my-spouse-needs-to-decide, need-to-think-about-it, not-interested, not-ready-yet, want-to-sell-ourselves, market-is-bad, price-too-high, well-wait-for-spring. (already-have-an-agent, bad-experience-with-agents left as-is — already distinctive.)
- **13 objection `relatedBlogPost` repoints** off the single cold-calling guide to the most relevant published post (market-is-bad kept).
- **9 glossary closing sentences** varied (kept `[Call Notes]` and `[Book a demo]` links): circle-prospecting, cold-calling-real-estate, door-knocking, expired-listing, fsbo, isa-real-estate, lead-nurturing, listing-appointment, sphere-of-influence.
- **2 comparison free-trial FAQ** rewrites: sayso-vs-maverickre, sayso-vs-shilo (manual-coaching kept as canonical).

### Phase 4 — Cannibalization (`e6717ef`)
- `docs/architecture/site-architecture.md` — added a **Keyword Intent & Cannibalization Map** (intent ownership per overlapping topic with volumes from `sayso_keywords_volume.csv`: ISA, cold calling, expired listing, FSBO, lead nurturing; plus a watch list) and a **Paid Ad Landing Pages** note marking `/agent`, `/isa`, `/broker`, `/sales-leader` as noindex/outside the SEO map.
- `lib/content/glossary/isa-real-estate.ts` — `relatedPersona` repointed from `/for/solo-agents` to `/for/isas` (definitional → commercial cross-link).

---

## 5. What was NOT done (and why)

- **Phase 5 — `/affiliate/` + `/referral/` native content.** Skipped per instruction; blocked on real commission, payout, and eligibility terms. These two Bucket-A pages remain thin (iframe-only). Ready to execute once terms are provided.
- **Phase 7 — Google Search Console actions.** Manual, must run after PR #74 is merged and deployed: resubmit sitemap; request indexing on the 4 pillars then the newly-linked objection/glossary pages; re-inspect edited source pages; confirm noindex pages dropped from the index; track the "not indexed" count weekly.
- **Deferred inbound links (no natural anchor).** `price-too-high`, `market-is-bad`, `how-much-is-your-commission` (2nd link), `door-knocking`, plus prose inlinks for `drip-campaign` and `sphere-of-influence`. Add when the relevant supporting posts exist or via a small approved content addition.
- **`/seo-check` extension / keyword-gate / cadence rule.** Intentionally excluded from Phase 6 (scoped to the two guardrails only).

---

## 6. Net effect on the 59 URLs

- **7 Bucket-C URLs** no longer compete for crawl budget (out of the sitemap / noindex).
- **Sitemap reduced from 93 → 82 unique indexable URLs**, all of which Google *can* index.
- **~12 Bucket-A pages** now have new inbound links and/or de-boilerplated, distinct copy.
- **All objection + glossary + comparison pages** carry original, non-templated CTA/tie-in copy.
- **Persona cannibalization eliminated** at the source (ad pages noindexed) and documented.
- **Going forward**, new objection/glossary pages get inbound links and original copy by default (Phase 6 guardrails).

Remaining lift is primarily domain authority + time (Bucket B), the two deferred utility pages (Phase 5), and the manual GSC requests (Phase 7).
