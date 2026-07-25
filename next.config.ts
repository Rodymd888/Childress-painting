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
    ];
  },
};

export default nextConfig;
