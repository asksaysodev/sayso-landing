/**
 * Homepage body, composed from the sections under ./components.
 * Navigation and footer stay shared and are rendered by app/page.tsx.
 */

import { ClosingCta } from './components/ClosingCta';
import { FeaturesSection } from './components/FeaturesSection';
import { HomepageHero } from './components/HomepageHero';
import { LogoGrid } from './components/LogoGrid';
import { PainPointsSection } from './components/PainPointsSection';
import { RolePicker } from './components/RolePicker';
import { Section } from './components/Section';
import { StepsSection } from './components/StepsSection';
import { TestimonialCards } from './components/TestimonialCards';

export function Homepage() {
  return (
    <main className="font-hero font-medium text-[#0D1B2A]">
      <HomepageHero />
      <LogoGrid />
      <Section
        id="what-is-sayso"
        title="Real-Time Guidance Built for Real Estate"
        lead="The hard part of prospecting is remembering what a good conversation sounds like in the moment. Post-call regret can feel paralyzing."
        alt
      />
      <PainPointsSection />
      <FeaturesSection />
      <StepsSection />
      <TestimonialCards />
      <Section id="who" title="Is Sayso for You?">
        <RolePicker />
      </Section>
      <ClosingCta />
    </main>
  );
}
