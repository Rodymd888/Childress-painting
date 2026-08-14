import Image from 'next/image';
import Link from 'next/link';
import { company } from '@/lib/site';

/**
 * BRAND LOCKUP
 * ---------------------------------------------------------------------------
 * ONE central source for the logo. Every visible use on the site renders
 * through this file, so replacing the artwork later means swapping the files in
 * /public/brand and nothing else.
 *
 *   logo-header.png    Paint can + CHILDRESS PAINTING. The navigation lockup.
 *   logo-full.png      The above plus the "Since 1984" banner. Footer.
 *   logo-complete.png  Full artwork including both taglines. Share card.
 *   logo-mark.png      Texas roundel. Compact and square.
 *
 * NO SEPARATE DARK VARIANT IS NEEDED. The supplied artwork carries white
 * outlines around the lettering, so it holds contrast on the ink header and on
 * white alike. The `light` prop is kept for call-site compatibility and no
 * longer switches files; recolouring the logo per background would mean
 * altering supplied artwork, which we do not do.
 *
 * PROPORTIONS: every use sets height and lets width follow via `w-auto`, so the
 * logo is never stretched. Intrinsic dimensions are passed to next/image so no
 * layout shift occurs while it loads.
 */

/** Intrinsic sizes of the prepared files, for correct aspect ratios. */
const ART = {
  header: { src: '/brand/logo-header.png', width: 900, height: 373 },
  full: { src: '/brand/logo-full.png', width: 1000, height: 557 },
  complete: { src: '/brand/logo-complete.png', width: 1200, height: 788 },
  mark: { src: '/brand/logo-mark.png', width: 256, height: 256 },
} as const;

/**
 * Header lockup. Sized by height so the aspect ratio is preserved: roughly
 * 92px wide on phones and 111px on desktop, which reads clearly without
 * crowding the hamburger.
 */
export function Logo({ className }: { light?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${company.name}, home`}
      className={['group flex shrink-0 items-center', className].filter(Boolean).join(' ')}
    >
      <Image
        src={ART.header.src}
        alt={`${company.name}`}
        width={ART.header.width}
        height={ART.header.height}
        sizes="(min-width: 1024px) 111px, 92px"
        priority
        className="h-[38px] w-auto transition-transform duration-500 group-hover:scale-[1.03] lg:h-[46px]"
      />
    </Link>
  );
}

/** Full lockup with the "Since 1984" banner. Footer and similar. */
export function LogoFull({
  className,
  width = 260,
}: {
  light?: boolean;
  className?: string;
  width?: number;
}) {
  return (
    <Image
      src={ART.full.src}
      alt={`${company.name}, quality painting, professional results, since 1984`}
      width={ART.full.width}
      height={ART.full.height}
      sizes={`${width}px`}
      style={{ width, height: 'auto' }}
      className={className}
    />
  );
}

/** Compact square mark, for tight spaces and branded covers. */
export function LogoMark({
  className,
  size = 40,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <Image
      src={ART.mark.src}
      alt=""
      width={ART.mark.width}
      height={ART.mark.height}
      sizes={`${size}px`}
      style={{ width: size, height: size }}
      className={className}
    />
  );
}

export { ART as brandArt };
