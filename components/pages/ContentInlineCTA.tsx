'use client';

import { LightningIcon } from '@/components/icons/LightningIcon';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';

interface ContentInlineCTAProps {
  location: string;
  headline?: string;
}

export function ContentInlineCTA({
  location,
  headline = 'See It in Action',
}: ContentInlineCTAProps) {
  const { openDemoCalendar, openSystemSelect } = useDemoCalendar();

  return (
    <div className="my-10 bg-[#FFDE59]/10 border-2 border-[#1D4871] rounded-2xl v2-comic-shadow-sm overflow-hidden">
      <div className="px-8 py-8 text-center">
        <h3 className="font-hero text-xl md:text-2xl text-[#1D4871] mb-5">
          {headline}
        </h3>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={openDemoCalendar}
            data-analytics-id={`cta-book-demo-${location}-inline`}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#2367EE] text-white font-bold text-sm v4-hero-glow border-2 border-[#1D4871]"
          >
            Book a Demo
          </button>
          <button
            onClick={openSystemSelect}
            data-analytics-id={`cta-download-${location}-inline`}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-transparent text-[#1D4871] font-bold text-sm border-2 border-[#1D4871] hover:bg-[#FFDE59]/20 transition-colors"
          >
            <LightningIcon size={14} className="mr-1.5" />
            Download Sayso
          </button>
        </div>
      </div>
    </div>
  );
}
