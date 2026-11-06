/**
 * The cues and LPMAMA panel, opened with the check button: the cue list, the
 * six capture letters, the copy button and its "Copied" toast.
 */
import { cx } from '@/lib/utils/cx';
import styles from '../SaysoWidget.module.css';
import type { BindControl } from '../bind';
import { CueList } from './CueList';
import { LpmamaDots } from './LpmamaDots';

interface InsightPanelProps {
  open: boolean;
  cues: string[];
  captured: boolean[];
  activeNote: number | null;
  highlightDot: number | null;
  watch: boolean;
  toast: boolean;
  interactive: boolean;
  bind: BindControl;
  onHover: (index: number | null) => void;
  onSelect?: (index: number) => void;
}

export function InsightPanel({ open, cues, captured, activeNote, highlightDot, watch, toast, interactive, bind, onHover, onSelect }: InsightPanelProps) {
  return (
    <div className={cx(styles.collapse, open && styles.open)} data-collapsed={!open}>
      {(open || interactive) && (
        <div aria-hidden={!open}>
          <div className={cx(styles.surface, styles.insight, watch && styles.watch)}>
            <CueList cues={cues} />
            <LpmamaDots
              captured={captured}
              activeNote={activeNote}
              highlightDot={highlightDot}
              interactive={interactive}
              hidden={!open}
              bind={bind}
              onHover={onHover}
              onSelect={onSelect}
            />
            <span className={cx(styles.toast, toast && styles.on)} role="status">
              {toast ? 'Copied notes for your CRM' : ''}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
