import type { Metadata } from 'next';
import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext';
import { DownloadButton } from '@/components/landing/DownloadButton';
import { CalendlyInlineWidget } from '@/components/CalendlyInlineWidget';
import { siteUrl } from '@/lib/config';
import { PageHeader } from '@/components/pages/PageHeader';

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
          <PageHeader standalone title="Book a Demo" intro="Schedule a meeting to see Sayso in action!">
            <div className="flex flex-col items-center gap-3">
              <DownloadButton analyticsId="cta-demo-download" />
              <p className="text-sm text-[#556B86]">
                Want to try it right now? Get Sayso and start your first call in a minute.
              </p>
            </div>
          </PageHeader>

          <section className="w-full px-4 md:px-6 pb-16">
            <div className="max-w-[900px] mx-auto rounded-[20px] overflow-hidden bg-white shadow-card">
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
