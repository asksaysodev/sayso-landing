/**
 * ValuePropsSection
 *
 * The "3 boxes" block: a comic-styled heading plus three value-prop cards.
 * Content is driven by the partner entry so each page can tune its messaging.
 */
import type { PartnerIntegrationEntry } from '@/lib/content/partner-integrations/types';

interface ValuePropsSectionProps {
  entry: PartnerIntegrationEntry;
}

export function ValuePropsSection({ entry }: ValuePropsSectionProps) {
  return (
    <section className="bg-[#D7DEE1]/40">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-comic text-3xl md:text-4xl text-[#1D4871] tracking-wide mb-4">
            {entry.valuePropsHeading}
          </h2>
          <p className="text-base md:text-lg text-[#1D4871]/70 leading-relaxed font-sans">
            {entry.valuePropsSubheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {entry.valueProps.map((prop, index) => (
            <div
              key={prop.title}
              className="bg-white rounded-2xl p-6 md:p-7 v2-comic-border v2-comic-shadow"
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#FFDE59] text-[#1D4871] font-comic text-lg border-2 border-[#1D4871] mb-4">
                {index + 1}
              </span>
              <h3 className="font-hero text-lg md:text-xl text-[#1D4871] mb-2 leading-snug">
                {prop.title}
              </h3>
              <p className="text-[#1D4871]/70 text-sm md:text-base leading-relaxed font-sans">
                {prop.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
