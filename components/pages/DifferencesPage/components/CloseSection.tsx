'use client';

/**
 * Closing CTA band: one line, the standard demo/download button pair, and
 * a short social-proof note underneath.
 */

import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { Button } from '@/components/ui/Button';
import { section } from '@/components/landing/HomeShared/styles';
import { sectionTitle, sectionWrap } from '../styles';

export function CloseSection() {
  const { openDemoCalendar, openSignup } = useDemoCalendar();

  return (
    <section className={section}>
      <div className={sectionWrap}>
        <h2 className={sectionTitle}>
          The next call is the one that counts.
        </h2>
        <div className="mt-9 flex items-center justify-center gap-x-3 gap-y-2.5 flex-wrap">
          <Button onClick={openSignup} data-analytics-id="cta-download-differences-close">
            Get Sayso
          </Button>
          <Button variant="secondary" onClick={openDemoCalendar} data-analytics-id="cta-book-demo-differences-close">
            Book a demo
          </Button>
        </div>
        <p className="mt-8 text-sm font-bold tracking-wide uppercase text-[#7f92aa]">
          Used by RealTrends ranked teams every day
        </p>
      </div>
    </section>
  );
}
