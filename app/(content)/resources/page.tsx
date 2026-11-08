import { buildMetadata } from '@/lib/seo/metadata';
import { HubPage } from '@/components/pages/HubPage';
import { resourcesHub } from '@/lib/content/hubs/resources';

export const metadata = buildMetadata({
  title: resourcesHub.seoTitle,
  description: resourcesHub.seoDescription,
  path: '/resources',
});

export default function ResourcesHubPage() {
  return <HubPage config={resourcesHub} />;
}
