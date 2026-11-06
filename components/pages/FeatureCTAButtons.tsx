'use client';

/**
 * Download Sayso and Book a demo buttons for the product and solution pages.
 * Analytics ids default to the product page hero; other placements pass their own.
 */
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { Button } from '@/components/ui/Button';

interface FeatureCTAButtonsProps {
  downloadAnalyticsId?: string;
  demoAnalyticsId?: string;
  className?: string;
}

export function FeatureCTAButtons({
  downloadAnalyticsId = 'cta-download-feature-page-inline',
  demoAnalyticsId = 'cta-book-demo-feature-page-inline',
  className = '',
}: FeatureCTAButtonsProps) {
  const { openDemoCalendar, openSignup } = useDemoCalendar();

  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-2.5 ${className}`}>
      <Button withArrow onClick={openSignup} data-analytics-id={downloadAnalyticsId}>
        Download Sayso
      </Button>
      <Button variant="secondary" onClick={openDemoCalendar} data-analytics-id={demoAnalyticsId}>
        Book a demo
      </Button>
    </div>
  );
}
