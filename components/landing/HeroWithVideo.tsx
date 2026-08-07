'use client';

/**
 * Homepage hero. Same copy and CTA as before, but the demo video is replaced
 * with the live Sayso coach widget (the Option 7 "Real Widget, Split" element:
 * the genuine coach UI plus the quiet Follow Up Boss sync chip). On desktop the
 * copy sits left and the widget right; on mobile they stack, copy then widget.
 */
import Image from 'next/image';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { LightningIcon } from '@/components/icons/LightningIcon';
import { RealWidgetPanel } from '@/components/landing/RealWidgetPanel';
import type { HeroContent } from '@/lib/content/personas/types';

const logos = [
  { name: 'eXp Realty', src: '/social-proof/exp-realty.png' },
  { name: 'Anderson Group', src: '/social-proof/anderson-group.png' },
  { name: 'Olaf', src: '/social-proof/olaf-logo.png' },
  { name: 'Maxwell Properties', src: '/social-proof/maxwell-properties.png' },
  { name: 'Keller Williams Palo Alto', src: '/social-proof/kw-palo-alto.png' },
  { name: 'Coldwell Banker', src: '/social-proof/coldwell-banker.png' },
  { name: 'Yvans Cator Jr. Real Estate', src: '/social-proof/yvans-cator-real-estate.png' },
  { name: 'Keller Williams Executive', src: '/social-proof/kw-executive.png' },
  { name: 'Real People Realty', src: '/social-proof/real-people-realty.png' },
  { name: 'EXIT Realty', src: '/social-proof/exit-realty.png' },
  { name: 'Team Borham', src: '/social-proof/team-borham.png' },
  { name: 'Around Town Properties', src: '/social-proof/around-town-properties.png' },
  { name: 'Secure Home Finder Team at LPT Realty', src: '/social-proof/secure-home-finder-team.png' },
  { name: 'RISE Los Angeles', src: '/social-proof/rise-los-angeles.png' },
];

// Repeat the logo set so the marquee fills wide screens and loops seamlessly.
// Three things keep the loop from visibly jumping, all of them load-bearing:
//   1. The copy count must stay EVEN. The track scrolls by exactly 50%, so an odd
//      count puts the halfway point mid-sequence instead of on a repeat boundary.
//   2. Spacing is padding on each item, never flex `gap`. A flex row has one fewer
//      gap than it has items, so 50% of the track lands half a gap short of the seam.
//   3. Each logo gets a fixed-width box (not `w-auto`). Widths that depend on the
//      loaded image change the track width as images decode, and since the scroll
//      distance is a percentage of that width, the animation shifts underneath itself.
const marqueeLogos = [...logos, ...logos, ...logos, ...logos];

const defaultContent: HeroContent = {
  headline: 'Book 2x More Appointments from Prospecting Calls',
  tagline:
    'Real-time coaching during live calls helps agents handle objections, stay on track, and automatically log notes in your CRM.',
};

export function HeroWithVideo({ content = defaultContent }: { content?: HeroContent }) {
  const { openSystemSelect } = useDemoCalendar();

  return (
    <section className="relative bg-white pt-7 lg:pt-10 pb-8 lg:pb-12 overflow-x-hidden v2-halftone">
      {/* Match the navbar / site container (max-w-[1200px]) so the hero aligns
          with the rest of the page instead of spilling to the edges. */}
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Split hero: copy left, live Sayso widget right. Stacks on mobile.
            Headline, tagline, and CTA are centered within the left block. */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          {/* Left: headline + tagline + CTA, centered in the block */}
          <div className="text-center">
            <h1
              className={`font-comic tracking-wide leading-[1.05] text-[#1D4871] v4-slide-in-left ${content.headlineSize ?? 'text-4xl sm:text-5xl lg:text-6xl'}`}
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

            {/* CTA, directly under the text and centered */}
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
            </div>
          </div>

          {/* Right: the genuine Sayso coach, live on a call */}
          <div className="w-full">
            <RealWidgetPanel />
          </div>
        </div>

        {/* Social proof */}
        <div className="mt-8 md:mt-10 pt-1 md:pt-2">
          <style>{`
            @keyframes logo-marquee {
              from { transform: translate3d(0, 0, 0); }
              to { transform: translate3d(-50%, 0, 0); }
            }

            .logo-marquee-track {
              animation: logo-marquee 90s linear infinite;
              /* Promote to its own compositor layer so the scroll runs on the
                 GPU instead of repainting on the main thread. */
              will-change: transform;
              backface-visibility: hidden;
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

            <div className="logo-marquee-track flex w-max items-center">
              {marqueeLogos.map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="flex shrink-0 items-center justify-center pr-8 md:pr-12"
                  aria-hidden={index >= logos.length ? true : undefined}
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={260}
                    height={100}
                    // Eager: these sit in the hero and repeat, so lazy loading made
                    // them pop in mid-scroll. Only 14 unique files, so the browser
                    // still makes just 14 requests across all copies.
                    loading="eager"
                    className="h-14 md:h-16 w-[150px] md:w-[190px] object-contain"
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
