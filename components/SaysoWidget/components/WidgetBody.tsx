'use client';

/**
 * The full widget: toolbar, Pulse, cues and LPMAMA in one column, Playbook beside it (or under it when stacked). Holds the only state the widget
 * owns itself: which note is hovered and whether the "Copied" toast shows.
 * Everything else comes from props.
 */
import { useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/utils/cx';
import styles from '../SaysoWidget.module.css';
import { makeBind } from '../bind';
import { SAMPLE_MARKET } from '../data';
import type { SaysoWidgetProps, WidgetControl } from '../types';
import { InsightPanel } from './InsightPanel';
import { NoteBubble } from './NoteBubble';
import { PlaybookPanel } from './PlaybookPanel';
import { PulsePanel } from './PulsePanel';
import { Toolbar } from './Toolbar';

const NO_CAPTURES = [false, false, false, false, false, false];

export function WidgetBody(props: SaysoWidgetProps & { stacked: boolean }) {
  const {
    lead = 'B',
    live = false,
    time = '0:00:00',
    insightOpen = false,
    cues = [],
    captured = NO_CAPTURES,
    note = null,
    showCursor = false,
    pulseOpen = false,
    zipText,
    animatePulse = false,
    playbookOpen = false,
    stacked,
    morph = false,
    highlight,
    highlightDot = null,
    watchInsight = false,
    interactive = false,
    onAction,
    onDotSelect,
  } = props;

  const colRef = useRef<HTMLDivElement>(null);
  const [hoverNote, setHoverNote] = useState<number | null>(null);
  const [toast, setToast] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const handleAction = (control: WidgetControl) => {
    if (control === 'copy') {
      setToast(true);
      clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToast(false), 1400);
    }
    onAction?.(control);
  };

  const bind = makeBind(interactive, highlight, handleAction);
  const activeNote = insightOpen ? hoverNote ?? note : null;

  return (
    <div
      className={cx(styles.root, stacked && styles.stacked, !interactive && styles.static, props.className)}
      aria-hidden={interactive ? undefined : true}
    >
      <div className={styles.col} ref={colRef}>
        <Toolbar
          lead={lead}
          live={live}
          time={time}
          zipText={zipText ?? (pulseOpen ? SAMPLE_MARKET.zip : 'Zip Code')}
          pulseOpen={pulseOpen}
          insightOpen={insightOpen}
          playbookOpen={playbookOpen}
          morph={morph}
          bind={bind}
        />
        <PulsePanel open={pulseOpen} animate={animatePulse} interactive={interactive} bind={bind} />
        <InsightPanel
          open={insightOpen}
          cues={cues}
          captured={captured}
          activeNote={activeNote}
          highlightDot={highlightDot}
          watch={watchInsight}
          toast={toast}
          interactive={interactive}
          bind={bind}
          onHover={setHoverNote}
          onSelect={onDotSelect}
        />
        <NoteBubble
          colRef={colRef}
          index={activeNote}
          showCursor={showCursor}
          follow={interactive}
          layoutKey={[insightOpen, cues.length, pulseOpen, zipText ?? '', playbookOpen, live].join('|')}
        />
      </div>
      <PlaybookPanel lead={lead} open={playbookOpen} interactive={interactive} bind={bind} />
    </div>
  );
}
