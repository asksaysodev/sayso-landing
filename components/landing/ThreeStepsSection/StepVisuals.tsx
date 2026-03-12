import { CalendarRange, Check, LayoutGrid } from 'lucide-react';

// Internal icons that simulate the Sayso desktop app UI — not generic, kept here intentionally
function ToggleOnIcon() {
  return (
    <svg width="20" height="12" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="22" height="12" rx="6" fill="#2367EE" stroke="none" />
      <circle cx="18" cy="7" r="4" fill="white" />
    </svg>
  );
}

function RecordIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="7" r="5" fill="#EF4444" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
}

export function StepVisualStartSayso() {
  return (
    <div className="w-full h-full relative bg-gradient-to-br from-[#0d1b2a] to-[#1a2a3a] rounded-2xl overflow-hidden p-3 flex items-center justify-center">
      <div className="w-full max-w-[240px] flex flex-col items-center gap-2">
        <div className="flex items-center gap-1.5 px-2.5 h-8 rounded-full showcase-glass border border-white/15 shadow-[0_10px_25px_rgba(0,0,0,0.35)]">
          <div className="p-0.5 text-white/80"><LayoutGrid size={12} /></div>
          <span className="text-[11px] text-white/80 whitespace-nowrap">Launch Coach</span>
          <div className="flex-shrink-0"><ToggleOnIcon /></div>
        </div>
        <button className="px-3 py-1.5 h-8 rounded-full bg-[#2367EE] text-white text-[11px] font-semibold whitespace-nowrap shadow-sm">
          Select Prospect
        </button>
      </div>
    </div>
  );
}

export function StepVisualPrompts() {
  return (
    <div className="w-full h-full relative bg-gradient-to-br from-[#0d1b2a] to-[#1a2a3a] rounded-2xl overflow-hidden p-3 flex flex-col items-center justify-start gap-2">
      <div className="w-full max-w-[240px] flex items-center gap-1.5 px-2.5 h-8 rounded-full showcase-glass border border-white/15 shadow-[0_10px_25px_rgba(0,0,0,0.35)]">
        <div className="p-0.5 text-white/80"><LayoutGrid size={12} /></div>
        <span className="text-[11px] text-white/80 whitespace-nowrap">Sayso started</span>
        <div className="h-4 w-px bg-white/15" />
        <div className="relative p-0.5">
          <RecordIcon />
          <span className="absolute inset-0 rounded-full bg-red-500/30 animate-pulse" />
        </div>
        <div className="px-1.5 py-0.5 rounded-full bg-white/10 border border-white/10">
          <span className="text-[10px] font-mono text-white/80">0:25:21</span>
        </div>
      </div>
      <div className="w-full max-w-[240px] px-3 py-2 rounded-xl showcase-glass-strong border border-white/15 shadow-[0_10px_25px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(114,126,137,0.4)]">
        <p className="text-[11px] leading-tight text-white/90">
          Ask <span className="text-white font-medium">&quot;What would make a move worth it for you in the next 6 months?&quot;</span>
        </p>
        <p className="text-[10px] text-white/60 mt-1">to uncover the real motivation.</p>
      </div>
    </div>
  );
}

export function StepVisualBooked() {
  return (
    <div className="w-full h-full relative bg-gradient-to-br from-[#FFDE59]/20 to-white/60 rounded-2xl overflow-hidden p-4 flex items-center justify-center">
      <div className="w-full max-w-[220px] bg-white rounded-xl v2-comic-border p-3 v2-comic-shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <CalendarRange color="#1D4871" size={14} />
            <span className="text-[11px] font-bold text-[#1D4871] font-comic tracking-wide">Booked</span>
          </div>
          <div className="w-5 h-5 rounded-full bg-[#2367EE] flex items-center justify-center">
            <Check size={10} color="#FFF" />
          </div>
        </div>
        <h4 className="text-[13px] font-bold text-[#1D4871] mb-1">Buyer Consultation</h4>
        <p className="text-[11px] text-[#1D4871]/70 mb-2">Tomorrow • 2:00 PM</p>
        <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#2367EE]/10 border-2 border-[#2367EE]/30">
          <span className="text-[10px] font-bold text-[#2367EE]">Confirmed</span>
        </div>
      </div>
    </div>
  );
}
