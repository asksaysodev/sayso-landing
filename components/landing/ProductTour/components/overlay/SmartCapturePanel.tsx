import { Check, ArrowDownToLine } from 'lucide-react';
import type { LpmamaField } from '../../types';
import { LpmamaRow } from './LpmamaRow';

/**
 * The Smart Capture panel: a banner announcing the detail just captured, the
 * LPMAMA dots filling as the call happens, and a "Sync to Follow Up Boss"
 * button. When pressed (driven by the scene timeline), it flips to a synced
 * state and the structured note logs into the CRM timeline.
 */
interface SmartCapturePanelProps {
  lpmama: Record<LpmamaField, string | null>;
  recentCapture: { field: LpmamaField; label: string; value: string } | null;
  synced: boolean;
}

export function SmartCapturePanel({ lpmama, recentCapture, synced }: SmartCapturePanelProps) {
  return (
    <div className="pt-glass pt-insights">
      <div className="pt-capture-banner">
        {recentCapture ? (
          <>
            <span className="pt-capture-label">{recentCapture.label}:</span>{' '}
            <span className="pt-capture-value">{recentCapture.value}</span>
          </>
        ) : (
          <span className="pt-capture-idle">Capturing key details…</span>
        )}
      </div>

      <LpmamaRow lpmama={lpmama} />

      <button className="pt-sync-btn" data-synced={synced} type="button">
        {synced ? (
          <>
            <Check size={14} />
            Synced to Follow Up Boss
          </>
        ) : (
          <>
            <ArrowDownToLine size={14} />
            Sync to Follow Up Boss
          </>
        )}
      </button>
    </div>
  );
}
