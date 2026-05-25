/**
 * FounderPricingSection composes the /founderpricing page.
 *
 * Stacks six panels with consistent vertical spacing:
 *   1. Hero with "Sayso for Teams" badge and intro
 *   2. PricingModelPanel explaining team-wide pricing + Founder Pricing
 *   3. HoursCaseStudy showing what an hour means with two stat cards
 *   4. IncludedProducts listing Cue, Smart Capture, Pulse, Playbook
 *   5. PricingCalculator with slider + tier band selector
 *   6. LaunchComparison contrasting now vs at public launch
 *   7. CtaBlock to book a call
 *
 * Per-tier prices and the calls-per-hour ratio live in ./data.ts.
 */

import { Hero } from './components/Hero';
import { PricingModelPanel } from './components/PricingModelPanel';
import { HoursCaseStudy } from './components/HoursCaseStudy';
import { IncludedProducts } from './components/IncludedProducts';
import { PricingCalculator } from './components/PricingCalculator';
import { LaunchComparison } from './components/LaunchComparison';
import { CtaBlock } from './components/CtaBlock';

export function FounderPricingSection() {
  return (
    <section className="bg-[#F4F4F5] py-10 md:py-16 v2-halftone relative">
      <div className="max-w-[1000px] mx-auto px-5 md:px-6 relative z-10 flex flex-col gap-9 md:gap-12">
        <Hero />
        <PricingModelPanel />
        <HoursCaseStudy />
        <IncludedProducts />
        <PricingCalculator />
        <LaunchComparison />
        <CtaBlock />
        <p className="text-center text-xs text-[#1D4871]/60 mt-2">
          Founder Pricing shown is current as of May 2026 and changes at public launch.
        </p>
      </div>
    </section>
  );
}
