/**
 * Caption above the widget on the demo stage: a yellow hint, or a
 * "Prospect is talking…" indicator while the scripted prospect speaks.
 */
import { cx } from '@/lib/utils/cx';
import styles from '../LiveDemo.module.css';
import type { Caption } from '../types';

export function StageCaption({ caption }: { caption: Caption }) {
  return (
    <div className={styles.caption} aria-live="polite">
      {caption.kind === 'hint' && <div className={cx(styles.captionPill, styles.hint)}>{caption.text}</div>}
      {caption.kind === 'talk' && (
        <div className={cx(styles.captionPill, styles.talk)}>
          <span className={styles.bars} aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          Prospect is talking…
        </div>
      )}
    </div>
  );
}
