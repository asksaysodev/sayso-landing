'use client';

/**
 * CalendlyBadge  —  PREVIEW / DO NOT MERGE
 *
 * Renders Calendly's floating "Book a Demo" badge widget (the pill that sits in
 * the bottom corner of the viewport). Relies on the Calendly widget script +
 * styles already loaded globally in the root layout, and initializes the badge
 * once that script is available.
 *
 * This is an experimental preview to evaluate the badge UI/UX across every page.
 * It is intentionally scoped to a do-not-merge branch.
 */

import { useEffect } from 'react';

// Poll for the Calendly script for ~5s (25 x 200ms) before giving up.
const MAX_INIT_ATTEMPTS = 25;
const INIT_RETRY_MS = 200;

const BADGE_URL =
  'https://calendly.com/asksayso?hide_landing_page_details=1&hide_gdpr_banner=1';

export function CalendlyBadge() {
  useEffect(() => {
    let cancelled = false;
    let attempts = 0;

    function init() {
      if (cancelled) return;
      if (window.Calendly) {
        window.Calendly.initBadgeWidget({
          url: BADGE_URL,
          text: 'Book a Demo',
          color: '#2367EE',
          textColor: '#FFFFFF',
          branding: false,
        });
      } else if (attempts < MAX_INIT_ATTEMPTS) {
        attempts += 1;
        window.setTimeout(init, INIT_RETRY_MS);
      }
    }

    init();

    return () => {
      cancelled = true;
      // Remove the injected badge on unmount so it does not stack up.
      document
        .querySelectorAll('.calendly-badge-widget')
        .forEach((el) => el.remove());
    };
  }, []);

  return null;
}
