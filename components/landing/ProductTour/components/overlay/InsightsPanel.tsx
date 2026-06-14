import type { LpmamaField } from '../../types';
import { LpmamaRow } from './LpmamaRow';

/**
 * The Sayso "eye" panel: a stack of coaching insight cards (newest on top, the
 * active one highlighted) with the LPMAMA row at the bottom. Reproduced from the
 * app's InsightsVerticalLayout + LpmamaRow.
 */
interface InsightsPanelProps {
  insights: { id: string; text: string }[];
  lpmama: Record<LpmamaField, string | null>;
  copied: boolean;
  showLpmama: boolean;
}

export function InsightsPanel({ insights, lpmama, copied, showLpmama }: InsightsPanelProps) {
  return (
    <div className="pt-glass pt-insights">
      {insights.map((insight, i) => (
        <div
          key={insight.id}
          className="pt-insight-item pt-insight-enter"
          data-active={i === 0}
        >
          <p className="pt-insight-text">{insight.text}</p>
        </div>
      ))}
      {showLpmama && <LpmamaRow lpmama={lpmama} copied={copied} />}
    </div>
  );
}
