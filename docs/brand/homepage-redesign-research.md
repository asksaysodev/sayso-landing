# Homepage redesign: presence during the call

Research reviewed September 9, 2026. This is a design rationale, not evidence of a measured conversion improvement.

## The customer message

Sayso is AI call coaching for real estate agents. It helps agents stay present by suggesting what to say next and capturing details while they talk. The agent leads the conversation and chooses how to use the guidance. Booking appointments remains a desired outcome; the homepage first explains the product and why someone would want it alongside them.

The hero pairs the category label **AI call coaching for real estate agents** with **Stay in the call when the moment matters most.** The explanation immediately names the three actions: listen, suggest, capture. This preserves the user's vision of reducing friction and being present when a conversation matters.

## Review of the previous page

- The hero promised “Book 2x More Appointments from Prospecting Calls.” It led with a numerical result before establishing what the customer was downloading or how it helped. This redesign does not generalize a customer result into a universal promise.
- Earlier hero work already moved from video to the actual coach widget (commits `e73396d` and `c40e898`). That product-first intent is useful. However, the small widget, abbreviated fields, changing market information, and typing indicators require interpretation. The new hero illustrates one understandable exchange immediately; the existing product tour remains the destination for the fuller interface.
- Testimonials, audience cards, pain points, and transformation claims all appeared before the three-step explanation. The new sequence explains the workflow earlier and consolidates repeated benefits.
- The original download action had no nearby platform explanation. The new copy accurately states Mac availability and the Windows waitlist, matching `SystemSelectModal.tsx`.
- The former homepage FAQ said transcripts were disposed of immediately. The newer `PrivacyPolicyPage.tsx` describes stored session records that may include transcripts, cues, notes, and summaries. The new homepage FAQ follows that existing policy and links to it. It does not change the policy or infer additional guarantees.

## References outside real estate prospecting

| Reference | Observed approach | Application to Sayso |
| --- | --- | --- |
| [Granola](https://www.granola.ai/) | Establishes an AI notepad category, shows notes in context, and organizes the explanation around before, during, and after meetings. | Name the category immediately and show how help fits into a familiar activity. Explain Sayso through the agent's call workflow. |
| [Grammarly](https://www.grammarly.com/) | Pairs the user's writing goal with specific forms of assistance and examples such as tone suggestions and paragraph rewrites. | Keep the human's work central. Pair an emotional benefit with tangible assistance and make it clear that the agent chooses the words. |
| [Krisp](https://krisp.ai/) | Names its voice-AI category and lets visitors explore individual capabilities through examples and controls. | Use a small, visitor-controlled example to make the assistance understandable. Keep it limited to three call situations. |

These are qualitative observations of the public pages. Their conversion rates, testing history, and customer research are not available here. The proposal borrows explanatory patterns, not their visual identities or product claims.

## Page sequence and design decisions

1. **Definition and demonstration:** an explicit category, the user's core promise, a brief explanation, Download Sayso, and a lower-commitment product-tour link. Three selectable examples pair a prospect statement with a suggested response and captured detail. Examples are labeled illustrative and do not claim to be live calls or exact application screenshots.
2. **Customer context:** a compact static row using six existing customer logo assets. It avoids implying that entire brokerages endorse or deploy Sayso. All original logo assets and the existing shared hero remain available to other routes.
3. **How it works:** launch alongside the calling tools, get guidance and notes during the conversation, then review and use the notes afterward.
4. **Practical benefits:** live guidance and Smart Capture, each linked to its existing product page. The CRM wording follows the documented review-and-copy workflow, avoiding a universal automatic-sync claim.
5. **Customer evidence:** retain the existing four video testimonials and their attributions verbatim. Individual customer metrics stay within their attributed testimonials.
6. **Practical questions:** product definition, the agent's role, buyers and sellers, integrations, platform support, and conversation data.
7. **Final invitation:** repeat download with a demo alternative and accurate platform availability.

The existing navy, blue, yellow, and light neutral palette is retained. Manrope becomes the primary homepage heading font; a yellow underline, navy offset button shadow, and Bangers step numbers keep recognizable brand details. The homepage has more breathing room and fewer simultaneously moving elements. Shared navigation and footer retain the current design.

On mobile, the example controls follow the illustration visually so the prospect's words and Sayso's response appear sooner. The three scenes share a CSS grid cell; hidden scenes reserve space without appearing in the accessibility tree, keeping the demonstration height stable for all three examples.

The floating demo card is removed from the homepage composition so it does not cover the interactive example or compete with the hero's actions. Visitors can still book a demo from navigation, the FAQ, or the final invitation.

## Verification and follow-up measurement

Run `npm run lint`, `npm run type-check`, `npm run build`, and, with a local server available, `node scripts/check-homepage.cjs`. The smoke script checks five viewport sizes, first-fold CTA visibility, horizontal overflow, stable example height, keyboard scenario selection, FAQ disclosure, the existing download modal, internal homepage links, and runtime errors. Local screenshots go to ignored `exports/homepage-redesign/`.

Reviewed hero screenshots: [desktop, 1440 × 900](./homepage-redesign/desktop.png) and [mobile, 390 × 844](./homepage-redesign/mobile.png). The automated responsive checks also cover 1280 × 720, 768 × 1024, and 320 × 740. The headline and native FAQ are checked with JavaScript disabled. Third-party forms and analytics are blocked in the interactive smoke checks; these checks do not submit a form, download an installer, or book a meeting.

Existing download analytics IDs are preserved in the hero. Product-tour and example-selection IDs distinguish discovery from download intent. After release, assess homepage-to-tour, homepage-to-download, and homepage-to-demo rates alongside completed signups. A short customer comprehension test should ask what Sayso is, when it helps, who speaks, and what the next action does. No conversion lift is asserted by this PR.
