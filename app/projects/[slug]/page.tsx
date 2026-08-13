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
import { AutoVideo } from '@/components/media/AutoVideo';
import { SectorArt } from '@/components/ui/SectorArt';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { JsonLd } from '@/components/ui/JsonLd';

import { toCardData, getProject, projectSlugs, relatedProjects } from '@/lib/projects';
import { getIndustry } from '@/lib/industries';
import { allCities } from '@/lib/locations';
import { getService } from '@/lib/services';
import { processSteps } from '@/lib/content';
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
  /* Geo-qualified titles: a project page competes for "<brand> painting
     <city>", which is a real search and one no competitor is answering. */
  const where = project.location ? ` | ${project.location}` : '';
  const title = `${project.name} Painting Project${where} | ${
    industry?.title ?? 'Commercial'
  } Painting`;

  return {
    title,
    description: project.location
      ? `${project.scopeSummary} A ${industry?.shortTitle.toLowerCase() ?? 'commercial'} painting project completed by Childress Painting in ${project.location}.`
      : project.scopeSummary,
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
  const videos = project.videos ?? [];

  /* The city page for this project's location, when we publish one. This is
     what turns the portfolio into a local-search asset: every photographed
     job points at the market page it belongs to. */
  const cityMatch = project.location
    ? allCities.find((c) => c.projectCities.some((pc) => project.location!.includes(pc)))
    : undefined;

  /* Coating systems for the scopes actually performed, de-duplicated. Nothing
     here is project-specific; it is the specification standard we work to. */
  const systemsUsed = Array.from(
    new Map(
      servicesPerformed.flatMap((svc) => svc.systems.map((sys) => [sys.label, sys] as const)),
    ).values(),
  ).slice(0, 4);

  /* The four steps every project runs through, drawn from the published
     process so the portfolio and the process page never disagree. */
  const approachSteps = processSteps
    .filter((s) => ['02', '04', '06', '08'].includes(s.number))
    .map((s) => ({ number: s.number, title: s.title, body: s.body }));

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

          <h1 className="mt-5 max-w-4xl text-h1 text-white">
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
                Market Sector
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
                Services Performed
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
              <span className="title-block text-ink/60">Project Overview</span>

              {isCaseStudy && project.overview ? (
                <div className="prose-site mt-7">
                  <p className="text-lead leading-relaxed text-ink/80">{project.overview}</p>
                </div>
              ) : (
                <>
                  <p className="mt-7 text-h3 font-medium leading-snug tracking-tight text-ink">
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
                          Request References
                        </ButtonLink>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* SCOPE OF WORK — derived from the services performed, so it is
                  substantive without inventing project-specific data. */}
              {!isCaseStudy && servicesPerformed.length > 0 && (
                <div className="mt-10 md:mt-14">
                  <span className="title-block text-ink/60">Scope of Work</span>
                  <h2 className="mt-5 text-h3 text-ink">What This Engagement Covers.</h2>
                  <div className="mt-8 space-y-px border border-line bg-line">
                    {servicesPerformed.map((service) => (
                      <div key={service.slug} className="bg-white p-6 md:p-7">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h3 className="font-display text-h5 font-bold tracking-tight text-ink">
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

              {/* HOW WE RUN THE WORK — the coating systems and the preparation
                  standard behind them, pulled from the services actually
                  performed. Substantive without asserting anything
                  project-specific that has not been confirmed. */}
              {!isCaseStudy && systemsUsed.length > 0 && (
                <div className="mt-10 md:mt-14">
                  <span className="title-block text-ink/60">Systems &amp; Preparation</span>
                  <h2 className="mt-5 text-h3 text-ink">What Goes On the Wall, and What Happens First.</h2>
                  <p className="mt-4 max-w-2xl leading-relaxed text-body">
                    Coatings are specified against the substrate and the service the surface
                    has to take, then confirmed with the manufacturer before pricing. Nearly
                    every finish that fails early fails in preparation, not in the can, so
                    preparation carries its own line and its own sign-off.
                  </p>
                  <dl className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2">
                    {systemsUsed.map((sys) => (
                      <div key={sys.label} className="bg-white p-5 md:p-6">
                        <dt className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-red">
                          {sys.label}
                        </dt>
                        <dd className="mt-2 text-[0.875rem] leading-relaxed text-body">
                          {sys.detail}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {/* HOW THE JOB IS RUN — the sequence every project follows. */}
              {!isCaseStudy && (
                <div className="mt-10 md:mt-14">
                  <span className="title-block text-ink/60">Project Approach</span>
                  <h2 className="mt-5 text-h3 text-ink">How This Job Was Run.</h2>
                  <ol className="mt-8 space-y-px bg-line">
                    {approachSteps.map((step) => (
                      <li key={step.number} className="flex gap-5 bg-white p-5 md:gap-6 md:p-6">
                        <span className="font-mono text-[0.6875rem] text-red">{step.number}</span>
                        <div>
                          <h3 className="font-display text-h5 font-semibold text-ink">
                            {step.title}
                          </h3>
                          <p className="mt-1.5 text-[0.875rem] leading-relaxed text-body">
                            {step.body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* LOCAL MARKET LINK — project to city page. */}
              {cityMatch && (
                <div className="mt-10 md:mt-14">
                  <span className="title-block text-ink/60">Market</span>
                  <h2 className="mt-5 text-h3 text-ink">
                    Painting Work in {cityMatch.name}.
                  </h2>
                  <p className="mt-4 max-w-2xl leading-relaxed text-body">
                    {cityMatch.intro.split('. ').slice(0, 2).join('. ')}.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Link
                      href={`/locations/${cityMatch.state.slug}/${cityMatch.slug}`}
                      className="group inline-flex min-h-11 items-center gap-2 border border-line px-4 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                    >
                      Painting Contractors in {cityMatch.name}
                    </Link>
                    <Link
                      href={`/locations/${cityMatch.state.slug}`}
                      className="group inline-flex min-h-11 items-center gap-2 border border-line px-4 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                    >
                      All {cityMatch.state.name} Markets
                    </Link>
                  </div>
                </div>
              )}

              {/* SECTOR CONTEXT — how work in this market actually runs. */}
              {!isCaseStudy && industry && industry.constraints.length > 0 && (
                <div className="mt-10 md:mt-14">
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
                    Services Performed
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
                      Project Facts
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
                        Market Sector
                      </span>
                      <span className="mt-1.5 block font-display text-h5 font-bold tracking-tight text-ink transition-colors group-hover:text-red">
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
      {(gallery.length > 0 || videos.length > 0) && (
        <section className="section bg-mist">
          <div className="container-site">
            <SectionHeading
              label="Project Gallery"
              title="On Site."
              as="h2"
              intro={
                videos.length > 0 ? (
                  <p>
                    {gallery.length} photographs and {videos.length}{' '}
                    {videos.length === 1 ? 'clip' : 'clips'} from this project. Select any item
                    to open it full screen.
                  </p>
                ) : undefined
              }
            />

            <Reveal className="mt-12">
              <ProjectGallery images={gallery} videos={videos} />
            </Reveal>
          </div>
        </section>
      )}

      {/* ====================================================== PROJECT IN MOTION */}
      {videos.length > 0 && (
        <section className="relative overflow-hidden bg-ink py-14 sm:py-20 md:py-24 lg:py-28">
          <div className="sheet-grid absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="container-site relative">
            <SectionHeading
              light
              label="Project in Motion"
              layout="split"
              title="Footage From This Job."
              intro={
                <p>
                  Filmed on site during the work. Clips play without sound; use the controls
                  for audio.
                </p>
              }
            />

            {/* Portrait clips sit in a row of tall cards. A 9:16 clip stretched
                across a desktop viewport is either cropped through its subject
                or floating in black. */}
            <RevealGroup
              className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-3 lg:gap-6"
              stagger={0.08}
            >
              {videos.map((video) => (
                <RevealItem key={video.src}>
                  <AutoVideo
                    src={video.src}
                    poster={video.poster}
                    title={video.title}
                    orientation={video.orientation ?? 'portrait'}
                  />
                  <p className="mt-3.5 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-red-light">
                    {video.kind === 'walkthrough' ? 'Walkthrough' : video.kind}
                    {video.duration ? ` · ${video.duration}s` : ''}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* =============================================================== RELATED */}
      {related.length > 0 && (
        <section className="section bg-white">
          <div className="container-site">
            <SectionHeading
              label="Related Work"
              title={
                industry ? `More ${industry.shortTitle} Projects.` : 'More Projects.'
              }
              as="h2"
            />

            <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
              {related.map((item) => (
                <RevealItem key={item.slug}>
                  <ProjectCard project={toCardData(item)} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      <CtaBanner
        label="Bid Invitations"
        title="Bidding Similar Work?"
        body={`Send the plans and the specification sections. We confirm receipt, tell you whether we are bidding, and state our assumptions and exclusions in writing. Call ${company.phone}.`}
      />

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
