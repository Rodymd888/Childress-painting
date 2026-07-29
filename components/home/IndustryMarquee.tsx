import Link from 'next/link';
import { markets } from '@/lib/markets';

/**
 * A continuously scrolling band of the sectors served. Two identical copies of
 * the track sit side by side and the animation translates exactly -50%, so the
 * loop is seamless without cloning nodes at runtime.
 *
 * Pauses on hover, and stops entirely under reduced motion (see globals.css).
 * The sectors are also rendered as real links, so this is navigable and
 * crawlable rather than decorative text.
 */
export function IndustryMarquee() {
  const items = [...markets, ...markets];

  return (
    <section
      aria-label="Sectors served"
      className="marquee relative overflow-hidden border-y border-white/10 bg-navy py-5"
    >
      {/* Feathered edges so items fade rather than clip at the viewport. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-navy to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-navy to-transparent"
      />

      <div className="marquee-track flex w-max items-center gap-10">
        {items.map((market, i) => (
          <div key={`${market.slug}-${i}`} className="flex items-center gap-10">
            <Link
              href={`/markets/${market.slug}`}
              aria-hidden={i >= markets.length}
              tabIndex={i >= markets.length ? -1 : undefined}
              className="font-display text-lg font-bold uppercase tracking-tight text-white/70 transition-colors hover:text-white md:text-xl"
            >
              {market.shortTitle}
            </Link>
            <span aria-hidden="true" className="size-1.5 shrink-0 rotate-45 bg-red" />
          </div>
        ))}
      </div>
    </section>
  );
}
