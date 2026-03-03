import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';

export default function StartPage() {
  return (
    <div className="min-h-screen bg-[#F4F4F5] flex items-center justify-center p-4">
      <div className="bg-[#F4F4F5] rounded-2xl border-2 border-[#D7DEE1] shadow-2xl w-full max-w-[640px]">
        <OnboardingFlow />
      </div>
    </div>
  );
}
