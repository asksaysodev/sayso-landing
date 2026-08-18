/**
 * Dark "how Sayso works while you are talking" section. A three-pill
 * pipeline (they say something, Sayso understands it, you see what to
 * say) over a grid of glassy cards covering speed, understanding, and
 * the real estate focus, on the standard navy dark-section shell.
 */

import { PIPELINE_STEPS, TECH_CARDS } from '../data';

export function EngineSection() {
  return (
    <section className="relative bg-[#1D4871] py-16 md:py-24 overflow-hidden v4-halftone-dark">
      <div className="absolute top-0 left-0 right-0 h-3 md:h-4 bg-[#FFDE59]" />
      <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
        <h2 className="font-comic text-3xl md:text-4xl lg:text-5xl text-white tracking-wide max-w-3xl mx-auto">
          Here&apos;s how Sayso works while you are talking.
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

        <div className="mt-12 grid md:grid-cols-3 gap-5 text-left">
          {TECH_CARDS.map(({ title, description }) => (
            <div key={title} className="bg-white/5 border border-white/15 rounded-2xl p-7">
              <h3 className="text-[#FFDE59] font-extrabold text-lg leading-snug mb-3">{title}</h3>
              <p className="text-white/70 leading-relaxed text-[15.5px]">{description}</p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-white/60 font-bold text-lg">
          There is nothing new to learn. Turn it on, make your calls, and book more appointments.
        </p>
      </div>
    </section>
  );
}
