/**
 * Playbook panel: the agent's script for the selected lead type. Opens beside
 * the widget column, or stacks under it in the narrow layout. A static
 * (non-interactive) widget renders an empty wrapper while closed, so the
 * script text is not in the page HTML.
 */
import { Fragment } from 'react';
import { cx } from '@/lib/utils/cx';
import styles from '../SaysoWidget.module.css';
import type { BindControl } from '../bind';
import { PLAYBOOKS } from '../data';
import type { LeadType } from '../types';
import { ChevronDownIcon } from './icons';

/** Renders `[Placeholders]` in a script line with the placeholder color. */
function ScriptLine({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return (
    <p>
      {'- '}
      {parts.map((part, i) =>
        part.startsWith('[') && part.endsWith(']') ? (
          <span key={i} className={styles.ph}>
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </p>
  );
}

interface PlaybookPanelProps {
  lead: LeadType;
  open: boolean;
  /** Static widgets skip the closed panel's contents (nothing opens it). */
  interactive: boolean;
  bind: BindControl;
}

export function PlaybookPanel({ lead, open, interactive, bind }: PlaybookPanelProps) {
  const script = PLAYBOOKS[lead];
  return (
    <div className={cx(styles.playWrap, open && styles.open)} aria-hidden={!open}>
      {(open || interactive) && (
        <div className={cx(styles.surface, styles.play)}>
          <div className={styles.playHead}>
            <b>
              {script.title} <ChevronDownIcon />
            </b>
            <button {...bind('play', styles.min, { noHighlight: true, hidden: !open })} aria-label="Close playbook">
              <i aria-hidden="true" />
            </button>
          </div>
          <div className={styles.playBody}>
            {script.sections.map((section) => (
              <section key={section.heading}>
                <p className={styles.playHeading}>{section.heading}</p>
                {section.lines.map((line, i) => (
                  <ScriptLine key={i} text={line} />
                ))}
              </section>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
