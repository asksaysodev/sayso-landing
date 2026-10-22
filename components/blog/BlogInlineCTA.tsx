/**
 * BlogInlineCTA: a one-line call to action placed after a post's second paragraph.
 * Opt-in per post via the `ctaVariant` frontmatter field; the copy and destination
 * match the post type, so the product mention reads as a natural next step.
 */
import Link from 'next/link';
import type { BlogCtaVariant } from '@/lib/blog';

const VARIANTS: Record<BlogCtaVariant, { lead: string; label: string; href: string }> = {
  script: {
    lead: 'Want the next line on screen while you are on the call?',
    label: 'See how Sayso works',
    href: '/demo/',
  },
  coaching: {
    lead: 'Coaching between calls helps. Coaching during the call is a different tool.',
    label: 'See how live call coaching compares',
    href: '/why-sayso/',
  },
  dialer: {
    lead: 'Already have a dialer? Sayso coaches you live on the calls it makes.',
    label: 'See the integrations',
    href: '/integrations/',
  },
  crm: {
    lead: 'Sayso writes structured call notes into your CRM while you talk.',
    label: 'See the Follow Up Boss integration',
    href: '/integrations/partners/follow-up-boss/',
  },
  leads: {
    lead: 'Get the next question on screen while the lead is still talking.',
    label: 'See how Sayso works',
    href: '/demo/',
  },
  prospecting: {
    lead: 'Keep every prospecting call on track with live prompts as you talk.',
    label: 'See how Sayso works',
    href: '/demo/',
  },
  team: {
    lead: 'Coach every agent on every call without listening in.',
    label: 'See Sayso for team leaders',
    href: '/for/team-leaders/',
  },
};

export function BlogInlineCTA({ variant }: { variant: BlogCtaVariant }) {
  const v = VARIANTS[variant];
  if (!v) return null;
  return (
    <aside className="my-8 bg-[#FFDE59]/20 border-2 border-[#FFDE59] rounded-xl px-6 py-4">
      <p className="text-sm font-sans text-[#1D4871]">
        <strong>{v.lead}</strong>{' '}
        <Link
          href={v.href}
          data-analytics-id={`cta-inline-blog-${variant}`}
          className="text-[#2367EE] font-bold hover:underline"
        >
          {v.label} &rarr;
        </Link>
      </p>
    </aside>
  );
}
