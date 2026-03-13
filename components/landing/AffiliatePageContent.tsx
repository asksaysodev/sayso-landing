export function AffiliatePageContent() {
  return (
    <main className="bg-[#F4F4F5] min-h-screen">
      <div className="max-w-[760px] mx-auto px-6 py-16 md:py-24">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-[#1D4871]/60 mb-3">
            Partners
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1D4871] leading-tight mb-3">
            Become a Sayso Affiliate
          </h1>
          <p className="text-lg text-[#1D4871]/70 leading-relaxed">
            Earn recurring commission by referring users to Sayso.
          </p>
          <div className="mt-6 border-t-2 border-[#FFDE59]" />
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
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            How It Works
          </h2>
          <ol className="space-y-4">
            {[
              'Apply to become a Sayso affiliate',
              'Get approved and receive your unique referral code or link',
              'Share Sayso with your network',
              'Earn monthly commissions',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FFDE59] flex items-center justify-center font-bold text-[#1D4871] text-sm">
                  {i + 1}
                </span>
                <p className="text-base text-[#1D4871]/80 leading-relaxed pt-1">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* Apply */}
        <section className="mt-10 space-y-6">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            Ready to Apply?
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            Submit the form below and we&apos;ll be in touch!
          </p>
          <div className="rounded-xl overflow-hidden border border-[#1D4871]/10 shadow-sm">
            <iframe
              src="https://alert-tartan-008.notion.site/ebd/959fb6cea4534c5c9d5858c4f38768da"
              width="100%"
              height="600"
              frameBorder={0}
              allowFullScreen
              title="Sayso Affiliate Application"
            />
          </div>
        </section>

      </div>
    </main>
  );
}
