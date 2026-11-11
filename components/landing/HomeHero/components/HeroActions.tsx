'use client';

/**
 * Hero call-to-action row: Get Sayso, Book a demo and Try it (jumps to the
 * guided demo). Book a demo is hidden on phones, where the navbar already shows it.
 */
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { Button } from '@/components/ui/Button';
import { focusRing } from '../../HomeShared/styles';

const textButton = `inline-flex h-12 items-center gap-2 rounded-full px-3.5 font-semibold text-[#1D4871] hover:bg-[rgba(29,72,113,0.07)] ${focusRing}`;

export function HeroActions() {
  const { openDemoCalendar, openSignup } = useDemoCalendar();

  return (
    <div className="mt-[30px] flex flex-wrap justify-center gap-x-3 gap-y-2.5">
      <Button onClick={openSignup} data-analytics-id="cta-download-hero">
        Get Sayso
      </Button>
      <Button variant="secondary" onClick={openDemoCalendar} className="max-[640px]:!hidden" data-analytics-id="cta-book-demo-hero">
        Book a demo
      </Button>
      <a href="#demo" className={textButton}>
        Try it &darr;
      </a>
    </div>
  );
}
