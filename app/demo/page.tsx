import type { Metadata } from 'next';
import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext';
import { DownloadButton } from '@/components/landing/DownloadButton';
import { CalendlyInlineWidget } from '@/components/CalendlyInlineWidget';
import { siteUrl } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Book a Demo',
  description:
    'Schedule a meeting with the founders to see how Sayso can help your real estate team book more appointments.',
  alternates: {
    canonical: `${siteUrl}/demo/`,
  },
  openGraph: {
    title: 'Book a Demo | Sayso',
    description:
      'Schedule a meeting with the founders to see how Sayso can help your real estate team book more appointments.',
    url: `${siteUrl}/demo/`,
    type: 'website',
    images: [
      {
        url: '/images/og-default.png',
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
    images: ['/images/og-default.png'],
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
            <div className="mt-8 flex flex-col items-center gap-3">
              <DownloadButton analyticsId="cta-demo-download" />
              <p className="text-sm text-[#1D4871]/60">
                Want to try it right now? Download Sayso and start your first call in a minute.
              </p>
            </div>
          </section>

          <section className="w-full px-4 md:px-6 pb-16">
            <div className="max-w-[900px] mx-auto rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-lg">
              <CalendlyInlineWidget
                className="w-full"
                style={{ minWidth: '320px', height: '700px' }}
              />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </DemoCalendarProvider>
  );
}
