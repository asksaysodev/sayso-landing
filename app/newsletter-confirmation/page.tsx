import type { Metadata } from 'next';
import { Mail } from 'lucide-react';
import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext';
import { siteUrl } from '@/lib/config';
import ConfirmationActions from './ConfirmationActions';

export const metadata: Metadata = {
  title: "You're subscribed",
  description:
    'Thanks for subscribing to the Sayso newsletter. Real-world tips for making better calls and booking more appointments are on their way to your inbox.',
  alternates: {
    canonical: `${siteUrl}/newsletter-confirmation/`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function NewsletterConfirmationPage() {
  return (
    <DemoCalendarProvider>
      <div className="relative bg-[#F4F4F5] min-h-screen">
        <SaysoNavbar />
        <main>
          <section className="bg-[#F4F4F5] pt-28 pb-24 md:pt-32 md:pb-32">
            <div className="max-w-[800px] mx-auto px-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#2367EE]/10 border-2 border-[#2367EE]/30 mb-6">
                <Mail
                  size={34}
                  strokeWidth={2.5}
                  className="text-[#2367EE]"
                  aria-hidden="true"
                />
              </div>
              <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-[#2367EE] mb-3">
                Subscribed
              </p>
              <h1 className="font-comic text-4xl sm:text-5xl lg:text-6xl text-[#1D4871] leading-[1.05] tracking-wide">
                Thanks for subscribing.
              </h1>
              <p className="mt-5 text-base md:text-lg text-[#1D4871]/75 leading-relaxed max-w-[560px] mx-auto">
                You&apos;re on the list. Look out for real-world tips on making
                better calls and booking more appointments, landing in your
                inbox soon.
              </p>

              <ConfirmationActions />

              <p className="mt-6 text-sm text-[#1D4871]/60">
                Want to see Sayso live on a call? Book a quick demo above.
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </DemoCalendarProvider>
  );
}
