# Keyword map data for the blog backlog

Post-level research data used by the `/seo-blog` skill (`.claude/skills/seo-blog/`). Exported from the full research in `C:\Bussiness Ideas\Tools\seo\sayso\research\2026-10-21-keyword-map\` with `scripts/export_to_repo.py`; the full data and the dashboard ("Sayso keyword map" on claude.ai) live there.

| File | Contents |
|---|---|
| `blog_backlog.csv` | The 50-post plan: 30 new posts, 16 refreshes, 4 to monitor. Wave, recommendation, score, ease, main search numbers, totals, angle, call to action and the reasoning for each post. |
| `post_search_groups.csv` | Every search group each post targets: variants, monthly volume, DataForSEO difficulty, page-one strength, AI Overview, leading format, top domains, People Also Ask, related searches and Sayso's last 90 days in Search Console. |
| `post_page_one.csv` | The top ten organic Google results (United States, desktop) for each of those groups: rank, domain, kind of result, domain authority (0 to 100; Sayso is about 2), title and URL. |

Data dates: Google page one and DataForSEO volume and difficulty, 21 October 2026. Search Console, 90 days to 19 October 2026. Page one changes; re-check a post's main search before writing if this data is more than a few months old.

Page-one strength: **open** means two or more small independent sites (domain authority 20 or under) rank in the top ten, **contested** means one, **closed** means none.
