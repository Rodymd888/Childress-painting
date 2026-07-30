import { ImageResponse } from 'next/og';
import { company } from '@/lib/site';

/**
 * Social share card, generated at build time.
 *
 * Uses a system-metric sans-serif rather than a webfont so the build has no
 * network dependency. To use the brand display face here, fetch the font file
 * at build time and pass it through the `fonts` option.
 */

export const alt =
  'Childress Painting — commercial painting contractor, Texas, Kansas and Missouri, since 1984';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0a0b',
          padding: 72,
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Red rule, echoing the title-block motif used across the site. */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 12,
            background: '#d81f26',
          }}
        />

        {/* Brand lockup */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                width: 56,
                height: 56,
                background: '#ffffff',
                color: '#0a0a0b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 34,
                fontWeight: 900,
                fontStyle: 'italic',
              }}
            >
              C
            </div>
            <div
              style={{
                width: 56,
                height: 56,
                marginLeft: -8,
                background: '#d81f26',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 34,
                fontWeight: 900,
                fontStyle: 'italic',
              }}
            >
              P
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                color: '#ffffff',
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: -0.5,
                textTransform: 'uppercase',
              }}
            >
              Childress Painting
            </div>
            <div
              style={{
                color: '#d81f26',
                fontSize: 13,
                letterSpacing: 5,
                textTransform: 'uppercase',
                marginTop: 4,
              }}
            >
              Since 1984
            </div>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              color: '#ffffff',
              fontSize: 74,
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: -2.5,
              maxWidth: 940,
            }}
          >
            Commercial painting held to the construction schedule.
          </div>
          <div
            style={{
              color: '#b8b8c0',
              fontSize: 26,
              marginTop: 26,
              maxWidth: 880,
              lineHeight: 1.35,
            }}
          >
            Commercial-only work for general contractors across Texas, Kansas &amp; Missouri.
          </div>
        </div>

        {/* Footer strip */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255,255,255,0.16)',
            paddingTop: 26,
          }}
        >
          <div
            style={{
              color: '#8f8f9a',
              fontSize: 19,
              letterSpacing: 2.5,
              textTransform: 'uppercase',
            }}
          >
            Dallas, TX · Grandview, MO
          </div>
          <div
            style={{
              color: '#ffffff',
              fontSize: 19,
              letterSpacing: 2.5,
              textTransform: 'uppercase',
            }}
          >
            {company.phone}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
