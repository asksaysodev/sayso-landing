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

/** Calendly event the demo request forms (persona pages, /request-demo) book into. */
export const CALENDLY_REQUEST_DEMO_URL = 'https://calendly.com/asksayso/request-demo?hide_gdpr_banner=1';

// Slug of the Calendly event most recently opened on this page (e.g. "demo",
// "request-demo"), so the booking event can say which one was booked.
let lastEventSlug: string | null = null;

/** Remembers which Calendly event a widget was opened for. */
export function noteCalendlyEvent(url: string): void {
  const m = url.match(/calendly\.com\/[^/]+\/([^/?#]+)/);
  if (m) lastEventSlug = m[1];
}

/** The Calendly event most recently opened on this page, if any. */
export function lastCalendlyEvent(): string | null {
  return lastEventSlug;
}

/** A Calendly booking URL with the visitor's email already filled in. */
export function calendlyUrlWithEmail(url: string, email?: string): string {
  return email ? `${url}${url.includes('?') ? '&' : '?'}email=${encodeURIComponent(email)}` : url;
}

// ---------------------------------------------------------------------------
// Preloaded demo popup
//
// Opening Calendly from scratch takes ~2.7s (the booking app plus an
// availability fetch). So a few seconds after the page loads we build the demo
// popup hidden, with the same markup and URL Calendly's own widget uses (styled
// by widget.css), and "Book a demo" just reveals it.
//
// Side effect: Calendly's GA4 "invitee_event_type_page" now fires for every
// visitor who stays a few seconds, so it no longer means someone opened the
// calendar. The weekly Piper report uses our own book_demo_click instead.
// ---------------------------------------------------------------------------

const CALENDLY_CSS_URL = 'https://assets.calendly.com/assets/external/widget.css';

/**
 * Adds Calendly's stylesheet to the page once. It is not in the root layout's
 * <head> because a third-party stylesheet there blocks the first paint on every
 * page. The popup, the preloaded popup and the inline embed call this before
 * they render, and the layout loads it after the page's load event.
 */
export function loadCalendlyStyles(): void {
  if (typeof document === 'undefined' || document.getElementById('calendly-css')) return;
  const link = document.createElement('link');
  link.id = 'calendly-css';
  link.rel = 'stylesheet';
  link.href = CALENDLY_CSS_URL;
  document.head.appendChild(link);
}

/** Pages that embed Calendly themselves or book a different event. */
const NO_PRELOAD_PATHS = ['/demo', '/request-demo'];
const PRELOAD_DELAY_MS = 3000;

let preloaded: { overlay: HTMLDivElement; iframe: HTMLIFrameElement } | null = null;
let preloadedUsed = false;
let preloadedOpen = false;

// Hidden with opacity 0 (not display:none or visibility:hidden) so the browser
// keeps rendering the Calendly iframe in the background; both of those defer
// Calendly's render until the popup is shown. pointer-events:none keeps the
// invisible overlay from catching clicks.
function setPreloadedVisible(visible: boolean): void {
  if (!preloaded) return;
  preloadedOpen = visible;
  const { style } = preloaded.overlay;
  style.opacity = visible ? '' : '0';
  style.pointerEvents = visible ? '' : 'none';
  preloaded.overlay.setAttribute('aria-hidden', visible ? 'false' : 'true');
  document.body.style.overflow = visible ? 'hidden' : '';
}

function popupUrl(url: string): string {
  // hide_event_type_details=1 drops Calendly's left info panel so the popup is
  // just the calendar: narrower and far less internal scrolling. Applied to the
  // popup only; full-page surfaces (the /demo inline embed and the new-tab
  // fallback) keep the event details for context.
  return `${url}${url.includes('?') ? '&' : '?'}hide_event_type_details=1`;
}

function preloadedSrc(): string {
  const u = new URL(popupUrl(CALENDLY_DEMO_URL));
  u.searchParams.set('embed_domain', window.location.host);
  u.searchParams.set('embed_type', 'PopupText');
  return u.toString();
}

function hidePreloaded(): void {
  if (!preloaded) return;
  setPreloadedVisible(false);
  // After a booking the iframe shows the confirmation; start fresh next time.
  if (preloadedUsed) {
    preloaded.iframe.src = preloadedSrc();
    preloadedUsed = false;
  }
}

function buildPreloaded(): void {
  if (preloaded) return;
  loadCalendlyStyles();
  const overlay = document.createElement('div');
  overlay.className = 'calendly-overlay';
  overlay.style.opacity = '0';
  overlay.style.pointerEvents = 'none';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML =
    '<div class="calendly-close-overlay"></div>' +
    '<div class="calendly-popup"><div class="calendly-popup-content">' +
    '<div class="calendly-spinner"><div class="calendly-bounce1"></div><div class="calendly-bounce2"></div><div class="calendly-bounce3"></div></div>' +
    '</div></div>' +
    '<div class="calendly-popup-close" role="button" aria-label="Close" tabindex="0"></div>';

  const iframe = document.createElement('iframe');
  iframe.src = preloadedSrc();
  iframe.width = '100%';
  iframe.height = '100%';
  iframe.setAttribute('frameborder', '0');
  iframe.title = 'Select a Date & Time - Calendly';
  overlay.querySelector('.calendly-popup-content')?.appendChild(iframe);

  overlay.querySelector('.calendly-close-overlay')?.addEventListener('click', hidePreloaded);
  overlay.querySelector('.calendly-popup-close')?.addEventListener('click', hidePreloaded);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && preloadedOpen) hidePreloaded();
  });
  window.addEventListener('message', (e) => {
    if (e.origin === 'https://calendly.com' && e.source === iframe.contentWindow &&
        (e.data as { event?: string } | null)?.event === 'calendly.event_scheduled') {
      preloadedUsed = true;
    }
  });

  document.body.appendChild(overlay);
  preloaded = { overlay, iframe };
}

/**
 * Builds the hidden demo popup a few seconds after load, once the page is idle.
 * Call once from the root layout.
 */
export function preloadDemoPopup(): void {
  if (typeof window === 'undefined' || preloaded) return;
  if (NO_PRELOAD_PATHS.some((p) => window.location.pathname.startsWith(p))) return;
  const idle = (cb: () => void) =>
    'requestIdleCallback' in window ? window.requestIdleCallback(cb, { timeout: 2000 }) : setTimeout(cb, 0);
  const start = () => setTimeout(() => idle(buildPreloaded), PRELOAD_DELAY_MS);
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
}

/**
 * Open the Calendly booking flow in a centered popup overlay.
 *
 * The default demo popup is shown from the preloaded copy when it exists. Other
 * events (request-demo with a prefilled email) go through Calendly's widget.
 * If the Calendly script has not finished loading yet, fall back to opening the
 * booking page in a new tab so the click is never a dead end.
 */
export function openCalendlyPopup(url: string = CALENDLY_DEMO_URL): void {
  if (typeof window === 'undefined') return;
  noteCalendlyEvent(url);
  loadCalendlyStyles();

  if (url === CALENDLY_DEMO_URL && preloaded) {
    setPreloadedVisible(true);
    (preloaded.overlay.querySelector('.calendly-popup-close') as HTMLElement | null)?.focus();
    return;
  }

  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url: popupUrl(url) });
    return;
  }

  window.open(url, '_blank', 'noopener,noreferrer');
}
