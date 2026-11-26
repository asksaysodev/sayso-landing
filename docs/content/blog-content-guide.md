# Blog Content Guide

Formatting and content standards for Sayso blog posts. For the full publishing workflow (how to write, review, and schedule posts), see [../reference/blog-publishing-plan.md](../reference/blog-publishing-plan.md).

---

## Frontmatter Reference

Every blog post starts with a YAML frontmatter block. This matches what `lib/blog.ts` reads; update both together.

```yaml
---
title: "Expired Listing Scripts: What to Say and the Best Time to Call"   # The H1
seoTitle: "Expired Listing Scripts and the Best Time to Call"             # Optional. Only changes the <title> tag (the template adds " | Sayso"). Never the H1.
description: "1-2 sentence summary shown in search results and post previews."
slug: "expired-listing-scripts"     # URL: /blog/expired-listing-scripts/. Defaults to the file name.
type: "supporting"                  # pillar | supporting | standalone (default standalone)
cluster: "cold-calling"             # Needed for pillar and supporting posts
pillar: "real-estate-cold-calling-guide"   # Supporting posts only: slug of the pillar post
category: "cold-calling"            # See categories below
tags: ["expired listings", "cold calling", "scripts"]
ctaVariant: "script"                # Optional: script | coaching | leads | prospecting | team. Any other value fails the build.
author: "kuvaal-patel"              # A key from lib/authors.ts, not an object. Unknown keys fail the build. Defaults to kuvaal-patel.
publishedAt: "2026-03-14"
updatedAt: "2026-11-07T09:00:00"    # Defaults to publishedAt
coverImage: "/blog/covers/blog-card.jpg"   # Card image. This is the default.
heroImage: "/blog/covers/blog-hero.jpg"    # Top of the post and the og:image. This is the default.
readingTime: 5                      # Optional. Worked out from the word count when left off.
---
```

Notes:

- `featured` is no longer read. Older posts still carry it; leave it off new posts.
- A supporting post with no `pillar` or `cluster`, or a pillar that does not exist, prints a build warning.
- Always set `publishedAt`. A post without it takes the build date.

### Categories

| Slug | Posts today |
| ----- | ----- |
| `cold-calling` | 29 |
| `conversation-skills` | 18 |
| `appointment-setting` | 8 |
| `coaching-and-tools` | 6 |
| `follow-up` | 6 |
| `mindset` | 3 |

Use one of these six. A new slug creates a new category page.

---

## Table Formatting Standard

Tables on this site render with a dark blue header row and bordered cells. To ensure consistent display, follow this format exactly.

### Correct format

```markdown
| Column One | Column Two | Column Three | Column Four |
| ----- | ----- | ----- | ----- |
| Row value | Row value | Row value | Row value |
| Row value | Row value | Row value | Row value |
```

### Rules

- **Header row**: Short, title-cased column names
- **Separator row**: Use `| ----- |` for each column (dashes only, no colons for alignment)
- **Cell content**: Keep concise - one phrase or short sentence per cell
- **Links in cells**: Allowed - use `[Name](https://url.com)` format
- **No HTML tables** - always use Markdown pipe syntax
- **Wrap in nothing** - the site handles overflow scrolling automatically on mobile

### Comparison table example (common pattern)

```markdown
| Tool | Best For | Where It Falls Short | Pricing |
| ----- | ----- | ----- | ----- |
| Sayso | Real-time call coaching | Not a full reporting OS | Mid-range |
| [Sisu](https://sisu.co) | Accountability and KPI dashboards | Does not fix live call execution | Mid-range |
| [Follow Up Boss](https://www.followupboss.com) | CRM and calling workflow | Not specialized for AI coaching | Mid-range |
```

---

## Heading Structure

```
## Section Title         ← Top-level sections (H2)
### Subsection           ← Subsections (H3)
```

- The article `title` from frontmatter renders as the H1 - **do not include a `# Title` in the body**
- Never go deeper than H3

---

## Other Formatting

| Element | Syntax | Notes |
| ----- | ----- | ----- |
| Bold | `**text**` | Key terms, stats, emphasis |
| Italic | `*text*` | Light emphasis, quotes |
| Inline code | `` `text` `` | Tool names, technical terms |
| Blockquote | `> text` | Customer quotes, pull quotes |
| Internal link | `[text](/v4#demo)` | Relative path |
| External link | `[text](https://url.com)` | Full URL |
| Unordered list | `- item` | Use for non-sequential items |
| Ordered list | `1. item` | Use for steps or ranked lists |

---

## Checklist Before Committing

- [ ] Frontmatter is complete (all required fields filled)
- [ ] No `# H1` heading in the body (title comes from frontmatter)
- [ ] All tables use pipe format with header + separator rows
- [ ] All links use `[text](url)` format, no bare URLs
- [ ] Only one post has `featured: true` across all posts
- [ ] File is saved as `.mdx` in `content/blog/`
- [ ] `publishedAt` reflects the intended publish date (or a placeholder far-future date if the post is in review, see the publishing plan for details)
