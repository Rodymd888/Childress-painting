import { AlertTriangle } from 'lucide-react';

import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/ui/JsonLd';

import { company } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'Privacy Notice',
  description:
    'How Childress Painting collects, uses, and retains information submitted through this website.',
  path: '/privacy',
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Privacy', href: '/privacy' },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Privacy notice"
        intro="What this website collects, why, and what happens to it."
        crumbs={crumbs}
      />

      <section className="bg-white py-16 md:py-20 lg:py-24">
        <div className="container-site">
          <Reveal className="mb-12">
            <div className="flex flex-col gap-4 border-l-4 border-red bg-mist p-6 sm:flex-row sm:items-start sm:gap-5">
              <AlertTriangle aria-hidden="true" className="size-5 shrink-0 text-red" />
              <div>
                <h2 className="text-lg text-navy">Draft — requires legal review</h2>
                <p className="mt-2 max-w-3xl text-[0.9375rem] leading-relaxed text-body">
                  This notice is a starting point written to match how the website currently
                  works. It has not been reviewed by an attorney and does not yet reflect the
                  company&rsquo;s full data practices — including any CRM, analytics, email
                  platform, or applicant tracking system added after launch. Have Texas counsel
                  review it, and update this page whenever a new tool starts receiving visitor
                  data.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="prose-site max-w-3xl">
            <p className="text-[1.0625rem]">
              <strong className="font-semibold text-navy">Last updated:</strong> to be set on
              publication.
            </p>

            <h2>What we collect</h2>
            <p>
              We collect the information you type into the forms on this site — the bid request
              form, the contact form, the subcontractor prequalification form, and the careers
              form. Depending on the form, that includes your name, company, email address, phone
              number, project details, and any links or descriptions you choose to provide.
            </p>
            <p>
              Our servers also record standard technical information when a form is submitted,
              including the IP address the submission came from. This is used to apply rate
              limiting and reduce automated spam.
            </p>

            <h2>Why we collect it</h2>
            <p>
              To respond to you. Bid invitations go to estimating so we can confirm receipt and
              provide a bid or no-bid answer. Contact messages are routed to whoever can answer
              them. Subcontractor submissions are held so we can approach trade partners whose
              capabilities match upcoming work. Career applications are reviewed as crews are
              built.
            </p>
            <p>
              We do not sell your information, and we do not use it for unrelated marketing.
            </p>

            <h2>File uploads and links</h2>
            <p>
              This site does not accept direct file uploads. Where a form asks for plans, a W-9,
              a certificate of insurance, or a resume, it collects a link you provide to a
              document hosted elsewhere. Whatever you link to remains governed by the access
              controls of the service hosting it — check those settings before sharing a link.
            </p>

            <h2>Who sees it</h2>
            <p>
              Submissions are received by Childress Painting personnel. Where a third-party
              service is used to deliver, store, or manage submissions — for example an email
              provider or a customer relationship management system — that provider processes the
              information on our behalf under its own terms.
            </p>
            <p>
              {/* REPLACE — list the actual processors once they are selected. */}
              <em>
                Placeholder: name the specific email, CRM, hosting, and analytics providers in use
                once they are chosen.
              </em>
            </p>

            <h2>How long we keep it</h2>
            <p>
              Bid and project correspondence is retained as part of normal business records.
              Subcontractor and career submissions are retained so we can reach out when relevant
              work arises. You can ask us to delete your information at any time using the contact
              details below.
            </p>

            <h2>Cookies and analytics</h2>
            <p>
              {/* REPLACE — update once analytics or marketing tags are added. */}
              As currently built, this site does not set advertising or tracking cookies and does
              not run third-party analytics. Web fonts are loaded from Google Fonts, which means
              your browser makes a request to Google&rsquo;s servers when a page loads. If
              analytics, advertising pixels, or a chat widget are added later, this section must be
              updated and a cookie consent mechanism may be required.
            </p>

            <h2>Your choices</h2>
            <p>
              You can ask us what information we hold about you, ask us to correct it, or ask us
              to delete it. Depending on where you live, you may have additional rights under
              applicable law. Contact us and we will respond.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about this notice, or requests about your information, can be sent to{' '}
              <a href={`mailto:${company.email}`}>{company.email}</a> or by phone on{' '}
              <a href={`tel:${company.phoneHref}`}>{company.phone}</a>.
            </p>

            <h2>Changes</h2>
            <p>
              We update this notice when the website or our practices change. The date at the top
              of this page reflects the most recent revision.
            </p>
          </div>
        </div>
      </section>

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
