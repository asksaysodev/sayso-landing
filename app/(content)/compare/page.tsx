import { buildMetadata } from '@/lib/seo/metadata';
import { HubPage } from '@/components/pages/HubPage';
import { compareHub } from '@/lib/content/hubs/compare';

export const metadata = buildMetadata({
  title: compareHub.seoTitle,
  description: compareHub.seoDescription,
  path: '/compare',
});

export default function CompareHubPage() {
  return <HubPage config={compareHub} />;
}
