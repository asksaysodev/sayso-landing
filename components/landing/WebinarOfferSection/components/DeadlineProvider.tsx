'use client';

/**
 * One deadline, one timer. Evaluates the offer deadline from the URL (?d=) on
 * the client and ticks every second, providing the shared countdown state to
 * the whole page. The gate, the sticky bar countdown, and the final CTA
 * countdown all read this one value, so they can never drift a second apart,
 * and the single interval clears itself the moment the offer expires.
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { resolveDeadline, type DeadlineState } from '../deadline';

const INITIAL: DeadlineState = { mounted: false, expired: false, timeLeft: null };

const DeadlineContext = createContext<DeadlineState>(INITIAL);

export function DeadlineProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DeadlineState>(INITIAL);

  useEffect(() => {
    const deadline = resolveDeadline(new URLSearchParams(window.location.search));

    const compute = (): DeadlineState => {
      const ms = deadline == null ? -1 : deadline - Date.now();
      if (ms <= 0) return { mounted: true, expired: true, timeLeft: null };
      return {
        mounted: true,
        expired: false,
        timeLeft: {
          days: Math.floor(ms / 864e5),
          hours: Math.floor((ms % 864e5) / 36e5),
          minutes: Math.floor((ms % 36e5) / 6e4),
          seconds: Math.floor((ms % 6e4) / 1e3),
        },
      };
    };

    const first = compute();
    setState(first);
    // Already expired (or no valid ?d=): nothing to count down, never start a timer.
    if (first.expired) return;

    const id = setInterval(() => {
      const next = compute();
      setState(next);
      if (next.expired) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <DeadlineContext.Provider value={state}>{children}</DeadlineContext.Provider>
  );
}

/** Read the shared deadline state. Must be used under <DeadlineProvider>. */
export function useDeadline(): DeadlineState {
  return useContext(DeadlineContext);
}
