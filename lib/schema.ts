/**
 * STRUCTURED DATA (JSON-LD)
 * ---------------------------------------------------------------------------
 * Deliberately conservative: Organization, ProfessionalService, Service,
 * BreadcrumbList, and FAQPage only.
 *
 * No aggregateRating, no review markup, and no award or certification claims.
 * Those require verified data and Google penalises self-serving review markup.
 */

import { company, siteUrl, serviceAreas } from './site';
import type { Service } from './services';

const orgId = `${siteUrl}/#organization`;

export function organizationSchema() {
  const sameAs = Object.values(company.social).filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': orgId,
    name: company.name,
    legalName: company.legalName,
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    description: company.tagline,
    telephone: company.phone,
    email: company.email,
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function professionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteUrl}/#business`,
    name: company.name,
    url: siteUrl,
    image: `${siteUrl}/opengraph-image`,
    description:
      'Commercial painting contractor and industrial coatings applicator serving Dallas–Fort Worth and Texas.',
    telephone: company.phone,
    email: company.email,
    priceRange: '$$',
    parentOrganization: { '@id': orgId },
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressRegion: company.address.region,
      postalCode: company.address.postalCode,
      addressCountry: company.address.country,
    },
    openingHours: company.hours,
    areaServed: serviceAreas.flatMap((area) =>
      area.cities.map((city) => ({
        '@type': 'City',
        name: city,
        containedInPlace: { '@type': 'State', name: 'Texas' },
      })),
    ),
    knowsAbout: [
      'Commercial painting',
      'Industrial coatings',
      'New construction painting',
      'Facility repaint programs',
    ],
  };
}

export function serviceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.title,
    description: service.summary,
    url: `${siteUrl}/services/${service.slug}`,
    provider: { '@id': orgId },
    areaServed: { '@type': 'State', name: 'Texas' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.title} scope`,
      itemListElement: service.scope.map((item) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: item },
      })),
    },
  };
}

export function breadcrumbSchema(trail: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.href === '/' ? '' : item.href}`,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: company.name,
    publisher: { '@id': orgId },
  };
}
