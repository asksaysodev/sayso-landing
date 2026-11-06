'use client';

import { Button } from '@/components/ui/Button';
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
        Want to learn more about Sayso?
      </p>
      <Button onClick={openDemoCalendar} data-analytics-id="cta-book-demo-subscribed" withArrow>
        Book a Demo
      </Button>
    </div>
  );
}
