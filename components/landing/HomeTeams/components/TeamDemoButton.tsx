'use client';

/** Book a demo button for the teams section. Opens the same Calendly pop-up as HomeTopStrip. */
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { Button } from '@/components/ui/Button';

export function TeamDemoButton({ analyticsId }: { analyticsId: string }) {
  const { openDemoCalendar } = useDemoCalendar();

  return (
    <Button onClick={openDemoCalendar} data-analytics-id={analyticsId}>
      Book a demo
    </Button>
  );
}
