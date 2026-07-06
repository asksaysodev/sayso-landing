'use client';

import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';

/**
 * BookDemoCTA
 * The hero call to action on the /subscribed confirmation page. Renders a
 * short "learn more" line and a "Book a Demo" button that opens the shared
 * Calendly popup. Kept as a client component because the button relies on the
 * useDemoCalendar() context hook.
 */
export default function BookDemoCTA() {
  const { openDemoCalendar } = useDemoCalendar();

  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      <p className="text-base md:text-lg text-[#1D4871]/75 leading-relaxed">
        Want to learn more about Sayso? See it live on a real call.
      </p>
      <button
        type="button"
        onClick={openDemoCalendar}
        data-analytics-id="cta-book-demo-subscribed"
        className="inline-flex items-center justify-center rounded-full bg-[#2367EE] px-6 py-3 text-base font-semibold text-white border-2 border-[#1D4871] hover:bg-[#1b56cc] transition-colors"
        style={{ boxShadow: '3px 3px 0px #1D4871' }}
      >
        Book a Demo
      </button>
    </div>
  );
}
