import type { Metadata } from 'next';
import { DemoCalendarProvider } from "@/app/context/landing/DemoCalendarContext";
import { Footer } from "@/components/landing/Footer";
import { HeroWithVideo } from "@/components/landing/HeroWithVideo";
import { PainPointPanel } from "@/components/landing/PainPointPanel";
import SaysoNavbar from "@/components/landing/SaysoNavbar";
import { ThreeStepsSection } from "@/components/landing/ThreeStepsSection";
import { TransformationSection } from "@/components/landing/TransformationSection";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asksayso.com';

export const metadata: Metadata = {
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'Sayso | Real-Time AI Sales Coaching',
    description: 'Real-time AI coaching for sales agents — handle objections, ask better questions, and book more appointments.',
    url: siteUrl,
    // TODO: create /public/og-default.png (1200x630) and uncomment
    // images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Sayso — Real-Time AI Sales Coaching' }],
    type: 'website',
  },
  twitter: {
    title: 'Sayso | Real-Time AI Sales Coaching',
    description: 'Real-time AI coaching for sales agents — handle objections, ask better questions, and book more appointments.',
    // images: ['/og-default.png'],
  },
};

export default function Home() {
    return (
        <DemoCalendarProvider>
            <div className="relative bg-white">
                <SaysoNavbar />
                <HeroWithVideo />
                <PainPointPanel />
                <TransformationSection />
                <ThreeStepsSection />
                <Footer />
            </div>
        </DemoCalendarProvider>
    );
}
