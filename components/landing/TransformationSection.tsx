'use client';

import Image from 'next/image';
import { useDemoCalendar } from '@/app/context/landing/DemoCalendarContext';

// Victory metric card icons
function CalendarCheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="5" width="22" height="20" rx="3" stroke="#2367EE" strokeWidth="2" fill="none"/>
      <path d="M3 10H25" stroke="#2367EE" strokeWidth="2"/>
      <path d="M9 2V6" stroke="#2367EE" strokeWidth="2" strokeLinecap="round"/>
      <path d="M19 2V6" stroke="#2367EE" strokeWidth="2" strokeLinecap="round"/>
      <path d="M10 16L13 19L19 13" stroke="#2367EE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function RevenueIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 22L10 16L15 19L24 8" stroke="#2367EE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 8H24V14" stroke="#2367EE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 3C14 3 10 8 10 16C10 18 11 20 14 22C17 20 18 18 18 16C18 8 14 3 14 3Z" stroke="#2367EE" strokeWidth="2" fill="none"/>
      <circle cx="14" cy="13" r="2" fill="#2367EE"/>
      <path d="M10 18L6 20L8 16" stroke="#2367EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M18 18L22 20L20 16" stroke="#2367EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M12 22L14 26L16 22" stroke="#2367EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 3L4 7V14C4 20 8 24 14 26C20 24 24 20 24 14V7L14 3Z" stroke="#2367EE" strokeWidth="2" fill="none"/>
      <path d="M10 14L13 17L19 11" stroke="#2367EE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const metrics = [
  {
    icon: <CalendarCheckIcon />,
    title: 'More Appointments',
    description: 'Book meetings at the right moment',
  },
  {
    icon: <RevenueIcon />,
    title: 'Real Time Assistance',
    description: 'Higher quality conversations create higher quality appointments',
  },
  {
    icon: <RocketIcon />,
    title: 'Set up in minutes',
    description: 'Works in any CRM or dialer',
  },
  {
    icon: <ShieldIcon />,
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
                <svg width="18" height="18" viewBox="0 0 512 512" fill="none" className="mr-2">
                  <path d="M294.4 25.6L115.2 281.6H256L217.6 486.4L396.8 230.4H256L294.4 25.6Z" fill="#1D4871" stroke="#1D4871" strokeWidth="20"/>
                </svg>
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
