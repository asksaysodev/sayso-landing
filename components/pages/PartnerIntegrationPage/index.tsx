/**
 * PartnerIntegrationPage
 *
 * Conversion-focused "Sayso + {Partner}" landing page (separate from the SEO
 * content pages under /integrations/[slug]). Composition only: it stitches
 * together the hero, logo carousel, value props, optional testimonials, the
 * appointments CTA, and the demo form. Section content is driven by the
 * PartnerIntegrationEntry passed in.
 */
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import type { PartnerIntegrationEntry } from '@/lib/content/partner-integrations/types';
import { PartnerHero } from './components/PartnerHero';
import { PartnerLogoCarousel } from './components/PartnerLogoCarousel';
import { ValuePropsSection } from './components/ValuePropsSection';
import { AppointmentsCta } from './components/AppointmentsCta';
import { DemoFormSection } from './components/DemoFormSection';

interface PartnerIntegrationPageProps {
  entry: PartnerIntegrationEntry;
}

export function PartnerIntegrationPage({ entry }: PartnerIntegrationPageProps) {
  return (
    <>
      <PartnerHero entry={entry} />
      <PartnerLogoCarousel />
      <ValuePropsSection entry={entry} />
      {entry.showTestimonials && <TestimonialsSection />}
      <AppointmentsCta entry={entry} />
      <DemoFormSection entry={entry} />
    </>
  );
}
