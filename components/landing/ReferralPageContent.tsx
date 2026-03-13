import { StepsList } from '@/components/landing/StepsList';

const STEPS = [
  { id: 1, text: 'Log in to your Sayso account' },
  { id: 2, text: 'Find your unique referral code in your account panel' },
  { id: 3, text: 'Share it with friends, teammates, or your network' },
  { id: 4, text: 'They sign up and get a discount — you get a credit' },
];

export function ReferralPageContent() {
  return (
    <main className="bg-[#F4F4F5] min-h-screen">
      <div className="max-w-[760px] mx-auto px-6 py-16 md:py-24">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-[#1D4871]/60 mb-3">
            Referrals
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1D4871] leading-tight mb-3">
            Do you love Sayso?
          </h1>
          <p className="text-lg text-[#1D4871]/70 leading-relaxed">
            Invite someone to Sayso, and you both get rewarded!
          </p>
          <div className="mt-6 border-t-2 border-[#FFDE59]" />
        </div>

        {/* Intro */}
        <section className="mt-10 space-y-4">
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            If you&apos;re already a Sayso user, you can refer other users or teams. When they sign up, they get a discount — and you get a credit on your account.
          </p>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* How it works */}
        <section className="mt-10 space-y-6">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            How It Works
          </h2>
          <StepsList steps={STEPS} />
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* Contact */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            Questions?
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            Reach out to the team and we&apos;ll be happy to help.
          </p>
          <a
            href="mailto:support@asksayso.com"
            className="inline-flex items-center gap-2 bg-[#FFDE59] hover:bg-[#f5d400] text-[#1D4871] font-bold px-6 py-3 rounded-lg transition-colors text-sm uppercase tracking-wide"
          >
            support@asksayso.com
          </a>
        </section>

      </div>
    </main>
  );
}
