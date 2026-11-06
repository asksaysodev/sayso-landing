'use client';

/** Get Sayso and Book a demo buttons for the closing call to action. */
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { Button } from '@/components/ui/Button';

export function FinalCtaButtons() {
  const { openDemoCalendar, openSignup } = useDemoCalendar();
  return (
    <div className="mt-[30px] flex flex-wrap justify-center gap-x-3 gap-y-2.5">
      <Button onClick={openSignup} data-analytics-id="cta-download-final-cta">
        Get Sayso
      </Button>
      <Button variant="secondary" onClick={openDemoCalendar} data-analytics-id="cta-book-demo-final-cta">
        Book a demo
      </Button>
    </div>
  );
}
