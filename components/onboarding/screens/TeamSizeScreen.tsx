'use client';

import { useRef, useCallback } from 'react';

const CALLERS_OPTIONS = ['All of them', 'Some of them', 'Not enough'];
const TEAM_SIZE_VALUES = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];

interface TeamSizeScreenProps {
  teamSize: number;
  onTeamSizeChange: (n: number) => void;
  callersCount: string | null;
  onCallersCountChange: (v: string) => void;
  onAutoAdvance: () => void;
}

export function TeamSizeScreen({
  teamSize,
  onTeamSizeChange,
  callersCount,
  onCallersCountChange,
  onAutoAdvance,
}: TeamSizeScreenProps) {
  const didAdvance = useRef(false);

  // Trigger auto-advance on selection rather than in a useEffect.
  // This prevents the screen from bouncing the user forward when they
  // navigate back and the parent state still has their previous answers.
  const handleCallersSelect = useCallback(
    (option: string) => {
      onCallersCountChange(option);
      if (!didAdvance.current) {
        didAdvance.current = true;
        onAutoAdvance();
      }
    },
    [onCallersCountChange, onAutoAdvance]
  );

  return (
    <div className="text-center">
      {/* Part 1: Team size dial */}
      <div className="mb-8">
        <h2 className="text-base font-bold text-[#1D4871]/70 uppercase tracking-wide mb-1">
          Part 1 of 2
        </h2>
        <h1 className="text-xl md:text-2xl font-bold text-[#1D4871]">
          How many agents are on your team?
        </h1>

        <div className="mt-6 flex flex-col items-center w-full max-w-sm mx-auto px-2">
          {/* Current value display */}
          <div className="flex items-end gap-2 mb-5">
            <span className="text-6xl font-bold text-[#2367EE] leading-none tabular-nums">
              {teamSize}
            </span>
            <span className="text-base text-[#1D4871]/60 font-medium mb-1">agents</span>
          </div>

          {/* Slider */}
          <div className="w-full">
            <input
              type="range"
              min={0}
              max={TEAM_SIZE_VALUES.length - 1}
              step={1}
              value={Math.max(0, TEAM_SIZE_VALUES.indexOf(teamSize))}
              onChange={(e) => onTeamSizeChange(TEAM_SIZE_VALUES[Number(e.target.value)])}
              className="agent-slider"
              style={{
                background: (() => {
                  const pct = (Math.max(0, TEAM_SIZE_VALUES.indexOf(teamSize)) / (TEAM_SIZE_VALUES.length - 1)) * 100;
                  return `linear-gradient(to right, #2367EE 0%, #2367EE ${pct}%, #D7DEE1 ${pct}%, #D7DEE1 100%)`;
                })(),
              }}
            />
            <div className="flex justify-between mt-1.5">
              <span className="text-xs text-[#1D4871]/50 font-medium">1</span>
              <span className="text-xs text-[#1D4871]/50 font-medium">100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Callers count */}
      <div>
        <h2 className="text-base font-bold text-[#1D4871]/70 uppercase tracking-wide mb-1">
          Part 2 of 2
        </h2>
        <h1 className="text-xl md:text-2xl font-bold text-[#1D4871]">
          How many make calls consistently?
        </h1>

        <div className="flex flex-col gap-2.5 max-w-md mx-auto mt-5">
          {CALLERS_OPTIONS.map((option) => {
            const isSelected = callersCount === option;
            return (
              <button
                key={option}
                onClick={() => handleCallersSelect(option)}
                className={`w-full rounded-xl px-5 py-3 cursor-pointer text-left transition-all duration-200 border-2 flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#2367EE]/5 border-[#2367EE] shadow-sm ring-2 ring-[#2367EE]/20'
                    : 'bg-white border-[#D7DEE1] hover:border-[#2367EE] hover:shadow-sm'
                } focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2`}
              >
                <span className="text-base font-semibold text-[#1D4871]">{option}</span>
                <div
                  className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
                    isSelected ? 'bg-[#2367EE]' : 'border-2 border-[#D7DEE1]'
                  }`}
                >
                  {isSelected && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6L5 8.5L9.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
