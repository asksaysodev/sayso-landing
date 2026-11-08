import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import { SignupShowcase } from '@/components/landing/HomeShared/SignupShowcase';
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext';
import { siteUrl } from '@/lib/config';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/pages/PageHeader';

export const metadata: Metadata = {
  title: "You're on the calendar | Sayso",
  description:
    "Your demo with Sayso is booked. A calendar invite is on its way. Here's a quick look at what you'll see on the call.",
  alternates: {
    canonical: `${siteUrl}/confirmation/`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ConfirmationPage() {
  return (
    <DemoCalendarProvider>
      <div className="relative bg-[#F4F4F5] min-h-screen">
        <SaysoNavbar />
        <main>
          {/* Hero */}
          <section className="bg-[#F4F4F5] pb-8 md:pb-10">
            <PageHeader
              standalone
              eyebrow={
                <>
                  <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#2367EE]/10 mb-6">
                    <Check
                      size={36}
                      strokeWidth={3}
                      className="text-[#2367EE]"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-[#2367EE]">
                    Demo Booked
                  </p>
                </>
              }
              title="You're on the calendar."
              intro="A calendar invite is on its way to your inbox. Until then, here's a quick look at what Sayso does on every call."
            />
          </section>

          <SignupShowcase eyebrow="ON YOUR DEMO" />

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
                Need to reschedule? Use the link in your calendar invite.
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </DemoCalendarProvider>
  );
}
