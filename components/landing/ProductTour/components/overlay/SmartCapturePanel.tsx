import { Check, ArrowDownToLine } from 'lucide-react';
import type { LpmamaField } from '../../types';
import { LpmamaRow } from './LpmamaRow';

/**
 * The Smart Capture panel: the LPMAMA dots filling as the call happens, plus a
 * "Sync to Follow Up Boss" button. When pressed (driven by the scene timeline),
 * it flips to a synced state and the structured note logs into the CRM timeline.
 */
interface SmartCapturePanelProps {
  lpmama: Record<LpmamaField, string | null>;
  synced: boolean;
}

export function SmartCapturePanel({ lpmama, synced }: SmartCapturePanelProps) {
  return (
    <div className="pt-glass pt-insights">
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
