'use client';

import { useState, useEffect } from 'react';
import { SparkleIcon } from './icons';

export function TypewriterSuggestion({ text, source, isActive }: { text: string; source: string; isActive: boolean }) {
  const [displayedChars, setDisplayedChars] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setDisplayedChars(0);
      setFadingOut(false);
      return;
    }

    setDisplayedChars(0);
    setFadingOut(false);

    const startDelay = setTimeout(() => {
      let charIndex = 0;
      const interval = setInterval(() => {
        charIndex++;
        setDisplayedChars(charIndex);
        if (charIndex >= text.length) {
          clearInterval(interval);
        }
      }, 25);
      return () => clearInterval(interval);
    }, 300);

    return () => clearTimeout(startDelay);
  }, [isActive, text]);

  // Blink cursor
  useEffect(() => {
    const interval = setInterval(() => setShowCursor(prev => !prev), 530);
    return () => clearInterval(interval);
  }, []);

  const displayedText = text.slice(0, displayedChars);
  const isDoneTyping = displayedChars >= text.length;

  return (
    <div className={`showcase-glass-strong rounded-xl sm:rounded-2xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(114,126,137,0.4)] overflow-hidden transition-opacity duration-500 ${fadingOut ? 'opacity-0' : 'opacity-100'}`}>
      {/* Header */}
      <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 pt-2 sm:pt-3 pb-0.5 sm:pb-1">
        <span className="text-[#2367EE]"><SparkleIcon /></span>
        <span className="text-[9px] sm:text-[11px] font-semibold text-white/60 uppercase tracking-wider">Sayso suggests</span>
      </div>
      {/* Body */}
      <div className="px-2.5 sm:px-4 pb-1.5 sm:pb-2">
        <p className="text-[11px] sm:text-[14px] md:text-[15px] leading-relaxed text-white/95 font-medium">
          &quot;{displayedText}&quot;
          {!isDoneTyping && (
            <span className={`inline-block w-[2px] h-[14px] bg-white/80 ml-0.5 align-middle ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
          )}
        </p>
      </div>
      {/* Source chip */}
      <div className={`px-2.5 sm:px-4 pb-2 sm:pb-3 transition-opacity duration-300 ${isDoneTyping ? 'opacity-100' : 'opacity-0'}`}>
        <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/8 border border-white/10">
          <div className="w-3.5 sm:w-4 h-3.5 sm:h-4 rounded-full bg-[#2367EE]/30 flex items-center justify-center">
            <span className="text-[7px] sm:text-[8px] text-[#2367EE] font-bold">S</span>
          </div>
          <span className="text-[9px] sm:text-[11px] text-white/60">{source}</span>
        </div>
      </div>
    </div>
  );
}
