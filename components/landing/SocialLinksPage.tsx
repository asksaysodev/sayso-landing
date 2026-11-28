'use client';

/**
 * Link page for social profile URL slots (Instagram, TikTok, LinkedIn, YouTube).
 * Phone-first, one column: the Sayso logo, one line on what Sayso does, the
 * Book time button (Calendly popup), then one card each for Sayso, the
 * interactive demo, Sayso Map and Sayso Composer. Not indexed (see app/social).
 */
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, FileText, MapPin, MessageSquareText, PlayCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { PrivacyChoicesLink } from '@/components/consent/PrivacyChoicesLink';

interface SocialLink {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
  analyticsId: string;
}

const LINKS: SocialLink[] = [
  {
    title: 'Sayso',
    description: 'Live guidance on your calls. Shows you what to ask next while the prospect is talking.',
    href: '/',
    icon: MessageSquareText,
    analyticsId: 'social-sayso',
  },
  {
    title: 'Interactive demo',
    description: 'Watch Sayso coach a call, right in your browser.',
    href: '/#demo',
    icon: PlayCircle,
    analyticsId: 'social-demo',
  },
  {
    title: 'Sayso Map',
    description: 'Similar homes for sale near any address, ready to text to a client.',
    href: 'https://map.asksayso.com',
    icon: MapPin,
    external: true,
    analyticsId: 'social-map',
  },
  {
    title: 'Sayso Composer',
    description: 'A one-page prospecting script for your lead in about 60 seconds.',
    href: 'https://composer.asksayso.com',
    icon: FileText,
    external: true,
    analyticsId: 'social-composer',
  },
];

export function SocialLinksPage() {
  const { openDemoCalendar } = useDemoCalendar();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[460px] flex-col px-5 pb-10 pt-12">
      <div className="text-center">
        <Link href="/" aria-label="Sayso home" className="inline-block">
          <Image src="/logos/logo-pos-transparent-horizontal.png" alt="Sayso" width={112} height={36} priority className="h-9 w-auto" />
        </Link>
        <h1 className="mt-5 font-hero text-[26px] font-extrabold leading-tight tracking-[-0.02em] text-[#10233A]">
          Real-time call guidance for real estate agents
        </h1>
      </div>

      <button
        type="button"
        onClick={openDemoCalendar}
        data-analytics-id="cta-book-demo-social"
        className="mt-7 w-full rounded-full bg-[#2367EE] px-6 py-4 text-[16px] font-semibold text-white shadow-button transition hover:-translate-y-px hover:bg-[#1d5ad6]"
      >
        Book time with the team
      </button>
      <p className="mt-2 text-center text-sm text-[#556B86]">A 20-minute walkthrough on a call with us.</p>

      <ul className="mt-8 space-y-3">
        {LINKS.map(({ title, description, href, icon: Icon, external, analyticsId }) => (
          <li key={title}>
            <Link
              href={href}
              data-analytics-id={analyticsId}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group flex items-center gap-4 rounded-2xl bg-white px-4 py-4 shadow-card-sm ring-1 ring-[#1D4871]/5 transition hover:-translate-y-px hover:shadow-card-sm-hover"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F4F4F5] text-[#2367EE]">
                <Icon size={20} aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[16px] font-semibold text-[#10233A]">{title}</span>
                <span className="block text-sm leading-snug text-[#556B86]">{description}</span>
              </span>
              <ArrowRight size={18} aria-hidden className="shrink-0 text-[#2367EE] transition group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>

      <footer className="mt-auto pt-10 text-center text-xs text-[#556B86]">
        <Link href="/" className="font-semibold text-[#1D4871] hover:underline">asksayso.com</Link>
        <span className="mx-2">·</span>
        <Link href="/privacy" className="hover:underline">Privacy</Link>
        <span className="mx-2">·</span>
        <Link href="/terms" className="hover:underline">Terms</Link>
        <span className="mx-2">·</span>
        <PrivacyChoicesLink className="hover:underline" />
      </footer>
    </main>
  );
}
