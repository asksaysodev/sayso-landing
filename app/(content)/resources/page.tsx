import { buildMetadata } from '@/lib/seo/metadata';
import { HubPage } from '@/components/pages/HubPage';
import { resourcesHub } from '@/lib/content/hubs/resources';

// Noindex for now: this is a thin gateway that only repeats nav links to /blog,
// /objections, and /glossary. Re-index once it becomes a real resource library.
export const metadata = buildMetadata({
  title: resourcesHub.seoTitle,
  description: resourcesHub.seoDescription,
  path: '/resources',
  noindex: true,
});

export default function ResourcesHubPage() {
  return <HubPage config={resourcesHub} />;
}
