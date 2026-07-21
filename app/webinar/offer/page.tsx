import { WebinarOfferSection } from '@/components/landing/WebinarOfferSection';
import { Header } from '@/components/landing/WebinarOfferSection/components/Header';
import { DeadlineBar } from '@/components/landing/WebinarOfferSection/components/DeadlineBar';
import { DeadlineProvider } from '@/components/landing/WebinarOfferSection/components/DeadlineProvider';
import { DeadlineGate } from '@/components/landing/WebinarOfferSection/components/DeadlineGate';
import { MobileCta } from '@/components/landing/WebinarOfferSection/components/MobileCta';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Your Webinar Offer | Sayso',
  description:
    'The full Sayso offer from the webinar: the platform, a year of weekly coaching, curated leads, and onboarding, backed by the signed-client guarantee.',
  path: '/webinar/offer',
  // Webinar-exclusive page. Keep it out of search so the offer only reaches
  // attendees who get the link.
  noindex: true,
});

export default function WebinarOfferPage() {
  return (
    // pb on mobile clears the fixed bottom claim bar (MobileCta).
    <div className="relative bg-[#F4F4F5] min-h-screen pb-20 sm:pb-0">
      {/* One timer for the whole page (DeadlineProvider), so the gate and both
          countdowns share a single source of truth. DeadlineGate hides
          everything and shows the expired state once the 5:00 PM PT deadline
          (from ?d=) has passed. */}
      <DeadlineProvider>
        <DeadlineGate>
          <DeadlineBar />
          <Header />
          <main>
            <WebinarOfferSection />
          </main>
          <MobileCta />
        </DeadlineGate>
      </DeadlineProvider>
    </div>
  );
}
