'use client';

/**
 * The animated blank line in the hero question. Cycles through competitor
 * names with a short fade-and-rise transition, sitting on a yellow underline
 * so the slot reads as a fill-in-the-blank. Screen readers get a single
 * static phrase instead of the rotating text, and users with reduced motion
 * enabled get instant swaps with no animation.
 */

import { useEffect, useRef, useState } from 'react';

const ROTATE_INTERVAL_MS = 2400;
const FADE_MS = 250;

interface RotatingCompetitorProps {
  items: string[];
}

export function RotatingCompetitor({ items }: RotatingCompetitorProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const interval = setInterval(() => {
      if (prefersReducedMotion.current) {
        setIndex((prev) => (prev + 1) % items.length);
        return;
      }
      setVisible(false);
      window.setTimeout(() => {
        setIndex((prev) => (prev + 1) % items.length);
        setVisible(true);
      }, FADE_MS);
    }, ROTATE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <span className="inline-block border-b-4 border-[#FFDE59] px-2 pb-1 min-w-[5ch] text-center align-baseline">
      <span className="sr-only">other coaching tools</span>
      <span
        aria-hidden="true"
        className={`inline-block whitespace-nowrap text-[#FFDE59] transition-all ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
        style={{ transitionDuration: `${FADE_MS}ms` }}
      >
        {items[index]}
      </span>
    </span>
  );
}
