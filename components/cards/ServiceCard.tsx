import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Service } from '@/lib/services';

/**
 * Service tile used on the homepage and the /services index. Dark variant sits
 * on the navy band; light variant on white.
 */
export function ServiceCard({
  service,
  light = false,
}: {
  service: Service;
  light?: boolean;
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={[
        'group relative flex min-h-[22rem] flex-col p-7 transition-colors duration-300 lg:min-h-[26rem] lg:p-8',
        light
          ? 'bg-white hover:bg-mist'
          : 'bg-navy hover:bg-navy-800',
      ].join(' ')}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 w-0 bg-red transition-all duration-500 group-hover:w-full"
      />

      <div className="flex items-start justify-between gap-4">
        <span
          className={[
            'font-mono text-[0.625rem] uppercase tracking-[0.2em]',
            light ? 'text-navy/60' : 'text-white/60',
          ].join(' ')}
        >
          {service.csi}
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className={[
            'size-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1',
            light ? 'text-navy/30' : 'text-white/30',
          ].join(' ')}
        />
      </div>

      <h3
        className={[
          'mt-6 text-[1.75rem] leading-[1.05] lg:text-[2rem]',
          light ? 'text-navy' : 'text-white',
        ].join(' ')}
      >
        {service.shortTitle}
      </h3>

      <p
        className={[
          'mt-4 text-[0.9375rem] leading-relaxed',
          light ? 'text-body' : 'text-steel-light',
        ].join(' ')}
      >
        {service.summary}
      </p>

      <span
        className={[
          'mt-auto pt-7 font-mono text-[0.625rem] uppercase tracking-[0.18em] transition-colors',
          light ? 'text-navy/60 group-hover:text-red' : 'text-white/60 group-hover:text-red-light',
        ].join(' ')}
      >
        {service.kicker}
      </span>
    </Link>
  );
}
