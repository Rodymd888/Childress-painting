import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { MediaFrame } from '@/components/ui/MediaFrame';
import type { Industry } from '@/lib/industries';

/**
 * INDUSTRY CARD
 * ---------------------------------------------------------------------------
 * Media slot on top, title block beneath. The media slot is a MediaFrame, so
 * setting `image` on the industry record replaces the drawn artwork with a
 * photograph without touching this component.
 */
export function IndustryCard({
  industry,
  projectCount,
  priority = false,
}: {
  industry: Industry;
  projectCount?: number;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/industries/${industry.slug}`}
      className="group lift sweep relative flex flex-col overflow-hidden border border-line bg-white"
    >
      <MediaFrame
        image={
          industry.image
            ? {
                src: industry.image,
                alt: `${industry.title} painting project`,
                width: 1600,
                height: 1200,
              }
            : undefined
        }
        art={industry.art}
        label={industry.title}
        ratio="landscape"
        priority={priority}
      />

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red">
          {industry.code}
        </span>

        <h3 className="mt-3 text-h4 text-ink transition-colors duration-300 group-hover:text-red">
          {industry.title}
        </h3>

        <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-body">
          {industry.summary}
        </p>

        <span className="mt-6 flex items-center justify-between border-t border-line pt-4 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink/55">
          {projectCount ? (
            <span>
              {projectCount} {projectCount === 1 ? 'project' : 'projects'}
            </span>
          ) : (
            <span>View Sector</span>
          )}
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 text-red transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
