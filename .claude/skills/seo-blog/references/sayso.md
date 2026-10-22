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

   | ctaVariant | Use for | What it says |
   |---|---|---|
   | script | script posts | the next line on screen during the call |
   | coaching | coaching posts | how live call coaching compares |
   | dialer | dialer posts | live coaching on the calls your dialer makes |
   | crm | CRM posts | call notes written into the CRM |
   | leads | lead and appointment posts | the next question while the lead is talking |
   | prospecting | prospecting posts | live prompts that keep calls on track |
   | team | team leader posts | coaching every agent without listening in |

2. **One in-context mention** in the section where Sayso solves that exact problem. One to three sentences, written as advice, linking one product page. Example for a role play post: "Role play builds the habit, but the real test is a live call. Some agents keep the script on screen during calls with a tool like [Sayso's Playbook](/products/playbook/), so the practiced line is there when the seller pushes back."

3. **A short closing section** (three or four sentences) about the reader's next call, titled for the reader ("Make your next call easier", "Before your next listing appointment"), with one link to `/demo/` or a product page.

## Never

- Mention Sayso in the title, seoTitle, description or first two paragraphs.
- Rank Sayso inside a "best X" list as if it were neutral; label it "Sayso (our product)" if it appears at all.
- Claim results, percentages or customer outcomes that are not published on the Sayso site.
- Use "free trial", "try free", "no credit card" or similar.
