'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { LightningIcon } from '@/components/icons/LightningIcon';
import { HeroObjectionMoment } from '@/components/landing/HeroObjectionMoment';
import type { HeroContent } from '@/lib/content/personas/types';

const logos = [
  { name: 'eXp Realty', src: '/social-proof/exp-realty.png' },
  { name: 'Anderson Group', src: '/social-proof/anderson-group.png' },
  { name: 'Olaf', src: '/social-proof/olaf-logo.png' },
  { name: 'Maxwell Properties', src: '/social-proof/maxwell-properties.png' },
  { name: 'Keller Williams Palo Alto', src: '/social-proof/kw-palo-alto.png' },
];

// Repeat the logo set so the marquee fills wide screens and loops seamlessly
// (the track scrolls by exactly 50%, so the sequence must be duplicated).
const marqueeLogos = [...logos, ...logos, ...logos, ...logos];

const defaultContent: HeroContent = {
  headline: 'When a prospect pushes back, do you know what to say next?',
  headlineSize: 'text-4xl sm:text-5xl lg:text-6xl',
  tagline:
    'Sayso listens during your live calls and shows you the right thing to say the moment an objection lands, so you stay in control and book more appointments.',
};

export function HeroWithVideo({ content = defaultContent }: { content?: HeroContent }) {
  const { openSystemSelect } = useDemoCalendar();

  return (
    <section className="relative bg-white pt-[50px] lg:pt-[60px] pb-[40px] lg:pb-[60px] overflow-x-hidden v2-halftone">
      <div className="max-w-[1600px] mx-auto px-6">

        {/* Centered headline + tagline + CTA */}
        <div className="text-center max-w-[820px] mx-auto">
          <h1
            className={`font-comic tracking-wide leading-[1.05] text-[#1D4871] v4-slide-in-left ${content.headlineSize ?? 'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl'}`}
          >
            {content.headline}
          </h1>

          <p className="mt-4 text-base md:text-lg lg:text-xl leading-relaxed text-[#1D4871]/80 max-w-2xl mx-auto">
            {content.tagline}
          </p>
          {content.taglineSub && (
            <p className="mt-2 text-base md:text-lg lg:text-xl leading-relaxed text-[#1D4871]/80 max-w-2xl mx-auto">
              {content.taglineSub}
            </p>
          )}

          <div className="mt-6 md:mt-8 flex flex-col items-center gap-2">
            <button
              onClick={openSystemSelect}
              data-analytics-id="cta-download-hero"
              className="inline-flex items-center justify-center rounded-full bg-[#FFDE59] px-6 sm:px-9 py-3 sm:py-3.5 text-base sm:text-lg font-semibold text-[#1D4871] border-2 border-[#1D4871] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4871] focus-visible:ring-offset-2 whitespace-nowrap"
              style={{ boxShadow: '3px 3px 0px #1D4871' }}
            >
              <LightningIcon size={16} className="mr-2 flex-shrink-0" />
              Download Sayso
            </button>
            <p className="text-sm text-[#1D4871]/70">3-day free trial included</p>
          </div>
        </div>

        {/* The wow moment: an objection lands, then Sayso shows what to say next */}
        <div className="mt-8 md:mt-10 max-w-[640px] mx-auto">
          <HeroObjectionMoment />

          {/* Proof line directly under the moment, the way the category leaders do it */}
          <p className="mt-5 text-center text-sm font-semibold text-[#1D4871]/70 max-w-[460px] mx-auto">
            Agents using Sayso book appointments up to 12x more efficiently from the same call list.
          </p>

          {/* Secondary CTA into the full product tour */}
          <div className="mt-5 flex justify-center">
            <Link
              href="/product-tour"
              data-analytics-id="cta-product-tour-hero"
              className="inline-flex items-center justify-center rounded-full bg-transparent px-6 py-3 text-base font-semibold text-[#1D4871] border-2 border-[#1D4871] hover:bg-[#FFDE59]/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4871] focus-visible:ring-offset-2"
            >
              See more of Sayso
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 flex-shrink-0"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Social proof */}
        <div className="mt-8 md:mt-10 pt-2 md:pt-4">
          <style>{`
            @keyframes logo-marquee {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }

            .logo-marquee-track {
              animation: logo-marquee 40s linear infinite;
            }

            .logo-marquee-wrapper:hover .logo-marquee-track {
              animation-play-state: paused;
            }

            @media (prefers-reduced-motion: reduce) {
              .logo-marquee-track {
                animation: none;
                flex-wrap: wrap;
                justify-content: center;
                width: 100%;
              }

              .logo-marquee-wrapper {
                overflow: visible;
              }

              .logo-marquee-fade {
                display: none;
              }
            }
          `}</style>

          <div className="flex justify-center mb-5">
            <span className="font-comic text-2xl md:text-3xl text-[#1D4871] tracking-wide text-center">
              Trusted by Top Teams and Agents Nationwide
            </span>
          </div>

          {/* Continuous logo carousel */}
          <div className="logo-marquee-wrapper relative overflow-hidden">
            {/* Left fade edge */}
            <div className="logo-marquee-fade absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />

            <div className="logo-marquee-track flex w-max items-center gap-12 md:gap-20">
              {marqueeLogos.map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="flex shrink-0 items-center"
                  aria-hidden={index >= logos.length ? true : undefined}
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={260}
                    height={100}
                    className="h-12 md:h-16 w-auto object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Right fade edge */}
            <div className="logo-marquee-fade absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
          </div>
        </div>

      </div>
    </section>
  );
}
