'use client';

/**
 * Pulse panel: sample market data for the zip code, laid out like the app:
 * city and zip, the Single Family / Condo switch, then six facts in two
 * columns. Optionally counts the numbers up from zero when it opens. A static
 * (non-interactive) widget renders nothing inside a closed panel, so closed
 * placeholder numbers never reach the page HTML.
 */
import { useEffect, useState, useLayoutEffect, type ReactNode } from 'react';
import { cx } from '@/lib/utils/cx';
import { prefersReducedMotion } from '@/lib/utils/motion';
import styles from '../SaysoWidget.module.css';
import type { BindControl } from '../bind';
import { SAMPLE_MARKET } from '../data';

interface PulsePanelProps {
  open: boolean;
  animate: boolean;
  /** Static widgets skip the closed panel's contents (nothing opens it). */
  interactive: boolean;
  bind: BindControl;
}

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/** 0 to 1 progress of the count-up, eased out. Starts at 1 so static views show final numbers. */
function useCountUp(open: boolean, animate: boolean): number {
  const [progress, setProgress] = useState(1);

  // Layout effect: reset to 0 before the first open frame paints, so final numbers never flash.
  useIsoLayoutEffect(() => {
    if (!open || !animate || prefersReducedMotion()) {
      setProgress(1);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 900);
      setProgress(1 - Math.pow(1 - p, 3));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    setProgress(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [open, animate]);

  return open ? progress : 0;
}

const usd = (n: number, cents = false) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0 })}`;

const TREND_ARROW = { up: '\u2197', down: '\u2198', flat: '\u2192' } as const;

/** The small "i" next to each fact, as in the app. Decorative here. */
function InfoIcon() {
  return (
    <svg className={styles.info} viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 7.2v3.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="8" cy="5" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function PulsePanel({ open, animate, interactive, bind }: PulsePanelProps) {
  const progress = useCountUp(open, animate);
  const m = SAMPLE_MARKET;
  const n = (v: number) => v * progress;

  const facts: { label: string; value: ReactNode }[] = [
    { label: 'Median Price', value: usd(Math.round(n(m.medianPrice))) },
    { label: 'Median Price / Sq Ft', value: usd(n(m.medianPricePerSqft), true) },
    { label: 'Median Days on Market', value: Math.round(n(m.medianDaysOnMarket)) },
    { label: 'New Listings', value: Math.round(n(m.newListings)) },
    { label: 'Market', value: m.market },
    {
      label: 'L90D Price Trend',
      value: (
        <span className={styles.trend} role="img" aria-label={`Price trend ${m.priceTrend}`}>
          {TREND_ARROW[m.priceTrend]}
        </span>
      ),
    },
  ];

  return (
    <div className={cx(styles.collapse, open && styles.open)} data-collapsed={!open}>
      {(open || interactive) && (
        <div aria-hidden={!open}>
          <div className={cx(styles.surface, styles.pulse)}>
            <div className={styles.pulseCard}>
              <div className={styles.pulseHead}>
                <b className={styles.place}>
                  {m.place} - {m.zip}
                </b>
                <button {...bind('zip', styles.min, { noHighlight: true, hidden: !open })} aria-label="Collapse market data">
                  <i aria-hidden="true" />
                </button>
              </div>
              <div className={styles.homeType} aria-hidden="true">
                <span className={styles.homeTypeOn}>Single Family</span>
                <span>Condo</span>
              </div>
              <ul className={styles.facts}>
                {facts.map((f) => (
                  <li key={f.label}>
                    <span>
                      {f.label}: <b>{f.value}</b>
                    </span>
                    <InfoIcon />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
