import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Market } from '@/lib/markets';
import { SectorArt, type ArtKey } from '@/components/ui/SectorArt';

/**
 * Market sector tile. Renders real photography when `market.image` is set,
 * otherwise the drawn architectural scene for that sector.
 */
export function MarketCard({ market }: { market: Market }) {
  return (
    <Link
      href={`/markets/${market.slug}`}
      className="group lift relative flex flex-col overflow-hidden border border-line bg-white hover:border-navy/25"
    >
      <div className="sheen relative aspect-16/10 overflow-hidden bg-navy">
        {market.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={market.image}
            alt={`${market.title} project work`}
            width={800}
            height={500}
            loading="lazy"
            className="size-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
        ) : (
          <SectorArt
            art={market.art as ArtKey}
            className="size-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
        )}

        <span className="absolute left-4 top-4 z-10 bg-white/95 px-2.5 py-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-navy backdrop-blur-sm">
          {market.code}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col p-6 lg:p-7">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-red transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
        />
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-h4 leading-tight text-navy">{market.shortTitle}</h3>
          <ArrowUpRight
            aria-hidden="true"
            className="size-5 shrink-0 text-navy/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-red"
          />
        </div>
        <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-body">{market.summary}</p>
      </div>
    </Link>
  );
}
