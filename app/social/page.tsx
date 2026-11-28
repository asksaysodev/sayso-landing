import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext';
import { SocialLinksPage } from '@/components/landing/SocialLinksPage';
import { buildMetadata } from '@/lib/seo/metadata';

// Link page for social profile URL slots. Not indexed and not in the sitemap or
// nav; links stay followable.
export const metadata = buildMetadata({
  title: 'Links',
  description: 'Book time with the Sayso team, try the interactive demo, and open Sayso Map and Sayso Composer.',
  path: '/social',
  noindex: true,
});

export default function SocialPage() {
  return (
    <DemoCalendarProvider>
      <div className="bg-[#F4F4F5]">
        <SocialLinksPage />
      </div>
    </DemoCalendarProvider>
  );
}
