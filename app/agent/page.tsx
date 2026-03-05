import type { Metadata } from 'next';
import { DemoCalendarProvider } from "@/app/context/landing/DemoCalendarContext";
import { Footer } from "@/components/landing/Footer";
import { HeroWithVideo } from "@/components/landing/HeroWithVideo";
import { PainPointPanel } from "@/components/landing/PainPointPanel";
import SaysoNavbar from "@/components/landing/SaysoNavbar";
import { ThreeStepsSection } from "@/components/landing/ThreeStepsSection";
import { TransformationSection } from "@/components/landing/TransformationSection";
import { agentContent } from "@/lib/content/personas/agent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asksayso.com';

export const metadata: Metadata = {
  title: 'Sayso for Real Estate Agents | Prospecting Gets Easier',
  description: 'Sayso helps you ask better questions, handle objections, and turn conversations into appointments.',
  alternates: {
    canonical: `${siteUrl}/agent`,
  },
  openGraph: {
    title: 'Sayso for Real Estate Agents | Prospecting Gets Easier',
    description: 'Sayso helps you ask better questions, handle objections, and turn conversations into appointments.',
    url: `${siteUrl}/agent`,
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Sayso — Real-Time AI Coaching for Real Estate Agents' }],
    type: 'website',
  },
  twitter: {
    title: 'Sayso for Real Estate Agents | Prospecting Gets Easier',
    description: 'Sayso helps you ask better questions, handle objections, and turn conversations into appointments.',
    images: ['/og-default.png'],
  },
};

export default function AgentPage() {
  return (
    <DemoCalendarProvider>
      <div className="relative bg-white">
        <SaysoNavbar />
        <HeroWithVideo content={agentContent.hero} />
        <PainPointPanel />
        <TransformationSection content={agentContent.transformation} />
        <ThreeStepsSection content={agentContent.threeSteps} />
        <Footer />
      </div>
    </DemoCalendarProvider>
  );
}
