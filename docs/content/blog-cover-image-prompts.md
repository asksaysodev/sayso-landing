# Blog Cover Image Generation Prompts

Use these prompts with Google Grok (or any AI image generator) to create the geometric pattern images for blog posts.

There are two image types:
1. **Card image** (`blog-card.jpg`) - shown in the blog grid, featured post, and related posts
2. **Hero image** (`blog-hero.jpg`) - shown at the top of individual blog articles and used for OG/social sharing

All blog posts share the same card and hero images. To create new variations, generate a new image and replace the file in `/public/blog/covers/`.

---

## Sayso Brand Reference

All images must use the Sayso color palette on a white/light background. The feel should be clean, minimal, and professional, matching the site's "calm, crisp, confident" aesthetic (see `docs/brand/ui-style-guide.md`).

### Colors

| Role | Hex | Usage in patterns |
|------|-----|-------------------|
| Background | `#F4F4F5` | Solid background for all images |
| Primary shapes | `#2367EE` (CTA Blue) | Main geometric shapes at 15-40% opacity |
| Secondary shapes | `#1D4871` (Navy) | Accent shapes, outlines, and the Sayso lightning bolt |
| Highlight shapes | `#FFDE59` (Yellow) | Small accent elements (0-2 per image) |

### Design Rules
- Background is always solid `#F4F4F5` or white
- Mix of outlined shapes (stroke only) and filled semi-transparent shapes
- Include the Sayso lightning bolt as a central/prominent element
- Geometric shapes: circles, diamonds/rotated squares, dots, rounded rectangles
- Clean, minimal, airy feel with whitespace between shapes
- No text other than brand elements

---

## Current Images

```
/public/blog/covers/
  blog-card.jpg    (card/tile image - used in blog grid, featured post, related posts)
  blog-hero.jpg    (hero image - used in article header and OG/social sharing)
```

Both are currently 1344x768 pixels (JPG).

---

## Image Specs

### Card/Tile Image
- **Filename:** `blog-card.jpg`
- **Ideal dimensions:** 1200 x 675 pixels (16:9)
- **Format:** JPG or PNG
- **Used in:** Blog post cards (3-column grid), featured post thumbnail, related posts grid
- **Save to:** `/public/blog/covers/blog-card.jpg`
- **Design note:** This renders at ~376px wide on desktop card grids. Keep the composition balanced so it reads well at small sizes.

### Hero Image
- **Filename:** `blog-hero.jpg`
- **Ideal dimensions:** 1600 x 900 pixels (16:9)
- **Format:** JPG or PNG
- **Used in:** Article page header (full-width above content), OG/social sharing meta tags
- **Save to:** `/public/blog/covers/blog-hero.jpg`
- **Design note:** This renders up to ~752px wide on desktop article pages. The composition can be more expansive with larger shapes.

---

## Prompt 1: Card/Tile Image

Copy this prompt into Grok to generate a new card image.

```
Create an abstract geometric pattern image at exactly 1200x675 pixels on a solid light gray background (hex #F4F4F5).

The design should feature a prominent Sayso lightning bolt icon in the center-right area, rendered in semi-transparent blue-gray. Surround it with geometric shapes: circles (both outlined and filled), rotated squares (diamonds), small dots, and rounded rectangles.

Color rules:
- Most shapes should be blue (#2367EE) at 20-35% opacity (semi-transparent, soft)
- Outlined shapes (circle outlines, diamond outlines) should use dark navy (#1D4871) as a stroke color
- Include 1-2 small yellow (#FFDE59) accent elements (small squares or lightning bolt icons)
- The large lightning bolt should be in #1D4871 at about 25% opacity
- Mix outlined and filled shapes for visual variety

Layout rules:
- Keep shapes compact and balanced, this image will display at small card sizes (about 376px wide)
- 8-12 shapes total distributed across the canvas
- Shapes can extend slightly beyond the edges for a dynamic feel
- Clean, minimal, professional aesthetic
- No body text, no gradients on the background

Output as JPG on a solid #F4F4F5 background.
```

---

## Prompt 2: Hero Image

Copy this prompt into Grok to generate a new hero image.

```
Create an abstract geometric pattern image at exactly 1600x900 pixels on a solid light gray background (hex #F4F4F5).

The design should feature a prominent Sayso lightning bolt icon in the center-right area, rendered in semi-transparent blue-gray. Surround it with geometric shapes: circles (both outlined and filled), rotated squares (diamonds), small dots, and rounded rectangles.

Color rules:
- Most shapes should be blue (#2367EE) at 20-35% opacity (semi-transparent, soft)
- Outlined shapes (circle outlines, diamond outlines) should use dark navy (#1D4871) as a stroke color
- Include 1-2 small yellow (#FFDE59) accent elements (small squares or lightning bolt icons)
- The large lightning bolt should be in #1D4871 at about 25% opacity
- Mix outlined and filled shapes for visual variety

Layout rules:
- This is a hero/banner image that displays at large sizes (up to 800px wide), so shapes can be LARGER and more spread out than the card version
- 8-12 shapes total, use the full canvas with generous spacing
- Shapes should be bigger with more breathing room between them
- Shapes can extend slightly beyond the edges for a dynamic feel
- The composition should feel expansive and open
- Clean, minimal, professional aesthetic
- No body text, no gradients on the background

Output as JPG on a solid #F4F4F5 background.
```

---

## How Images Are Wired in Code

In each blog post's MDX frontmatter:
```yaml
coverImage: "/blog/covers/blog-card.jpg"    # used by card components
heroImage: "/blog/covers/blog-hero.jpg"      # used by article header + OG tags
```

If a post omits these fields, `lib/blog.ts` defaults to the same paths automatically.

### Components that use these images
- `BlogPostCard.tsx` - uses `coverImage` for the grid card thumbnail
- `BlogFeaturedPost.tsx` - uses `coverImage` for the featured post thumbnail
- `BlogRelatedPosts.tsx` - uses `coverImage` for related post thumbnails
- `BlogCoverImage.tsx` (via `BlogArticleHeader.tsx`) - uses `heroImage` for the article header
- `app/blog/[slug]/page.tsx` - uses `heroImage` for OG/Twitter meta tags
