import Link from 'next/link';
import { LightningIcon } from '@/components/icons/LightningIcon';

interface ContentCTAProps {
  headline?: string;
  subheading?: string;
}

export function ContentCTA({
  headline = 'Ready to Win the Moment?',
  subheading = 'See how Sayso gives you real-time coaching on every call.',
}: ContentCTAProps) {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-10">
      <div className="bg-[#1D4871] border-2 border-[#1D4871] rounded-2xl v2-comic-shadow overflow-hidden">
        <div className="px-8 py-12 md:py-16 text-center">
          <h2 className="font-comic text-3xl md:text-4xl text-white tracking-wide mb-4">
            {headline}
          </h2>
          <p className="text-base text-white/70 max-w-md mx-auto mb-8 font-sans">
            {subheading}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-transparent text-white font-bold text-base border-2 border-white hover:bg-white/10 transition-colors"
            >
              Book a Demo
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#2367EE] text-white font-bold text-base v4-hero-glow border-2 border-[#1D4871]"
            >
              <LightningIcon size={14} className="mr-1.5" />
              Download Sayso
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
