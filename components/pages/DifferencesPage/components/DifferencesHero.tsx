'use client';

/**
 * Dark navy hero for the /differences page. Poses the question agents ask
 * most ("What's the difference between Sayso and ___?") with the blank
 * filled by a rotating list of competitor names, then answers it in one
 * line and offers the standard demo/download CTA pair.
 */

import { LightningIcon } from '@/components/icons/LightningIcon';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { RotatingCompetitor } from './RotatingCompetitor';
import { ROTATING_COMPETITORS } from '../data';

export function DifferencesHero() {
  const { openDemoCalendar, openSystemSelect } = useDemoCalendar();

  return (
    <section className="relative overflow-hidden v4-halftone-dark pt-12 pb-16 md:pt-20 md:pb-24">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
        <h1 className="font-comic text-4xl sm:text-5xl lg:text-6xl text-white tracking-wide leading-[1.2] v4-slide-in-left">
          What&apos;s the difference between{' '}
          <span className="whitespace-nowrap">Sayso and</span>{' '}
          <RotatingCompetitor items={ROTATING_COMPETITORS} />?
        </h1>
        <p className="mt-6 text-base md:text-lg lg:text-xl leading-relaxed text-white/70 max-w-2xl mx-auto">
          It is the question we hear every week, and the honest answer comes down to
          timing. Sayso coaches you during the live conversation, while most tools
          wait until after you hang up.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={openDemoCalendar}
            data-analytics-id="cta-book-demo-differences-hero"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-transparent text-white font-bold text-base border-2 border-white hover:bg-white/10 transition-colors"
          >
            Book a Demo
          </button>
          <button
            onClick={openSystemSelect}
            data-analytics-id="cta-download-differences-hero"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#FFDE59] text-[#1D4871] font-bold text-base border-2 border-[#FFDE59] hover:bg-[#FFDE59]/90 transition-colors"
          >
            <LightningIcon size={14} className="mr-1.5" />
            Download Sayso
          </button>
        </div>
      </div>
    </section>
  );
}
