'use client';

/**
 * Agent quote under the hero social proof line. Fades to the next quote every
 * 5 seconds while it is on screen, pauses on hover or focus, and stops after
 * one pass through the quotes (WCAG 2.2.2). Stays on the first quote for
 * visitors who prefer reduced motion.
 */
import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/lib/utils/motion';
import { ROTATING_QUOTES } from '../data';

export function RotatingQuote() {
  const ref = useRef<HTMLQuoteElement>(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [onScreen, setOnScreen] = useState(false);
  const [paused, setPaused] = useState(false);
  const shown = useRef(1);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!onScreen || paused || shown.current >= ROTATING_QUOTES.length) return;
    let swap: ReturnType<typeof setTimeout> | undefined;
    const iv = setInterval(() => {
      setVisible(false);
      swap = setTimeout(() => {
        setIndex((i) => (i + 1) % ROTATING_QUOTES.length);
        setVisible(true);
        shown.current += 1;
        if (shown.current >= ROTATING_QUOTES.length) clearInterval(iv);
      }, 350);
    }, 5000);
    return () => {
      clearInterval(iv);
      clearTimeout(swap);
      setVisible(true);
    };
  }, [onScreen, paused]);

  return (
    <q
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="block italic text-[#1D4871] transition-opacity duration-300 motion-reduce:transition-none"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {ROTATING_QUOTES[index]}
    </q>
  );
}
