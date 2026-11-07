/**
 * Closing CTA block. Dark navy panel with the lock-in pitch and a button
 * that opens the Sayso demo calendar in the on-page popup (so bookings are tracked).
 */
'use client';

import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { Button } from '@/components/ui/Button';
import { FOUNDER_PRICING_CONFIG } from '../data';
import { headingOnNavy, navyPanel } from '../styles';

export function CtaBlock() {
  const { openDemoCalendar } = useDemoCalendar();
  return (
    <section className={`${navyPanel} p-8 md:p-10 text-center`}>
      <h2 className={`mb-3 ${headingOnNavy}`}>Lock in Early Access Pricing</h2>
      <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-6 leading-relaxed">
        Early Access Pricing is available for a limited number of teams until Sayso&apos;s hard launch,{' '}
        {FOUNDER_PRICING_CONFIG.launchWindow}, and the rate you lock in now is yours for good. If you want your team on Sayso, now is the
        time to start.
      </p>
      <Button onClick={openDemoCalendar} variant="secondary" data-analytics-id="cta-book-call-founder-pricing">
        Book a call
      </Button>
      <p className="text-xs md:text-sm text-white/70 mt-4">
        Questions on team pricing? Email{' '}
        <a href="mailto:kuvaal@asksayso.com" className="text-[#FFDE59] hover:underline">
          kuvaal@asksayso.com
        </a>
      </p>
    </section>
  );
}
