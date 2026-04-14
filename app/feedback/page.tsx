import type { Metadata } from 'next';
import { FeedbackClient } from './FeedbackClient';
import { siteUrl } from '@/lib/config';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Feedback',
  description: 'Share feature requests, report bugs, and follow our product roadmap.',
  alternates: {
    canonical: `${siteUrl}/feedback/`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function FeedbackPage() {
  return <FeedbackClient />;
}
