import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import type { Project } from '@/lib/projects';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { getMarket } from '@/lib/markets';

export function ProjectCard({ project }: { project: Project }) {
  const market = getMarket(project.market);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-navy">
        {project.featuredImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.featuredImage.src}
            alt={project.featuredImage.alt}
            width={project.featuredImage.width}
            height={project.featuredImage.height}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <ImagePlaceholder
            gradient={project.gradient}
            label={project.name}
            className="transition-transform duration-700 group-hover:scale-105"
          />
        )}

        <span className="absolute left-4 top-4 bg-white px-2.5 py-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-navy">
          {market?.shortTitle ?? project.market}
        </span>

        {/* Sample records are always labeled so nothing reads as a verified job. */}
        {project.sample && (
          <span className="absolute right-4 top-4 bg-red px-2.5 py-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-white">
            Sample layout
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col border-b border-line pb-6 pt-5">
        <div className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-red">
          <MapPin aria-hidden="true" className="size-3" />
          {project.location}
        </div>

        <div className="mt-3 flex items-start justify-between gap-4">
          <h3 className="text-[1.375rem] leading-tight text-navy lg:text-[1.5rem]">
            {project.name}
          </h3>
          <ArrowUpRight
            aria-hidden="true"
            className="size-5 shrink-0 text-navy/25 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-red"
          />
        </div>

        <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">
          {project.scopeSummary}
        </p>
      </div>
    </Link>
  );
}
