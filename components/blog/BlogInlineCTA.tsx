/**
 * BlogInlineCTA: a compact call to action placed after a post's second paragraph.
 * Opt-in per post via the `ctaVariant` frontmatter field; the copy and destination
 * match the post type, so the product mention reads as a natural next step.
 * Shares the BlogCtaCard shell with BlogInArticleCTA.
 */
import type { BlogCtaVariant } from '@/lib/blog';
import { BlogCtaCard } from './BlogCtaCard';
import { Button } from '@/components/ui/Button';

const VARIANTS: Record<BlogCtaVariant, { heading: string; body: string; label: string; href: string }> = {
  script: {
    heading: 'Want the next line on screen while you are on the call?',
    body: 'Sayso shows your scripts and objection responses in real time, so the right words are there when you need them.',
    label: 'See Playbook',
    href: '/products/playbook/',
  },
  coaching: {
    heading: 'Want help during the call, not just between calls?',
    body: 'Sayso shows live prompts and objection responses on screen while you talk, alongside whatever coaching you choose.',
    label: 'See how it compares',
    href: '/why-sayso/',
  },
  leads: {
    heading: 'Want to know what to ask next while the lead is talking?',
    body: 'Sayso suggests the next question on screen in real time, so the conversation keeps moving toward an appointment.',
    label: 'See real-time guidance',
    href: '/products/cue/',
  },
  prospecting: {
    heading: 'Want every prospecting call to end with a next step?',
    body: 'Sayso keeps the conversation on track with live prompts on screen as you talk.',
    label: 'See real-time guidance',
    href: '/products/cue/',
  },
  team: {
    heading: 'Want to coach every agent without listening in on every call?',
    body: 'Sayso gives each agent live prompts during their calls and writes the notes for you to review.',
    label: 'See Sayso for team leaders',
    href: '/for/team-leaders/',
  },
};

export function BlogInlineCTA({ variant }: { variant: BlogCtaVariant }) {
  const v = VARIANTS[variant];
  return (
    <BlogCtaCard as="aside">
      <div className="px-6 py-7 md:px-8 flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
        <div className="flex-1 text-center md:text-left">
          <p className="font-hero font-extrabold tracking-[-0.01em] text-lg md:text-xl text-white leading-snug mb-2">{v.heading}</p>
          <p className="text-sm text-white font-sans">{v.body}</p>
        </div>
        <Button href={v.href} variant="secondary" className="shrink-0 self-center" data-analytics-id={`cta-inline-blog-${variant}`}>
          {v.label} &rarr;
        </Button>
      </div>
    </BlogCtaCard>
  );
}
