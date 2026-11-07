/**
 * The dark navy panel that explains the team-wide pricing model and
 * introduces the Early Access Pricing offer in a yellow callout.
 */

import { FOUNDER_PRICING_CONFIG } from '../data';

const benefits = [
  {
    title: 'Sharper callers',
    body: 'Agents that already call will handle objections instead of pitching or freezing, and book more appointments from the same leads.',
  },
  {
    title: 'Quiet agents start dialing',
    body: 'Your agents that avoid calling get support on screen the moment they need it, so calls finally feel winnable.',
  },
];

export function PricingModelPanel() {
  return (
    <section className="rounded-[20px] bg-[#1D4871] shadow-[0_18px_40px_-18px_rgba(29,72,113,0.6)] p-7 md:p-10">
      <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#FFDE59]">
        How pricing works
      </span>
      <h2 className="mb-4 font-hero font-extrabold tracking-[-0.03em] text-white text-[clamp(28px,4vw,40px)] leading-[1.1]">
        One price, your whole team
      </h2>
      <p className="text-base md:text-lg text-white/90 leading-relaxed">
        We don&apos;t bill <em>per-seat</em>, because some agents make more calls than others. Sayso&apos;s team price covers everyone, so you can add the ISAs, the rookies, the vets, and the agents who barely make calls. You can also add or remove agents anytime, and your price stays fixed.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-7">
        {benefits.map((b) => (
          <div
            key={b.title}
            className="rounded-2xl bg-white/[0.07] p-5 ring-1 ring-white/15"
          >
            <h3 className="mb-2 font-hero text-lg font-bold text-[#FFDE59]">
              {b.title}
            </h3>
            <p className="text-sm md:text-[15px] text-white/90 leading-relaxed">
              {b.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl bg-[#FFDE59] p-5 md:p-6">
        <h3 className="mb-2 font-hero text-lg font-bold text-[#10233A]">
          What is Early Access Pricing?
        </h3>
        <p className="text-sm md:text-[15px] text-[#1D4871] font-medium leading-relaxed">
          A significant lifetime discount for believing in Sayso&apos;s version 1. When Sayso hard launches to the public ({FOUNDER_PRICING_CONFIG.launchWindow}), pricing goes up and moves to a la carte per product. Locking in now keeps your pricing for good.
        </p>
      </div>
    </section>
  );
}
