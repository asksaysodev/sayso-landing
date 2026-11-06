/**
 * The widget toolbar: grip, lead pill, zip pill, reset / stop / timer while a
 * call is live, and the check (cues) and list (Playbook) buttons on the right.
 */
import { cx } from '@/lib/utils/cx';
import styles from '../SaysoWidget.module.css';
import type { BindControl } from '../bind';
import { LEAD_LABELS } from '../data';
import type { LeadType } from '../types';
import { CheckIcon, ChevronUpIcon, ListIcon, ResetIcon, SearchIcon } from './icons';

interface ToolbarProps {
  lead: LeadType;
  live: boolean;
  time: string;
  zipText: string;
  pulseOpen: boolean;
  insightOpen: boolean;
  playbookOpen: boolean;
  morph: boolean;
  bind: BindControl;
}

export function Toolbar({ lead, live, time, zipText, pulseOpen, insightOpen, playbookOpen, morph, bind }: ToolbarProps) {
  return (
    <div className={cx(styles.surface, styles.bar, morph && styles.morphIn)}>
      <span className={styles.grip} aria-hidden="true" />
      <span className={styles.vdiv} aria-hidden="true" />
      <button {...bind('lead', styles.lead)} aria-label={`Lead type: ${LEAD_LABELS[lead]}`}>
        <b aria-hidden="true">{lead}</b>
        <span aria-hidden="true">{LEAD_LABELS[lead]}</span>
      </button>
      <button {...bind('zip', styles.zip)} aria-expanded={pulseOpen} aria-label={`Market data, zip code ${zipText}`}>
        <SearchIcon />
        <span className={styles.typed}>{zipText}</span>
        <ChevronUpIcon className={styles.chev} />
      </button>
      {live && (
        <span className={styles.liveGroup}>
          <button {...bind('reset', cx(styles.circ, styles.reset))} aria-label="Reset call">
            <ResetIcon />
          </button>
          <button {...bind('stop', cx(styles.circ, styles.stop))} aria-label="End call">
            <i aria-hidden="true" />
          </button>
          <span className={styles.timer} role="timer">
            {time}
          </span>
        </span>
      )}
      <span className={styles.right}>
        <button {...bind('cues', cx(styles.circ, styles.icon))} aria-label="Show or hide cues" aria-pressed={insightOpen}>
          <CheckIcon />
        </button>
        <button {...bind('play', cx(styles.circ, styles.icon))} aria-label="Show or hide playbook" aria-pressed={playbookOpen}>
          <ListIcon />
        </button>
      </span>
    </div>
  );
}
