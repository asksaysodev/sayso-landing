import { buildMetadata } from '@/lib/seo/metadata';
import { HubPage } from '@/components/pages/HubPage';
import { objectionsHub } from '@/lib/content/hubs/objections';

export const metadata = buildMetadata({
  title: objectionsHub.seoTitle,
  description: objectionsHub.seoDescription,
  path: '/objections',
});

export default function ObjectionsHubPage() {
  return <HubPage config={objectionsHub} />;
}
