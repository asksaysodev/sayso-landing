const isDev = process.env.NODE_ENV !== 'production';

// Full Content Security Policy, sent as Report-Only: browsers log what it would
// block to the console but block nothing. It lists every third party the site
// loads today (GTM/GA4, Meta pixel, Vector, Leadsy, Calendly, beehiiv, Vercel
// Analytics and Speed Insights, YouTube, Notion and Sure Send embeds).
// Once the console stays clean, move it to the enforced Content-Security-Policy
// header below. Next.js and GTM rely on inline scripts, so 'unsafe-inline'
// stays until the site moves to nonces. The dev server also needs 'unsafe-eval'.
const cspReportOnly = [
  "default-src 'self'",
  [
    "script-src 'self' 'unsafe-inline'",
    isDev ? "'unsafe-eval'" : '',
    'https://www.googletagmanager.com https://*.googletagmanager.com',
    'https://www.google-analytics.com https://*.google-analytics.com',
    'https://connect.facebook.net',
    'https://cdn.vector.co',
    // Leadsy's tag pulls its bundle from CloudFront and a sync script from usbrowserspeed.com.
    'https://r2.leadsy.ai https://*.leadsy.ai https://ddwl4m2hdecbv.cloudfront.net https://*.usbrowserspeed.com',
    'https://assets.calendly.com',
    'https://subscribe-forms.beehiiv.com https://*.beehiiv.com',
    'https://va.vercel-scripts.com https://vercel.live',
    'https://suresend.ai https://*.suresend.ai',
  ]
    .filter(Boolean)
    .join(' '),
  [
    "connect-src 'self'",
    isDev ? 'ws: wss:' : '',
    'https://www.googletagmanager.com https://*.googletagmanager.com',
    'https://*.google-analytics.com https://*.analytics.google.com https://www.google.com https://*.doubleclick.net',
    'https://connect.facebook.net https://*.facebook.com',
    'https://*.vector.co',
    'https://*.leadsy.ai https://ddwl4m2hdecbv.cloudfront.net https://*.usbrowserspeed.com',
    'https://calendly.com https://*.calendly.com',
    'https://*.beehiiv.com',
    'https://*.vercel-insights.com https://*.vercel-scripts.com https://vercel.live wss://*.pusher.com',
    'https://suresend.ai https://*.suresend.ai',
    'https://*.asksayso.com',
  ]
    .filter(Boolean)
    .join(' '),
  [
    "frame-src 'self'",
    'https://calendly.com https://*.calendly.com',
    'https://subscribe-forms.beehiiv.com https://*.beehiiv.com',
    'https://www.youtube.com https://www.youtube-nocookie.com',
    'https://*.notion.site',
    'https://www.googletagmanager.com https://*.facebook.com',
    'https://*.vector.co',
    'https://vercel.live',
    'https://suresend.ai https://*.suresend.ai',
  ].join(' '),
  "img-src 'self' data: blob: https:",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://assets.calendly.com https://*.beehiiv.com https://suresend.ai https://*.suresend.ai",
  "font-src 'self' data: https://fonts.gstatic.com https://assets.calendly.com",
  "media-src 'self' blob: https:",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://calendly.com https://suresend.ai https://*.suresend.ai",
  "frame-ancestors 'self'",
].join('; ');

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
  { key: 'Content-Security-Policy-Report-Only', value: cspReportOnly },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,

  // Security headers on every route. www.asksayso.com is the only host this repo
  // serves; app.asksayso.com lives in the sayso-web-app repo and needs its own.
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },

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
      // SEO MERGES (Nov 2026): overlapping pages folded into the page Google
      // prefers. 301, straight to the final URL with its trailing slash.
      // ──────────────────────────────────────────────────
      ...[
        ['/glossary/cold-calling-real-estate', '/blog/real-estate-cold-calling-guide/'],
        ['/blog/real-estate-objection-handling', '/objections/'],
      ].flatMap(([from, to]) => [
        { source: from, destination: to, statusCode: 301 },
        { source: `${from}/`, destination: to, statusCode: 301 },
      ]),
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
      // Placeholder case study removed; replaced by the AREG case study. Only the
      // slash form is needed: trailingSlash's built-in redirect runs before custom
      // redirects, so /case-studies/example-team reaches this rule as .../example-team/.
      {
        source: '/case-studies/example-team/',
        destination: '/case-studies/anderson-real-estate-group/',
        permanent: true,
      },
      // The old product tour is retired; the guided demo on the homepage replaces it.
      // The code is in git history (removed 2026-11-19).
      {
        source: '/product-tour/',
        destination: '/#demo',
        permanent: true,
      },
      // Old SEO integration page, replaced by the partner page. Search Console still
      // reports the old URL as a 404.
      {
        source: '/integrations/follow-up-boss/',
        destination: '/integrations/partners/follow-up-boss/',
        permanent: true,
      },
      // Category from the old site; the current blog has no "real-estate" category.
      {
        source: '/blog/category/real-estate/',
        destination: '/blog/',
        permanent: true,
      },
      // ──────────────────────────────────────────────────
      // DELETED BLOG POST REDIRECTS
      // ──────────────────────────────────────────────────
      {
        source: '/blog/best-real-estate-call-coaching-software-alternatives/',
        destination: '/blog/how-to-choose-real-estate-call-coaching-software/',
        permanent: true,
      },
      // Renamed to match the content: it explains how to choose, it does not rank tools.
      {
        source: '/blog/best-real-estate-call-coaching-software/',
        destination: '/blog/how-to-choose-real-estate-call-coaching-software/',
        permanent: true,
      },
      // Merged into the think-about-it objection post (overlapping content, not indexed)
      {
        source: '/blog/why-prospects-dont-commit/',
        destination: '/blog/think-about-it-objection/',
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
    ];
  },
}

module.exports = nextConfig
