import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';
import { primaryNav } from '@/lib/site';

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="sheet-grid absolute inset-0" aria-hidden="true" />

      <div className="container-site relative py-32 md:py-40 lg:py-48">
        <span className="title-block text-white/70">Error 404</span>

        <h1 className="mt-6 max-w-3xl text-[clamp(2.5rem,7vw,5rem)]">That Page Is Not on the Drawing Set.</h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ash">
          The link may be out of date, or the page may have moved. Everything below is current.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/" variant="primary" size="lg" withArrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/request-bid" variant="outlineLight" size="lg">
            Request a bid
          </ButtonLink>
        </div>

        <nav aria-label="Site sections" className="mt-16 border-t border-white/15 pt-8">
          <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-white/60">Main Sections</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center border border-white/25 px-5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
