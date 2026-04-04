# UI Component Inventory — Sayso Landing Page

> Generated: 2026-04-03
> Total components cataloged: **95+**

---

## Table of Contents

1. [Layout Components](#1-layout-components)
2. [Content Components](#2-content-components)
3. [CTA Components](#3-cta-components)
4. [Blog / Article Components](#4-blog--article-components)
5. [SEO / Meta Components](#5-seo--meta-components)
6. [Shared UI Elements](#6-shared-ui-elements)
7. [Page-Specific Components (NOT Reusable)](#7-page-specific-components-not-reusable)

---

## 1. Layout Components

### SaysoNavbar
- **Path:** `components/landing/SaysoNavbar.tsx`
- **Description:** Main sticky navigation bar with logo, menu links, CTA buttons, and mobile hamburger menu.
- **Used on:** Homepage, Blog (layout), Affiliate, Case Studies, Contact, Demo, Feedback, Pricing, Privacy, Terms, Referral, Security (~15 pages)
- **Props:** None
- **Visual behavior:** Sticky top-4, rounded pill-shaped white navbar with comic-style border. Logo left, desktop nav links center, Download button right. Mobile: hamburger menu with dropdown panel, closes on Escape/outside click.

### Footer
- **Path:** `components/landing/Footer.tsx`
- **Description:** Branded footer with navigation links, newsletter signup, and social media links.
- **Used on:** Homepage, Blog (layout), Affiliate, Case Studies, Contact, Demo, Feedback, Pricing, Privacy, Terms, Referral, Security (~14 pages)
- **Props:** None
- **Visual behavior:** Dark blue footer (#1D4871) with yellow top border. 2-column layout on mobile (logo/newsletter + links grid), responsive grid on desktop. Includes superhero Easter egg in bottom-right corner.

### LandingLayout
- **Path:** `components/layout/LandingLayout.tsx`
- **Description:** Page wrapper that renders navbar, main content area, and footer.
- **Used on:** Available for marketing pages (used via layout system)
- **Props:** `children: ReactNode`
- **Visual behavior:** Vertical stack: NavbarMinimal → main content → FooterSimple.

### NavbarMinimal
- **Path:** `components/layout/NavbarMinimal.tsx`
- **Description:** Minimal header with logo and single CTA button.
- **Used on:** Used by LandingLayout
- **Props:** None
- **Visual behavior:** Simple horizontal bar with logo left, CTA button right.

### FooterSimple
- **Path:** `components/layout/FooterSimple.tsx`
- **Description:** Simplified footer with copyright and essential links.
- **Used on:** Used by LandingLayout
- **Props:** None
- **Visual behavior:** Compact footer with minimal links and copyright text.

### DemoCalendarProvider
- **Path:** `app/context/landing/DemoCalendarContext.tsx`
- **Description:** React context provider that manages demo calendar, contact form, onboarding, and system select modals.
- **Used on:** Blog layout, Affiliate, Case Studies, Contact, Demo, Pricing, Privacy, Terms, Referral, Security (~12 pages)
- **Props:** `children: ReactNode`
- **Visual behavior:** Renders no visible UI itself; provides modal management context. When triggered, renders OnboardingModal, SystemSelectModal, demo calendar popup, or contact form popup.

### Container
- **Path:** `components/ui/Container.tsx`
- **Description:** Max-width container with responsive horizontal padding.
- **Used on:** Used inside multiple section components
- **Props:** `children: ReactNode`, `className?: string`
- **Visual behavior:** Centered container with max-width 1200px, responsive padding (`px-6 md:px-8 lg:px-12`).

### Section
- **Path:** `components/ui/Section.tsx`
- **Description:** Section wrapper with variant backgrounds and vertical padding.
- **Used on:** Used inside multiple section components
- **Props:** `children: ReactNode`, `className?: string`, `variant?: 'default' | 'accent'`, `id?: string`
- **Visual behavior:** Full-width section with `py-16 sm:py-24` padding. Accent variant applies alternate background color.

---

## 2. Content Components

### HeroWithVideo
- **Path:** `components/landing/HeroWithVideo.tsx`
- **Description:** Main hero section with headline, tagline, CTA buttons, product showcase video, and social proof logos.
- **Used on:** Homepage (`/`)
- **Props:** `content?: HeroContent` (optional `headline`, `tagline`, `taglineSub`, `headlineSize`)
- **Visual behavior:** 3-column layout (text | superhero character | video), responsive mobile carousel, animated slide-in text, yellow narrator badge overlays video, social proof logos centered below.

### HeroSection
- **Path:** `components/sections/HeroSection.tsx`
- **Description:** Generic hero section with headline, subhead, dual CTAs, and optional right-side content.
- **Used on:** Available as reusable section template
- **Props:** `eyebrow?: string`, `headline: string`, `subhead?: string`, `primaryCTA?: { text, href }`, `secondaryCTA?: { text, href }`, `rightContent?: ReactNode`
- **Visual behavior:** Full-width hero with large H1, subtitle text, and up to two CTA buttons side by side. Optional right content area for media.

### PainPointPanel
- **Path:** `components/landing/PainPointPanel/index.tsx`
- **Description:** Showcases pain points with mobile carousel and desktop 2-panel "Without Sayso" section.
- **Used on:** Homepage (`/`)
- **Props:** None (uses internal state)
- **Visual behavior:** Mobile: horizontal carousel with swipe. Desktop: side-by-side panels showing comic-style struggle illustrations.

### PanelTheStruggle
- **Path:** `components/landing/PainPointPanel/PanelTheStruggle.tsx`
- **Description:** Comic panel showing an agent freezing on a call.
- **Used on:** Used inside PainPointPanel
- **Props:** `imgHeight?: number`
- **Visual behavior:** Comic-style illustration card with descriptive text.

### PanelWastedOpportunity
- **Path:** `components/landing/PainPointPanel/PanelWastedOpportunity.tsx`
- **Description:** Comic panel showing missed revenue from lost calls.
- **Used on:** Used inside PainPointPanel
- **Props:** `imgHeight?: number`
- **Visual behavior:** Comic-style illustration card with descriptive text.

### TransformationSection
- **Path:** `components/landing/TransformationSection/index.tsx`
- **Description:** Victory metrics and transformation messaging with superhero imagery and animated starburst background.
- **Used on:** Homepage (`/`)
- **Props:** `content?: TransformationContent` (headline, subheading, metrics array)
- **Visual behavior:** Dark blue background (#1D4871) with yellow accent stripe, 2-column layout (hero image left, metrics right on desktop), metric cards with icons in white-rounded boxes, floating superhero animation.

### ThreeStepsSection
- **Path:** `components/landing/ThreeStepsSection/index.tsx`
- **Description:** 3-step process section showing how Sayso works with visual cards and mobile carousel.
- **Used on:** Homepage (`/`), UI catalog (`/(marketing)/ui`)
- **Props:** `content?: ThreeStepsContent` (headline, subheading, steps array)
- **Visual behavior:** Mobile: carousel with prev/next buttons and dot indicators. Desktop: all 3 steps horizontal with comic arrow connectors. Dual CTAs at bottom.

### ProductShowcaseSection
- **Path:** `components/landing/ProductShowcaseSection/index.tsx`
- **Description:** Demonstrates real-time product features with animated video mockup, suggestions, and signal indicators.
- **Used on:** Homepage (`/`), UI catalog (`/(marketing)/ui`)
- **Props:** None (internal state hook)
- **Visual behavior:** White background, centered copy with eyebrow text, ProductShowcaseVideo with typewriter suggestions and signal indicators.

### ProductShowcaseCopy
- **Path:** `components/landing/ProductShowcaseCopy.tsx`
- **Description:** "Enter Sayso" hero intro copy block.
- **Used on:** Used inside ProductShowcaseSection
- **Props:** None
- **Visual behavior:** Centered text block with headline and subtext.

### ProductShowcaseDesktop
- **Path:** `components/landing/ProductShowcaseDesktop.tsx`
- **Description:** Responsive desktop demo frame with widget overlay showing product in action.
- **Used on:** Used inside ProductShowcaseSection
- **Props:** Internal state (scaling, widget position)
- **Visual behavior:** Desktop mockup frame displaying live product demo with responsive scaling.

### FeatureGrid
- **Path:** `components/sections/FeatureGrid.tsx`
- **Description:** Grid of feature cards in 1–3 columns with icons.
- **Used on:** Available as reusable section template
- **Props:** `headline?: string`, `subhead?: string`, `features: Array<{ title, description, icon }>`
- **Visual behavior:** Responsive grid (1-col mobile, 2-col tablet, 3-col desktop) of cards with icon, title, and description.

### HowItWorksSteps
- **Path:** `components/sections/HowItWorksSteps.tsx`
- **Description:** Numbered 3-step process section with icons.
- **Used on:** Available as reusable section template
- **Props:** `headline?: string`, `steps: Array<{ number, title, description }>`
- **Visual behavior:** Numbered step cards in horizontal layout with connecting visual elements.

### ProblemSection
- **Path:** `components/sections/ProblemSection.tsx`
- **Description:** Grid of pain point cards highlighting problems the product solves.
- **Used on:** Available as reusable section template
- **Props:** `headline?: string`, `subhead?: string`, `painPoints: Array<{ title, description }>`
- **Visual behavior:** Grid of cards with problem descriptions.

### SocialProofRow
- **Path:** `components/sections/SocialProofRow.tsx`
- **Description:** 3-column statistics display for social proof.
- **Used on:** Available as reusable section template
- **Props:** `stats: Array<{ value, label }>`
- **Visual behavior:** 3 large numbers/values centered with labels beneath each.

### SocialProofStrip
- **Path:** `components/landing/SocialProofStrip.tsx`
- **Description:** Marquee-scrolling logo strip showing partner/client logos.
- **Used on:** UI catalog (`/(marketing)/ui`)
- **Props:** None
- **Visual behavior:** Horizontally scrolling infinite marquee of logos.

### FAQAccordion
- **Path:** `components/sections/FAQAccordion.tsx`
- **Description:** Collapsible FAQ section with expand/collapse state management.
- **Used on:** Available as reusable section template
- **Props:** `headline?: string`, `faqs: Array<{ question, answer }>`
- **Visual behavior:** Vertical stack of clickable question rows that expand to reveal answers. One open at a time.

### PricingSection
- **Path:** `components/landing/PricingSection.tsx`
- **Description:** Pricing page with three tiers (Individual Agent, Teams, Coming Soon) and feature bullets.
- **Used on:** Pricing (`/pricing`), UI catalog (`/(marketing)/ui`)
- **Props:** None (uses internal state and DemoCalendarContext)
- **Visual behavior:** Light gray background with halftone pattern, 3-column card grid (1-col mobile), popular plan highlighted with blue shadow/accent, checkmark icons for features, free trial badge.

### Card
- **Path:** `components/ui/Card.tsx`
- **Description:** Container card with border and padding.
- **Used on:** Used inside multiple components
- **Props:** `children: ReactNode`, `className?: string`
- **Visual behavior:** White card with border, rounded corners, and padding.

### MomentCard
- **Path:** `components/ui/MomentCard.tsx`
- **Description:** Card displaying a "moment" with label and conversation prompts.
- **Used on:** Used in product showcase/demo sections
- **Props:** `momentLabel: string`, `whatToSay: string`, `whatToAskNext: string`
- **Visual behavior:** Styled card with moment label badge, "What to say" prompt, and "What to ask next" prompt.

---

## 3. CTA Components

### FinalCTASection
- **Path:** `components/sections/FinalCTASection.tsx`
- **Description:** Full-width dark CTA banner at the bottom of a page.
- **Used on:** Available as reusable section template
- **Props:** `headline: string`, `subhead?: string`, `ctaText: string`, `ctaHref: string`
- **Visual behavior:** Full-width dark background section with large headline, optional subtext, and prominent CTA button.

### Button
- **Path:** `components/ui/Button.tsx`
- **Description:** Primary/secondary button with icon support and variant styles.
- **Used on:** Used across multiple components and pages
- **Props:** `children: ReactNode`, `variant?: string`, `className?: string`, `href?: string`, plus standard HTML button attributes
- **Visual behavior:** Styled button with primary (blue), secondary (white), and other variant options. Supports icon placement.

### BlogNewsletterCTA
- **Path:** `components/blog/BlogNewsletterCTA.tsx`
- **Description:** Newsletter subscription CTA with embedded Beehiiv form.
- **Used on:** Blog list (`/blog`), Blog post (`/blog/[slug]`), Blog category (`/blog/category/[slug]`)
- **Props:** None
- **Visual behavior:** Branded banner with headline and embedded email subscription form via Beehiiv.

### BlogInArticleCTA
- **Path:** `components/blog/BlogInArticleCTA.tsx`
- **Description:** Mid-article call-to-action promoting Sayso signup and demos.
- **Used on:** Blog post (`/blog/[slug]`)
- **Props:** None
- **Visual behavior:** Gradient background (dark blue to blue), white text, rounded corners, two buttons (Book Demo white, Download white outline).

### SearchSuggestionPill
- **Path:** `components/ui/SearchSuggestionPill.tsx`
- **Description:** Pill-shaped element with lightning icon and "sayso" text.
- **Used on:** UI catalog (`/(marketing)/ui`)
- **Props:** None
- **Visual behavior:** Small rounded pill with lightning icon and branded text.

---

## 4. Blog / Article Components

### BlogHeroBanner
- **Path:** `components/blog/BlogHeroBanner.tsx`
- **Description:** Hero banner for the blog landing page with title, subtitle, and search input.
- **Used on:** Blog list (`/blog`), Blog category (`/blog/category/[slug]`)
- **Props:** `title?: string`, `subtitle?: string`
- **Visual behavior:** White background with halftone pattern, yellow bottom border, centered title and subtitle, search input with magnifying glass icon.

### BlogArticleHeader
- **Path:** `components/blog/BlogArticleHeader.tsx`
- **Description:** Article header with title, author info, date, and cover image.
- **Used on:** Blog post (`/blog/[slug]`)
- **Props:** `post: BlogPost`
- **Visual behavior:** Large title, author avatar and name, publish date, full-width cover image.

### BlogArticleContent
- **Path:** `components/blog/BlogArticleContent.tsx`
- **Description:** Renders MDX blog content with custom styled components and syntax highlighting.
- **Used on:** Blog post (`/blog/[slug]`)
- **Props:** `content: string` (MDX markdown)
- **Visual behavior:** Styled prose — h2/h3 headings, blue links, blockquotes with yellow left border, code blocks with gray background, tables with dark header.

### BlogAuthorCard
- **Path:** `components/blog/BlogAuthorCard.tsx`
- **Description:** Author profile card with avatar, bio, and LinkedIn link.
- **Used on:** Blog post (`/blog/[slug]`)
- **Props:** `author: BlogAuthor`
- **Visual behavior:** Card with author avatar, name, bio text, and LinkedIn icon link.

### BlogBreadcrumb
- **Path:** `components/blog/BlogBreadcrumb.tsx`
- **Description:** Breadcrumb navigation for blog pages.
- **Used on:** Blog post (`/blog/[slug]`)
- **Props:** `items: Array<{ label, href }>`
- **Visual behavior:** Horizontal breadcrumb trail with separator characters and linked segments.

### BlogCategoryPills
- **Path:** `components/blog/BlogCategoryPills.tsx`
- **Description:** Category filter pills with "All" button for blog filtering.
- **Used on:** Blog list (`/blog`), Blog category (`/blog/category/[slug]`)
- **Props:** `categories: string[]`, `activeCategory?: string`
- **Visual behavior:** Horizontal row of pill-shaped buttons, active category highlighted, "All" button always present.

### BlogFeaturedPost
- **Path:** `components/blog/BlogFeaturedPost.tsx`
- **Description:** Large featured blog post card displayed prominently on the blog index.
- **Used on:** Blog list (`/blog`, page 1 only)
- **Props:** `post: BlogPostMeta`
- **Visual behavior:** Large card with cover image, title, excerpt, and metadata. Stands out from regular post cards.

### BlogPostCard
- **Path:** `components/blog/BlogPostCard.tsx`
- **Description:** Standard blog post card for grid layouts.
- **Used on:** Blog list (`/blog`), Blog category (`/blog/category/[slug]`)
- **Props:** `post: BlogPostMeta`
- **Visual behavior:** Card with cover image thumbnail, title, excerpt, category badge, and date.

### BlogPagination
- **Path:** `components/blog/BlogPagination.tsx`
- **Description:** Pagination control with numbered pages.
- **Used on:** Blog list (`/blog`)
- **Props:** `currentPage: number`, `totalPages: number`, `basePath: string`
- **Visual behavior:** Numbered page buttons with previous/next arrows, current page highlighted.

### BlogRelatedPosts
- **Path:** `components/blog/BlogRelatedPosts.tsx`
- **Description:** Grid or compact list of related blog posts.
- **Used on:** Blog post (`/blog/[slug]`)
- **Props:** `posts: BlogPostMeta[]`, `variant?: 'grid' | 'compact'`
- **Visual behavior:** Grid variant: standard card grid. Compact variant: smaller list-style cards.

### BlogShareBar
- **Path:** `components/blog/BlogShareBar.tsx`
- **Description:** Social share buttons for blog posts (LinkedIn, Twitter, Copy Link).
- **Used on:** Blog post (`/blog/[slug]`)
- **Props:** `title: string`, `slug: string`
- **Visual behavior:** Row of social sharing icons/buttons with copy-to-clipboard functionality.

### BlogTableOfContents
- **Path:** `components/blog/BlogTableOfContents.tsx`
- **Description:** Auto-generated table of contents with scroll spy active heading tracking.
- **Used on:** Blog post (`/blog/[slug]`)
- **Props:** `content: string` (MDX string to parse headings from)
- **Visual behavior:** Sidebar list of heading links, active heading highlighted as user scrolls through article.

---

## 5. SEO / Meta Components

> SEO in this project is handled via Next.js `metadata` exports and inline JSON-LD scripts rather than standalone React components.

### JSON-LD Generators (utility functions, not components)
- **Path:** `lib/seo/blog-jsonld.ts`
- **Functions:** `generateArticleJsonLd()`, `generateBreadcrumbJsonLd()`, `generateBlogListJsonLd()`
- **Used on:** Blog list (`/blog`), Blog post (`/blog/[slug]`)
- **Purpose:** Generate structured data for articles, breadcrumbs, and blog listing pages.

### Root Layout Schema
- **Path:** `app/layout.tsx` (inline `<script type="application/ld+json">`)
- **Schemas:** Organization, SiteNavigationElement
- **Purpose:** Site-wide structured data for search engines.

### Page-Level Metadata
- Each page exports a `metadata` object or `generateMetadata()` function via Next.js App Router conventions for title, description, OpenGraph, and Twitter card tags. These are not standalone components.

---

## 6. Shared UI Elements

### Heading
- **Path:** `components/ui/Heading.tsx`
- **Description:** Semantic heading component with size variants.
- **Used on:** Used across section components
- **Props:** `children: ReactNode`, `variant?: 'hero' | 'h1' | 'h2' | 'h3'`, `className?: string`, `as?: 'h1' | 'h2' | 'h3' | 'h4'`
- **Visual behavior:** Renders heading tag with appropriate font size, weight, and spacing per variant.

### Text
- **Path:** `components/ui/Text.tsx`
- **Description:** Text component with semantic variants for body copy.
- **Used on:** Used across section components
- **Props:** `children: ReactNode`, `variant?: 'body' | 'muted' | 'small'`, `className?: string`, `as?: string`
- **Visual behavior:** Renders paragraph or span with appropriate font size, color, and line height.

### Badge
- **Path:** `components/ui/Badge.tsx`
- **Description:** Small label/badge component with variants.
- **Used on:** Used in cards and product sections
- **Props:** `children: ReactNode`, `variant?: 'standard' | 'moment'`, `className?: string`
- **Visual behavior:** Small rounded label with variant-specific background and text colors.

### Divider
- **Path:** `components/ui/Divider.tsx`
- **Description:** Horizontal line separator.
- **Used on:** Used between content sections
- **Props:** `className?: string`
- **Visual behavior:** Thin horizontal rule with muted color.

### IconWrapper
- **Path:** `components/ui/IconWrapper.tsx`
- **Description:** Centered icon container with size options.
- **Used on:** Used in feature grids and step cards
- **Props:** `children: ReactNode`, `size?: 'sm' | 'md' | 'lg'`, `className?: string`
- **Visual behavior:** Circular or rounded container centering an icon at the specified size.

### LightningIcon
- **Path:** `components/icons/LightningIcon.tsx`
- **Description:** SVG lightning bolt icon.
- **Used on:** Used in SearchSuggestionPill and other branded elements
- **Props:** `size?: number`, `color?: string`, `className?: string`
- **Visual behavior:** Lightning bolt SVG rendered at specified size and color.

### HighlightText
- **Path:** `components/demovideo/shared/HighlightText.tsx`
- **Description:** Animated text with word-level highlight effects.
- **Used on:** Demo video scenes
- **Props:** `text: string`, `highlights: string[]`, `highlightColor?: string`, `className?: string`, `delay?: number`
- **Visual behavior:** Renders text with specified words highlighted with animated color/background effect.

### TypewriterText
- **Path:** `components/demovideo/shared/TypewriterText.tsx`
- **Description:** Character-by-character typing animation.
- **Used on:** Demo video scenes, product showcase
- **Props:** `text: string`, `speed?: number`, `delay?: number`, `className?: string`, `cursorColor?: string`
- **Visual behavior:** Text appears character by character with blinking cursor.

### AudioWaveform
- **Path:** `components/landing/CRMDialerShowcase/AudioWaveform.tsx`
- **Description:** 5-bar animated audio waveform visualization.
- **Used on:** CRM Dialer Showcase, demo video
- **Props:** `active: boolean`, `color?: string`
- **Visual behavior:** 5 vertical bars animating at different heights when active.

### ParticipantAvatar
- **Path:** `components/landing/CRMDialerShowcase/ParticipantAvatar.tsx`
- **Description:** Avatar circle with animated speaking ring indicator.
- **Used on:** CRM Dialer Showcase
- **Props:** `initials: string`, `color: string`, `speaking: boolean`, `ringColor?: string`
- **Visual behavior:** Circular avatar with initials, pulsing ring when speaking.

### SpeechBubble
- **Path:** `components/landing/CRMDialerShowcase/SpeechBubble.tsx`
- **Description:** Animated speech bubble with directional tail.
- **Used on:** CRM Dialer Showcase
- **Props:** `text: string`, `visible: boolean`, `side: 'buyer' | 'seller'`
- **Visual behavior:** Rounded speech bubble with tail pointing left or right based on side, fade-in animation.

### CannyBoard
- **Path:** `components/CannyBoard.tsx`
- **Description:** Wrapper for Canny feedback board integration with user identification.
- **Used on:** Feedback page (`/feedback`)
- **Props:** `user: CannyUser` (id, name, email, avatarURL?), `basePath?: string`, `boardToken: string`
- **Visual behavior:** Loads Canny SDK dynamically, displays loading message while initializing, renders feedback board (min-height 600px) with brand primary color.

---

## 7. Page-Specific Components (NOT Reusable)

These components are tightly coupled to specific pages and contain hardcoded content. They would **not** be part of a shared template system.

### Landing Page Ad Pages

| Component | Path | Page |
|-----------|------|------|
| **AgentAdPage** | `components/landing/AgentAdPage.tsx` | `/agent` |
| **BrokerAdPage** | `components/landing/BrokerAdPage.tsx` | `/broker` |
| **IsaAdPage** | `components/landing/IsaAdPage.tsx` | `/isa` |
| **SalesLeaderAdPage** | `components/landing/SalesLeaderAdPage.tsx` | `/sales-leader` |

All four follow the same pattern: hardcoded hero, problem narrative, benefits grid, CTA. Content is baked in, not prop-driven.

### Legal / Info Pages

| Component | Path | Page |
|-----------|------|------|
| **PrivacyPolicyPage** | `components/landing/PrivacyPolicyPage.tsx` | `/privacy` |
| **TermsOfServicePage** | `components/landing/TermsOfServicePage.tsx` | `/terms` |
| **SecurityPage** | `components/landing/SecurityPage.tsx` | `/security` |
| **AffiliatePageContent** | `components/landing/AffiliatePageContent.tsx` | `/affiliate` |
| **ReferralPageContent** | `components/landing/ReferralPageContent.tsx` | `/referral` |

Static content pages with no props. Content is hardcoded in the component.

### CaseStudiesPage
- **Path:** `components/landing/CaseStudiesPage.tsx`
- **Page:** `/case-studies`
- **Description:** Full case studies page with expandable cards. Data is hardcoded in a `CASE_STUDIES` array inside the component.

### CRM Dialer Showcase (composite)

| Component | Path | Description |
|-----------|------|-------------|
| **CRMDialerShowcase** | `components/landing/CRMDialerShowcase/index.tsx` | Main orchestrator with `useDialerState` hook |
| **DialerHeader** | `components/landing/CRMDialerShowcase/DialerHeader.tsx` | Top bar with timer and call controls |
| **DialerSplitView** | `components/landing/CRMDialerShowcase/DialerSplitView.tsx` | Split you-vs-prospect view |
| **DialerBottomBar** | `components/landing/CRMDialerShowcase/DialerBottomBar.tsx` | Bottom toolbar (Dialpad, Notes, Activity) |
| **SaysoWidget** | `components/landing/CRMDialerShowcase/SaysoWidget.tsx` | Coaching prompt panel with toolbar |

Used exclusively in the product showcase on the homepage. While individual sub-components accept props, the composite is tightly coupled to the homepage demo flow.

### Demo Video Scenes

| Component | Path | Description |
|-----------|------|-------------|
| **DemoPlayer** | `components/demovideo/DemoPlayer.tsx` | Main demo orchestrator with keyboard controls |
| **Stage** | `components/demovideo/Stage.tsx` | Full-screen container for scenes |
| **Scene0WhiteScreen** | `components/demovideo/scenes/Scene0WhiteScreen.tsx` | Blank intro screen |
| **Scene1Problem** | `components/demovideo/scenes/Scene1Problem.tsx` | "Mid-call, you freeze" with phone animation |
| **Scene2Consequences** | `components/demovideo/scenes/Scene2Consequences.tsx` | 4 consequence cards with stagger |
| **Scene3Dream** | `components/demovideo/scenes/Scene3Dream.tsx` | "What if..." dream scenario |
| **Scene4Reveal** | `components/demovideo/scenes/Scene4Reveal.tsx` | Logo reveal with glow and tagline |
| **Scene5Carousel** | `components/demovideo/scenes/Scene5Carousel.tsx` | 3 sequential step cards |
| **Scene7LivePrompt** | `components/demovideo/scenes/Scene7LivePrompt.tsx` | Split call view with waveform and coach panel |
| **Scene8Signals** | `components/demovideo/scenes/Scene8Signals.tsx` | Large text: "say the right thing" |
| **Scene9Payoff** | `components/demovideo/scenes/Scene9Payoff.tsx` | Appointment confirmation + particle burst |
| **Scene10Transform** | `components/demovideo/scenes/Scene10Transform.tsx` | "More appointments, no freezing" |
| **Scene11CTA** | `components/demovideo/scenes/Scene11CTA.tsx` | Final logo, tagline, and "Book a Demo" |

Used exclusively on `/demo-vid`. Each scene is hardcoded with specific copy and animations.

### Onboarding Flow

| Component | Path | Description |
|-----------|------|-------------|
| **OnboardingFlow** | `components/onboarding/OnboardingFlow.tsx` | Multi-step onboarding orchestrator |
| **OnboardingModal** | `components/onboarding/OnboardingModal.tsx` | Modal wrapper with close/backdrop |
| **OnboardingProgress** | `components/onboarding/OnboardingProgress.tsx` | Step counter and progress bar |
| **OnboardingNavButtons** | `components/onboarding/OnboardingNavButtons.tsx` | Back/Next navigation buttons |
| **RoleScreen** | `components/onboarding/screens/RoleScreen.tsx` | Role selection |
| **CallFrequencyScreen** | `components/onboarding/screens/CallFrequencyScreen.tsx` | "How often do you call?" |
| **ComputerScreen** | `components/onboarding/screens/ComputerScreen.tsx` | Mac/PC/Mix selection |
| **ConfidenceScreen** | `components/onboarding/screens/ConfidenceScreen.tsx` | 5-emoji confidence scale |
| **ContactInfoScreen** | `components/onboarding/screens/ContactInfoScreen.tsx` | Name/email/phone/company form |
| **FeelingCheckScreen** | `components/onboarding/screens/FeelingCheckScreen.tsx` | 5 emoji anxiety-to-confidence buttons |
| **LeadTypeScreen** | `components/onboarding/screens/LeadTypeScreen.tsx` | Multi-select lead type chips |
| **LeadChipGrid** | `components/onboarding/screens/LeadChipGrid.tsx` | Sellers/Buyers/All chip sub-component |
| **PaywallScreen** | `components/onboarding/screens/PaywallScreen.tsx` | Pricing/paywall presentation |
| **SaysoHelpScreen** | `components/onboarding/screens/SaysoHelpScreen.tsx` | How Sayso helps |
| **SupportTechScreen** | `components/onboarding/screens/SupportTechScreen.tsx` | Tech stack selection |
| **TeamSizeScreen** | `components/onboarding/screens/TeamSizeScreen.tsx` | Team size selection |
| **TeamCallFrequencyScreen** | `components/onboarding/screens/TeamCallFrequencyScreen.tsx` | Team call frequency |
| **TeamLeadTypeScreen** | `components/onboarding/screens/TeamLeadTypeScreen.tsx` | Team lead type |
| **TeamSupportTechScreen** | `components/onboarding/screens/TeamSupportTechScreen.tsx` | Team support tech |
| **AnalyzingScreen** | `components/onboarding/screens/AnalyzingScreen.tsx` | Loading screen with cycling messages |
| **VerdictScreen** | `components/onboarding/screens/VerdictScreen.tsx` | Success + Stripe checkout |

Used exclusively in the onboarding flow (`/start` and via DemoCalendarProvider modals). Individual screens accept props (value/onChange) but are designed for this specific flow.

### SystemSelectModal
- **Path:** `components/landing/SystemSelectModal.tsx`
- **Description:** Modal for OS selection (Mac/Windows) before download.
- **Props:** `onClose: () => void`
- **Visual behavior:** Dark modal overlay, 3 steps (select OS → checking eligibility → Windows waitlist), auto-advances.

### Demo/Reference Components (UI Kit)

| Component | Path | Description |
|-----------|------|-------------|
| **LandingButtonsSection** | `components/sections/LandingButtonsSection.tsx` | Demo page showing all button variants |
| **LandingCardsAndSectionsSection** | `components/sections/LandingCardsAndSectionsSection.tsx` | Demo page showing card/container styles |
| **LandingTypographySection** | `components/sections/LandingTypographySection.tsx` | Typography scale reference |

Developer reference components for the UI catalog at `/(marketing)/ui`. Not used in production pages.

---

## Design System Constants

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#1D4871` | Dark navy, footer, dark sections |
| CTA | `#2367EE` | Electric blue, buttons, links |
| Accent | `#FFDE59` | Bright yellow, highlights, badges |
| Gray | `#D7DEE1` | Light gray, borders |
| Background | `#F4F4F5` | Off-white, page backgrounds |
| `font-hero` | Serif/display | Hero headlines |
| `font-comic` | Bangers | Comic-style bold text |
| `font-sans` | Manrope | Body text, UI |

---

## Summary

| Category | Reusable | Page-Specific | Total |
|----------|----------|---------------|-------|
| Layout | 8 | 0 | 8 |
| Content | 18 | 0 | 18 |
| CTA | 5 | 0 | 5 |
| Blog/Article | 12 | 0 | 12 |
| SEO/Meta | 0 (utilities) | 0 | 0 |
| Shared UI | 12 | 0 | 12 |
| Page-Specific | — | ~45 | ~45 |
| **Total** | **~55** | **~45** | **~100** |
