import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { marqueeClients, totalClients } from '@/lib/clients';

/**
 * TRUSTED BY
 * ---------------------------------------------------------------------------
 * Two counter-scrolling wordmark rails. Client names are set in type rather
 * than reproduced as logos — no trademark reproduction, and it reads as a
 * considered typographic band rather than a logo soup.
 *
 * The track is duplicated once and translated by exactly -50%, so the loop is
 * seamless without cloning nodes in JavaScript. Hovering pauses it.
 */

const half = Math.ceil(marqueeClients.length / 2);
const rowA = marqueeClients.slice(0, half);
const rowB = marqueeClients.slice(half);

function Rail({
  items,
  reverse = false,
  duration,
}: {
  items: string[];
  reverse?: boolean;
  duration: string;
}) {
  const track = [...items, ...items];

  return (
    <div className="marquee marquee-mask overflow-hidden">
      <ul
        className={[
          'flex w-max items-center',
          reverse ? 'marquee-track-reverse' : 'marquee-track',
        ].join(' ')}
        style={{ ['--marquee-duration' as string]: duration }}
      >
        {track.map((name, i) => (
          <li
            key={`${name}-${i}`}
            aria-hidden={i >= items.length ? 'true' : undefined}
            className="flex shrink-0 items-center"
          >
            <span className="whitespace-nowrap px-7 font-display text-[1.375rem] font-bold uppercase tracking-tight text-ink/70 transition-colors duration-300 hover:text-ink md:px-9 md:text-[1.625rem]">
              {name}
            </span>
            <span aria-hidden="true" className="size-1.5 shrink-0 rotate-45 bg-red/60" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TrustedBy() {
  return (
    <section aria-labelledby="trusted-by" className="border-y border-line bg-mist py-14 md:py-18">
      <div className="container-site">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="title-block text-ink/55">Representative clients</span>
            <h2 id="trusted-by" className="mt-5 max-w-[22ch] text-h3 text-ink">The Brands Our Leadership Has Painted For.</h2>
          </div>
          <Link
            href="/clients"
            className="group inline-flex shrink-0 items-center gap-2 border-b-2 border-red pb-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink transition-colors hover:text-red"
          >
            All {totalClients} clients by industry
            <ArrowRight
              aria-hidden="true"
              className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>

      <div className="mt-10 space-y-3 md:mt-12 md:space-y-4">
        <Rail items={rowA} duration="52s" />
        <Rail items={rowB} reverse duration="64s" />
      </div>

      <div className="container-site mt-9">
        <p className="max-w-3xl text-[0.8125rem] leading-relaxed text-body">
          Representative commercial project experience of the Childress Painting leadership
          team. Company names are used to identify project experience only; no endorsement or
          affiliation is implied.
        </p>
      </div>
    </section>
  );
}
