/**
 * PersonaAdHero: logo, audience label, question headline, value proposition,
 * customer result and the demo request form at the top of each persona ad landing page.
 */
import Image from 'next/image';
import Link from 'next/link';
import { PROOF_VIDEO_URL } from './constants';
import { PersonaDemoForm } from './PersonaDemoForm';

interface PersonaAdHeroProps {
  /** Analytics suffix, e.g. "agent" gives "cta-watch-video-persona-agent". */
  persona: string;
  /** Who the page is for, shown above the headline exactly as written (e.g. "SALES LEADERS"). */
  label: string;
  /** Short question rendered as the H1. */
  headline: string;
  /** One sentence on what Sayso does for this audience. */
  subheadline: string;
  /** Contrast line, followed by the shared customer result. */
  proof: string;
}

export function PersonaAdHero({ persona, label, headline, subheadline, proof }: PersonaAdHeroProps) {
  return (
    <section className="pt-10 pb-8 px-6 text-center">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-center mb-8">
          <Link href="/" aria-label="Sayso home">
            <Image
              src="/logos/logo-pos-horizontal.png"
              alt="Sayso"
              width={100}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
        </div>
        <p className="text-xs font-bold tracking-widest text-[#2367EE] mb-3">{label}</p>
        <h1 className="font-comic text-3xl sm:text-4xl text-[#1D4871] leading-tight mb-4">
          {headline}
        </h1>
        <p className="font-hero font-semibold text-lg text-[#1D4871] leading-snug mb-3">{subheadline}</p>
        <p className="text-sm text-[#1D4871]/70 mb-6 leading-relaxed">
          {proof} One user achieved{' '}
          <a
            href={PROOF_VIDEO_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-id={`cta-watch-video-persona-${persona}`}
            className="font-bold text-[#2367EE] underline underline-offset-2"
          >
            2.6× more appointments
          </a>
          .
        </p>
        <PersonaDemoForm />
      </div>
    </section>
  );
}
