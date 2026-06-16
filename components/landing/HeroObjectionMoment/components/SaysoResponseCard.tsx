'use client';

import { useEffect, useState } from 'react';
import { SparkleIcon } from '@/components/landing/ProductShowcaseSection/icons';

/** Types `text` out one character at a time once `active`; respects reduced motion. */
function useTypewriter(text: string, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setCount(text.length);
      return;
    }
    setCount(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) clearInterval(id);
    }, 24);
    return () => clearInterval(id);
  }, [text, active]);

  return text.slice(0, count);
}

/**
 * Sayso's coaching line: a dark, branded card that slides in after the
 * objection, then types out the suggested response with a blinking cursor.
 * This is the only hint of "product" in the hero, and it reads the same on
 * every screen size.
 */
export function SaysoResponseCard({ text, active }: { text: string; active: boolean }) {
  const typed = useTypewriter(text, active);
  const done = typed.length >= text.length;

  return (
    <div
      className={`self-stretch transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0'}`}
      style={active ? { animation: 'slideInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both' } : undefined}
      aria-hidden={!active}
    >
      <div
        className="rounded-2xl rounded-tr-md border-2 border-[#1D4871] px-4 py-3"
        style={{ background: '#0f2847', boxShadow: '3px 3px 0px #2367EE' }}
      >
        <div className="mb-1.5 flex items-center gap-1.5">
          <span className="text-[#FFDE59]">
            <SparkleIcon />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-white/55">
            Sayso suggests
          </span>
        </div>
        <p className="min-h-[44px] text-[15px] leading-snug text-white sm:text-base">
          {active && (
            <>
              &ldquo;{typed}
              {!done && (
                <span
                  className="ml-0.5 inline-block h-[15px] w-[2px] translate-y-[2px] bg-white/80 align-middle"
                  style={{ animation: 'highlightFadeIn 1s ease-in-out infinite alternate' }}
                />
              )}
              {done && <>&rdquo;</>}
            </>
          )}
        </p>
      </div>
    </div>
  );
}
