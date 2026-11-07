/**
 * One card in the "Hours = conversations coached" carousel. Renders in two
 * variants: light (white background) and dark (navy background).
 */

import type { CaseStudyCard as CaseStudyCardData } from '../types';

type CaseStudyCardProps = {
  card: CaseStudyCardData;
};

export function CaseStudyCard({ card }: CaseStudyCardProps) {
  const isDark = card.variant === 'dark';

  const wrapperCls = isDark
    ? 'rounded-[20px] bg-[#1D4871] shadow-[0_18px_40px_-18px_rgba(29,72,113,0.6)] p-6 md:p-7 w-full'
    : 'rounded-[20px] border border-[rgba(16,35,58,0.12)] bg-white shadow-[0_1px_2px_rgba(16,35,58,0.06),0_14px_34px_-16px_rgba(16,35,58,0.25)] p-6 md:p-7 w-full';

  const titleCls = isDark
    ? 'mb-2 font-hero text-[22px] font-bold text-[#FFDE59]'
    : 'mb-2 font-hero text-[22px] font-bold text-[#10233A]';

  const bodyCls = isDark
    ? 'text-sm md:text-[15px] text-white/90 leading-relaxed'
    : 'text-sm md:text-[15px] text-[#556B86] leading-relaxed';

  const statWrapCls = isDark
    ? 'rounded-xl bg-white/[0.07] px-2 py-3 text-center ring-1 ring-white/15 md:p-3'
    : 'rounded-xl bg-[#F4F4F5] px-2 py-3 text-center md:p-3';

  const statNumCls = isDark
    ? 'font-hero text-xl font-extrabold leading-none tracking-[-0.02em] text-[#FFDE59] tabular-nums md:text-[26px]'
    : 'font-hero text-xl font-extrabold leading-none tracking-[-0.02em] text-[#10233A] tabular-nums md:text-[26px]';

  const statLblCls = isDark
    ? 'text-[10px] md:text-[10.5px] font-bold uppercase tracking-tight md:tracking-wide text-white/80 mt-2 leading-tight'
    : 'text-[10px] md:text-[10.5px] font-bold uppercase tracking-tight md:tracking-wide text-[#556B86] mt-2 leading-tight';

  return (
    <div className={wrapperCls}>
      <h3 className={titleCls}>{card.title}</h3>
      <p className={bodyCls}>{card.body}</p>
      <div className="grid grid-cols-3 gap-2 md:gap-2.5 mt-5">
        {card.stats.map((s) => (
          <div key={s.label} className={statWrapCls}>
            <div className={statNumCls}>{s.value}</div>
            <div className={statLblCls}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
