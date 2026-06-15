import { Grid3x3, Wifi, ArrowRightLeft, Mic, PhoneOff } from 'lucide-react';
import { SpeakingBars } from '../SpeakingBars';
import type { Speaker } from '../../types';

/**
 * The Follow Up Boss "call in progress" bar that sits at the very top during a
 * live call. Reproduces the real layout: Dialpad on the left, the calling
 * status + timer in the center, and Transfer / Mute / Hang up on the right.
 * The speaking bars beside the timer show who is talking.
 */
interface FubCallBarProps {
  prospectName: string;
  timer: string;
  speaker: Speaker | null;
}

export function FubCallBar({ prospectName, timer, speaker }: FubCallBarProps) {
  return (
    <div className="flex items-center justify-between bg-gradient-to-b from-[#4a5d68] to-[#3c4d57] px-6 py-2.5 text-white">
      {/* Left: dialpad */}
      <div className="flex w-32 flex-col items-center text-[11px] text-white/80">
        <Grid3x3 className="h-5 w-5" />
        <span className="mt-0.5">Dialpad</span>
      </div>

      {/* Center: calling status + timer + speaking bars */}
      <div className="flex flex-col items-center">
        <div className="text-[15px]">
          Calling <span className="font-semibold">{prospectName}</span>{' '}
          <span className="text-white/70">(mobile)</span>
        </div>
        <div className="mt-0.5 flex items-center gap-2">
          <Wifi className="h-4 w-4 text-emerald-300" />
          <span className="text-[13px] tabular-nums text-white/90">{timer}</span>
          <SpeakingBars active={speaker !== null} />
        </div>
      </div>

      {/* Right: transfer / mute / hang up */}
      <div className="flex w-44 items-start justify-end gap-5">
        <div className="flex flex-col items-center text-[11px] text-white/80">
          <ArrowRightLeft className="h-5 w-5" />
          <span className="mt-0.5">Transfer</span>
        </div>
        <div className="flex flex-col items-center text-[11px] text-white/80">
          <Mic className="h-5 w-5" />
          <span className="mt-0.5">Mute</span>
        </div>
        <div className="flex flex-col items-center text-[11px] text-white/80">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f15b5b] text-white">
            <PhoneOff className="h-4 w-4" />
          </span>
          <span className="mt-0.5">Hang up</span>
        </div>
      </div>
    </div>
  );
}
