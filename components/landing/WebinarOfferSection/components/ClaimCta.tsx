/**
 * The claim button. Links straight to the create-account page so attendees sign
 * up right after the webinar. Onboarding (and its calendar step) is handled by
 * email once they have an account, so this no longer opens a calendar.
 *
 * The destination lives in ACCOUNT_CREATION_URL (see data.ts).
 */

import { ACCOUNT_CREATION_URL } from '../data';

export function ClaimCta() {
  return (
    <section className="text-center">
      <a
        href={ACCOUNT_CREATION_URL}
        data-analytics-id="cta-claim-offer-webinar"
        className="inline-flex items-center justify-center rounded-full px-10 py-4 text-base md:text-lg font-bold bg-[#2367EE] text-white v2-comic-border v2-comic-btn focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2367EE]/40"
      >
        Claim your offer
      </a>
      <p className="text-sm text-[#1D4871]/60 mt-4">
        Limited to webinar attendees.
      </p>
    </section>
  );
}
