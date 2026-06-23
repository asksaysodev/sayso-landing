/**
 * PartnerHero
 *
 * Top of the partner integration page: paired Sayso + partner logos, an
 * "Integrations" eyebrow, the H1 promise, supporting copy, and a CTA that
 * scrolls down to the demo form. Modeled on partner co-marketing hero layouts.
 */
import Image from 'next/image';
import type { PartnerIntegrationEntry } from '@/lib/content/partner-integrations/types';

interface PartnerHeroProps {
  entry: PartnerIntegrationEntry;
}

export function PartnerHero({ entry }: PartnerHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="v2-halftone absolute inset-0 pointer-events-none" aria-hidden />
      <div className="relative max-w-[900px] mx-auto px-6 pt-12 pb-10 md:pt-16 md:pb-14 text-center">
        {/* Paired logos */}
        <div className="flex items-center justify-center gap-4 md:gap-6 mb-8">
          <Image
            src="/logos/logo-pos-horizontal.png"
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
        <h1 className="font-hero text-3xl sm:text-4xl md:text-5xl text-[#1D4871] leading-[1.12] tracking-tight max-w-3xl mx-auto">
          {entry.h1}
        </h1>

        {/* Supporting copy */}
        <p className="mt-6 text-base md:text-lg text-[#1D4871]/75 leading-relaxed max-w-2xl mx-auto font-sans">
          {entry.h2}
        </p>

        {/* CTA */}
        <div className="mt-9">
          <a
            href="#demo-form"
            data-analytics-id={`partner-hero-cta-${entry.slug}`}
            className="inline-flex items-center justify-center rounded-full bg-[#2367EE] text-white font-bold text-base px-8 py-3.5 v2-comic-shadow-blue border-2 border-[#1D4871] transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0"
          >
            {entry.heroCtaText}
          </a>
        </div>
      </div>
    </section>
  );
}
