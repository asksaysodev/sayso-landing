'use client';

/**
 * The claim button. Clicking it starts the booking flow: it opens the Calendly
 * scheduler in a popup so the attendee can lock a time in the next couple of
 * days. After they confirm, the Calendly event itself redirects them to create
 * their Sayso account (configured on the event, see data.ts).
 *
 * Falls back to opening the calendar in a new tab if the Calendly widget script
 * has not loaded yet, so the click is never a dead end.
 */

import { openCalendlyPopup } from '@/lib/calendly';
import { CLAIM_CALENDAR_URL } from '../data';

export function ClaimCta() {
  return (
    <section className="text-center">
      <button
        type="button"
        onClick={() => openCalendlyPopup(CLAIM_CALENDAR_URL)}
        data-analytics-id="cta-claim-offer-webinar"
        className="inline-flex items-center justify-center rounded-full px-10 py-4 text-base md:text-lg font-bold bg-[#2367EE] text-white v2-comic-border v2-comic-btn focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2367EE]/40"
      >
        Claim your offer
      </button>
      <p className="text-sm text-[#1D4871]/60 mt-4">
        Spots are limited to webinar attendees. Book your time before you leave.
      </p>
    </section>
  );
}
