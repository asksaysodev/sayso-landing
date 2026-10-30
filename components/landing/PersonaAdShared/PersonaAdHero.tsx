/**
 * PersonaAdHero: logo, value proposition, customer result and the demo request form
 * at the top of each persona ad landing page.
 */
import Image from 'next/image';
import Link from 'next/link';
import SsFormEmbed from '@/components/landing/SsFormEmbed';
import { DEMO_FORM_EMBED_CODE, DEMO_FORM_ID, PROOF_VIDEO_URL } from './constants';

interface PersonaAdHeroProps {
  /** Analytics suffix, e.g. "agent" gives "persona-proof-video-agent". */
  persona: string;
  /** First sentence of the value proposition, rendered as the H1. */
  headline: string;
  /** Second paragraph, up to the shared customer result that follows it. */
  body: string;
}

export function PersonaAdHero({ persona, headline, body }: PersonaAdHeroProps) {
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
        <h1 className="font-hero font-bold text-xl sm:text-2xl text-[#1D4871] leading-snug mb-4">
          {headline}
        </h1>
        <p className="text-base text-[#1D4871]/70 mb-6 leading-relaxed">
          {body} One user achieved{' '}
          <a
            href={PROOF_VIDEO_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-id={`persona-proof-video-${persona}`}
            className="font-bold text-[#2367EE] underline underline-offset-2"
          >
            2.6× more appointments
          </a>
          .
        </p>
        {/* The embed's own wrapper adds 24px of padding; remove it so the box fits the fields exactly. */}
        <SsFormEmbed
          id={DEMO_FORM_ID}
          embedCode={DEMO_FORM_EMBED_CODE}
          className="scroll-mt-6 text-left [&_.ss-form-wrapper]:p-0"
        />
      </div>
    </section>
  );
}
