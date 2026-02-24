export function DialerHeader({ timerSeconds }: { timerSeconds: number }) {
  const mins = Math.floor(timerSeconds / 60);
  const secs = timerSeconds % 60;
  const formatted = `${mins}:${String(secs).padStart(2, '0')}`;

  return (
    <div className="h-12 bg-[#1a2332] border-b border-white/10 flex items-center justify-between px-3 md:px-4 flex-shrink-0">
      {/* Left: App branding */}
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-lg bg-[#2367EE] flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
        </div>
        <span className="text-white text-sm font-semibold hidden sm:inline">Dialer</span>
      </div>

      {/* Center: Call timer */}
      <div className="flex items-center">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm font-mono font-medium text-white">{formatted}</span>
        </div>
      </div>

      {/* Right: Call controls */}
      <div className="flex items-center gap-2">
        <button className="px-3 py-1.5 rounded-lg bg-white/10 text-white/70 text-xs transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="1" y1="1" x2="23" y2="23" />
            <path d="M9 9v3a3 3 0 005.12 2.12M15 9.34V4a3 3 0 00-5.94-.6" />
            <path d="M17 16.95A7 7 0 015 12v-2m14 0v2c0 .76-.12 1.5-.34 2.18" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        </button>
        <button className="px-3 py-1.5 rounded-lg bg-white/10 text-white/70 text-xs transition-colors">
          Transfer
        </button>
        <button className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold transition-colors">
          End
        </button>
      </div>
    </div>
  );
}
