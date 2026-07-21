/**
 * Closing CTA. Dark navy section restating the Friday 5:00 PM PT deadline with a
 * live countdown, the price recap, and the final claim button.
 */

import { Countdown } from './Countdown';
import { ClaimButton } from './ClaimButton';

export function FinalCta() {
  return (
    <section className="bg-[#1D4871] text-white text-center px-5 py-16 md:py-20">
      <div className="max-w-[880px] mx-auto">
        <h2 className="font-comic text-3xl md:text-4xl tracking-wide leading-tight">
          The offer is valid through
          <br />
          Friday at 5:00 PM PT
        </h2>
        <p className="mt-4 text-[#B9C6D6]">
          $2,700 for the year, everything included, backed by the signed-client
          guarantee.
        </p>
        <div className="flex justify-center my-7">
          <Countdown size="lg" />
        </div>
        <ClaimButton variant="primary" />
        <p className="mt-4 text-sm text-[#B9C6D6]">
          Limited to webinar attendees. Don&apos;t forget the signed-client
          guarantee.
        </p>
      </div>
    </section>
  );
}
