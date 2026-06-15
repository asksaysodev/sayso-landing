import { useState } from 'react';
import type { PromptEvent } from '../../types';

/**
 * The Cue panel: coaching prompts that stack and stay on screen as the call
 * progresses, with a Condensed / Full toggle. Condensed shows short coaching
 * directives; Full shows the suggested wording the agent can say verbatim.
 */
interface CuePanelProps {
  prompts: { condensed: PromptEvent[]; full: PromptEvent[] };
}

export function CuePanel({ prompts }: CuePanelProps) {
  const [view, setView] = useState<'condensed' | 'full'>('condensed');
  const list = view === 'condensed' ? prompts.condensed : prompts.full;

  return (
    <div className="pt-glass pt-cue-panel">
      <div className="pt-cue-toggle">
        <button
          type="button"
          className="pt-cue-toggle-btn"
          data-active={view === 'condensed'}
          onClick={() => setView('condensed')}
        >
          Condensed
        </button>
        <button
          type="button"
          className="pt-cue-toggle-btn"
          data-active={view === 'full'}
          onClick={() => setView('full')}
        >
          Full
        </button>
      </div>

      <ul className="pt-cue-list">
        {list.map((prompt, i) => (
          <li
            key={`${view}-${prompt.at}`}
            className="pt-insight-item pt-insight-enter"
            data-active={i === list.length - 1}
          >
            <p className="pt-insight-text">
              {view === 'condensed' && <span className="pt-cue-arrow">→ </span>}
              {prompt.text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
