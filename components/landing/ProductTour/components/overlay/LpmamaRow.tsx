import type { LpmamaField } from '../../types';

/**
 * The Smart Capture LPMAMA row: six letter dots that fill with color as each
 * field is captured during the call. Reproduced from the app's LPMAMA_CONFIG.
 */
const CONFIG: { field: LpmamaField; initial: string }[] = [
  { field: 'location', initial: 'L' },
  { field: 'price', initial: 'P' },
  { field: 'motivation', initial: 'M' },
  { field: 'agent', initial: 'A' },
  { field: 'mortgage', initial: 'M' },
  { field: 'appointment', initial: 'A' },
];

export function LpmamaRow({ lpmama }: { lpmama: Record<LpmamaField, string | null> }) {
  return (
    <div className="pt-lpmama">
      {CONFIG.map(({ field, initial }) => (
        <span
          key={field}
          className="pt-lpmama-dot"
          data-field={field}
          data-captured={lpmama[field] !== null}
          title={lpmama[field] ?? undefined}
        >
          {initial}
        </span>
      ))}
    </div>
  );
}
