# SEO Indexing Fix: Next Steps

## What Was Fixed in This PR

- Updated `lib/config.ts` fallback URL from `https://asksayso.com` to `https://www.asksayso.com` so canonical tags and sitemap URLs are always correct even if the Vercel env var is ever missing
- Replaced local `siteUrl` declarations in 14 page files with a shared import from `lib/config` so there is one source of truth
- Added `/download` to the sitemap so Google can discover and index that page
- Added safety redirect rules for `/index.html/` and `/demo-974294` (without trailing slash) to fix 404 edge cases
- Updated all docs/templates to use the correct www URL so new pages built from templates start with the right canonical

## After This PR Is Live on www.asksayso.com

Complete these steps in Google Search Console (search.google.com/search-console):

### 1. Resubmit the Sitemap
- Go to Indexing > Sitemaps
- Submit: `https://www.asksayso.com/sitemap.xml`
- This signals Google the site has changed and triggers faster recrawling

### 2. Request Recrawl for the 8 Redirect-Error Pages
For each URL below, go to URL Inspection, paste the URL, and click "Request Indexing":
- `https://www.asksayso.com/blog/`
- `https://www.asksayso.com/about/`
- `https://www.asksayso.com/contact/`
- `https://www.asksayso.com/pricing/`
- `https://www.asksayso.com/demo/`
- `https://www.asksayso.com/why-sayso/`
- `https://www.asksayso.com/for/solo-agents/`
- `https://www.asksayso.com/for/team-leaders/`

### 3. Validate the /about/ Duplicate Canonical Fix
- Go to Indexing > Pages > "Duplicate without user-selected canonical"
- Click the **VALIDATE FIX** button in the top right

## Timeline

Google typically takes 1-3 weeks to recrawl and reprocess after these actions. The indexed page count should increase from 9 to most of the main site pages within 2-4 weeks.
