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
      // FEATURE PAGE SLUG REDIRECTS
      // ──────────────────────────────────────────────────
      {
        source: '/features/real-time-coaching',
        destination: '/features/cue',
        permanent: true,
      },
      {
        source: '/features/real-time-coaching/',
        destination: '/features/cue/',
        permanent: true,
      },
      {
        source: '/features/call-notes',
        destination: '/features/smart-capture',
        permanent: true,
      },
      {
        source: '/features/call-notes/',
        destination: '/features/smart-capture/',
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
