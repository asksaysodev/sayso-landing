import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCaseStudyBySlug, getAllCaseStudySlugs } from '@/lib/content/case-studies';
import { buildMetadata } from '@/lib/seo/metadata';
import { CaseStudyPage } from '@/components/pages/CaseStudyPage';

export async function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getCaseStudyBySlug(slug);
  if (!entry) return { title: 'Not Found' };
  return buildMetadata({
    title: entry.seoTitle,
    description: entry.seoDescription,
    path: `/case-studies/${slug}`,
    noindex: true,
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const entry = getCaseStudyBySlug(slug);
  if (!entry) notFound();
  return <CaseStudyPage entry={entry} />;
}
