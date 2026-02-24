'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { SUGGESTIONS, SMART_CAPTURE_SIGNALS } from '../data';

const CYCLE_DURATION = 12000;

export function useShowcaseState() {
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [currentSuggestion, setCurrentSuggestion] = useState(0);
  const [visibleSignals, setVisibleSignals] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycle = useCallback(() => {
    setVisibleSignals(0);
    const signalTimers = SMART_CAPTURE_SIGNALS.map((_, i) =>
      setTimeout(() => setVisibleSignals(i + 1), 2000 + i * 2000)
    );
    return () => signalTimers.forEach(clearTimeout);
  }, []);

  // Timer ticking
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimerSeconds(prev => prev + 1);
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Suggestion cycling
  useEffect(() => {
    const cleanup = startCycle();
    const cycleInterval = setInterval(() => {
      setCurrentSuggestion(prev => (prev + 1) % SUGGESTIONS.length);
      setCycleKey(prev => prev + 1);
    }, CYCLE_DURATION);
    return () => {
      cleanup();
      clearInterval(cycleInterval);
    };
  }, [startCycle]);

  // Restart signal animations on each new suggestion
  useEffect(() => {
    const cleanup = startCycle();
    return cleanup;
  }, [cycleKey, startCycle]);

  return {
    timerSeconds,
    currentSuggestion,
    visibleSignals,
    cycleKey,
  };
}
