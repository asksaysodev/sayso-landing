import type { Metadata } from 'next';
import { DemoCalendarProvider } from "@/app/context/landing/DemoCalendarContext";
import { Footer } from "@/components/landing/Footer";
import { HeroWithVideo } from "@/components/landing/HeroWithVideo";
import { PainPointPanel } from "@/components/landing/PainPointPanel";
import SaysoNavbar from "@/components/landing/SaysoNavbar";
import { ThreeStepsSection } from "@/components/landing/ThreeStepsSection";
import { TransformationSection } from "@/components/landing/TransformationSection";
import { brokerContent } from "@/lib/content/personas/broker";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asksayso.com';

export const metadata: Metadata = {
  title: 'Sayso for Brokers & Team Owners | Fix Your Conversion Problem',
  description: 'Sayso guides agents during live prospecting calls so they ask better questions, handle objections confidently, and convert more conversations into appointments.',
  alternates: {
    canonical: `${siteUrl}/broker`,
  },
  openGraph: {
    title: 'Sayso for Brokers & Team Owners | Fix Your Conversion Problem',
    description: 'Sayso guides agents during live prospecting calls so they ask better questions, handle objections confidently, and convert more conversations into appointments.',
    url: `${siteUrl}/broker`,
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Sayso — Real-Time AI Sales Coaching for Brokers' }],
    type: 'website',
  },
  twitter: {
    title: 'Sayso for Brokers & Team Owners | Fix Your Conversion Problem',
    description: 'Sayso guides agents during live prospecting calls so they ask better questions, handle objections confidently, and convert more conversations into appointments.',
    images: ['/og-default.png'],
  },
};

export default function BrokerPage() {
  return (
    <DemoCalendarProvider>
      <div className="relative bg-white">
        <SaysoNavbar />
        <HeroWithVideo content={brokerContent.hero} />
        <PainPointPanel />
        <TransformationSection content={brokerContent.transformation} />
        <ThreeStepsSection content={brokerContent.threeSteps} />
        <Footer />
      </div>
    </DemoCalendarProvider>
  );
}
