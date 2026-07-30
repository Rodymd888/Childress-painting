import type { Metadata } from 'next';

import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { ProjectPortfolio } from '@/components/projects/ProjectPortfolio';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';

import { projects } from '@/lib/projects';
import { industries } from '@/lib/industries';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Commercial Painting Projects | Portfolio by Market Sector',
  description:
    'Commercial painting project experience across retail, restaurants, healthcare, education, industrial, government, office, sports, and aviation sectors.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
  const sectorsRepresented = new Set(projects.map((p) => p.industry)).size;

  return (
    <>
      <PageHero
        label="Portfolio"
        title="Work, organised the way you look for it."
        intro="By market sector — because a general contractor bidding a surgery center wants to see healthcare experience, not a photo gallery."
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Projects', href: '/projects' },
        ]}
        meta={[
          { label: 'Projects listed', value: `${projects.length}` },
          { label: 'Sectors represented', value: `${sectorsRepresented}` },
          { label: 'Experience', value: '40+ years' },
          { label: 'Coverage', value: 'TX · KS · MO' },
        ]}
      >
        <ButtonLink href="/request-bid" variant="primary" size="lg" withArrow>
          Request a bid
        </ButtonLink>
        <ButtonLink href="/clients" variant="outlineLight" size="lg">
          Full client list
        </ButtonLink>
      </PageHero>

      <section className="section bg-white">
        <div className="container-site">
          <SectionHeading
            label="Filter by sector"
            layout="split"
            title="Commercial project experience."
            intro={
              <p>
                Each entry names the sector and the scope categories performed. Detailed case
                studies with photography are published as owner and general contractor approvals
                are received.
              </p>
            }
          />

          <Reveal className="mt-12">
            <ProjectPortfolio projects={projects} industries={industries} />
          </Reveal>
        </div>
      </section>

      <section className="section-sm bg-mist">
        <div className="container-site">
          <Reveal className="mx-auto max-w-3xl">
            <span className="title-block text-ink/55">A note on this portfolio</span>
            <h2 className="mt-6 text-h3 text-ink">
              We publish what we can substantiate.
            </h2>
            <div className="prose-site mt-5">
              <p>
                The entries above represent commercial project experience of the Childress
                Painting leadership team, drawn from our qualifications record. Company names
                identify project experience only; no endorsement or affiliation is implied.
              </p>
              <p>
                Detailed case studies — square footage, durations, photography, and named
                references — are published only once the owner or general contractor has
                approved release in writing. Where you need specifics for a prequalification,
                ask and we will provide references directly.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact" variant="dark" withArrow>
                Request references
              </ButtonLink>
              <ButtonLink href="/clients" variant="outline">
                Representative clients
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner />

      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Projects', href: '/projects' },
        ])}
      />
    </>
  );
}
