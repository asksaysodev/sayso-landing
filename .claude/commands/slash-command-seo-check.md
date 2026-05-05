# /seo-check Slash Command

**Usage:** `/seo-check`

Run this before opening any PR that adds, removes, or modifies pages. It audits the site for SEO issues that would cause Google to drop pages from its index or report errors in Search Console.

Work through each phase in order. Report all findings at the end in a single consolidated summary with clear PASS / WARN / FAIL labels.

---

## PHASE 1: Broken Internal Links

Run the existing audit script:

```
npx tsx scripts/audit-all-links.ts
```

**Rules:**
- Any result with a broken URL is a **FAIL**. Do not open the PR until fixed.
- The only known false positives are `/url/` placeholder strings inside JSDoc comments in `lib/content/glossary/types.ts` and `lib/utils/render-inline-markdown.tsx`. Ignore those two occurrences only.
- Report the full list of broken URLs and which files reference them.

---

## PHASE 2: Canonical Tag Audit

Scan every `app/**/page.tsx` file. For each page, check whether it sets a canonical URL using one of the two approved patterns:

**Pattern A: `buildMetadata` helper (preferred):**
```ts
export const metadata = buildMetadata({ ..., path: '/your-path' });
```

**Pattern B: direct `metadata` export:**
```ts
export const metadata: Metadata = {
  alternates: { canonical: `${siteUrl}/your-path/` },
  ...
};
```

**Rules:**
- A page missing a canonical tag entirely is a **FAIL**.
- A page using a hardcoded string like `https://asksayso.com/...` instead of the `siteUrl` variable or `NEXT_PUBLIC_SITE_URL` env var is a **FAIL**. It bypasses the environment variable and will produce wrong canonicals in production.
- A page using `https://www.asksayso.com/...` hardcoded is also a **FAIL** for the same reason.
- Dynamic route pages (e.g., `[slug]/page.tsx`) that use `generateMetadata` and build canonical from a slug are fine as long as they use `siteUrl` or `buildMetadata`.
- Intentionally excluded pages (listed in `EXCLUDED_PATHS` in `app/sitemap.ts`) do not need a canonical. Note them but do not flag as FAIL.

---

## PHASE 3: Sitemap vs Noindex Consistency

Read `app/sitemap.ts` to get the full list of URLs it would emit. Read each corresponding page file to check its `robots` / `noindex` setting.

**Rules:**
- A page that is in the sitemap AND has `noindex: true` (or `robots: { index: false }`) is a **FAIL**. Google will see a contradiction and ignore the page.
- A page that is NOT in the sitemap but is also NOT noindexed is a **WARN**. It can be crawled but won't be submitted. Acceptable for utility pages, but flag it so the developer can decide intentionally.
- The following paths are intentionally excluded from the sitemap and are expected to be noindex or utility pages. Do not flag them as WARN:
  - `/privacy`, `/terms`, `/feedback`, `/paywall-preview`, `/ui`, `/integrations`, `/case-studies`

---

## PHASE 4: Removed Routes Without Redirects

Check `git diff main...HEAD` to identify any route files that have been deleted (i.e., `app/**/page.tsx` files removed in this branch).

For each deleted route, check `next.config.js` to see whether a `permanent: true` redirect exists pointing the old path to a valid destination.

**Rules:**
- A deleted route with no redirect is a **FAIL**. It creates a 404 that Google may have already indexed.
- A deleted route that has an existing redirect is a **PASS**.
- If the route was never publicly linked or submitted to Google (e.g., a brand-new page that was added and removed in the same branch), note it as **INFO** and skip.

---

## PHASE 5: New Pages Without Sitemap Inclusion

Check `git diff main...HEAD` for any newly added `app/**/page.tsx` files.

For each new page, verify it will appear in the sitemap output. A new page is included in the sitemap if:
- It is reachable via `getAllNavHrefs()` and not in `EXCLUDED_PATHS`, OR
- Its slug is returned by one of the dynamic content loaders (`getAllPostsMeta`, `getAllObjectionSlugs`, `getAllProductSlugs`, etc.), OR
- It is explicitly added as a static path in `sitemap.ts`

**Rules:**
- A new public-facing page that does not appear in the sitemap is a **WARN**. Google will only find it by crawling, not via sitemap submission, which slows indexing.
- A new utility or internal page (e.g., `/paywall-preview`) intentionally excluded is a **PASS**. Note why.

---

## PHASE 6: `robots.ts` Disallow Check

Read `app/robots.ts`. For any new page added in this branch, confirm it is not accidentally disallowed.

**Rules:**
- A new page whose path is blocked by a `disallow` rule in `robots.ts` is a **FAIL**. Googlebot cannot crawl it at all.
- Current disallowed paths for reference: `/api/`, `/feedback`, `/paywall-preview`, `/ui`

---

## Output Format

Report findings in this format:

```
## SEO Pre-PR Check

### Phase 1: Broken Internal Links
[PASS / FAIL]: [summary]

### Phase 2: Canonical Tags
[PASS / FAIL]: [summary, list any failures]

### Phase 3: Sitemap vs Noindex
[PASS / WARN / FAIL]: [summary]

### Phase 4: Removed Routes Without Redirects
[PASS / FAIL / N/A]: [summary]

### Phase 5: New Pages Without Sitemap Inclusion
[PASS / WARN / N/A]: [summary]

### Phase 6: robots.ts Disallow Check
[PASS / FAIL / N/A]: [summary]

---
Overall: [READY TO MERGE / NEEDS FIXES]

Blockers (must fix before PR): [list or "none"]
Warnings (review and decide): [list or "none"]
```

If all phases pass, confirm the PR is clear to push. If any phase fails, list exactly what needs to be fixed and in which file before the PR is opened.
