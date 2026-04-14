import Image from 'next/image';
import { LightningIcon } from '@/components/icons/LightningIcon';

export function ProductShowcaseCopy() {
  return (
    <section className="bg-[#F8F8FA] py-12 md:py-14 lg:py-16 v2-halftone relative">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center">
          {/* Superhero-styled label */}
          <div className="flex justify-center mb-3 md:mb-4">
            <span className="v2-pow-badge px-3 py-1 rounded-lg text-xs font-comic tracking-wider">
              THEN THE HERO ARRIVES
            </span>
          </div>

          {/* Heading with lightning bolt + small superhero */}
          <div className="flex items-center justify-center gap-3 mb-3 md:mb-4">
            <h2 className="font-comic text-3xl md:text-4xl lg:text-5xl text-[#1D4871] tracking-wide">
              <LightningIcon size={28} color="#2367EE" className="inline-block mr-1 -mt-1" />
              Enter SaySo.
            </h2>
            <Image
              src="/sayso_superhero_point_right.png"
              alt=""
              width={64}
              height={68}
              className="w-12 md:w-16 h-auto v4-hero-float hidden sm:block"
              aria-hidden="true"
            />
          </div>

          <p className="text-base md:text-lg text-[#1D4871]/80 max-w-2xl mx-auto">
            Sayso surfaces the next best question while you&apos;re still in the conversation, right in your workflow.
          </p>
        </div>
      </div>
    </section>
  );
}
