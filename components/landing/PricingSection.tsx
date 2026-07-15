'use client';

import { useState } from 'react';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';

type BillingPeriod = 'annual' | 'monthly';

interface BulletGroup {
  header?: string;
  bullets: string[];
}

interface PricingPlan {
  title: string;
  price: string;
  priceNote?: string;
  description: string;
  groups: BulletGroup[];
  buttonLabel: string;
  buttonOnClick: () => void;
  buttonVariant: 'primary' | 'secondary';
  analyticsId: string;
  isPopular?: boolean;
}

function BillingToggle({
  billing,
  onChange,
}: {
  billing: BillingPeriod;
  onChange: (billing: BillingPeriod) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Billing period"
      className="inline-flex items-center gap-1 bg-white rounded-full v2-comic-border v2-comic-shadow-sm p-1.5"
    >
      <button
        type="button"
        onClick={() => onChange('annual')}
        aria-pressed={billing === 'annual'}
        data-analytics-id="pricing-billing-toggle-annual"
        className={`inline-flex items-center gap-2 rounded-full px-4 md:px-5 py-2 text-sm font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] ${
          billing === 'annual' ? 'bg-[#2367EE] text-white' : 'bg-transparent text-[#1D4871] hover:bg-[#F8F8FA]'
        }`}
      >
        Annual
        <span className="bg-[#FFDE59] text-[#1D4871] border border-[#1D4871] rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide whitespace-nowrap">
          SAVE $1,200
        </span>
      </button>
      <button
        type="button"
        onClick={() => onChange('monthly')}
        aria-pressed={billing === 'monthly'}
        data-analytics-id="pricing-billing-toggle-monthly"
        className={`rounded-full px-4 md:px-5 py-2 text-sm font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] ${
          billing === 'monthly' ? 'bg-[#2367EE] text-white' : 'bg-transparent text-[#1D4871] hover:bg-[#F8F8FA]'
        }`}
      >
        Monthly
      </button>
    </div>
  );
}

function PricingCardV4({ plan }: { plan: PricingPlan }) {
  return (
    <div className={`relative flex flex-col h-full bg-white rounded-2xl v2-comic-border v4-accent-top p-6 md:p-7 ${plan.isPopular ? 'v2-comic-shadow-blue' : 'v2-comic-shadow'} ${plan.isPopular ? 'shadow-[4px_4px_0px_#2367EE,0_0_20px_rgba(255,222,89,0.3)]' : ''}`}>
      {plan.isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="v2-pow-badge px-4 py-1.5 rounded-lg text-sm font-comic tracking-wider inline-block">
            MOST POPULAR
          </span>
        </div>
      )}

      <h3 className="font-comic text-2xl md:text-3xl text-[#1D4871] mb-2 tracking-wide">
        {plan.title}
      </h3>

      <div className="mb-3">
        {plan.price && (
          <p className="text-3xl md:text-4xl font-bold text-[#1D4871]">
            {plan.price}
          </p>
        )}
        {plan.priceNote && (
          <p className="text-sm text-[#1D4871]/60 mt-1">{plan.priceNote}</p>
        )}
      </div>

      <p className="text-base text-[#1D4871]/70 mb-4 leading-relaxed">
        {plan.description}
      </p>

      <ul className="flex-1 space-y-3 mb-6">
        {plan.groups.map((group, groupIndex) => (
          <li key={group.header ?? `group-${groupIndex}`}>
            {group.header && (
              <p className={`text-sm font-semibold text-[#1D4871]/80 italic mb-3 ${groupIndex > 0 ? 'mt-5' : ''}`}>
                {group.header}
              </p>
            )}
            <ul className="space-y-3">
              {group.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-[#2367EE] flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base text-[#1D4871]/70 leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <button
        onClick={plan.buttonOnClick}
        data-analytics-id={plan.analyticsId}
        className={`w-full inline-flex items-center justify-center rounded-full px-6 py-3 text-sm md:text-base font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2 ${
          plan.buttonVariant === 'primary'
            ? 'bg-[#2367EE] text-white v2-comic-btn border-2 border-[#1D4871]'
            : 'border-2 border-[#1D4871] bg-white text-[#1D4871] v2-comic-btn'
        }`}
      >
        {plan.buttonLabel}
      </button>
    </div>
  );
}

export function PricingSection() {
  const { openSystemSelect, openDemoCalendar } = useDemoCalendar();
  const [billing, setBilling] = useState<BillingPeriod>('annual');
  const isAnnual = billing === 'annual';

  const plans: PricingPlan[] = [
    {
      title: 'Individual Agent+',
      // TODO: confirm headline prices with Franco ($250/mo billed annually, $350/mo billed monthly)
      price: isAnnual ? '$250 / month' : '$350 / month',
      priceNote: isAnnual ? '*Billed annually, save $1,200.' : '*Billed monthly, cancel anytime.',
      description: 'For agents who want daily consistency.',
      groups: [
        {
          header: 'Sayso:',
          bullets: [
            'Cue: real-time conversation intelligence',
            'Smart Capture: automatic call notes sorted and synced to your CRM',
            'Pulse: live market data mid-call, including prices, days on market, and inventory',
            'Playbook: your custom scripts on screen, right next to Cue',
            'Composer: custom script generator, built on NLP, psychology, proven frameworks',
          ],
        },
        {
          header: 'Agent Support:',
          bullets: [
            'Weekly group coaching call for conversations & conversion',
            '1-on-1 onboarding',
            'Leads list',
            'Added to Ranked Agent Referral Network',
            'Dashboard analytics',
            'Email Support',
          ],
        },
      ],
      buttonLabel: 'Claim early access',
      // TODO: swap to new Stripe link from Franco once received
      buttonOnClick: openSystemSelect,
      buttonVariant: 'primary',
      analyticsId: 'cta-download-pricing-individual',
      isPopular: true,
    },
    {
      title: 'Teams & Brokerages',
      price: 'Custom based on team size',
      description: 'For teams and brokerages.',
      groups: [
        {
          header: 'Every agent gets what’s in Individual Agent+, and the team gets:',
          bullets: [
            'Custom team implementation + train-the-trainer',
            'Leadership dashboard with unlimited teams and groups',
            'Priority Support',
            'Dedicated CSM',
            '1-on-1 quarterly impact reviews with leadership',
            'Added to Ranked Team Referral Network',
            'Conversion Benchmarking',
          ],
        },
      ],
      buttonLabel: 'Assemble your team',
      buttonOnClick: openDemoCalendar,
      buttonVariant: 'secondary',
      analyticsId: 'cta-signup-pricing-teams',
    },
  ];

  return (
    <section id="pricing" className="bg-[#F8F8FA] py-16 md:py-20 v2-halftone relative">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <span className="v2-pow-badge inline-block px-4 py-1.5 rounded-full text-xs md:text-sm tracking-widest mb-5">
            Early Access Pricing
          </span>
          <h2 className="font-comic text-3xl md:text-4xl lg:text-5xl text-[#1D4871] mb-4 tracking-wide">
            Simple Pricing.
          </h2>
          <p className="text-base md:text-lg text-[#1D4871]/70 max-w-2xl mx-auto leading-relaxed">
            Custom Set Up. Training Included.
          </p>
          <p className="text-base md:text-lg text-[#1D4871]/70 max-w-2xl mx-auto leading-relaxed mt-3">
            Founding member &amp; Early access pricing is locked for life. As long as your subscription stays active, your rate will never increase.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <BillingToggle billing={billing} onChange={setBilling} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8 max-w-[820px] mx-auto">
          {plans.map((plan) => (
            <PricingCardV4 key={plan.title} plan={plan} />
          ))}
        </div>

        <div className="text-center mb-6">
          <button
            onClick={() => { window.location.href = '/demo'; }}
            data-analytics-id="cta-book-demo-pricing-coming-soon"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm md:text-base font-bold border-2 border-[#1D4871] bg-white text-[#1D4871] v2-comic-btn focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2"
          >
            Questions? Chat with our team
          </button>
        </div>

        <p className="text-center text-xs text-[#1D4871]/50">
          Prices shown in USD. Cancel anytime. No contracts.
        </p>
      </div>
    </section>
  );
}
