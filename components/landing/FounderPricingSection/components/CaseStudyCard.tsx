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
    ? 'bg-[#1D4871] v2-comic-border v2-comic-shadow rounded-2xl p-6 md:p-7 w-full'
    : 'bg-white v2-comic-border v2-comic-shadow rounded-2xl p-6 md:p-7 w-full';

  const titleCls = isDark
    ? 'font-comic text-2xl md:text-[26px] text-[#FFDE59] tracking-wide mb-2'
    : 'font-comic text-2xl md:text-[26px] text-[#1D4871] tracking-wide mb-2';

  const bodyCls = isDark
    ? 'text-sm md:text-[15px] text-white/90 leading-relaxed'
    : 'text-sm md:text-[15px] text-[#1D4871]/80 leading-relaxed';

  const statWrapCls = isDark
    ? 'bg-white/[0.07] border-2 border-white/30 rounded-xl p-3 text-center'
    : 'bg-[#F4F4F5] border-2 border-[#1D4871] rounded-xl p-3 text-center';

  const statNumCls = isDark
    ? 'font-comic text-2xl md:text-[26px] text-[#FFDE59] tracking-wide leading-none'
    : 'font-comic text-2xl md:text-[26px] text-[#1D4871] tracking-wide leading-none';

  const statLblCls = isDark
    ? 'text-[10.5px] font-bold uppercase tracking-wide text-white/80 mt-2 leading-tight'
    : 'text-[10.5px] font-bold uppercase tracking-wide text-[#1D4871]/70 mt-2 leading-tight';

  return (
    <div className={wrapperCls}>
      <h3 className={titleCls}>{card.title}</h3>
      <p className={bodyCls}>{card.body}</p>
      <div className="grid grid-cols-3 gap-2.5 mt-5">
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
