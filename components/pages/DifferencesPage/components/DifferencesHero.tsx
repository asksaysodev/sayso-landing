'use client';

/**
 * Light hero for the /differences page. States the objection verbatim
 * ("We already use ___. So how is this different?") with the blank filled
 * by the spinning DrumWheel, answers it in one line, and offers a scroll
 * CTA into the answer plus the standard demo CTA.
 */

import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { Button } from '@/components/ui/Button';
import { soft } from '@/components/landing/HomeShared/styles';
import { DrumWheel } from './DrumWheel';
import { DRUM_WORDS } from '../data';

export function DifferencesHero() {
  const { openDemoCalendar } = useDemoCalendar();

  const scrollToAnswer = () => {
    document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-[92px] pb-20 md:pb-24">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 relative z-10 text-center">
        <h1 className="font-hero font-extrabold text-[clamp(34px,6vw,60px)] text-[#10233A] tracking-[-0.03em] leading-[1.1] flex items-center justify-center flex-wrap gap-x-[0.25em] gap-y-2">
          <span>We already use</span>
          <DrumWheel words={DRUM_WORDS} />
        </h1>
        <p className={`mt-4 font-hero font-extrabold text-[clamp(24px,3.6vw,38px)] tracking-[-0.03em] leading-[1.15] ${soft}`}>
          So how is this different?
        </p>
        <p className="mt-7 text-base md:text-lg lg:text-xl leading-relaxed text-[#556B86] max-w-xl mx-auto">
          Those help after the opportunity is lost. Sayso helps you while the
          opportunity is still winnable.
        </p>
        <div className="mt-9 flex items-center justify-center gap-x-3 gap-y-2.5 flex-wrap">
          <Button onClick={scrollToAnswer} data-analytics-id="cta-see-difference-differences-hero">
            Here is the difference
          </Button>
          <Button variant="secondary" onClick={openDemoCalendar} data-analytics-id="cta-book-demo-differences-hero">
            Book a demo
          </Button>
        </div>
        <p className="mt-7 text-sm font-semibold text-[#556B86]">
          Sayso works with your existing dialer and CRM. There is nothing to switch.
        </p>
      </div>
    </section>
  );
}
