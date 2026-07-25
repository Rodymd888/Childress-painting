import Link from 'next/link';
import { MapPin } from 'lucide-react';

import { PageHero } from '@/components/ui/PageHero';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/ui/JsonLd';
import { TextLink } from '@/components/ui/Button';

import { serviceAreas } from '@/lib/site';
import { markets } from '@/lib/markets';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'Service Areas | Dallas–Fort Worth & Texas Coverage',
  description:
    'Childress Painting serves Dallas, Fort Worth, Plano, Frisco, Arlington, Irving, McKinney, Denton and the wider DFW metroplex, and travels statewide across Texas.',
  path: '/service-areas',
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Service Areas', href: '/service-areas' },
];

const faqs = [
  {
    question: 'Where is Childress Painting based?',
    answer:
      'We are based in the Dallas–Fort Worth metroplex and work throughout Dallas, Tarrant, Collin, and Denton counties as our core coverage area.',
  },
  {
    question: 'Do you travel outside Dallas–Fort Worth?',
    answer:
      'Yes. We travel statewide in Texas for projects and repaint programs that justify the mobilization — typically larger single projects, multi-site rollouts, and industrial coatings work. Travel and per diem are stated openly in the bid rather than buried in the unit price.',
  },
  {
    question: 'Is there a minimum project size?',
    answer:
      'Not in the metroplex. Outside DFW, the project needs to be large enough to carry the cost of mobilizing and housing a crew. Tell us the location and scope and we will give you a straight answer before you spend time assembling a bid package.',
  },
  {
    question: 'Can you handle multiple sites at once?',
    answer:
      'Yes. Multi-site work — school districts across several campuses, retail portfolios, multifamily communities — is planned as one program with shared standards, colours, and reporting, and crews loaded across the sites so no single location becomes the bottleneck.',
  },
];

export default function ServiceAreasPage() {
  return (
    <>
      <PageHero
        label="Coverage"
        title="Dallas–Fort Worth base. Texas reach."
        intro="Core coverage across the metroplex, with statewide mobilization for projects and programs that justify it. Travel costs are stated in the bid, not hidden in the unit price."
        crumbs={crumbs}
        meta={[
          { label: 'Core market', value: 'DFW metroplex' },
          { label: 'Counties', value: 'Dallas, Tarrant, Collin, Denton' },
          { label: 'Statewide', value: 'By project and program' },
          { label: 'Multi-site', value: 'Portfolios and districts' },
        ]}
      />

      {/* Area grid ---------------------------------------------------------- */}
      <section className="bg-white py-20 md:py-24 lg:py-28">
        <div className="container-site">
          <SectionHeading
            layout="split"
            label="Where we work"
            title="The metroplex, county by county."
            intro={
              <p>
                The cities below are indicative rather than exhaustive — if your project is in
                North Texas, it is almost certainly inside our normal working radius. For anything
                further out, ask and we will tell you plainly whether the mobilization makes
                sense.
              </p>
            }
            action={<TextLink href="/request-bid">Request a bid</TextLink>}
          />

          <RevealGroup className="mt-14 grid gap-px bg-line md:grid-cols-2">
            {serviceAreas.map((area) => (
              <RevealItem key={area.region} className="bg-white p-7 lg:p-9">
                <div className="flex items-center gap-3">
                  <MapPin aria-hidden="true" className="size-4 shrink-0 text-red" />
                  <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-navy">
                    {area.region}
                  </h3>
                </div>

                <ul className="mt-6 grid grid-cols-2 gap-x-6">
                  {area.cities.map((city) => (
                    <li
                      key={city}
                      className="border-b border-line py-2.5 text-[0.9375rem] text-body"
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </RevealGroup>

          {/*
            MAP PLACEHOLDER
            If a coverage map is wanted here, embed a static image rather than a
            live map widget — a third-party map script would cost more in
            Lighthouse performance than the page gains in usefulness.
          */}
        </div>
      </section>

      {/* Local relevance ---------------------------------------------------- */}
      <section className="bg-navy py-20 md:py-24 lg:py-28">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
            <Reveal>
              <span className="title-block text-white/70">North Texas</span>
              <h2 className="mt-5 text-[clamp(1.75rem,3.8vw,2.75rem)] text-white">
                Local conditions change what gets specified.
              </h2>
            </Reveal>

            <Reveal delay={0.08} className="lg:pt-3">
              <div className="space-y-5 text-[1.0625rem] leading-relaxed text-steel-light">
                <p>
                  North Texas is hard on exterior coatings. Intense summer solar load degrades
                  south and west elevations years before the rest of a building shows wear.
                  Expansive clay soils move foundations, which opens joints and puts sealant under
                  stress. Hail and wind-driven rain damage substrates ahead of schedule, and long
                  humid stretches followed by sudden temperature swings narrow the windows when
                  high-performance systems can actually be applied.
                </p>
                <p>
                  None of that is theoretical. It decides which elevations to prioritise in a
                  phased repaint, whether elastomeric is worth the premium, how much sealant
                  replacement belongs in the scope, and which days a coating can be installed
                  within the manufacturer&rsquo;s stated conditions.
                </p>
                <p>
                  Contractors who work here every week price for it. Contractors who do not,
                  discover it.
                </p>
              </div>

              <div className="mt-9 flex flex-wrap gap-x-8 gap-y-4">
                <TextLink href="/services/maintenance-repaints" light>
                  Repaint programs
                </TextLink>
                <TextLink href="/services/industrial-coatings" light>
                  Industrial coatings
                </TextLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Sector cross-link -------------------------------------------------- */}
      <section className="bg-mist py-16 md:py-20">
        <div className="container-site">
          <SectionHeading
            as="h2"
            layout="split"
            label="Across the metroplex"
            title="Building types we work on locally."
            action={<TextLink href="/markets">All markets</TextLink>}
          />

          <Reveal className="mt-10 flex flex-wrap gap-3">
            {markets.map((market) => (
              <Link
                key={market.slug}
                href={`/markets/${market.slug}`}
                className="inline-flex min-h-11 items-center border border-line bg-white px-5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white"
              >
                {market.shortTitle}
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* FAQ ---------------------------------------------------------------- */}
      <section className="bg-white py-20 md:py-24">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <Reveal>
              <span className="title-block text-navy/60">Coverage questions</span>
              <h2 className="mt-5 text-[clamp(1.75rem,3.6vw,2.75rem)] text-navy">
                Before you send the invitation.
              </h2>
            </Reveal>

            <RevealGroup as="dl" className="border-t border-line">
              {faqs.map((faq) => (
                <RevealItem key={faq.question} className="border-b border-line py-7">
                  <dt className="text-xl text-navy lg:text-[1.375rem]">{faq.question}</dt>
                  <dd className="mt-3 text-[0.9375rem] leading-relaxed text-body">{faq.answer}</dd>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      <CtaBanner />

      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(faqs)]} />
    </>
  );
}
