'use client';

/**
 * The note bubble for one LPMAMA letter. It always sits under its letter and
 * follows it as the panel grows. Position is read in layout units (offsets
 * inside the widget column), so it is unaffected by WidgetScaler's transform.
 * Static pictures measure once and on resize; the live widget also follows
 * the letter for a moment after each layout change while it is on screen.
 * Optionally draws a mouse cursor beside it for static pictures.
 */
import { useRef, useState, type RefObject } from 'react';
import { cx } from '@/lib/utils/cx';
import { useTrackLayout } from '@/lib/hooks/useTrackLayout';
import styles from '../SaysoWidget.module.css';
import { DOT_COLORS, SAMPLE_NOTES } from '../data';
import { CursorIcon } from './icons';

interface NoteBubbleProps {
  colRef: RefObject<HTMLDivElement>;
  index: number | null;
  showCursor: boolean;
  /** Live widget: follow the letter through panel transitions. */
  follow: boolean;
  /** Changes whenever the column layout may move (panels, cue count). */
  layoutKey: string;
}

/** Offset of `el` inside `ancestor`, summed along the offsetParent chain. */
function offsetWithin(el: HTMLElement, ancestor: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== ancestor) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

export function NoteBubble({ colRef, index, showCursor, follow, layoutKey }: NoteBubbleProps) {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  // Keep the last note so the bubble fades out with its text instead of going blank.
  const lastIndex = useRef<number | null>(index);
  if (index !== null) lastIndex.current = index;
  const shown = lastIndex.current;

  const place = () => {
    const col = colRef.current;
    const dot = index === null ? null : col?.querySelector<HTMLElement>(`[data-dot="${index}"]`);
    if (!col || !dot) return;
    const o = offsetWithin(dot, col);
    const top = o.y + dot.offsetHeight + 12;
    const left = o.x - 4;
    setPos((p) => (p && p.top === top && p.left === left ? p : { top, left }));
  };

  useTrackLayout(colRef, place, { enabled: index !== null, layoutKey: `${index}|${layoutKey}`, follow });

  const on = index !== null && pos !== null;

  return (
    <>
      <div
        className={cx(styles.tip, on && styles.on)}
        style={{ top: pos?.top ?? 0, left: pos?.left ?? 0, background: shown === null ? undefined : DOT_COLORS[shown] }}
        role="status"
        aria-hidden={!on}
      >
        {shown === null ? '' : SAMPLE_NOTES[shown]}
      </div>
      {showCursor && on && pos && (
        <CursorIcon className={styles.cursor} style={{ left: pos.left + 22, top: pos.top - 30 }} />
      )}
    </>
  );
}
