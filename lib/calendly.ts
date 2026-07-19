/**
 * Calendly booking integration helpers.
 *
 * The Sayso demo booking flow runs on Calendly. The widget script and styles
 * are loaded once globally in the root layout, so callers only need the URL and
 * the popup helper below.
 */

export const CALENDLY_DEMO_URL =
  'https://calendly.com/asksayso/demo?hide_gdpr_banner=1';

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

/**
 * Open the Calendly booking flow in a centered popup overlay.
 *
 * If the Calendly script has not finished loading yet, fall back to opening the
 * booking page in a new tab so the click is never a dead end.
 */
export function openCalendlyPopup(url: string = CALENDLY_DEMO_URL): void {
  if (typeof window === 'undefined') return;

  if (window.Calendly) {
    // hide_event_type_details=1 drops Calendly's left info panel so the popup
    // is just the calendar: narrower and far less internal scrolling. Applied
    // to the popup only; full-page surfaces (the /demo inline embed and the
    // new-tab fallback below) keep the event details for context.
    const popupUrl = `${url}${url.includes('?') ? '&' : '?'}hide_event_type_details=1`;
    window.Calendly.initPopupWidget({ url: popupUrl });
    return;
  }

  window.open(url, '_blank', 'noopener,noreferrer');
}
