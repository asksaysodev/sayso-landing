import Link from 'next/link';
import { LightningIcon } from '@/components/icons/LightningIcon';

export function BlogInArticleCTA() {
  return (
    <div className="my-10 bg-gradient-to-r from-[#1D4871] to-[#2367EE] rounded-2xl border-2 border-[#1D4871] v2-comic-shadow overflow-hidden">
      <div className="px-8 py-10 text-center">
        <h3 className="font-hero text-xl md:text-2xl text-white mb-3">
          Ready to Win the Moment?
        </h3>
        <p className="text-sm text-white/70 max-w-md mx-auto mb-6 font-sans">
          See how Sayso gives your team real-time coaching on every call.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/#demo"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-[#1D4871] font-bold text-sm border-2 border-white hover:bg-[#FFDE59] hover:border-[#FFDE59] transition-colors"
          >
            Book a Demo
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-transparent text-white font-bold text-sm border-2 border-white/50 hover:border-white hover:bg-white/10 transition-colors"
          >
            <LightningIcon size={14} className="mr-1.5" />
            Download Sayso
          </Link>
        </div>
      </div>
    </div>
  );
}
