import { List, Minus } from 'lucide-react';
import type { PlaybookScene } from '../../types';

/**
 * The Playbook side panel: the agent's own script, on screen beside the live
 * coaching. Variables like [Name] / [Street] are highlighted. Reproduced from
 * the app's playbook window content style.
 */
const VAR_PATTERN = /(\[[^\]]+\])/g;

function renderWithVars(text: string) {
  return text.split(VAR_PATTERN).map((part, i) =>
    part.startsWith('[') && part.endsWith(']') ? (
      <span key={i} className="pt-playbook-var">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function PlaybookPanel({ playbook }: { playbook: PlaybookScene }) {
  return (
    <div className="pt-glass pt-playbook pt-fade-up">
      <div className="pt-playbook-header">
        <span className="flex items-center gap-2">
          <List size={15} />
          Playbooks
        </span>
        <Minus size={15} className="text-white/50" />
      </div>
      {playbook.sections.map((section) => (
        <div key={section.heading}>
          <div className="pt-playbook-section">{section.heading}</div>
          {section.bullets.map((bullet, i) => (
            <p key={i} className="pt-playbook-bullet">
              - {renderWithVars(bullet)}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
