'use client';

import { useState, useEffect, useRef } from 'react';
import { CONVERSATION_CYCLES } from './data';

const AVATAR_COLORS = ['#7c3aed', '#374151', '#6b7280', '#16a34a', '#6b7280', '#374151'];

function useTypewriter(text: string, isActive: boolean) {
  const [displayed, setDisplayed] = useState('');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (startRef.current) clearTimeout(startRef.current);
    setDisplayed('');

    if (!isActive) return;

    let idx = 0;
    startRef.current = setTimeout(() => {
      timerRef.current = setInterval(() => {
        idx += 2;
        if (idx >= text.length) {
          setDisplayed(text);
          if (timerRef.current) clearInterval(timerRef.current);
        } else {
          setDisplayed(text.slice(0, idx));
        }
      }, 22);
    }, 350);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (startRef.current) clearTimeout(startRef.current);
    };
  }, [text, isActive]);

  return displayed;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function SaysoWidget({
  currentCycle,
  showPrompt,
  timerSeconds = 0,
}: {
  currentCycle: number;
  showBuyerMessage: boolean;
  showPrompt: boolean;
  promptText: string;
  timerSeconds?: number;
}) {
  const cycle = CONVERSATION_CYCLES[currentCycle];
  const typedText = useTypewriter(cycle.saysoPrompt, showPrompt);
  const isTypingDone = typedText === cycle.saysoPrompt;

  return (
    <div className="w-full flex flex-col gap-[5px]">
      {/* Toolbar — matches actual app order */}
      <div
        className="h-[44px] flex items-center justify-between px-2.5"
        style={{
          borderRadius: '22px',
          background: 'rgba(2, 25, 47, 0.30)',
          backdropFilter: 'blur(200px)',
          WebkitBackdropFilter: 'blur(200px)',
          boxShadow: 'inset 0 1px 0 rgba(114, 126, 137, 0.12)',
        }}
      >
        {/* Left: drag + lead type pill + zip code pill */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center justify-center text-white/40 flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="9" cy="5" r="1.5" /><circle cx="15" cy="5" r="1.5" />
              <circle cx="9" cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" />
              <circle cx="9" cy="19" r="1.5" /><circle cx="15" cy="19" r="1.5" />
            </svg>
          </div>
          {/* Lead type pill */}
          <div className="flex items-center flex-shrink-0">
            <div className="w-[26px] h-[26px] rounded-full bg-white flex items-center justify-center z-10">
              <span className="text-black text-[11px] font-semibold">{cycle.leadType}</span>
            </div>
            <div
              className="h-[24px] flex items-center pl-[18px] pr-2 -ml-[9px] z-0"
              style={{
                borderTopRightRadius: '100px',
                borderBottomRightRadius: '100px',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid #2367EE',
              }}
            >
              <span className="text-white text-[11px] font-normal">{cycle.leadLabel}</span>
            </div>
          </div>
          {/* Zip Code pill with chevron */}
          <div
            className="flex items-center gap-1 h-[24px] px-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <span className="text-white/65 text-[10px]">Zip Code</span>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </div>
        </div>

        {/* Right: refresh + stop + timer + list + check */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Refresh — orange */}
          <button
            className="w-[26px] h-[26px] rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#d97706' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
          {/* Stop — red */}
          <button
            className="w-[26px] h-[26px] rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#dc2626' }}
          >
            <svg width="9" height="9" viewBox="0 0 12 12" fill="white">
              <rect x="1" y="1" width="10" height="10" rx="1.5" />
            </svg>
          </button>
          {/* Timer */}
          <span className="text-white/80 text-[11px] font-mono tabular-nums px-1">{formatTime(timerSeconds)}</span>
          {/* List icon */}
          <div className="flex items-center justify-center text-white/50">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </div>
          {/* Check circle */}
          <div className="flex items-center justify-center text-white/50">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
        </div>
      </div>

      {/* Market data card + AI suggestion — slide in when showPrompt */}
      {showPrompt && (
        <div
          className="w-full flex flex-col gap-[5px]"
          style={{ animation: 'slideInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
        >
          {/* Market data card — matches actual app layout */}
          <div
            style={{
              padding: '8px 11px',
              borderRadius: '12px',
              background: 'rgba(2, 25, 47, 0.35)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '0.5px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            {/* Zip + city header row with collapse button */}
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-baseline gap-2">
                <span className="text-white font-bold text-[13px] leading-none">{cycle.location.zip}</span>
                <span className="text-white/90 text-[13px] font-semibold leading-none">{cycle.location.city}</span>
              </div>
              <div className="text-white/30 text-[11px] leading-none cursor-pointer">−</div>
            </div>
            {/* 2-col bullet stats */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-[3px]">
              {cycle.marketData.map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-1">
                  <span className="text-white/50 text-[9px] flex-shrink-0">•</span>
                  <span className="text-white/55 text-[9px] leading-snug">
                    {stat.label}:{' '}
                    <span className="text-white font-bold">{stat.value}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI suggestion bubble */}
          <div
            style={{
              padding: '11px 13px',
              borderRadius: '14px',
              background: 'rgba(15, 40, 71, 0.55)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '0.5px solid rgba(255, 255, 255, 0.10)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.95)',
                fontSize: '13px',
                lineHeight: '1.55',
                fontWeight: 400,
                margin: 0,
                minHeight: '40px',
              }}
            >
              {typedText}
              {!isTypingDone && typedText.length > 0 && (
                <span
                  className="inline-block align-middle ml-[2px]"
                  style={{
                    width: '2px',
                    height: '13px',
                    backgroundColor: 'rgba(255,255,255,0.75)',
                    animation: 'pulse 1s ease-in-out infinite',
                  }}
                />
              )}
            </p>

            {/* Speaker circles + location chip — appear after typing finishes */}
            {isTypingDone && (
              <div style={{ animation: 'slideInUp 0.25s ease forwards' }}>
                <div className="flex items-center gap-1.5 mt-2.5">
                  {['L', 'P', 'M', 'A', 'M', 'A'].map((letter, i) => (
                    <div
                      key={i}
                      className="w-[20px] h-[20px] rounded-full flex items-center justify-center text-[8px] font-semibold text-white flex-shrink-0"
                      style={{ backgroundColor: AVATAR_COLORS[i] }}
                    >
                      {letter}
                    </div>
                  ))}
                  <div
                    className="ml-auto w-[20px] h-[20px] rounded-md flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                  >
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" />
                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                    </svg>
                  </div>
                </div>
                <div
                  className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-[9px] font-medium"
                  style={{
                    backgroundColor: 'rgba(35, 103, 238, 0.22)',
                    color: '#93bbff',
                    border: '1px solid rgba(35, 103, 238, 0.28)',
                  }}
                >
                  {cycle.locationChip}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
