import { StepsList } from '@/components/landing/StepsList';

const STEPS = [
  { id: 1, text: 'Apply to become a Sayso affiliate' },
  { id: 2, text: 'Get approved and receive your unique referral code or link' },
  { id: 3, text: 'Share Sayso with your network' },
  { id: 4, text: 'Earn monthly commissions' },
];

export function AffiliatePageContent() {
  return (
    <main className="bg-[#F4F4F5] min-h-screen">
      <div className="max-w-[760px] mx-auto px-6 py-16 md:py-24">

        {/* Header */}
        <div className="mb-10">
          <p className="mb-4">
            <span className="inline-block rounded-md bg-[#FFDE59] px-2.5 py-px font-comic text-[17px] tracking-[0.08em] text-[#1D4871]">PARTNERS</span>
          </p>
          <h1 className="font-hero font-extrabold tracking-[-0.035em] text-[#10233A] text-4xl md:text-[56px] leading-[1.08] mb-4">
            Become a Sayso Affiliate
          </h1>
          <p className="text-lg text-[#1D4871]/70 leading-relaxed">
            Earn recurring commission by referring users to Sayso.
          </p>
          <div className="mt-8 border-t border-[#1D4871]/10" />
        </div>

        {/* Intro */}
        <section className="mt-10 space-y-4">
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            This program is designed for coaches, creators, and partners who introduce Sayso to their networks.
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

        {/* Apply */}
        <section className="mt-10 space-y-6">
          <h2 className="font-hero text-xl md:text-2xl font-extrabold tracking-[-0.02em] text-[#10233A]">
            Ready to Apply?
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            Submit the form below and we&apos;ll be in touch!
          </p>
          <div className="rounded-[20px] overflow-hidden bg-white shadow-card">
            <iframe
              src="https://asksayso.notion.site/ebd/959fb6cea4534c5c9d5858c4f38768da"
              width="100%"
              height="600"
              style={{ border: 'none' }}
              allowFullScreen
              title="Sayso Affiliate Application"
            />
          </div>
          <p className="text-sm text-[#1D4871]/60">
            Form not loading?{' '}
            <a
              href="https://asksayso.notion.site/ebd/959fb6cea4534c5c9d5858c4f38768da"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#1D4871] transition-colors"
            >
              Open it directly →
            </a>
          </p>
        </section>

      </div>
    </main>
  );
}
