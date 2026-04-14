import { buildMetadata } from '@/lib/seo/metadata';
import { HubPage } from '@/components/pages/HubPage';
import { integrationsHub } from '@/lib/content/hubs/integrations';

export const metadata = buildMetadata({
  title: integrationsHub.seoTitle,
  description: integrationsHub.seoDescription,
  path: '/integrations',
});

export default function IntegrationsHubPage() {
  return <HubPage config={integrationsHub} />;
}
