const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
]

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
  async redirects() {
    return [
      { source: '/docs/Getting-Started', destination: 'https://docs.medialane.io/docs/protocol', permanent: true },
      { source: '/docs/IP-Assets', destination: 'https://docs.medialane.io/learn/programmable-ip', permanent: true },
      { source: '/docs/Launchpad', destination: 'https://docs.medialane.io/learn/creator-launchpad', permanent: true },
      { source: '/docs/Marketplace', destination: 'https://docs.medialane.io/learn/marketplace', permanent: true },
      { source: '/docs/SDK', destination: 'https://docs.medialane.io/docs/sdk', permanent: true },
      { source: '/docs/Contracts', destination: 'https://docs.medialane.io/docs/contracts', permanent: true },
      { source: '/docs/:slug', destination: '/guidelines/:slug', permanent: true },
      { source: '/docs', destination: '/guidelines', permanent: true },
      { source: '/members', destination: '/token', permanent: true },
      { source: '/airdrop/fund', destination: '/creators-fund', permanent: true },
    ]
  },
}

export default nextConfig
