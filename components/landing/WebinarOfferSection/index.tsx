/**
 * WebinarOfferSection composes the /webinar/offer page, the webinar-exclusive
 * offer built to feel as clean as the web app.
 *
 * Flow of the page, top to bottom:
 *   1. Hero: "Webinar Exclusive" headline
 *   2. WhatYouGet: two columns of everything included + guarantee bubble
 *   3. SavingsCallout: full value vs the $3,000 today price
 *   4. ClaimCta: button to the create-account page
 *   5. NextSteps: claim, create your account, book onboarding
 *   6. ClaimCta again, then the guarantee bubble to close
 *
 * All prices and the offer contents live in ./data.ts.
 */

import { Hero } from './components/Hero';
import { WhatYouGet } from './components/WhatYouGet';
import { SavingsCallout } from './components/SavingsCallout';
import { ClaimCta } from './components/ClaimCta';
import { NextSteps } from './components/NextSteps';
import { Guarantee } from './components/Guarantee';

export function WebinarOfferSection() {
  return (
    <section className="bg-[#F4F4F5] py-10 md:py-16 v2-halftone relative">
      <div className="max-w-[900px] mx-auto px-5 md:px-6 relative z-10 flex flex-col gap-8 md:gap-10">
        <Hero />
        <WhatYouGet />
        <SavingsCallout />
        <ClaimCta />
        <NextSteps />
        <ClaimCta />
        <Guarantee />
      </div>
    </section>
  );
}
