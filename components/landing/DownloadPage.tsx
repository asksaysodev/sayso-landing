import { DownloadButton } from '@/components/landing/DownloadButton';

export function DownloadPage() {
  return (
    <main className="bg-[#F4F4F5] min-h-screen">
      <div className="max-w-[760px] mx-auto px-6 py-20 md:py-28">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest text-[#1D4871]/60 mb-3">
            Get Started
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1D4871] leading-tight mb-4">
            Download Sayso
          </h1>
          <p className="text-base md:text-lg text-[#1D4871]/80 leading-relaxed max-w-[560px] mx-auto mb-10">
            Set up Sayso on your computer to get real-time call coaching, automatic call notes,
            and live market data on every prospecting call. The download takes about a minute, and
            you can start your first call right after.
          </p>
          <DownloadButton analyticsId="cta-download-page" />
        </div>
      </div>
    </main>
  );
}
