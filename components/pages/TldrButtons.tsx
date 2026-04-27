'use client';

import { LightningIcon } from '@/components/icons/LightningIcon';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';

export function TldrButtons() {
  const { openDemoCalendar, openSystemSelect } = useDemoCalendar();

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <button
        onClick={openDemoCalendar}
        data-analytics-id="cta-book-demo-comparison-page-tldr"
        className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-transparent text-[#1D4871] font-bold text-sm border-2 border-[#1D4871] hover:bg-[#FFDE59]/20 transition-colors"
      >
        Book a Demo
      </button>
      <button
        onClick={openSystemSelect}
        data-analytics-id="cta-download-comparison-page-tldr"
        className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-[#2367EE] text-white font-bold text-sm border-2 border-[#1D4871] v4-hero-glow"
      >
        <LightningIcon size={14} className="mr-1.5" />
        Download Sayso
      </button>
    </div>
  );
}
