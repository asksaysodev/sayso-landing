'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface PaywallScreenProps {
  computerType: string | null;
  isPathB: boolean;
}

interface PlanCardProps {
  title: string;
  price: string;
  originalPrice?: string;
  priceNote: string;
  description: string;
  bulletHeader?: string;
  bullets: string[];
  buttonLabel: string;
  isPopular?: boolean;
  isPC?: boolean;
  onCTA: () => void;
}

function PlanCard({
  title,
  price,
  originalPrice,
  priceNote,
  description,
  bulletHeader,
  bullets,
  buttonLabel,
  isPopular,
  isPC,
  onCTA,
}: PlanCardProps) {
  return (
    <div
      className={`relative flex flex-col h-full bg-white rounded-2xl v2-comic-border p-6 ${
        isPopular
          ? 'v2-comic-shadow-blue shadow-[4px_4px_0px_#2367EE,0_0_20px_rgba(255,222,89,0.3)]'
          : 'v2-comic-shadow'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="v2-pow-badge px-4 py-1.5 rounded-lg text-sm font-comic tracking-wider inline-block">
            MOST POPULAR
          </span>
        </div>
      )}

      <h3 className="font-comic text-2xl text-[#1D4871] mb-2 tracking-wide">{title}</h3>

      <div className="mb-3">
        {originalPrice && (
          <p className="text-base text-[#1D4871]/40 line-through">{originalPrice}</p>
        )}
        <p className="text-3xl font-bold text-[#1D4871]">{price}</p>
        <p className="text-sm text-[#1D4871]/60 mt-1">{priceNote}</p>
      </div>

      <p className="text-base text-[#1D4871]/70 mb-5 leading-relaxed">{description}</p>

      <ul className="flex-1 space-y-3 mb-6">
        {bulletHeader && (
          <li className="text-sm font-semibold text-[#1D4871]/80 italic mb-1">{bulletHeader}</li>
        )}
        {bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-2">
            <svg
              className="w-5 h-5 text-[#2367EE] flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-[#1D4871]/70 leading-relaxed">{bullet}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onCTA}
        className={`w-full rounded-full px-6 py-3 text-base font-bold border-2 border-[#1D4871] v2-comic-btn focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2 cursor-pointer transition-colors ${
          isPopular
            ? 'bg-[#2367EE] text-white hover:bg-[#1b56cc]'
            : 'bg-white text-[#1D4871] hover:bg-[#F4F4F5]'
        }`}
      >
        {buttonLabel}
      </button>
    </div>
  );
}

export function PaywallScreen({ computerType, isPathB }: PaywallScreenProps) {
  const isPC = computerType === 'PC';
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const individualBullets = [
    'Cue — real-time conversation intelligence',
    'Priority support',
    'Free trial included',
    'Coming soon: Smart Capture — automated structured note-taking',
    'Coming soon: Recall — context recall engine',
  ];

  const teamsBullets = [
    'Custom team onboarding + enablement',
    'Dedicated Team Success Manager',
    'Unlimited agents',
    'Admin controls + reporting',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="pb-4"
    >
      {/* Header */}
      {isPC ? (
        <div className="text-center mb-5">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1D4871]">
            Lock in your early access rate.
          </h1>
          <p className="text-sm md:text-base text-[#1D4871]/70 max-w-md mx-auto mt-2 leading-relaxed">
            Sayso is coming to PC. Sign up now and secure 50% off — for your first 3 months.
          </p>
          {/* Early access banner */}
          <div className="mt-4 inline-flex items-center gap-2 bg-[#FFDE59] text-[#1D4871] font-bold text-sm px-4 py-2 rounded-full border-2 border-[#1D4871]">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Early Access — 50% Off Everything
          </div>
        </div>
      ) : (
        <div className="text-center mb-5">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1D4871]">
            Sayso is perfect for you!
          </h1>
          <p className="text-sm md:text-base text-[#1D4871]/70 max-w-md mx-auto mt-2 leading-relaxed">
            Based on your goals, you&apos;re ready to go. Start your 3-day free trial below.
          </p>
        </div>
      )}

      {/* Pricing cards */}
      <div className={`grid grid-cols-1 gap-5 ${isPathB ? 'md:grid-cols-2' : 'max-w-sm mx-auto w-full'}`}>
        {/* Individual Agent card — always shown */}
        {isPC ? (
          <PlanCard
            title="Individual Agent"
            price="$35 / month"
            originalPrice="$69 / month"
            priceNote="Early access rate — 50% off. Billed annually. Lock it in forever."
            description="For agents who want daily consistency — at a price that never goes up."
            bullets={individualBullets}
            buttonLabel="Secure my early access"
            isPopular
            isPC
            onCTA={() => triggerToast('Individual Agent — checkout would launch here.')}
          />
        ) : (
          <PlanCard
            title="Individual Agent"
            price="$69 / month"
            priceNote="Billed annually — save $120. Or $79/month."
            description="For agents who want daily consistency."
            bullets={individualBullets}
            buttonLabel="Start your free trial"
            isPopular
            onCTA={() => triggerToast('Individual Agent — checkout would launch here.')}
          />
        )}

        {/* Teams card — Flow B only */}
        {isPathB && (
          isPC ? (
            <PlanCard
              title="Teams"
              price="Custom — 50% off"
              priceNote="50% off standard rates for your entire team. Early access pricing, locked in."
              description="For teams and brokerages who want to get ahead before PC launch."
              bulletHeader="Every agent gets Individual Agent, plus:"
              bullets={teamsBullets}
              buttonLabel="Claim team early access"
              isPC
              onCTA={() => triggerToast('Teams — our team would reach out here.')}
            />
          ) : (
            <PlanCard
              title="Teams"
              price="Custom based on team size"
              priceNote="Pricing based on your team's needs."
              description="For teams and brokerages."
              bulletHeader="Every agent gets Individual Agent, plus:"
              bullets={teamsBullets}
              buttonLabel="Talk to our team"
              onCTA={() => triggerToast('Teams — our team would reach out here.')}
            />
          )
        )}
      </div>

      <p className="text-center text-xs text-[#1D4871]/40 mt-5">
        Prices shown in USD. Cancel anytime.
      </p>

      {/* Toast */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1D4871] text-white px-6 py-3 rounded-xl shadow-lg text-sm font-semibold z-50 whitespace-nowrap"
        >
          {toastMessage}
        </motion.div>
      )}
    </motion.div>
  );
}
