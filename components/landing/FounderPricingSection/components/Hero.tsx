/**
 * Top of page hero. "Sayso for Teams" yellow label above the headline,
 * then a description of what the page is about.
 */

export function Hero() {
  return (
    <section className="text-center">
      <span className="mb-5 inline-block rounded-md border border-[rgba(16,35,58,0.14)] bg-[#FFDE59] px-3 py-0.5 font-comic text-[20px] tracking-[0.07em] text-[#1D4871]">
        Sayso for Teams
      </span>
      <h1 className="mb-5 text-balance font-hero text-[40px] font-extrabold leading-[1.08] tracking-[-0.035em] text-[#10233A] sm:text-5xl lg:text-6xl">
        Sayso Levels Up The Whole Team
      </h1>
      <p className="text-base md:text-lg text-[#556B86] max-w-3xl mx-auto leading-relaxed">
        Agents freeze or feature dump when a lead pushes back, and appointments don&apos;t get booked. Sayso coaches them live, right on the
        call, so they keep control and win the moment. Here is everything your team gets, at Early Access Pricing.
      </p>
    </section>
  );
}
