import { SUGGESTIONS } from './data';
import { VideoCallMockup } from './VideoCallMockup';
import { ControlPill } from './ControlPill';
import { TypewriterSuggestion } from './TypewriterSuggestion';

export function ProductShowcaseVideo({
  timerSeconds,
  cycleKey,
  currentSuggestion,
  visibleSignals,
  cropped,
}: {
  timerSeconds: number;
  cycleKey: number;
  currentSuggestion: number;
  visibleSignals: number;
  cropped?: boolean;
}) {
  return (
    <div className={`w-full rounded-3xl border border-[#1D4871]/10 bg-[#0d1b2a] shadow-[0_24px_70px_rgba(0,0,0,0.35)] overflow-hidden ${cropped ? 'max-h-[340px] md:max-h-[420px] lg:max-h-[480px]' : ''}`}>
      <div className="aspect-[3/4] sm:aspect-[21/9] relative">
        {/* Video call background */}
        <VideoCallMockup />

        {/* Top header bar with control pill centered */}
        <div className="absolute top-0 left-0 right-0 h-10 bg-black/60 backdrop-blur-sm flex items-center justify-between px-4 z-20 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
          </div>
          <ControlPill timerSeconds={timerSeconds} />
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-white/40">HD</span>
            <button className="px-2.5 py-1 rounded bg-red-600 text-white text-[11px] font-semibold">End</button>
          </div>
        </div>

        {/* Suggestion box just below header */}
        <div className="absolute top-12 left-3 sm:left-4 md:left-5 z-10">
          <div className="max-w-[45%] sm:max-w-xs md:max-w-lg">
            <TypewriterSuggestion
              key={cycleKey}
              text={SUGGESTIONS[currentSuggestion].text}
              source={SUGGESTIONS[currentSuggestion].source}
              isActive={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
