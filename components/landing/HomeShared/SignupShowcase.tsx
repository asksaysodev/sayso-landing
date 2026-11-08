/**
 * The lower half of the thank-you pages (/confirmation and /subscribed): the
 * homepage's interactive demo and its review cards. Both are the homepage
 * components themselves, so an edit there shows up here too.
 * Needs a DemoCalendarProvider above it (the demo's end cover books a demo).
 */
import { HomeLiveDemo } from '../HomeLiveDemo';
import { HomeReviews } from '../HomeReviews';
import { SectionHead } from './SectionHead';
import { section } from './styles';

export function SignupShowcase() {
  return (
    <>
      <section className={`${section} bg-white`} aria-labelledby="showcase-title">
        <SectionHead id="showcase-title" title="Try it now." />
        <p className="mx-auto -mt-6 max-w-[600px] px-4 text-center text-base leading-relaxed text-[#1D4871]/75 md:text-lg">
          Sayso listens to your call and shows what to say next, the local market and your script, without taking your
          eyes off the conversation. Press Start to see it on a sample call.
        </p>
        <HomeLiveDemo />
      </section>
      <HomeReviews logos={false} />
    </>
  );
}
