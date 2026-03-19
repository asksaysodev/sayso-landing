'use client';

import Image from 'next/image';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { ProductShowcaseDesktop } from './ProductShowcaseDesktop';
import { LightningIcon } from '@/components/icons/LightningIcon';
import type { HeroContent } from '@/lib/content/personas/types';

const logos = [
  { name: 'eXp Realty', src: '/exp realty.png' },
  { name: 'Anderson Group', src: '/anderson group.png' },
  { name: 'Olaf', src: '/olaf logo.png' },
];

const defaultContent: HeroContent = {
  headline: 'Win the Moment',
  tagline:
    'Real-time guidance during prospecting calls to help agents handle objections, ask better questions, book more appointments, and automatically capture call notes in their CRM.',
};

export function HeroWithVideo({ content = defaultContent }: { content?: HeroContent }) {
  const { openSystemSelect } = useDemoCalendar();

  return (
    <>

      <section className="relative bg-white pt-[70px] lg:pt-[140px] pb-[70px] lg:pb-[140px] overflow-hidden v2-halftone">
        <div className="max-w-[1600px] mx-auto px-6">

          {/* Three-column layout: text | superhero | video */}
          <div className="relative flex flex-col lg:flex-row lg:items-center gap-6 xl:gap-8">

            {/* LEFT COLUMN — headline, tagline, CTAs */}
            <div className="text-center lg:max-w-[360px] xl:max-w-[400px] flex-shrink-0 lg:pl-8">
              <div className="mb-3 md:mb-4">
                <h1 className={`font-comic tracking-wide leading-[1.05] text-[#1D4871] v4-slide-in-left ${content.headlineSize ?? 'text-5xl sm:text-6xl lg:text-7xl xl:text-8xl'}`}>
                  {content.headline}
                </h1>
              </div>

              {/* Tagline */}
              <p className="mt-2 text-base md:text-lg lg:text-xl leading-relaxed text-[#1D4871]/80 max-w-lg mx-auto">
                {content.tagline}
              </p>
              {content.taglineSub && (
                <p className="mt-2 text-base md:text-lg lg:text-xl leading-relaxed text-[#1D4871]/80 max-w-lg mx-auto">
                  {content.taglineSub}
                </p>
              )}

              {/* CTAs — hidden on mobile, shown on desktop */}
              <div className="mt-5 md:mt-6 hidden lg:flex justify-center">
                <button
                  onClick={openSystemSelect}
                  className="inline-flex items-center justify-center rounded-full bg-[#FFDE59] px-5 sm:px-8 py-3 sm:py-3.5 text-base sm:text-lg font-semibold text-[#1D4871] border-2 border-[#1D4871] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4871] focus-visible:ring-offset-2 whitespace-nowrap"
                  style={{ boxShadow: '3px 3px 0px #1D4871' }}
                >
                  <LightningIcon size={16} className="mr-2 flex-shrink-0" />
                  Download Sayso
                </button>
              </div>
            </div>

            {/* SUPERHERO — sits between text and video, overlaps video's left edge */}
            <div className="hidden lg:block flex-shrink-0 w-[160px] xl:w-[220px] -mr-[40px] xl:-mr-[50px] self-start z-30 pointer-events-none">
              <Image
                src="/this_is_sayso_right.png"
                alt="This is SaySo"
                width={300}
                height={300}
                className="w-full h-auto drop-shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
              />
            </div>

            {/* RIGHT COLUMN — demo video */}
            <div className="relative flex-1 min-w-0 z-0">
              <ProductShowcaseDesktop />
              {/* Mobile narrator badge — overlays top of demo frame */}
              <div className="flex lg:hidden justify-end pointer-events-none absolute top-[-10px] right-2 z-40">
                <div
                  className="bg-[#FFDE59] border-2 border-[#1D4871] px-2 py-1 sm:px-3 sm:py-1.5 rounded-md transform -rotate-2"
                  style={{ boxShadow: '2px 2px 0px #1D4871' }}
                >
                  <span className="font-comic text-[#1D4871] text-[2.8vw] sm:text-sm tracking-wide whitespace-nowrap">
                    Works with existing dialer or CRM!
                  </span>
                </div>
              </div>
              {/* Desktop narrator badge — overlays top of demo frame */}
              <div className="hidden lg:flex justify-end pointer-events-none absolute top-[-16px] right-[2%] z-50">
                <div
                  className="bg-[#FFDE59] border-[2.5px] border-[#1D4871] px-5 py-2.5 rounded-lg transform -rotate-2"
                  style={{ boxShadow: '3px 3px 0px #1D4871' }}
                >
                  <span className="font-comic text-[#1D4871] text-2xl xl:text-3xl tracking-wide whitespace-nowrap">
                    Works with existing dialer or CRM!
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile CTA — below demo frame, hidden on desktop */}
            <div className="mt-6 flex lg:hidden justify-center">
              <button
                onClick={openSystemSelect}
                className="inline-flex items-center justify-center rounded-full bg-[#FFDE59] px-5 sm:px-8 py-3 sm:py-3.5 text-base sm:text-lg font-semibold text-[#1D4871] border-2 border-[#1D4871] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4871] focus-visible:ring-offset-2 whitespace-nowrap"
                style={{ boxShadow: '3px 3px 0px #1D4871' }}
              >
                <LightningIcon size={16} className="mr-2 flex-shrink-0" />
                Create an Account
              </button>
            </div>
          </div>

          {/* SOCIAL PROOF — full width below the grid */}
          <div className="mt-12 md:mt-16 pt-4 md:pt-6">
            {/* Label */}
            <div className="flex justify-center mb-5">
              <span className="text-sm md:text-base font-bold tracking-widest uppercase text-black text-center" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>Trusted by Top Teams and Agents Nationwide</span>
            </div>

            {/* Fixed logos — three equal columns */}
            <div className="flex items-center justify-center gap-10 md:gap-20">
              {logos.map((logo) => (
                <div key={logo.name} className="flex flex-1 items-center justify-center max-w-[180px] md:max-w-[260px]">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={260}
                    height={100}
                    className="h-16 md:h-24 w-auto object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Case studies badge */}
            <div className="flex justify-center mt-8 md:mt-10">
              <div
                className="inline-flex items-center gap-2 bg-[#FFDE59] border-[2.5px] border-[#1D4871] px-5 py-2.5 rounded-lg transform -rotate-1"
                style={{ boxShadow: '3px 3px 0px #1D4871' }}
              >
                <span className="text-lg" aria-hidden="true">📋</span>
                <span className="font-comic text-[#1D4871] text-base md:text-lg tracking-wide whitespace-nowrap">
                  Case Studies Coming Soon
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
