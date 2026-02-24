'use client';

import { useState, useEffect } from 'react';
import { CONVERSATION_CYCLES } from './data';

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
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);

  useEffect(() => {
    if (showPrompt) {
      setVisibleMessages([0]);
    } else {
      setVisibleMessages([]);
    }
  }, [showPrompt, currentCycle]);

  return (
    <div className="w-full flex flex-col gap-[6px]">
      {/* Main Toolbar */}
      <div
        className="h-[48px] flex items-center justify-between px-3"
        style={{
          borderRadius: '24px',
          background: 'rgba(2, 25, 47, 0.25)',
          backdropFilter: 'blur(200px)',
          WebkitBackdropFilter: 'blur(200px)',
          boxShadow: 'inset 0 1px 0 rgba(114, 126, 137, 0.12)',
        }}
      >
        <div className="flex items-center">
          <div className="flex items-center justify-center text-white text-[20px] opacity-80">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="9" cy="5" r="1.5" />
              <circle cx="15" cy="5" r="1.5" />
              <circle cx="9" cy="12" r="1.5" />
              <circle cx="15" cy="12" r="1.5" />
              <circle cx="9" cy="19" r="1.5" />
              <circle cx="15" cy="19" r="1.5" />
            </svg>
          </div>
          <div className="mx-3" style={{ width: '1px', height: '28px', backgroundColor: 'rgba(255, 255, 255, 0.4)' }} />
          <div className="flex items-center">
            <div className="w-[32px] h-[32px] rounded-full bg-white flex items-center justify-center z-10">
              <span className="text-black text-sm font-medium">B</span>
            </div>
            <div
              className="h-[30px] flex items-center gap-1.5 pl-[24px] pr-3 -ml-[12px] z-0"
              style={{
                borderTopRightRadius: '100px',
                borderBottomRightRadius: '100px',
                backgroundColor: 'rgba(255, 255, 255, 0.234)',
                border: '1px solid #2367EE',
              }}
            >
              <span className="text-white text-sm font-normal">Buyer</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#4f46e5' }}>
            <svg width="12" height="14" viewBox="0 0 12 14" fill="white">
              <rect x="1" y="1" width="3.5" height="12" rx="1" />
              <rect x="7.5" y="1" width="3.5" height="12" rx="1" />
            </svg>
          </button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#dc2626' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
              <rect x="1" y="1" width="10" height="10" rx="1.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Insights Container */}
      {visibleMessages.length > 0 && (
        <div
          className="w-full flex flex-col gap-[10px]"
          style={{
            padding: '12px 14px',
            borderRadius: '16px',
            background: 'rgba(2, 25, 47, 0.28)',
            backdropFilter: 'blur(200px)',
            WebkitBackdropFilter: 'blur(200px)',
            boxShadow: 'inset 0 1px 0 rgba(114, 126, 137, 0.12)',
          }}
        >
          {visibleMessages.includes(0) && (
            <div style={{ animation: 'slideInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
              <div
                className="flex items-center"
                style={{
                  borderRadius: '14px',
                  minHeight: '48px',
                  padding: '12px 16px',
                  border: '0.5px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(255, 255, 255, 0.07)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.04)',
                }}
              >
                <p style={{ color: 'rgba(255, 255, 255, 0.95)', fontSize: '15px', lineHeight: '1.5', fontWeight: 500, letterSpacing: '-0.01em', margin: 0 }}>
                  {CONVERSATION_CYCLES[currentCycle].saysoPrompt}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

