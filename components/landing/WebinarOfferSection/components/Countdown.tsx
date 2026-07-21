'use client';

/**
 * The live countdown display: four tabular boxes (days / hrs / min / sec) that
 * tick down to the next Friday 5:00 PM PT. Shows "--" until mounted to avoid a
 * hydration mismatch. Used in the sticky deadline bar (sm) and final CTA (lg).
 */

import { useFridayCountdown } from '../useFridayCountdown';

const pad = (n: number) => String(n).padStart(2, '0');

export function Countdown({ size = 'sm' }: { size?: 'sm' | 'lg' }) {
  const t = useFridayCountdown();

  const cells: [string, string][] = [
    [t ? String(t.days) : '--', 'days'],
    [t ? pad(t.hours) : '--', 'hrs'],
    [t ? pad(t.minutes) : '--', 'min'],
    [t ? pad(t.seconds) : '--', 'sec'],
  ];

  const box =
    size === 'lg'
      ? 'min-w-[68px] px-3.5 py-2.5 text-2xl'
      : 'min-w-[50px] px-2 py-1 text-sm';

  return (
    <div className="flex gap-1.5 tabular-nums">
      {cells.map(([value, label]) => (
        <span
          key={label}
          className={`rounded-lg bg-white/[0.14] text-center font-extrabold text-white ${box}`}
        >
          {value}
          <small className="block text-[9px] font-medium uppercase tracking-wider opacity-75">
            {label}
          </small>
        </span>
      ))}
    </div>
  );
}
