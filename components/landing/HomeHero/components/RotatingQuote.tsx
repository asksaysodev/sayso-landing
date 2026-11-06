'use client';

/**
 * Agent quote under the hero social proof line. Fades to the next quote every
 * 5 seconds while it is on screen; stays on the first quote for visitors who
 * prefer reduced motion.
 */
import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/lib/utils/motion';
import { ROTATING_QUOTES } from '../data';

export function RotatingQuote() {
  const ref = useRef<HTMLQuoteElement>(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!onScreen) return;
    let swap: ReturnType<typeof setTimeout> | undefined;
    const iv = setInterval(() => {
      setVisible(false);
      swap = setTimeout(() => {
        setIndex((i) => (i + 1) % ROTATING_QUOTES.length);
        setVisible(true);
      }, 350);
    }, 5000);
    return () => {
      clearInterval(iv);
      clearTimeout(swap);
      setVisible(true);
    };
  }, [onScreen]);

  return (
    <q
      ref={ref}
      className="block italic text-[#1D4871] transition-opacity duration-300 motion-reduce:transition-none"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {ROTATING_QUOTES[index]}
    </q>
  );
}
