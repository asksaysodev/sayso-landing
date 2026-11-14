/**
 * Hero for team leaders: the objection they hear ("We already use ___") with
 * the spinning DrumWheel, the answer as the H1, and See how, which jumps to the comparison.
 */

import { soft } from '@/components/landing/HomeShared/styles';
import { DrumWheel } from './DrumWheel';
import { SeeHowButton } from './SeeHowButton';
import { DRUM_WORDS } from '../data';

export function DifferencesHero() {
  return (
    <section className="relative overflow-hidden pt-[92px] pb-20 md:pb-24">
      <div className="relative z-10 mx-auto max-w-[1160px] px-4 text-center sm:px-6">
        <p
          className={`flex flex-wrap items-center justify-center gap-x-[0.25em] gap-y-2 font-hero text-[clamp(22px,3.2vw,32px)] font-extrabold leading-[1.15] tracking-[-0.03em] ${soft}`}
        >
          <span>We already use</span>
          <DrumWheel words={DRUM_WORDS} />
        </p>
        <h1 className="mx-auto mt-5 max-w-4xl text-balance font-hero text-[clamp(34px,5.6vw,58px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#10233A]">
          Sayso helps your agents book more.
        </h1>
        <div className="mt-9">
          <SeeHowButton />
        </div>
        <p className="mt-7 text-sm font-bold uppercase tracking-wide text-[#7f92aa]">
          Used daily by RealTrends-ranked teams &amp; brokerages
        </p>
      </div>
    </section>
  );
}
