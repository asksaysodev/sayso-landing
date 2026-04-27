# Blog Publishing Plan

**Created:** 2026-04-19
**Owner:** Jack
**Status:** Proposed, pending dev implementation

This doc is the source of truth for how Sayso writes, reviews, and publishes blog posts going forward. Read this if you are writing a post, reviewing a post, or implementing the code changes that enable scheduled publishing.

---

## 1. Why We Are Changing Things

### Current state (as of 2026-04-19)

- 9 blog posts are live, all in the cold-calling cluster.
- 34 more posts are planned across 5 clusters. See [site-architecture.md](../architecture/site-architecture.md) for the full list and keyword targets.
- Today's publish workflow: write a post, open a PR, a teammate merges, and the post goes live the moment the PR lands on `main`.

### The problem

- 34 posts means 34 PRs over several months if we keep the current workflow.
- Every publish day requires a reviewer to be available on that day to merge.
- Hard to maintain a consistent Tuesday and Thursday cadence when each post is tied to a merge event.

### What we want

- Write posts in batches (5 to 10 at a time) when we have focused writing time.
- Merge a batch once. Posts release automatically on their scheduled dates.
- Consistent publishing cadence even when no new writing happens that week.

---

## 2. The System We Are Moving To

### Summary

Every blog MDX file has a `publishedAt` frontmatter field. Today that field only controls sort order on the blog index. We are going to use it to gate **visibility**: a post with a future `publishedAt` is invisible on the production site until that date arrives.

Once the code changes in section 3 are in place:

1. You write a batch of posts, each with a `publishedAt` dated to its target Tuesday or Thursday.
2. You open one PR for the whole batch.
3. After merge, the posts sit in the repo but are not visible on the site yet.
4. When each post's `publishedAt` date arrives, Next.js revalidation rebuilds the affected pages and the post appears on the site within one hour.

### Why this works

- Next.js ISR (Incremental Static Regeneration) rebuilds cached pages in the background on a schedule we configure.
- We gate visibility in the data layer (filter out future-dated posts in `getAllPosts()`), so the blog index, sitemap, RSS, and individual post routes all stay consistent.
- No external cron, no CMS, no GitHub Action scheduler. Just Next.js primitives.

---

## 3. Code Changes Required

Three files change. Estimated dev time: 30 minutes including manual verification.

### 3.1. Add the date filter in `lib/blog.ts`

In `getAllPosts()` (around line 87), add a filter that removes posts where `publishedAt` is in the future. **Important:** only apply this filter in production. Dev mode and Vercel preview deployments must continue to show every post (including future-dated ones) so writers and reviewers can see scheduled content.

```ts
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));
  const now = new Date();
  const isProduction = process.env.VERCEL_ENV === 'production';

  const posts = files
    .map((file) => parseMdxFile(path.join(BLOG_DIR, file)))
    .filter((p) => !isProduction || new Date(p.publishedAt) <= now)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  if (process.env.NODE_ENV === 'development') {
    // ...existing dev-mode logging stays as-is
  }

  return posts;
}
```

**Why `VERCEL_ENV === 'production'` instead of `NODE_ENV === 'production'`:** Vercel preview deployments set `NODE_ENV=production` but `VERCEL_ENV=preview`. We want previews to show scheduled posts so reviewers can see them. Using `VERCEL_ENV` gives us three distinct behaviors: `development` (local), `preview` (PR deploys), `production` (main branch deploys).

### 3.2. Match the filter in `app/sitemap.ts`

The sitemap pulls posts via `getAllPostsMeta()`. Once `getAllPosts()` filters future-dated posts, the sitemap inherits the filter automatically. After the change, verify the sitemap does not include future URLs.

### 3.3. Enable hourly revalidation on the blog pages

Add this export at the top of each blog route file:

```ts
export const revalidate = 3600; // 1 hour
```

Files:
- `app/blog/page.tsx` (the blog index)
- `app/blog/[slug]/page.tsx` (individual post pages)
- `app/blog/category/[slug]/page.tsx` (category pages)

Why hourly and not daily: a 1-hour window means a post scheduled for `2026-05-07T09:00` is live by 10am that day. Daily revalidation could leave it invisible until midnight the next day, which is confusing when writers are watching for their posts to appear.

### 3.4. Confirm `generateStaticParams` respects the filter

`generateStaticParams` in `app/blog/[slug]/page.tsx` should use `getAllPosts()` so future-dated slugs are not pre-built as static routes. After the filter change, this happens automatically. Verify after implementation.

---

## 4. Terminology

Consistent words for the phases below. Use these when discussing blog work:

| Term | Meaning |
|---|---|
| **Draft** | A blog post that is being written. Exists in the repo on a feature branch but not yet on the PR or on production. |
| **Batch** | A group of posts written together and merged in one PR. Typical batch size: 5 to 10. |
| **Placeholder date** | A far-future `publishedAt` value (we use `"2099-01-01"`) applied while a post is in review. Guarantees the post is hidden from production regardless of how long review takes. |
| **Scheduled post** | A post that has been merged to `main` with a real future `publishedAt` date. It sits in the repo, hidden from production, until that date arrives. |
| **Live post** | A post whose `publishedAt` is in the past. Visible on production. |
| **Publish window** | The one-hour revalidation cycle during which a scheduled post becomes a live post. A post scheduled for 9:00 am goes live sometime between 9:00 and 10:00 am. |
| **Cadence** | How often new posts go live. Target: 2 per week, Tuesday and Thursday. |
| **Preview deployment** | The auto-generated Vercel URL attached to every PR. Shows every post (including scheduled ones) because `VERCEL_ENV=preview`. |

---

## 5. Authoring Workflow (Writing a Batch)

### Step 1. Pick a cluster

Work one cluster at a time. For the next batch, write the cluster pillar first, then supporting posts for that cluster. See [site-architecture.md](../architecture/site-architecture.md) for cluster definitions and keyword targets.

### Step 2. Start a fresh feature branch

From a clean `development`:

```bash
git checkout development
git pull origin development
git checkout -b feat/blog-batch-<date-or-cluster>
```

Examples: `feat/blog-batch-2026-05`, `feat/blog-cluster-appointment-setting`.

### Step 3. Write each post

Use the `/pillar` slash command for pillar posts and the `/supporting-post` slash command for supporting posts. Each generates a complete MDX file in `content/blog/` with filled-in frontmatter.

### Step 4. Set the placeholder date on every post

After each post is generated, set `publishedAt` to the placeholder value:

```yaml
publishedAt: "2099-01-01"
```

Do this even if you already know the intended publish date. Scheduling happens after review, not during writing. This protects against posts accidentally going live during a long review cycle.

### Step 5. Commit posts as you write them

Commit each post individually with a clear message:

```bash
git add content/blog/<slug>.mdx
git commit -m "feat: add pillar post on appointment setting"
```

Repeat until the batch is complete.

### Step 6. Self-review locally

Run `npm run dev` and visit each post at `http://localhost:3001/blog/<slug>`. Dev mode ignores the placeholder date filter, so every post is visible. Check formatting, internal links, cover images, headings, and read-through quality. Fix issues and commit.

---

## 6. Review Workflow (Sending to the Team)

### Step 1. Push the feature branch

```bash
git push origin feat/blog-batch-<date-or-cluster>
```

### Step 2. Open a Draft PR on GitHub

- Base branch: `development`
- Compare branch: `feat/blog-batch-<date-or-cluster>`
- Mark as **Draft** (not ready for review yet)
- Title: `feat: blog batch <date or cluster name>`
- Description should include:
  - Which cluster(s) the batch covers
  - A list of the posts included (title + slug)
  - A note that `publishedAt` is a placeholder and scheduling happens after approval
  - The Vercel preview URL (GitHub will comment this automatically once the preview builds)

**Draft PR template to paste into the description:**

```
## Summary
Blog batch: <cluster name or batch description>.
<N> posts, all using placeholder publishedAt ("2099-01-01"). Real dates assigned after review.

## Posts in this batch
1. <Post title> - `content/blog/<slug>.mdx` (pillar or supporting)
2. <Post title> - `content/blog/<slug>.mdx`
3. ...

## Review instructions
- Preview URL: <Vercel will post this as a comment>
- Click through each post on the preview and check content, formatting, links, and tone
- Leave comments on specific lines in the MDX files for copy edits
- Approve when ready and I will schedule the publish dates before merging

## Not in scope
- Publish dates (will be assigned post-approval)
- Cover images (using defaults unless otherwise noted)
```

### Step 3. Share the preview URL with reviewers

Vercel posts the preview URL as a bot comment on the PR within a minute or two. Share that URL with Franco and Lucas. On the preview site, every post is visible because preview deploys bypass the future-date filter.

Ask reviewers to:
- Click through each post in the batch
- Read for content accuracy, tone, and brand compliance (see [../../CLAUDE.md](../../CLAUDE.md) for global writing rules)
- Leave GitHub review comments on specific MDX lines for copy edits
- Approve the PR when they are satisfied

### Step 4. Respond to feedback

- Make edits on the same feature branch
- Commit and push
- Vercel automatically rebuilds the preview, so reviewers see updates immediately on the same preview URL
- Repeat until approved

### Step 5. Wait for approval before scheduling

Do not assign real publish dates until the batch has been reviewed and approved. This avoids re-scheduling if review drags on.

---

## 7. Scheduling Workflow (After Review, Before Merge)

This is the last step before the batch goes into production.

### Step 1. Decide the publish dates

On paper or in a notes doc, map out the Tuesday and Thursday slots for this batch. Example for a 10-post batch starting 2026-05-05:

| Post | publishedAt |
|---|---|
| 1 | 2026-05-05 (Tue) |
| 2 | 2026-05-07 (Thu) |
| 3 | 2026-05-12 (Tue) |
| 4 | 2026-05-14 (Thu) |
| 5 | 2026-05-19 (Tue) |
| 6 | 2026-05-21 (Thu) |
| 7 | 2026-05-26 (Tue) |
| 8 | 2026-05-28 (Thu) |
| 9 | 2026-06-02 (Tue) |
| 10 | 2026-06-04 (Thu) |

**Pillar-first rule:** if the batch includes a pillar for a cluster, schedule the pillar on the earliest date in the batch. Supporting posts in that cluster must publish after the pillar so their internal links point at a live page.

**Time of day:** use `"YYYY-MM-DDT09:00:00"` format. 9 am ET is a reasonable publish time. If you omit the time and use just `"YYYY-MM-DD"`, the post appears sometime during the early hours of that day.

### Step 2. Update each post's `publishedAt`

Edit every MDX file in the batch and replace the placeholder:

```yaml
# Before
publishedAt: "2099-01-01"

# After
publishedAt: "2026-05-07T09:00:00"
```

Also update `updatedAt` to match `publishedAt` for the initial publish. You can leave `updatedAt` alone later if you edit the post; change it only when the post is materially updated.

### Step 3. Commit the scheduling commit

One focused commit that updates every post's `publishedAt`:

```bash
git add content/blog/
git commit -m "chore: assign publish dates to blog batch"
git push origin feat/blog-batch-<date-or-cluster>
```

### Step 4. Mark PR as ready and merge

- On GitHub, click **Ready for review** to convert the Draft PR
- Confirm Franco or Lucas has approved
- Merge to `development`
- `development` gets promoted to `main` on the next production release cycle
- Once on `main`, the posts are scheduled

### Step 5. Verify after merge

On the production site:
- Posts with past `publishedAt` dates (if any) appear within one hour
- Posts with future `publishedAt` dates are **not visible** on the blog index, individual URLs, or sitemap
- On the Vercel preview for the merged commit, every post is still visible (preview mode)
- On production, each post appears on its scheduled date within the one-hour revalidation window

If something looks wrong, the fastest fix is to open a new PR that edits the `publishedAt` field.

---

## 8. Edge Cases

### "What if I write 10 posts today but then do not write more for a while?"

Works as designed. The 10 scheduled posts publish on their Tuesday and Thursday dates over 5 weeks. If you do not write a new batch during that window, the site simply has no new posts after the 10th one publishes. The only cost is a gap in publishing history. Short gaps are fine; gaps longer than 4 weeks may cause Google to slow down crawl frequency.

Practical takeaway: aim to land a new batch in review before the current batch's last post publishes. A 2-week buffer is plenty.

### "What if I need to change or delete a scheduled post after merging?"

Open a new PR that edits or deletes the MDX file. The change takes effect on the next revalidation window (within one hour of merge).

### "What if I want to publish a post immediately, outside the Tuesday and Thursday schedule?"

Set `publishedAt` to any date in the past (today or yesterday). It becomes live within the next revalidation window.

### "What if I want to update an already-published post?"

Edit the MDX file. Update the `updatedAt` frontmatter to today's date (this refreshes the schema.org structured data and tells Google the post was updated). Do not change `publishedAt`. Open a PR as normal.

### "What if review stretches past the placeholder date?"

The placeholder is `2099-01-01`, so this is not a real risk. If you accidentally use a closer placeholder (like next month) and review runs long, just extend the placeholder before merging.

### "Can a reviewer see the scheduled dates on the preview?"

Yes, by looking at the frontmatter in each MDX file directly on the PR's Files Changed view. On the rendered preview site, dates show as the placeholder until you update them in step 7.2.

### "What about RSS or an automated newsletter?"

If we add either later, they should use `getAllPostsMeta()` so they inherit the same future-date filter. Writers will not need to think about it.

### "Is there a risk that Google or another crawler finds a future post via GitHub?"

Low risk. Even if Google finds the GitHub source file, the public URL at `/blog/<slug>` returns 404 until the post's `publishedAt` date passes. Google does not index 404s. Once the post goes live, it gets crawled and indexed normally.

---

## 9. Cadence and Cluster Order (Recommended)

Target **2 posts per week, Tuesday and Thursday.** 34 remaining posts at 2 per week finishes in roughly 17 weeks (about 4 months).

Recommended cluster order:

1. Write all 5 remaining pillar posts first (appointment-setting, conversation-skills, follow-up, and one each for CRM/Notes and Struggle clusters if those get pillars). Pillars are the pages supporting posts link back to. If supporting posts publish before their pillar exists, we lose internal-link equity.
2. Then work one cluster at a time to completion. Finish appointment-setting fully before starting conversation-skills. This signals topical authority to Google and helps each cluster rank as a coherent unit.

See [site-architecture.md](../architecture/site-architecture.md) for the full cluster list.

---

## 10. What Is Intentionally NOT in This Plan

- **No CMS.** MDX in the repo keeps things simple and version-controlled.
- **No GitHub Action auto-merge bots.** The batch-PR model covers our needs without cron-based merging.
- **No timezone handling beyond UTC.** `publishedAt` is stored as ISO-8601 and compared to `new Date()` at runtime. "9 am Tuesday UTC" vs "4 am Tuesday ET" is not a meaningful distinction for our purposes. We can add timezone logic later if it matters.
- **No paid scheduling tools.** Everything here uses Vercel features on our existing plan.

---

## 11. Success Criteria

After the code change ships and the first batch is merged, verify:

1. [ ] A post with a future `publishedAt` is NOT visible on production.
2. [ ] That same post IS visible on the Vercel preview for the PR.
3. [ ] That same post IS visible in the local dev server (`npm run dev`).
4. [ ] The production sitemap does not include the future post's URL.
5. [ ] The post appears on production within one hour of its `publishedAt` timestamp passing.
6. [ ] The blog index, category pages, and related-posts rails reflect the correct ordering and count after the new post publishes.

---

## 12. Open Questions for the Dev Implementing This

- Do we want a `/admin` or `/internal/upcoming` preview page on production that shows scheduled-but-not-yet-live posts? Not needed for v1, but worth considering if writers want to double-check scheduled content without waiting for the preview URL on each PR.
- Should we add a CI check that flags invalid `publishedAt` values (malformed dates, dates more than 6 months out)? Nice to have, not required.
- Category pages need `export const revalidate = 3600` in addition to the blog list and slug pages. Confirm this is covered in implementation.
- Should `updatedAt` default to `publishedAt` when not specified, or to today? Today's behavior is the former; consider keeping it.
