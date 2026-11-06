/** /download: a short pitch, the Get Sayso button and the Sayso widget mid-call. */
import { DownloadButton } from '@/components/landing/DownloadButton';
import { WidgetFigure } from '@/components/pages/WidgetFigure';
import { eyebrow } from '@/components/landing/HomeShared/styles';

export function DownloadPage() {
  return (
    <main className="min-h-screen bg-[#F4F4F5]">
      <div className="mx-auto max-w-[760px] px-6 pb-10 pt-16 md:pt-24">
        <div className="text-center">
          <span className={eyebrow}>GET STARTED</span>
          <h1 className="mb-4 mt-[18px] font-hero text-[40px] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#10233A] md:text-[56px]">
            Get Sayso
          </h1>
          <p className="mx-auto mb-9 max-w-[560px] text-base leading-relaxed text-[#556B86] md:text-lg">
            Set up Sayso on your computer to get real-time call guidance, automatic call notes,
            and live market data on every prospecting call. The download takes about a minute, and
            you can start your first call right after.
          </p>
          <DownloadButton analyticsId="cta-download-page" />
        </div>
      </div>
      <WidgetFigure
        preset="cues"
        label="The Sayso widget during a call, showing live cues and the LPMAMA letters"
        caption="Sample call: cues update as the prospect talks."
        className="mx-auto w-full max-w-[880px] px-4 pb-20 sm:px-6 md:pb-28"
      />
    </main>
  );
}
