'use client';

/**
 * Get Sayso and Book a demo buttons for the product and solution pages.
 * Analytics ids default to the product page hero; other placements pass their own.
 * `primary` picks which one is the filled blue button (and comes first); team-focused pages pass 'demo'.
 */
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { Button } from '@/components/ui/Button';

interface FeatureCTAButtonsProps {
  downloadAnalyticsId?: string;
  demoAnalyticsId?: string;
  primary?: 'download' | 'demo';
  className?: string;
}

export function FeatureCTAButtons({
  downloadAnalyticsId = 'cta-download-feature-page-inline',
  demoAnalyticsId = 'cta-book-demo-feature-page-inline',
  primary = 'download',
  className = '',
}: FeatureCTAButtonsProps) {
  const { openDemoCalendar, openSignup } = useDemoCalendar();

  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-2.5 ${className}`}>
      {primary === 'demo' ? (
        <>
          <Button onClick={openDemoCalendar} data-analytics-id={demoAnalyticsId}>
            Book a demo
          </Button>
          <Button variant="secondary" onClick={openSignup} data-analytics-id={downloadAnalyticsId}>
            Get Sayso
          </Button>
        </>
      ) : (
        <>
          <Button onClick={openSignup} data-analytics-id={downloadAnalyticsId}>
            Get Sayso
          </Button>
          <Button variant="secondary" onClick={openDemoCalendar} data-analytics-id={demoAnalyticsId}>
            Book a demo
          </Button>
        </>
      )}
    </div>
  );
}
