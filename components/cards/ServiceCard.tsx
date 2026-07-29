import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Service } from '@/lib/services';
import { SectorArt, type ArtKey } from '@/components/ui/SectorArt';

/**
 * Service tile. v2 adds the drawn artwork behind the card, a scale-on-hover
 * treatment, and a scope preview that slides in — so the card carries real
 * information rather than only a title and a sentence.
 */
export function ServiceCard({
  service,
  index,
  featured = false,
}: {
  service: Service;
  index?: number;
  /** Featured cards span two columns and show more scope detail. */
  featured?: boolean;
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={[
        'group relative isolate flex min-h-[24rem] flex-col justify-end overflow-hidden bg-navy p-7 lg:min-h-[28rem] lg:p-8',
        featured ? 'sm:col-span-2' : '',
      ].join(' ')}
    >
      {/* Drawn scene, dimmed until hover. */}
      <SectorArt
        art={service.art as ArtKey}
        className="absolute inset-0 -z-20 opacity-55 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-80"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/85 to-navy/25 transition-opacity duration-500 group-hover:from-navy group-hover:via-navy/75"
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-10 h-[3px] origin-left scale-x-0 bg-red transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
      />

      <div className="relative flex items-start justify-between gap-4">
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-white/60">
          {typeof index === 'number' && (
            <span className="mr-3 text-red">{String(index + 1).padStart(2, '0')}</span>
          )}
          {service.csi}
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className="size-5 shrink-0 text-white/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-red-light"
        />
      </div>

      <h3 className="relative mt-auto pt-10 text-[1.75rem] leading-[1.02] text-white lg:text-[2.125rem]">
        {service.shortTitle}
      </h3>

      <p className="relative mt-3.5 max-w-md text-[0.9375rem] leading-relaxed text-steel-light">
        {service.summary}
      </p>

      {/* Scope preview — collapsed by default, expands on hover at desktop. */}
      <div className="relative grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grid-rows-[1fr] motion-reduce:grid-rows-[1fr]">
        <ul className="overflow-hidden">
          <li className="pt-5" aria-hidden="true" />
          {service.scope.slice(0, featured ? 4 : 3).map((item) => (
            <li
              key={item}
              className="border-t border-white/12 py-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-white/60"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <span className="relative mt-6 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-white/60 transition-colors group-hover:text-red-light">
        {service.kicker}
      </span>
    </Link>
  );
}
