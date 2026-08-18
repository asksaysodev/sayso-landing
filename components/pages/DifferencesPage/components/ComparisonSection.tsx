/**
 * "How Sayso Compares" section. One card per alternative agents ask about
 * (Shilo, MaverickRE, ChatGPT, in-person coaching). Each card describes the
 * alternative fairly, links to its actual site where one exists, and closes
 * with the Sayso difference.
 */

import { COMPETITOR_COMPARISONS } from '../data';

export function ComparisonSection() {
  return (
    <section className="bg-[#F8F8FA] py-12 md:py-16 lg:py-20 v2-halftone relative">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-block text-xs md:text-sm font-bold tracking-widest uppercase text-[#2367EE] mb-3">
            Side by Side
          </span>
          <h2 className="font-comic text-3xl md:text-4xl lg:text-5xl text-[#1D4871] mb-4 tracking-wide">
            How Sayso Compares
          </h2>
          <p className="text-[1.2rem] text-[#1D4871]/70 max-w-2xl mx-auto leading-relaxed">
            A closer look at the tools agents usually ask us about. Each one is
            good at what it was built for. Sayso was built for a different moment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {COMPETITOR_COMPARISONS.map(({ name, siteUrl, siteLabel, theirApproach, saysoDifference }) => (
            <div key={name} className="bg-white rounded-2xl v2-comic-border v2-comic-shadow-sm p-6 md:p-7">
              <div className="flex items-baseline justify-between gap-4 mb-3">
                <h3 className="font-comic text-2xl text-[#1D4871] tracking-wide">{name}</h3>
                {siteUrl && (
                  <a
                    href={siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#1D4871]/50 hover:text-[#2367EE] underline underline-offset-2 whitespace-nowrap"
                  >
                    {siteLabel}
                  </a>
                )}
              </div>
              <p className="text-[#1D4871]/70 leading-relaxed mb-4">{theirApproach}</p>
              <div className="border-l-4 border-[#FFDE59] pl-4">
                <span className="block text-xs font-bold tracking-widest uppercase text-[#2367EE] mb-1">
                  The Sayso Difference
                </span>
                <p className="text-[#1D4871] leading-relaxed">{saysoDifference}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
