'use client';

/**
 * DemoLiftCard  —  PREVIEW / DO NOT MERGE
 *
 * A floating "book a demo" launcher that expands into a rich card, styled after
 * the iClosed "LIFT" widget the team liked (avatar + name/title, headline, a
 * row of date pills, and a primary CTA).
 *
 * IMPORTANT: this is a custom UI mock backed by Calendly. It does NOT show real
 * Calendly availability. The date pills and the "Schedule a demo" button all
 * open the existing Calendly popup (see lib/calendly.ts). Showing genuine open
 * slots inside the pills would require Calendly's paid scheduling API.
 *
 * Experimental preview only; intentionally scoped to a do-not-merge branch.
 */

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { openCalendlyPopup } from '@/lib/calendly';

// Auto-open the card this many ms after load so the preview is easy to see.
const AUTO_OPEN_MS = 2500;

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface DayPill {
  weekday: string;
  day: number;
}

function buildNextDays(count: number): DayPill[] {
  const days: DayPill[] = [];
  const base = new Date();
  for (let i = 0; i < count; i += 1) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    days.push({ weekday: WEEKDAYS[d.getDay()], day: d.getDate() });
  }
  return days;
}

export function DemoLiftCard() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [days, setDays] = useState<DayPill[]>([]);
  const [selected, setSelected] = useState(0);
  const autoOpenedRef = useRef(false);

  // Build the date pills on the client only (avoids SSR/hydration date mismatch).
  useEffect(() => {
    setMounted(true);
    setDays(buildNextDays(5));
  }, []);

  // Auto-open once, shortly after mount.
  useEffect(() => {
    if (!mounted || autoOpenedRef.current) return;
    autoOpenedRef.current = true;
    const t = window.setTimeout(() => setOpen(true), AUTO_OPEN_MS);
    return () => window.clearTimeout(t);
  }, [mounted]);

  if (!mounted) return null;

  const book = () => openCalendlyPopup();

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end gap-2.5 sm:bottom-5 sm:right-5 sm:gap-3">
      {open && (
        <div className="v2-comic-border v2-comic-shadow w-[270px] max-w-[calc(100vw-2rem)] rounded-2xl bg-white p-4 text-primary sm:w-[340px] sm:p-5">
          {/* Header: avatar + name/title + close */}
          <div className="mb-3 flex items-start gap-3 sm:mb-4">
            <div className="relative shrink-0">
              <Image
                src="/images/founder-kuvaal-patel.png"
                alt="Kuvaal Patel, Founder of Sayso"
                width={44}
                height={44}
                className="h-9 w-9 rounded-full object-cover sm:h-11 sm:w-11"
              />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500 sm:h-3 sm:w-3" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold leading-tight sm:text-base">Kuvaal Patel</p>
              <p className="text-xs text-primary/60 sm:text-sm">Founder of Sayso</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="-mr-1 -mt-1 rounded-full p-1 text-primary/50 transition-colors hover:text-primary"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Headline + description */}
          <h3 className="mb-1 text-base font-bold sm:text-heading">Book your demo with Sayso</h3>
          <p className="mb-3 text-xs leading-relaxed text-primary/70 sm:mb-4 sm:text-sm">
            See how Sayso helps agents say the right thing on every call and turn
            more conversations into booked appointments.
          </p>

          {/* Date pills (cosmetic: any pill opens the Calendly popup) */}
          <div className="mb-3 grid grid-cols-5 gap-1.5 sm:mb-4 sm:gap-2">
            {days.map((d, i) => (
              <button
                key={`${d.weekday}-${d.day}`}
                type="button"
                onClick={() => {
                  setSelected(i);
                  book();
                }}
                className={`flex flex-col items-center rounded-lg border-2 py-1.5 transition-colors sm:py-2 ${
                  selected === i
                    ? 'border-primary bg-primary/5'
                    : 'border-primary/15 hover:border-primary/40'
                }`}
              >
                <span className="text-[10px] text-primary/60 sm:text-xs">{d.weekday}</span>
                <span className="text-sm font-bold leading-tight sm:text-base">{d.day}</span>
              </button>
            ))}
          </div>

          {/* Primary CTA */}
          <button
            type="button"
            onClick={book}
            className="w-full rounded-xl bg-cta py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#1b54c7] sm:py-3 sm:text-base"
          >
            Book a time
          </button>
        </div>
      )}

      {/* Floating launcher */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close demo booking' : 'Book a demo'}
        className="v2-comic-border v2-comic-shadow-sm flex h-12 w-12 items-center justify-center rounded-full bg-cta text-white transition-transform hover:scale-105 sm:h-14 sm:w-14"
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
        )}
      </button>
    </div>
  );
}
