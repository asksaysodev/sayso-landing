'use client';

import { useEffect, useState } from 'react';

// Beat between the objection landing and Sayso's reply appearing.
const RESPOND_DELAY_MS = 1100;
// Total time spent on each objection before advancing to the next one.
const CYCLE_MS = 6200;

/**
 * Drives the hero objection loop: which objection is showing and whether
 * Sayso's response has appeared yet. The effect re-runs on every index change,
 * so each cycle schedules the next one (play/pause-free, no global clock).
 */
export function useObjectionCycle(count: number) {
  const [index, setIndex] = useState(0);
  const [showResponse, setShowResponse] = useState(false);

  useEffect(() => {
    setShowResponse(false);
    const revealId = setTimeout(() => setShowResponse(true), RESPOND_DELAY_MS);
    const nextId = setTimeout(() => setIndex((i) => (i + 1) % count), CYCLE_MS);
    return () => {
      clearTimeout(revealId);
      clearTimeout(nextId);
    };
  }, [index, count]);

  return { index, showResponse };
}
