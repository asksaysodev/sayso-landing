'use client';

import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { LightningIcon } from '@/components/icons/LightningIcon';

export function DemoDownloadCTA() {
  const { openSystemSelect } = useDemoCalendar();

  return (
    <button
      onClick={openSystemSelect}
      data-analytics-id="cta-demo-download"
      className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#2367EE] text-white font-bold text-base md:text-lg v4-hero-glow border-2 border-[#1D4871] focus:outline-none focus:ring-2 focus:ring-[#2367EE] focus:ring-offset-2"
    >
      <LightningIcon size={16} className="mr-2" />
      Download Sayso
    </button>
  );
}
