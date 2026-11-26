import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Bug, CalendarClock, FileText, Headphones, LayoutDashboard, Mail, MapPin, Monitor, PenLine, Sparkles, UsersRound } from 'lucide-react';
import { HelpSearch } from '@/components/help/HelpSearch';
import { HELP_SECTIONS, HELP_SUPPORT } from '@/lib/help-sections';
import { getAllHelpArticles, getSectionArticles } from '@/lib/help';
import { generateBreadcrumbJsonLd } from '@/lib/seo/schema';
import { siteUrl } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Help Center',
  description:
    'Step-by-step help for Sayso: install the desktop app on Mac or Windows, use live coaching on calls, manage your account, invite agents and build teams.',
  alternates: { canonical: `${siteUrl}/help/` },
  openGraph: {
    title: 'Sayso Help Center',
    description: 'Step-by-step help for the Sayso desktop app, web app, agents and team admins.',
    type: 'website',
  },
};

const BOX_ICONS: Record<string, React.ReactNode> = {
  'desktop-app': <Monitor className="h-6 w-6" aria-hidden />,
  'web-app': <LayoutDashboard className="h-6 w-6" aria-hidden />,
  agents: <Headphones className="h-6 w-6" aria-hidden />,
  admins: <UsersRound className="h-6 w-6" aria-hidden />,
};

const POPULAR = [
  '/help/desktop-app/download-sayso/',
  '/help/agents/your-first-coached-call/',
  '/help/desktop-app/meeting-detection/',
  '/help/desktop-app/no-prompts/',
  '/help/admins/invite-agents/',
  '/help/admins/email-reports/',
  '/help/agents/when-sayso-helps/',
  '/help/agents/cell-calls-on-windows/',
  '/help/agents/iphone-calls-on-mac/',
];

export default function HelpHubPage() {
  const boxes = HELP_SECTIONS.filter((s) => s.hubBox).map((sec) => {
    const articles = getSectionArticles(sec.id);
    return {
      ...sec,
      count: articles.length,
      groups: sec.groups
        .map((g) => ({ ...g, count: articles.filter((a) => a.group === g.id).length }))
        .filter((g) => g.count > 0),
    };
  });
  const all = getAllHelpArticles();
  const popular = POPULAR.map((url) => all.find((a) => a.url === url)).filter((a): a is NonNullable<typeof a> => Boolean(a));

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Sayso Help Center',
      url: `${siteUrl}/help/`,
      isPartOf: { '@id': `${siteUrl}/#website` },
    },
    generateBreadcrumbJsonLd([
      { name: 'Home', url: '/' },
      { name: 'Help Center', url: '/help/' },
    ]),
  ];

  return (
    <div className="pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="px-4 pb-10 pt-10 text-center sm:pt-14">
        <h1 className="mb-8 font-hero text-4xl font-extrabold tracking-[-0.03em] text-[#10233A] sm:text-5xl">How can we help?</h1>
        <HelpSearch variant="hero" />
      </section>

      <div className="mx-auto max-w-6xl px-4">
        {/* General help strip */}
        <section aria-label="Get help" className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="flex flex-col rounded-2xl bg-white p-5 shadow-card-sm lg:col-span-2">
            <CalendarClock className="mb-3 h-5 w-5 text-[#2367EE]" aria-hidden />
            <p className="font-bold text-[#10233A]">Weekly office hours</p>
            <p className="mt-1 text-sm text-[#1D4871]/70">{HELP_SUPPORT.officeHoursSchedule}</p>
            <a
              href={HELP_SUPPORT.officeHoursUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex h-10 items-center gap-1.5 self-start rounded-full bg-[#2367EE] px-4 text-sm font-semibold text-white shadow-button transition hover:bg-[#1d5ad6]"
            >
              Join on Google Meet <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
          <StripLink href="/help/support/report-a-bug/" icon={<Bug className="h-5 w-5" aria-hidden />} title="Report a bug" />
          <StripLink href="/help/support/send-your-logs/" icon={<FileText className="h-5 w-5" aria-hidden />} title="Send your logs" />
          <StripLink href={`mailto:${HELP_SUPPORT.email}`} icon={<Mail className="h-5 w-5" aria-hidden />} title="Email support" text={HELP_SUPPORT.email} />
        </section>

        {/* The four boxes */}
        <section aria-label="Browse by topic" className="grid gap-5 md:grid-cols-2">
          {boxes.map((box) => (
            <div key={box.id} className="flex flex-col rounded-3xl bg-white p-6 shadow-card sm:p-7">
              <Link href={`/help/${box.id}/`} className="group mb-5 flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#2367EE]/10 text-[#2367EE]">{BOX_ICONS[box.id]}</span>
                <span>
                  <span className="flex items-center gap-2 font-hero text-xl font-extrabold text-[#10233A] group-hover:text-[#2367EE]">
                    {box.title}
                    <ArrowRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" aria-hidden />
                  </span>
                </span>
              </Link>
              <ul className="mt-auto divide-y divide-[#D7DEE1]/70 border-t border-[#D7DEE1]/70">
                {box.groups.map((g) => (
                  <li key={g.id}>
                    <Link href={`/help/${box.id}/#${g.id}`} className="flex items-center justify-between gap-3 py-2.5 text-[15px] font-semibold text-[#1D4871] hover:text-[#2367EE]">
                      {g.title}
                      <span className="text-xs font-semibold text-[#1D4871]/45">{g.count} {g.count === 1 ? 'article' : 'articles'}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section aria-label="Sayso tools" className="mt-12">
          <h2 className="mb-4 font-hero text-xl font-extrabold text-[#10233A]">Sayso tools</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { href: '/help/tools/sayso-map/', icon: <MapPin className="h-5 w-5" aria-hidden />, title: 'Sayso Map' },
              { href: '/help/tools/sayso-composer/', icon: <PenLine className="h-5 w-5" aria-hidden />, title: 'Sayso Composer' },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="group flex items-center gap-4 rounded-2xl bg-white p-5 shadow-card-sm transition hover:shadow-card-sm-hover">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2367EE]/10 text-[#2367EE]">{t.icon}</span>
                <span>
                  <span className="block font-bold text-[#10233A] group-hover:text-[#2367EE]">{t.title}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {popular.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 font-hero text-xl font-extrabold text-[#10233A]">Popular articles</h2>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {popular.map((p) => (
                <li key={p.url}>
                  <Link href={p.url} className="flex items-center justify-between gap-3 rounded-2xl bg-white px-5 py-4 font-semibold text-[#10233A] shadow-card-sm transition hover:shadow-card-sm-hover">
                    {p.title}
                    <ArrowRight className="h-4 w-4 shrink-0 text-[#2367EE]" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-12 flex flex-col items-start justify-between gap-4 rounded-3xl bg-white p-6 shadow-card sm:flex-row sm:items-center sm:p-8">
          <div className="flex items-start gap-4">
            <Sparkles className="mt-1 h-5 w-5 shrink-0 text-[#2367EE]" aria-hidden />
            <div>
              <p className="font-hero text-lg font-extrabold text-[#10233A]">What&apos;s new in Sayso</p>
            </div>
          </div>
          <Link href="/help/support/whats-new/" className="inline-flex h-11 items-center rounded-full bg-[#2367EE] px-5 text-sm font-semibold text-white shadow-button hover:bg-[#1d5ad6]">
            Read the release notes
          </Link>
        </section>
      </div>
    </div>
  );
}

function StripLink({ href, icon, title, text }: { href: string; icon: React.ReactNode; title: string; text?: string }) {
  const className = 'group rounded-2xl bg-white p-5 shadow-card-sm transition hover:shadow-card-sm-hover';
  const inner = (
    <>
      <span className="mb-3 block text-[#2367EE]">{icon}</span>
      <span className="block font-bold text-[#10233A] group-hover:text-[#2367EE]">{title}</span>
      {text && <span className="mt-1 block break-words text-sm text-[#1D4871]/70">{text}</span>}
    </>
  );
  return href.startsWith('mailto:') ? (
    <a href={href} className={className}>{inner}</a>
  ) : (
    <Link href={href} className={className}>{inner}</Link>
  );
}
