import { StepsList } from '@/components/landing/StepsList';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/pages/PageHeader';

const STEPS = [
  { id: 1, text: 'Log in to your Sayso account' },
  { id: 2, text: 'Find your unique referral code in your account panel' },
  { id: 3, text: 'Share it with friends, teammates, or your network' },
  { id: 4, text: 'They sign up and get a discount, you get a credit' },
];

export function ReferralPageContent() {
  return (
    <main className="bg-[#F4F4F5] min-h-screen">
      <PageHeader
        standalone
        title="Do you love Sayso?"
        intro="Invite someone to Sayso, and you both get rewarded!"
      />
      <div className="max-w-[760px] mx-auto px-6 pb-16 md:pb-24">
        <div className="border-t border-[#1D4871]/10" />

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
