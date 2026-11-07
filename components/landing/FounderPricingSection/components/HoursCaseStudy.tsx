/**
 * "Hours = conversations coached" section. Frames what an hour means in
 * Sayso plans, then shows two case-study cards (light + dark) in a
 * carousel that becomes a 2-col grid on md+.
 */

import { HOURS_CASE_STUDIES } from '../data';
import { Carousel } from './Carousel';
import { CaseStudyCard } from './CaseStudyCard';

export function HoursCaseStudy() {
  return (
    <section>
      <div className="mb-7">
        <h2 className="mb-3 font-hero font-extrabold tracking-[-0.03em] text-[#10233A] text-[clamp(28px,4vw,40px)] leading-[1.1]">
          Hours = conversations coached
        </h2>
        <p className="text-base md:text-lg text-[#556B86] leading-relaxed">
          Sayso plans are measured in conversation hours, the time your agents spend talking to leads, not dial time. An agent can dial for 3 hours and get 1 hour of back and forth conversation. That hour is where Sayso coaches, and where the hours count.
        </p>
      </div>

      <Carousel ariaLabel="Hours case studies">
        {HOURS_CASE_STUDIES.map((card) => (
          <CaseStudyCard key={card.title} card={card} />
        ))}
      </Carousel>
    </section>
  );
}
