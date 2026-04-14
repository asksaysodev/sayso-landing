'use client';

function StaticAvatar({ initials, color }: { initials: string; color: string }) {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
      style={{ background: color }}
    >
      {initials}
    </div>
  );
}

export function StaticDialerView() {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#f0f2f5]">
      {/* Header */}
      <div className="h-12 bg-[#1a2332] border-b border-white/10 flex items-center justify-between px-3 md:px-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#2367EE] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <span className="text-white text-sm font-semibold hidden sm:inline">Dialer</span>
        </div>

        <div className="flex items-center">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-sm font-mono font-medium text-white">3:42</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg bg-white/10 text-white/70 text-xs">
            Transfer
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold">
            End
          </button>
        </div>
      </div>

      {/* Split view */}
      <div className="flex-1 flex overflow-hidden">
        {/* You side */}
        <div className="flex-1 flex flex-col items-center justify-start pt-3 md:pt-5 px-3 md:px-5 bg-gradient-to-b from-[#f7f8fa] to-[#eef1f5] border-r border-gray-200">
          <div className="flex items-center gap-3 justify-center">
            <StaticAvatar initials="AW" color="linear-gradient(135deg, #2367EE, #1D4871)" />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#2367EE' }} />
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">You</span>
              </div>
              <p className="text-sm font-bold text-[#1D4871]">Alex Agent</p>
              <p className="text-[11px] text-gray-500">Sayso</p>
            </div>
          </div>

          {/* Static speech bubble */}
          <div className="w-full mt-4 max-w-[220px]">
            <div className="rounded-xl px-3 py-2 text-[13px] leading-relaxed bg-[#2367EE]/10 text-[#1D4871] border border-[#2367EE]/20">
              Santa Monica is great. Which neighborhoods are you considering?
            </div>
          </div>
        </div>

        {/* Prospect side */}
        <div className="flex-1 flex flex-col items-center justify-start pt-3 md:pt-5 px-3 md:px-5 bg-gradient-to-b from-[#f0f2f5] to-[#e8eaed]">
          <div className="flex items-center gap-3 justify-center">
            <StaticAvatar initials="JS" color="linear-gradient(135deg, #F59E0B, #D97706)" />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#F59E0B' }} />
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Prospect</span>
              </div>
              <p className="text-sm font-bold text-[#1D4871]">Mrs. Smith</p>
              <p className="text-[11px] text-gray-500">(310) 488-1179</p>
            </div>
          </div>

          {/* Static speech bubble */}
          <div className="w-full mt-4 max-w-[220px]">
            <div className="rounded-xl px-3 py-2 text-[13px] leading-relaxed bg-[#F59E0B]/10 text-[#1D4871] border border-[#F59E0B]/20">
              We&apos;re thinking about Santa Monica for the schools.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="h-10 bg-[#1a2332] border-t border-white/10 flex items-center justify-center gap-6 flex-shrink-0">
        <button className="text-white/40 text-[11px] flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          Dialpad
        </button>
        <button className="text-white/40 text-[11px] flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          Notes
        </button>
        <button className="text-white/40 text-[11px] flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          Activity
        </button>
      </div>
    </div>
  );
}
