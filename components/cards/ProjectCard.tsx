import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import type { Project } from '@/lib/projects';
import { SectorArt, type ArtKey } from '@/components/ui/SectorArt';
import { getMarket } from '@/lib/markets';
import { getService } from '@/lib/services';

/**
 * Project tile. v2 shows the scope performed on the card face, because that is
 * what a general contractor scans for — not the project name.
 */
export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const market = getMarket(project.market);
  const services = project.serviceTypes
    .map((slug) => getService(slug)?.shortTitle)
    .filter(Boolean) as string[];

  return (
    <Link href={`/projects/${project.slug}`} className="group flex flex-col">
      <div className="sheen relative aspect-4/3 overflow-hidden bg-navy">
        {project.featuredImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.featuredImage.src}
            alt={project.featuredImage.alt}
            width={project.featuredImage.width}
            height={project.featuredImage.height}
            loading={priority ? 'eager' : 'lazy'}
            className="size-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
        ) : (
          <SectorArt
            art={project.art as ArtKey}
            className="size-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
        )}

        <span className="absolute left-4 top-4 z-10 bg-white/95 px-2.5 py-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-navy backdrop-blur-sm">
          {market?.shortTitle ?? project.market}
        </span>

        {/* Sample records stay labeled so nothing reads as verified work. */}
        {project.sample && (
          <span className="absolute right-4 top-4 z-10 bg-red px-2.5 py-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-white">
            Sample layout
          </span>
        )}

        {/* Scope strip rises over the image on hover. */}
        <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full bg-navy/95 px-4 py-3 backdrop-blur-sm transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 motion-reduce:hidden">
          <span className="block font-mono text-[0.5rem] uppercase tracking-[0.2em] text-white/60">
            Scope performed
          </span>
          <span className="mt-1 block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-white">
            {services.join(' · ')}
          </span>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col border-b border-line pb-6 pt-5">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-red transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
        />
        <div className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-red">
          <MapPin aria-hidden="true" className="size-3" />
          {project.location}
        </div>

        <div className="mt-3 flex items-start justify-between gap-4">
          <h3 className="text-h4 leading-tight text-navy">{project.name}</h3>
          <ArrowUpRight
            aria-hidden="true"
            className="size-5 shrink-0 text-navy/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-red"
          />
        </div>

        <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">{project.scopeSummary}</p>
      </div>
    </Link>
  );
}
