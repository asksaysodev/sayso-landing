---
name: seo-blog
description: Research and write one Sayso blog post from the SEO blog backlog (docs/seo/keyword-map/blog_backlog.csv). Use when asked to write, draft or research a backlog post by number or title, or "/seo-blog <post>". Reads the saved Google page-one data for the post's searches, reads the top-ranking articles, writes a brief to docs/content/briefs/, then writes the post to content/blog/ with a small, matched Sayso call to action. Runs end to end without pausing.
---

# /seo-blog: research a search, then write the post that should rank for it

This is the Cut Brush method applied to Sayso: find out what Google already rewards for a search, write the more useful version, and place one small, relevant call to action. Run every step in order and do not stop for approval. The person reviews the finished brief and post.

Input: a backlog post number (the `post_id` column) or title. If none is given, take the first row in `docs/seo/keyword-map/blog_backlog.csv` with `kind` = "New post" and `status` = "Not started", in `post_id` order.

## Step 1. Load the post's data (no web calls yet)

From `docs/seo/keyword-map/`:

- `blog_backlog.csv`, the post's row: `title`, `sayso_url` (the slug to use), `category` (call-to-action type), `main_search`, `searches`, `angle`, `cta`, `why`, `ease`, the numbers.
- `post_search_groups.csv`, rows with this `post_id`: every search group the post targets, with `variant_list`, `volume`, `kd_max`, `competition`, `ai_overview`, `leading_format`, `top_domains`, `paa` (People Also Ask, `|`-separated), `related` (related searches).
- `post_page_one.csv`, rows with this `post_id`: the top ten results per group (rank, domain, kind of result, domain authority, title, URL), read on 21 October 2026.

Write down: the exact wording of the main search, the five to ten variants with the most volume, every People Also Ask question (deduplicated), the related searches, the leading format, and whether an AI Overview shows.

## Step 2. Read what ranks

1. Pick the top three to five results for the main search whose `type` is "Independent site" or "Big brand" (skip Reddit, YouTube, social, PDFs). Fetch each page and record:
   - its H2 outline, rough length and format (list, guide, table, scripts);
   - what every ranking page covers (table stakes: the post must cover these too);
   - what none of them do well (the gap the post fills);
   - freshness (date shown or stale details such as last year's prices);
   - every fact, price or statistic, with the page it came from.
2. Read one or two Reddit or forum threads from `post_page_one.csv` (or search `site:reddit.com <main search>`) for how agents phrase the problem and what they complain about. Use this for wording and examples, never as a fact source.
3. Search Google once for the main search phrased as a question, and note the AI Overview's answer if one shows. The post's opening answer must be more specific than it.
4. Facts: any price, statistic, plan detail or program feature in the post must come from a page fetched in this run (the company's own page first). Record URL and date. If a fact cannot be confirmed, leave it out or say it is not published.
5. Internal links: list three to six existing Sayso pages that answer the reader's next question. Search `content/blog/` (posts), `lib/content/glossary/`, `lib/content/objections/`, product pages (`/products/cue/`, `/products/playbook/`, `/products/smart-capture/`, `/products/pulse/`), `/why-sayso/`, `/integrations/`, `/for/<persona>/`, `/tools/prospecting-calculator/`. Prefer posts already live (publishedAt in the past).
6. For script posts, read the matching section of `docs/content/ultimate-script-book.md` and build the scripts from it.

## Step 3. Write the brief

Save `docs/content/briefs/<slug>.md` using this outline:

```
# Brief: <post title>
Backlog post <id> · <kind> · wave <n> · written <date>

## Target
Main search: <exact phrase> (<volume>/mo, difficulty <kd>, page one <open/contested/closed>)
Also covers: <variants and groups with volume>
Why this post: <the backlog "why" line>

## What Google shows today
Leading format · AI Overview yes/no · top results (domain, authority, format, one-line note each)
Table stakes (every top page covers): ...
Gaps (what Sayso's post adds): ...

## Title, meta and outline
title (H1) · seoTitle (55 to 60 characters) · description (150 to 160 characters)
Opening answer (2 to 3 sentences) · H2 outline with the People Also Ask question each answers

## Facts and sources
| Fact | Source URL | Checked |

## Internal links
## Sayso placement
ctaVariant · the in-context mention (which section, what it says) · closing section angle
```

## Step 4. Write the post

Save `content/blog/<slug>.mdx`. Follow `references/formats.md` for the post's format and `references/sayso.md` for product facts and the call-to-action rules. The rules that matter most:

**Frontmatter** (copy the shape of existing posts):

```yaml
title: "<H1, natural wording that contains the main search>"
seoTitle: "<55 to 60 characters, main search first>"
description: "<150 to 160 characters: the answer plus what the post gives the reader>"
slug: "<slug>"
type: "standalone"
category: "<existing category, or coaching-and-tools for coaching, dialer, CRM and tool posts>"
tags: ["<4 to 6 tags>"]
ctaVariant: "<script | coaching | dialer | crm | leads | prospecting | team>"
author:
  name: "Sayso Team"
  role: "Team"
  avatar: "/logos/logo-sayso.png"
publishedAt: "<next free Tuesday or Thursday after the latest scheduled post, T09:00:00>"
updatedAt: "<same>"
featured: false
coverImage: "/blog/covers/blog-card-<2|3|4>.jpg"
heroImage: "/blog/covers/blog-hero-<2|3>.jpg"
```

Existing categories: appointment-setting, cold-calling, conversation-skills, follow-up, mindset.

**Body**

- Open with the direct answer to the main search in two or three plain sentences (this is what an AI Overview can cite), then one or two sentences on what the post covers. Those two paragraphs come before any product mention; the inline call to action renders automatically after the second paragraph from `ctaVariant`.
- Main search in the H1, the first 100 words, one H2 and the description. Variants appear naturally in headings and text; never stuff them.
- H2s answer the People Also Ask questions in the searcher's words. At least one table or script block. At least one piece of original material the ranking pages lack.
- Mention Sayso at most twice in the body: once in context, in the section where it solves that exact problem, written like advice; once in a short closing section (three or four sentences) titled for the reader's next step, not "About Sayso". Link one product page or /demo/ there.
- End with `## FAQ`: four to six questions, each on its own line in bold (`**Question?**`) followed by a two to four sentence answer. The site turns this into FAQ structured data.
- Use `<CalloutBox type="tip|warning|key-takeaway">` for one or two callouts and `<ScriptExample label="...">` for every script.
- Length: as long as the topic needs to beat the ranking pages, usually 1,500 to 2,500 words. No padding.

## Step 5. Check before saving

Run these checks and fix every failure:

- Brand rules from the repo CLAUDE.md: "Sayso" spelling; no em dashes (search for the character); no "Not X. Not Y. Just Z"; no "run/running" for calls; "calls", never "phone calls"; "cold call" only when the topic is cold calling; agents, never "reps"; prospects, leads and clients, never "deals" or "close a deal"; works for buyer and seller leads; no tagline fragments; no free trial, "try free" or "no credit card" anywhere.
- American spelling (practice, practicing, organize), matching the rest of the site.
- Every number has a source in the brief; competitor programs and products are described fairly and only with published facts; prices carry a "checked <month year>" note.
- seoTitle 55 to 60 characters; description 150 to 160 characters; main search in title, first 100 words, one H2, description.
- Three to six internal links, all to existing pages; external links only to sources.
- At most two Sayso mentions in the body plus the closing section; none before the third paragraph.
- FAQ format matches the bold-question pattern.

Then run `npx tsc --noEmit` if code changed, and commit the brief and post on the current branch with a message like `content: add <slug> post and brief`.

## Step 6. Report

Tell the person: the post path and brief path, the main search and why the post should rank (one line), the sources used, anything you could not verify and left out, and what to check when reviewing.
