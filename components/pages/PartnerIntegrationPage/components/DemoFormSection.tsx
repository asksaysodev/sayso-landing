/**
 * DemoFormSection
 *
 * The conversion endpoint of the page: the Sure Send request-demo form embed.
 * Carries the #demo-form anchor that the hero and CTA buttons scroll to.
 */
import SsFormEmbed from '@/components/landing/SsFormEmbed';
import { panel } from '@/components/landing/HomeShared/styles';
import type { PartnerIntegrationEntry } from '@/lib/content/partner-integrations/types';

interface DemoFormSectionProps {
  entry: PartnerIntegrationEntry;
}

export function DemoFormSection({ entry }: DemoFormSectionProps) {
  return (
    <section id="demo-form" className="scroll-mt-24 max-w-[1160px] mx-auto px-4 sm:px-6 py-16 md:py-20">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-balance font-hero font-extrabold text-[clamp(30px,4.5vw,46px)] leading-[1.1] tracking-[-0.03em] text-[#10233A] mb-3">
          {entry.demoFormHeading}
        </h2>
        <p className="text-base md:text-lg text-[#556B86] leading-relaxed font-sans">
          {entry.demoFormSubheading}
        </p>
      </div>

      <div className={`${panel} max-w-[680px] mx-auto overflow-hidden`}>
        <SsFormEmbed embedCode={entry.demoFormEmbedCode} />
      </div>
    </section>
  );
}
