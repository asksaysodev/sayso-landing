import type { Metadata } from 'next';
import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import SsFormEmbed from '@/components/landing/SsFormEmbed';
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext';
import { siteUrl } from '@/lib/config';
import { PageHeader } from '@/components/pages/PageHeader';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';

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
      <BreadcrumbJsonLd items={[{ name: 'Home', url: '/' }, { name: 'Contact Us', url: '/contact/' }]} />
      <div className="relative bg-[#F4F4F5] min-h-screen">
        <SaysoNavbar />
        <main>
          <PageHeader
            standalone
            title={
              <>
                <span className="text-[#2367EE]">Contact</span> Us.
              </>
            }
            intro="Send us a message and we'll get back to you shortly."
          />

          <section className="w-full px-4 md:px-6 pb-16">
            <div className="max-w-[680px] mx-auto rounded-[20px] overflow-hidden bg-white shadow-card">
              {/* Reserve: the form's loaded height at 375px, 640px and 768px+ (680px column). */}
              <SsFormEmbed
                embedCode="c7xK2u06CRJ0"
                reserveClassName="min-h-[772px] sm:min-h-[704px] md:min-h-[682px]"
              />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </DemoCalendarProvider>
  );
}
