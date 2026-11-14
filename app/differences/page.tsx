import { buildMetadata } from '@/lib/seo/metadata';
import { generateFAQPageJsonLd } from '@/lib/seo/schema';
import { DifferencesPage } from '@/components/pages/DifferencesPage';
import { LEADER_FAQ } from '@/components/pages/DifferencesPage/data';

export const metadata = buildMetadata({
  title: 'Sayso vs. FUB, MaverickRE, Battr and call coaching',
  description:
    'Team leaders ask if Sayso duplicates their CRM or coaching tools. It doesn’t. Sayso is the layer that works during the live call. See the side-by-side.',
  path: '/differences',
});

const faqJsonLd = generateFAQPageJsonLd(LEADER_FAQ);

export default function Differences() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <DifferencesPage />
    </>
  );
}
