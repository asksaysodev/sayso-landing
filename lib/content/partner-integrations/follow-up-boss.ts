import type { PartnerIntegrationEntry } from './types';

/**
 * Sayso + Follow Up Boss partner integration page.
 *
 * Mirrors the SureSend page structure so every partner page stays consistent.
 * Copy is based on Kuvy's brief with Follow Up Boss as the CRM partner; the
 * demo form at the bottom uses Sayso's existing Sure Send request-demo form.
 */
export const followUpBoss: PartnerIntegrationEntry = {
  slug: 'follow-up-boss',
  partnerName: 'Follow Up Boss',
  partnerLogo: '/integrations/follow-up-boss-logo.png',
  partnerLogoAlt: 'Follow Up Boss logo',

  seoTitle: 'Sayso + Follow Up Boss Integration | Real-Time Coaching',
  seoDescription:
    'Sayso integrates with Follow Up Boss to coach agents live on every call: real-time conversation intelligence, automatic notes, and more booked appointments.',

  eyebrow: 'Integrations',
  h1: 'Keep your agents from losing opportunities with real-time conversation intelligence',
  h2: "Sayso's integration with Follow Up Boss changes the way agent performance is managed. Let Sayso coach your agents live, in real time, while you focus on the high-level patterns in your business.",
  heroCtaText: 'See how it works',

  valuePropsHeading: 'Imagine if every agent sounded like your best, all the time',
  valuePropsSubheading:
    'With real-time prompts, scripts on demand, automatic notes, and live market data, every agent gets the support they need to handle each conversation the way your top producer would.',
  valueProps: [
    {
      title: 'Real-time conversation intelligence',
      body: 'Real-time prompts, scripts on demand, automatic notes, and live market data surface the moment an agent needs them, so every conversation gets handled the way your best agent would handle it.',
    },
    {
      title: 'Better coaching conversations',
      body: 'Instead of coaching every little detail, Sayso handles that in the moment for you. You get to focus on the higher-leverage, GCI-producing activity that actually grows the business.',
    },
    {
      title: 'More production, less revolving door',
      body: 'Create more business from the leads you already paid thousands for. Instead of agents chasing new leads, Sayso helps them convert the ones they already have.',
    },
  ],

  appointmentsCtaHeadline: 'See how Sayso can help you book 2x more appointments',
  appointmentsCtaSubheading:
    'Tell us a little about your team and we will show you exactly how Sayso works alongside Follow Up Boss on a live call.',
  appointmentsCtaButton: 'Request a demo',

  demoFormEmbedCode: 'LmIZLgSzGPfy',
  demoFormHeading: 'Request your demo',
  demoFormSubheading:
    'Fill out the form and the Sayso team will reach out to schedule a walkthrough.',

  showTestimonials: true,
};
