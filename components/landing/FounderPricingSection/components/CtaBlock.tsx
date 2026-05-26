/**
 * Closing CTA block. Dark navy panel with the lock-in pitch and a button
 * that opens the Sayso demo calendar.
 */

export function CtaBlock() {
  return (
    <section className="bg-[#1D4871] v2-comic-border v2-comic-shadow rounded-2xl p-8 md:p-10 text-center">
      <h2 className="font-comic text-3xl md:text-4xl text-white tracking-wide mb-3">
        Lock in Founder Pricing
      </h2>
      <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-6 leading-relaxed">
        Founder Pricing is available for a limited number of teams until Sayso&apos;s hard launch, expected fall 2026, and the rate you lock in now is yours for good. If you want your team on Sayso, now is the time to start.
      </p>
      <a
        href="https://calendly.com/asksayso/demo"
        target="_blank"
        rel="noopener noreferrer"
        data-analytics-id="cta-book-call-founder-pricing"
        className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm md:text-base font-bold bg-[#FFDE59] text-[#1D4871] border-2 border-white v2-comic-btn focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FFDE59]"
      >
        Book a call
      </a>
      <p className="text-xs md:text-sm text-white/70 mt-4">
        Questions on team pricing? Email{' '}
        <a
          href="mailto:kuvaal@asksayso.com"
          className="text-[#FFDE59] hover:underline"
        >
          kuvaal@asksayso.com
        </a>
      </p>
    </section>
  );
}
