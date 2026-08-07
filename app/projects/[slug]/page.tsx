import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowUpRight, MapPin, CalendarDays, Layers, Info } from 'lucide-react';

import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CtaBanner } from '@/components/ui/CtaBanner';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { MediaFrame } from '@/components/ui/MediaFrame';
import { ProjectGallery } from '@/components/projects/ProjectGallery';
import { SectorArt } from '@/components/ui/SectorArt';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';

import { getProject, projectSlugs, relatedProjects } from '@/lib/projects';
import { getIndustry } from '@/lib/industries';
import { getService } from '@/lib/services';
import { breadcrumbSchema } from '@/lib/schema';
import { company } from '@/lib/site';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const industry = getIndustry(project.industry);
  const title = `${project.name} | ${industry?.title ?? 'Commercial'} Painting`;

  return {
    title,
    description: project.scopeSummary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title, description: project.scopeSummary, url: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const industry = getIndustry(project.industry);
  const servicesPerformed = project.serviceTypes
    .map(getService)
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const related = relatedProjects(project.slug, 3);
  const isCaseStudy = project.detail === 'case-study';
  const gallery = project.gallery ?? [];

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: project.name, href: `/projects/${project.slug}` },
  ];

  return (
    <>
      {/* ================================================================= HERO */}
      <section className="relative isolate flex min-h-[30rem] flex-col justify-end overflow-hidden bg-ink pt-32 md:min-h-[36rem] md:pt-40">
        <div className="absolute inset-0 -z-20">
          {project.featuredImage ? (
            <Image
              src={project.featuredImage.src}
              alt={project.featuredImage.alt}
              fill
              priority
              quality={85}
              sizes="100vw"
              className="object-cover object-center"
            />
          ) : (
            <SectorArt art={project.art} className="size-full" />
          )}
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/40"
        />
        <div className="sheet-grid absolute inset-0 -z-10 opacity-50" aria-hidden="true" />

        <div className="container-site relative pb-14 md:pb-18">
          <Breadcrumbs crumbs={crumbs} />

          <span className="title-block mt-8 text-white/70">
            {industry?.code ?? 'Project'} · {industry?.title ?? project.industry}
          </span>

          <h1 className="mt-5 max-w-4xl text-[clamp(2.5rem,6.4vw,4.75rem)] text-white">
            {project.name}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ash md:text-xl">
            {project.scopeSummary}
          </p>

          {/* Fact strip — renders only the facts the record actually holds. */}
          <dl className="mt-11 grid grid-cols-1 gap-px border-t border-white/15 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-ink py-5 sm:px-5 sm:first:pl-0">
              <dt className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-white/60">
                <Layers aria-hidden="true" className="size-3 text-red" />
                Market sector
              </dt>
              <dd className="mt-2 text-[0.9375rem] font-medium text-white">
                {industry?.title ?? project.industry}
              </dd>
            </div>

            {project.location && (
              <div className="bg-ink py-5 sm:px-5">
                <dt className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-white/60">
                  <MapPin aria-hidden="true" className="size-3 text-red" />
                  Location
                </dt>
                <dd className="mt-2 text-[0.9375rem] font-medium text-white">
                  {project.location}
                </dd>
              </div>
            )}

            {project.completionDate && (
              <div className="bg-ink py-5 sm:px-5">
                <dt className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-white/60">
                  <CalendarDays aria-hidden="true" className="size-3 text-red" />
                  Completed
                </dt>
                <dd className="mt-2 text-[0.9375rem] font-medium text-white">
                  {project.completionDate}
                </dd>
              </div>
            )}

            <div className="bg-ink py-5 sm:px-5">
              <dt className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-white/60">
                Services performed
              </dt>
              <dd className="mt-2 text-[0.9375rem] font-medium text-white">
                {servicesPerformed.length}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ============================================================== OVERVIEW */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
            <Reveal>
              <span className="title-block text-ink/60">Project overview</span>

              {isCaseStudy && project.overview ? (
                <div className="prose-site mt-7">
                  <p className="text-lead leading-relaxed text-ink/80">{project.overview}</p>
                </div>
              ) : (
                <>
                  <p className="mt-7 text-[clamp(1.25rem,2.4vw,1.625rem)] font-medium leading-snug tracking-tight text-ink">
                    {project.scopeSummary}
                  </p>

                  {/* Honest state: this record documents experience, not a
                      fully released case study. No invented specifics. */}
                  <div className="mt-9 flex items-start gap-4 border border-line bg-mist p-6">
                    <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-red" />
                    <div>
                      <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink/55">
                        Project detail
                      </p>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-body">
                        This entry documents commercial project experience from our
                        qualifications record. Photography, durations, and named references are
                        published once the owner or general contractor approves release in
                        writing. For a prequalification or bid, contact us and we will provide
                        project references directly.
                      </p>
                      <div className="mt-5 flex flex-wrap gap-3">
                        <ButtonLink href="/contact" variant="dark" withArrow>
                          Request references
                        </ButtonLink>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* SCOPE OF WORK — derived from the services performed, so it is
                  substantive without inventing project-specific data. */}
              {!isCaseStudy && servicesPerformed.length > 0 && (
                <div className="mt-14">
                  <span className="title-block text-ink/60">Scope of work</span>
                  <h2 className="mt-5 text-h3 text-ink">What This Engagement Covers.</h2>
                  <div className="mt-8 space-y-px border border-line bg-line">
                    {servicesPerformed.map((service) => (
                      <div key={service.slug} className="bg-white p-6 md:p-7">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h3 className="font-display text-[1.0625rem] font-bold tracking-tight text-ink">
                            {service.title}
                          </h3>
                          <span className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-red">
                            {service.csi}
                          </span>
                        </div>
                        <p className="mt-2 text-[0.875rem] leading-relaxed text-body">
                          {service.summary}
                        </p>
                        <ul className="mt-4 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                          {service.scope.slice(0, 4).map((item) => (
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
                    ))}
                  </div>
                </div>
              )}

              {/* SECTOR CONTEXT — how work in this market actually runs. */}
              {!isCaseStudy && industry && industry.constraints.length > 0 && (
                <div className="mt-14">
                  <span className="title-block text-ink/60">
                    How {industry.shortTitle} Work Runs
                  </span>
                  <div className="mt-7 space-y-8">
                    {industry.constraints.slice(0, 2).map((c) => (
                      <div key={c.title} className="border-l-2 border-red pl-6">
                        <h3 className="text-h4 text-ink">{c.title}</h3>
                        <p className="mt-2.5 leading-relaxed text-body">{c.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {isCaseStudy && project.challenges && project.challenges.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-h3 text-ink">Challenges</h2>
                  <ul className="mt-5 space-y-3">
                    {project.challenges.map((item) => (
                      <li key={item} className="flex items-start gap-3 leading-relaxed text-body">
                        <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 bg-red" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {isCaseStudy && project.solution && project.solution.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-h3 text-ink">Our Approach</h2>
                  <ul className="mt-5 space-y-3">
                    {project.solution.map((item) => (
                      <li key={item} className="flex items-start gap-3 leading-relaxed text-body">
                        <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 bg-red" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {isCaseStudy && project.results && project.results.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-h3 text-ink">Outcome</h2>
                  <ul className="mt-5 space-y-3">
                    {project.results.map((item) => (
                      <li key={item} className="flex items-start gap-3 leading-relaxed text-body">
                        <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 bg-red" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Reveal>

            {/* ------------------------------------------------------- SIDEBAR */}
            <Reveal delay={0.1} from="right">
              <div className="lg:sticky lg:top-28">
                <div className="border border-line bg-mist p-6 md:p-7">
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red">
                    Services performed
                  </span>
                  <ul className="mt-5 space-y-px">
                    {servicesPerformed.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          className="group flex items-center justify-between gap-3 border-b border-line py-3.5 transition-colors last:border-0 hover:text-red"
                        >
                          <span>
                            <span className="block text-[0.875rem] font-semibold text-ink transition-colors group-hover:text-red">
                              {service.title}
                            </span>
                            <span className="mt-0.5 block font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink/45">
                              {service.csi}
                            </span>
                          </span>
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-4 shrink-0 text-red transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {project.facts && project.facts.length > 0 && (
                  <div className="mt-6 border border-line bg-white p-6 md:p-7">
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red">
                      Project facts
                    </span>
                    <dl className="mt-5 divide-y divide-line">
                      {project.facts.map((fact) => (
                        <div
                          key={fact.label}
                          className="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0"
                        >
                          <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink/50">
                            {fact.label}
                          </dt>
                          <dd className="text-right text-[0.875rem] font-semibold text-ink">
                            {fact.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {industry && (
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="group mt-6 flex items-center justify-between gap-3 border border-line bg-white p-6 transition-colors hover:border-ink"
                  >
                    <span>
                      <span className="block font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink/50">
                        Market sector
                      </span>
                      <span className="mt-1.5 block font-display text-[1.0625rem] font-bold tracking-tight text-ink transition-colors group-hover:text-red">
                        {industry.title}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-red transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =============================================================== GALLERY */}
      {gallery.length > 0 && (
        <section className="section bg-mist">
          <div className="container-site">
            <SectionHeading label="Project gallery" title="On Site." as="h2" />

            <Reveal className="mt-12">
              <ProjectGallery images={gallery} />
            </Reveal>
          </div>
        </section>
      )}

      {/* ================================================================= VIDEO */}
      {project.video && (
        <section className="section bg-ink">
          <div className="container-site">
            <SectionHeading label="Project video" title="Walkthrough." as="h2" light />
            <Reveal className="mt-12">
              <video
                controls
                playsInline
                preload="metadata"
                poster={project.video.poster}
                className="w-full border border-white/15"
              >
                <source src={project.video.src} type="video/mp4" />
                Your browser does not support embedded video.
              </video>
              {project.video.caption && (
                <p className="mt-3 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-white/55">
                  {project.video.caption}
                </p>
              )}
            </Reveal>
          </div>
        </section>
      )}

      {/* =============================================================== RELATED */}
      {related.length > 0 && (
        <section className="section bg-white">
          <div className="container-site">
            <SectionHeading
              label="Related work"
              title={
                industry ? `More ${industry.shortTitle} Projects.` : 'More Projects.'
              }
              as="h2"
            />

            <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
              {related.map((item) => (
                <RevealItem key={item.slug}>
                  <ProjectCard project={item} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      <CtaBanner
        label="Bid invitations"
        title="Bidding Similar Work?"
        body={`Send the plans and the specification sections. We confirm receipt, tell you whether we are bidding, and state our assumptions and exclusions in writing. Call ${company.phone}.`}
      />

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
