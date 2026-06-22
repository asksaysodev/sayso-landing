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
    <section className="bg-[#1D4871] v2-comic-border v2-comic-shadow rounded-2xl p-7 md:p-10">
      <span className="block text-xs font-bold tracking-widest uppercase text-[#FFDE59] mb-3">
        How pricing works
      </span>
      <h2 className="font-comic text-3xl md:text-4xl text-white tracking-wide mb-4">
        One price, your whole team
      </h2>
      <p className="text-base md:text-lg text-white/90 leading-relaxed">
        We don&apos;t bill <em>per-seat</em>, because some agents make more calls than others. Sayso&apos;s team price covers everyone, so you can add the ISAs, the rookies, the vets, and the agents who barely make calls. You can also add or remove agents anytime, and your price stays fixed.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-7">
        {benefits.map((b) => (
          <div
            key={b.title}
            className="bg-white/[0.07] border-2 border-white/30 rounded-xl p-5"
          >
            <h3 className="font-comic text-xl text-[#FFDE59] tracking-wide mb-2">
              {b.title}
            </h3>
            <p className="text-sm md:text-[15px] text-white/90 leading-relaxed">
              {b.body}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-[#FFDE59] border-2 border-[#1D4871] rounded-xl p-5 md:p-6 mt-5">
        <h3 className="font-comic text-xl text-[#1D4871] tracking-wide mb-2">
          What is Early Access Pricing?
        </h3>
        <p className="text-sm md:text-[15px] text-[#1D4871] font-medium leading-relaxed">
          A significant lifetime discount for believing in Sayso&apos;s version 1. When Sayso hard launches to the public ({FOUNDER_PRICING_CONFIG.launchWindow}), pricing goes up and moves to a la carte per product. Locking in now keeps your pricing for good.
        </p>
      </div>
    </section>
  );
}
