/**
 * FAQ accordion. Native details/summary so it works without JS; the plus icon
 * rotates into an x when open. One entry embeds the ROI calculator. Answers with
 * links live here as JSX rather than in data.ts.
 */

import type { ReactNode } from 'react';
import { Plus } from 'lucide-react';
import { RoiCalculator } from './RoiCalculator';
import { KUVAAL_CALL_URL, REQUEST_DEMO_URL } from '../data';

const linkCls = 'font-bold text-[#2367EE] hover:underline';

const FAQ_ITEMS: { q: string; a: ReactNode }[] = [
  {
    q: 'Can I pay monthly instead?',
    a: (
      <p>
        Yes. At checkout you can split the discounted $2,700 into monthly
        payments, around $225/mo, using Affirm or Klarna, subject to their
        approval. You still get the full webinar offer. Alternatively you can go
        month-to-month at $350/mo, but the webinar discount, 2x lead list, and
        signed-client guarantee stay with the webinar offer.
      </p>
    ),
  },
  {
    q: 'Do you have team or brokerage packages?',
    a: (
      <p>
        Yes, use{' '}
        <a href={REQUEST_DEMO_URL} className={linkCls}>
          this form
        </a>{' '}
        to set up a time to chat with Kuvaal.
      </p>
    ),
  },
  {
    q: "What if I don't have leads to call?",
    a: (
      <p>
        That&apos;s exactly why we provide the curated lead list. You leave
        onboarding with numbers to dial. And the weekly coaching includes
        database reactivation and follow-up frameworks, so your existing contacts
        become call lists too. Claiming the webinar offer also means you get 2x
        the number of leads.
      </p>
    ),
  },
  {
    q: "What do I need to run Sayso? What if I don't have a CRM or dialer?",
    a: (
      <>
        <p>
          Just a laptop or desktop. Sayso works with any CRM or dialer. A phone
          app is on the development map.
        </p>
        <p className="mt-3">
          Don&apos;t have a CRM or dialer? Kuvaal will get you set up with exactly
          what you need.
        </p>
      </>
    ),
  },
  {
    q: "I'm not techy, how fast can I start, and how much time does it take?",
    a: (
      <p>
        Your 1-on-1 onboarding handles the full setup with you, Sayso can be set
        up in 5 minutes. After that it&apos;s one weekly coaching call plus the
        calls you&apos;re already making. Sayso doesn&apos;t add work to your day,
        it works inside the conversations you were going to have anyway.
      </p>
    ),
  },
  {
    q: 'Is there a contract?',
    a: (
      <p>
        The annual offer is prepaid for the year. Monthly is month-to-month. And
        if you choose to renew, your webinar offer price is locked in for as long
        as you stay, it does not increase.
      </p>
    ),
  },
  {
    q: "What's my return if I close just one deal?",
    a: <RoiCalculator />,
  },
  {
    q: "What if it doesn't work for me?",
    a: (
      <p>
        Then we give you all your money back. Sign at least 1 client, a buyer
        agreement or listing agreement, in your first 12 months with Sayso or get
        a full refund. The risk is on us, not you. All you need to do is have 10
        conversations a week through Sayso and show up to the weekly training.
      </p>
    ),
  },
  {
    q: 'Can I think about it, or talk it through first?',
    a: (
      <p>
        If you want to talk it through,{' '}
        <a href={KUVAAL_CALL_URL} className={linkCls}>
          book a time with Kuvaal here
        </a>
        , just do it before the deadline. You can also buy next week, but
        you&apos;ll be without the bonuses.
      </p>
    ),
  },
];

export function Faq() {
  return (
    <section className="py-12 md:py-14">
      <div className="max-w-[680px] mx-auto px-5 md:px-6">
        <h2 className="font-comic text-3xl md:text-4xl text-[#1D4871] text-center tracking-wide mb-8">
          Questions
        </h2>
        <div className="flex flex-col gap-3">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.q}
              className="group bg-white v2-comic-border rounded-xl overflow-hidden"
            >
              <summary className="flex justify-between items-center gap-3 cursor-pointer px-5 py-4 font-bold text-[#1D4871] list-none [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus
                  size={20}
                  strokeWidth={3}
                  className="shrink-0 text-[#2367EE] transition-transform group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <div className="px-5 pb-4 text-[15px] text-[#1D4871]/70 leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
