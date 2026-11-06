'use client';

/** Agent quote under the hero social proof line. Fades to the next quote every 5 seconds. */
import { useEffect, useState } from 'react';
import { ROTATING_QUOTES } from '../data';

export function RotatingQuote() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
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
    };
  }, []);

  return (
    <q
      className="block italic text-[#1D4871] transition-opacity duration-300 motion-reduce:transition-none"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {ROTATING_QUOTES[index]}
    </q>
  );
}
