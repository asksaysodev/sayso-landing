import type { Metadata } from 'next';
import { FeedbackClient } from './FeedbackClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asksayso.com';

export const metadata: Metadata = {
  title: 'Feedback',
  description: 'Share feature requests, report bugs, and follow our product roadmap.',
  alternates: {
    canonical: `${siteUrl}/feedback`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function FeedbackPage() {
  return <FeedbackClient />;
}
