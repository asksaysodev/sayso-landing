import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import { DownloadPage } from '@/components/landing/DownloadPage';
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Download Sayso | Real-Time Call Coaching for Real Estate Agents',
  description:
    'Download Sayso to get real-time call coaching, automatic call notes, and live market data on every prospecting call.',
  path: '/download',
});

export default function Download() {
  return (
    <DemoCalendarProvider>
      <div className="relative bg-[#F4F4F5]">
        <SaysoNavbar />
        <DownloadPage />
        <Footer />
      </div>
    </DemoCalendarProvider>
  );
}
