'use client';

/**
 * CalendlyInlineWidget
 *
 * Renders the Calendly demo scheduler inline (embedded directly in the page).
 * Relies on the Calendly widget script loaded globally in the root layout, and
 * initializes the widget once that script is available. Used on the /demo page.
 *
 * If the script never loads (commonly blocked by ad-blockers), polling is
 * capped and a fallback link to the booking page is shown so this high-intent
 * page is never a dead end.
 */

import { useEffect, useRef, useState } from 'react';
import { CALENDLY_DEMO_URL } from '@/lib/calendly';

interface CalendlyInlineWidgetProps {
  url?: string;
  className?: string;
  style?: React.CSSProperties;
}

// Poll for the Calendly script for ~5s (25 x 200ms) before giving up.
const MAX_INIT_ATTEMPTS = 25;
const INIT_RETRY_MS = 200;

export function CalendlyInlineWidget({
  url = CALENDLY_DEMO_URL,
  className,
  style,
}: CalendlyInlineWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;
    let attempts = 0;

    function init() {
      if (cancelled || !el) return;
      if (window.Calendly) {
        // Clear any prior render before (re)initializing on client navigation.
        el.innerHTML = '';
        window.Calendly.initInlineWidget({ url, parentElement: el });
      } else if (attempts < MAX_INIT_ATTEMPTS) {
        attempts += 1;
        window.setTimeout(init, INIT_RETRY_MS);
      } else {
        // Script never loaded (blocked/offline): show the fallback link.
        setFailed(true);
      }
    }

    setFailed(false);
    init();

    return () => {
      cancelled = true;
    };
  }, [url]);

  if (failed) {
    return (
      <div className={className} style={style} role="alert">
        <div className="flex h-full flex-col items-center justify-center gap-4 px-6 py-12 text-center">
          <p className="text-lg text-[#1D4871]">
            The scheduler did not load. It may be blocked by a browser
            extension or ad-blocker.
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#2367EE] px-6 py-3 font-bold text-white border-2 border-[#1D4871] transition-colors hover:bg-[#1b54c7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4871] focus-visible:ring-offset-2"
          >
            Open the booking page in a new tab
          </a>
        </div>
      </div>
    );
  }

  return <div ref={containerRef} className={className} style={style} />;
}
