'use client';

import { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

const SIGNUP_URL = 'https://app.asksayso.com/login?signup=true';

type Step = 'select' | 'checking' | 'waitlist' | 'thankyou';

export function SystemSelectModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<Step>('select');
  const [email, setEmail] = useState('');

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Auto-advance from checking to waitlist after 3 seconds
  useEffect(() => {
    if (step === 'checking') {
      const timer = setTimeout(() => setStep('waitlist'), 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleMac = useCallback(() => {
    window.open(SIGNUP_URL, '_blank');
    onClose();
  }, [onClose]);

  const handleWindows = useCallback(() => {
    setStep('checking');
  }, []);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!res.ok) {
        console.error('Waitlist submission failed:', res.status);
      }
    } catch (err) {
      console.error('Waitlist submission error:', err);
    }

    setStep('thankyou');
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-[#111827] rounded-2xl border-2 border-[#1D4871] w-[90vw] max-w-[520px] overflow-hidden"
        style={{ boxShadow: '4px 4px 0px #1D4871' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
          aria-label="Close"
        >
          <X size={18} strokeWidth={2.5} />
        </button>

        <div className="px-8 py-12 text-center">
          {step === 'select' && (
            <>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                What system do you use?
              </h2>
              <p className="text-white/60 mb-10 text-base">
                Select your operating system to continue.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleMac}
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Mac
                </button>
                <button
                  onClick={handleWindows}
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
                  </svg>
                  Windows
                </button>
              </div>
            </>
          )}

          {step === 'checking' && (
            <>
              {/* Spinner */}
              <div className="mb-6">
                <div className="w-12 h-12 border-[3px] border-white/20 border-t-white rounded-full animate-spin mx-auto" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Checking eligibility...
              </h2>
              <p className="text-white/60 text-base">
                We&apos;re reviewing your account to see if<br />
                you&apos;re eligible for early access.
              </p>
            </>
          )}

          {step === 'waitlist' && (
            <>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Windows version coming soon!
              </h2>
              <p className="text-white/60 mb-8 text-base leading-relaxed">
                We don&apos;t support Windows yet (but will soon).<br />
                Join the waitlist and we&apos;ll notify you when it&apos;s ready.
              </p>
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FFDE59] text-base"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#FFDE59] text-[#1D4871] font-bold text-base border-2 border-[#1D4871] hover:bg-[#ffe566] transition-colors whitespace-nowrap"
                  style={{ boxShadow: '2px 2px 0px #1D4871' }}
                >
                  Join the waitlist
                </button>
              </form>
            </>
          )}

          {step === 'thankyou' && (
            <>
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                You&apos;re on the list!
              </h2>
              <p className="text-white/60 text-base">
                We&apos;ll email you as soon as SaySo is available for Windows.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
