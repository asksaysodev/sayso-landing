/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,

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
      // DELETED BLOG POST REDIRECTS
      // ──────────────────────────────────────────────────
      {
        source: '/blog/best-real-estate-call-coaching-software-alternatives/',
        destination: '/compare/sayso-vs-shilo/',
        permanent: true,
      },
      {
        source: '/blog/shilo-ai-alternatives-real-estate-call-coaching/',
        destination: '/compare/sayso-vs-shilo/',
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
