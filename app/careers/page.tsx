import { HardHat, TrendingUp, Wrench, MapPin } from 'lucide-react';

import { PageHero } from '@/components/ui/PageHero';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { JsonLd } from '@/components/ui/JsonLd';
import { CareersForm } from '@/components/forms/CareersForm';

import { company } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'Careers | Commercial Painting Jobs in Dallas–Fort Worth',
  description:
    'Commercial painting careers with Childress Painting across Texas, Kansas, and Missouri. Field, supervision, estimating, and office roles.',
  path: '/careers',
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Careers', href: '/careers' },
];

const roleAreas = [
  {
    icon: HardHat,
    title: 'Field',
    body: 'Commercial painters and industrial coatings applicators. Spray experience, surface preparation knowledge, and lift certification all count.',
    examples: ['Commercial painter', 'Coatings applicator', 'Prep and blast crew'],
  },
  {
    icon: Wrench,
    title: 'Supervision',
    body: 'Foremen and superintendents who can run a crew, read a schedule, talk to a general contractor, and keep a job clean.',
    examples: ['Foreman', 'Lead painter', 'Superintendent'],
  },
  {
    icon: TrendingUp,
    title: 'Office',
    body: 'Estimating and project management — takeoff from drawings, scope letters, submittals, and keeping projects moving.',
    examples: ['Estimator', 'Project manager', 'Administrative'],
  },
];

const whatMatters = [
  {
    title: 'Preparation Over Speed',
    body: 'Anyone can move fast over a surface that was not ready. We are looking for people who understand that the preparation decides the result and are willing to say so when a substrate is not right.',
  },
  {
    title: 'Showing Up',
    body: 'Commercial schedules do not absorb a missing crew. Reliability is worth more here than raw speed, and it is the single thing that turns a good painter into a foreman.',
  },
  {
    title: 'Leaving It Clean',
    body: 'Occupied buildings, active plants, and schools mean somebody uses that space tonight. Protecting it and cleaning up is part of the work, not a favour.',
  },
  {
    title: 'Saying Something',
    body: 'If a condition is unsafe or a substrate is wrong, we want to hear about it at 8 a.m. — not in a punch walk three weeks later. Nobody here gets second-guessed for stopping work over a safety concern.',
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        label="Careers"
        title="Field Experience Counts Most."
        intro="We hire commercial painters, coatings applicators, foremen, estimators, and office staff. Applications stay open year-round and are reviewed as crews are built for upcoming work."
        crumbs={crumbs}
        meta={[
          { label: 'Base', value: 'Dallas–Fort Worth' },
          { label: 'Travel', value: 'Texas projects, by role' },
          { label: 'Applications', value: 'Open year-round' },
          { label: 'Resume', value: 'Not required for field roles' },
        ]}
      />

      <section className="bg-white py-20 md:py-24">
        <div className="container-site">
          <SectionHeading
            layout="split"
            label="Where People Work"
            title="Three Sides of the Same Business."
            intro={
              <p>
                We do not maintain a live list of vacancies on this page — postings go stale faster
                than they get updated. Send the form and tell us what you do; we contact people
                when the work matches.
              </p>
            }
          />

          <RevealGroup className="mt-10 md:mt-14 grid gap-px bg-line md:grid-cols-3">
            {roleAreas.map((area) => (
              <RevealItem
                key={area.title}
                className="group relative bg-white p-7 transition-colors hover:bg-mist lg:p-9"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 w-0 bg-red transition-all duration-500 group-hover:w-full"
                />
                <area.icon aria-hidden="true" className="size-5 text-red" />
                <h3 className="mt-5 text-[1.5rem] leading-tight text-ink lg:text-[1.75rem]">
                  {area.title}
                </h3>
                <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-body">{area.body}</p>
                <ul className="mt-6 border-t border-line pt-5">
                  {area.examples.map((example) => (
                    <li
                      key={example}
                      className="py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink/60"
                    >
                      {example}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-ink py-14 sm:py-20 md:py-24 lg:py-28">
        <div className="container-site">
          <SectionHeading
            layout="split"
            light
            label="What We Look For"
            title="Four Things, Ahead of Years on a Resume."
            intro={
              <p>
                Compensation, benefits, and specific requirements are discussed directly rather
                than advertised here — they vary by role, and we would rather have that
                conversation honestly than post a range we cannot hold to.
              </p>
            }
          />

          <RevealGroup className="mt-10 md:mt-14 grid gap-px bg-white/12 md:grid-cols-2">
            {whatMatters.map((item, i) => (
              <RevealItem key={item.title} className="bg-ink p-7 lg:p-9">
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-red">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-[1.375rem] leading-tight text-white lg:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3.5 text-[0.9375rem] leading-relaxed text-ash">
                  {item.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-mist py-16 md:py-20 lg:py-24">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-16">
            <div>
              <Reveal>
                <span className="title-block text-ink/60">Apply</span>
                <h2 className="mt-5 text-h2 text-ink">Tell Us What You Do.</h2>
                <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-body">
                  A resume helps for office roles but is not required for field work. Describing
                  the jobs you have worked, the systems you have sprayed, and the equipment you are
                  comfortable on tells us more.
                </p>
              </Reveal>

              <div className="mt-10">
                <CareersForm />
              </div>
            </div>

            <Reveal delay={0.08} className="lg:sticky lg:top-32 lg:self-start">
              <div className="border-t-4 border-red bg-white p-7">
                <div className="flex items-center gap-3">
                  <MapPin aria-hidden="true" className="size-4 shrink-0 text-red" />
                  <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-ink/60">Where the Work Is</h2>
                </div>
                <p className="mt-5 text-[0.9375rem] leading-relaxed text-body">
                  Most work is inside the Dallas–Fort Worth metroplex, with travel across Texas on
                  larger projects and multi-site programs. Field roles typically require reliable
                  transportation to the job site.
                </p>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-body">
                  Prefer to send a resume directly? Email{' '}
                  <a
                    href={`mailto:${company.careersEmail}`}
                    className="break-all font-medium text-red-dark underline underline-offset-2"
                  >
                    {company.careersEmail}
                  </a>
                  .
                </p>
                <p className="mt-6 border-t border-line pt-5 font-mono text-[0.5625rem] uppercase leading-relaxed tracking-[0.14em] text-ink/60">
                  {/* REPLACE — confirm the company's EEO statement with counsel. */}
                  Equal opportunity statement to be confirmed and added here before launch.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
