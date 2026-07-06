/**
 * PartnerLogoCarousel
 *
 * Auto-scrolling marquee of customer/partner logos for social proof. Uses the
 * real logo images stored under /public/social-proof. Pauses on hover and
 * collapses to a static wrapped row when reduced motion is requested.
 */
import Image from 'next/image';

const logos: { src: string; alt: string }[] = [
  { src: '/social-proof/exp-realty.png', alt: 'eXp Realty' },
  { src: '/social-proof/kw-palo-alto.png', alt: 'Keller Williams Palo Alto' },
  { src: '/social-proof/anderson-group.png', alt: 'Anderson Group' },
  { src: '/social-proof/maxwell-properties.png', alt: 'Maxwell Properties' },
  { src: '/social-proof/olaf-logo.png', alt: 'Olaf' },
];

export function PartnerLogoCarousel() {
  const duplicated = [...logos, ...logos];

  return (
    <section aria-label="Trusted by" className="border-y border-[#1D4871]/10 bg-white/60">
      <style>{`
        @keyframes partner-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .partner-marquee-track { animation: partner-marquee 28s linear infinite; }
        .partner-marquee-track:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .partner-marquee-track {
            animation: none;
            flex-wrap: wrap;
            justify-content: center;
            width: 100%;
          }
          .partner-marquee-wrapper { overflow: visible; }
          .partner-marquee-fade { display: none; }
        }
      `}</style>

      <div className="max-w-[1200px] mx-auto px-6 py-8 md:py-10">
        <p className="text-xs md:text-sm tracking-wide text-[#1D4871]/60 text-center mb-6">
          Trusted by real estate teams making calls every day
        </p>

        <div className="partner-marquee-wrapper relative overflow-hidden">
          <div className="partner-marquee-fade absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#F4F4F5] to-transparent pointer-events-none z-10" />

          <div className="partner-marquee-track flex items-center gap-10 md:gap-14 w-max">
            {duplicated.map((logo, index) => (
              <Image
                key={`partner-logo-${index}`}
                src={logo.src}
                alt={logo.alt}
                width={140}
                height={48}
                className="h-8 md:h-10 w-auto object-contain opacity-60 grayscale transition-all duration-200 hover:opacity-90 hover:grayscale-0"
              />
            ))}
          </div>

          <div className="partner-marquee-fade absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#F4F4F5] to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
}
