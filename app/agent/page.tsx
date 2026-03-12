import type { Metadata } from 'next';
import { AgentAdPage } from '@/components/landing/AgentAdPage';
import { siteUrl } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Sayso for Real Estate Agents | Know What to Say',
  description: 'Real-time guidance during prospecting calls. Ask better questions, handle objections, and book appointments that actually happen.',
  alternates: {
    canonical: `${siteUrl}/agent`,
  },
  openGraph: {
    title: 'Sayso for Real Estate Agents | Know What to Say',
    description: 'Real-time guidance during prospecting calls. Ask better questions, handle objections, and book appointments that actually happen.',
    url: `${siteUrl}/agent`,
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Sayso — Real-Time AI Coaching for Real Estate Agents' }],
    type: 'website',
  },
  twitter: {
    title: 'Sayso for Real Estate Agents | Know What to Say',
    description: 'Real-time guidance during prospecting calls. Ask better questions, handle objections, and book appointments that actually happen.',
    images: ['/og-default.png'],
  },
};

export default function AgentPage() {
  return <AgentAdPage />;
}
