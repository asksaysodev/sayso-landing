/**
 * Top of page hero. "Sayso for Teams" pow badge above the headline,
 * then a description of what the page is about.
 */

export function Hero() {
  return (
    <section className="text-center">
      <span className="v2-pow-badge inline-block px-4 py-1.5 rounded-full text-xs md:text-sm tracking-widest mb-5">
        Sayso for Teams
      </span>
      <h1 className="font-comic text-4xl md:text-5xl lg:text-6xl text-[#1D4871] tracking-wide mb-5 leading-tight">
        Sayso Levels Up The Whole Team
      </h1>
      <p className="text-base md:text-lg text-[#1D4871]/75 max-w-3xl mx-auto leading-relaxed">
        Agents freeze or feature dump when a lead pushes back, and appointments don&apos;t get booked. Sayso coaches them live, right on the call, so they keep control and win the moment. Here is everything your team gets, at Early Access Pricing.
      </p>
    </section>
  );
}
