/**
 * "Everything included" in the Webinar Exclusive offer. All items live in one
 * card, one color, with no platform/bonus split, no sub-labels, and no value
 * pills, so it reads as a single offer (including on mobile) instead of two
 * separate things.
 */

import { Check } from 'lucide-react';
import { OFFER_COLUMNS } from '../data';

// Flatten the two columns into one list: platform items first, bonuses after.
const OFFER_ITEMS = OFFER_COLUMNS.flatMap((col) => col.items);

export function WhatYouGet() {
  return (
    <section>
      <h2 className="font-comic text-2xl md:text-3xl text-[#1D4871] tracking-wide text-center mb-6">
        Everything included
      </h2>
      <div className="bg-white v2-comic-border v2-comic-shadow rounded-2xl p-6 md:p-8">
        <ul className="grid gap-x-8 gap-y-3.5 md:grid-cols-2">
          {OFFER_ITEMS.map((item) => (
            <li key={item.name} className="flex items-start gap-3">
              <span
                className="shrink-0 mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#2367EE]"
                aria-hidden="true"
              >
                <Check size={13} strokeWidth={3} className="text-white" />
              </span>
              <p className="text-sm md:text-[15px] leading-snug">
                <span className="font-bold text-[#1D4871]">{item.name}</span>
                {item.detail && (
                  <span className="text-[#1D4871]/70">: {item.detail}</span>
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
