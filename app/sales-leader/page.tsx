import type { Metadata } from 'next';
import { Footer } from "@/components/landing/Footer";
import { HeroWithVideo } from "@/components/landing/HeroWithVideo";
import { PainPointPanel } from "@/components/landing/PainPointPanel";
import SaysoNavbar from "@/components/landing/SaysoNavbar";
import { ThreeStepsSection } from "@/components/landing/ThreeStepsSection";
import { TransformationSection } from "@/components/landing/TransformationSection";
import { salesLeaderContent } from "@/lib/content/personas/sales-leader";
import { siteUrl } from "@/lib/config";

export const metadata: Metadata = {
  title: 'Sayso for Sales Leaders | Turn Role-Play Into Real Results',
  description: 'Sayso listens during prospect conversations and shows agents what to ask next — so they stay confident and in control when it matters most.',
  alternates: {
    canonical: `${siteUrl}/sales-leader`,
  },
  openGraph: {
    title: 'Sayso for Sales Leaders | Turn Role-Play Into Real Results',
    description: 'Sayso listens during prospect conversations and shows agents what to ask next — so they stay confident and in control when it matters most.',
    url: `${siteUrl}/sales-leader`,
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Sayso — Real-Time AI Sales Coaching for Sales Leaders' }],
    type: 'website',
  },
  twitter: {
    title: 'Sayso for Sales Leaders | Turn Role-Play Into Real Results',
    description: 'Sayso listens during prospect conversations and shows agents what to ask next — so they stay confident and in control when it matters most.',
    images: ['/og-default.png'],
  },
};

export default function SalesLeaderPage() {
  return (
    <div className="relative bg-white">
      <SaysoNavbar />
      <HeroWithVideo content={salesLeaderContent.hero} />
      <PainPointPanel />
      <TransformationSection content={salesLeaderContent.transformation} />
      <ThreeStepsSection content={salesLeaderContent.threeSteps} />
      <Footer />
    </div>
  );
}
