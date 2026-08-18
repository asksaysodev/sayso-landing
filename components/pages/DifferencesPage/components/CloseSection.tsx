'use client';

/**
 * Closing CTA band: one line, the standard demo/download button pair, and
 * a short social-proof note underneath.
 */

import { LightningIcon } from '@/components/icons/LightningIcon';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';

export function CloseSection() {
  const { openDemoCalendar, openSystemSelect } = useDemoCalendar();

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <h2 className="font-comic text-3xl md:text-4xl lg:text-5xl text-[#1D4871] tracking-wide">
          The next call is the one that counts.
        </h2>
        <div className="mt-9 flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={openDemoCalendar}
            data-analytics-id="cta-book-demo-differences-close"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#2367EE] text-white font-bold text-base border-2 border-[#1D4871] v2-comic-btn"
            style={{ boxShadow: '3px 3px 0px #1D4871' }}
          >
            Book a Demo
          </button>
          <button
            onClick={openSystemSelect}
            data-analytics-id="cta-download-differences-close"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#FFDE59] text-[#1D4871] font-bold text-base border-2 border-[#1D4871] v2-comic-btn"
            style={{ boxShadow: '3px 3px 0px #1D4871' }}
          >
            <LightningIcon size={14} className="mr-1.5" />
            Download Sayso
          </button>
        </div>
        <p className="mt-8 text-sm font-bold tracking-wide uppercase text-[#9AA5B1]">
          Used by RealTrends ranked teams every day
        </p>
      </div>
    </section>
  );
}
