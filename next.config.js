/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,

  async redirects() {
    return [
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
