'use client';

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function OnboardingProgress({ currentStep, totalSteps }: OnboardingProgressProps) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-white border-b border-[#D7DEE1]">
      <div className="max-w-2xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="/" aria-label="Sayso home">
          <img
            src="/logo-pos-horizontal.png"
            alt="Sayso"
            className="h-6 md:h-8"
          />
        </a>
        <span className="text-xs text-[#1D4871]/50 font-sans">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
      <div className="w-full h-1.5 bg-[#D7DEE1]">
        <div
          className="h-full bg-[#2367EE] rounded-r-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
