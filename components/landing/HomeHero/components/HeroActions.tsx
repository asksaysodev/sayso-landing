'use client';

/**
 * Hero call-to-action row: Get Sayso is the only filled button, with Book a
 * demo beside it as a navy text link.
 */
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { Button } from '@/components/ui/Button';
import { focusRing } from '../../HomeShared/styles';

const textLink = `inline-flex h-12 items-center gap-1.5 rounded-full px-3.5 text-[15px] font-semibold text-[#1D4871] hover:bg-[rgba(29,72,113,0.07)] ${focusRing}`;

export function HeroActions() {
  const { openDemoCalendar, openSignup } = useDemoCalendar();

  return (
    <div className="mt-[30px] flex flex-wrap items-center justify-center gap-x-3 gap-y-2.5">
      <Button onClick={openSignup} data-analytics-id="cta-download-hero">
        Get Sayso
      </Button>
      <button type="button" onClick={openDemoCalendar} className={textLink} data-analytics-id="cta-book-demo-hero">
        Book a demo <span aria-hidden="true">&rarr;</span>
      </button>
    </div>
  );
}
