/**
 * Homepage hero: headline, lede, call-to-action row, a meta line,
 * centered social proof with a rotating agent quote, and the Ask AI links.
 */
import { soft, wrap } from '../HomeShared/styles';
import { AskAiLinks } from './components/AskAiLinks';
import { HeroActions } from './components/HeroActions';
import { ProofFaces } from './components/ProofFaces';
import { RotatingQuote } from './components/RotatingQuote';

const META = ['Works with any dialer and CRM', 'Any type: buyer, seller, investor, renter, and more'];

export function HomeHero() {
  return (
    <section className={`${wrap} pt-7 text-center min-[641px]:pt-10`}>
      <h1 className="mx-auto max-w-[12ch] text-balance font-hero text-[clamp(42px,7.4vw,80px)] font-extrabold leading-[1.08] tracking-[-0.035em] text-[#10233A]">
        Know what to say <span className={soft}>on every</span> call.
      </h1>
      <p className="mx-auto mt-[22px] max-w-[590px] text-[clamp(16px,2vw,18.5px)] leading-[1.55] text-[#556B86]">
        Sayso listens with you on live calls and shows short cues, your script and local market data in a small window
        beside your dialer. You stay present, and more calls end with an appointment.
      </p>
      <HeroActions />
      <div className="mt-4 flex flex-wrap justify-center gap-x-2.5 gap-y-1 text-[13.5px] text-[#556B86]">
        {META.map((item, i) => (
          <span key={item} className="flex gap-2.5">
            {i > 0 && (
              <i aria-hidden="true" className="not-italic opacity-45">
                &middot;
              </i>
            )}
            {item}
          </span>
        ))}
      </div>
      <div className="mt-[26px] flex flex-col items-center gap-2.5">
        <ProofFaces />
        <div className="text-center text-[clamp(12px,3.4vw,14px)] leading-[1.45] text-[#556B86]">
          <b className="block text-balance font-semibold text-[#10233A]">Used by hundreds of agents at eXp, KW, Real and more</b>
          <RotatingQuote />
        </div>
      </div>
      <AskAiLinks />
    </section>
  );
}
