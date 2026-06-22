'use client';

/**
 * Hero "wow moment": a real prospect objection lands, then Sayso surfaces the
 * exact line to say next. Loops through a handful of objections. Pure motion +
 * text with no CRM screen, so it reads identically on desktop and mobile (the
 * mobile failure mode of the old product-screen demo is gone).
 */
import { OBJECTIONS } from './data';
import { useObjectionCycle } from './useObjectionCycle';
import { CallContextBar } from './components/CallContextBar';
import { ObjectionBubble } from './components/ObjectionBubble';
import { SaysoResponseCard } from './components/SaysoResponseCard';

export function HeroObjectionMoment() {
  const { index, showResponse } = useObjectionCycle(OBJECTIONS.length);
  const current = OBJECTIONS[index];

  return (
    <div className="mx-auto w-full max-w-[540px]">
      <div
        className="rounded-3xl border-2 border-[#1D4871] bg-white p-4 sm:p-5"
        style={{ boxShadow: '6px 6px 0px #1D4871' }}
      >
        <CallContextBar />
        <div className="mt-4 flex min-h-[168px] flex-col gap-3">
          <ObjectionBubble key={`objection-${index}`} text={current.objection} />
          <SaysoResponseCard key={`response-${index}`} text={current.response} active={showResponse} />
        </div>
      </div>
    </div>
  );
}
