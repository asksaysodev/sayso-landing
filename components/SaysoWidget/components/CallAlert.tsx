'use client';

/**
 * The call alert Sayso shows when it detects a call: the white bolt,
 * "Sayso identified a call", a Start button and an X with a countdown ring.
 */
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { cx } from '@/lib/utils/cx';
import { prefersReducedMotion } from '@/lib/utils/motion';
import styles from '../SaysoWidget.module.css';
import type { BindControl } from '../bind';

interface CallAlertProps {
  leaving?: boolean;
  nudge?: number;
  bind: BindControl;
}

const SHAKE: Keyframe[] = [
  { transform: 'translateX(0)' },
  { transform: 'translateX(-6px)', offset: 0.2 },
  { transform: 'translateX(6px)', offset: 0.4 },
  { transform: 'translateX(-6px)', offset: 0.6 },
  { transform: 'translateX(6px)', offset: 0.8 },
  { transform: 'translateX(0)' },
];

export function CallAlert({ leaving, nudge = 0, bind }: CallAlertProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!nudge || prefersReducedMotion()) return;
    ref.current?.animate?.(SHAKE, { duration: 450, easing: 'ease' });
  }, [nudge]);

  return (
    <div ref={ref} className={cx(styles.detect, leaving && styles.detectOut)}>
      <Image className={styles.bolt} src="/images/bolt-white.png" alt="" width={22} height={28} />
      <span className={styles.detectLabel}>Sayso identified a call</span>
      <button {...bind('start', styles.go)}>Start</button>
      <button {...bind('dismiss', styles.x)} aria-label="Dismiss">
        <svg aria-hidden="true" viewBox="0 0 44 44">
          <circle cx="22" cy="22" r="21" />
        </svg>
        <span aria-hidden="true">&#10005;</span>
      </button>
    </div>
  );
}
