import Image from 'next/image';
import { getIndustry } from '@/lib/industries';
import type { ProjectCardData } from '@/lib/projects';

/**
 * PROJECT COVER
 * ---------------------------------------------------------------------------
 * Every project card and hero renders through here, so no project can ever
 * show an empty frame.
 *
 *   Real photography present  ->  the photograph, always.
 *   No photography yet        ->  a designed portfolio cover.
 *
 * The fallback is NOT a missing-image placeholder. It is a title-block cover
 * built from the same construction-drawing motif used across the site: mono
 * sector label, red dimension rule, client name set in the display face, and
 * the wordmark. It is meant to look deliberate in a portfolio grid.
 *
 * PALETTE — brand tokens only. Ink (#0a0a0b) through ink-700, red (#d81f26),
 * and the neutral scale. No colour outside the established identity is used
 * anywhere in this component.
 *
 * When photography arrives the cover swaps automatically: it is a data change
 * in lib/project-images.ts, never a change here.
 */

type Ratio = 'video' | 'photo' | 'portrait' | 'wide';

const RATIOS: Record<Ratio, string> = {
  video: 'aspect-[16/10]',
  photo: 'aspect-[4/3]',
  portrait: 'aspect-[3/4]',
  wide: 'aspect-[21/9]',
};

export function ProjectCover({
  project,
  ratio = 'video',
  sizes = '(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw',
  priority = false,
  className = '',
}: {
  project: ProjectCardData;
  ratio?: Ratio;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const image = project.cover;
  const industry = getIndustry(project.industry);
  const sector = industry?.shortTitle ?? 'Commercial';

  /* ---------------------------------------------------- real photography */
  if (image) {
    return (
      <div className={['relative overflow-hidden bg-ink', RATIOS[ratio], className].join(' ')}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={82}
          className="object-cover object-center transition-transform duration-[900ms] ease-out md:group-hover:scale-[1.04]"
        />
        {/* Keeps overlaid text legible on light photographs. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent opacity-90"
        />
      </div>
    );
  }

  /* ------------------------------------------------- designed cover */
  return (
    <div
      className={[
        'relative overflow-hidden bg-ink',
        RATIOS[ratio],
        className,
      ].join(' ')}
      role="img"
      aria-label={`${project.name} — ${sector} project. Photography coming soon.`}
    >
      {/* Depth from the brand ink scale only. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(120%_100%_at_15%_0%,var(--color-ink-700)_0%,var(--color-ink-900)_55%,var(--color-ink)_100%)]"
      />
      {/* Drawing-sheet grid, the same motif used site-wide. */}
      <div aria-hidden="true" className="sheet-grid absolute inset-0 opacity-[0.55]" />
      {/* Red wash, brand red only. */}
      <div
        aria-hidden="true"
        className="absolute -left-1/4 top-0 h-full w-2/3 bg-[radial-gradient(60%_70%_at_0%_0%,rgba(216,31,38,0.20),transparent_70%)]"
      />
      {/* Title-block rule. */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-red" />

      <div className="relative flex h-full flex-col justify-between p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="font-mono text-[0.5625rem] uppercase tracking-[0.22em] text-white/45">
            Childress Painting
          </span>
          <span className="shrink-0 border border-red/50 px-2 py-1 font-mono text-[0.5rem] uppercase tracking-[0.18em] text-red-light">
            {sector}
          </span>
        </div>

        <div>
          <div aria-hidden="true" className="mb-3 h-px w-10 bg-red" />
          <p className="font-display text-[1.0625rem] font-bold leading-tight tracking-tight text-white md:text-[1.1875rem]">
            {project.name}
          </p>
          {project.location && (
            <p className="mt-1 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-white/50">
              {project.location}
            </p>
          )}
          <p className="mt-3 font-mono text-[0.5rem] uppercase tracking-[0.2em] text-white/35">
            Project Gallery Coming Soon
          </p>
        </div>
      </div>
    </div>
  );
}
