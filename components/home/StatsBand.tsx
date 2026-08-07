import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { companyStats } from '@/lib/site';

/**
 * STATS BAND
 * ---------------------------------------------------------------------------
 * Four verified figures from the capability statement. Deliberately not
 * inflated with invented metrics like "projects completed" or "gallons
 * applied" — every number here is defensible in a prequalification review.
 */
export function StatsBand() {
  return (
    <section aria-labelledby="stats" className="relative overflow-hidden bg-ink py-16 md:py-20">
      <div className="sheet-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-red/10 to-transparent"
      />

      <div className="container-site relative">
        <Reveal>
          <h2 id="stats" className="sr-only">Company at a Glance</h2>
          <span className="title-block text-white/55">At a Glance</span>
        </Reveal>

        <RevealGroup className="mt-10 grid grid-cols-2 gap-px bg-white/12 lg:grid-cols-4" stagger={0.07}>
          {companyStats.map((stat) => (
            <RevealItem key={stat.label} className="group bg-ink p-6 transition-colors duration-300 hover:bg-ink-800 md:p-8">
              <span className="block font-display text-h2 font-black leading-none text-white md:text-[3.5rem]">
                {stat.value}
              </span>
              <span
                aria-hidden="true"
                className="mt-4 block h-0.5 w-8 origin-left bg-red transition-transform duration-500 group-hover:scale-x-[1.8]"
              />
              <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-white">
                {stat.label}
              </p>
              <p className="mt-2 text-[0.8125rem] leading-snug text-ash">{stat.detail}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
