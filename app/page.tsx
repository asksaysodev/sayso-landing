import type { Metadata } from 'next';
import { Footer } from "@/components/landing/Footer";
import { HeroWithVideo } from "@/components/landing/HeroWithVideo";
import { PainPointPanel } from "@/components/landing/PainPointPanel";
import SaysoNavbar from "@/components/landing/SaysoNavbar";
import { ThreeStepsSection } from "@/components/landing/ThreeStepsSection";
import { TransformationSection } from "@/components/landing/TransformationSection";
import { ProductShowcaseSection } from '@/components/landing/ProductShowcaseSection';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asksayso.com';

export const metadata: Metadata = {
  alternates: {
    canonical: `${siteUrl}/`,
  },
  openGraph: {
    title: 'Sayso — Fix Where Prospecting Breaks Down',
    description: 'Sayso helps real estate agents turn messy prospecting conversations into booked appointments.',
    url: `${siteUrl}/`,
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Sayso — Fix the Hardest Part of Prospecting' }],
    type: 'website',
  },
  twitter: {
    title: 'Sayso — Fix Where Prospecting Breaks Down',
    description: 'Sayso helps real estate agents turn messy prospecting conversations into booked appointments.',
    images: ['/og-default.png'],
  },
};

export default function Home() {
    return (
        <div className="relative bg-white">
            <SaysoNavbar />
            <HeroWithVideo />
            <PainPointPanel />
            <TransformationSection />
            <ThreeStepsSection />
            <Footer />
        </div>
    );
}
