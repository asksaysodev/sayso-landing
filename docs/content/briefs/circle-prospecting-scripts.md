# Brief: Circle Prospecting Scripts for Real Estate Agents (post and glossary entry)

Queue item 6 · Refresh · written October 24, 2026 by the `/seo-blog` skill

## Target

Main search: **circle prospecting** (210/mo, difficulty 39, page one closed, AI Overview yes). Group total 350 searches a month: circle prospecting scripts (50, closed), circle dialing (50, contested), circle calling real estate (10), circle prospecting example (10), Mike Ferry and Tom Ferry circle prospecting scripts (10 each).

Two pages share this topic: the glossary entry `/glossary/circle-prospecting/` (lib/content/glossary/circle-prospecting.ts) answers "what is" searches, and the post `/blog/circle-prospecting-scripts/` answers "scripts" searches.

## Baseline (Search Console, saved files dated 2026-10-19)

| Page | Impressions | Clicks | Notes |
|---|---:|---:|---|
| Queue row | 245 | n/a | average position 19.4 |
| Glossary `/glossary/circle-prospecting/`, last 90 days, 27 queries | 296 | 1 | "circle prospecting" 54 at 21.3; "circle calling real estate" 45 at 17.2; "circle prospecting real estate" 33 at 18.2; "what is circle prospecting" 24 at 18.8; "what is circle prospecting in real estate" 23 at 15.9; "circle prospecting lists" 20 at 18.6; "circle dialing" 8 at 16.9; "circle prospecting script" 11 at 28.8 |
| Post `/blog/circle-prospecting-scripts/`, 16 months, 12 queries | 197 | 0 | "circle prospecting scripts" 46 at 14.0; "circle prospecting script" 32 at 16.0; "circle prospecting script real estate" 24 at 15.6; "real estate circle prospecting scripts" 19 at 14.4; "circle prospecting" 18 at 32.9; "circle dialing" 10 at 17.3. (The post did not appear in the 90-day query-by-page file.) |

Read: the glossary holds the head term around positions 15 to 21 and the post holds "scripts" searches around positions 12 to 16. Neither converts to clicks. Both pages already contain the exact phrase "circle prospecting" in their titles, so the gap is not the phrase itself but how clearly each page answers its own search and how well the two pass relevance to each other.

## What Google shows today

Page one for "circle prospecting": Reddit r/realtors thread (1), followupboss.com (2), housingwire.com (3), marketleader.com (4), a YouTube video (5), redx.com (6). For "circle prospecting scripts": Reddit, YouTube, Scribd, redx.com, labcoatagents.com.

Pages fetched on 2026-10-24:

| Page | Format | Covers | Gaps |
|---|---|---|---|
| housingwire.com, 10 circle prospecting tips (updated November 12, 2025) | Tips plus 8 scripts, about 2,500 words | Definition, methods (phone, door, mail, email), data tools, Do Not Call and TCPA | No list sizes, no cadence, no results data |
| followupboss.com (November 11, 2021) | Guide, 6-minute read | Definition, finding numbers while respecting Do Not Call, mindset, scripting flow, follow-up about every six months | No list sizes, thin objection handling |
| marketleader.com (November 25, 2025) | Guide, 2,500 to 3,000 words | Radius 0.25 to 0.5 mile, list sizes, contact within 3 to 5 days, Do Not Call reminder | Cited success rate has no source; no comparison with other methods |
| redx.com, 6 tips and scripts (undated) | Tips plus scripts | Script styles (find inventory, hot market, just listed, just sold, permission to text), TCPA mentioned | Unsourced statistics |

Format check: forum and video lead page one for the head term, so the pages need a direct definition and something a thread does not give: a worked example call, a table that matches the script to the trigger, and a list-building and Do Not Call section.

What the ranking pages lack that the post now adds: a worked example call ("circle prospecting example" searches), the list-and-rules section (list size is the one thing most pages leave out), and plain mention that circle calling and circle dialing are the same thing.

## Refresh hypothesis

The glossary entry and the scripts post each rank in the teens for their half of the topic but do not point to each other strongly or define the shared synonyms; this refresh opens the post with a one-sentence definition that names circle prospecting, circle calling and circle dialing, adds a worked example and a list-building section, and makes the glossary entry link to the scripts post in its body text as well as its "go deeper" box, so Google sees one cluster for the topic.

## What changed

Post (`content/blog/circle-prospecting-scripts.mdx`):
- seoTitle "Circle Prospecting Scripts and Examples for Agents" (title kept: it already contains the phrase and ranks near 14); description rewritten without Sayso; `updatedAt` 2026-10-26T09:00:00; `ctaVariant: "script"`; tags.
- Opening defines circle prospecting and names the synonyms, links the glossary entry twice.
- New worked example call (illustrative lines, labeled as such), new section "Build Your Circle Prospecting List and Check It First", FAQ "What is circle dialing?".
- Links added: `/blog/just-listed-just-sold-scripts/`, `/blog/real-estate-voicemail-scripts/`, `/blog/real-estate-scripts-for-new-agents/`, `/blog/do-not-call-rules-real-estate-agents/`.
- Unsourced figures removed or softened: "9 out of 10 dials", "85-95%", "40-45 voicemails", "3x the callback rate".

Glossary (`lib/content/glossary/circle-prospecting.ts`):
- seoTitle "What Is Circle Prospecting in Real Estate? Meaning and Tips" (59 characters), seoDescription (160 characters), definition names circle calling and circle dialing, "convert 3-6 months later" softened, new first paragraph in `howSaysoHelps` linking the scripts post (the only glossary field that renders links in body text), `deeperLink.href` given a trailing slash, FAQ "What is circle dialing?".
- Same object shape and types as before.

## Facts and sources

| Fact | Status | Source | Checked |
|---|---|---|---|
| Circle prospecting radius of a quarter to a half mile, fewer homes in dense areas and more in suburban ones | confirmed (one guide's suggestion) | https://www.marketleader.com/blog/circle-prospecting-in-real-estate-a-simple-guide-to-generating-leads-around-your-listings/ | 2026-10-24 |
| Do Not Call: against the law to call registry numbers unless established business relationship or written agreement; lists synchronized at least every 31 days | confirmed | https://www.ftc.gov/business-guidance/resources/qa-telemarketers-sellers-about-dnc-provisions-tsr | 2026-10-24 |
| Calls to homes barred before 8 a.m. or after 9 p.m. local time of the called party | confirmed | https://www.law.cornell.edu/cfr/text/47/64.1200 (c)(1) | 2026-10-24 |
| Circle prospecting conversion rates, voicemail rates, callback lift | not published (no sourced figures on any page read; Market Leader's 2 to 5 percent has no source) | n/a | 2026-10-24 |
| Content of Mike Ferry and Tom Ferry circle prospecting scripts | could not access (assets-prod.mikeferry.com returned 403); not described in the post | n/a | 2026-10-24 |

## Links

Out (post): hub `/blog/real-estate-cold-calling-guide/`, `/glossary/circle-prospecting/` (twice), `/blog/fsbo-scripts/`, `/blog/follow-up-scripts-cold-leads/`, `/blog/appointment-setting-script/`, `/blog/expired-listing-scripts/`, `/blog/how-to-start-a-real-estate-call/`, `/blog/just-listed-just-sold-scripts/`, `/blog/real-estate-voicemail-scripts/`, `/blog/real-estate-scripts-for-new-agents/`, `/blog/do-not-call-rules-real-estate-agents/`, `/objections/not-interested/`, `/products/cue/`.

In: the glossary entry links to the post (deeperLink and body sentence); the cold calling guide links to the post in its script table and body; the new just listed and just sold post and the voicemail post should link back.

## Sayso placement

cta_variant: script (inline card after paragraph two, to /products/playbook/). The existing "How Sayso Helps" section remains the in-context mention and closing (links /products/cue/ and /demo/). The glossary keeps its own "How Sayso Helps" section.
