'use client';

/**
 * DemoLiftCard  —  PREVIEW / DO NOT MERGE
 *
 * A floating "book a demo" launcher that expands into a rich card, styled after
 * the iClosed "LIFT" widget the team liked (avatar + name/title, headline, a
 * scarcity countdown, a row of date pills, and a primary CTA).
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

// Urgency timer starts here and counts down to 0:00 (purely cosmetic).
const COUNTDOWN_SECONDS = 3 * 60;
// Auto-open the card this many ms after load so the preview is easy to see.
const AUTO_OPEN_MS = 2500;

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

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
  const [remaining, setRemaining] = useState(COUNTDOWN_SECONDS);
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

  // Tick the urgency countdown while the card is open.
  useEffect(() => {
    if (!open) return;
    const id = window.setInterval(() => {
      setRemaining((r) => (r > 0 ? r - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [open]);

  if (!mounted) return null;

  const book = () => openCalendlyPopup();
  const progress = (remaining / COUNTDOWN_SECONDS) * 100;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col items-end gap-3">
      {open && (
        <div className="v2-comic-border v2-comic-shadow w-[340px] max-w-[calc(100vw-2.5rem)] rounded-2xl bg-white p-5 text-primary">
          {/* Header: avatar + name/title + close */}
          <div className="mb-4 flex items-start gap-3">
            <div className="relative shrink-0">
              <Image
                src="/images/founder-kuvaal-patel.png"
                alt="Kuvaal Patel, Founder of Sayso"
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold leading-tight">Kuvaal Patel</p>
              <p className="text-sm text-primary/60">Founder of Sayso</p>
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
          <h3 className="mb-1 text-heading font-bold">Book your demo with Sayso</h3>
          <p className="mb-4 text-sm leading-relaxed text-primary/70">
            See how Sayso helps agents say the right thing on every call and turn
            more conversations into booked appointments.
          </p>

          {/* Scarcity bar + countdown */}
          <div className="mb-4 rounded-xl border border-primary/15 bg-background px-4 py-3">
            <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-primary/10">
              <div
                className="h-full rounded-full bg-cta transition-[width] duration-1000 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-primary/70">Only a few slots left.</span>
              <span className="font-bold tabular-nums text-primary">
                {formatTime(remaining)}
              </span>
            </div>
          </div>

          {/* Date pills (cosmetic: any pill opens the Calendly popup) */}
          <div className="mb-4 grid grid-cols-5 gap-2">
            {days.map((d, i) => (
              <button
                key={`${d.weekday}-${d.day}`}
                type="button"
                onClick={() => {
                  setSelected(i);
                  book();
                }}
                className={`flex flex-col items-center rounded-lg border-2 py-2 transition-colors ${
                  selected === i
                    ? 'border-primary bg-primary/5'
                    : 'border-primary/15 hover:border-primary/40'
                }`}
              >
                <span className="text-xs text-primary/60">{d.weekday}</span>
                <span className="text-base font-bold leading-tight">{d.day}</span>
              </button>
            ))}
          </div>

          {/* Primary CTA */}
          <button
            type="button"
            onClick={book}
            className="w-full rounded-xl bg-cta py-3 font-bold text-white transition-colors hover:bg-[#1b54c7]"
          >
            Schedule a demo
          </button>
        </div>
      )}

      {/* Floating launcher */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close demo booking' : 'Book a demo'}
        className="v2-comic-border v2-comic-shadow-sm flex h-14 w-14 items-center justify-center rounded-full bg-cta text-white transition-transform hover:scale-105"
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
