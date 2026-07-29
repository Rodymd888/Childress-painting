import { SectorArt, type ArtKey } from './SectorArt';

/**
 * IMAGE SLOT
 * ---------------------------------------------------------------------------
 * v2 — previously a gradient block with a diagonal hatch and a visible
 * "photography placeholder" label. It did its job (nobody could ship without
 * noticing) but it made finished pages look unfinished.
 *
 * Now it renders a purpose-drawn architectural scene from SectorArt, which
 * reads as art direction rather than a missing asset. The "awaiting
 * photography" note is still there for the team — but as a small, dismissable
 * corner marker rather than a banner across the artwork, and it can be turned
 * off entirely with `showNote={false}` once you are comfortable shipping the
 * drawings as the permanent treatment.
 */
export function ImagePlaceholder({
  art,
  label,
  note = 'Awaiting photography',
  showNote = true,
  className,
}: {
  art: ArtKey;
  label: string;
  note?: string;
  showNote?: boolean;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${label} — illustrative architectural drawing`}
      className={['relative size-full overflow-hidden bg-navy', className].filter(Boolean).join(' ')}
    >
      <SectorArt art={art} className="size-full" />

      {showNote && (
        <span className="absolute bottom-3 right-3 z-10 rounded-full bg-navy-900/70 px-2.5 py-1 font-mono text-[0.5rem] uppercase tracking-[0.16em] text-white/70 backdrop-blur-sm">
          {note}
        </span>
      )}
    </div>
  );
}
