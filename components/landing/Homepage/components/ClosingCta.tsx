/**
 * Closing navy band with the final CTAs and links for visitors who want more context.
 */

import Link from 'next/link';
import { HomepageCtas } from './HomepageCtas';

export function ClosingCta() {
  return (
    <section id="get-sayso" className="bg-primary py-16 md:py-24 text-white">
      <div className="max-w-[860px] mx-auto px-4 md:px-6 text-center">
        <h2 className="font-comic text-3xl md:text-4xl lg:text-5xl tracking-wide text-balance">
          Put a Sales Leader on Every Call
        </h2>
        <p className="max-w-[64ch] mx-auto mt-5 mb-8 text-lg md:text-xl text-white/80 text-balance">
          Get Sayso and start your next prospecting session with live guidance on every call. Leading a
          team? Book a demo and we&apos;ll show you how Sayso works across your agents.
        </p>
        <HomepageCtas placement="closing" />
        <p className="mt-5 text-white/80 text-balance">
          Questions first? Read{' '}
          <Link href="/why-sayso" className="whitespace-nowrap text-accent underline underline-offset-[3px]">
            why agents choose Sayso
          </Link>{' '}
          or see{' '}
          <Link href="/differences" className="whitespace-nowrap text-accent underline underline-offset-[3px]">
            how Sayso compares
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
