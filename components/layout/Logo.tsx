import Image from 'next/image';
import Link from 'next/link';
import { company } from '@/lib/site';

/**
 * BRAND LOCKUP
 * ---------------------------------------------------------------------------
 * Uses the official Childress Painting logo. Variants in /public/brand, all
 * derived from the supplied master artwork:
 *
 *   logo-mark.png            Texas roundel — light backgrounds
 *   logo-mark-light.png      Texas roundel — dark backgrounds
 *   logo-full.png            Paint can, wordmark and "Since 1984" banner
 *   logo-full-light.png      The same lockup, for dark backgrounds
 *   logo-complete.png        Full artwork including both taglines
 *   logo-complete-light.png  The same, for dark backgrounds
 *
 * On the dark variants the neutral ink is inverted rather than simply
 * recoloured, so the "Since 1984" banner flips to a light plate with dark
 * lettering and stays readable instead of vanishing into itself. Red is left
 * untouched throughout.
 *
 * The header pairs the roundel with live type: the full lockup is too wide and
 * too detailed to read at 32px, while the roundel holds up. The footer and the
 * share card use the fuller artwork where the banner and taglines are legible.
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
        width={198}
        height={198}
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
      width={1000}
      height={537}
      style={{ width, height: 'auto' }}
      className={className}
    />
  );
}
