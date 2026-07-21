/**
 * "What happens next": three numbered steps from claiming the offer to booking
 * onboarding, laid out as a simple timeline.
 */

import { STEPS } from '../data';

export function NextSteps() {
  return (
    <section className="py-12 md:py-14">
      <div className="max-w-[880px] mx-auto px-5 md:px-6">
        <h2 className="font-comic text-3xl md:text-4xl text-[#1D4871] text-center tracking-wide mb-9">
          What happens next
        </h2>
        <ol className="grid gap-8 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="text-center px-2">
              <span className="mx-auto mb-4 grid place-items-center w-12 h-12 rounded-full bg-[#FFDE59] border-2 border-[#1D4871] font-comic text-xl text-[#1D4871] v2-comic-shadow-sm">
                {i + 1}
              </span>
              <p className="font-bold text-[#1D4871] text-base md:text-lg mb-1.5">
                {step.title}
              </p>
              <p className="text-sm text-[#1D4871]/65 leading-relaxed">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
