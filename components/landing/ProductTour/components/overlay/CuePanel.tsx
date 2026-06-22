import { useEffect, useRef, useState } from 'react';
import type { PromptEvent } from '../../types';

/**
 * The Cue panel: coaching prompts that stack and stay on screen as the call
 * progresses, with a Condensed / Full toggle. Condensed shows short coaching
 * directives; Full shows the suggested wording the agent can say verbatim.
 *
 * It auto-starts on Full (so the visitor reads the real wording), then switches
 * to Condensed after a few seconds, and resets to Full when the chapter loops.
 * A manual click on either toggle takes over until the next loop.
 */
// Scene-ms before the view auto-switches from Full to Condensed (~5s real time).
const FULL_VIEW_MS = 3700;

interface CuePanelProps {
  prompts: { condensed: PromptEvent[]; full: PromptEvent[] };
  elapsed: number;
}

export function CuePanel({ prompts, elapsed }: CuePanelProps) {
  const [override, setOverride] = useState<'condensed' | 'full' | null>(null);
  const prevElapsed = useRef(elapsed);

  // Clear the manual override when the chapter loops (elapsed jumps back down).
  useEffect(() => {
    if (elapsed < prevElapsed.current) setOverride(null);
    prevElapsed.current = elapsed;
  }, [elapsed]);

  const autoView = elapsed < FULL_VIEW_MS ? 'full' : 'condensed';
  const view = override ?? autoView;
  const list = view === 'condensed' ? prompts.condensed : prompts.full;

  return (
    <div className="pt-glass pt-cue-panel">
      <div className="pt-cue-toggle">
        <button
          type="button"
          className="pt-cue-toggle-btn"
          data-active={view === 'condensed'}
          onClick={() => setOverride('condensed')}
        >
          Condensed
        </button>
        <button
          type="button"
          className="pt-cue-toggle-btn"
          data-active={view === 'full'}
          onClick={() => setOverride('full')}
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
