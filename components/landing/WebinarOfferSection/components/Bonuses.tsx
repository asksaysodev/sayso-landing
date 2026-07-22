/**
 * Webinar bonuses: a navy "prize board" of the three extras that only come with
 * claiming on the webinar. Yellow stars mark each one.
 */

import { Star } from 'lucide-react';
import { BONUSES } from '../data';

export function Bonuses() {
  return (
    <section className="py-12 md:py-14">
      <div className="max-w-[680px] mx-auto px-5 md:px-6">
        <h2 className="font-comic text-3xl md:text-4xl text-[#1D4871] text-center tracking-wide mb-2">
          Claim your webinar bonuses
        </h2>
        <p className="text-center text-[#1D4871]/60 mb-8">
          Nobody gets these at the regular price. They only come with the webinar
          offer.
        </p>

        <div className="bg-[#1D4871] v2-comic-border v2-comic-shadow rounded-2xl p-6 md:p-8">
          {BONUSES.map((bonus, i) => (
            <div
              key={bonus.title}
              className={`flex items-start gap-4 md:gap-5 py-4 ${
                i > 0 ? 'border-t border-dashed border-white/25' : ''
              }`}
            >
              <Star
                size={40}
                strokeWidth={1.5}
                className="shrink-0 fill-[#FFDE59] text-[#FFDE59] -rotate-6 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <p className="font-bold text-[#FFDE59] text-lg mb-1">
                  {bonus.title}
                </p>
                <p className="text-sm md:text-[15px] text-[#C8D3E0] leading-relaxed">
                  {bonus.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
