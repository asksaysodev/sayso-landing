import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import { SignupShowcase } from '@/components/landing/HomeShared/SignupShowcase';
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext';
import { siteUrl } from '@/lib/config';
import BookDemoCTA from './BookDemoCTA';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: "You're subscribed",
  description:
    "You're subscribed to the Sayso newsletter. Here's a quick look at what Sayso does on every call.",
  alternates: {
    canonical: `${siteUrl}/subscribed/`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SubscribedPage() {
  return (
    <DemoCalendarProvider>
      <div className="relative bg-[#F4F4F5] min-h-screen">
        <SaysoNavbar />
        <main>
          {/* Hero */}
          <section className="bg-[#F4F4F5] pt-28 pb-16 md:pt-32 md:pb-20">
            <div className="max-w-[800px] mx-auto px-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#2367EE]/10 mb-6">
                <Check
                  size={36}
                  strokeWidth={3}
                  className="text-[#2367EE]"
                  aria-hidden="true"
                />
              </div>
              <h1 className="font-hero font-extrabold tracking-[-0.035em] text-[#10233A] text-[40px] sm:text-5xl lg:text-6xl leading-[1.08]">
                You&apos;re subscribed.
              </h1>

              <BookDemoCTA />
            </div>
          </section>

          <SignupShowcase eyebrow="SEE IT LIVE" />

          {/* Return to Home */}
          <section className="py-16 md:py-20">
            <div className="max-w-[800px] mx-auto px-6 text-center">
              <Button href="/" variant="secondary">
                <span aria-hidden="true">
                  ←
                </span>
                Return to Home
              </Button>
              <p className="mt-5 text-sm text-[#1D4871]/60">
                Keep an eye on your inbox for your first issue.
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </DemoCalendarProvider>
  );
}
