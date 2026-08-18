/**
 * Timeline section. A two-segment bar shows where in a call's life each
 * tool operates: the wide blue segment is the live call (where Sayso
 * lives), the small gray segment is after it ends (where everyone else
 * works). Two cards below make the same point in words.
 */

import Image from 'next/image';
import { TIMELINE_CARDS } from '../data';

export function TimelineSection() {
  return (
    <section className="bg-[#F8F8FA] py-16 md:py-24 v2-halftone relative">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
        <h2 className="font-comic text-3xl md:text-4xl lg:text-5xl text-[#1D4871] tracking-wide max-w-4xl mx-auto">
          Using recordings after the fact is not the same as understanding the conversation live.
        </h2>

        <div className="mx-auto max-w-[960px] mt-12">
          <div className="grid grid-cols-1 md:grid-cols-[1.55fr_1fr] gap-2">
            <div
              className="h-[78px] flex items-center justify-center rounded-xl border-2 border-[#1D4871] text-white font-extrabold text-[15px] v2-comic-shadow-sm"
              style={{ background: 'linear-gradient(90deg, #2367EE, #4A83F5)' }}
            >
              The call is happening
            </div>
            <div className="h-[78px] flex items-center justify-center rounded-xl border-2 border-[#1D4871]/20 bg-[#E8EBEF] text-[#8B95A2] font-extrabold text-[15px]">
              The call is over
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1.55fr_1fr] gap-2 mt-4 text-left">
            <div className="bg-white rounded-2xl v2-comic-border v2-comic-shadow-blue p-6">
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
              <p className="text-[#5B6674] leading-relaxed">{TIMELINE_CARDS.sayso}</p>
            </div>
            <div className="bg-white rounded-2xl v2-comic-border-light p-6">
              <p className="font-extrabold text-[#8B95A2] text-lg mb-2.5">Everyone else works here</p>
              <p className="text-[#5B6674] leading-relaxed">{TIMELINE_CARDS.everyoneElse}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
