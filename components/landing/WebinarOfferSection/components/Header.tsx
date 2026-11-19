/**
 * Minimal branded header for the webinar offer page. Just the Sayso logo and a
 * "Webinar Exclusive" badge. There are intentionally no nav links: this is a
 * focused conversion page and we don't want to give people a way to wander off.
 */

import Image from 'next/image';
import { pill } from '@/components/landing/HomeShared/styles';

export function Header() {
  return (
    <header className="w-full border-b border-[#1D4871]/10 bg-white/70 backdrop-blur-sm">
      <div className="max-w-[1000px] mx-auto px-5 md:px-6 h-16 flex items-center justify-between">
        <Image
          src="/logos/logo-pos-horizontal.png"
          alt="Sayso"
          width={90}
          height={32}
          priority
        />
        <span className={pill}>
          Webinar Exclusive
        </span>
      </div>
    </header>
  );
}
