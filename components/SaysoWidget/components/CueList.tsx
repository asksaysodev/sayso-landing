/**
 * The cue list: short arrow cues, newest on top and highlighted. Shows up to
 * four; older ones fade. With no cues yet it says the widget is listening.
 */
import { cx } from '@/lib/utils/cx';
import styles from '../SaysoWidget.module.css';

const MAX_CUES = 4;

export function CueList({ cues }: { cues: string[] }) {
  return (
    <ul className={styles.cues} aria-label="Cues">
      {cues.length === 0 ? (
        <li className={styles.wait}>Listening to the prospect…</li>
      ) : (
        cues.slice(0, MAX_CUES).map((cue, i) => (
          <li key={cue} className={cx(i === 0 && styles.newCue)}>
            <span aria-hidden="true">&rarr; </span>
            {cue}
          </li>
        ))
      )}
    </ul>
  );
}
