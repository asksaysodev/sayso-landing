/**
 * ValuePropsSection
 *
 * The "3 boxes" block: a section heading plus three value-prop cards.
 * Content is driven by the partner entry so each page can tune its messaging.
 */
import { panel, section, wash } from '@/components/landing/HomeShared/styles';
import type { PartnerIntegrationEntry } from '@/lib/content/partner-integrations/types';

interface ValuePropsSectionProps {
  entry: PartnerIntegrationEntry;
}

export function ValuePropsSection({ entry }: ValuePropsSectionProps) {
  return (
    <section className={`${wash} ${section}`}>
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-balance font-hero font-extrabold text-[clamp(30px,4.5vw,46px)] leading-[1.1] tracking-[-0.03em] text-[#10233A] mb-4">
            {entry.valuePropsHeading}
          </h2>
          <p className="text-base md:text-lg text-[#556B86] leading-relaxed font-sans">
            {entry.valuePropsSubheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {entry.valueProps.map((prop, index) => (
            <div
              key={prop.title}
              className={`${panel} p-6 md:p-7`}
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#FFDE59] text-[#1D4871] font-comic text-lg mb-4">
                {index + 1}
              </span>
              <h3 className="font-hero font-bold text-lg md:text-xl text-[#10233A] mb-2 leading-snug">
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
