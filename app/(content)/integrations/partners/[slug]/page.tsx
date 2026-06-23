import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getPartnerIntegrationBySlug,
  getAllPartnerIntegrationSlugs,
} from '@/lib/content/partner-integrations';
import { buildMetadata } from '@/lib/seo/metadata';
import { PartnerIntegrationPage } from '@/components/pages/PartnerIntegrationPage';

export async function generateStaticParams() {
  return getAllPartnerIntegrationSlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getPartnerIntegrationBySlug(slug);
  if (!entry) return { title: 'Not Found' };
  return buildMetadata({
    title: entry.seoTitle,
    description: entry.seoDescription,
    path: `/integrations/partners/${slug}`,
    ogImage: entry.ogImage,
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const entry = getPartnerIntegrationBySlug(slug);
  if (!entry) notFound();
  return <PartnerIntegrationPage entry={entry} />;
}
