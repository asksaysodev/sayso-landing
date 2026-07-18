/**
 * WebinarOfferSection composes the /webinar/offer page, one cohesive
 * "Webinar Exclusive" offer.
 *
 * Flow of the page, top to bottom. The price and a Claim button sit near the
 * top so there is a call to action on the first screen without scrolling:
 *   1. Hero: "Webinar Exclusive" headline
 *   2. SavingsCallout: the $3,000 price + how much you save
 *   3. ClaimCta: button to the create-account page (above the fold)
 *   4. WhatYouGet: everything included, one unified card
 *   5. NextSteps: claim, create your account, book onboarding
 *   6. ClaimCta again (kept far from the first one)
 *   7. Guarantee bubble to close
 *
 * All prices and the offer contents live in ./data.ts.
 */

import { Hero } from './components/Hero';
import { SavingsCallout } from './components/SavingsCallout';
import { ClaimCta } from './components/ClaimCta';
import { WhatYouGet } from './components/WhatYouGet';
import { NextSteps } from './components/NextSteps';
import { Guarantee } from './components/Guarantee';

export function WebinarOfferSection() {
  return (
    <section className="bg-[#F4F4F5] py-8 md:py-12 v2-halftone relative">
      <div className="max-w-[900px] mx-auto px-5 md:px-6 relative z-10 flex flex-col gap-6 md:gap-8">
        <Hero />
        <SavingsCallout />
        <ClaimCta />
        <WhatYouGet />
        <NextSteps />
        <ClaimCta />
        <Guarantee />
      </div>
    </section>
  );
}
