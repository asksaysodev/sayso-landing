import type { Metadata } from 'next';
import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asksayso.com';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with the Sayso team. Send us a message and we\'ll get back to you shortly.',
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: 'Contact Us | Sayso',
    description:
      'Get in touch with the Sayso team. Send us a message and we\'ll get back to you shortly.',
    url: `${siteUrl}/contact`,
    type: 'website',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Contact Sayso',
      },
    ],
  },
  twitter: {
    title: 'Contact Us | Sayso',
    description:
      'Get in touch with the Sayso team. Send us a message and we\'ll get back to you shortly.',
    images: ['/og-default.png'],
  },
};

export default function ContactPage() {
  return (
    <DemoCalendarProvider>
      <div className="relative bg-white min-h-screen">
        <SaysoNavbar />
        <main>
          <section className="max-w-[900px] mx-auto px-6 pt-32 pb-10 text-center">
            <h1 className="font-comic text-5xl sm:text-6xl lg:text-7xl text-[#1D4871] leading-[1.05] tracking-wide">
              <span className="text-[#2367EE]">Contact</span> Us.
            </h1>
            <p className="mt-5 text-lg md:text-xl text-[#1D4871]/75 leading-relaxed max-w-[600px] mx-auto">
              Send us a message and we&apos;ll get back to you shortly.
            </p>
          </section>

          <section className="w-full px-4 md:px-6 pb-16">
            <div className="max-w-[900px] mx-auto rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-lg">
              <iframe
                src="https://alert-tartan-008.notion.site/ebd/2f04de400468813784b3cd2d7a1290af"
                className="w-full border-0"
                style={{ height: '600px' }}
                title="Contact form"
                allowFullScreen
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
