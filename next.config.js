/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,

  // The sitemap (app/sitemap.ts) uses `revalidate`, so it regenerates in a
  // serverless function at runtime, not just at build time. The blog posts are
  // loaded with a raw `fs.readdirSync(content/blog)` (the .mdx files are never
  // imported as modules), which Next.js output file tracing cannot detect, so
  // those files were excluded from the function bundle. On every revalidation
  // getAllPosts() saw an empty directory, returned [], and silently dropped all
  // blog URLs from the live sitemap. Forcing the blog content into the trace
  // keeps the hourly scheduled-post behavior working. (Glossary/objection/etc.
  // slugs come from static imports in their index.ts files, so they are bundled
  // automatically and were never affected.)
  experimental: {
    outputFileTracingIncludes: {
      '/sitemap.xml': ['./content/blog/**/*'],
    },
  },

  async redirects() {
    return [
      // ──────────────────────────────────────────────────
      // PERSONA PAGE REDIRECTS — activate when /for/ pages are live
      // ──────────────────────────────────────────────────
      // ──────────────────────────────────────────────────
      // PRODUCT PAGE SLUG REDIRECTS
      // ──────────────────────────────────────────────────
      {
        source: '/features/real-time-coaching/',
        destination: '/products/cue/',
        permanent: true,
      },
      {
        source: '/features/call-notes/',
        destination: '/products/smart-capture/',
        permanent: true,
      },
      // /features/* → /products/* (route was renamed)
      {
        source: '/features/',
        destination: '/products/',
        permanent: true,
      },
      {
        source: '/features/:slug/',
        destination: '/products/:slug/',
        permanent: true,
      },
      // ──────────────────────────────────────────────────
      // LEGACY URL REDIRECTS (cleanup of GSC 404s)
      // ──────────────────────────────────────────────────
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index.html/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/demo-974294',
        destination: '/demo/',
        permanent: true,
      },
      {
        source: '/demo-974294/',
        destination: '/demo/',
        permanent: true,
      },
      // /newsletter-confirmation superseded by /subscribed
      {
        source: '/newsletter-confirmation',
        destination: '/subscribed/',
        permanent: true,
      },
      {
        source: '/newsletter-confirmation/',
        destination: '/subscribed/',
        permanent: true,
      },
      // ──────────────────────────────────────────────────
      // DELETED BLOG POST REDIRECTS
      // ──────────────────────────────────────────────────
      {
        source: '/blog/best-real-estate-call-coaching-software-alternatives/',
        destination: '/blog/best-real-estate-call-coaching-software/',
        permanent: true,
      },
      {
        source: '/blog/shilo-ai-alternatives-real-estate-call-coaching/',
        destination: '/why-sayso/',
        permanent: true,
      },
      // ──────────────────────────────────────────────────
      // REMOVED COMPARISON PAGES → Why Sayso
      // The /compare/ hub and its child pages were retired. They were indexed,
      // so 301 them to the positioning page to preserve equity and avoid 404s.
      // :path* matches zero or more segments, so this one rule covers the hub,
      // every child page, and any deeper legacy URL a crawler may have indexed.
      // ──────────────────────────────────────────────────
      {
        source: '/compare/:path*',
        destination: '/why-sayso/',
        permanent: true,
      },
      // ──────────────────────────────────────────────────
      // PERSONA PAGE REDIRECTS — activate when /for/ pages are live
      // ──────────────────────────────────────────────────
      // {
      //   source: '/agent',
      //   destination: '/for/solo-agents',
      //   permanent: true,
      // },
      // {
      //   source: '/broker',
      //   destination: '/for/team-leaders',
      //   permanent: true,
      // },
      // {
      //   source: '/isa',
      //   destination: '/for/isas',
      //   permanent: true,
      // },
      // {
      //   source: '/sales-leader',
      //   destination: '/for/team-leaders',
      //   permanent: true,
      // },
    ];
  },
}

module.exports = nextConfig
