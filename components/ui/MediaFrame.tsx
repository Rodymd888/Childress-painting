import Image from 'next/image';
import { SectorArt } from './SectorArt';

/**
 * MEDIA FRAME — the single image slot used everywhere on the site
 * ===========================================================================
 * THE POINT OF THIS COMPONENT
 * Every card, hero, and gallery tile on the site renders through MediaFrame.
 * It takes an optional photograph and a required art key. When a photograph is
 * supplied it is used; when one is not, a purpose-drawn architectural scene is
 * rendered instead.
 *
 * That means adding project photography later is a data change, never a layout
 * change. Set `featuredImage` on a project, or `image` on an industry or
 * service, and every place that record appears upgrades at once.
 *
 * ADDING A PHOTOGRAPH
 *   1. Drop the file in /public/images/<folder>/
 *   2. Point the data record at it, with real width and height:
 *        featuredImage: { src: '/images/projects/x/01.jpg',
 *                         alt: 'What the photo shows', width: 2400, height: 1600 }
 *   3. Nothing else changes.
 *
 * `ratio` locks the aspect so cards stay aligned whether the slot holds a
 * photograph or artwork — no layout shift when photography arrives.
 * ===========================================================================
 */

export type MediaSource = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

const ratios = {
  square: 'aspect-square',
  landscape: 'aspect-[4/3]',
  wide: 'aspect-[16/9]',
  ultrawide: 'aspect-[21/9]',
  portrait: 'aspect-[3/4]',
  tall: 'aspect-[4/5]',
} as const;

export type MediaRatio = keyof typeof ratios;

export function MediaFrame({
  image,
  art,
  label,
  ratio = 'landscape',
  className,
  sizes = '(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw',
  priority = false,
  overlay = true,
}: {
  /** Real photography. When present it always wins. */
  image?: MediaSource;
  /** Key into SectorArt — the fallback treatment. */
  art: string;
  /** Describes the subject; used for the artwork's accessible name. */
  label: string;
  ratio?: MediaRatio;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Subtle bottom gradient so overlaid text stays legible. */
  overlay?: boolean;
}) {
  return (
    <div
      className={['relative overflow-hidden bg-ink', ratios[ratio], className]
        .filter(Boolean)
        .join(' ')}
    >
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
        />
      ) : (
        <div
          role="img"
          aria-label={`${label} — illustrative architectural drawing`}
          className="size-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
        >
          <SectorArt art={art} className="size-full" />
        </div>
      )}

      {overlay && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent"
        />
      )}
    </div>
  );
}

/**
 * Backwards-compatible alias. Older call sites imported ImagePlaceholder; this
 * keeps them working while the same logic runs underneath.
 */
export function ImagePlaceholder({
  art,
  label,
  className,
}: {
  art: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${label}, illustrative architectural drawing`}
      className={['relative size-full overflow-hidden bg-ink', className].filter(Boolean).join(' ')}
    >
      <SectorArt art={art} className="size-full" />
    </div>
  );
}
