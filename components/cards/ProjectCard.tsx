import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { MediaFrame } from '@/components/ui/MediaFrame';
import { getIndustry } from '@/lib/industries';
import type { Project } from '@/lib/projects';

/**
 * PROJECT CARD
 * ---------------------------------------------------------------------------
 * Renders whatever the record actually has. A project marked `detail:
 * 'experience'` shows the sector and scope category; one marked
 * 'case-study' additionally shows location and completion date.
 *
 * The media slot is a MediaFrame — populate `featuredImage` on the project and
 * a photograph replaces the drawn artwork with no change here.
 */
export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const industry = getIndustry(project.industry);
  const isCaseStudy = project.detail === 'case-study';

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group lift sweep relative flex flex-col overflow-hidden border border-line bg-white"
    >
      <MediaFrame
        image={project.featuredImage}
        art={project.art}
        label={project.name}
        ratio="landscape"
        priority={priority}
      />

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red">
            {industry?.title ?? project.industry}
          </span>
          {isCaseStudy && (
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink/40">
              Case Study
            </span>
          )}
        </div>

        <h3 className="mt-3 text-h4 text-ink transition-colors duration-300 group-hover:text-red">
          {project.name}
        </h3>

        {isCaseStudy && project.location && (
          <p className="mt-2 flex items-center gap-1.5 text-[0.8125rem] text-ink/55">
            <MapPin aria-hidden="true" className="size-3.5 text-red" />
            {project.location}
            {project.completionDate && <span className="text-ink/35">· {project.completionDate}</span>}
          </p>
        )}

        <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-body">
          {project.scopeSummary}
        </p>

        <span className="mt-6 flex items-center justify-between border-t border-line pt-4 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink/55">
          <span>
            {project.serviceTypes.length > 0
              ? `${project.serviceTypes.length} ${
                  project.serviceTypes.length === 1 ? 'service' : 'services'
                } performed`
              : 'View project'}
          </span>
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 text-red transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
