/**
 * WebinarOfferSection composes the /webinar/offer page, the webinar-exclusive
 * offer built to feel as clean as the web app.
 *
 * Flow of the page, top to bottom. We lead with the deal so the savings are the
 * first thing an attendee sees, then justify the value underneath:
 *   1. Hero: "The math, out loud" setup
 *   2. SavingsCallout: full value vs the $3,000 today price, savings emphasized
 *   3. ClaimCta: primary button that starts the booking flow
 *   4. OfferBreakdown: itemized value of everything included, summed
 *   5. NextSteps: claim, book a time, create your account
 *   6. ClaimCta again so the action is always in reach after reading
 *
 * All prices and the offer contents live in ./data.ts.
 */

import { Hero } from './components/Hero';
import { OfferBreakdown } from './components/OfferBreakdown';
import { SavingsCallout } from './components/SavingsCallout';
import { ClaimCta } from './components/ClaimCta';
import { NextSteps } from './components/NextSteps';

export function WebinarOfferSection() {
  return (
    <section className="bg-[#F4F4F5] py-10 md:py-16 v2-halftone relative">
      <div className="max-w-[760px] mx-auto px-5 md:px-6 relative z-10 flex flex-col gap-9 md:gap-12">
        <Hero />
        <SavingsCallout />
        <ClaimCta />
        <OfferBreakdown />
        <NextSteps />
        <ClaimCta />
      </div>
    </section>
  );
}
