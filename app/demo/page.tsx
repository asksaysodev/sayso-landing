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
      <div className="relative min-h-screen bg-[#F4F4F5]">
        <SaysoNavbar />
        <main>
          <section className="max-w-[900px] mx-auto px-6 pt-16 md:pt-24 pb-10 text-center">
            <h1 className="font-hero font-extrabold text-[40px] md:text-[56px] text-[#10233A] leading-[1.1] tracking-[-0.03em]">
              Book a Demo
            </h1>
            <p className="mt-5 text-lg md:text-xl text-[#556B86] leading-relaxed max-w-[600px] mx-auto">
              Schedule a meeting to see Sayso in action!
            </p>
            <div className="mt-8 flex flex-col items-center gap-3">
              <DownloadButton analyticsId="cta-demo-download" />
              <p className="text-sm text-[#556B86]">
                Want to try it right now? Download Sayso and start your first call in a minute.
              </p>
            </div>
          </section>

          <section className="w-full px-4 md:px-6 pb-16">
            <div className="max-w-[900px] mx-auto rounded-[20px] border border-[rgba(16,35,58,0.12)] overflow-hidden bg-white shadow-[0_1px_2px_rgba(16,35,58,0.06),0_14px_34px_-16px_rgba(16,35,58,0.25)]">
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
