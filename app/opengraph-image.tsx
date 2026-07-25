import { ImageResponse } from 'next/og';

/**
 * Social share card, generated at build time.
 *
 * Uses system-metric sans-serif rather than a webfont so the build has no
 * network dependency. If you want the brand display face here, fetch the font
 * file at build time and pass it through the `fonts` option.
 */

export const alt = 'Childress Painting — commercial painting contractor, Dallas–Fort Worth';
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
          background: '#0d1b2a',
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
            background: '#d72638',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                width: 56,
                height: 56,
                background: '#ffffff',
                color: '#0d1b2a',
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
                background: '#d72638',
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
                fontSize: 30,
                fontWeight: 800,
                letterSpacing: -0.5,
                textTransform: 'uppercase',
              }}
            >
              Childress Painting
            </div>
            <div
              style={{
                color: '#d72638',
                fontSize: 15,
                letterSpacing: 6,
                textTransform: 'uppercase',
                marginTop: 4,
              }}
            >
              Commercial · Industrial
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              color: '#ffffff',
              fontSize: 78,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -2.5,
              maxWidth: 940,
            }}
          >
            Commercial painting built to the construction schedule.
          </div>
          <div
            style={{
              color: '#9aabbc',
              fontSize: 28,
              marginTop: 28,
            }}
          >
            Dallas–Fort Worth &amp; Texas · Division 09 packages · Industrial coatings
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            borderTop: '1px solid rgba(255,255,255,0.18)',
            paddingTop: 24,
            color: 'rgba(255,255,255,0.55)',
            fontSize: 20,
            letterSpacing: 3,
            textTransform: 'uppercase',
          }}
        >
          childresspainting.com
        </div>
      </div>
    ),
    size,
  );
}
