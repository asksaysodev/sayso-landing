# Sayso facts and call-to-action rules

Use only these product facts. Anything else about Sayso must be confirmed in the repo (product pages in `lib/content/products/`, pricing in `components/landing/PricingSection.tsx`) before it is written.

## What Sayso is

Live AI coaching for real estate agents during their calls. While the agent is talking, Sayso shows on screen what to say next.

- **Cue** (`/products/cue/`): real-time coaching and objection prompts during the call.
- **Pulse** (`/products/pulse/`): live local market data during the call.
- **Playbook** (`/products/playbook/`): the agent's own scripts shown as an overlay during the call.
- **Smart Capture** (`/products/smart-capture/`): structured call notes written automatically and sent to the CRM.
- Works alongside the dialers and CRMs agents already use (Follow Up Boss, SureSend, Mojo; see `/integrations/`). Sayso is not a dialer and does not place calls.
- Pricing: Individual Agent+ is $179 a month, or $125 a month billed annually ($1,499 a year). Teams and brokerages have separate plans. No free trial exists; never imply one.
- Who buys it: solo and new agents who make their own prospecting calls, team leaders and brokers who coach agents, ISAs.

## The three Sayso touches in a post

1. **Inline call to action after paragraph two.** Automatic from the `ctaVariant` frontmatter; do not write it into the body.

   | ctaVariant | Use for | Button goes to |
   |---|---|---|
   | script | script posts | /products/playbook/ (your scripts on screen during the call) |
   | coaching | coaching posts | /why-sayso/ |
   | leads | lead and appointment posts | /products/cue/ (real-time coaching) |
   | prospecting | prospecting posts | /products/cue/ |
   | team | team leader posts | /for/team-leaders/ |

   Posts with an inline CTA do not show the generic mid-article block, so the post carries three Sayso touches at most.

2. **One in-context mention** in the section where Sayso solves that exact problem. One to three sentences, written as advice, linking one product page. Example for a role play post: "Role play builds the habit, but the real test is a live call. Some agents keep the script on screen during calls with a tool like [Sayso's Playbook](/products/playbook/), so the practiced line is there when the seller pushes back."

   Which feature to link, by topic:

   | Topic | Link |
   |---|---|
   | Scripts, role play, new agents, voicemail | Playbook `/products/playbook/` |
   | Objections, negotiation, seller and buyer conversations | Cue `/products/cue/` |
   | Listing appointments, pricing conversations | Pulse `/products/pulse/` |
   | Follow-up, referrals, converting leads | Smart Capture `/products/smart-capture/` |
   | Coaching and team leaders | `/why-sayso/` and `/for/team-leaders/` |

3. **A short closing section** (three or four sentences) about the reader's next call, titled for the reader ("Make your next call easier", "Before your next listing appointment"), with one link to `/demo/` or a product page.

## Never

- Mention Sayso in the title, seoTitle, description or first two paragraphs.
- Rank Sayso inside a "best X" list as if it were neutral; label it "Sayso (our product)" if it appears at all.
- Claim results, percentages or customer outcomes that are not published on the Sayso site.
- Use "free trial", "try free", "no credit card" or similar.
- Write about, review, rate or price another company's product (dialers, CRMs, lead tools and similar). Coaching programs are the one approved exception, using each program's own published facts.
