/**
 * Top of the offer page. Frames it as exclusive to the people on the webinar,
 * then sets up the value: here is what you pay today next to what it is worth.
 */

export function Hero() {
  return (
    <section className="text-center">
      <span className="block text-xs md:text-sm font-bold tracking-widest uppercase text-[#2367EE] mb-4">
        Webinar-only offer
      </span>
      <h1 className="font-comic text-4xl md:text-5xl lg:text-6xl text-[#1D4871] tracking-wide mb-5 leading-tight">
        Only for the people on this call
      </h1>
      <p className="text-base md:text-lg text-[#1D4871]/75 max-w-2xl mx-auto leading-relaxed">
        This is the full offer we walked through on the webinar: everything you
        get, what it is actually worth, and the one price you pay today.
      </p>
    </section>
  );
}
