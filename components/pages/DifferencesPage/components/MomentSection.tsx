/**
 * The one-line answer the hero CTA scrolls to: Sayso works in the moment,
 * not after it. A single statement band on the light gray surface.
 */

export function MomentSection() {
  return (
    <section id="how" className="bg-[#F8F8FA] py-16 md:py-24 v2-halftone relative scroll-mt-24">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
        <h2 className="font-comic text-3xl md:text-4xl lg:text-5xl text-[#1D4871] tracking-wide">
          The difference? Sayso is in the moment, not after.
        </h2>
        <p className="mt-6 text-[1.2rem] text-[#1D4871]/70 max-w-3xl mx-auto leading-relaxed">
          Sayso works during the call, shows you what to say, and gets out of the
          way. There is nothing to study, nothing to remember, and no hoping the
          agent remembers what to do.
        </p>
      </div>
    </section>
  );
}
