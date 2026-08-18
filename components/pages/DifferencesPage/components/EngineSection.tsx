/**
 * Dark "Under the Hood" section. Explains the technical differentiators
 * that make live coaching possible (sub-second transcription, live
 * inference, real-time signals, real estate focus) as a grid of white
 * comic-bordered cards on the navy dark-section shell.
 */

import { ENGINE_DIFFERENCES } from '../data';

export function EngineSection() {
  return (
    <section className="relative bg-[#1D4871] py-12 md:py-20 lg:py-24 overflow-hidden v4-halftone-dark">
      <div className="absolute top-0 left-0 right-0 h-3 md:h-4 bg-[#FFDE59]" />
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block text-xs md:text-sm font-bold tracking-widest uppercase text-[#FFDE59] mb-3">
            Under the Hood
          </span>
          <h2 className="font-comic text-3xl md:text-4xl lg:text-5xl text-white mb-4 tracking-wide">
            The Engine Behind the Difference
          </h2>
          <p className="text-[1.2rem] text-white/70 max-w-2xl mx-auto leading-relaxed">
            Coaching a live conversation is a much harder problem than reviewing a
            recording. Sayso is built on an engine that processes your call as it
            happens, and that speed is the hardest part to replicate.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {ENGINE_DIFFERENCES.map(({ title, description, icon: Icon }) => (
            <div key={title} className="bg-white rounded-2xl v2-comic-border v2-comic-shadow p-6 md:p-7">
              <div className="w-12 h-12 rounded-xl bg-[#2367EE]/10 flex items-center justify-center mb-4">
                <Icon size={28} color="#2367EE" />
              </div>
              <h3 className="font-bold text-lg text-[#1D4871] mb-2">{title}</h3>
              <p className="text-[#1D4871]/70 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
