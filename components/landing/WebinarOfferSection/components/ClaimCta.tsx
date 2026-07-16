'use client';

/**
 * The claim button. Clicking it starts the booking flow: it opens the Calendly
 * scheduler in a popup so the attendee can lock a time in the next couple of
 * days. After they confirm, the Calendly event itself redirects them to create
 * their Sayso account (configured on the event, see data.ts).
 *
 * Falls back to opening the calendar in a new tab if the Calendly widget script
 * has not loaded yet, so the click is never a dead end.
 *
 * Pass withGuarantee on the closing CTA to repeat the money-back guarantee
 * right next to the final button.
 */

import { ShieldCheck } from 'lucide-react';
import { openCalendlyPopup } from '@/lib/calendly';
import { CLAIM_CALENDAR_URL, GUARANTEE_TEXT } from '../data';

export function ClaimCta({ withGuarantee = false }: { withGuarantee?: boolean }) {
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
        Limited to webinar attendees.
      </p>
      {withGuarantee && (
        <p className="inline-flex items-start gap-2 text-sm md:text-base text-[#1D4871] mt-3 max-w-xl mx-auto text-left">
          <ShieldCheck
            size={18}
            strokeWidth={2.25}
            className="shrink-0 text-[#2367EE] mt-0.5"
            aria-hidden="true"
          />
          <span>
            <span className="font-bold text-[#2367EE]">The guarantee:</span>{' '}
            {GUARANTEE_TEXT}
          </span>
        </p>
      )}
    </section>
  );
}
