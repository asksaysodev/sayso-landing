import Link from 'next/link';
import Image from 'next/image';
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext';
import { HomeLiveDemo } from '@/components/landing/HomeLiveDemo';
import { BookCallButton, SocialFooter } from '@/components/landing/SocialLinksPage';
import { buildMetadata } from '@/lib/seo/metadata';

// The interactive demo on its own, opened from /social. Not indexed.
export const metadata = buildMetadata({
  title: 'Interactive demo',
  description: 'See Sayso coach a live call in your browser, then book a demo with the Sayso team.',
  path: '/social/demo',
  noindex: true,
});

export default function SocialDemoPage() {
  return (
    <DemoCalendarProvider>
      <div className="min-h-[100svh] bg-[#F4F4F5]">
        <div className="mx-auto max-w-[440px] px-5 pt-8 text-center">
          <Link href="/social" aria-label="Back to Sayso links" className="inline-block">
            <Image src="/logos/logo-pos-transparent-horizontal.png" alt="Sayso" width={100} height={32} priority className="h-8 w-auto" />
          </Link>
          <h1 className="mt-4 font-hero text-[28px] font-extrabold leading-tight tracking-[-0.02em] text-[#10233A]">
            See Sayso coach a call
          </h1>
        </div>
        <HomeLiveDemo />
        <div className="mx-auto flex max-w-[440px] flex-col px-5 pb-8">
          <div className="mt-6">
            <BookCallButton location="social-demo" />
          </div>
          <Link href="/social" className="mt-4 text-center text-sm font-semibold text-[#2367EE] hover:underline">
            Back to links
          </Link>
          <SocialFooter />
        </div>
      </div>
    </DemoCalendarProvider>
  );
}
