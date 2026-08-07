/**
 * DEPRECATED — WhyChoose
 * ===========================================================================
 * The v2 version of this component rendered invented metrics ("98% on-time",
 * and similar) that could not be substantiated. In v3 the differentiator grid
 * is composed directly on the homepage and on /why-childress from the verified
 * `differentiators` list in lib/content.ts, which carries no unverifiable
 * figures.
 *
 * This stub exists only so a lingering copy from a previous version compiles
 * rather than failing the build on the removed `metric` property.
 *
 * Nothing in the live site imports this file. SAFE TO DELETE.
 * ===========================================================================
 */

import { differentiators } from '@/lib/content';

/** @deprecated Use the differentiator grid on /why-childress instead. */
export function WhyChoose() {
  return (
    <section className="section bg-white">
      <div className="container-site">
        <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((item) => (
            <li key={item.title} className="bg-white p-6">
              <h3 className="font-display text-h5 font-bold tracking-tight text-ink">
                {item.title}
              </h3>
              <p className="mt-2.5 text-[0.875rem] leading-relaxed text-body">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
