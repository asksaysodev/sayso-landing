'use client';

/**
 * The persona pages' demo request form. The Sure Send form captures email and
 * phone (so the team can follow up with people who don't book), then the
 * Calendly request-demo event opens right away with the email filled in.
 * The `persona-demo-form` class gives the embed the brand look (see globals.css).
 */
import { useEffect } from 'react';
import SsFormEmbed, { type SsFormValues } from '@/components/landing/SsFormEmbed';
import { CALENDLY_REQUEST_DEMO_URL, calendlyUrlWithEmail, openCalendlyPopup } from '@/lib/calendly';
import { DEMO_FORM_EMBED_CODE, DEMO_FORM_ID } from './constants';

/** The one demo button label used across the ad pages. The Sure Send form config says "Book my Demo". */
const SUBMIT_LABEL = 'Book my demo';

function openBooking({ email }: SsFormValues) {
  const url = calendlyUrlWithEmail(CALENDLY_REQUEST_DEMO_URL, email);
  // No user gesture here (the submit is async), so a new tab could be blocked;
  // without the Calendly script, send the visitor to the booking page instead.
  if (window.Calendly) openCalendlyPopup(url);
  else window.location.href = url;
}

/**
 * Sets the injected submit button's label once the embed renders it. The embed
 * reads the label back from the button after a submit, so this sticks.
 */
function useSubmitLabel() {
  useEffect(() => {
    const root = document.getElementById(DEMO_FORM_ID);
    if (!root) return;
    const apply = () => {
      const button = root.querySelector<HTMLButtonElement>('.ss-form-submit');
      if (button && !button.disabled && button.textContent?.trim().toLowerCase() === SUBMIT_LABEL.toLowerCase()) {
        if (button.textContent !== SUBMIT_LABEL) button.textContent = SUBMIT_LABEL;
      }
    };
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(root, { subtree: true, childList: true });
    return () => observer.disconnect();
  }, []);
}

export function PersonaDemoForm() {
  useSubmitLabel();
  return (
    <>
      {/* The embed's own wrapper adds 24px of padding; remove it so the box fits the fields exactly. */}
      <SsFormEmbed
        id={DEMO_FORM_ID}
        embedCode={DEMO_FORM_EMBED_CODE}
        onSuccess={openBooking}
        className="persona-demo-form scroll-mt-6 text-left [&_.ss-form-wrapper]:p-0"
      />
      <p className="mt-3 text-center text-sm text-[#556B86]">
        Next: pick a time on the calendar. Most demos take 20 minutes.
      </p>
    </>
  );
}
