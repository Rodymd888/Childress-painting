import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { TextLink } from '@/components/ui/Button';
import { clientBrands, totalClients } from '@/lib/clients';

/**
 * CLIENT BRANDS
 * ---------------------------------------------------------------------------
 * A clean wordmark grid of the recognisable names, each linking to the project
 * it relates to. The link is the point: it turns a credibility wall into a
 * route into the portfolio.
 *
 * Names are set typographically rather than reproduced as logo files. We do
 * not hold licences to those marks, and fabricating logo artwork would
 * misrepresent the relationship. If cleared artwork is supplied, set `logo` in
 * lib/clients.ts and the tile swaps with no layout change.
 *
 * Palette is brand-only: ink, red, and the neutral scale. Red appears on hover
 * exactly as it does elsewhere on the site.
 */
export function ClientBrands() {
  return (
    <section className="section bg-mist">
      <div className="container-site">
        <SectionHeading
          label="Representative Project Experience"
          layout="split"
          title="Who We Have Painted For."
          intro={
            <p>
              National retail and restaurant rollouts, professional sports venues, industrial
              plants, and district-wide school programs. Select a name to see the work.
            </p>
          }
          action={<TextLink href="/clients">All {totalClients} Clients</TextLink>}
        />

        <RevealGroup
          className="mt-10 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-4 md:mt-14"
          stagger={0.02}
        >
          {clientBrands.map((brand) => {
            const href = brand.project
              ? `/projects/${brand.project}`
              : brand.industry
                ? `/industries/${brand.industry}`
                : '/clients';

            return (
              <RevealItem key={brand.name} className="bg-white">
                <Link
                  href={href}
                  className="group flex min-h-[7.5rem] flex-col items-center justify-center gap-2 p-5 text-center transition-colors duration-300 hover:bg-ink md:min-h-[8.5rem] md:p-6"
                >
                  <span className="font-display text-[0.9375rem] font-bold leading-tight tracking-tight text-ink transition-colors duration-300 group-hover:text-white md:text-[1.0625rem]">
                    {brand.name}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink/45 transition-colors duration-300 group-hover:text-red-light">
                    {brand.sector}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal className="mt-8">
          <p className="max-w-3xl text-[0.8125rem] leading-relaxed text-body">
            Brand names identify projects on which Childress Painting performed work and are
            used for descriptive purposes only. No endorsement, sponsorship, or partnership is
            implied. All trademarks are the property of their respective owners.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
