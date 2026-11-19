'use client';

/**
 * Slot-machine drum that fills the blank in the hero question. Three rows
 * are visible through a fixed-height window; the middle (highlighted) row
 * spins to the next name every second with a springy easing. The strip
 * holds three copies of the word list, and once the drum crosses into the
 * last copy it snaps invisibly one full list-length backward, so the loop
 * spins forever without a visible reset and always has rows above and
 * below the window. Size comes from CSS alone, in the server HTML: an
 * invisible stack of every word sets the width to the widest one, and the
 * heights are in em, so the sentence around it never reflows while it spins
 * or when the page hydrates. Screen readers get a single static phrase, and
 * reduced-motion users get instant swaps.
 */

import { useEffect, useRef, useState } from 'react';

const STEP_INTERVAL_MS = 1000;
const SPIN_MS = 560;
const SNAP_DELAY_MS = 620;
/** Row height and window height, in em of the surrounding text. */
const ROW_EM = 1.16;
const WINDOW_EM = ROW_EM * 2.52;

interface DrumWheelProps {
  words: string[];
}

export function DrumWheel({ words }: DrumWheelProps) {
  // Three copies of the list so the window always has neighbors on both
  // sides, and the mid-loop snap lands on an identical row.
  const list = [...words, ...words, ...words];
  const prefersReducedMotion = useRef(false);
  const [index, setIndex] = useState(words.length);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const interval = setInterval(() => {
      setAnimate(!prefersReducedMotion.current);
      setIndex((prev) => prev + 1);
    }, STEP_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  // Once the drum crosses into the last copy of the list, wait for the spin
  // to settle, then snap one full list-length back onto the identical row.
  useEffect(() => {
    if (index < words.length * 2) return;
    const timeout = setTimeout(() => {
      setAnimate(false);
      setIndex((prev) => prev - words.length);
    }, SNAP_DELAY_MS);
    return () => clearTimeout(timeout);
  }, [index, words.length]);

  const offsetEm = (WINDOW_EM - ROW_EM) / 2 - index * ROW_EM;

  return (
    <span
      className="relative inline-block max-w-full align-middle overflow-hidden px-[0.43em]"
      style={{ height: `${WINDOW_EM}em` }}
    >
      <span className="sr-only">your current tools</span>
      {/* Sizer: every word stacked in one grid cell, so the drum is as wide as the widest. */}
      <span aria-hidden="true" className="invisible grid h-0 overflow-hidden">
        {words.map((word) => (
          <span key={word} className="whitespace-nowrap [grid-area:1/1]">
            {word}
          </span>
        ))}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block overflow-hidden"
        style={{
          WebkitMaskImage:
            'linear-gradient(180deg, transparent 0%, black 32%, black 68%, transparent 100%)',
          maskImage:
            'linear-gradient(180deg, transparent 0%, black 32%, black 68%, transparent 100%)',
        }}
      >
        <span
          className="block will-change-transform"
          style={{
            transform: `translateY(${offsetEm}em)`,
            transition: animate ? `transform ${SPIN_MS}ms cubic-bezier(.34,1.3,.48,1)` : 'none',
          }}
        >
          {list.map((word, n) => (
            <span
              key={`${word}-${n}`}
              className={`block whitespace-nowrap text-center transition-[color,opacity,transform] duration-300 ${
                n === index ? 'text-[#2367EE] opacity-100' : 'text-[#9AA5B1] opacity-40 scale-y-90'
              }`}
              style={{ height: `${ROW_EM}em`, lineHeight: `${ROW_EM}em` }}
            >
              {word}
            </span>
          ))}
        </span>
      </span>
    </span>
  );
}
