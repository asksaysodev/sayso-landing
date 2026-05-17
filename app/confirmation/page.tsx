import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Check } from 'lucide-react';
import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext';
import { siteUrl } from '@/lib/config';

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

const testimonial = {
  quote:
    'The prompts were really helping me out, giving me more direction toward booking the appointment. I felt more confident about where I was going with the conversation, and I was just coming up with a solution to give the prospect for the next question.',
  name: 'Alejandro Barrera',
  attribution: 'Anderson Real Estate Group, eXp Long Beach',
};

const showcaseFeatures = [
  {
    name: 'Cue',
    description: 'Live coaching cards that surface mid-call.',
  },
  {
    name: 'Smart Capture',
    description: 'Structured notes auto-saved to your CRM.',
  },
  {
    name: 'Pulse',
    description: 'Zip-level market data, on the fly.',
  },
];

export default function ConfirmationPage() {
  return (
    <DemoCalendarProvider>
      <div className="relative bg-white min-h-screen">
        <SaysoNavbar />
        <main>
          {/* Hero */}
          <section className="bg-[#F4F4F5] pt-28 pb-16 md:pt-32 md:pb-20">
            <div className="max-w-[800px] mx-auto px-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#2367EE]/10 border-2 border-[#2367EE]/30 mb-6">
                <Check
                  size={36}
                  strokeWidth={3}
                  className="text-[#2367EE]"
                  aria-hidden="true"
                />
              </div>
              <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-[#2367EE] mb-3">
                Demo Booked
              </p>
              <h1 className="font-comic text-4xl sm:text-5xl lg:text-6xl text-[#1D4871] leading-[1.05] tracking-wide">
                You&apos;re on the calendar.
              </h1>
              <p className="mt-5 text-base md:text-lg text-[#1D4871]/75 leading-relaxed max-w-[560px] mx-auto">
                A calendar invite is on its way to your inbox. Until then,
                here&apos;s a quick look at what Sayso does on every call.
              </p>
            </div>
          </section>

          {/* What you'll see on the demo */}
          <section className="max-w-[1100px] mx-auto px-6 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
              <div>
                <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-[#2367EE] mb-3">
                  What you&apos;ll see on the demo
                </p>
                <h2 className="font-comic text-3xl md:text-4xl text-[#1D4871] tracking-wide mb-4">
                  A coach on every call, not after.
                </h2>
                <p className="text-[#1D4871]/80 text-base md:text-lg leading-relaxed font-sans">
                  Sayso listens to your call in real time and surfaces the
                  exact thing to say next: objection handlers, better discovery
                  questions, market data for any zip. All without taking your
                  eyes off the conversation.
                </p>
                <ul className="mt-6 space-y-3">
                  {showcaseFeatures.map((feature) => (
                    <li
                      key={feature.name}
                      className="flex items-start gap-3 text-[#1D4871]"
                    >
                      <span
                        className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-[#2367EE] flex-shrink-0"
                        aria-hidden="true"
                      />
                      <p className="text-base font-sans">
                        <span className="font-bold">{feature.name}:</span>{' '}
                        <span className="text-[#1D4871]/75">
                          {feature.description}
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="relative rounded-3xl bg-[#F4F4F5] p-4 md:p-5 border border-[#1D4871]/10"
                style={{ boxShadow: '0 8px 24px rgba(29, 72, 113, 0.08)' }}
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start">
                  <div className="flex-1 min-w-0 flex flex-col gap-3">
                    <Image
                      src="/pulse-widget.svg"
                      alt="Sayso Pulse widget showing live market data for any zip code"
                      width={656}
                      height={149}
                      className="w-full h-auto"
                      priority
                    />
                    <div className="self-start inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2367EE]/10 border border-[#2367EE]/25">
                      <span className="text-xs font-semibold text-[#2367EE]">
                        Locations near the beach
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <Image
                      src="/playbook-notes.svg"
                      alt="Sayso Playbook showing the next question to ask on a call"
                      width={491}
                      height={446}
                      className="w-full h-auto"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonial */}
          <section className="bg-[#F4F4F5] py-16 md:py-20">
            <div className="max-w-[760px] mx-auto px-6 text-center">
              <svg
                className="mx-auto mb-6 text-[#FFDE59]"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M7.17 6C4.86 6 3 7.86 3 10.17c0 2.31 1.86 4.17 4.17 4.17.41 0 .8-.07 1.18-.18-.68 1.92-2.48 3.34-4.6 3.58v2.09c4.38-.27 7.83-3.9 7.83-8.33V10.17C11.58 7.86 9.72 6 7.17 6zm9.66 0c-2.31 0-4.17 1.86-4.17 4.17 0 2.31 1.86 4.17 4.17 4.17.41 0 .8-.07 1.18-.18-.68 1.92-2.48 3.34-4.6 3.58v2.09c4.38-.27 7.83-3.9 7.83-8.33V10.17C21.24 7.86 19.38 6 16.83 6z" />
              </svg>
              <blockquote>
                <p className="font-hero text-xl md:text-2xl lg:text-3xl text-[#1D4871] leading-snug">
                  {testimonial.quote}
                </p>
                <footer className="mt-6">
                  <p className="font-comic text-lg md:text-xl text-[#1D4871] tracking-wide">
                    {testimonial.name}
                  </p>
                  <p className="text-sm md:text-base text-[#1D4871]/70 leading-snug">
                    {testimonial.attribution}
                  </p>
                </footer>
              </blockquote>
            </div>
          </section>

          {/* Return to Home */}
          <section className="py-16 md:py-20">
            <div className="max-w-[800px] mx-auto px-6 text-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-[#1D4871] border-2 border-[#1D4871] hover:bg-[#F4F4F5] transition-colors"
                style={{ boxShadow: '3px 3px 0px #1D4871' }}
              >
                <span aria-hidden="true" className="mr-2">
                  ←
                </span>
                Return to Home
              </Link>
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
