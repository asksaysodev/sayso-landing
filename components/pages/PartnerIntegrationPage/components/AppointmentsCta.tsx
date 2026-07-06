/**
 * AppointmentsCta
 *
 * Dark comic CTA band ("book 2x more appointments") that leads directly into
 * the demo form below it. The button scrolls to the #demo-form anchor.
 */
import type { PartnerIntegrationEntry } from '@/lib/content/partner-integrations/types';

interface AppointmentsCtaProps {
  entry: PartnerIntegrationEntry;
}

export function AppointmentsCta({ entry }: AppointmentsCtaProps) {
  return (
    <section className="max-w-[1200px] mx-auto px-6 pt-16 md:pt-20">
      <div className="bg-[#1D4871] border-2 border-[#1D4871] rounded-2xl v2-comic-shadow overflow-hidden relative">
        <div className="v2-starburst absolute inset-0 pointer-events-none" aria-hidden />
        <div className="relative px-8 py-12 md:py-14 text-center">
          <h2 className="font-comic text-3xl md:text-4xl text-white tracking-wide mb-4">
            {entry.appointmentsCtaHeadline}
          </h2>
          <p className="text-base text-white/75 max-w-xl mx-auto mb-8 font-sans">
            {entry.appointmentsCtaSubheading}
          </p>
          <a
            href="#demo-form"
            data-analytics-id={`partner-appointments-cta-${entry.slug}`}
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#FFDE59] text-[#1D4871] font-bold text-base border-2 border-[#FFDE59] hover:bg-[#FFDE59]/90 transition-colors"
          >
            {entry.appointmentsCtaButton}
          </a>
        </div>
      </div>
    </section>
  );
}
