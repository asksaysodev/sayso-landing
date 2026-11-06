/**
 * "Everything else requires work" section. A two-column checklist of the
 * homework other approaches assign (with deliberately empty checkboxes),
 * followed by a navy statement card: Sayso saves opportunities while they
 * are still winnable.
 */

import { panelShadow, section } from '@/components/landing/HomeShared/styles';
import { HOMEWORK_ITEMS } from '../data';
import { sectionTitle, sectionWrap } from '../styles';

export function HomeworkSection() {
  return (
    <section className={section}>
      <div className={sectionWrap}>
        <h2 className={`${sectionTitle} max-w-3xl mx-auto`}>
          Everything else requires work.
          <br />
          And then you hope it sticks.
        </h2>

        <ul className="mt-12 mx-auto max-w-[820px] grid md:grid-cols-2 md:grid-rows-4 md:grid-flow-col gap-x-9 text-left">
          {HOMEWORK_ITEMS.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3.5 py-3.5 border-b border-[rgba(16,35,58,0.12)] text-[#556B86] font-semibold"
            >
              <span aria-hidden="true" className="block h-[18px] w-[18px] flex-none rounded border-[1.5px] border-[#1D4871]/25" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className={`mt-14 mx-auto max-w-[880px] bg-[#1D4871] rounded-[20px] ${panelShadow} px-8 py-12 md:px-11 md:py-14`}>
          <p className="font-hero font-extrabold text-2xl md:text-[30px] text-white tracking-[-0.02em] leading-snug max-w-2xl mx-auto">
            Sayso saves opportunities while they are still winnable, and you get
            feedback while the call is happening.
          </p>
        </div>
      </div>
    </section>
  );
}
