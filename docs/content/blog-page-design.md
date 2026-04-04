# Blog Page Design — Sayso Landing Site

## Purpose

Add a blog section to the Sayso landing site to improve organic SEO rankings. The blog will target keywords around real estate sales calls, cold calling, AI-powered calling tools, and lead conversion — driving inbound traffic that funnels into demo bookings and onboarding activations.

---

## Design Principles

The blog will match the **V4 superhero landing page** aesthetic:

| Token           | Value       | Usage                                      |
|-----------------|-------------|---------------------------------------------|
| **primary**     | `#1D4871`   | Headings, borders, text                     |
| **cta**         | `#2367EE`   | Links, CTA buttons, hover states            |
| **accent**      | `#FFDE59`   | Category badges, highlights, dividers       |
| **background**  | `#F4F4F5`   | Page background                             |
| **accent-bg**   | `#D7DEE1`   | Card hover states, sidebar background       |
| **white**       | `#FFFFFF`   | Cards, navbar, content area                 |
| **Font: hero**  | Manrope 700 | Blog post titles, page headings             |
| **Font: comic** | Bangers 400 | Category labels, featured badge             |
| **Font: sans**  | Helvetica   | Body copy, meta text, descriptions          |

Reuse existing animation classes: `v2-comic-shadow-sm`, `v2-comic-border`, `v4-panel-reveal`, `v4-badge-pop`.

---

## Pages & Routes

| Route                    | Page                | Description                          |
|--------------------------|---------------------|--------------------------------------|
| `/blog`                  | Blog Index          | Paginated list of all posts          |
| `/blog/[slug]`           | Blog Post           | Individual article page              |
| `/blog/category/[slug]`  | Category Page        | Filtered posts by category           |

All routes live under `app/blog/` using Next.js App Router.

---

## Page 1: Blog Index (`/blog`)

### Layout

```
┌─────────────────────────────────────────────────────┐
│  SaysoNavbar (sticky, reused from landing)        │
├─────────────────────────────────────────────────────┤
│                                                     │
│  BLOG HERO BANNER                                   │
│  ┌───────────────────────────────────────────────┐  │
│  │  bg-[#1D4871] with subtle v4-halftone-dark    │  │
│  │                                               │  │
│  │  "The Sayso Blog"        (Manrope 700, white) │  │
│  │  "Tips, strategies, and insights to help      │  │
│  │   you win every sales moment."   (white/70)   │  │
│  │                                               │  │
│  │  [ Search bar — white, rounded-full,          │  │
│  │    border-2 border-white/30, search icon ]    │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  CATEGORY PILLS (horizontal scroll on mobile)       │
│  ┌───────────────────────────────────────────────┐  │
│  │ [All] [Cold Calling] [AI Tools] [Lead Gen]    │  │
│  │ [Scripts] [Real Estate] [Success Stories]     │  │
│  │                                               │  │
│  │ Active pill: bg-[#2367EE] text-white          │  │
│  │ Inactive:   bg-white border-2 border-primary  │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  FEATURED POST (full width, only on page 1)         │
│  ┌───────────────────────────────────────────────┐  │
│  │ ┌──────────────┐  ┌─────────────────────────┐ │  │
│  │ │              │  │ FEATURED (Bangers, gold) │ │  │
│  │ │  Cover Image │  │ Category pill            │ │  │
│  │ │  16:9 ratio  │  │ "Post Title Here"       │ │  │
│  │ │  rounded-xl  │  │ (Manrope 700, 28px)     │ │  │
│  │ │  comic border│  │                         │ │  │
│  │ │              │  │ Excerpt (2 lines max)    │ │  │
│  │ │              │  │                         │ │  │
│  │ │              │  │ Author • 5 min read     │ │  │
│  │ │              │  │ [Read More →]   cta blue │ │  │
│  │ └──────────────┘  └─────────────────────────┘ │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  POST GRID (responsive)                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │
│  │ Cover Image │ │ Cover Image │ │ Cover Image │   │
│  │ 16:9        │ │ 16:9        │ │ 16:9        │   │
│  │─────────────│ │─────────────│ │─────────────│   │
│  │ Category    │ │ Category    │ │ Category    │   │
│  │ Title       │ │ Title       │ │ Title       │   │
│  │ Excerpt     │ │ Excerpt     │ │ Excerpt     │   │
│  │ Author •    │ │ Author •    │ │ Author •    │   │
│  │ 5 min read  │ │ 3 min read  │ │ 7 min read  │   │
│  └─────────────┘ └─────────────┘ └─────────────┘   │
│                                                     │
│  Mobile: 1 col | Tablet: 2 cols | Desktop: 3 cols  │
│                                                     │
│  Card styling:                                      │
│    bg-white rounded-2xl border-2 border-[#1D4871]   │
│    v2-comic-shadow-sm                               │
│    hover: translate-y-[-4px] shadow increase        │
│                                                     │
│  PAGINATION                                         │
│  ┌───────────────────────────────────────────────┐  │
│  │     [← Prev]  1  2  3  ...  12  [Next →]     │  │
│  │     rounded-full buttons, cta blue active     │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  NEWSLETTER CTA BANNER                              │
│  ┌───────────────────────────────────────────────┐  │
│  │  bg-[#1D4871] rounded-2xl v2-comic-border     │  │
│  │  "Never Miss a Moment"  (Manrope, white)      │  │
│  │  "Subscribe for weekly tips" (white/70)        │  │
│  │  [ Beehiiv embed or email input + CTA btn ]   │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  Footer (reused from landing)                     │
└─────────────────────────────────────────────────────┘
```

### Blog Card Component Details

```
┌──────────────────────────┐
│  ┌──────────────────────┐│
│  │                      ││  Cover image
│  │    (16:9 image)      ││  Next/Image with priority on first 6
│  │                      ││  Object-fit: cover
│  └──────────────────────┘│
│                          │
│  Cold Calling            │  Category pill — bg-[#FFDE59] text-[#1D4871]
│                          │  font-comic text-xs uppercase tracking-wide
│  How to Double Your      │
│  Appointment Set Rate    │  Title — font-hero text-lg, line-clamp-2
│                          │
│  Learn the proven        │  Excerpt — text-sm text-[#1D4871]/70
│  strategies that top...  │  line-clamp-2
│                          │
│  ○ Marcus Rivera         │  Author avatar (24px circle) + name
│  Feb 10, 2026 • 5 min   │  Date + read time — text-small text-[#1D4871]/50
└──────────────────────────┘
```

---

## Page 2: Blog Post (`/blog/[slug]`)

### Layout

```
┌─────────────────────────────────────────────────────┐
│  SaysoNavbar                                      │
├─────────────────────────────────────────────────────┤
│                                                     │
│  BREADCRUMB                                         │
│  Blog > Cold Calling > Post Title                   │
│  text-sm, links in cta blue, current in primary     │
│                                                     │
│  ARTICLE HEADER (max-w-[800px] mx-auto)             │
│  ┌───────────────────────────────────────────────┐  │
│  │  [Cold Calling]  category pill                │  │
│  │                                               │  │
│  │  How to Double Your Appointment               │  │
│  │  Set Rate in 30 Days                          │  │
│  │  (Manrope 700, 36px desktop / 28px mobile)    │  │
│  │                                               │  │
│  │  ○ Marcus Rivera • Feb 10, 2026 • 5 min read  │  │
│  │                                               │  │
│  │  ┌───────────────────────────────────────┐    │  │
│  │  │                                       │    │  │
│  │  │      Cover Image (16:9, full width)   │    │  │
│  │  │      rounded-xl, border-2 primary     │    │  │
│  │  │                                       │    │  │
│  │  └───────────────────────────────────────┘    │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  ┌────────────────────────────────────────────────┐ │
│  │  CONTENT AREA           │  SIDEBAR (desktop)   │ │
│  │  max-w-[700px]          │  w-[280px]           │ │
│  │                         │                      │ │
│  │  Prose styling:         │  TABLE OF CONTENTS   │ │
│  │  - h2: Manrope 700,    │  ┌──────────────────┐│ │
│  │    24px, primary        │  │ On this page     ││ │
│  │  - h3: Manrope 700,    │  │ ────────────     ││ │
│  │    20px, primary        │  │ • Introduction   ││ │
│  │  - body: sans 16px,    │  │ • The Problem    ││ │
│  │    primary/80           │  │ • Step 1: ...    ││ │
│  │  - links: cta blue,    │  │ • Step 2: ...    ││ │
│  │    underline on hover   │  │ • Results        ││ │
│  │  - blockquote: left     │  └──────────────────┘│ │
│  │    border-4 accent,     │                      │ │
│  │    bg-[#FFDE59]/10,     │  NEWSLETTER SIGNUP   │ │
│  │    italic               │  ┌──────────────────┐│ │
│  │  - code: bg-accent-bg   │  │ bg-[#1D4871]     ││ │
│  │    rounded px-1.5       │  │ "Stay in the     ││ │
│  │  - images: rounded-xl,  │  │  know"           ││ │
│  │    border comic         │  │ [email input]    ││ │
│  │  - lists: disc/decimal, │  │ [Subscribe]      ││ │
│  │    pl-6, space-y-2      │  └──────────────────┘│ │
│  │  - horizontal rule:     │                      │ │
│  │    border-accent-bg     │  RELATED POSTS       │ │
│  │                         │  ┌──────────────────┐│ │
│  │                         │  │ Small post card  ││ │
│  │                         │  │ (thumbnail +     ││ │
│  │                         │  │  title only)     ││ │
│  │                         │  ├──────────────────┤│ │
│  │                         │  │ Small post card  ││ │
│  │                         │  ├──────────────────┤│ │
│  │                         │  │ Small post card  ││ │
│  │                         │  └──────────────────┘│ │
│  │                         │                      │ │
│  └────────────────────────────────────────────────┘ │
│                                                     │
│  On mobile: sidebar stacks below the article        │
│                                                     │
│  IN-ARTICLE CTA (after ~50% of content)             │
│  ┌───────────────────────────────────────────────┐  │
│  │  bg-gradient primary→cta, rounded-2xl         │  │
│  │  v2-comic-border                              │  │
│  │  "Ready to Win the Moment?"                   │  │
│  │  [Book a Demo]  [Activate Sayso]              │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  SHARE BAR (sticky on scroll, left side desktop)    │
│  ┌──┐                                              │
│  │Li│  LinkedIn                                    │
│  │Tw│  Twitter/X                                   │
│  │Cp│  Copy link                                   │
│  └──┘                                              │
│                                                     │
│  AUTHOR BIO CARD                                    │
│  ┌───────────────────────────────────────────────┐  │
│  │  ○ Avatar   Name                              │  │
│  │             Role at Sayso                     │  │
│  │             Short bio (1-2 lines)             │  │
│  │             [LinkedIn icon]                   │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  RELATED POSTS (3-col grid, same card component)    │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │
│  │  Related 1  │ │  Related 2  │ │  Related 3  │   │
│  └─────────────┘ └─────────────┘ └─────────────┘   │
│                                                     │
│  Footer                                           │
└─────────────────────────────────────────────────────┘
```

---

## Page 3: Category Page (`/blog/category/[slug]`)

Same layout as the blog index, but:
- Hero banner shows category name and description instead of "The Sayso Blog"
- Active category pill is pre-selected
- No featured post section — goes straight to the post grid
- Breadcrumb: `Blog > Category Name`

---

## Components to Build

| Component                | Location                           | Description                                           |
|--------------------------|------------------------------------|-------------------------------------------------------|
| `BlogHeroBanner`         | `components/blog/BlogHeroBanner`   | Dark hero with title, subtitle, search bar            |
| `BlogCategoryPills`      | `components/blog/BlogCategoryPills`| Horizontal scrollable category filter pills           |
| `BlogPostCard`           | `components/blog/BlogPostCard`     | Reusable card for grid and related posts              |
| `BlogFeaturedPost`       | `components/blog/BlogFeaturedPost` | Wide featured post card (index page only)             |
| `BlogPagination`         | `components/blog/BlogPagination`   | Page navigation with prev/next and page numbers       |
| `BlogNewsletterCTA`      | `components/blog/BlogNewsletterCTA`| Newsletter signup banner (embeds Beehiiv)             |
| `BlogArticleHeader`      | `components/blog/BlogArticleHeader`| Post title, meta, cover image for article page        |
| `BlogArticleContent`     | `components/blog/BlogArticleContent`| Prose-styled MDX/markdown renderer                   |
| `BlogTableOfContents`    | `components/blog/BlogTableOfContents`| Sticky sidebar TOC auto-generated from headings     |
| `BlogSidebar`            | `components/blog/BlogSidebar`      | Sidebar wrapper (TOC + newsletter + related)          |
| `BlogShareBar`           | `components/blog/BlogShareBar`     | Social share buttons (sticky on desktop)              |
| `BlogAuthorCard`         | `components/blog/BlogAuthorCard`   | Author bio at bottom of posts                         |
| `BlogRelatedPosts`       | `components/blog/BlogRelatedPosts` | 3-column related posts grid                           |
| `BlogBreadcrumb`         | `components/blog/BlogBreadcrumb`   | Breadcrumb navigation                                 |
| `BlogInArticleCTA`       | `components/blog/BlogInArticleCTA` | Mid-article CTA banner for demo/activation            |

---

## Content Management: MDX

Use **MDX** for blog posts (already partially configured in the project — MDX support is commented out in `next.config.js`).

### Blog Post File Structure

```
content/
└── blog/
    ├── how-to-double-appointment-set-rate.mdx
    ├── cold-calling-scripts-2026.mdx
    ├── ai-real-time-call-coaching.mdx
    └── ...
```

### MDX Frontmatter Schema

```yaml
---
title: "How to Double Your Appointment Set Rate in 30 Days"
slug: "how-to-double-appointment-set-rate"
description: "Learn the proven strategies top-performing agents use to convert cold calls into booked appointments — with step-by-step playbooks."
category: "cold-calling"
tags: ["appointment setting", "cold calling", "conversion rate", "scripts"]
author:
  name: "Marcus Rivera"
  role: "Sales Coach"
  avatar: "/authors/marcus-rivera.jpg"
  linkedin: "https://linkedin.com/in/marcusrivera"
coverImage: "/blog/covers/appointment-set-rate.jpg"
publishedAt: "2026-02-10"
updatedAt: "2026-02-10"
readingTime: 5
featured: true
---
```

### MDX Utility (`lib/blog.ts`)

A helper module that:
- Reads all `.mdx` files from `content/blog/`
- Parses frontmatter with `gray-matter`
- Returns sorted, paginated, and filterable post lists
- Generates static paths for `[slug]` pages
- Computes reading time if not provided

---

## SEO Strategy

### Per-Page Meta

Every blog page generates dynamic metadata using Next.js `generateMetadata()`:

```typescript
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  return {
    title: `${post.title} | Sayso Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.coverImage],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.coverImage],
    },
  };
}
```

### Structured Data (JSON-LD)

Each post page includes `Article` schema markup:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Post Title",
  "image": "cover-image-url",
  "author": { "@type": "Person", "name": "Author Name" },
  "publisher": { "@type": "Organization", "name": "Sayso" },
  "datePublished": "2026-02-10",
  "dateModified": "2026-02-10",
  "description": "Meta description"
}
```

The blog index page includes `Blog` and `BreadcrumbList` schema.

### Sitemap

Add blog URLs to `app/sitemap.ts` (create if not existing):
- Auto-generates sitemap entries for all published posts
- Includes `lastModified` from `updatedAt` frontmatter
- Includes category pages

### Target Keyword Categories

| Category        | Example Target Keywords                                       |
|-----------------|---------------------------------------------------------------|
| Cold Calling    | "cold calling tips", "cold calling scripts real estate"       |
| AI Tools        | "AI call coaching", "real-time sales AI", "AI for cold calls" |
| Lead Generation | "real estate lead gen", "how to convert internet leads"       |
| Scripts         | "cold calling scripts", "objection handling scripts"          |
| Real Estate     | "real estate sales tips", "ISA best practices"                |
| Success Stories | "sales team case study", "appointment setting results"        |

### Internal Linking

- Each blog post should link to relevant case studies (`/case-studies`)
- Mid-article CTAs link to demo booking and onboarding activation
- Related posts section encourages deeper reading (reduces bounce rate)
- Category pages create topical authority clusters

---

## Navigation Integration

### Navbar Update

Add "Blog" to `NAV_LINKS` in `SaysoNavbar`:

```typescript
const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'How Sayso Works', href: '#how-it-works' },
  { label: 'Blog', href: '/blog' },                    // NEW
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Demo', href: '#demo', isCalendar: true },
  { label: 'Contact', href: '#contact', isContact: true },
];
```

### Footer Update

Add a "Blog" link under the **Product** column in `Footer`:

```html
<li><a href="/blog">Blog</a></li>
```

---

## Dependencies to Install

| Package              | Purpose                                    |
|----------------------|--------------------------------------------|
| `@next/mdx`         | MDX support for Next.js                    |
| `@mdx-js/react`     | MDX React runtime                          |
| `gray-matter`        | Parse YAML frontmatter from MDX files      |
| `next-mdx-remote`   | Render MDX content with custom components  |
| `reading-time`       | Auto-calculate reading time from content   |
| `rehype-slug`        | Add IDs to headings (for TOC links)        |
| `rehype-autolink-headings` | Add anchor links to headings         |
| `rehype-pretty-code` | Syntax highlighting for code blocks        |

---

## Responsive Behavior

| Breakpoint | Blog Index                     | Blog Post                        |
|------------|--------------------------------|----------------------------------|
| Mobile     | 1-col grid, stacked featured   | Full-width content, sidebar below|
| md (768)   | 2-col grid, side-by-side feat. | Content + sidebar, TOC hidden    |
| lg (1024)  | 3-col grid, side-by-side feat. | Content + sticky sidebar w/ TOC  |

---

## Implementation Order

1. **Phase 1 — Foundation**
   - Install MDX dependencies
   - Uncomment MDX support in `next.config.js`
   - Create `lib/blog.ts` utility (read/parse/sort posts)
   - Create `content/blog/` with 1-2 sample MDX posts
   - Set up `app/blog/` route with layout

2. **Phase 2 — Blog Index Page**
   - `BlogHeroBanner` component
   - `BlogCategoryPills` component
   - `BlogPostCard` component
   - `BlogFeaturedPost` component
   - `BlogPagination` component
   - `BlogNewsletterCTA` component
   - Wire up `app/blog/page.tsx`

3. **Phase 3 — Blog Post Page**
   - `BlogArticleHeader` component
   - `BlogArticleContent` with custom MDX components
   - `BlogTableOfContents` component
   - `BlogSidebar` component
   - `BlogShareBar` component
   - `BlogAuthorCard` component
   - `BlogInArticleCTA` component
   - `BlogRelatedPosts` component
   - `BlogBreadcrumb` component
   - Wire up `app/blog/[slug]/page.tsx`

4. **Phase 4 — Category Pages**
   - `app/blog/category/[slug]/page.tsx`
   - Reuse index page components with filtered data

5. **Phase 5 — SEO & Navigation**
   - Add `generateMetadata()` to all blog routes
   - Add JSON-LD structured data
   - Create/update `app/sitemap.ts`
   - Add "Blog" to navbar and footer

6. **Phase 6 — Content**
   - Write initial batch of 5-10 SEO-targeted blog posts
   - Create cover images following the comic/superhero visual style
   - Set up author profiles

---

## File Structure (Final)

```
app/
├── blog/
│   ├── layout.tsx            ← Blog layout (navbar + footer wrapper)
│   ├── page.tsx              ← Blog index
│   ├── [slug]/
│   │   └── page.tsx          ← Individual post
│   └── category/
│       └── [slug]/
│           └── page.tsx      ← Category filtered view
│
components/
├── blog/
│   ├── BlogHeroBanner.tsx
│   ├── BlogCategoryPills.tsx
│   ├── BlogPostCard.tsx
│   ├── BlogFeaturedPost.tsx
│   ├── BlogPagination.tsx
│   ├── BlogNewsletterCTA.tsx
│   ├── BlogArticleHeader.tsx
│   ├── BlogArticleContent.tsx
│   ├── BlogTableOfContents.tsx
│   ├── BlogSidebar.tsx
│   ├── BlogShareBar.tsx
│   ├── BlogAuthorCard.tsx
│   ├── BlogRelatedPosts.tsx
│   ├── BlogBreadcrumb.tsx
│   └── BlogInArticleCTA.tsx
│
content/
└── blog/
    ├── how-to-double-appointment-set-rate.mdx
    ├── cold-calling-scripts-2026.mdx
    └── ...
│
lib/
├── blog.ts                   ← MDX reading/parsing utilities
└── seo/
    └── blog-jsonld.ts        ← JSON-LD structured data helpers
```
