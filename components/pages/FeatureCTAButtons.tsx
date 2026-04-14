'use client';

import { LightningIcon } from '@/components/icons/LightningIcon';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';

export function FeatureCTAButtons() {
  const { openDemoCalendar, openSystemSelect } = useDemoCalendar();

  return (
    <div className="flex items-center gap-4 flex-wrap mb-8">
      <button
        onClick={openDemoCalendar}
        className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-transparent text-[#1D4871] font-bold text-sm border-2 border-[#1D4871] hover:bg-[#FFDE59]/20 transition-colors"
      >
        Book a Demo
      </button>
      <button
        onClick={openSystemSelect}
        className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#2367EE] text-white font-bold text-sm v4-hero-glow border-2 border-[#1D4871]"
      >
        <LightningIcon size={14} className="mr-1.5" />
        Download Sayso
      </button>
    </div>
  );
}
