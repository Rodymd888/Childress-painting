import { PageHero } from '@/components/ui/PageHero';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/ui/JsonLd';
import { TextLink } from '@/components/ui/Button';
import { MarketCard } from '@/components/cards/MarketCard';

import { markets } from '@/lib/markets';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'Markets We Serve | Commercial & Industrial Sectors',
  description:
    'Healthcare, aviation, education, industrial, multifamily, and retail painting across Dallas–Fort Worth and Texas. Each sector has a constraint that governs the schedule.',
  path: '/markets',
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Markets', href: '/markets' },
];

export default function MarketsPage() {
  return (
    <>
      <PageHero
        label="Markets served"
        title="Six sectors. Six different reasons the schedule is hard."
        intro="A coating system is chosen from a specification. How the work actually gets done is decided by the building — who occupies it, when it can be accessed, and what happens if it stops running."
        crumbs={crumbs}
        meta={[
          { label: 'Occupied work', value: 'Planned, not improvised' },
          { label: 'Shift options', value: 'Day, night, weekend' },
          { label: 'Access', value: 'Badging and escort aware' },
          { label: 'Coverage', value: 'DFW base, Texas statewide' },
        ]}
      />

      <section className="bg-white py-20 md:py-24 lg:py-28">
        <div className="container-site">
          <SectionHeading
            layout="split"
            label="Sector index"
            title="Know the constraint before you price the work."
            intro={
              <p>
                An infection control barrier. A badging queue. The first day of class. A plant
                that never shuts down. Each of these sets the production rate long before anyone
                opens a bucket — which is why we plan around them at bid time rather than
                discovering them in week two.
              </p>
            }
            action={<TextLink href="/services">View services</TextLink>}
          />

          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {markets.map((market) => (
              <RevealItem key={market.slug}>
                <MarketCard market={market} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-mist py-20 md:py-24">
        <div className="container-site">
          <SectionHeading
            layout="split"
            label="Not listed?"
            title="Office, government, worship, and light industrial work too."
            intro={
              <p>
                The six sectors above are where the planning differences are most pronounced. We
                also work on office buildings, municipal and government facilities, places of
                worship, self-storage, and light industrial property. If your building type is not
                shown, send the project and we will tell you plainly whether it is a fit.
              </p>
            }
            action={<TextLink href="/request-bid">Request a bid</TextLink>}
          />
        </div>
      </section>

      <CtaBanner />

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
