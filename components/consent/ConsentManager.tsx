'use client';

/**
 * Cookie consent banner and Choices panel.
 *
 * - First visit: a banner (bottom-left card on desktop, bottom sheet on phones)
 *   with Accept all and Reject non-essential.
 * - Choices panel: Essential (always on), Analytics (GA4), Advertising & visitor
 *   identification (Meta, Vector, Leadsy). Opened from the footer's
 *   "Your Privacy Choices" link or the privacy policy.
 * - Global Privacy Control: advertising is off and the banner is not shown;
 *   the panel notes that the signal was honored.
 *
 * Storage and Consent Mode updates live in lib/consent.ts.
 */
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  OPEN_PRIVACY_CHOICES_EVENT,
  effectiveConsent,
  gpcEnabled,
  onConsent,
  saveConsent,
  type ConsentChoice,
} from '@/lib/consent';
import { AdvertisingScripts } from './AdvertisingScripts';

type View = 'none' | 'banner' | 'panel';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const pillBase =
  'inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full px-3 text-[13px] font-semibold sm:px-5 sm:text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2';
const bluePill = `${pillBase} bg-[#2367EE] text-white shadow-button hover:-translate-y-px hover:bg-[#1d5ad6]`;
const whitePill = `${pillBase} bg-white text-[#10233A] shadow-card-sm hover:-translate-y-px hover:shadow-card-sm-hover`;
const cardBase =
  'fixed z-[9000] bg-white text-[#1D4871] shadow-popover inset-x-0 bottom-0 rounded-t-2xl p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[calc(100%-3rem)] sm:max-w-[420px] sm:rounded-2xl sm:p-6';

function Toggle({
  id,
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div>
        <p id={`${id}-label`} className="text-sm font-semibold text-[#10233A]">
          {label}
        </p>
        <p id={`${id}-desc`} className="mt-0.5 text-xs leading-relaxed text-[#1D4871]/70">
          {description}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={`${id}-label`}
        aria-describedby={`${id}-desc`}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2 ${
          checked ? 'bg-[#2367EE]' : 'bg-[#1D4871]/20'
        } ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
      >
        <span
          aria-hidden="true"
          className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-[22px]' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}

export function ConsentManager() {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [view, setView] = useState<View>('none');
  const [gpc, setGpc] = useState(false);
  const [draft, setDraft] = useState({ analytics: false, advertising: false });
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const hadAdsRef = useRef(false);
  const bannerAcceptRef = useRef<HTMLButtonElement>(null);
  const focusBannerRef = useRef(false);
  const uid = useId();
  const bannerTitleId = `${uid}-banner-title`;
  const bannerTextId = `${uid}-banner-text`;
  const panelTitleId = `${uid}-panel-title`;

  // Initial state and live updates.
  useEffect(() => {
    const signal = gpcEnabled();
    setGpc(signal);
    let first = true;
    return onConsent((c) => {
      setChoice(c);
      if (first) {
        first = false;
        if (!c && !signal) setView('banner');
      }
    });
  }, []);

  const effective = effectiveConsent(choice);

  // Meta pixel already on the page when advertising is turned off: tell it to stop.
  useEffect(() => {
    if (effective.advertising) hadAdsRef.current = true;
    else if (hadAdsRef.current) window.fbq?.('consent', 'revoke');
  }, [effective.advertising]);

  const openPanel = useCallback(() => {
    returnFocusRef.current = (document.activeElement as HTMLElement | null) ?? null;
    const current = effectiveConsent(choice);
    setDraft({ analytics: current.analytics, advertising: current.advertising });
    setView('panel');
  }, [choice]);

  useEffect(() => {
    window.addEventListener(OPEN_PRIVACY_CHOICES_EVENT, openPanel);
    return () => window.removeEventListener(OPEN_PRIVACY_CHOICES_EVENT, openPanel);
  }, [openPanel]);

  const closePanel = useCallback(() => {
    // Without a saved choice the banner comes back (unless GPC already answered).
    const backToBanner = !choice && !gpc;
    setView(backToBanner ? 'banner' : 'none');
    const el = returnFocusRef.current;
    returnFocusRef.current = null;
    if (el && el !== document.body && document.contains(el)) el.focus();
    else if (backToBanner) focusBannerRef.current = true;
  }, [choice, gpc]);

  // Back from the panel to the banner: focus the banner's Accept button.
  useEffect(() => {
    if (view === 'banner' && focusBannerRef.current) {
      focusBannerRef.current = false;
      bannerAcceptRef.current?.focus();
    }
  }, [view]);

  const decide = (c: { analytics: boolean; advertising: boolean }) => {
    saveConsent(c);
    const fromPanel = view === 'panel';
    setView('none');
    if (fromPanel) {
      const el = returnFocusRef.current;
      returnFocusRef.current = null;
      if (el && el !== document.body && document.contains(el)) el.focus();
    }
  };

  // Focus the panel on open; Escape closes it; Tab stays inside it.
  useEffect(() => {
    if (view !== 'panel') return;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closePanel();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      const items = Array.from(
        panel.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'),
      );
      if (!items.length) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [view, closePanel]);

  return (
    <>
      {effective.advertising && <AdvertisingScripts />}

      {view === 'banner' && (
        <div role="dialog" aria-modal="false" aria-labelledby={bannerTitleId} aria-describedby={bannerTextId} className={cardBase}>
          <h2 id={bannerTitleId} className="font-hero text-base font-bold text-[#10233A]">
            Your privacy on Sayso
          </h2>
          <p id={bannerTextId} className="mt-1.5 text-sm leading-relaxed text-[#1D4871]/80">
            Cookies help us improve Sayso and show you relevant content.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button type="button" className={whitePill} onClick={() => decide({ analytics: false, advertising: false })}>
              Reject non-essential
            </button>
            <button ref={bannerAcceptRef} type="button" className={bluePill} onClick={() => decide({ analytics: true, advertising: true })}>
              Accept all
            </button>
          </div>
        </div>
      )}

      {view === 'panel' && (
        <div ref={panelRef} role="dialog" aria-modal="true" aria-labelledby={panelTitleId} className={`${cardBase} max-h-[90vh] overflow-y-auto`}>
          <div className="flex items-start justify-between gap-4">
            <h2 id={panelTitleId} className="font-hero text-base font-bold text-[#10233A]">
              Your privacy choices
            </h2>
            <button
              type="button"
              data-autofocus
              onClick={closePanel}
              aria-label="Close privacy choices"
              className="-mr-1 -mt-1 grid h-8 w-8 place-items-center rounded-full text-[#1D4871]/70 hover:bg-[#1D4871]/5 hover:text-[#10233A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE]"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-[#1D4871]/80">
            Choose which cookies and tags Sayso can use. You can change this any time from the
            footer.
          </p>
          {gpc && (
            <p className="mt-3 rounded-xl bg-[#F4F4F5] px-3 py-2 text-xs font-semibold text-[#1D4871]">
              Your browser&apos;s privacy signal was honored.
            </p>
          )}
          <div className="mt-2 divide-y divide-[#1D4871]/10">
            <Toggle
              id={`${uid}-essential`}
              label="Essential"
              description="Needed for the site to work, such as remembering this choice. Always on."
              checked
              disabled
            />
            <Toggle
              id={`${uid}-analytics`}
              label="Analytics"
              description="Google Analytics, so we can see which pages help visitors."
              checked={draft.analytics}
              onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))}
            />
            <Toggle
              id={`${uid}-advertising`}
              label="Advertising & visitor identification"
              description="Meta, Vector and Leadsy, to measure our ads and learn which companies visit."
              checked={draft.advertising}
              onChange={(v) => setDraft((d) => ({ ...d, advertising: v }))}
            />
          </div>
          <button type="button" className={`${bluePill} mt-4 w-full`} onClick={() => decide(draft)}>
            Save choices
          </button>
        </div>
      )}
    </>
  );
}
