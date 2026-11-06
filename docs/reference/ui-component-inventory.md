# UI Component Inventory - Sayso Landing Page

> Generated: 2026-04-03
> Total components cataloged: **64**

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
- **Path:** `components/landing/SaysoNavbar/` (`index.tsx`, `components/DesktopNav.tsx`, `components/ResourcesMenu.tsx`, `components/MobileMenu.tsx`)
- **Description:** Main sticky navigation bar with logo, primary links, the Resources menu, Log in and Book a demo, and a mobile drawer.
- **Used on:** Homepage, Blog (layout), Affiliate, Case Studies, Contact, Demo, Feedback, Pricing, Privacy, Terms, Referral, Security (~15 pages)
- **Props:** `autoHide?: boolean` (slides away on scroll-down; used on /product-tour)
- **Visual behavior:** Full-width sticky bar, transparent at the top, blurred `#F4F4F5` once scrolled. Logo left; How it works, Features, Pricing, FAQ and Resources in the middle; Log in and a white Book a demo pill on the right. Mobile: right-side drawer (portal on `<body>`, focus trapped, background inert, iOS-safe scroll lock) with a Resources accordion.

### Footer
- **Path:** `components/landing/Footer.tsx`
- **Description:** Branded footer with navigation links, newsletter signup, and social media links.
- **Used on:** Homepage, Blog (layout), Affiliate, Case Studies, Contact, Demo, Feedback, Pricing, Privacy, Terms, Referral, Security (~14 pages)
- **Props:** None
- **Visual behavior:** Dark blue footer (#1D4871) with yellow top border. Logo, Beehiiv newsletter and socials on the left; Programs, Get in Touch and Legal columns on the right; copyright row underneath.

### DemoCalendarProvider
- **Path:** `app/context/landing/DemoCalendarContext.tsx`
- **Description:** React context provider that manages the demo calendar popup, the contact form popup, and the download link.
- **Used on:** Blog layout, Affiliate, Case Studies, Contact, Demo, Pricing, Privacy, Terms, Referral, Security (~12 pages)
- **Props:** `children: ReactNode`
- **Visual behavior:** Renders no visible UI itself; provides modal management context. Opens the Calendly popup or the contact form popup; `openSignup` opens signup and download in a new tab.

### SaysoWidget
- **Path:** `components/SaysoWidget/` (`index.tsx`, `types.ts`, `data.ts`, `components/`)
- **Description:** Props-driven rebuild of the real Sayso widget: call alert, toolbar, Pulse, cues, LPMAMA with note bubbles, copy, Playbook. Static (a picture) or live (clickable, with `onAction` / `onDotSelect`).
- **Used on:** Homepage (`/`) hero demo, How it works, Features, Made to fit. Static pictures through `WidgetFigure` on the product pages, solution pages, `/why-sayso`, the partner integration pages and `/download`.
- **Props:** see `components/SaysoWidget/types.ts`; ready-made static views in `WIDGET_PRESETS` (`data.ts`).
- **Visual behavior:** Renders at its true size (604px column, 1010px with Playbook beside it). Wrap it in `WidgetScaler`, which scales it down to fit and can switch to the stacked narrow layout.

### WidgetFigure
- **Path:** `components/pages/WidgetFigure.tsx`
- **Description:** A static `SaysoWidget` preset on the soft product backdrop inside a white card, with an optional caption. The picture carries an `aria-label`; the widget itself is decorative.
- **Used on:** `/products/[slug]` (Cue: `cues`, Smart Capture: `smartCapture`, Pulse: `pulse`, Playbook: `playbook`), `/for/[slug]` (`cues`), `/why-sayso` (`notes`), `/integrations/partners/[slug]` (`notes`), `/download` (`cues`).
- **Props:** `preset: WidgetPreset`, `label: string`, `caption?: string`, `className?: string`

### Homepage sections
- **Path:** `components/landing/Home*/` (`HomeTopStrip`, `HomeHero`, `HomeLiveDemo`, `HomeHowItWorks`, `HomeFeatures`, `HomeFitCards`, `HomeCompare`, `HomeReviews`, `HomePricing`, `HomeFAQ`, `HomeFinalCta`) plus shared classes in `HomeShared/`.
- **Used on:** Homepage (`/`). `HomePricing` is also the pricing section on `/pricing`.
- **Visual behavior:** Flat redesign. See Section 10 of `docs/brand/sayso-design-system.md` for the page order.

### Carousel
- **Path:** `components/ui/Carousel/`
- **Description:** Grid on desktop (page passes the grid classes), swipeable scroll-snap row with peeking edges and prev/next arrows at 960px and below. Finite by default, `loop` for infinite (aria-hidden clones).
- **Used on:** Homepage How it works, Made to fit, Compare, Reviews.
- **Props:** `label`, `itemName?`, `loop?`, `trackClassName?`, `className?`, `children` (one child per slide).

### HomePricing
- **Path:** `components/landing/HomePricing/`
- **Description:** Monthly / annual toggle and the Individual Agent+ and Teams and Brokerages cards. Shared by the homepage and `/pricing`.
- **Used on:** Homepage (`/`), Pricing (`/pricing`)
- **Props:** `titleAs?: 'h1' | 'h2'`, `analyticsIds?: PricingAnalyticsIds` (homepage ids by default), `children?` (extra content under the cards), `className?`
- **Visual behavior:** Flat white and navy cards with a yellow top border, checkmark feature lists, flat Button CTAs.

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
- **Visual behavior:** Styled prose - h2/h3 headings, blue links, blockquotes with yellow left border, code blocks with gray background, tables with dark header.

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

### LightningIcon
- **Path:** `components/icons/LightningIcon.tsx`
- **Description:** SVG lightning bolt icon.
- **Used on:** Used in branded elements
- **Props:** `size?: number`, `color?: string`, `className?: string`
- **Visual behavior:** Lightning bolt SVG rendered at specified size and color.

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
| Content | 16 | 0 | 16 |
| CTA | 4 | 0 | 4 |
| Blog/Article | 11 | 0 | 11 |
| SEO/Meta | 0 (utilities) | 0 | 0 |
| Shared UI | 10 | 0 | 10 |
| Page-Specific | - | 15 | 15 |
| **Total** | **49** | **15** | **64** |
