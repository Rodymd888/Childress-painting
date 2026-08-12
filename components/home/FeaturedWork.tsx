import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCover } from '@/components/projects/ProjectCover';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { TextLink } from '@/components/ui/Button';
import { photographedProjects } from '@/lib/projects';
import { getIndustry } from '@/lib/industries';

/**
 * FEATURED WORK
 * ---------------------------------------------------------------------------
 * Real photography, given real space. Deliberately NOT a uniform card grid:
 * the lead project runs full width at a wide crop, and the remaining four sit
 * beneath it. Varying visual weight is what makes a portfolio read as edited
 * rather than as a directory listing.
 *
 * Only projects that actually have photography appear here. A designed cover
 * is right in a complete portfolio grid; it is wrong in a section whose entire
 * job is to show the work.
 */
export function FeaturedWork() {
  const shown = photographedProjects.slice(0, 5);
  if (shown.length === 0) return null;

  const [lead, ...rest] = shown;
  const leadIndustry = getIndustry(lead.industry);

  return (
    <section className="section bg-white">
      <div className="container-site">
        <SectionHeading
          label="Featured Work"
          layout="split"
          title="Recent Projects, Photographed."
          intro={
            <p>
              Restaurants, grocery and convenience retail, corporate studios, public safety
              facilities, and custom homes. Every photograph below is our own work.
            </p>
          }
          action={<TextLink href="/projects">The Full Portfolio</TextLink>}
        />

        {/* ----------------------------------------------------------- LEAD */}
        <Reveal className="mt-10 md:mt-14">
          <Link href={`/projects/${lead.slug}`} className="group block">
            <ProjectCover
              project={lead}
              ratio="wide"
              priority
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="hidden md:block"
            />
            <ProjectCover
              project={lead}
              ratio="video"
              priority
              sizes="100vw"
              className="md:hidden"
            />
            <div className="mt-5 flex flex-wrap items-start justify-between gap-4 border-t-2 border-ink pt-5">
              <div>
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red">
                  {leadIndustry?.title ?? lead.industry}
                </span>
                <h3 className="mt-2.5 flex items-center gap-2 text-h3 text-ink transition-colors group-hover:text-red">
                  {lead.name}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-5 shrink-0 text-red transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </h3>
                {lead.location && (
                  <p className="mt-2 flex items-center gap-1.5 text-[0.875rem] text-ink/55">
                    <MapPin aria-hidden="true" className="size-3.5 text-red" />
                    {lead.location}
                  </p>
                )}
              </div>
              <p className="max-w-md text-[0.9375rem] leading-relaxed text-body">
                {lead.scopeSummary}
              </p>
            </div>
          </Link>
        </Reveal>

        {/* ---------------------------------------------------------- OTHERS */}
        {rest.length > 0 && (
          <RevealGroup
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 md:mt-12"
            stagger={0.06}
          >
            {rest.map((project) => {
              const industry = getIndustry(project.industry);
              return (
                <RevealItem key={project.slug}>
                  <Link href={`/projects/${project.slug}`} className="group block">
                    <ProjectCover
                      project={project}
                      ratio="photo"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <div className="mt-4">
                      <span className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-red">
                        {industry?.shortTitle ?? project.industry}
                      </span>
                      <h3 className="mt-2 text-h5 text-ink transition-colors group-hover:text-red">
                        {project.name}
                      </h3>
                      {project.location && (
                        <p className="mt-1 text-[0.8125rem] text-ink/50">{project.location}</p>
                      )}
                    </div>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        )}
      </div>
    </section>
  );
}
