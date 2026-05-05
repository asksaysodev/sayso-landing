import { buildMetadata } from '@/lib/seo/metadata';
import { HubPage } from '@/components/pages/HubPage';
import { productsHub } from '@/lib/content/hubs/products';

export const metadata = buildMetadata({
  title: productsHub.seoTitle,
  description: productsHub.seoDescription,
  path: '/products',
});

export default function ProductsHubPage() {
  return <HubPage config={productsHub} />;
}
