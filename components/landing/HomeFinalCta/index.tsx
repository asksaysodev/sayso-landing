/** Closing call to action: the floating superhero, a headline, one line of copy and the two main buttons. */
import Image from 'next/image';
import { wrap } from '../HomeShared/styles';
import { FinalCtaButtons } from './FinalCtaButtons';

export function HomeFinalCta() {
  return (
    <section className={`${wrap} pb-[110px] pt-[90px] text-center`} aria-labelledby="final-cta-title">
      <Image
        src="/images/this-is-sayso-point-up.png"
        alt="The Sayso superhero saying This is Sayso."
        width={484}
        height={515}
        sizes="220px"
        className="mx-auto mb-1 block h-auto w-[min(220px,58vw)] motion-safe:animate-[v4HeroFloat_3s_ease-in-out_infinite]"
      />
      <h2
        id="final-cta-title"
        className="text-balance font-hero text-[clamp(34px,5vw,54px)] font-extrabold leading-[1.06] tracking-[-0.03em] text-[#10233A]"
      >
        Ready for your next call?
      </h2>
      <p className="mx-auto mt-3.5 max-w-[500px] text-[17px] text-[#556B86]">
        Short cues, your script and the local market, one glance away on every call.
      </p>
      <FinalCtaButtons />
    </section>
  );
}
