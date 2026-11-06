/**
 * Dark "How does Sayso work?" section. A three-pill
 * pipeline (they say something, Sayso understands it, you see what to
 * say) over a grid of glassy cards covering speed, understanding, and
 * the real estate focus, on the standard navy dark-section shell.
 */

import Carousel from '@/components/ui/Carousel';
import { section } from '@/components/landing/HomeShared/styles';
import { PIPELINE_STEPS, TECH_CARDS } from '../data';
import { sectionTitle, sectionWrap } from '../styles';

export function EngineSection() {
  return (
    <section className={`bg-[#1D4871] ${section}`}>
      <div className={sectionWrap}>
        <h2 className={`${sectionTitle} !text-white max-w-3xl mx-auto`}>
          How does Sayso work?
        </h2>

        <div className="mt-11">
          <div className="flex flex-wrap items-center justify-center gap-y-3">
            {PIPELINE_STEPS.map((step, n) => (
              <span key={step} className="flex items-center">
                <span className="whitespace-nowrap rounded-full bg-white/10 border border-white/20 text-white font-bold text-sm px-4 py-2.5">
                  {step}
                </span>
                {n < PIPELINE_STEPS.length - 1 && (
                  <span aria-hidden="true" className="text-white/40 text-base mx-2.5">
                    →
                  </span>
                )}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-white/50">
            all of it in under a second, while they are still on the line
          </p>
        </div>

        <Carousel label="How the engine works" itemName="card" className="mt-12 text-left" trackClassName="grid grid-cols-3 gap-5">
          {TECH_CARDS.map(({ title, description }) => (
            <div key={title} className="bg-white/[0.06] border border-white/15 rounded-[20px] p-7">
              <h3 className="text-[#FFDE59] font-extrabold text-lg leading-snug mb-3">{title}</h3>
              <p className="text-white/70 leading-relaxed text-[15.5px]">{description}</p>
            </div>
          ))}
        </Carousel>

        <p className="mt-12 text-white/60 font-bold text-lg">
          There is nothing new to learn. Turn it on, make your calls, and book more appointments.
        </p>
      </div>
    </section>
  );
}
