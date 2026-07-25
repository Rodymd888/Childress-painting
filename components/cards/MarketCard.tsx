import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Market } from '@/lib/markets';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';

/**
 * Market sector tile. Renders real photography when `market.image` is set,
 * otherwise a labeled placeholder block.
 */
export function MarketCard({ market }: { market: Market }) {
  return (
    <Link
      href={`/markets/${market.slug}`}
      className="group flex flex-col border border-line bg-white transition-colors duration-300 hover:border-navy/30"
    >
      <div className="relative aspect-16/10 overflow-hidden">
        {market.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={market.image}
            alt={`${market.title} project work`}
            width={800}
            height={500}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <ImagePlaceholder
            gradient={market.gradient}
            label={market.title}
            className="transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <span className="absolute left-4 top-4 bg-white px-2.5 py-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-navy">
          {market.code}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 lg:p-7">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-[1.5rem] leading-tight text-navy lg:text-[1.75rem]">
            {market.shortTitle}
          </h3>
          <ArrowUpRight
            aria-hidden="true"
            className="size-5 shrink-0 text-navy/25 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-red"
          />
        </div>
        <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-body">{market.summary}</p>
      </div>
    </Link>
  );
}
