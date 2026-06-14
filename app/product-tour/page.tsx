import type { Metadata } from 'next';
import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import { ProductTour } from '@/components/landing/ProductTour';
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext';
import { siteUrl } from '@/lib/config';

export const metadata: Metadata = {
  title: 'See Sayso in Action | Product Tour',
  description:
    'An interactive tour of Sayso working inside your dialer: real-time coaching, automatic notes, live market data, and custom scripts, all logged to your CRM.',
  alternates: {
    canonical: `${siteUrl}/product-tour/`,
  },
  openGraph: {
    title: 'See Sayso in Action | Product Tour',
    description:
      'An interactive tour of Sayso working inside your dialer: real-time coaching, automatic notes, live market data, and custom scripts, all logged to your CRM.',
    url: `${siteUrl}/product-tour/`,
    images: [{ url: '/images/og-default.png', width: 1200, height: 630, alt: 'See Sayso in Action' }],
    type: 'website',
  },
  twitter: {
    title: 'See Sayso in Action | Product Tour',
    description:
      'An interactive tour of Sayso working inside your dialer: real-time coaching, automatic notes, live market data, and custom scripts, all logged to your CRM.',
    images: ['/images/og-default.png'],
  },
};

export default function ProductTourPage() {
  return (
    <DemoCalendarProvider>
      <div className="relative bg-white">
        <SaysoNavbar />
        <ProductTour />
        <Footer />
      </div>
    </DemoCalendarProvider>
  );
}
