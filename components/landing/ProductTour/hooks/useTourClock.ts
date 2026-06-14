'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CHAPTERS, FEATURES } from '../data/scenes';
import type { FeatureKey } from '../types';

const TICK = 100; // ms

/**
 * One clock for the whole tour. Every visual is derived from `elapsed` within
 * the active chapter, so play/pause and jumping between features are free.
 *
 * Chapters auto-advance in pill order while playing and loop back to the first.
 */
export function useTourClock() {
  const [index, setIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(true);

  const feature = FEATURES[index];
  const chapter = CHAPTERS[feature.key];

  // Keep the latest values available to the interval without re-subscribing.
  const elapsedRef = useRef(elapsed);
  elapsedRef.current = elapsed;

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      const next = elapsedRef.current + TICK;
      if (next >= chapter.durationMs) {
        setIndex((i) => (i + 1) % FEATURES.length);
        setElapsed(0);
      } else {
        setElapsed(next);
      }
    }, TICK);
    return () => clearInterval(id);
  }, [playing, chapter.durationMs]);

  const jumpTo = useCallback((key: FeatureKey) => {
    const i = FEATURES.findIndex((f) => f.key === key);
    if (i === -1) return;
    setIndex(i);
    setElapsed(0);
    setPlaying(true);
  }, []);

  const togglePlay = useCallback(() => setPlaying((p) => !p), []);

  const restart = useCallback(() => {
    setIndex(0);
    setElapsed(0);
    setPlaying(true);
  }, []);

  return {
    featureKey: feature.key,
    feature,
    chapter,
    elapsed,
    playing,
    progress: Math.min(1, elapsed / chapter.durationMs),
    jumpTo,
    togglePlay,
    restart,
  };
}
