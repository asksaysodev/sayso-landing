'use client';

/**
 * Pulse panel: sample market data for the zip code, with short one-line
 * labels. Optionally counts the numbers up from zero when it opens. A static
 * (non-interactive) widget renders nothing inside a closed panel, so closed
 * placeholder numbers never reach the page HTML.
 */
import { useEffect, useState, useLayoutEffect } from 'react';
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

export function PulsePanel({ open, animate, interactive, bind }: PulsePanelProps) {
  const progress = useCountUp(open, animate);
  const m = SAMPLE_MARKET;

  return (
    <div className={cx(styles.collapse, open && styles.open)} data-collapsed={!open}>
      {(open || interactive) && (
        <div aria-hidden={!open}>
          <div className={cx(styles.surface, styles.pulse)}>
            <div className={styles.pulseCard}>
              <div className={styles.place}>
                <b>{m.zip}</b>
                <b>{m.place}</b>
              </div>
              <ul className={styles.facts}>
                <li>
                  <span>
                    Avg days on market: <b>{Math.round(m.daysOnMarket * progress)}</b>
                  </span>
                </li>
                <li>
                  <span>
                    90-day price trend: <b>{m.priceTrend}</b>
                  </span>
                </li>
                <li>
                  <span>
                    Avg price per ft&sup2;: <b>${Math.round(m.pricePerSqft * progress)}</b>
                  </span>
                </li>
                <li>
                  <span>
                    Inventory: <b>{m.inventory}</b>
                  </span>
                </li>
              </ul>
              <button {...bind('zip', styles.min, { noHighlight: true, hidden: !open })} aria-label="Collapse market data">
                <i aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
