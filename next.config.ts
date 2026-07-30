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
  /**
   * ROUTE MIGRATION — v2 → v3
   * ---------------------------------------------------------------------------
   * The /markets section became /industries, and six v2 service slugs were
   * consolidated into seven scopes drawn from the qualifications document.
   * These 301s preserve accumulated link equity and stop old URLs — including
   * anything already indexed or bookmarked — returning 404s.
   *
   * ORDER MATTERS. Next.js matches top to bottom and stops at the first hit,
   * so every specific rule must sit ABOVE the /markets/:slug catch-all.
   */
  async redirects() {
    return [
      /* --- Specific market rules (must precede the catch-all) ------------- */
      // Multifamily was retired: it is not in the qualifications record and
      // Childress works commercial only. Send it to the sector index rather
      // than a non-existent /industries/multifamily.
      { source: '/markets/multifamily', destination: '/industries', permanent: true },

      /* --- Market catch-all ---------------------------------------------- */
      // The remaining seven v2 markets map 1:1 onto v3 industry slugs:
      // healthcare, aviation, education, industrial, retail, government, office.
      { source: '/markets/:slug', destination: '/industries/:slug', permanent: true },
      { source: '/markets', destination: '/industries', permanent: true },

      /* --- Legacy v2 service slugs ---------------------------------------- */
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
      // '/services/new-construction' exists in both v2 and v3 — no redirect.
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
