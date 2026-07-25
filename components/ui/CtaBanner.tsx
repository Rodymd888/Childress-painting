import { Phone, Mail } from 'lucide-react';
import { ButtonLink } from './Button';
import { Reveal } from './Reveal';
import { company } from '@/lib/site';

type Props = {
  label?: string;
  title?: string;
  body?: string;
  primary?: { href: string; text: string };
  secondary?: { href: string; text: string };
};

/**
 * Closing call to action. Appears at the bottom of every content page so a
 * bid invitation is always one click away.
 */
export function CtaBanner({
  label = 'Bid invitations',
  title = 'Put Childress on your next bid list.',
  body = 'Send the plans, the specification sections, and the due date. We confirm receipt and tell you whether we are bidding — so you are never left waiting on a no-bid.',
  primary = { href: '/request-bid', text: 'Request a bid' },
  secondary = { href: '/contact', text: 'Talk to estimating' },
}: Props) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="sheet-grid absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-red"
      />

      <div className="container-site relative py-20 md:py-24 lg:py-28">
        <Reveal className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-20">
          <div>
            <span className="title-block text-white/70">{label}</span>
            <h2 className="mt-5 max-w-3xl text-[clamp(2.25rem,5.4vw,4.25rem)]">{title}</h2>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-steel-light">
              {body}
            </p>
          </div>

          <div className="lg:pb-2">
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={primary.href} variant="primary" size="lg" withArrow>
                {primary.text}
              </ButtonLink>
              <ButtonLink href={secondary.href} variant="outlineLight" size="lg">
                {secondary.text}
              </ButtonLink>
            </div>

            <div className="mt-9 border-t border-white/15 pt-7">
              <div className="flex flex-col gap-3 font-mono text-xs uppercase tracking-[0.14em]">
                <a
                  href={`tel:${company.phoneHref}`}
                  className="flex items-center gap-3 text-white/75 transition-colors hover:text-white"
                >
                  <Phone aria-hidden="true" className="size-3.5 text-red" />
                  {company.phone}
                </a>
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-center gap-3 break-all text-white/75 transition-colors hover:text-white"
                >
                  <Mail aria-hidden="true" className="size-3.5 text-red" />
                  {company.email}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
