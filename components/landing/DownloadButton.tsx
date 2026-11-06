'use client';

/** Get Sayso button: the flat primary pill that opens the signup flow. */
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { Button } from '@/components/ui/Button';

interface DownloadButtonProps {
  analyticsId: string;
}

export function DownloadButton({ analyticsId }: DownloadButtonProps) {
  const { openSignup } = useDemoCalendar();

  return (
    <Button onClick={openSignup} data-analytics-id={analyticsId}>
      Get Sayso
    </Button>
  );
}
