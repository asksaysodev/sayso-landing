'use client';

interface OnboardingNavButtonsProps {
  onBack: () => void;
  onContinue: () => void;
  canContinue: boolean;
  showBack: boolean;
  continueLabel?: string;
  continueDataAnalyticsId?: string;
}

export function OnboardingNavButtons({
  onBack,
  onContinue,
  canContinue,
  showBack,
  continueLabel,
  continueDataAnalyticsId,
}: OnboardingNavButtonsProps) {
  return (
    <div className="p-4 border-t border-[#D7DEE1] bg-white rounded-b-2xl">
      <div className="flex items-center justify-between">
        {showBack ? (
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center rounded-full bg-white text-[#1D4871] w-11 h-11 border-2 border-[#1D4871] transition-colors hover:bg-[#F4F4F5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2 cursor-pointer"
            aria-label="Back"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : (
          <div />
        )}

        {continueLabel ? (
          <button
            onClick={onContinue}
            disabled={!canContinue}
            data-analytics-id={continueDataAnalyticsId}
            className={`px-8 py-3 rounded-full bg-[#2367EE] text-white font-bold text-base transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2 ${
              canContinue
                ? 'hover:bg-[#1b56cc] cursor-pointer'
                : 'opacity-50 cursor-not-allowed'
            }`}
          >
            {continueLabel}
          </button>
        ) : (
          <button
            onClick={onContinue}
            disabled={!canContinue}
            className={`inline-flex items-center justify-center rounded-full bg-[#2367EE] text-white w-11 h-11 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2 ${
              canContinue
                ? 'hover:bg-[#1b56cc] cursor-pointer'
                : 'opacity-50 cursor-not-allowed'
            }`}
            aria-label="Next"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
