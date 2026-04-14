import type { Metadata } from 'next';
import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import { ReferralPageContent } from '@/components/landing/ReferralPageContent';
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asksayso.com';

export const metadata: Metadata = {
  title: 'Referral Program | Sayso',
  description: 'Invite someone to Sayso and you both get rewarded. Share your unique referral code and earn credits.',
  alternates: {
    canonical: `${siteUrl}/referral/`,
  },
  openGraph: {
    title: 'Referral Program | Sayso',
    description: 'Invite someone to Sayso and you both get rewarded. Share your unique referral code and earn credits.',
    url: `${siteUrl}/referral/`,
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Sayso Referral Program' }],
    type: 'website',
  },
  twitter: {
    title: 'Referral Program | Sayso',
    description: 'Invite someone to Sayso and you both get rewarded. Share your unique referral code and earn credits.',
    images: ['/og-default.png'],
  },
};

export default function ReferralPage() {
  return (
    <DemoCalendarProvider>
      <div className="relative bg-[#F4F4F5]">
        <SaysoNavbar />
        <ReferralPageContent />
        <Footer />
      </div>
    </DemoCalendarProvider>
  );
}
