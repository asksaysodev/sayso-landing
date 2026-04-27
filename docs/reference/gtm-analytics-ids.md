# GTM `data-analytics-id` Reference

Source of truth for configuring GTM triggers against the Sayso landing page.

GTM container: `GTM-WP9N8VLG` (loaded in [app/layout.tsx](../../app/layout.tsx)).

All attributes use the `data-analytics-id` name (namespaced, won't collide with other `data-*` attributes). Values are kebab-case: `{type}-{action}-{location}`.

---

## Reference Table

| `data-analytics-id` | Action | File | Notes |
|---|---|---|---|
| `cta-book-demo-navbar` | Opens demo calendar | [components/landing/SaysoNavbar.tsx](../../components/landing/SaysoNavbar.tsx) | Desktop navbar, visible on every page |
| `cta-download-navbar` | Opens system-select modal | [components/landing/SaysoNavbar.tsx](../../components/landing/SaysoNavbar.tsx) | Desktop navbar, visible on every page |
| `cta-book-demo-mobile-menu` | Opens demo calendar | [components/landing/SaysoNavbar.tsx](../../components/landing/SaysoNavbar.tsx) | Mobile hamburger menu, only in DOM when menu open |
| `cta-download-mobile-menu` | Opens system-select modal | [components/landing/SaysoNavbar.tsx](../../components/landing/SaysoNavbar.tsx) | Mobile hamburger menu, only in DOM when menu open |
| `cta-get-started-navbar-minimal` | → `#cta` anchor | [components/layout/NavbarMinimal.tsx](../../components/layout/NavbarMinimal.tsx) | Minimal-navbar pages |
| `cta-download-hero` | Opens system-select modal | [components/landing/HeroWithVideo.tsx](../../components/landing/HeroWithVideo.tsx) | Desktop-only render (≥lg) |
| `cta-download-hero-mobile` | Opens system-select modal | [components/landing/HeroWithVideo.tsx](../../components/landing/HeroWithVideo.tsx) | Mobile-only render (<lg), labeled "Create an Account" |
| `cta-download-three-steps-section` | Opens system-select modal | [components/landing/ThreeStepsSection/index.tsx](../../components/landing/ThreeStepsSection/index.tsx) | Home page "3 Easy Steps" |
| `cta-book-demo-three-steps-section` | Opens demo calendar | [components/landing/ThreeStepsSection/index.tsx](../../components/landing/ThreeStepsSection/index.tsx) | Home page "3 Easy Steps" |
| `cta-download-transformation-section` | Opens system-select modal | [components/landing/TransformationSection/index.tsx](../../components/landing/TransformationSection/index.tsx) | Home page "You're Unstoppable" |
| `cta-book-demo-transformation-section` | Opens demo calendar | [components/landing/TransformationSection/index.tsx](../../components/landing/TransformationSection/index.tsx) | Home page "You're Unstoppable" |
| `cta-book-demo-persona-agent-hero` | Opens demo calendar | [components/landing/AgentAdPage.tsx](../../components/landing/AgentAdPage.tsx) | /agent hero |
| `cta-book-demo-persona-agent-footer` | Opens demo calendar | [components/landing/AgentAdPage.tsx](../../components/landing/AgentAdPage.tsx) | /agent footer CTA |
| `cta-book-demo-persona-broker-hero` | Opens demo calendar | [components/landing/BrokerAdPage.tsx](../../components/landing/BrokerAdPage.tsx) | /broker hero |
| `cta-book-demo-persona-broker-footer` | Opens demo calendar | [components/landing/BrokerAdPage.tsx](../../components/landing/BrokerAdPage.tsx) | /broker footer |
| `cta-book-demo-persona-isa-hero` | Opens demo calendar | [components/landing/IsaAdPage.tsx](../../components/landing/IsaAdPage.tsx) | /isa hero |
| `cta-book-demo-persona-isa-footer` | Opens demo calendar | [components/landing/IsaAdPage.tsx](../../components/landing/IsaAdPage.tsx) | /isa footer |
| `cta-book-demo-persona-sales-leader-hero` | Opens demo calendar | [components/landing/SalesLeaderAdPage.tsx](../../components/landing/SalesLeaderAdPage.tsx) | /sales-leader hero |
| `cta-book-demo-persona-sales-leader-footer` | Opens demo calendar | [components/landing/SalesLeaderAdPage.tsx](../../components/landing/SalesLeaderAdPage.tsx) | /sales-leader footer |
| `cta-book-demo-{page-type}` | Opens demo calendar | [components/pages/ContentCTA.tsx](../../components/pages/ContentCTA.tsx) | `{page-type}` ∈ `feature-page`, `comparison-page`, `case-study-page`, `glossary-page`, `hub-page`, `integration-page`, `objection-page`, `persona-page`, `why-sayso-page` |
| `cta-download-{page-type}` | Opens system-select modal | [components/pages/ContentCTA.tsx](../../components/pages/ContentCTA.tsx) | Same 9 page-types as above |
| `cta-book-demo-{page-type}-inline` | Opens demo calendar | [components/pages/ContentInlineCTA.tsx](../../components/pages/ContentInlineCTA.tsx) | `{page-type}` ∈ `comparison-page`, `feature-page`, `glossary-page`, `integration-page`, `objection-page`, `persona-page`, `why-sayso-page` |
| `cta-download-{page-type}-inline` | Opens system-select modal | [components/pages/ContentInlineCTA.tsx](../../components/pages/ContentInlineCTA.tsx) | Same 7 page-types as above |
| `cta-book-demo-feature-page-inline` | Opens demo calendar | [components/pages/FeatureCTAButtons.tsx](../../components/pages/FeatureCTAButtons.tsx) | Feature-page inline pair |
| `cta-download-feature-page-inline` | Opens system-select modal | [components/pages/FeatureCTAButtons.tsx](../../components/pages/FeatureCTAButtons.tsx) | Feature-page inline pair |
| `cta-book-demo-comparison-page-tldr` | Opens demo calendar | [components/pages/TldrButtons.tsx](../../components/pages/TldrButtons.tsx) | TL;DR pair on /compare/[slug] |
| `cta-download-comparison-page-tldr` | Opens system-select modal | [components/pages/TldrButtons.tsx](../../components/pages/TldrButtons.tsx) | TL;DR pair on /compare/[slug] |
| `cta-book-demo-blog-article` | Opens demo calendar | [components/blog/BlogInArticleCTA.tsx](../../components/blog/BlogInArticleCTA.tsx) | In-article CTA on /blog/[slug] |
| `cta-download-blog-article` | Opens system-select modal | [components/blog/BlogInArticleCTA.tsx](../../components/blog/BlogInArticleCTA.tsx) | In-article CTA on /blog/[slug] |
| `cta-book-demo-persona-page-get-started` | Opens demo calendar | [components/pages/PersonaPage.tsx](../../components/pages/PersonaPage.tsx) | /for/[slug] "Get Started" section |
| `cta-download-persona-page-get-started` | Opens system-select modal | [components/pages/PersonaPage.tsx](../../components/pages/PersonaPage.tsx) | /for/[slug] "Get Started" section |
| `cta-download-pricing-individual` | Opens system-select modal | [components/landing/PricingSection.tsx](../../components/landing/PricingSection.tsx) | Individual Agent plan |
| `cta-signup-pricing-teams` | Opens app.asksayso.com signup | [components/landing/PricingSection.tsx](../../components/landing/PricingSection.tsx) | Teams & Brokerages plan |
| `cta-book-demo-pricing-coming-soon` | Redirects to `/demo` | [components/landing/PricingSection.tsx](../../components/landing/PricingSection.tsx) | "Coming Soon" plan |
| `cta-onboarding-get-started` | Starts onboarding flow | [components/onboarding/OnboardingFlow.tsx](../../components/onboarding/OnboardingFlow.tsx) | Welcome screen start button |
| `cta-book-demo-onboarding-complete` | Opens demo calendar | [components/onboarding/OnboardingNavButtons.tsx](../../components/onboarding/OnboardingNavButtons.tsx) | Terminal CTA after onboarding |
| `form-newsletter-footer` | (iframe wrapper) | [components/landing/Footer.tsx](../../components/landing/Footer.tsx) | Beehiiv iframe, see footnote |
| `form-newsletter-blog` | (iframe wrapper) | [components/blog/BlogNewsletterCTA.tsx](../../components/blog/BlogNewsletterCTA.tsx) | Beehiiv iframe, see footnote |
| `form-newsletter-windows-waitlist` | (iframe wrapper) | [components/landing/SystemSelectModal.tsx](../../components/landing/SystemSelectModal.tsx) | Beehiiv iframe inside modal |
| `contact-email` | `mailto:support@asksayso.com` | [lib/navigation.ts](../../lib/navigation.ts) (rendered by [components/landing/Footer.tsx](../../components/landing/Footer.tsx)) | Footer "Help" link |

---

## Newsletter iframe footnote

Form submissions happen inside Beehiiv's cross-origin iframe. GTM cannot observe them via `data-analytics-id`. These three IDs (`form-newsletter-footer`, `form-newsletter-blog`, `form-newsletter-windows-waitlist`) are only useful for view/click-on-wrapper tracking.

To capture actual newsletter subscribes, you'll need:
1. Beehiiv webhook → server endpoint (e.g. a Next.js API route)
2. A client-side signal (e.g. cookie or postMessage bridge)
3. `dataLayer.push({ event: 'newsletter_submit', location: '...' })`

That's out of scope for the attribute-only task.

---

## Naming convention

- **Format:** kebab-case only. Lowercase, hyphens between words, no underscores, no camelCase.
- **Pattern:** `{type}-{action}-{location}`.
- **Same action in different spots** shares the `{type}-{action}` prefix, with a unique `{location}` suffix. Lets you compare conversion by placement in GA/GTM.
- **Responsive twin buttons** (mobile render + desktop render of the same CTA) get distinct suffixes (`-hero` vs `-hero-mobile`) because they're separate DOM nodes, and one count per breakpoint keeps the totals honest.

---

## Slug granularity

Dynamic-slug pages use **page-type only** in the ID, not the slug. For example, `/features/cue` and `/features/playbook` both emit `cta-book-demo-feature-page`.

Per-slug breakdown is available in GA via the `page_path` dimension, so there's no reason to bake the slug into the ID and explode trigger count.

**Exception:** persona ad pages (/agent, /broker, /isa, /sales-leader) bake the persona into the ID because these are individually ad-targeted surfaces and per-persona conversion is the whole point.

---

## Code changes made

**Component signature changes** (all required `location: string`):
- `ContentCTA` — [components/pages/ContentCTA.tsx](../../components/pages/ContentCTA.tsx)
- `ContentInlineCTA` — [components/pages/ContentInlineCTA.tsx](../../components/pages/ContentInlineCTA.tsx)
- `AdPageCTAButton` — [components/landing/AdPageCTAButton.tsx](../../components/landing/AdPageCTAButton.tsx)

**Optional prop additions:**
- `OnboardingNavButtons.continueDataAnalyticsId?: string`
- `NavLink.dataAnalyticsId?: string` (in [lib/navigation.ts](../../lib/navigation.ts))

**Type additions:**
- `PricingPlan.analyticsId: string` (required on each plan entry in `PricingSection`)

**Shared component fix:**
- [components/ui/Button.tsx](../../components/ui/Button.tsx) — the `<a>` branch now spreads `{...props}` so `data-*` attributes pass through on `href` usage (previously it only spread on the `<button>` branch).

---

## Verification

1. `npm run dev` (port 3001). Inspect elements in DevTools — confirm `data-analytics-id` is present on each rendered CTA.
2. Visit: `/`, `/pricing`, `/agent`, `/broker`, `/isa`, `/sales-leader`, `/features/cue` (or any slug), `/compare/sayso-vs-shilo`, `/for/solo-agents`, `/blog/[any-slug]`, `/objections/[any-slug]`, `/glossary/[any-slug]`, `/integrations/follow-up-boss`, `/why-sayso`.
3. In DevTools console on each page: `document.querySelectorAll('[data-analytics-id]')` — verify expected IDs are present and no duplicates.
4. Click each CTA and confirm behavior is unchanged (demo modal, system-select modal, or anchor jump still works).
5. Mobile breakpoint: shrink to <768px and confirm mobile-only IDs appear (`cta-download-hero-mobile`, `cta-get-started-mobile-menu`).
6. `npm run build` — must pass with no TypeScript errors. Passed as of the commit that introduced these attributes.

---

## Total count

37 unique `data-analytics-id` values (counting page-type family IDs as one row each per `{page-type}` substitution).
