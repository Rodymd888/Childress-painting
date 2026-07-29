import { notFound } from 'next/navigation';
import Link from 'next/link';
import { AlertTriangle, MapPin, ArrowRight } from 'lucide-react';

import { CtaBanner } from '@/components/ui/CtaBanner';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/ui/JsonLd';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import type { ArtKey } from '@/components/ui/SectorArt';
import { TextLink } from '@/components/ui/Button';
import { ProjectCard } from '@/components/cards/ProjectCard';

import { projects, getProject, projectSlugs } from '@/lib/projects';
import { getMarket } from '@/lib/markets';
import { getService } from '@/lib/services';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';

export const dynamicParams = false;

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return buildMetadata({
    /* Sample records are marked in the title so they can never be mistaken for
       verified work in a search result. Remove once `sample` is false. */
    title: project.sample
      ? `${project.name} (Sample) | Project Profile`
      : `${project.name} | Project Profile`,
    description: project.scopeSummary.slice(0, 158),
    path: `/projects/${project.slug}`,
    noIndex: project.sample,
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const market = getMarket(project.market);

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: project.name, href: `/projects/${project.slug}` },
  ];

  const related = projects
    .filter((p) => p.slug !== project.slug && p.market === project.market)
    .slice(0, 3);

  const fallback = projects.filter((p) => p.slug !== project.slug).slice(0, 3);
  const alsoSee = related.length > 0 ? related : fallback;

  return (
    <>
      {/* Hero -------------------------------------------------------------- */}
      <section className="relative isolate flex min-h-[30rem] flex-col justify-end overflow-hidden bg-navy pt-28 md:min-h-[36rem] lg:pt-36">
        {project.featuredImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.featuredImage.src}
            alt={project.featuredImage.alt}
            width={project.featuredImage.width}
            height={project.featuredImage.height}
            className="absolute inset-0 -z-20 size-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 -z-20">
            <ImagePlaceholder
              art={project.art as ArtKey}
              label={project.name}
              note="Awaiting project photography"
            />
          </div>
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/80 to-navy/40"
        />

        <div className="container-site relative pb-14 md:pb-20">
          <Breadcrumbs crumbs={crumbs} />

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="bg-white px-3 py-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-navy">
              {market?.shortTitle ?? project.market}
            </span>
            {project.sample && (
              <span className="bg-red px-3 py-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-white">
                Sample layout
              </span>
            )}
          </div>

          <h1 className="mt-6 max-w-4xl text-[clamp(2.25rem,6vw,4.5rem)] text-white">
            {project.name}
          </h1>

          <p className="mt-5 flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-white/70">
            <MapPin aria-hidden="true" className="size-3.5 text-red" />
            {project.location}
          </p>
        </div>

        {/* Title-block strip */}
        <div className="relative border-t border-white/15 bg-navy/80 backdrop-blur-sm">
          <div className="container-site">
            <dl className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-white/12">
              <div className="border-b border-white/12 py-5 md:border-b-0 md:pr-6">
                <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-white/60">
                  Sector
                </dt>
                <dd className="mt-1.5 text-[0.9375rem] font-medium text-white">
                  {market?.shortTitle ?? project.market}
                </dd>
              </div>
              <div className="border-b border-l border-white/12 py-5 pl-5 md:border-b-0 md:px-6">
                <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-white/60">
                  Completion
                </dt>
                <dd className="mt-1.5 text-[0.9375rem] font-medium text-white">
                  {project.completionDate}
                </dd>
              </div>
              <div className="py-5 md:px-6">
                <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-white/60">
                  Services
                </dt>
                <dd className="mt-1.5 text-[0.9375rem] font-medium text-white">
                  {project.serviceTypes
                    .map((s) => getService(s)?.shortTitle ?? s)
                    .join(' · ')}
                </dd>
              </div>
              <div className="border-l border-white/12 py-5 pl-5 md:pl-6">
                <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-white/60">
                  Location
                </dt>
                <dd className="mt-1.5 text-[0.9375rem] font-medium text-white">
                  {project.location}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Sample notice ----------------------------------------------------- */}
      {project.sample && (
        <section className="border-b border-line bg-mist">
          <div className="container-site py-8">
            <div className="flex flex-col gap-4 border-l-4 border-red bg-white p-6 sm:flex-row sm:items-start sm:gap-5">
              <AlertTriangle aria-hidden="true" className="size-5 shrink-0 text-red" />
              <p className="max-w-3xl text-[0.9375rem] leading-relaxed text-body">
                <strong className="font-semibold text-navy">This is a sample layout.</strong> It
                is an illustrative scope profile used to preview the project page design. It does
                not represent a completed Childress Painting project, and no client, contract
                value, date, or outcome shown here is a factual claim. This page is excluded from
                search engines until it carries verified content.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Scope + facts ------------------------------------------------------ */}
      <section className="bg-white py-20 md:py-24">
        <div className="container-site">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-20">
            <Reveal>
              <span className="title-block text-navy/60">Scope</span>
              <p className="mt-6 text-[clamp(1.25rem,2.4vw,1.625rem)] leading-snug text-navy">
                {project.scopeSummary}
              </p>
            </Reveal>

            {project.facts.length > 0 && (
              <Reveal delay={0.08}>
                <dl className="border-t-4 border-red bg-mist p-7">
                  {project.facts.map((fact) => (
                    <div key={fact.label} className="border-b border-line py-4 last:border-b-0">
                      <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-navy/60">
                        {fact.label}
                      </dt>
                      <dd className="mt-1.5 text-[0.9375rem] font-medium text-navy">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Challenges / Solution / Results ------------------------------------ */}
      <section className="bg-navy py-20 md:py-24 lg:py-28">
        <div className="container-site">
          <SectionHeading
            layout="split"
            light
            label="Challenge · Solution · Result"
            title="What made it hard, and what we did about it."
            intro={
              <p>
                Every project has one constraint that decides how it runs. Naming it early is the
                difference between a plan and a hope.
              </p>
            }
          />

          <div className="mt-14 grid gap-px bg-white/12 lg:grid-cols-3">
            {[
              { label: 'Challenges', items: project.challenges },
              { label: 'Our approach', items: project.solution },
              { label: 'Results', items: project.results },
            ].map((column) => (
              <Reveal key={column.label} className="bg-navy p-7 lg:p-9">
                <h3 className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red">
                  {column.label}
                </h3>
                <ul className="mt-7 space-y-5">
                  {column.items.map((item, i) => (
                    <li key={i} className="border-t border-white/12 pt-5">
                      <p className="text-[0.9375rem] leading-relaxed text-steel-light">{item}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery ------------------------------------------------------------ */}
      <section className="bg-white py-20 md:py-24">
        <div className="container-site">
          <SectionHeading
            layout="split"
            label="Gallery"
            title="Project photography."
            intro={
              <p>
                {project.gallery.length > 0
                  ? 'Selected images from the work.'
                  : 'No photography has been supplied for this record yet. Add images to the `gallery` array in lib/projects.ts — each needs a src, descriptive alt text, and explicit width and height so the grid does not shift while they load.'}
              </p>
            }
          />

          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.gallery.length > 0
              ? project.gallery.map((image) => (
                  <RevealItem key={image.src}>
                    <figure>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        loading="lazy"
                        className="w-full object-cover"
                      />
                      {image.caption && (
                        <figcaption className="mt-3 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-body">
                          {image.caption}
                        </figcaption>
                      )}
                    </figure>
                  </RevealItem>
                ))
              : /* Three empty frames so the grid reads as intentional. */
                [0, 1, 2].map((i) => (
                  <RevealItem key={i} className="aspect-4/3">
                    <ImagePlaceholder
                      art={project.art as ArtKey}
                      label={`${project.name} gallery slot ${i + 1}`}
                      note={`Gallery ${i + 1}`}
                    />
                  </RevealItem>
                ))}
          </RevealGroup>
        </div>
      </section>

      {/* Related ------------------------------------------------------------ */}
      <section className="border-t border-line bg-mist py-16 md:py-20">
        <div className="container-site">
          <SectionHeading
            as="h2"
            layout="split"
            label="More work"
            title="Related scope profiles."
            action={<TextLink href="/projects">All projects</TextLink>}
          />

          <RevealGroup className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {alsoSee.map((item) => (
              <RevealItem key={item.slug}>
                <ProjectCard project={item} />
              </RevealItem>
            ))}
          </RevealGroup>

          {market && (
            <Reveal className="mt-12">
              <Link
                href={`/markets/${market.slug}`}
                className="group inline-flex items-center gap-3 border border-line bg-white px-6 py-4 transition-colors hover:border-navy"
              >
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-navy">
                  How we plan {market.shortTitle.toLowerCase()} work
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 text-red transition-transform group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          )}
        </div>
      </section>

      <CtaBanner
        label="Similar project?"
        title="Send us the drawings."
        body="If your project looks like this one, we can tell you quickly whether we are the right fit and what the paint scope actually involves."
      />

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
