import { GridIcon, ToggleOnIcon, ChevronDownIcon, PauseIcon, RecordIcon } from './icons';

export function ControlPill({ timerSeconds }: { timerSeconds: number }) {
  const mins = Math.floor(timerSeconds / 60);
  const secs = timerSeconds % 60;
  const formatted = `0:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 h-8 rounded-full bg-white/10 border border-white/10 overflow-hidden">
      <button className="p-1 text-white/80 flex-shrink-0">
        <GridIcon />
      </button>
      <span className="hidden sm:inline text-[12px] text-white/80 whitespace-nowrap">Show Smart Capture</span>
      <div className="hidden sm:block flex-shrink-0">
        <ToggleOnIcon />
      </div>
      <div className="hidden sm:block h-4 w-px bg-white/15" />
      <div className="flex items-center gap-1 sm:gap-1.5">
        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
          <span className="text-[10px] font-semibold text-white">TL</span>
        </div>
        <span className="hidden md:inline text-[12px] text-white/80 whitespace-nowrap">Thomas Lopez</span>
        <button className="p-0.5 text-white/60 flex-shrink-0">
          <ChevronDownIcon />
        </button>
      </div>
      <div className="h-4 w-px bg-white/15" />
      <button className="p-1 text-white/80 flex-shrink-0">
        <PauseIcon />
      </button>
      <button className="p-1 text-white/80 flex-shrink-0">
        <div className="relative">
          <RecordIcon />
          <span className="absolute inset-0 rounded-full bg-red-500/30 animate-pulse" />
        </div>
      </button>
      <div className="px-2 py-0.5 rounded-full bg-white/10 border border-white/10 flex-shrink-0">
        <span className="text-[11px] font-mono text-white/80">{formatted}</span>
      </div>
    </div>
  );
}
