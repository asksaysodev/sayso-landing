'use client';

/**
 * Tells GTM when a visitor finishes booking in a Calendly widget on this site
 * (the Book a demo popup, the persona form popup, or the /demo inline embed).
 *
 * Calendly posts a `calendly.event_scheduled` message to the page when a
 * booking completes. We forward it to the dataLayer as `demo_booked` with the
 * page it happened on and which Calendly event was booked. GTM picks it up
 * with a Custom Event trigger on `demo_booked`.
 */
import { useEffect } from 'react';
import { lastCalendlyEvent } from '@/lib/calendly';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function CalendlyBookingTracker() {
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== 'https://calendly.com') return;
      const data = e.data as { event?: string } | null;
      if (!data || data.event !== 'calendly.event_scheduled') return;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'demo_booked',
        page_path: window.location.pathname,
        calendly_event: lastCalendlyEvent() ?? 'unknown',
      });
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return null;
}
