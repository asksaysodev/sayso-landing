'use client';

/**
 * CalendlyInlineWidget
 *
 * Renders the Calendly demo scheduler inline (embedded directly in the page).
 * Relies on the Calendly widget script loaded globally in the root layout, and
 * initializes the widget once that script is available. Used on the /demo page.
 */

import { useEffect, useRef } from 'react';
import { CALENDLY_DEMO_URL } from '@/lib/calendly';

interface CalendlyInlineWidgetProps {
  url?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function CalendlyInlineWidget({
  url = CALENDLY_DEMO_URL,
  className,
  style,
}: CalendlyInlineWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;

    function init() {
      if (cancelled || !el) return;
      if (window.Calendly) {
        // Clear any prior render before (re)initializing on client navigation.
        el.innerHTML = '';
        window.Calendly.initInlineWidget({ url, parentElement: el });
      } else {
        // Script not ready yet; retry shortly.
        window.setTimeout(init, 200);
      }
    }

    init();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return <div ref={containerRef} className={className} style={style} />;
}
