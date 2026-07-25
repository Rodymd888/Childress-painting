import { ImageIcon } from 'lucide-react';

/**
 * Labeled stand-in shown wherever real photography has not been supplied yet.
 * It is deliberately visible rather than decorative: the point is that nobody
 * can ship the site without noticing which images are still missing.
 *
 * Replace by setting `featuredImage` / `image` on the relevant data record.
 */
export function ImagePlaceholder({
  gradient,
  label,
  note = 'Photography placeholder',
  className,
}: {
  gradient: string;
  label: string;
  note?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${label} — image placeholder, awaiting project photography`}
      className={[
        'relative flex h-full w-full items-end overflow-hidden bg-gradient-to-br',
        gradient,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Diagonal hatch, echoing a drawing sheet's "not issued" fill. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            'repeating-linear-gradient(125deg, transparent 0 30px, rgba(255,255,255,0.07) 30px 31px)',
        }}
      />
      <div className="relative z-10 flex items-center gap-2 p-4 md:p-5">
        <ImageIcon aria-hidden="true" className="size-3.5 shrink-0 text-white/70" />
        <span className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-white/70">
          {note}
        </span>
      </div>
    </div>
  );
}
