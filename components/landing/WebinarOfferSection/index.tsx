/**
 * WebinarOfferSection composes the /webinar/offer page ("The Stack" layout): a
 * webinar-exclusive offer that leads with the deal, itemizes the value, stacks
 * the bonuses, and closes on the Friday 5:00 PM PT deadline.
 *
 * Order, top to bottom:
 *   1. Hero: names the offer, value vs price, first claim button
 *   2. TheStack: everything included, itemized to the webinar price
 *   3. Bonuses: the three webinar-only extras
 *   4. PriceCard: value anchors + $2,700 + claim (#price scroll target)
 *   5. Guarantee: the signed-client guarantee + claim
 *   6. NextSteps: claim, create account, book onboarding
 *   7. Faq: questions, with an ROI calculator
 *   8. FinalCta: deadline countdown + final claim
 *
 * The sticky deadline bar and mobile CTA live in the page (app/webinar/offer).
 * All content and prices live in ./data.ts.
 */

import { Hero } from './components/Hero';
import { TheStack } from './components/TheStack';
import { Bonuses } from './components/Bonuses';
import { PriceCard } from './components/PriceCard';
import { Guarantee } from './components/Guarantee';
import { NextSteps } from './components/NextSteps';
import { Faq } from './components/Faq';
import { FinalCta } from './components/FinalCta';

export function WebinarOfferSection() {
  return (
    <>
      <Hero />
      <TheStack />
      <Bonuses />
      <PriceCard />
      <Guarantee />
      <NextSteps />
      <Faq />
      <FinalCta />
    </>
  );
}
