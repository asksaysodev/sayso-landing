/**
 * Closing CTA block. Dark navy panel with the lock-in pitch and a button
 * that opens the Sayso demo calendar.
 */

import { Button } from '@/components/ui/Button';
import { FOUNDER_PRICING_CONFIG } from '../data';

export function CtaBlock() {
  return (
    <section className="rounded-[20px] bg-[#1D4871] shadow-[0_18px_40px_-18px_rgba(29,72,113,0.6)] p-8 md:p-10 text-center">
      <h2 className="mb-3 font-hero font-extrabold tracking-[-0.03em] text-white text-[clamp(28px,4vw,40px)] leading-[1.1]">
        Lock in Early Access Pricing
      </h2>
      <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-6 leading-relaxed">
        Early Access Pricing is available for a limited number of teams until Sayso&apos;s hard launch, {FOUNDER_PRICING_CONFIG.launchWindow}, and the rate you lock in now is yours for good. If you want your team on Sayso, now is the time to start.
      </p>
      <Button href="https://calendly.com/asksayso/demo" external variant="secondary" data-analytics-id="cta-book-call-founder-pricing">
        Book a call
      </Button>
      <p className="text-xs md:text-sm text-white/70 mt-4">
        Questions on team pricing? Email{' '}
        <a
          href="mailto:kuvaal@asksayso.com"
          className="text-[#FFDE59] hover:underline"
        >
          kuvaal@asksayso.com
        </a>
      </p>
    </section>
  );
}
