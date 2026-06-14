import type { LpmamaField } from '../../types';

/**
 * The Smart Capture LPMAMA row: six letter dots that fill with color as each
 * field is captured during the call. When a field is captured, a small bubble
 * pops above its dot showing what was just captured.
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
  recentCapture: { field: LpmamaField; label: string; value: string } | null;
}

export function LpmamaRow({ lpmama, recentCapture }: LpmamaRowProps) {
  return (
    <div className="pt-lpmama">
      {CONFIG.map(({ field, initial }) => (
        <span key={field} className="pt-lpmama-dot-wrap">
          {recentCapture?.field === field && (
            <span className="pt-capture-bubble">
              <span className="pt-capture-label">{recentCapture.label}</span>
              <span className="pt-capture-value">{recentCapture.value}</span>
            </span>
          )}
          <span
            className="pt-lpmama-dot"
            data-field={field}
            data-captured={lpmama[field] !== null}
          >
            {initial}
          </span>
        </span>
      ))}
    </div>
  );
}
