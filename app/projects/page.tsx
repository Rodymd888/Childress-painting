import { AlertTriangle } from 'lucide-react';

import { PageHero } from '@/components/ui/PageHero';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/ui/JsonLd';
import { ProjectCard } from '@/components/cards/ProjectCard';

import { projects } from '@/lib/projects';
import { markets } from '@/lib/markets';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'Projects | Commercial Painting & Coatings Work',
  description:
    'Project scope profiles across healthcare, industrial, education, multifamily, aviation, and retail work in Dallas–Fort Worth and Texas.',
  path: '/projects',
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
];

export default function ProjectsPage() {
  /* Group by market so the page reads as a portfolio rather than a wall of
     identical cards. Only sectors with entries are rendered. */
  const grouped = markets
    .map((market) => ({
      market,
      items: projects.filter((project) => project.market === market.slug),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <>
      <PageHero
        label="Selected work"
        title="Scope profiles from commercial and industrial work."
        intro="Organised by sector. Each entry sets out the scope, the constraints that shaped the plan, what we did about them, and how the job closed out."
        crumbs={crumbs}
        meta={[
          { label: 'Records shown', value: `${projects.length} scope profiles` },
          { label: 'Sectors', value: `${grouped.length} markets` },
          { label: 'Status', value: 'Awaiting verified data' },
          { label: 'Photography', value: 'Placeholders in place' },
        ]}
      />

      {/* Honesty notice — deliberately prominent, not buried in a footnote. */}
      <section className="border-b border-line bg-mist">
        <div className="container-site py-8 md:py-10">
          <Reveal>
            <div className="flex flex-col gap-4 border-l-4 border-red bg-white p-6 sm:flex-row sm:items-start sm:gap-5 md:p-7">
              <AlertTriangle aria-hidden="true" className="size-5 shrink-0 text-red" />
              <div>
                <h2 className="text-lg text-navy md:text-xl">
                  These are sample layouts, not verified Childress projects.
                </h2>
                <p className="mt-2.5 max-w-3xl text-[0.9375rem] leading-relaxed text-body">
                  Every record on this page is an illustrative scope profile, published so the
                  project pages can be reviewed before real content is supplied. No client names,
                  contract values, dates, or completed works are represented as fact. Each entry
                  is replaced individually as the company confirms a project and secures written
                  permission from the owner or general contractor to publish it.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sector-grouped portfolio */}
      {grouped.map((group, index) => (
        <section
          key={group.market.slug}
          className={index % 2 === 0 ? 'bg-white py-16 md:py-20' : 'bg-mist py-16 md:py-20'}
        >
          <div className="container-site">
            <SectionHeading
              as="h2"
              layout="split"
              label={group.market.code}
              title={group.market.shortTitle}
              intro={<p>{group.market.summary}</p>}
            />

            <RevealGroup className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {group.items.map((project) => (
                <RevealItem key={project.slug}>
                  <ProjectCard project={project} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      ))}

      <CtaBanner
        label="Your project"
        title="Want your building on this page?"
        body="Send the drawings and the bid due date. If we win the work and you are willing to have it published, we will ask for permission in writing before anything appears here."
      />

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
