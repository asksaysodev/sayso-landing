/**
 * Homepage hero: headline, value statement, audience lines, and the main CTAs.
 */

import { audienceLines } from '../data';
import { HomepageCtas } from './HomepageCtas';

export function HomepageHero() {
  return (
    <section className="pt-12 pb-14 md:pt-20 md:pb-24">
      <div className="max-w-[860px] mx-auto px-4 md:px-6 text-center">
        <h1 className="font-comic text-[2.6rem] leading-none md:text-6xl lg:text-7xl tracking-wide text-primary text-balance">
          Your Best Sales Leader
          <br />
          <span className="px-1 bg-[linear-gradient(transparent_58%,#FFDE59_58%,#FFDE59_92%,transparent_92%)]">
            on Every Call
          </span>
        </h1>
        <p className="max-w-[720px] mx-auto mt-5 mb-7 md:mt-6 md:mb-8 text-lg md:text-xl leading-relaxed text-[#515C6C] text-balance">
          Imagine a sales leader beside every agent, helping them win every moment of each prospecting
          call. Sayso shows real-time guidance on screen while the prospect talks: what to say next, how
          to handle the objection, and the buying signals to book next steps.
        </p>
        <div className="grid max-w-[340px] sm:max-w-[720px] mx-auto mb-7 md:mb-8 divide-y divide-accent-bg sm:divide-y-0 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-4 text-center sm:text-left">
          {audienceLines.map((line) => (
            <div
              key={line.label}
              className="py-3.5 sm:py-0.5 sm:pl-3.5 sm:border-l-4 sm:border-accent text-[15px] leading-normal text-[#515C6C] text-balance"
            >
              <strong className="block mb-1 text-xs font-extrabold tracking-[0.08em] uppercase text-cta">
                {line.label}
              </strong>
              {line.text}
            </div>
          ))}
        </div>
        <HomepageCtas placement="hero" />
        <p className="mt-4 text-sm font-semibold text-[#515C6C]">
          Works with any CRM and dialer. No changes to your tech stack.
        </p>
      </div>
    </section>
  );
}
