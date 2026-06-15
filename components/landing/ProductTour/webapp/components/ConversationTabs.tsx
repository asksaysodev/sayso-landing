import { ThumbsUp, ThumbsDown, ArrowUp, ArrowDown, Minus, MapPin } from 'lucide-react';
import {
  LPMAMA_CONFIG,
  CAPTURE_DISPLAY_ORDER,
  type DemoConversation,
  type DemoInsight,
} from '../data';

export type ConversationTab = 'Cue' | 'Smart Capture' | 'Pulse';
const TABS: ConversationTab[] = ['Cue', 'Smart Capture', 'Pulse'];

/** The underline tab bar inside an expanded conversation. */
export function ConversationTabs({
  value,
  onChange,
}: {
  value: ConversationTab;
  onChange?: (tab: ConversationTab) => void;
}) {
  return (
    <div className="conv-tabs">
      {TABS.map((tab) => (
        <button
          key={tab}
          type="button"
          className={`conv-tab${value === tab ? ' conv-tab-on' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onChange?.(tab);
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export function CueTab({ insights }: { insights: DemoInsight[] }) {
  return (
    <div className="conv-cue-list">
      {insights.map((insight, i) => (
        <div key={i} className="conv-cue-row">
          <span className="conv-cue-time">{insight.time}</span>
          <span className="conv-cue-text">{insight.message}</span>
          <div className="conv-cue-fb">
            <span className={`conv-fb-btn${insight.rating === 'up' ? ' conv-fb-btn-up' : ''}`}>
              <ThumbsUp size={16} />
            </span>
            <span className={`conv-fb-btn${insight.rating === 'down' ? ' conv-fb-btn-down' : ''}`}>
              <ThumbsDown size={16} />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SmartCaptureTab({ conversation }: { conversation: DemoConversation }) {
  const byTopic = Object.fromEntries(conversation.captures.map((c) => [c.topic, c.content]));
  const fieldByKey = Object.fromEntries(LPMAMA_CONFIG.map((f) => [f.key, f]));

  return (
    <div className="conv-sc-grid">
      {CAPTURE_DISPLAY_ORDER.map((key) => {
        const field = fieldByKey[key];
        const value = byTopic[key];
        return (
          <div key={key} className={`conv-sc-card${value ? '' : ' conv-sc-empty'}`}>
            <div className="conv-sc-head">
              <span className="conv-sc-badge" style={{ background: value ? field.color : '#c2c8d2' }}>
                {field.letter}
              </span>
              <span className="conv-sc-label">{field.label}</span>
            </div>
            <div className="conv-sc-val">{value || 'Not captured'}</div>
          </div>
        );
      })}
    </div>
  );
}

export function PulseTab({ conversation }: { conversation: DemoConversation }) {
  const p = conversation.pulse;
  if (!p) {
    return <div className="conv-cue-row" style={{ border: 0, color: 'var(--sayso-placeholder)', fontStyle: 'italic' }}>No market data available for this conversation.</div>;
  }
  const Trend = p.trendDir === 'up' ? ArrowUp : p.trendDir === 'down' ? ArrowDown : Minus;
  const trendColor = p.trendDir === 'up' ? '#16a34a' : p.trendDir === 'down' ? '#dc2626' : 'var(--sayso-lightgray)';
  const stats = [
    { label: 'Avg days on market', value: p.daysOnMarket, trend: false },
    { label: 'Avg price / ft²', value: p.pricePerSqft, trend: false },
    { label: 'Price trend', value: p.trendLabel, trend: true },
    { label: 'Market', value: p.market, trend: false },
  ];

  return (
    <div>
      <div className="conv-pulse-loc">
        <MapPin size={15} color="var(--sayso-lightgray)" />
        {p.city}, {p.state} · {p.zip}
      </div>
      <div className="conv-pulse-grid">
        {stats.map((s, i) => (
          <div key={i} className="conv-pulse-card">
            <div className="conv-pulse-label">{s.label}</div>
            <div className="conv-pulse-val">
              {s.trend && <Trend size={14} color={trendColor} />}
              {s.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
