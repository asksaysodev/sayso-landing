/**
 * "Everything else requires work" section. A two-column checklist of the
 * homework other approaches assign (with deliberately empty checkboxes),
 * followed by a navy statement card: Sayso saves opportunities while they
 * are still winnable.
 */

import { HOMEWORK_ITEMS } from '../data';

export function HomeworkSection() {
  return (
    <section className="bg-white py-16 md:py-24 relative">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
        <h2 className="font-comic text-3xl md:text-4xl lg:text-5xl text-[#1D4871] tracking-wide max-w-3xl mx-auto">
          Everything else requires work, and then you hope it sticks.
        </h2>

        <ul className="mt-12 mx-auto max-w-[820px] grid md:grid-cols-2 md:grid-rows-4 md:grid-flow-col gap-x-9 text-left">
          {HOMEWORK_ITEMS.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3.5 py-3.5 border-b border-[#E4E6EA] text-[#5B6674] font-semibold"
            >
              <span aria-hidden="true" className="block h-[18px] w-[18px] flex-none rounded border-2 border-[#1D4871]/25" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-14 mx-auto max-w-[880px] relative overflow-hidden bg-[#1D4871] rounded-2xl v2-comic-border v2-comic-shadow px-8 py-12 md:px-11 md:py-14">
          <div
            aria-hidden="true"
            className="absolute right-[-90px] bottom-[-110px] h-[300px] w-[300px] rounded-full bg-[#FFDE59]/10"
          />
          <p className="relative font-comic text-2xl md:text-3xl text-[#FFDE59] tracking-wide leading-snug max-w-2xl mx-auto">
            Sayso saves opportunities while they are still winnable, and you get
            feedback while the call is happening.
          </p>
        </div>
      </div>
    </section>
  );
}
