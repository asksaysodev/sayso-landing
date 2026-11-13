/**
 * Author page for Kuvaal Patel. Linked only from blog bylines (not the nav,
 * footer or About page). Lists every live post he authored, newest first.
 */
import Image from 'next/image';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo/metadata';
import { siteUrl } from '@/lib/config';
import { AUTHORS } from '@/lib/authors';
import { getAllPostsMeta } from '@/lib/blog';
import { PageHeader } from '@/components/pages/PageHeader';

// Matches the blog: scheduled posts join the list within an hour of publishing.
export const revalidate = 3600;

const author = AUTHORS['kuvaal-patel'];

const TITLES = [
  'Founder of Sayso',
  'Director of Agent Development at Anderson Real Estate Group (top 250 @ eXp)',
];

const BIO = [
  'I’ve been in real estate for 6 years, and I’m a licensed agent in California and Arizona with eXp Realty.',
  'As Director of Agent Development at Anderson Real Estate Group, I’ve reviewed tens of thousands of agent calls, listening for missed opportunities and coaching agents on what they could have done differently.',
  'The coaching helped, but only part of it stuck once the next call started.',
  'I built Sayso so agents get that guidance during the call, when it counts.',
];

const PROFILE_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kuvaal/' },
  { label: 'Anderson Real Estate Group', href: 'https://andersonreg.com/kuvaal-patel/' },
  { label: 'Instagram', href: 'https://www.instagram.com/kuvaal_/' },
];

const description =
  'Kuvaal Patel, founder of Sayso, has 6 years in real estate and has reviewed tens of thousands of agent calls coaching agents on missed opportunities.';

export const metadata = buildMetadata({
  title: 'Kuvaal Patel, Founder of Sayso',
  description,
  path: author.path,
});

const profileJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: `${siteUrl}${author.path}`,
  mainEntity: {
    '@type': 'Person',
    name: author.name,
    jobTitle: 'Founder',
    worksFor: { '@type': 'Organization', name: 'Sayso', url: siteUrl },
    image: `${siteUrl}${author.avatar}`,
    url: `${siteUrl}${author.path}`,
    description,
    sameAs: author.sameAs,
  },
};

const dateFormat: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' };

export default function KuvaalPatelAuthorPage() {
  const posts = getAllPostsMeta()
    .filter((p) => p.author.path === author.path)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }} />
      <PageHeader
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: author.name }]}
        title={author.name}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-40 w-40 overflow-hidden rounded-[20px] shadow-card md:h-48 md:w-48">
            <Image
              src={author.avatar}
              alt={`${author.name}, Founder of Sayso`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 160px, 192px"
              priority
            />
          </div>
          <div className="text-center font-sans">
            {TITLES.map((t) => (
              <p key={t} className="text-[15px] text-[#1D4871]/70">
                {t}
              </p>
            ))}
          </div>
        </div>
      </PageHeader>

      <div className="mx-auto max-w-[720px] px-6 pb-16 font-sans">
        <p className="text-lg leading-relaxed text-[#1D4871]/85">{BIO.join(' ')}</p>

        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
          {PROFILE_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer me"
                className="text-sm font-bold text-[#2367EE] hover:underline"
              >
                {l.label} &rarr;
              </a>
            </li>
          ))}
        </ul>

        <h2 className="mt-8 border-t border-[#1D4871]/10 pt-6 font-hero text-xl font-extrabold text-[#10233A]">
          Articles by {author.name}
        </h2>
        <ul className="mt-4 divide-y divide-[#1D4871]/10">
          {posts.map((p) => (
            <li key={p.slug} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <Link href={`/blog/${p.slug}/`} className="font-semibold text-[#10233A] hover:text-[#2367EE] hover:underline">
                {p.title}
              </Link>
              <time dateTime={p.publishedAt} className="shrink-0 text-sm text-[#1D4871]/50">
                {new Date(p.publishedAt).toLocaleDateString('en-US', dateFormat)}
              </time>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
