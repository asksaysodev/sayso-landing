import { buildMetadata } from '@/lib/seo/metadata';
import { HubPage } from '@/components/pages/HubPage';
import { objectionsHub } from '@/lib/content/hubs/objections';

// Revalidate hourly so links to scheduled posts switch on on their publish date.
export const revalidate = 3600;

export const metadata = buildMetadata({
  title: objectionsHub.seoTitle,
  description: objectionsHub.seoDescription,
  path: '/objections',
});

export default function ObjectionsHubPage() {
  return <HubPage config={objectionsHub} />;
}
