'use client';

/**
 * LiveCallIntro — a small, quiet header above the hero widget that frames it as
 * something happening live on a call.
 *
 * It keeps the "On a live call" label plus two always-present conversation
 * bubbles (the prospect and you). Rather than both pulsing constantly, only one
 * bubble "speaks" at a time and they alternate, so it reads like a back-and-forth
 * conversation instead of a busy, always-on animation.
 */
import { useEffect, useState } from 'react';

function TypingDots({ tone, active }: { tone: 'prospect' | 'you'; active: boolean }) {
  const color = tone === 'you' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(29, 72, 113, 0.55)';
  return (
    <span className="flex items-center gap-[3px]">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`inline-block h-[5px] w-[5px] rounded-full ${active ? 'typing-dot' : ''}`}
          style={{ backgroundColor: color, opacity: active ? undefined : 0.4, animationDelay: `${i * 150}ms` }}
        />
      ))}
    </span>
  );
}

export function LiveCallIntro() {
  // Alternate which bubble is "speaking" so it reads like turn-taking.
  const [speaker, setSpeaker] = useState<'prospect' | 'you'>('prospect');
  useEffect(() => {
    const id = setInterval(() => {
      setSpeaker((s) => (s === 'prospect' ? 'you' : 'prospect'));
    }, 2400);
    return () => clearInterval(id);
  }, []);

  const prospectActive = speaker === 'prospect';
  const youActive = speaker === 'you';

  return (
    <div className="mb-3 flex flex-col items-center gap-2">
      {/* On a live call */}
      <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1D4871]/55">
        <span className="relative flex h-2 w-2">
          <span className="live-ring-pulse absolute inline-flex h-full w-full rounded-full bg-red-500/50" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
        </span>
        On a live call
      </div>

      {/* Two bubbles, always present; only the active speaker animates */}
      <div className="flex items-center gap-2">
        <span
          className="inline-flex items-center gap-1.5 rounded-full border border-[#1D4871]/10 bg-white/80 px-2.5 py-1 shadow-sm transition-opacity duration-300"
          style={{ opacity: prospectActive ? 1 : 0.45 }}
        >
          <span className="text-[10px] font-semibold text-[#1D4871]/60">Prospect</span>
          <TypingDots tone="prospect" active={prospectActive} />
        </span>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 shadow-sm transition-opacity duration-300"
          style={{ backgroundColor: '#2367EE', opacity: youActive ? 1 : 0.45 }}
        >
          <span className="text-[10px] font-semibold text-white/90">You</span>
          <TypingDots tone="you" active={youActive} />
        </span>
      </div>

      {/* Caption pointing at the widget */}
      <p className="text-[11px] text-[#1D4871]/45">Here&apos;s what Sayso shows you in real time</p>
    </div>
  );
}
