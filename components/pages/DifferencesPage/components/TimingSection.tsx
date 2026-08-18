/**
 * "The Short Answer" section. States the core positioning (Sayso works
 * during the call, most tools work after it) in prose, then makes it
 * visual with a light "after the call" card next to a navy "during the
 * call" card, following the two-column comparison card pattern from
 * FounderPricingSection's LaunchComparison.
 */

import { AFTER_CALL_POINTS, DURING_CALL_POINTS } from '../data';

export function TimingSection() {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20 v2-halftone relative">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-block text-xs md:text-sm font-bold tracking-widest uppercase text-[#2367EE] mb-3">
            The Short Answer
          </span>
          <h2 className="font-comic text-3xl md:text-4xl lg:text-5xl text-[#1D4871] mb-4 tracking-wide">
            Timing Changes Everything
          </h2>
          <p className="text-[1.2rem] text-[#1D4871]/70 max-w-2xl mx-auto leading-relaxed">
            Most coaching tools are built around the recording. They wait for the
            call to end, grade what happened, and hand you feedback about a
            conversation that is already over. That review has real value, but a
            scorecard cannot help you when a prospect says they already have an
            agent and you have a few seconds to respond. Sayso is built for those
            seconds.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-[#F4F4F5] rounded-2xl v2-comic-border-light p-6 md:p-7">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#1D4871]/50 mb-4">
              After the Call
            </span>
            <h3 className="font-bold text-lg text-[#1D4871] mb-4">Most coaching tools</h3>
            <ul className="space-y-3">
              {AFTER_CALL_POINTS.map((point) => (
                <li key={point} className="flex gap-3 text-[#1D4871]/70 leading-relaxed">
                  <span className="text-[#1D4871]/40">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#1D4871] rounded-2xl v2-comic-border v2-comic-shadow p-6 md:p-7">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#FFDE59] mb-4">
              During the Call
            </span>
            <h3 className="font-bold text-lg text-white mb-4">Sayso</h3>
            <ul className="space-y-3">
              {DURING_CALL_POINTS.map((point) => (
                <li key={point} className="flex gap-3 text-white/80 leading-relaxed">
                  <span className="text-[#FFDE59]">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
