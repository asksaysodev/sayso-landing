/**
 * AppointmentsCta
 *
 * Navy CTA band ("book 2x more appointments") that leads directly into
 * the demo form below it. The button scrolls to the #demo-form anchor.
 */
import { panelShadow } from '@/components/landing/HomeShared/styles';
import type { PartnerIntegrationEntry } from '@/lib/content/partner-integrations/types';

interface AppointmentsCtaProps {
  entry: PartnerIntegrationEntry;
}

export function AppointmentsCta({ entry }: AppointmentsCtaProps) {
  return (
    <section className="max-w-[1160px] mx-auto px-4 sm:px-6 pt-16 md:pt-20">
      <div className={`bg-[#1D4871] rounded-[20px] ${panelShadow} overflow-hidden`}>
        <div className="px-6 py-12 sm:px-8 md:py-14 text-center">
          <h2 className="text-balance font-hero font-extrabold text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-0.03em] text-white mb-4">
            {entry.appointmentsCtaHeadline}
          </h2>
          <p className="text-base text-white/85 max-w-xl mx-auto mb-8 font-sans">
            {entry.appointmentsCtaSubheading}
          </p>
          <a
            href="#demo-form"
            data-analytics-id={`partner-appointments-cta-${entry.slug}`}
            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-[15px] font-semibold text-[#10233A] transition duration-150 hover:-translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1D4871]"
          >
            {entry.appointmentsCtaButton}
          </a>
        </div>
      </div>
    </section>
  );
}
