'use client';

import Image from 'next/image';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';
import { LightningIcon } from '@/components/icons/LightningIcon';
import { CalendarCheck, TrendingUp, Rocket, ShieldCheck } from 'lucide-react';

const ICON_CONSTANTS = { size: 28, color: '#2367EE' };
const metrics = [
    {
        icon: <CalendarCheck size={ICON_CONSTANTS.size} color={ICON_CONSTANTS.color}/>,
        title: 'More Appointments',
        description: 'Book meetings at the right moment',
    },
    {
        icon: <TrendingUp size={ICON_CONSTANTS.size} color={ICON_CONSTANTS.color}/>,
        title: 'Real Time Assistance',
        description: 'Higher quality conversations create higher quality appointments',
    },
    {
        icon: <Rocket size={ICON_CONSTANTS.size} color={ICON_CONSTANTS.color} />,
        title: 'Set up in minutes',
        description: 'Works in any CRM or dialer',
    },
    {
        icon: <ShieldCheck size={ICON_CONSTANTS.size} color={ICON_CONSTANTS.color}/>,
        title: 'Always-On Guidance',
        description: 'Real-time support on every call',
    },
];

// Starburst behind the hero
function HeroStarburst() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg viewBox="0 0 600 600" className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]" fill="none">
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 15) * (Math.PI / 180);
          const innerR = 60;
          const outerR = i % 2 === 0 ? 280 : 200;
          const x1 = 300 + Math.cos(angle) * innerR;
          const y1 = 300 + Math.sin(angle) * innerR;
          const x2 = 300 + Math.cos(angle) * outerR;
          const y2 = 300 + Math.sin(angle) * outerR;
          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#FFDE59"
              strokeWidth={i % 2 === 0 ? 3 : 1.5}
              opacity={i % 2 === 0 ? 0.25 : 0.15}
            />
          );
        })}
      </svg>
    </div>
  );
}

export function TransformationSection() {
  const { openDemoCalendar, openOnboarding } = useDemoCalendar();

  return (
    <section className="relative bg-[#1D4871] py-10 md:py-20 lg:py-24 overflow-hidden v4-halftone-dark">
      {/* Diagonal yellow accent stripe at top */}
      <div
        className="absolute top-0 left-0 right-0 h-3 md:h-4 bg-[#FFDE59]"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 60%)' }}
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-center">
          {/* Left column — Hero imagery (3/5 width on desktop) */}
          <div className="lg:col-span-2 flex-col items-center relative hidden md:flex">
            <HeroStarburst />

            {/* Large superhero character */}
            <div className="relative z-10">
              <Image
                src="/sayso_superhero_point_right.png"
                alt="SaySo Superhero"
                width={484}
                height={515}
                className="w-48 md:w-64 lg:w-72 xl:w-80 h-auto drop-shadow-2xl v4-hero-float"
              />
            </div>
          </div>

          {/* Right column — Victory metrics (2/5 width on desktop) */}
          <div className="lg:col-span-3">
            <h2 className="font-comic text-3xl md:text-4xl lg:text-5xl text-white mb-3 tracking-wide text-center lg:text-left">
              With SaySo, You&apos;re Unstoppable
            </h2>
            <p className="text-base md:text-lg text-white/70 mb-5 md:mb-10 text-center lg:text-left max-w-xl">
              Transform every prospecting call into a winning conversation.
            </p>

            {/* Victory metric cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl v2-comic-border v2-comic-shadow p-3 md:p-5"
                >
                  <div className="mb-2">{metric.icon}</div>
                  <h3 className="font-comic text-xl md:text-2xl text-black tracking-wide mb-1">
                    {metric.title}
                  </h3>
                  <p className="text-base text-[#1D4871]/70 leading-relaxed">
                    {metric.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Final CTA */}
            <div className="mt-5 md:mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
              <button
                onClick={openDemoCalendar}
                className="inline-flex items-center justify-center rounded-full bg-[#FFDE59] px-7 py-3.5 text-[1.1rem] font-bold text-[#1D4871] v2-comic-btn border-2 border-[#1D4871] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFDE59] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1D4871]"
              >
                <LightningIcon size={18} color="#1D4871" className="mr-2" />
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
