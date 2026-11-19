/** /pricing page header: a one-line H1 only. Kept short so both plan cards fit on a laptop screen. */
export function PricingPageHeader() {
  return (
    <div className="mx-auto mb-5 max-w-[740px] text-center">
      <h1
        id="pricing-title"
        className="text-balance font-hero text-[clamp(30px,4.5vw,44px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#10233A]"
      >
        Sayso pricing
      </h1>
    </div>
  );
}
