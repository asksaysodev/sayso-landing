import { WebinarOfferSection } from '@/components/landing/WebinarOfferSection';
import { Header } from '@/components/landing/WebinarOfferSection/components/Header';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Your Webinar Offer | Sayso',
  description:
    'The full Sayso offer from the webinar: everything included for the year at one price, with the close-a-home money-back guarantee.',
  path: '/webinar/offer',
  // Webinar-exclusive page. Keep it out of search so the offer only reaches
  // attendees who get the link.
  noindex: true,
});

export default function WebinarOfferPage() {
  return (
    <div className="relative bg-[#F4F4F5] min-h-screen">
      <Header />
      <main>
        <WebinarOfferSection />
      </main>
    </div>
  );
}
