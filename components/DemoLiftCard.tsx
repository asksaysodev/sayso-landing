'use client';

/**
 * DemoLiftCard
 *
 * A floating "book a demo" launcher that expands into a compact card, styled
 * after the iClosed "LIFT" widget the team liked (avatar + name/title,
 * headline, and a single primary CTA).
 *
 * Rendered on the homepage only (app/page.tsx). The "Book a time" button links
 * to the internal /demo page (which hosts the scheduler), rather than opening
 * the Calendly popup: the in-page navigation is instant and prefetched, where
 * the popup waits on Calendly's script.
 */

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ChevronDown, X } from 'lucide-react';

// Auto-open the card this many ms after load, giving the visitor a moment to
// orient on the page before the card appears.
const AUTO_OPEN_MS = 2500;

export function DemoLiftCard() {
  const [open, setOpen] = useState(false);

  // Auto-open once, shortly after mount.
  useEffect(() => {
    const t = window.setTimeout(() => setOpen(true), AUTO_OPEN_MS);
    return () => window.clearTimeout(t);
  }, []);

  return (
    // z-40 keeps the card above page content but below the navbar + mobile
    // menu (z-50) and the site modals (z-[100]), so open overlays cover it.
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2.5 sm:bottom-5 sm:right-5 sm:gap-3">
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
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          {/* Headline + description */}
          <h3 className="mb-1 text-base font-bold sm:text-heading">Book your demo with Sayso</h3>
          <p className="mb-3 text-xs leading-relaxed text-primary/70 sm:mb-4 sm:text-sm">
            See how Sayso helps agents say the right thing on every call and turn
            more conversations into booked appointments.
          </p>

          {/* Primary CTA: navigate to the internal /demo scheduler page. */}
          <Link
            href="/demo"
            data-analytics-id="cta-book-demo-lift-card"
            className="block w-full rounded-xl bg-cta py-2.5 text-center text-sm font-bold text-white transition-colors hover:bg-[#1b54c7] sm:py-3 sm:text-base"
          >
            Book a time
          </Link>
        </div>
      )}

      {/* Floating launcher */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close demo booking' : 'Book a demo'}
        data-analytics-id="cta-lift-card-toggle"
        className="v2-comic-border v2-comic-shadow-sm flex h-12 w-12 items-center justify-center rounded-full bg-cta text-white transition-transform hover:scale-105 sm:h-14 sm:w-14"
      >
        {open ? (
          <ChevronDown size={24} strokeWidth={2.5} />
        ) : (
          <Calendar size={24} strokeWidth={2} />
        )}
      </button>
    </div>
  );
}
