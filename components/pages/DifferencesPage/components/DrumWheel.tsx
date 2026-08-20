'use client';

/**
 * Slot-machine drum that fills the blank in the hero question. Three rows
 * are visible through a fixed-height window; the middle (highlighted) row
 * spins to the next name every second with a springy easing. The strip
 * holds three copies of the word list, and once the drum crosses into the
 * last copy it snaps invisibly one full list-length backward, so the loop
 * spins forever without a visible reset and always has rows above and
 * below the window. The drum is sized once to the widest word so the
 * sentence around it never shifts while it spins. Screen readers get a
 * single static phrase, and reduced-motion users get instant swaps.
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

const STEP_INTERVAL_MS = 1000;
const SPIN_MS = 560;
const SNAP_DELAY_MS = 620;

interface DrumWheelProps {
  words: string[];
}

export function DrumWheel({ words }: DrumWheelProps) {
  // Three copies of the list so the window always has neighbors on both
  // sides, and the mid-loop snap lands on an identical row.
  const list = [...words, ...words, ...words];
  const wheelRef = useRef<HTMLSpanElement>(null);
  const stripRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useRef(false);
  const [index, setIndex] = useState(words.length);
  const [animate, setAnimate] = useState(false);
  const [dims, setDims] = useState({ width: 0, rowHeight: 0, height: 0 });

  // Size the drum to the widest word using the strip's actual font, so the
  // surrounding sentence never reflows as names of different lengths spin by.
  const layout = useCallback(() => {
    const wheel = wheelRef.current;
    const strip = stripRef.current;
    const firstRow = strip?.children[0] as HTMLElement | undefined;
    if (!wheel || !firstRow) return;

    const rowStyle = getComputedStyle(firstRow);
    const measure = document.createElement('span');
    measure.style.position = 'absolute';
    measure.style.visibility = 'hidden';
    measure.style.whiteSpace = 'nowrap';
    measure.style.left = '-9999px';
    measure.style.fontFamily = rowStyle.fontFamily;
    measure.style.fontSize = rowStyle.fontSize;
    measure.style.fontWeight = rowStyle.fontWeight;
    measure.style.letterSpacing = rowStyle.letterSpacing;
    document.body.appendChild(measure);
    let widest = 0;
    for (const word of words) {
      measure.textContent = word;
      widest = Math.max(widest, measure.offsetWidth);
    }
    measure.remove();

    const fontSize = parseFloat(rowStyle.fontSize);
    const wheelStyle = getComputedStyle(wheel);
    const paddingX =
      parseFloat(wheelStyle.paddingLeft) +
      parseFloat(wheelStyle.paddingRight) +
      parseFloat(wheelStyle.borderLeftWidth) +
      parseFloat(wheelStyle.borderRightWidth);
    const rowHeight = Math.round(fontSize * 1.16);
    setDims({
      width: Math.ceil(widest + paddingX + fontSize * 0.3),
      rowHeight,
      height: Math.round(rowHeight * 2.52),
    });
  }, [words]);

  useLayoutEffect(() => {
    layout();
  }, [layout]);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.addEventListener('resize', layout);
    document.fonts?.ready.then(layout);
    const interval = setInterval(() => {
      setAnimate(!prefersReducedMotion.current);
      setIndex((prev) => prev + 1);
    }, STEP_INTERVAL_MS);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', layout);
    };
  }, [layout]);

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

  const offset = dims.rowHeight ? (dims.height - dims.rowHeight) / 2 - index * dims.rowHeight : 0;

  return (
    <span
      ref={wheelRef}
      className="relative inline-block align-middle overflow-hidden px-[0.28em]"
      style={{
        width: dims.width || undefined,
        height: dims.height || undefined,
        visibility: dims.width ? 'visible' : 'hidden',
      }}
    >
      <span className="sr-only">your current tools</span>
      <span
        aria-hidden="true"
        className="block overflow-hidden"
        style={{
          height: dims.height || undefined,
          WebkitMaskImage:
            'linear-gradient(180deg, transparent 0%, black 32%, black 68%, transparent 100%)',
          maskImage:
            'linear-gradient(180deg, transparent 0%, black 32%, black 68%, transparent 100%)',
        }}
      >
        <span
          ref={stripRef}
          className="block will-change-transform"
          style={{
            transform: `translateY(${offset}px)`,
            transition: animate ? `transform ${SPIN_MS}ms cubic-bezier(.34,1.3,.48,1)` : 'none',
          }}
        >
          {list.map((word, n) => (
            <span
              key={`${word}-${n}`}
              className={`block whitespace-nowrap text-center transition-[color,opacity,transform] duration-300 ${
                n === index ? 'text-[#2367EE] opacity-100' : 'text-[#9AA5B1] opacity-40 scale-y-90'
              }`}
              style={{
                height: dims.rowHeight || undefined,
                lineHeight: dims.rowHeight ? `${dims.rowHeight}px` : undefined,
              }}
            >
              {word}
            </span>
          ))}
        </span>
      </span>
    </span>
  );
}
