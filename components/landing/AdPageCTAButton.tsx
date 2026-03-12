'use client';

import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { LightningIcon } from '@/components/icons/LightningIcon';

export function AdPageCTAButton() {
  const { openDemoCalendar } = useDemoCalendar();
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={openDemoCalendar}
        className="inline-flex items-center justify-center rounded-full bg-[#FFDE59] px-6 py-3 text-base font-semibold text-[#1D4871] border-2 border-[#1D4871]"
        style={{ boxShadow: '3px 3px 0px #1D4871' }}
      >
        <LightningIcon size={16} className="mr-2 flex-shrink-0" />
        Book a Demo
      </button>
    </div>
  );
}
