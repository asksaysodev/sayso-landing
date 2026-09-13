# Sayso SEO Overview

**Updated:** September 13, 2026

**Site:** https://www.asksayso.com

**Purpose:** Current organic-search baseline, priorities, and implementation plan

## Executive summary

Sayso does not need more long articles simply to increase its page count. It already has 38 blog posts, and the average article is roughly 2,100 words. Google is also indexing most submitted URLs. The immediate constraint is that too few pages earn strong positions for non-brand, product-relevant searches, and the pages that do appear often have weak click-through rates.

The highest-priority work is:

1. Improve titles, descriptions, introductions, and internal links on pages already receiving impressions.
2. Remove unsupported performance claims that weaken trust and make the content difficult to substantiate.
3. Fix metadata and sitemap signals that can make search snippets or recrawl decisions less reliable.
4. Publish narrower, problem-led content that maps directly to prospecting calls, appointment setting, objection handling, and call coaching.
5. Build authority through real estate partnerships, expert contributions, original data, and customer evidence.
6. Repair organic conversion attribution so SEO can be judged by qualified demos, not traffic alone.

The Cut Brush result is useful as a content-model lesson, not as a template to copy literally. Its growth came from concrete pages that answer a specific, high-intent problem. Sayso should apply the same principle to real estate prospecting rather than publishing broad sales advice.

## Current first-party baseline

The figures below come from the September 13, 2026 portfolio audit using Google Search Console and GA4 data.

### Google Search Console

| Period | Clicks | Impressions | Interpretation |
|---|---:|---:|---|
| Last 12 weeks | 143 | 13,009 | The site has visibility, but it is not compounding yet. |
| First week in the 12-week range | 17 | 1,978 | Starting comparison point. |
| Latest week in the 12-week range | 7 | 521 | Both discovery and clicks have declined. |
| Latest 28 days | 34 | 2,510 | Current short-term baseline. |
| Prior 28 days | 54 | 4,276 | Clicks and impressions were higher in the preceding period. |

Recent visibility by page type reinforces the opportunity:

| Page type | Impressions | Clicks | Primary issue |
|---|---:|---:|---|
| Blog | 611 | 3 | Rankings and snippets are not converting visibility into visits. |
| Glossary | 620 | 1 | Some queries are informational but have limited product fit. |
| Objections | 180 | 0 | The topic fits Sayso, but the pages need stronger rankings and search framing. |
| Homepage | 197 | 13 | Brand and direct product demand still produce most meaningful search traffic. |

### Index coverage

Google reported 80 of 86 sitemap URLs indexed, about 93 percent. This is healthy enough that indexing is not the main growth explanation, but the six exceptions should be handled deliberately.

**Crawled, currently not indexed**

- `/blog/best-real-estate-call-coaching-software/`
- `/blog/how-to-book-appointments-real-estate/`

**Discovered, currently not indexed**

- `/blog/real-estate-phone-script-for-leads/`
- `/blog/wait-until-spring-objection/`
- `/objections/not-ready-yet/`

**Duplicate without a user-selected canonical**

- `/glossary/isa-real-estate/`

The first two URLs are commercially relevant and should receive the strongest refresh and internal-link support. The discovered URLs should be checked again after deployment and submitted for recrawl. The ISA duplicate needs a rendered canonical inspection before changing the page route or content.

### GA4 and conversion attribution

GA4 recorded 72 Organic Search sessions in the recent three-week view and no attributed conversions. Seventeen `invitee_meeting_scheduled` events were attributed to Direct, while Calendly `/asksayso/demo?...` URLs appeared as landing pages.

This suggests an attribution break or self-referral-style handoff between Sayso and Calendly. It does not prove that organic search generated no demos. Before using organic conversion rate as a decision metric, preserve the original source and campaign information across the scheduling flow and verify the event in GA4 DebugView and acquisition reports.

## What Cut Brush teaches us

Cut Brush generated 370 clicks and 35,679 impressions in the comparable 12-week audit. Weekly clicks increased from 6 to 61, and weekly impressions increased from 1,222 to 5,110. Its recent blog pages produced 106 clicks from 8,390 impressions.

The transferable lessons are:

- Specific problems outperform broad category essays. Cost, permits, service decisions, and local questions give the searcher a clear reason to click.
- A page should resolve one intent before it tries to introduce the business.
- Useful detail and decision support are stronger differentiators than word count.
- Internal links work best when the next page is a natural next question, not merely a related keyword.
- Search success compounds when pages earn references and links from relevant sites.

For Sayso, the equivalent topics are specific moments in a real estate conversation: what to ask a new lead, how to respond to an objection, when to suggest an appointment, how to follow up, and how live coaching differs from role-play or post-call review.

## Search opportunities already visible

These are observed queries, not forecasts. Position values are averages and can vary by device and location.

| Query or theme | Impressions | Average position | Recommended destination and action |
|---|---:|---:|---|
| guided sales conversation | 50 | 13.5 | Refresh the existing conversation guide around the framework and its real estate use case. |
| listing appointment | 27 | 14.2 | Improve the glossary definition, FAQ, and link to the appointment-setting guide. |
| real estate objection handling scripts | 26 | 24.2 | Strengthen the pillar and objection hub, then support it with narrower objection pages. |
| FSBO objection scripts | 18 | 28.9 | Refresh the existing FSBO material and link it into the objection cluster. |
| best time to call expired listings | 17 | 19.3 | Answer directly in the expired-listing guide and support the answer with practical context. |
| expired listings scripts | 13 | 30.0 | Improve the existing script guide rather than creating a competing page. |
| how to get listing appointments | 10 | 18.6 | Consolidate authority around the existing appointment guide. |
| how to respond to real estate leads | 7 | 13.3 to 23.6 | Align the lead-conversation guide with buyer and seller response intent. |

The query `what does BATVAI mean` produced 28 impressions at an average position of 19.4, currently landing on the glossary hub. BATVAI means Buyer's Agent To Verify All Information and is mainly an MLS disclaimer query. It has weak alignment with Sayso's product and likely low conversion intent, so a dedicated BATVAI page is not a current priority. That decision avoids optimizing for traffic that is unlikely to become a qualified demo.

## Work included in this SEO refresh

### Technical and metadata

- Give blog posts an optional short `seoTitle` while preserving descriptive on-page headings.
- Stop the blog template from producing duplicated title suffixes.
- Rewrite homepage search metadata around real-time AI call coaching for real estate agents.
- Remove synthetic current timestamps from sitemap entries. Blog entries continue to use real content update dates.
- Mark affiliate and referral campaign pages `noindex,follow` while preserving their crawlable links.

### Existing content refreshes

- Real estate call coaching software
- Expired listing scripts
- How to book real estate appointments
- Guided sales conversations
- How to talk to real estate leads
- Questions to ask real estate leads
- Real estate objection handling
- Listing appointment glossary entry
- Objection library introduction

The refreshes focus on direct answers, accurate claims, buyer and seller coverage, concise search titles, and relevant internal paths. They do not add filler solely to make pages longer.

## Recommended publishing roadmap

New articles should be approved only when the intent is distinct from an existing URL. Where the site already has the right page, refresh and consolidate instead of creating keyword cannibalization.

### Priority 1: strengthen existing demand

1. Finish the refresh and recrawl cycle for call coaching software and appointment setting.
2. Refresh the FSBO cluster around the specific objections a seller gives an agent.
3. Improve the real estate phone script page that is discovered but not indexed.
4. Add contextual links from relevant product, persona, and glossary pages into the refreshed pillars.
5. Review the pages after 28 days using query-level clicks, impressions, position, and CTR.

### Priority 2: publish narrow problem-led resources

Suggested briefs, subject to query overlap review:

1. **Real estate prospecting call checklist**: preparation, permission, discovery, next step, notes, and follow-up.
2. **Expired listing follow-up plan**: what to do after the first conversation, with timing based on the seller's stated situation rather than unsupported universal benchmarks.
3. **Buyer lead qualification questions**: financing, timeline, location, motivation, and next-step signals.
4. **Real estate call notes template**: a practical CRM handoff template for buyer and seller conversations.
5. **Live call coaching vs role-play vs post-call review**: a decision page with transparent strengths and limitations.
6. **Real estate ISA call coaching guide**: team workflow, quality review, handoffs, and manager visibility.

Each new resource should include an original example, a clear answer near the top, one primary query family, two to five useful internal links, and a product connection that follows naturally from the problem.

### Priority 3: earn authority

- Publish a small original benchmark using anonymized, aggregated product data only after privacy and methodology review.
- Contribute expert commentary to real estate publications, brokerage education programs, and industry podcasts.
- Build integration and workflow pages with CRM and dialer partners where there is a real supported relationship.
- Turn verified customer outcomes into case studies that explain the starting point, workflow change, time period, and measured result.
- Pursue links from relevant real estate and sales-technology sources rather than general directories.

The May 2026 audit found only three referring domains. A current backlink crawl was not available for this update, so that old count should not be treated as the present total.

## 90-day execution plan

### Days 1 to 30

- Ship this technical and on-page refresh.
- Inspect the rendered canonical for the ISA glossary URL.
- Request recrawls for the five currently non-indexed, product-relevant pages after deployment.
- Validate GA4 and Calendly source preservation end to end.
- Record query and page baselines for every refreshed URL.

### Days 31 to 60

- Publish two narrow problem-led resources after cannibalization checks.
- Refresh the FSBO and real estate phone-script clusters.
- Add internal links from product and persona pages where they answer the reader's next question.
- Begin a focused real estate partnership and expert-contribution campaign.

### Days 61 to 90

- Publish two more validated resources or one resource plus one evidence-backed case study.
- Compare refreshed URLs against their 28-day baseline.
- Improve snippets for pages with stable impressions and below-expected CTR.
- Expand only the clusters that show qualified non-brand impressions or assisted conversions.

## Measurement framework

Review these metrics by landing page and query, not only sitewide:

- Non-brand clicks and impressions
- Number of relevant queries in positions 1 through 10 and 11 through 20
- CTR for refreshed pages at comparable positions
- Organic demo starts and completed bookings after attribution is repaired
- Assisted conversions from organic landing pages
- Index status of the six exception URLs
- Relevant referring domains and links to priority pages

No single metric should determine success. Impressions without relevant clicks can indicate poor snippets or weak intent fit, while traffic without qualified actions can indicate that the topic is too far from the product.

## Data boundaries

- Search Console and GA4 figures are first-party observations from the September 13, 2026 audit.
- Cut Brush figures are first-party comparison data from the same audit period.
- Average positions are directional and should not be presented as fixed rankings.
- A current backlink total was not verified in this update.
- Content claims should use Sayso's own measured evidence or a cited, credible source. Unsupported percentages and universal performance promises should be removed.
