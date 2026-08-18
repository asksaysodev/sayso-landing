'use client';

/**
 * Light hero for the /differences page. States the objection verbatim
 * ("We already use ___. So how is this different?") with the blank filled
 * by the spinning DrumWheel, answers it in one line, and offers a scroll
 * CTA into the answer plus the standard demo CTA. A soft blue radial glow
 * sits behind the headline, matching the mockup's clean AI-forward look.
 */

import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { DrumWheel } from './DrumWheel';
import { DRUM_WORDS } from '../data';

export function DifferencesHero() {
  const { openDemoCalendar } = useDemoCalendar();

  const scrollToAnswer = () => {
    document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-20 md:pt-24 md:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-260px] h-[700px] w-[900px] -translate-x-1/2"
        style={{ background: 'radial-gradient(ellipse at center, rgba(35,103,238,.10), transparent 66%)' }}
      />
      <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
        <h1 className="font-comic text-4xl sm:text-5xl lg:text-6xl text-[#1D4871] tracking-wide leading-[1.15] flex items-center justify-center flex-wrap gap-x-[0.25em] gap-y-2">
          <span>We already use</span>
          <DrumWheel words={DRUM_WORDS} />
        </h1>
        <p className="mt-5 font-comic text-2xl sm:text-3xl lg:text-4xl text-[#1D4871]/45 tracking-wide">
          So how is this different?
        </p>
        <p className="mt-7 text-base md:text-lg lg:text-xl leading-relaxed text-[#1D4871]/70 max-w-xl mx-auto">
          Those help after the opportunity is lost. Sayso helps you while the
          opportunity is still winnable.
        </p>
        <div className="mt-9 flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={scrollToAnswer}
            data-analytics-id="cta-see-difference-differences-hero"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#2367EE] text-white font-bold text-base border-2 border-[#1D4871] v2-comic-btn"
            style={{ boxShadow: '3px 3px 0px #1D4871' }}
          >
            Here is the difference
          </button>
          <button
            onClick={openDemoCalendar}
            data-analytics-id="cta-book-demo-differences-hero"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-[#1D4871] font-bold text-base border-2 border-[#1D4871] hover:bg-[#F4F4F5] transition-colors"
          >
            Book a Demo
          </button>
        </div>
        <p className="mt-7 text-sm font-semibold text-[#1D4871]/50">
          Sayso works with your existing dialer and CRM. There is nothing to switch.
        </p>
      </div>
    </section>
  );
}
