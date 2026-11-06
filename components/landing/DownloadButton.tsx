'use client';

/** Download Sayso button: the flat primary pill that opens the signup flow. */
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { Button } from '@/components/ui/Button';

interface DownloadButtonProps {
  analyticsId: string;
  label?: string;
}

export function DownloadButton({ analyticsId, label = 'Download Sayso' }: DownloadButtonProps) {
  const { openSignup } = useDemoCalendar();

  return (
    <Button withArrow onClick={openSignup} data-analytics-id={analyticsId}>
      {label}
    </Button>
  );
}
