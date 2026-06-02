'use client';

import Link from 'next/link';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';

/**
 * ConfirmationActions
 * The two side-by-side calls to action on the newsletter confirmation page:
 * a primary "Book a Demo" button that opens the shared calendar modal, and a
 * secondary "Back to Home" link. Kept as a client component because the demo
 * button relies on the useDemoCalendar() context hook.
 */
export default function ConfirmationActions() {
  const { openDemoCalendar } = useDemoCalendar();

  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
      <button
        type="button"
        onClick={openDemoCalendar}
        className="inline-flex items-center justify-center rounded-full bg-[#2367EE] px-6 py-3 text-base font-semibold text-white border-2 border-[#1D4871] hover:bg-[#1b56cc] transition-colors"
        style={{ boxShadow: '3px 3px 0px #1D4871' }}
      >
        Book a Demo
      </button>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-[#1D4871] border-2 border-[#1D4871] hover:bg-[#F4F4F5] transition-colors"
        style={{ boxShadow: '3px 3px 0px #1D4871' }}
      >
        <span aria-hidden="true" className="mr-2">
          ←
        </span>
        Back to Home
      </Link>
    </div>
  );
}
