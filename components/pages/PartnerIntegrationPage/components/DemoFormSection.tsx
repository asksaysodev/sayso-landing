/**
 * DemoFormSection
 *
 * The conversion endpoint of the page: the Sure Send request-demo form embed.
 * Carries the #demo-form anchor that the hero and CTA buttons scroll to.
 */
import SsFormEmbed from '@/components/landing/SsFormEmbed';
import type { PartnerIntegrationEntry } from '@/lib/content/partner-integrations/types';

interface DemoFormSectionProps {
  entry: PartnerIntegrationEntry;
}

export function DemoFormSection({ entry }: DemoFormSectionProps) {
  return (
    <section id="demo-form" className="scroll-mt-24 max-w-[1200px] mx-auto px-6 py-16 md:py-20">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="font-comic text-3xl md:text-4xl text-[#1D4871] tracking-wide mb-3">
          {entry.demoFormHeading}
        </h2>
        <p className="text-base md:text-lg text-[#1D4871]/70 leading-relaxed font-sans">
          {entry.demoFormSubheading}
        </p>
      </div>

      <div className="max-w-[680px] mx-auto rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-lg">
        <SsFormEmbed embedCode={entry.demoFormEmbedCode} />
      </div>
    </section>
  );
}
