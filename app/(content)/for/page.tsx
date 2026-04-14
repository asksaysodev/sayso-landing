import { buildMetadata } from '@/lib/seo/metadata';
import { HubPage } from '@/components/pages/HubPage';
import { forHub } from '@/lib/content/hubs/for';

export const metadata = buildMetadata({
  title: forHub.seoTitle,
  description: forHub.seoDescription,
  path: '/for',
});

export default function ForHubPage() {
  return <HubPage config={forHub} />;
}
