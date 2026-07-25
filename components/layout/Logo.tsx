import Link from 'next/link';
import { company } from '@/lib/site';

/**
 * Wordmark lockup.
 *
 * ⚠️ REPLACE — this is a typographic stand-in built from the brand colors.
 * Swap the `<span aria-hidden>` block for the official transparent SVG or PNG
 * logo when it is available, and keep the visually-hidden company name.
 */
export function Logo({
  light = false,
  className,
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={`${company.name} — home`}
      className={['group flex shrink-0 items-center gap-3', className].filter(Boolean).join(' ')}
    >
      <span aria-hidden="true" className="flex">
        <span
          className={[
            'flex size-9 items-center justify-center font-display text-lg font-black italic leading-none',
            light ? 'bg-white text-navy' : 'bg-navy text-white',
          ].join(' ')}
        >
          C
        </span>
        <span className="-ml-1.5 flex size-9 items-center justify-center bg-red font-display text-lg font-black italic leading-none text-white">
          P
        </span>
      </span>

      <span className="hidden leading-none sm:block">
        <span
          className={[
            'block font-display text-[1.0625rem] font-extrabold uppercase tracking-tight',
            light ? 'text-white' : 'text-navy',
          ].join(' ')}
        >
          Childress
        </span>
        <span className="mt-0.5 block font-mono text-[0.5625rem] uppercase tracking-[0.3em] text-red">
          Painting
        </span>
      </span>
    </Link>
  );
}
