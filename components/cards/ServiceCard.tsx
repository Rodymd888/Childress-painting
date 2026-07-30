import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SectorArt } from '@/components/ui/SectorArt';
import type { Service } from '@/lib/services';

/**
 * SERVICE CARD
 * ---------------------------------------------------------------------------
 * An editorial split rather than a generic icon card: the CSI reference sits
 * in a mono title block, a slim artwork rail runs down the side, and the first
 * three scope items preview what a bid actually includes.
 */
export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group lift sweep relative flex overflow-hidden border border-line bg-white"
    >
      {/* Artwork rail — narrow, so the card stays type-led. */}
      <div className="relative hidden w-28 shrink-0 overflow-hidden bg-ink sm:block lg:w-32">
        <SectorArt art={service.art} className="size-full" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-transparent to-white/8"
        />
        <span className="absolute left-3 top-4 font-mono text-[0.625rem] tracking-[0.16em] text-white/60">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red">
            {service.csi}
          </span>
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 shrink-0 text-ink/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-red"
          />
        </div>

        <h3 className="mt-3 text-h4 text-ink transition-colors duration-300 group-hover:text-red">
          {service.title}
        </h3>

        <p className="mt-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink/45">
          {service.kicker}
        </p>

        <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-body">
          {service.summary}
        </p>

        <ul className="mt-6 space-y-1.5 border-t border-line pt-5">
          {service.scope.slice(0, 3).map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-[0.8125rem] leading-snug text-ink/70"
            >
              <span aria-hidden="true" className="mt-1.5 size-1 shrink-0 bg-red" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
