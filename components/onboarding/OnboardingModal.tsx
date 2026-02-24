'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { OnboardingFlow } from './OnboardingFlow';

interface OnboardingModalProps {
  onClose: () => void;
}

export function OnboardingModal({ onClose }: OnboardingModalProps) {
  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-[#F4F4F5] rounded-2xl border-2 border-[#D7DEE1] shadow-2xl w-full max-w-[640px] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 p-2 rounded-full bg-white border-2 border-[#D7DEE1] text-[#1D4871] hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2"
          aria-label="Close onboarding"
        >
          <X size={18} strokeWidth={2.5} />
        </button>

        <OnboardingFlow />
      </div>
    </div>
  );
}
