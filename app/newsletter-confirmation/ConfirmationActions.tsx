'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
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
      <Button onClick={openDemoCalendar} withArrow>
        Book a Demo
      </Button>
      <Link
        href="/"
        className="inline-flex h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-6 text-[15px] font-semibold transition duration-150 hover:-translate-y-px active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2 bg-white text-[#10233A] shadow-[0_0_0_1px_rgba(16,35,58,0.12),0_1px_2px_rgba(16,35,58,0.06)] hover:shadow-[0_0_0_1px_rgba(16,35,58,0.22),0_4px_12px_-4px_rgba(16,35,58,0.15)]"
      >
        <span aria-hidden="true">
          ←
        </span>
        Back to Home
      </Link>
    </div>
  );
}
