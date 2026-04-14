import { buildMetadata } from '@/lib/seo/metadata';
import { HubPage } from '@/components/pages/HubPage';
import { glossaryHub } from '@/lib/content/hubs/glossary';

export const metadata = buildMetadata({
  title: glossaryHub.seoTitle,
  description: glossaryHub.seoDescription,
  path: '/glossary',
});

export default function GlossaryHubPage() {
  return <HubPage config={glossaryHub} />;
}
