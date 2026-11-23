import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { HelpSearch } from '@/components/help/HelpSearch';
import { HELP_SECTIONS, getHelpSection } from '@/lib/help-sections';
import { getSectionArticles } from '@/lib/help';
import { generateBreadcrumbJsonLd } from '@/lib/seo/schema';
import { siteUrl } from '@/lib/config';

export const dynamicParams = false;

export function generateStaticParams() {
  return HELP_SECTIONS.map((s) => ({ section: s.id }));
}

interface Props {
  params: Promise<{ section: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  const sec = getHelpSection(section);
  if (!sec) return {};
  return {
    title: `${sec.title} | Help Center`,
    description: sec.description,
    alternates: { canonical: `${siteUrl}/help/${sec.id}/` },
  };
}

export default async function HelpSectionPage({ params }: Props) {
  const { section } = await params;
  const sec = getHelpSection(section);
  if (!sec) notFound();
  const articles = getSectionArticles(sec.id);
  const groups = sec.groups.map((g) => ({ ...g, articles: articles.filter((a) => a.group === g.id) })).filter((g) => g.articles.length);

  const jsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Help Center', url: '/help/' },
    { name: sec.title, url: `/help/${sec.id}/` },
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 pt-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-[#1D4871]/60">
          <Link href="/help/" className="hover:text-[#2367EE]">Help Center</Link>
          <ChevronRight className="h-4 w-4" aria-hidden />
          <span className="font-semibold text-[#1D4871]">{sec.title}</span>
        </nav>
        <HelpSearch />
      </div>

      <h1 className="mb-10 font-hero text-4xl font-extrabold tracking-[-0.03em] text-[#10233A]">{sec.title}</h1>

      <div className="space-y-10">
        {groups.map((g) => (
          <section key={g.id} id={g.id} className="scroll-mt-28">
            <h2 className="mb-4 font-hero text-xl font-extrabold text-[#10233A]">{g.title}</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {g.articles.map((a) => (
                <li key={a.url}>
                  <Link href={a.url} className="group flex h-full flex-col rounded-2xl bg-white px-5 py-4 shadow-card-sm transition hover:shadow-card-sm-hover">
                    <span className="flex items-start justify-between gap-3 font-semibold text-[#10233A] group-hover:text-[#2367EE]">
                      {a.title}
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#2367EE] opacity-0 transition group-hover:opacity-100" aria-hidden />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
