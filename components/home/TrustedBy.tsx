import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { marqueeClients, totalClients, totalSchools, clientGroups } from '@/lib/clients';

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
            <span className="whitespace-nowrap px-7 font-display text-h3 font-bold uppercase tracking-tight text-ink/70 transition-colors duration-300 hover:text-ink md:px-9 md:text-[1.625rem]">
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
    <section aria-labelledby="trusted-by" className="border-y border-line bg-mist py-14 md:py-20">
      <div className="container-site">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10">
          <div>
            <span className="title-block text-ink/55">Representative Clients</span>
            <h2 id="trusted-by" className="mt-5 max-w-[20ch] text-h2 text-ink">
              Who We Have Painted For.
            </h2>
            <p className="mt-5 max-w-2xl text-lead leading-relaxed text-body">
              National retail and restaurant rollouts, professional sports venues, district-wide
              school programs, and industrial plants. Most of this work came through general
              contractors who invited us back on the next one.
            </p>
          </div>
          <Link
            href="/clients"
            className="group inline-flex shrink-0 items-center gap-2 border-b-2 border-red pb-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink transition-colors hover:text-red"
          >
            All {totalClients} Clients by Industry
            <ArrowRight
              aria-hidden="true"
              className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Figures behind the names, so the rails read as a record rather than
            a logo wall. Every number is computed from the client data. */}
        <dl className="mt-10 grid grid-cols-2 gap-px border-t border-line bg-line sm:grid-cols-4">
          {[
            { value: `${totalClients}`, label: 'Named Clients' },
            { value: `${clientGroups.length}`, label: 'Industry Groups' },
            { value: `${totalSchools}`, label: 'School Campuses' },
            { value: '40+', label: 'Years of Work' },
          ].map((stat) => (
            <div key={stat.label} className="bg-mist pr-4 pt-5">
              <dt className="font-display text-h3 font-bold tabular-nums text-ink">
                {stat.value}
              </dt>
              <dd className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink/55">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
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
