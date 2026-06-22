# Blog Content + Sitemap Checklist

This folder holds the blog posts (`.mdx` files). **Read this before adding a new post or a new page to the site**, so everything ends up in the sitemap and gets indexed.

---

## Adding a new blog post

1. Add your `post-slug.mdx` file to this folder.
2. Set the frontmatter, including `publishedAt`. Posts with a `publishedAt` date **in the future are hidden in production** until that date passes (this is the scheduling feature, see below).
3. That's it. **Blog posts are added to the sitemap automatically.** `app/sitemap.ts` reads every `.mdx` in this folder, so you do not hand-edit the sitemap for a new post.

### Verify it locally before you push

```bash
npm run build
# then check the generated sitemap includes your slug:
#   .next/server/app/sitemap.xml.body
```

Or run the link audit to make sure nothing is broken:

```bash
npx tsx scripts/audit-all-links.ts
```

---

## Adding a NEW page that is NOT a blog post (this is the manual step)

A brand-new top-level page or a new content section (for example a new `/glossary/...`, `/objections/...`, `/products/...`, or a one-off page like `/about`) **only lands in the sitemap if it is registered.** The sitemap pulls from:

- the site navigation (`getAllNavHrefs()` in `lib/navigation.ts`), and
- the content loaders (glossary, objections, products, `for`, comparisons) wired into `app/sitemap.ts`.

So when you add a new page or a new content type:

1. Make sure it is reachable from the nav, **or** add its loader/path to `app/sitemap.ts`.
2. If the page should NOT be indexed, add its path to `EXCLUDED_PATHS` in `app/sitemap.ts` instead.
3. Rebuild and confirm the URL is in `.next/server/app/sitemap.xml.body`.

When in doubt, open `app/sitemap.ts` and confirm your new path shows up.

---

## Scheduled (future-dated) posts

`app/sitemap.ts` revalidates hourly so a post whose `publishedAt` date passes shows up in the sitemap without a redeploy.

> ⚠️ **Do not remove the `experimental.outputFileTracingIncludes` block in `next.config.js`.**
> The sitemap regenerates in a serverless function at runtime, and that config is what makes the `content/blog` `.mdx` files available to it. Without it, the runtime sitemap silently drops **every** blog post (the function reads an empty folder and returns no posts), even though the build looks fine. This was a real production bug; that config is the fix.

---

## After a new page goes live

Per the SEO plan (`docs/seo/indexing-next-steps.md`), once the sitemap is updated and deployed:

1. Resubmit the sitemap in Google Search Console.
2. Use "Request indexing" on the important new URLs (pillars first, then supporting pages).
