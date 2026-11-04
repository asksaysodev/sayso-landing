# Brief: Objection handling hub
Queue item 22 · refresh · written 2026-10-24

## Target
- Main search: real estate objection handling scripts (20 searches a month, difficulty 0, page one closed, AI Overview present). Also: real estate objection handling, real estate objections, real estate objection handlers, common real estate objections, 40 real estate objections handled, real estate cold calling objections (140 searches in all).
- Why this item: the hub has 14 cards but no list a searcher can scan, and no links to the cluster's long-form guide or the negotiation post.
- People Also Ask: What are the 5 steps of objection handling? · What are some common objections in sales? · What are the four types of objections? · How do I handle objections in cold calling?

## What Google shows today
- "real estate objection handling scripts" page one: realtor.com overcoming objections (could not access; the fetch was blocked), skipcall.io 12 objection responses (fetched 2026-10-24), a Scribd PDF, YouTube, LinkedIn, two The Real Estate Trainer pages. AI Overview gives a three-step framework (acknowledge, clarify, reframe) and example scripts. Leading format: independent site.
- skipcall.io covers 12 cold call objections (already have an agent, not selling, FSBO, expired, commission, send info, wait for the market, take me off the list, how did you get my number, interview multiple agents, I'll think about it, family agent) with a single response each; no table, no follow-up strategy.
- Does poorly: single responses, long pages, no hub that lists everything with a link to a deeper page for each.
- Format check: video, PDF and forum-style results mix in, so a scannable on-page list with a one-line answer each fits the intent.

## Refresh hypothesis
- Baseline: queue shows 223 impressions at position 31.4; saved Search Console (90 days to 2026-10-19, page /objections/) shows 361 impressions, 1 click, impression-weighted position 34.6. Top queries: real estate objection handling scripts 102 at 25.6 (1 click) · fsbo objection scripts 39 at 29.4 · objection handling scripts real estate 37 at 28.5 · real estate objections 29 at 39.7 · real estate objection handling 26 at 32.7 · fsbo objections 23 at 24.9 · handling objections in real estate 13 at 47.4 · seller objections script 13 at 51.5 · real estate objection handlers 11 at 38.2 · buyer objections real estate 10 at 55.
- Hypothesis: searchers want a quick list of common objections with a response, and the hub shows only cards, so this refresh adds a scannable list of all 14 objections with a one-line answer linking each page, plus links to the long-form objection guide and the negotiation scripts post.

## Facts and sources
| Fact | Status | Source | Checked |
|---|---|---|---|
| Each one-line answer summarizes the safe or stronger response already on that objection's page | confirmed | lib/content/objections/*.ts | 2026-10-24 |
| skipcall.io objection list and format | confirmed | https://skipcall.io/en/blog/real-estate-cold-call-objections | 2026-10-24 |
| realtor.com overcoming objections | could not access | https://www.realtor.com/marketing/resources/overcoming-objections-in-real-estate/ | 2026-10-24 |
| Removed "four most frequent objections" claim from the FAQ (no source) | n/a | replaced with wording that makes no ranking claim | 2026-10-24 |

## Links
- Out: all 14 objection pages (list and existing cards), /blog/real-estate-objection-handling/, /blog/real-estate-negotiation-scripts/ (launches this run; renders as plain text until live).
- In: the objection pages already list related objections; recommend adding the hub link to the objection-handling blog posts (already there in most).

## Sayso placement
The hub's existing "How Sayso Helps" block is unchanged. The page's call to action remains the hub-page ContentCTA.

## Implementation notes
- `lib/content/hubs/types.ts`: new optional `quickAnswers` and `relatedReading` fields on HubPageConfig.
- `components/pages/HubPage.tsx`: renders both when present (other hubs unaffected).
- `lib/content/hubs/objections.ts`: 14 quick answers and one related-reading paragraph.
