'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CHAPTERS, FEATURES } from '../data/scenes';
import type { FeatureKey } from '../types';

const TICK = 100; // real ms between updates
// Playback speed: >1 plays the scripted timeline slower than real time so the
// demo is easy to follow. Scene times in the data stay unchanged.
const TIME_SCALE = 1.8;
const STEP = TICK / TIME_SCALE; // scene-ms advanced per real tick

/**
 * One clock for the tour. `elapsed` is in scene milliseconds (matching the data
 * in scenes.ts); every visual is derived from it, so play/pause and jumping are
 * free. Chapters do NOT auto-advance: the active chapter loops until the visitor
 * picks another feature pill.
 */
export function useTourClock() {
  const [index, setIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(true);

  const feature = FEATURES[index];
  const chapter = CHAPTERS[feature.key];

  const elapsedRef = useRef(elapsed);
  elapsedRef.current = elapsed;

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      const next = elapsedRef.current + STEP;
      // Loop the same chapter rather than advancing to the next one.
      setElapsed(next >= chapter.durationMs ? 0 : next);
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
    setElapsed(0);
    setPlaying(true);
  }, []);

  return {
    featureKey: feature.key,
    feature,
    chapter,
    elapsed,
    playing,
    jumpTo,
    togglePlay,
    restart,
  };
}
