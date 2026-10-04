/**
 * Grayscale grid of customer and partner logos from the shared social-proof list.
 */

import Image from 'next/image';
import { socialProofLogos } from '@/lib/content/social-proof-logos';

export function LogoGrid() {
  return (
    <section aria-label="Teams using Sayso" className="pt-12 pb-16 border-t border-accent-bg">
      <div className="max-w-[1180px] mx-auto px-4 md:px-6">
        <p className="mb-7 text-center text-[13px] font-extrabold tracking-[0.12em] uppercase text-[#515C6C]">
          Trusted by top teams and agents nationwide
        </p>
        <div className="grid grid-cols-3 gap-x-4 gap-y-5 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-9 sm:gap-y-8">
          {socialProofLogos.map((logo) => (
            <Image
              key={logo.src}
              src={logo.src}
              alt={logo.name}
              width={128}
              height={40}
              className="h-[34px] w-full sm:h-10 sm:w-[clamp(88px,10vw,128px)] object-contain grayscale opacity-70"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
