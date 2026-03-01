import Image from 'next/image';

interface PricingPlan {
  title: string;
  price: string;
  priceNote?: string;
  description: string;
  bulletHeader?: string;
  bullets: string[];
  buttonLabel: string;
  buttonHref: string;
  buttonVariant: 'primary' | 'secondary';
  isPopular?: boolean;
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

      <p className="text-base text-[#1D4871]/70 mb-6 leading-relaxed">
        {plan.description}
      </p>

      <ul className="flex-1 space-y-3 mb-6">
        {plan.bulletHeader && (
          <li className="text-sm font-semibold text-[#1D4871]/80 italic mb-1">
            {plan.bulletHeader}
          </li>
        )}
        {plan.bullets.map((bullet, index) => (
          <li key={index} className="flex items-start gap-2">
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

      <a
        href={plan.buttonHref}
        className={`w-full inline-flex items-center justify-center rounded-full px-6 py-3 text-sm md:text-base font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2 ${
          plan.buttonVariant === 'primary'
            ? 'bg-[#2367EE] text-white v2-comic-btn border-2 border-[#1D4871]'
            : 'border-2 border-[#1D4871] bg-white text-[#1D4871] v2-comic-btn'
        }`}
      >
        {plan.buttonLabel}
      </a>
    </div>
  );
}

export function PricingSection() {
  const plans: PricingPlan[] = [
    {
      title: 'Individual Agent',
      price: '$69 / month',
      priceNote: '*Billed annually — save $120. Or $79/month.',
      description: 'For agents who want daily consistency.',
      bullets: [
        'Cue — real-time conversation intelligence',
        'Priority support',
        'Free trial included',
        'Coming soon: Smart Capture — automated structured note-taking to popular frameworks',
        "Coming soon: Recall — Sayso's engine recalls previous context from your conversations to further customize your prompts, so you're not scrambling to organize your notes pre-call",
      ],
      buttonLabel: 'Start your free trial',
      buttonHref: '#start-trial',
      buttonVariant: 'primary',
      isPopular: true,
    },
    {
      title: 'Teams',
      price: 'Custom based on team size',
      description: 'For teams and brokerages.',
      bulletHeader: 'Every agent gets what\'s in Individual Agent, plus:',
      bullets: [
        'Custom team onboarding + enablement',
        'Dedicated Team Success Manager',
        'Unlimited agents',
        'Admin controls + reporting',
      ],
      buttonLabel: 'Assemble your team',
      buttonHref: '#contact-sales',
      buttonVariant: 'secondary',
    },
    {
      title: 'Coming Soon',
      price: '',
      description: 'Secure your account now to include future developments at a significantly reduced cost.',
      bullets: [
        'Home value and market analysis live during calls',
        'Smart Capture — automated structured note-taking to popular frameworks',
        "Recall — Sayso's engine recalls previous context from your conversations to further customize your prompts, so you're not scrambling to organize your notes pre-call",
        'Custom script upload',
        'Additional note capture frameworks',
      ],
      buttonLabel: 'Questions? Chat with our team',
      buttonHref: '#chat',
      buttonVariant: 'secondary',
    },
  ];

  return (
    <section id="pricing" className="bg-[#F8F8FA] py-16 md:py-20 v2-halftone relative">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-comic text-3xl md:text-4xl lg:text-5xl text-[#1D4871] mb-4 tracking-wide">
            Simple Pricing.
          </h2>
          <p className="text-base md:text-lg text-[#1D4871]/70 max-w-2xl mx-auto leading-relaxed">
            Free Trial. Custom Set Up. Included Training.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
          {plans.map((plan, index) => (
            <PricingCardV4 key={index} plan={plan} />
          ))}
        </div>

        <p className="text-center text-xs text-[#1D4871]/50">
          Prices shown in USD. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
