# Blog Content Guide

How to write, format, and publish blog posts for the Sayso website.

---

## Workflow: Google Doc → Live Blog Post

```
1. Write article in Google Docs
2. File → Download → Markdown (.md)
3. Drop the .md file into  content/blog/drafts/
4. Open Claude Code, type:  /blog-convert
5. Claude reads, formats, and creates the .mdx file in content/blog/
6. Review the output, commit, and open a PR
```

---

## Frontmatter Reference

Every blog post starts with a YAML frontmatter block. Claude fills this in automatically via `/blog-convert`, but here's the full schema for reference:

```yaml
---
title: "Your Article Title"
slug: "your-article-slug"           # Becomes the URL: /blog/your-article-slug
description: "1–2 sentence SEO summary shown in search results and post previews."
category: "cold-calling"            # See categories below
tags: ["tag one", "tag two", "tag three"]
author:
  name: "Author Name"
  role: "Author Role"
  avatar: "/logo-sayso.png"
  linkedin: "https://linkedin.com/in/username"   # Optional
coverImage: "/blog/covers/default.jpg"
publishedAt: "2026-03-03"
updatedAt: "2026-03-03"
readingTime: 5                      # Integer, minutes
featured: false                     # Only ONE post should have featured: true
---
```

### Categories

| Slug | Use for |
| ----- | ----- |
| `cold-calling` | Cold calling tactics, objection handling, call tips |
| `ai-tools` | AI coaching tools, technology comparisons |
| `scripts` | Call scripts, templates, word-for-word guides |
| `real-estate` | Real estate specific strategies and market insights |
| `success-stories` | Customer case studies and team results |

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
- **Cell content**: Keep concise — one phrase or short sentence per cell
- **Links in cells**: Allowed — use `[Name](https://url.com)` format
- **No HTML tables** — always use Markdown pipe syntax
- **Wrap in nothing** — the site handles overflow scrolling automatically on mobile

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

- The article `title` from frontmatter renders as the H1 — **do not include a `# Title` in the body**
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

## Metadata at the Bottom of Google Docs

If your Google Doc has a metadata section at the bottom (common pattern), it may look like:

```
Meta title: MaverickRE Alternatives: 7 Better Options
Meta description: Looking for MaverickRE alternatives...
Category: ai-tools
Tags: maverick re, real estate coaching, AI tools
```

The `/blog-convert` skill will detect this and use it to fill in the frontmatter automatically. You do not need to remove it before dropping the file in `content/blog/drafts/` — the skill removes it from the body and puts it in the right place.

---

## Checklist Before Committing

- [ ] Frontmatter is complete (all required fields filled)
- [ ] No `# H1` heading in the body (title comes from frontmatter)
- [ ] All tables use pipe format with header + separator rows
- [ ] All links use `[text](url)` format — no bare URLs
- [ ] Metadata section removed from body (moved to frontmatter)
- [ ] Only one post has `featured: true` across all posts
- [ ] File is saved as `.mdx` in `content/blog/` (not `drafts/`)
- [ ] Draft `.md` file deleted from `content/blog/drafts/`
