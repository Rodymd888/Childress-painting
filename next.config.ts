import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,

  images: {
    // Modern formats first; Next falls back automatically for older browsers.
    formats: ['image/avif', 'image/webp'],
    // Add remote hosts here if project photography is served from a CDN or DAM.
    remotePatterns: [],
  },

  /**
   * The /markets section was replaced by /industries in the v3 redesign.
   * These 301s preserve any accumulated link equity and stop the old URLs
   * returning 404s to crawlers and bookmarked links.
   */
  async redirects() {
    return [
      { source: '/markets', destination: '/industries', permanent: true },
      { source: '/markets/:slug', destination: '/industries/:slug', permanent: true },
      { source: '/markets/retail', destination: '/industries/retail', permanent: true },
      { source: '/markets/multifamily', destination: '/industries', permanent: true },
      // Legacy service slugs from v2.
      {
        source: '/services/commercial-painting',
        destination: '/services/commercial-interior-painting',
        permanent: true,
      },
      {
        source: '/services/industrial-coatings',
        destination: '/services/high-performance-coatings',
        permanent: true,
      },
      {
        source: '/services/specialty-coatings',
        destination: '/services/high-performance-coatings',
        permanent: true,
      },
      {
        source: '/services/epoxy-flooring',
        destination: '/services/high-performance-coatings',
        permanent: true,
      },
      {
        source: '/services/maintenance-repaints',
        destination: '/services/occupied-renovations',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
      {
        // Brand assets and video are immutable once published.
        source: '/(brand|video)/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default nextConfig;
