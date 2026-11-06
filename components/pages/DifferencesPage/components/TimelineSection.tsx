/**
 * Timeline section. A two-segment bar shows where in a call's life each
 * tool operates: the wide blue segment is the live call (where Sayso
 * lives), the small gray segment is after it ends (where everyone else
 * works). Two cards below make the same point in words.
 */

import Image from 'next/image';
import { panel, section, wash } from '@/components/landing/HomeShared/styles';
import { TIMELINE_CARDS } from '../data';
import { sectionTitle, sectionWrap } from '../styles';

export function TimelineSection() {
  return (
    <section className={`${wash} ${section}`}>
      <div className={sectionWrap}>
        <h2 className={`${sectionTitle} max-w-4xl mx-auto`}>
          Recordings after the fact is not the same as assisting the conversation when it can still be won.
        </h2>

        <div className="mx-auto max-w-[960px] mt-12">
          <div className="grid grid-cols-1 md:grid-cols-[1.55fr_1fr] gap-2">
            <div
              className="h-[78px] flex items-center justify-center rounded-2xl bg-[#2367EE] text-white font-extrabold text-[15px] shadow-button"
            >
              The call is happening
            </div>
            <div className="h-[78px] flex items-center justify-center rounded-2xl border border-[rgba(16,35,58,0.12)] bg-[#EEF1F4] text-[#7f92aa] font-extrabold text-[15px]">
              The call is over
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1.55fr_1fr] gap-2 mt-4 text-left">
            <div className={`${panel} p-6`}>
              <p className="flex items-center gap-2.5 mb-2.5">
                <Image
                  src="/logos/logo-pos-horizontal.png"
                  alt="Sayso"
                  width={124}
                  height={31}
                  className="h-[31px] w-auto"
                />
                <span className="font-extrabold text-[#2367EE] text-lg">lives here</span>
              </p>
              <p className="text-[#556B86] leading-relaxed">{TIMELINE_CARDS.sayso}</p>
            </div>
            <div className={`${panel} p-6`}>
              <p className="font-extrabold text-[#7f92aa] text-lg mb-2.5">Everyone else works here</p>
              <p className="text-[#556B86] leading-relaxed">{TIMELINE_CARDS.everyoneElse}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
