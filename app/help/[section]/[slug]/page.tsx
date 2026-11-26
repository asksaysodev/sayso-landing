import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { HelpArticleContent } from '@/components/help/HelpArticleContent';
import { HelpFeedback } from '@/components/help/HelpFeedback';
import { HelpSearch } from '@/components/help/HelpSearch';
import { HelpSidebar } from '@/components/help/HelpSidebar';
import { getHelpSection, HELP_SUPPORT } from '@/lib/help-sections';
import { getAdjacentArticles, getAllHelpArticles, getHelpArticle, getHelpNav } from '@/lib/help';
import { generateBreadcrumbJsonLd, SAYSO_PUBLISHER } from '@/lib/seo/schema';
import { siteUrl } from '@/lib/config';
import { OG_DEFAULTS } from '@/lib/seo/metadata';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllHelpArticles().map((a) => ({ section: a.section, slug: a.slug }));
}

interface Props {
  params: Promise<{ section: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section, slug } = await params;
  const article = getHelpArticle(section, slug);
  if (!article) return {};
  return {
    title: `${article.seoTitle || article.title} | Help Center`,
    description: article.description,
    alternates: { canonical: `${siteUrl}${article.url}` },
    openGraph: {
      ...OG_DEFAULTS,
      title: article.title,
      description: article.description,
      url: `${siteUrl}${article.url}`,
      type: 'article',
      modifiedTime: article.updated,
    },
  };
}

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

export default async function HelpArticlePage({ params }: Props) {
  const { section, slug } = await params;
  const article = getHelpArticle(section, slug);
  const sec = getHelpSection(section);
  if (!article || !sec) notFound();
  const group = sec.groups.find((g) => g.id === article.group)!;
  const { prev, next } = getAdjacentArticles(section, slug);
  const toc = article.headings;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: article.title,
      description: article.description,
      dateModified: article.updated,
      url: `${siteUrl}${article.url}`,
      author: SAYSO_PUBLISHER,
      publisher: SAYSO_PUBLISHER,
      isPartOf: { '@type': 'CollectionPage', name: 'Sayso Help Center', url: `${siteUrl}/help/` },
    },
    generateBreadcrumbJsonLd([
      { name: 'Help Center', url: '/help/' },
      { name: sec.title, url: `/help/${sec.id}/` },
      { name: article.title, url: article.url },
    ]),
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-[#1D4871]/60">
          <Link href="/help/" className="hover:text-[#2367EE]">Help Center</Link>
          <ChevronRight className="h-4 w-4" aria-hidden />
          <Link href={`/help/${sec.id}/`} className="hover:text-[#2367EE]">{sec.title}</Link>
          <ChevronRight className="h-4 w-4" aria-hidden />
          <Link href={`/help/${sec.id}/#${group.id}`} className="hover:text-[#2367EE]">{group.title}</Link>
        </nav>
        <HelpSearch />
      </div>

      <div className="grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[250px_minmax(0,1fr)_210px]">
        <aside className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto lg:pb-8 lg:pr-2">
          <HelpSidebar nav={getHelpNav()} />
        </aside>

        <article className="min-w-0 max-w-[760px]">
          <h1 className="mb-3 font-hero text-3xl font-extrabold leading-tight tracking-[-0.03em] text-[#10233A] sm:text-4xl">{article.title}</h1>
          <p className="mb-8 text-sm text-[#1D4871]/50">Updated {formatDate(article.updated)}</p>

          <HelpArticleContent content={article.content} />

          <HelpFeedback slug={`${section}/${slug}`} title={article.title} />

          {(prev || next) && (
            <nav aria-label="More articles" className="mt-8 grid gap-3 sm:grid-cols-2">
              {prev ? (
                <Link href={prev.url} className="group rounded-2xl bg-white px-5 py-4 shadow-card-sm hover:shadow-card-sm-hover">
                  <span className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#1D4871]/50">
                    <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Previous
                  </span>
                  <span className="mt-1 block font-semibold text-[#10233A] group-hover:text-[#2367EE]">{prev.title}</span>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link href={next.url} className="group rounded-2xl bg-white px-5 py-4 text-right shadow-card-sm hover:shadow-card-sm-hover">
                  <span className="flex items-center justify-end gap-1 text-xs font-semibold uppercase tracking-wide text-[#1D4871]/50">
                    Next <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <span className="mt-1 block font-semibold text-[#10233A] group-hover:text-[#2367EE]">{next.title}</span>
                </Link>
              )}
            </nav>
          )}

          <p className="mt-8 text-sm text-[#1D4871]/70">
            Still stuck? Email{' '}
            <a href={`mailto:${HELP_SUPPORT.email}`} className="font-semibold text-[#2367EE] hover:underline">{HELP_SUPPORT.email}</a> or join{' '}
            <a href={HELP_SUPPORT.officeHoursUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#2367EE] hover:underline">office hours</a>{' '}
            ({HELP_SUPPORT.officeHoursSchedule.replace('Every ', 'every ')}).
          </p>
        </article>

        {toc.length > 1 && (
          <aside className="hidden xl:block xl:sticky xl:top-24 xl:self-start">
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#1D4871]/50">On this page</p>
            <ul className="space-y-1.5 border-l border-[#D7DEE1] text-sm">
              {toc.map((h) => (
                <li key={h.id} className={h.depth === 3 ? 'pl-6' : 'pl-3'}>
                  <a href={`#${h.id}`} className="block leading-snug text-[#1D4871]/70 hover:text-[#2367EE]">{h.text}</a>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </div>
  );
}
