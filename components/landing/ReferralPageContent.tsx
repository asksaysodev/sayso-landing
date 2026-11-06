import { StepsList } from '@/components/landing/StepsList';
import { Button } from '@/components/ui/Button';

const STEPS = [
  { id: 1, text: 'Log in to your Sayso account' },
  { id: 2, text: 'Find your unique referral code in your account panel' },
  { id: 3, text: 'Share it with friends, teammates, or your network' },
  { id: 4, text: 'They sign up and get a discount, you get a credit' },
];

export function ReferralPageContent() {
  return (
    <main className="bg-[#F4F4F5] min-h-screen">
      <div className="max-w-[760px] mx-auto px-6 py-16 md:py-24">

        {/* Header */}
        <div className="mb-10">
          <p className="mb-4">
            <span className="inline-block rounded-md bg-[#FFDE59] px-2.5 py-px font-comic text-[17px] tracking-[0.08em] text-[#1D4871]">REFERRALS</span>
          </p>
          <h1 className="font-hero font-extrabold tracking-[-0.035em] text-[#10233A] text-4xl md:text-[56px] leading-[1.08] mb-4">
            Do you love Sayso?
          </h1>
          <p className="text-lg text-[#1D4871]/70 leading-relaxed">
            Invite someone to Sayso, and you both get rewarded!
          </p>
          <div className="mt-8 border-t border-[#1D4871]/10" />
        </div>

        {/* Intro */}
        <section className="mt-10 space-y-4">
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            If you&apos;re already a Sayso user, you can refer other users or teams. When they sign up, they get a discount, and you get a credit on your account.
          </p>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* How it works */}
        <section className="mt-10 space-y-6">
          <h2 className="font-hero text-xl md:text-2xl font-extrabold tracking-[-0.02em] text-[#10233A]">
            How It Works
          </h2>
          <StepsList steps={STEPS} />
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* Contact */}
        <section className="mt-10 space-y-4">
          <h2 className="font-hero text-xl md:text-2xl font-extrabold tracking-[-0.02em] text-[#10233A]">
            Questions?
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            Reach out to the team and we&apos;ll be happy to help.
          </p>
          <div>
            <Button href="mailto:support@asksayso.com">support@asksayso.com</Button>
          </div>
        </section>

      </div>
    </main>
  );
}
