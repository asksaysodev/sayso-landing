import { Copy, Check } from 'lucide-react';
import type { LpmamaField } from '../../types';

/**
 * The Smart Capture LPMAMA row: six letter dots that fill with color as each
 * field is captured during the call, plus a Copy button. Reproduced from the
 * app's LpmamaRow / LPMAMA_CONFIG.
 */
const CONFIG: { field: LpmamaField; initial: string }[] = [
  { field: 'location', initial: 'L' },
  { field: 'price', initial: 'P' },
  { field: 'motivation', initial: 'M' },
  { field: 'agent', initial: 'A' },
  { field: 'mortgage', initial: 'M' },
  { field: 'appointment', initial: 'A' },
];

interface LpmamaRowProps {
  lpmama: Record<LpmamaField, string | null>;
  copied: boolean;
}

export function LpmamaRow({ lpmama, copied }: LpmamaRowProps) {
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
      <span className="pt-lpmama-dot pt-lpmama-copy" data-copied={copied}>
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </span>
    </div>
  );
}
