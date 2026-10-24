---
name: seo-blog
description: Research and write, or refresh, Sayso blog posts from the launch queue (docs/seo/keyword-map/launch_queue.csv). Use when asked to write, draft, refresh or research a queued post by number or slug, to "run the next post", or "/seo-blog <post>". Reads the saved Google page-one data for the post's searches, reads the top-ranking pages, writes a brief, then writes or refreshes the post with Sayso's call-to-action system and internal links. Runs end to end without pausing and records status in the queue.
---

# /seo-blog: research a search, then write the post that should rank for it

The Cut Brush method for Sayso: find out what Google already rewards for a search, write the more useful version, place a small relevant call to action, and connect the post to the rest of the site. Run every step in order without stopping for approval. A person reviews the finished work before it launches.

Plan and rules: `docs/seo/blog-program-plan.md`. Brand rules: the repo `CLAUDE.md`.

## Step 0. Pick the item

Read `docs/seo/keyword-map/launch_queue.csv`. Use the `post_id` or `slug` given; otherwise take the first row with `status` = "not started" (new posts and refreshes in file order). Before writing, check that the target file does not already hold a draft from an earlier run; if it does, continue from it instead of starting over.

Set the row's `status` to "drafting" while you work.

## Step 1. Load the item's data

- `launch_queue.csv` row: `kind` (new or refresh), `title`, `url`, `slug`, `file`, `main_search`, `searches`, `format`, `cluster`, `pillar`, `category`, `cta_variant`, `product_link`, `persona_link`, `angle`, `launch_date`, Sayso's last 90 days.
- `post_search_groups.csv` and `post_page_one.csv` (match on `post_id`): every search group the item targets, with volume, difficulty, page one, AI Overview, leading format, People Also Ask, related searches, and the top ten results.

Only use the searches listed in the queue row; others were removed on purpose (wrong meaning or another company's product).

## Step 2. Read what ranks

1. Fetch the top three to five results for the main search whose `type` is "Independent site" or "Big brand". Record each page's outline, format, length, freshness, what it covers and what it does poorly, and every fact with its source.
2. **Format check.** If videos, PDFs, forums or social posts lead page one, say what that means for this post: a downloadable or copyable script, a worked example, a step-by-step demo in text, or a clearer answer than the forum threads. Do not skip those results silently.
3. Read one or two forum threads for how agents phrase the problem. Use them for wording, never as a fact source.
4. **Facts.** Every price, number, rule or program detail must come from a page fetched in this run, ideally the owner's own page. Give each one a status:
   - **confirmed:** the URL and date are recorded;
   - **not published:** you checked the owner's pricing, FAQ and terms pages and it is not there;
   - **could not access:** the page blocked you or failed to load.

   "Could not access" is never written as "not published". Leave it out of the post, or say the reader should ask.
5. **Internal links out.** Pick three to six existing pages: the hub (`pillar`), two or three sibling posts in the same `cluster`, one or two glossary or objection pages where the term comes up, the `product_link` and, where it fits, the `persona_link`. For scripts, read the matching part of `docs/content/ultimate-script-book.md`.
6. Check `docs/content/pending-internal-links.md` for entries waiting on this slug.

## Step 3. Write the brief

Save `docs/content/briefs/<slug>.md`:

```
# Brief: <title>
Queue item <post_id> · <new or refresh> · written <date>

## Target
Main search, volume, difficulty, page one; the other searches it covers; why this item

## What Google shows today
Leading format · AI Overview · top results (domain, authority, format, one-line note)
What the ranking pages cover · what they do poorly · format check result

## Outline (new) or refresh hypothesis (refresh)
title, seoTitle, description; opening answer; H2 outline with the question each answers
For a refresh: the baseline (impressions, position, clicks from the queue) and one sentence on what the refresh should change and why

## Facts and sources
| Fact | Status | Source | Checked |

## Links
Out (with anchor text) · In (which pages will link to this one)

## Sayso placement
cta_variant · in-context mention (section and wording idea) · closing section angle
```

## Step 4a. Write a new post

Save `content/blog/<slug>.mdx`. Use the outline for the queue row's `format` in `references/formats.md` and the product facts and CTA rules in `references/sayso.md`.

**Frontmatter**

```yaml
title: "<H1: natural wording that contains the main search>"
seoTitle: "<short search title, main search first; aim for 50 to 60 characters>"
description: "<the answer plus what the reader gets; aim for 140 to 160 characters>"
slug: "<slug>"
type: "supporting"
cluster: "<cluster>"
pillar: "<pillar>"
category: "<category>"
tags: ["<4 to 6 tags>"]
ctaVariant: "<cta_variant>"
author:
  name: "Sayso Team"
  role: "Team"
  avatar: "/logos/logo-sayso.png"
publishedAt: "<launch_date>"
updatedAt: "<launch_date>"
featured: false
coverImage: "/blog/covers/blog-card-<2|3|4>.jpg"
heroImage: "/blog/covers/blog-hero-<2|3>.jpg"
```

If `pillar` is empty, the post is the hub of its cluster: use `type: "pillar"` and leave out the `pillar` field.

**Body**

- Answer the main search in the first two or three plain sentences, then say what the post covers. No Sayso in the title, seoTitle, description or first two paragraphs. The inline CTA renders automatically after paragraph two from `ctaVariant`; never write it into the body.
- Use the main search naturally in the H1, early in the opening, in one H2 and in the description. Use the other searches where they read naturally; never stuff them.
- H2s answer the People Also Ask questions in the searcher's words. Include at least one table, checklist, template or script block, and at least one piece of original material the ranking pages lack.
- **Sayso appears twice at most in the body.** Once in context, in the section where it solves that exact problem: one to three sentences written as advice, linking `product_link`. Once in a short closing section of three or four sentences, titled for the reader's next step, linking `/demo/`.
- **Other companies' products.** Never write a post about a dialer, CRM, lead-generation tool or other vendor's product, and never review, rate or price one. Coaching programs are the one approved exception: compare them only with each program's own published facts. Elsewhere, mention a company only as neutral context, and only if needed.
- Use `<CalloutBox type="tip|warning|key-takeaway">` sparingly and `<ScriptExample label="...">` for every script.
- An FAQ (`## FAQ`, bold questions on their own lines, two to four sentence answers) is optional. Add it only when People Also Ask has real questions the post has not already answered.
- Length: whatever the topic needs to be more useful than the ranking pages, usually 1,200 to 2,500 words. No padding.

## Step 4b. Refresh an existing page

Edit the file in place (blog posts in `content/blog/`, glossary entries in `lib/content/glossary/`, objection pages in `lib/content/objections/`, the objections hub in its page and data files).

- **Keep:** the slug and URL, `publishedAt`, `type`, `cluster`, `pillar`, `category`, the author, and every section that already answers the searches well. Set `updatedAt` to `launch_date`.
- **Change only what the refresh hypothesis calls for:** the opening answer, a missing section, a scannable list or table, the title or description if the query mix shows a mismatch, outdated facts, and the links. Do not rewrite a page that already ranks just to make it longer.
- If the page has no `ctaVariant` and a matching variant exists, add it. Keep its existing CTAs.
- Hubs (`pillar` empty in the queue) must link to every post in their cluster, including this run's new posts.

## Step 5. Links in

After the post is written, add links to it so it is not an orphan:

1. Its hub links to it in the body (a sentence with a natural anchor, not a list dump), unless the hub is refreshed later in this run; then note it for that refresh.
2. At least one non-blog page links to it: the matching glossary entry (`lib/content/glossary/`), objection page (`lib/content/objections/`), persona page (`lib/content/for/`), or the prospecting calculator page. Add a "related reading" sentence or link where these files already list related content.
3. Restore any back-links waiting in `docs/content/pending-internal-links.md`, then delete that entry.

## Step 6. Check

Fix every failure before moving on:

- Brand rules from `CLAUDE.md`:
  - "Sayso" spelling; no em dashes;
  - no "Not X. Not Y. Just Z";
  - no "run/running" for calls; "calls", never "phone calls";
  - "cold call" only when the topic is cold calling;
  - agents, never "reps"; prospects, leads and clients, never "deals" or "close a deal";
  - works for buyer and seller leads;
  - no tagline fragments;
  - no free trial, "try free" or "no credit card".
- American spelling.
- Every fact in the post is "confirmed" in the brief.
- At most two Sayso mentions in the body plus the closing section; none in the first two paragraphs.
- All internal links point to pages that exist. Links to posts launching in this run are fine.
- No review, rating or pricing of another company's product (coaching programs excepted).
- MDX: every `<CalloutBox>` and `<ScriptExample>` is closed; no stray `<` or `{` in prose.

## Step 7. Record and report

Set the queue row's `status` to "in review". Do not commit unless asked; the run commits in batches. Report: the file and brief paths, the main search and why the post should rank, the sources used, anything left out because it could not be confirmed, and the links added in.
