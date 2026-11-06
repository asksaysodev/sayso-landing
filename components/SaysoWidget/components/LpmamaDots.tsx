'use client';

/**
 * The six LPMAMA letters plus the copy button. A letter takes its color when
 * Smart Capture fills it (with a small pop), and hovering, focusing or tapping
 * a filled letter shows its note.
 */
import { useEffect, useRef } from 'react';
import { cx } from '@/lib/utils/cx';
import { prefersReducedMotion } from '@/lib/utils/motion';
import styles from '../SaysoWidget.module.css';
import type { BindControl } from '../bind';
import { DOT_COLORS, LPMAMA } from '../data';
import { CopyIcon } from './icons';

interface LpmamaDotsProps {
  captured: boolean[];
  activeNote: number | null;
  highlightDot: number | null;
  interactive: boolean;
  hidden: boolean;
  bind: BindControl;
  onHover: (index: number | null) => void;
  onSelect?: (index: number) => void;
}

interface DotProps {
  index: number;
  captured: boolean;
  active: boolean;
  highlighted: boolean;
  focusable: boolean;
  onHover: (index: number | null) => void;
  onSelect?: (index: number) => void;
}

function Dot({ index, captured, active, highlighted, focusable, onHover, onSelect }: DotProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const wasCaptured = useRef(captured);

  // Pop the letter when it is captured during a live demo (not on first render).
  useEffect(() => {
    if (captured && !wasCaptured.current && !prefersReducedMotion()) {
      ref.current?.animate?.([{ transform: 'scale(.55)' }, { transform: 'scale(1)' }], {
        duration: 550,
        easing: 'cubic-bezier(.34,1.56,.64,1)',
      });
    }
    wasCaptured.current = captured;
  }, [captured]);

  const { letter, name } = LPMAMA[index];
  const show = () => captured && onHover(index);
  const hide = () => onHover(null);

  return (
    <button
      ref={ref}
      type="button"
      data-dot={index}
      className={cx(styles.dot, active && styles.tipOn, highlighted && styles.target)}
      style={captured ? { background: DOT_COLORS[index] } : undefined}
      aria-label={captured ? `${name}: captured` : `${name}: not captured yet`}
      tabIndex={focusable ? undefined : -1}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      onClick={() => onSelect?.(index)}
      {...(highlighted ? { 'data-tour-target': 'true' } : {})}
    >
      <span aria-hidden="true">{letter}</span>
    </button>
  );
}

export function LpmamaDots({ captured, activeNote, highlightDot, interactive, hidden, bind, onHover, onSelect }: LpmamaDotsProps) {
  return (
    <div className={styles.dots}>
      {LPMAMA.map((item, i) => (
        <Dot
          key={item.name}
          index={i}
          captured={!!captured[i]}
          active={activeNote === i}
          highlighted={highlightDot === i}
          focusable={interactive && !hidden}
          onHover={onHover}
          onSelect={interactive ? onSelect : undefined}
        />
      ))}
      <button {...bind('copy', cx(styles.circ, styles.copy), { hidden })} aria-label="Copy captured notes">
        <CopyIcon />
      </button>
    </div>
  );
}
