import Image from 'next/image';
import Link from 'next/link';
import { company } from '@/lib/site';

/**
 * BRAND LOCKUP
 * ---------------------------------------------------------------------------
 * Uses the official Childress Painting logo. Prepared variants in /public/brand:
 *
 *   logo-mark.png        CP monogram, black + red — light backgrounds
 *   logo-mark-light.png  CP monogram, white + red — dark backgrounds
 *   logo-full.png        full lockup with wordmark and "Since 1984" ribbon
 *   logo-full-light.png  full lockup, knocked out for dark backgrounds
 *
 * The header pairs the monogram with live type so the wordmark stays crisp at
 * small sizes; the footer uses the full lockup where the ribbon is legible.
 */

export function Logo({
  light = false,
  className,
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={`${company.name}, home`}
      className={['group flex shrink-0 items-center gap-3', className].filter(Boolean).join(' ')}
    >
      <Image
        src={light ? '/brand/logo-mark-light.png' : '/brand/logo-mark.png'}
        alt=""
        width={420}
        height={219}
        sizes="(min-width: 1024px) 36px, 32px"
        priority
        className="h-8 w-auto transition-transform duration-500 group-hover:scale-[1.04] lg:h-9"
      />

      <span className="hidden leading-none sm:block">
        <span
          className={[
            'block font-display text-h5 font-extrabold uppercase tracking-tight',
            light ? 'text-white' : 'text-ink',
          ].join(' ')}
        >
          Childress
        </span>
        <span className="mt-1 block font-mono text-[0.5625rem] uppercase tracking-[0.3em] text-red">
          Painting
        </span>
      </span>
    </Link>
  );
}

/** Full lockup — footer and anywhere the ribbon should be legible. */
export function LogoFull({
  light = false,
  className,
  width = 260,
}: {
  light?: boolean;
  className?: string;
  width?: number;
}) {
  return (
    <Image
      src={light ? '/brand/logo-full-light.png' : '/brand/logo-full.png'}
      alt={`${company.name}, quality painting, professional results, since 1984`}
      width={900}
      height={564}
      style={{ width, height: 'auto' }}
      className={className}
    />
  );
}
