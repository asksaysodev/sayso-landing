/**
 * PartnerIntegrationEntry
 *
 * Content model for the conversion-focused "Sayso + {Partner}" integration
 * landing pages (modeled on partner co-marketing pages like fello.ai/integrations/sierra).
 * These are marketing pages built for demo conversion; each partner page lives
 * at /integrations/partners/[slug].
 */
export interface PartnerIntegrationEntry {
  /** URL slug, e.g. "suresend" -> /integrations/partners/suresend */
  slug: string;
  /** Display name of the partner CRM, e.g. "SureSend" */
  partnerName: string;
  /** Public path to the partner's horizontal logo (works on a light background). */
  partnerLogo: string;
  partnerLogoAlt: string;

  // SEO
  seoTitle: string;
  seoDescription: string;

  // Hero
  /** Small uppercase label above the H1, e.g. "Integrations". */
  eyebrow: string;
  h1: string;
  /** Supporting paragraph under the H1. */
  h2: string;
  /** Hero button label; scrolls to the demo form section. */
  heroCtaText: string;

  // Value props (the "3 boxes" section)
  valuePropsHeading: string;
  valuePropsSubheading: string;
  valueProps: { title: string; body: string }[];

  // Appointments CTA band that leads into the demo form
  appointmentsCtaHeadline: string;
  appointmentsCtaSubheading: string;
  appointmentsCtaButton: string;

  // Demo form
  /** Sure Send form embed code (see components/landing/SsFormEmbed). */
  demoFormEmbedCode: string;
  demoFormHeading: string;
  demoFormSubheading: string;

  /** Toggle the testimonial carousel on/off for this partner. */
  showTestimonials?: boolean;

  ogImage?: string;
}
