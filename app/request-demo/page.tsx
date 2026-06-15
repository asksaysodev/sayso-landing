import type { Metadata } from 'next';
import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import SsFormEmbed from '@/components/landing/SsFormEmbed';
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext';
import { siteUrl } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Request a Demo',
  description:
    'Interested in learning more about Sayso? Fill out a quick form and the team will reach out to schedule a demo.',
  alternates: {
    canonical: `${siteUrl}/request-demo/`,
  },
  // Noindex: duplicates the higher-intent /demo/ booking page (sitemap priority 0.9).
  // Kept live for the footer link. follow:true so crawlers still traverse its links.
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Request a Demo | Sayso',
    description:
      'Interested in learning more about Sayso? Fill out a quick form and the team will reach out to schedule a demo.',
    url: `${siteUrl}/request-demo/`,
    type: 'website',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Request a Demo with Sayso',
      },
    ],
  },
  twitter: {
    title: 'Request a Demo | Sayso',
    description:
      'Interested in learning more about Sayso? Fill out a quick form and the team will reach out to schedule a demo.',
    images: ['/images/og-default.png'],
  },
};

export default function RequestDemoPage() {
  return (
    <DemoCalendarProvider>
      <div className="relative bg-white min-h-screen">
        <SaysoNavbar />
        <main>
          <section className="max-w-[900px] mx-auto px-6 pt-32 pb-10 text-center">
            <h1 className="font-comic text-5xl sm:text-6xl lg:text-7xl text-[#1D4871] leading-[1.05] tracking-wide">
              <span className="text-[#2367EE]">Request</span> a Demo.
            </h1>
            <h2 className="mt-5 text-lg md:text-xl text-[#1D4871]/75 leading-relaxed max-w-[600px] mx-auto font-normal">
              Interested in learning more about Sayso?
            </h2>
          </section>

          <section className="w-full px-4 md:px-6 pb-16">
            <div className="max-w-[680px] mx-auto rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-lg">
              <SsFormEmbed embedCode="LmIZLgSzGPfy" />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </DemoCalendarProvider>
  );
}
