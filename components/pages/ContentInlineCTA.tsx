import Link from 'next/link';
import { LightningIcon } from '@/components/icons/LightningIcon';

interface ContentInlineCTAProps {
  headline?: string;
  subheading?: string;
}

export function ContentInlineCTA({
  headline = 'See It in Action',
  subheading = 'Sayso coaches you through moments like this — in real time, on every call.',
}: ContentInlineCTAProps) {
  return (
    <div className="my-10 bg-[#FFDE59]/10 border-2 border-[#1D4871] rounded-2xl v2-comic-shadow-sm overflow-hidden">
      <div className="px-8 py-8 text-center">
        <h3 className="font-hero text-xl md:text-2xl text-[#1D4871] mb-2">
          {headline}
        </h3>
        <p className="text-sm text-[#1D4871]/70 max-w-md mx-auto mb-5 font-sans">
          {subheading}
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/demo"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#1D4871] text-white font-bold text-sm border-2 border-[#1D4871] hover:bg-[#2367EE] hover:border-[#2367EE] transition-colors"
          >
            Book a Demo
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-transparent text-[#1D4871] font-bold text-sm border-2 border-[#1D4871]/30 hover:border-[#1D4871] transition-colors"
          >
            <LightningIcon size={14} className="mr-1.5" />
            Download Sayso
          </Link>
        </div>
      </div>
    </div>
  );
}
