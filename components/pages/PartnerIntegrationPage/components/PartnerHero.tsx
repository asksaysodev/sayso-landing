/**
 * PartnerHero
 *
 * Top of the partner integration page: paired Sayso + partner logos, an
 * "Integrations" eyebrow, the H1 promise, supporting copy, a CTA that
 * scrolls down to the demo form, and the Sayso widget with Smart Capture
 * notes. Modeled on partner co-marketing hero layouts.
 */
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { WidgetFigure } from '@/components/pages/WidgetFigure';
import type { PartnerIntegrationEntry } from '@/lib/content/partner-integrations/types';

interface PartnerHeroProps {
  entry: PartnerIntegrationEntry;
}

export function PartnerHero({ entry }: PartnerHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="relative max-w-[900px] mx-auto px-6 pt-[68px] pb-10 md:pb-14 text-center">
        {/* Paired logos */}
        <div className="flex items-center justify-center gap-4 md:gap-6 mb-8">
          <Image
            src="/logos/logo-pos-transparent-horizontal.png"
            alt="Sayso"
            width={140}
            height={48}
            className="h-8 md:h-9 w-auto"
            priority
          />
          <span className="text-[#1D4871]/30 text-2xl md:text-3xl font-light">+</span>
          <Image
            src={entry.partnerLogo}
            alt={entry.partnerLogoAlt}
            width={180}
            height={48}
            className="h-7 md:h-8 w-auto"
            priority
          />
        </div>

        {/* Eyebrow */}
        <span className="inline-block text-xs md:text-sm font-bold tracking-widest uppercase text-[#2367EE] mb-4">
          {entry.eyebrow}
        </span>

        {/* H1 */}
        <h1 className="font-hero font-extrabold text-[34px] sm:text-4xl md:text-5xl text-[#10233A] leading-[1.1] tracking-[-0.03em] max-w-3xl mx-auto">
          {entry.h1}
        </h1>

        {/* Supporting copy */}
        <p className="mt-6 text-base md:text-lg text-[#556B86] leading-relaxed max-w-2xl mx-auto font-sans">
          {entry.h2}
        </p>

        {/* CTA */}
        <div className="mt-9">
          <Button href="#demo-form" data-analytics-id={`partner-hero-cta-${entry.slug}`}>
            {entry.heroCtaText}
          </Button>
        </div>
      </div>
      <WidgetFigure
        preset="notes"
        label="The Sayso widget during a call, with Smart Capture notes ready to copy into your CRM"
        caption="Sample call with Smart Capture notes."
        className="mx-auto w-full max-w-[880px] px-4 pb-6 sm:px-6"
      />
    </section>
  );
}
