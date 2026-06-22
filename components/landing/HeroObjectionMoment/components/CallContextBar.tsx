/**
 * A minimal "live call" header that grounds the objection moment as a real call
 * in progress, without showing any CRM or dialer UI. Prospect avatar on the
 * left, a live indicator with animated audio bars on the right.
 */
export function CallContextBar() {
  return (
    <div className="flex items-center justify-between border-b border-[#1D4871]/10 pb-3">
      <div className="flex items-center gap-2.5">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-bold text-white"
          style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}
        >
          JD
        </span>
        <div className="text-left leading-tight">
          <p className="text-sm font-bold text-[#1D4871]">Prospect</p>
          <p className="text-[11px] text-[#1D4871]/55">on a live call</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Live audio bars (reuses the global showcase audio-bar animation). */}
        <div className="flex h-4 items-end gap-[3px]">
          <span className="showcase-bar-1 w-[3px] rounded-full bg-[#2367EE]" />
          <span className="showcase-bar-2 w-[3px] rounded-full bg-[#2367EE]" />
          <span className="showcase-bar-3 w-[3px] rounded-full bg-[#2367EE]" />
          <span className="showcase-bar-4 w-[3px] rounded-full bg-[#2367EE]" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#EF4444]/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#EF4444]" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#1D4871]/55">
            Live
          </span>
        </div>
      </div>
    </div>
  );
}
