import { buildMetadata } from '@/lib/seo/metadata';
import { HubPage } from '@/components/pages/HubPage';
import { caseStudiesHub } from '@/lib/content/hubs/case-studies';

export const metadata = buildMetadata({
  title: caseStudiesHub.seoTitle,
  description: caseStudiesHub.seoDescription,
  path: '/case-studies',
  noindex: true,
});

export default function CaseStudiesHubPage() {
  return <HubPage config={caseStudiesHub} />;
}
