/**
 * Top of the offer page. Sets up the one-line pitch: here is everything you get,
 * and here is what it would normally cost.
 */

export function Hero() {
  return (
    <section className="text-center">
      <span className="block text-xs md:text-sm font-bold tracking-widest uppercase text-[#2367EE] mb-4">
        Everything you&apos;re getting
      </span>
      <h1 className="font-comic text-4xl md:text-5xl lg:text-6xl text-[#1D4871] tracking-wide mb-5 leading-tight">
        The math, out loud
      </h1>
      <p className="text-base md:text-lg text-[#1D4871]/75 max-w-2xl mx-auto leading-relaxed">
        This is the full offer we walked through on the webinar, every piece laid
        out with what it is actually worth. Add it up, then look at what you pay
        today.
      </p>
    </section>
  );
}
