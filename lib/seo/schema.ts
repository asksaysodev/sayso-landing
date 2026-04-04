import { siteUrl } from '@/lib/config';

/**
 * Shared Sayso Organization publisher block for JSON-LD schemas.
 */
export const SAYSO_PUBLISHER = {
  '@type': 'Organization' as const,
  name: 'Sayso',
  logo: {
    '@type': 'ImageObject' as const,
    url: `${siteUrl}/logo-pos-horizontal.png`,
  },
};

/**
 * BreadcrumbList JSON-LD — generic for all pages.
 */
export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}

/**
 * FAQPage JSON-LD — for objection pages with Q&A pairs.
 */
export function generateFAQPageJsonLd(
  items: { question: string; answer: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * HowTo JSON-LD — for response frameworks on objection/script pages.
 */
export function generateHowToJsonLd(
  name: string,
  steps: { name: string; text: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

/**
 * SoftwareApplication JSON-LD — for feature and integration pages.
 */
export function generateSoftwareAppJsonLd(options?: {
  featureList?: string[];
  offers?: { price: string; priceCurrency: string };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Sayso',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, macOS, Windows',
    url: siteUrl,
    publisher: SAYSO_PUBLISHER,
    ...(options?.featureList && { featureList: options.featureList.join(', ') }),
    ...(options?.offers && {
      offers: {
        '@type': 'Offer',
        price: options.offers.price,
        priceCurrency: options.offers.priceCurrency,
      },
    }),
  };
}

/**
 * DefinedTerm JSON-LD — for glossary pages.
 */
export function generateDefinedTermJsonLd(
  name: string,
  description: string,
  url: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name,
    description,
    url: `${siteUrl}${url}`,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Sayso Real Estate Glossary',
      url: `${siteUrl}/glossary`,
    },
  };
}

/**
 * WebPage JSON-LD — generic fallback for comparison/use-case pages.
 */
export function generateWebPageJsonLd(
  name: string,
  description: string,
  url: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: `${siteUrl}${url}`,
    publisher: SAYSO_PUBLISHER,
  };
}
