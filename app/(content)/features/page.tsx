import { buildMetadata } from '@/lib/seo/metadata';
import { HubPage } from '@/components/pages/HubPage';
import { featuresHub } from '@/lib/content/hubs/features';

export const metadata = buildMetadata({
  title: featuresHub.seoTitle,
  description: featuresHub.seoDescription,
  path: '/features',
});

export default function FeaturesHubPage() {
  return <HubPage config={featuresHub} />;
}
