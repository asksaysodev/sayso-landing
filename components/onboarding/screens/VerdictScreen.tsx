'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export function VerdictScreen() {
  const [showToast, setShowToast] = useState(false);

  const handleStartTrial = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="text-center pb-4"
    >
      {/* Section 1: The Verdict */}
      <div>
        <span className="text-4xl block mb-2">🎉</span>
        <h1 className="text-2xl md:text-3xl font-bold text-[#1D4871]">
          SaySo is perfect for you!
        </h1>
        <p className="text-sm md:text-base text-[#1D4871]/70 max-w-md mx-auto mt-2 leading-relaxed">
          Based on your goals, our tools are designed to help you close more deals.
          Start your 3-day trial to get full access.
        </p>
      </div>

      {/* Section 2: Mock Stripe Checkout */}
      <div className="max-w-md mx-auto mt-5 rounded-2xl border-2 border-[#D7DEE1] bg-white p-5 text-left">
        <h2 className="text-lg font-bold text-[#1D4871]">
          SaySo Pro: 3-Day Free Trial
        </h2>
        <div className="h-px bg-[#D7DEE1] my-3" />

        {/* Card Number */}
        <div className="mb-3">
          <label className="text-xs font-bold text-[#1D4871] mb-1 block">
            💳 Card Number
          </label>
          <input
            type="text"
            readOnly
            value="4242 4242 4242 4242"
            className="w-full rounded-xl border-2 border-[#D7DEE1] px-4 py-2.5 text-base text-[#1D4871] font-sans bg-[#F4F4F5] cursor-default"
          />
        </div>

        {/* Expiry + CVC */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-xs font-bold text-[#1D4871] mb-1 block">
              Expiry
            </label>
            <input
              type="text"
              readOnly
              value="12 / 28"
              className="w-full rounded-xl border-2 border-[#D7DEE1] px-4 py-2.5 text-base text-[#1D4871] font-sans bg-[#F4F4F5] cursor-default"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[#1D4871] mb-1 block">
              CVC
            </label>
            <input
              type="text"
              readOnly
              value="123"
              className="w-full rounded-xl border-2 border-[#D7DEE1] px-4 py-2.5 text-base text-[#1D4871] font-sans bg-[#F4F4F5] cursor-default"
            />
          </div>
        </div>

        <p className="text-xs text-[#1D4871]/60">
          Then $49/mo after trial
        </p>

        {/* CTA */}
        <button
          onClick={handleStartTrial}
          className="w-full rounded-full bg-[#2367EE] text-white font-bold text-base py-3 mt-4 flex items-center justify-center gap-2 hover:bg-[#1b56cc] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2 cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 512 512" fill="none">
            <path
              d="M294.4 25.6L115.2 281.6H256L217.6 486.4L396.8 230.4H256L294.4 25.6Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="20"
            />
          </svg>
          Start Free Trial
        </button>

        {/* Security badge */}
        <p className="flex items-center justify-center gap-2 mt-3 text-xs text-[#1D4871]/40">
          🔒 Secured by Stripe
        </p>
      </div>

      {/* Toast notification */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1D4871] text-white px-6 py-3 rounded-xl shadow-lg text-sm font-semibold z-50"
        >
          This is a demo! Stripe checkout would launch here.
        </motion.div>
      )}
    </motion.div>
  );
}
