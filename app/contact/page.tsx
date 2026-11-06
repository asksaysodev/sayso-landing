import type { Metadata } from 'next';
import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import SsFormEmbed from '@/components/landing/SsFormEmbed';
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext';
import { siteUrl } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with the Sayso team. Send us a message and we\'ll get back to you shortly.',
  alternates: {
    canonical: `${siteUrl}/contact/`,
  },
  openGraph: {
    title: 'Contact Us | Sayso',
    description:
      'Get in touch with the Sayso team. Send us a message and we\'ll get back to you shortly.',
    url: `${siteUrl}/contact/`,
    type: 'website',
    images: [
      {
        url: '/images/og-default.png',
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
    images: ['/images/og-default.png'],
  },
};

export default function ContactPage() {
  return (
    <DemoCalendarProvider>
      <div className="relative bg-[#F4F4F5] min-h-screen">
        <SaysoNavbar />
        <main>
          <section className="max-w-[900px] mx-auto px-6 pt-32 pb-10 text-center">
            <h1 className="font-hero font-extrabold tracking-[-0.035em] text-[#10233A] text-[42px] sm:text-6xl lg:text-7xl leading-[1.08]">
              <span className="text-[#2367EE]">Contact</span> Us.
            </h1>
            <p className="mt-5 text-lg md:text-xl text-[#1D4871]/75 leading-relaxed max-w-[600px] mx-auto">
              Send us a message and we&apos;ll get back to you shortly.
            </p>
          </section>

          <section className="w-full px-4 md:px-6 pb-16">
            <div className="max-w-[680px] mx-auto rounded-[20px] overflow-hidden bg-white shadow-[0_0_0_1px_rgba(16,35,58,0.12),0_14px_34px_-16px_rgba(16,35,58,0.25)]">
              <SsFormEmbed embedCode="c7xK2u06CRJ0" />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </DemoCalendarProvider>
  );
}
