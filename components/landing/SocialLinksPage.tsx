'use client';

/**
 * Link page for social profile URL slots (Instagram, TikTok, LinkedIn, YouTube).
 * Phone-first and short enough to fit one phone screen: the logo, the headline,
 * the Book a demo button (Calendly popup), then cards for the interactive demo
 * (/social/demo), Sayso Map and Sayso Composer. Not indexed (see app/social).
 */
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, FileText, MapPin, PlayCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { PrivacyChoicesLink } from '@/components/consent/PrivacyChoicesLink';

interface SocialLink {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
  /** Small pill next to the title. */
  badge?: string;
  analyticsId: string;
}

const LINKS: SocialLink[] = [
  {
    title: 'Interactive demo',
    description: 'See Sayso coach a live call',
    href: '/social/demo',
    icon: PlayCircle,
    analyticsId: 'social-demo',
  },
  {
    title: 'Sayso Map',
    description: 'Run comps and find other options without the MLS',
    badge: 'Free trial',
    href: 'https://map.asksayso.com',
    icon: MapPin,
    external: true,
    analyticsId: 'social-map',
  },
  {
    title: 'Sayso Composer',
    description: 'Custom call scripts for any scenario',
    badge: 'Free trial',
    href: 'https://composer.asksayso.com',
    icon: FileText,
    external: true,
    analyticsId: 'social-composer',
  },
];

export function BookCallButton({ location }: { location: string }) {
  const { openDemoCalendar } = useDemoCalendar();
  return (
    <button
      type="button"
      onClick={openDemoCalendar}
      data-analytics-id={`cta-book-demo-${location}`}
      className="w-full rounded-full bg-[#2367EE] px-6 py-4 text-[17px] font-semibold text-white shadow-button transition hover:-translate-y-px hover:bg-[#1d5ad6]"
    >
      Book a demo
    </button>
  );
}

export function SocialLinksPage() {
  return (
    <main className="mx-auto flex min-h-[100svh] w-full max-w-[440px] flex-col px-5 pb-8 pt-10">
      <div className="text-center">
        <Link href="/" aria-label="Sayso home" className="inline-block">
          <Image src="/logos/logo-pos-transparent-horizontal.png" alt="Sayso" width={100} height={32} priority className="h-8 w-auto" />
        </Link>
        <h1 className="mt-5 font-hero text-[36px] font-extrabold leading-none tracking-[-0.03em] text-[#10233A]">
          Win the moment.
        </h1>
        <p className="mt-3 text-[15px] leading-snug text-[#556B86]">Sayso tools for before, during and after your calls.</p>
      </div>

      <div className="mt-7">
        <BookCallButton location="social" />
      </div>

      <ul className="mt-6 space-y-3">
        {LINKS.map(({ title, description, href, icon: Icon, external, badge, analyticsId }) => (
          <li key={title}>
            <Link
              href={href}
              data-analytics-id={analyticsId}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group flex items-center gap-3.5 rounded-2xl bg-white px-4 py-3.5 shadow-card-sm ring-1 ring-[#1D4871]/5 transition hover:-translate-y-px hover:shadow-card-sm-hover"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F4F4F5] text-[#2367EE]">
                <Icon size={20} aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="whitespace-nowrap text-[16px] font-semibold leading-tight text-[#10233A]">{title}</span>
                  {badge && (
                    <span className="whitespace-nowrap rounded-full bg-[#FFDE59] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#10233A]">
                      {badge}
                    </span>
                  )}
                </span>
                <span className="block text-[13px] text-[#556B86]">{description}</span>
              </span>
              <ArrowRight size={18} aria-hidden className="shrink-0 text-[#2367EE] transition group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>

      <SocialFooter />
    </main>
  );
}

export function SocialFooter() {
  return (
    <footer className="mt-auto pt-8 text-center text-xs text-[#556B86]">
      <Link href="/" className="font-semibold text-[#1D4871] hover:underline">asksayso.com</Link>
      <span className="mx-2">·</span>
      <Link href="/privacy" className="hover:underline">Privacy</Link>
      <span className="mx-2">·</span>
      <Link href="/terms" className="hover:underline">Terms</Link>
      <span className="mx-2">·</span>
      <PrivacyChoicesLink className="hover:underline" />
    </footer>
  );
}
