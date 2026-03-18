import type { Metadata } from 'next';
import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asksayso.com';
const CALENDAR_URL =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0eeiee8mED3XOLfAhzApvxOvHL96hIK8pNfAcZBY89TaKTa_LeVrtJr_kEbOlbQyb1juvLNPG3?gv=true';

export const metadata: Metadata = {
  title: 'Book a Demo',
  description:
    'Schedule a meeting with the founders to see how Sayso can help your real estate team book more appointments.',
  alternates: {
    canonical: `${siteUrl}/demo`,
  },
  openGraph: {
    title: 'Book a Demo | Sayso',
    description:
      'Schedule a meeting with the founders to see how Sayso can help your real estate team book more appointments.',
    url: `${siteUrl}/demo`,
    type: 'website',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Book a Demo with Sayso',
      },
    ],
  },
  twitter: {
    title: 'Book a Demo | Sayso',
    description:
      'Schedule a meeting with the founders to see how Sayso can help your real estate team book more appointments.',
    images: ['/og-default.png'],
  },
};

export default function DemoPage() {
  return (
    <DemoCalendarProvider>
      <div className="relative bg-white min-h-screen">
        <SaysoNavbar />
        <main>
          <section className="max-w-[900px] mx-auto px-6 pt-32 pb-10 text-center">
            <h1 className="font-comic text-5xl sm:text-6xl lg:text-7xl text-[#1D4871] leading-[1.05] tracking-wide">
              Book a Demo
            </h1>
            <p className="mt-5 text-lg md:text-xl text-[#1D4871]/75 leading-relaxed max-w-[600px] mx-auto">
              Schedule a meeting to see Sayso in action!
            </p>
          </section>

          <section className="w-full px-4 md:px-6 pb-16">
            <div className="max-w-[900px] mx-auto rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-lg">
              <iframe
                src={CALENDAR_URL}
                className="w-full border-0"
                style={{ height: '700px' }}
                title="Book a demo with the Sayso founders"
                loading="lazy"
              />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </DemoCalendarProvider>
  );
}
