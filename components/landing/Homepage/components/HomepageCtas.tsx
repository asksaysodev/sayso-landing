'use client';

/**
 * Primary homepage call-to-action pair. "Get Sayso" opens the same system
 * picker as the Download button; "Book a Demo" opens the Calendly popup.
 */

import { CalendarDays, Download } from 'lucide-react';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';

type HomepageCtasProps = {
  /** Suffix for analytics ids, e.g. "hero" gives "cta-download-hero". */
  placement: string;
};

const buttonBase =
  'inline-flex min-h-[44px] items-center justify-center gap-2.5 rounded-md border-2 px-5 py-3 md:px-6 md:py-4 font-extrabold leading-none transition-colors focus:outline-none focus-visible:ring-[3px] focus-visible:ring-cta focus-visible:ring-offset-2';

export function HomepageCtas({ placement }: HomepageCtasProps) {
  const { openSystemSelect, openDemoCalendar } = useDemoCalendar();

  return (
    <div className="flex flex-wrap items-center justify-center gap-3.5">
      <button
        type="button"
        onClick={openSystemSelect}
        data-analytics-id={`cta-download-${placement}`}
        className={`${buttonBase} border-primary bg-accent text-[#0D1B2A] hover:bg-[#FFD42A]`}
      >
        <Download size={18} strokeWidth={2.5} aria-hidden="true" />
        Get Sayso
      </button>
      <button
        type="button"
        onClick={openDemoCalendar}
        data-analytics-id={`cta-book-demo-${placement}`}
        className={`${buttonBase} border-primary bg-cta text-white hover:bg-[#1E56D4]`}
      >
        <CalendarDays size={18} strokeWidth={2.5} aria-hidden="true" />
        Book a Demo
      </button>
    </div>
  );
}
