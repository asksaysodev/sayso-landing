/**
 * Visitor consent for cookies and tracking.
 *
 * The choice lives in a first-party cookie for 12 months, tagged with the
 * policy version. When CONSENT_POLICY_VERSION changes, stored choices no longer
 * count and the banner shows again.
 *
 * Categories:
 * - analytics: GA4 (through GTM, Google Consent Mode v2 advanced)
 * - advertising: Meta pixel, Vector, Leadsy and beehiiv attribution (loaded
 *   only after consent)
 *
 * Global Privacy Control: when the browser sends GPC, advertising is off unless
 * the visitor turned it on themselves while GPC was on.
 *
 * The head script in app/layout.tsx (consentDefaultScript) reads the same
 * cookie before GTM loads, so keep the cookie format in sync with it.
 */

export const CONSENT_COOKIE = 'sayso_consent';
export const CONSENT_POLICY_VERSION = '2026-11-19';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

/** Fired on window when the visitor's choice changes. */
export const CONSENT_CHANGE_EVENT = 'sayso:consent-change';
/** Fired on window to open the Choices panel (footer link, privacy page). */
export const OPEN_PRIVACY_CHOICES_EVENT = 'sayso:open-privacy-choices';

export interface ConsentChoice {
  analytics: boolean;
  advertising: boolean;
  /** GPC was on when the visitor saved this choice. */
  gpc: boolean;
}

declare global {
  interface Navigator {
    globalPrivacyControl?: boolean;
  }
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function gpcEnabled(): boolean {
  return typeof navigator !== 'undefined' && navigator.globalPrivacyControl === true;
}

/** Cookie value: "<version>:<analytics><advertising><gpc>", e.g. "2026-11-19:101". */
function encode(choice: ConsentChoice): string {
  const bit = (b: boolean) => (b ? '1' : '0');
  return `${CONSENT_POLICY_VERSION}:${bit(choice.analytics)}${bit(choice.advertising)}${bit(choice.gpc)}`;
}

/** The stored choice for the current policy version, or null if none. */
export function readConsent(): ConsentChoice | null {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]+)`));
  if (!m) return null;
  const [version, bits] = decodeURIComponent(m[1]).split(':');
  if (version !== CONSENT_POLICY_VERSION || !bits || bits.length < 3) return null;
  return { analytics: bits[0] === '1', advertising: bits[1] === '1', gpc: bits[2] === '1' };
}

/**
 * What is allowed right now. GPC turns advertising off unless the stored choice
 * was made with GPC on (the visitor saw the signal noted and opted in anyway).
 */
export function effectiveConsent(choice: ConsentChoice | null): { analytics: boolean; advertising: boolean } {
  if (!choice) return { analytics: false, advertising: false };
  const advertising = choice.advertising && (!gpcEnabled() || choice.gpc);
  return { analytics: choice.analytics, advertising };
}

/** True when the visitor allowed any non-essential category. */
export function hasNonEssentialConsent(choice: ConsentChoice | null): boolean {
  const c = effectiveConsent(choice);
  return c.analytics || c.advertising;
}

// gtag must push the arguments object itself, not an array, for GTM to read it.
function gtag(..._args: unknown[]): void {
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments as unknown as Record<string, unknown>);
}

/** Sends the choice to Google Consent Mode v2. */
export function pushConsentUpdate(choice: ConsentChoice | null): void {
  const c = effectiveConsent(choice);
  const ads = c.advertising ? 'granted' : 'denied';
  gtag('consent', 'update', {
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
    analytics_storage: c.analytics ? 'granted' : 'denied',
  });
}

/** Saves the choice, updates Consent Mode and tells listeners. */
export function saveConsent(choice: { analytics: boolean; advertising: boolean }): ConsentChoice {
  const full: ConsentChoice = { ...choice, gpc: gpcEnabled() };
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(encode(full))}; Max-Age=${MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`;
  pushConsentUpdate(full);
  window.dispatchEvent(new CustomEvent<ConsentChoice>(CONSENT_CHANGE_EVENT, { detail: full }));
  return full;
}

/** Calls `cb` with the current choice now and again whenever it changes. */
export function onConsent(cb: (choice: ConsentChoice | null) => void): () => void {
  cb(readConsent());
  const handler = (e: Event) => cb((e as CustomEvent<ConsentChoice>).detail);
  window.addEventListener(CONSENT_CHANGE_EVENT, handler);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, handler);
}

export function openPrivacyChoices(): void {
  window.dispatchEvent(new Event(OPEN_PRIVACY_CHOICES_EVENT));
}

/**
 * Inline head script that runs before GTM: Consent Mode v2 defaults (all
 * denied), then the stored choice, if any, applied right away as an update.
 */
export const consentDefaultScript = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
(function(){try{var m=document.cookie.match(/(?:^|; )${CONSENT_COOKIE}=([^;]+)/);if(!m)return;var p=decodeURIComponent(m[1]).split(':');if(p[0]!=='${CONSENT_POLICY_VERSION}'||!p[1]||p[1].length<3)return;var b=p[1];var gpc=navigator.globalPrivacyControl===true;var ads=b.charAt(1)==='1'&&(!gpc||b.charAt(2)==='1')?'granted':'denied';gtag('consent','update',{ad_storage:ads,ad_user_data:ads,ad_personalization:ads,analytics_storage:b.charAt(0)==='1'?'granted':'denied'});}catch(e){}})();`;
