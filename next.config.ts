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

      /* --- Legacy service slugs (v2 and v3) -------------------------------
         The v4 catalogue restructured services around sixteen offerings. Every
         retired slug 301s to its closest successor so no inbound link or
         ranking is lost. NOTE: /services/commercial-painting is now a REAL
         page — it must not appear here, or the redirect would shadow it. */
      { source: '/services/commercial-interior-painting', destination: '/services/interior-painting', permanent: true },
      { source: '/services/commercial-exterior-painting', destination: '/services/exterior-painting', permanent: true },
      { source: '/services/tenant-finish-outs', destination: '/services/commercial-painting', permanent: true },
      { source: '/services/occupied-renovations', destination: '/services/maintenance-painting', permanent: true },
      { source: '/services/new-construction', destination: '/services/commercial-painting', permanent: true },
      { source: '/services/surface-preparation', destination: '/services/pressure-washing', permanent: true },
      { source: '/services/high-performance-coatings', destination: '/services/protective-coatings', permanent: true },
      { source: '/services/industrial-coatings', destination: '/services/industrial-painting', permanent: true },
      { source: '/services/specialty-coatings', destination: '/services/decorative-finishes', permanent: true },
      { source: '/services/epoxy-flooring', destination: '/services/epoxy-floor-coatings', permanent: true },
      { source: '/services/maintenance-repaints', destination: '/services/maintenance-painting', permanent: true },
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
