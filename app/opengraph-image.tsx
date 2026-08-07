import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { company } from '@/lib/site';

/**
 * SOCIAL SHARE CARD
 * ---------------------------------------------------------------------------
 * Generated at build time and served for every share on iMessage, LinkedIn,
 * Facebook, X, Slack, and Discord. Displays the official Childress Painting
 * lockup (white knockout variant) on the brand ink background — the logo file
 * itself is embedded, not redrawn.
 */

export const alt =
  'Childress Painting, quality painting, professional results, since 1984';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), 'public/brand/logo-full-light.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0b',
          position: 'relative',
        }}
      >
        {/* Brand red rule, echoing the title-block motif */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            background: '#d81f26',
          }}
        />

        {/* Official lockup */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={640} height={401} alt="" />

        {/* Footer strip */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '26px 64px',
            borderTop: '1px solid rgba(255,255,255,0.16)',
          }}
        >
          <div style={{ color: '#8f8f9a', fontSize: 20, letterSpacing: 2.5, textTransform: 'uppercase' }}>
            Dallas, TX · Kansas City, MO
          </div>
          <div style={{ color: '#ffffff', fontSize: 20, letterSpacing: 2.5, textTransform: 'uppercase' }}>
            {company.phone}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
