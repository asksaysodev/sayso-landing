'use client';

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
      <Button onClick={openDemoCalendar}>
        Book a Demo
      </Button>
      <Button href="/" variant="secondary">
        <span aria-hidden="true">
          ←
        </span>
        Back to Home
      </Button>
    </div>
  );
}
