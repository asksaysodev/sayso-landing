import type { Metadata } from 'next';
import { Mail } from 'lucide-react';
import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext';
import { siteUrl } from '@/lib/config';
import ConfirmationActions from './ConfirmationActions';
import { PageHeader } from '@/components/pages/PageHeader';

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
          <section className="bg-[#F4F4F5] pb-16 md:pb-20">
            <PageHeader
              standalone
              eyebrow={
                <>
                  <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#2367EE]/10 mb-6">
                    <Mail
                      size={34}
                      strokeWidth={2.5}
                      className="text-[#2367EE]"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-[#2367EE]">
                    Subscribed
                  </p>
                </>
              }
              title="Thanks for subscribing."
            >
              <ConfirmationActions />

              <p className="mt-6 text-sm text-[#1D4871]/60">
                Want to see Sayso live on a call? Book a quick demo above.
              </p>
            </PageHeader>
          </section>
        </main>
        <Footer />
      </div>
    </DemoCalendarProvider>
  );
}
