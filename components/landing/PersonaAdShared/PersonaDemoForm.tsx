'use client';

/**
 * The persona pages' demo request form. The Sure Send form captures email and
 * phone (so the team can follow up with people who don't book), then the
 * Calendly request-demo event opens right away with the email filled in.
 */
import SsFormEmbed, { type SsFormValues } from '@/components/landing/SsFormEmbed';
import { CALENDLY_REQUEST_DEMO_URL, calendlyUrlWithEmail, openCalendlyPopup } from '@/lib/calendly';
import { DEMO_FORM_EMBED_CODE, DEMO_FORM_ID } from './constants';

function openBooking({ email }: SsFormValues) {
  const url = calendlyUrlWithEmail(CALENDLY_REQUEST_DEMO_URL, email);
  // No user gesture here (the submit is async), so a new tab could be blocked;
  // without the Calendly script, send the visitor to the booking page instead.
  if (window.Calendly) openCalendlyPopup(url);
  else window.location.href = url;
}

export function PersonaDemoForm() {
  return (
    <>
      {/* The embed's own wrapper adds 24px of padding; remove it so the box fits the fields exactly. */}
      <SsFormEmbed
        id={DEMO_FORM_ID}
        embedCode={DEMO_FORM_EMBED_CODE}
        onSuccess={openBooking}
        className="scroll-mt-6 text-left [&_.ss-form-wrapper]:p-0"
      />
      <p className="mt-3 text-center text-sm text-[#556B86]">
        Next: pick a time on the calendar. Most demos take 10 to 15 minutes.
      </p>
    </>
  );
}
