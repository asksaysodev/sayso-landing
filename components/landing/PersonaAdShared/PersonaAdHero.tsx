/**
 * PersonaAdHero: logo, audience label, pain-led headline, value proposition,
 * customer result, the demo request form and a trusted-by logo at the top of each persona ad landing page.
 */
import Image from 'next/image';
import Link from 'next/link';
import { PROOF_VIDEO_URL } from './constants';
import { PersonaDemoForm } from './PersonaDemoForm';

interface PersonaAdHeroProps {
  /** Analytics suffix, e.g. "agent" gives "cta-watch-video-persona-agent". */
  persona: string;
  /** Who the page is for, shown above the headline exactly as written (e.g. "TEAM LEADERS"). */
  label: string;
  /** Persona-specific headline rendered as the H1 (lead with this buyer's pain, not a yes/no question). */
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
        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#556B86]">Trusted by</span>
          <Image
            src="/social-proof/fidelity-national-title.png"
            alt="Fidelity National Title Arizona"
            width={318}
            height={227}
            className="h-10 w-auto"
          />
        </div>
      </div>
    </section>
  );
}
