import { buildMetadata } from '@/lib/seo/metadata';
import { WhySaysoPage } from '@/components/pages/WhySaysoPage';
import { whySaysoContent } from '@/lib/content/why-sayso';

export const metadata = buildMetadata({
  title: whySaysoContent.seoTitle,
  description: whySaysoContent.seoDescription,
  path: '/why-sayso',
});

export default function WhySayso() {
  return <WhySaysoPage content={whySaysoContent} />;
}
