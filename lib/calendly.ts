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
      initBadgeWidget: (options: {
        url: string;
        text: string;
        color?: string;
        textColor?: string;
        branding?: boolean;
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
    window.Calendly.initPopupWidget({ url });
    return;
  }

  window.open(url, '_blank', 'noopener,noreferrer');
}
