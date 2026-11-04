# Brief: FSBO scripts for real estate agents
Queue item 12 · refresh · written 2026-10-24

## Target
Main search: **fsbo scripts** (70/mo, difficulty 0, page one contested). Also covers: fsbo call script (20, open), fsbo cold calling script (10), what to say to fsbo to get listing (10), fsbo scripts that work (10), fsbo objection scripts (10), fsbo objections (10), fsbo follow up script (10), fsbo listing scripts (10). 160 searches a month in total.

Why this item: Sayso already ranks for the group but not high enough to be clicked. Refresh, not rewrite.

Baseline (Search Console, window ending 2026-10-19):
- Queue row: 62 impressions, average position 27.7. That number comes from the two `fsbo objection(s)` searches that Google shows on `/objections/`, not from this page.
- This page itself (`gsc_query_page_16mo.csv`): 273 impressions, 0 clicks, impression-weighted position about 16.9 across 29 searches. The 90-day page file has no rows for the page. Top searches: fsbo scripts that work (36 impressions, position 16.0), fsbo scripts (33, 16.8), fsbo email script (25, 15.5), fsbo objection scripts (23, 18.1), scripts for fsbo (17, 15.4), fsbo voicemail script (14, 14.1), fsbo follow up script (13, 15.8), fsbo cold calling script (12, 15.2), fsbo call script (11, 12.9), fsbo text script (10, 19.9).
- `gsc_query_28d.csv`: no rows for this page.

## What Google shows today
Leading format: big brand and documents for `fsbo scripts`; video for `fsbo call script` and `what to say to fsbo to get listing`. AI Overview on every group. People Also Ask: how to find FSBO leads; how to convince a FSBO to list with you; is FSBO on Zillow free; what is a good script for cold calling.

Top results for `fsbo scripts` (post_page_one.csv): Mike Ferry script PDF (document), virtuance.com text scripts, YouTube, followupboss.com scripts, vulcan7.com scripts, agentfire.com, Scribd PDF, YouTube.

Pages fetched on 2026-10-24:

| Page | Format | What it covers | What it does poorly |
|---|---|---|---|
| marketleader.com, 7 Best FSBO Scripts (July 27, 2022) | List of 7 scripts | Reminder, curiosity, buyer's agent workaround, time pressure, wish list, price, cost-sensitive seller | No data; scripts assume one kind of seller; no full call from open to ask; old |
| highnote.io, 15+ Best FSBO Scripts (March 13, 2025) | Long guide, about 2,500 words | Openings, objections ("I don't need an agent", "bring me a buyer"), follow-up, buyer's-agent compensation after the NAR settlement, timeline | One unsourced statistic; prescriptive; scripts are fragments, not one complete call |
| agentfire.com, 4 FSBO Scripts | 4 scripts and FAQ | Classic, diagnostic, objection sidestepper, elevator pitch; bad experience and "sell it myself" objections | No data; no follow-up timeline; no voicemail or text |
| redx.com, 5 Finest FSBO Scripts | Roundup of other people's scripts | Describes five scripts from other sources | Describes scripts without printing them; undated |
| virtuance.com, 4 FSBO Text Scripts (Feb 2, 2024) | 4 text scripts | Text versions only | Thin objection handling |

Could not access: Zillow Pro "5 Effective FSBO Scripts" (403), Mike Ferry FSBO script PDF (403); Reddit and YouTube results were not fetched. Their content is not used.

Table stakes: several named script styles, a few objection replies, a note on follow-up. Gaps this page can fill: one complete call from open to appointment ask with the decision points marked; objection branches in a lookup table that links to the full objection pages; voicemail, text and email versions (the page already ranks for those searches and had no such section).

Format check: videos and a PDF lead the call-script searches. A complete script that can be copied (a ScriptExample block) plus the printable call sheet (already present, updated) is the text answer to that.

## Refresh hypothesis
**This refresh opens with a direct answer and one complete call script from hello to appointment ask, then a table of replies and objection branches linked to the objection pages, because the page ranks around position 16 for call-script searches but its previous "script to start with" was only an opener.**

Also changed because the query mix shows it (email, voicemail, text and follow-up searches): a short voicemail, text and email section. Title and seoTitle unchanged; description rewritten (removed Sayso, now describes the complete script). `ctaVariant: "script"` and `updatedAt` added.

## Facts and sources
| Fact | Status | Source | Checked |
|---|---|---|---|
| FSBO sales were 5% of home sales in NAR's 2025 Profile of Home Buyers and Sellers; 91% of sellers used an agent (record) | confirmed | https://www.nar.realtor/news/real-estate-news/fsbos-reach-all-time-low-more-sellers-rely-on-agents and https://www.nar.realtor/magazine/real-estate-news/nar-2025-profile-of-home-buyers-sellers-reveals-market-extremes | 2026-10-24 |
| Median FSBO sale price $360,000 vs $425,000 agent-assisted (NAR); the post adds that these are different homes, not like-for-like | confirmed | same NAR pages | 2026-10-24 |
| Old FAQ claim "about 11% of FSBO sellers close without professional help" | could not confirm; removed | none found | 2026-10-24 |
| Old claim "convert FSBOs at 2-3x the average rate" | no source; removed | none | 2026-10-24 |
| Old claims "most FSBO conversions happen on the second or third contact" and "4-6 PM and Saturday 9-11 AM have the highest contact rates" | no source; rewritten as advice | none | 2026-10-24 |
| Do Not Call rules (linked, not restated) | link to an existing Sayso post | /blog/do-not-call-rules-real-estate-agents/ | 2026-10-24 |

## Links
Out: hub `/blog/real-estate-cold-calling-guide/`; `/glossary/fsbo/`; `/objections/how-much-is-your-commission/`; `/objections/want-to-sell-ourselves/`; `/objections/bad-experience-with-agents/`; `/objections/not-interested/`; `/blog/expired-listing-scripts/`; `/blog/do-not-call-rules-real-estate-agents/`; `/blog/how-to-start-a-real-estate-call/`; `/blog/circle-prospecting-scripts/`; `/products/cue/` (in context); `/demo/` (closing).
In: `/glossary/fsbo/` (added in item 14); `/objections/how-much-is-your-commission/` already links to the post. Recommended: `lib/content/objections/want-to-sell-ourselves.ts` and the cold-calling guide body.

## Sayso placement
cta_variant: script (card to Playbook, added). In-context: objections section, one sentence linking Cue. Closing: "Make Your Next FSBO Call Easier", demo link.
