/** /download: a short pitch, the Get Sayso button and the Sayso widget mid-call. */
import { DownloadButton } from '@/components/landing/DownloadButton';
import { WidgetFigure } from '@/components/pages/WidgetFigure';
import { eyebrow } from '@/components/landing/HomeShared/styles';
import { PageHeader } from '@/components/pages/PageHeader';

export function DownloadPage() {
  return (
    <main className="min-h-screen bg-[#F4F4F5]">
      <PageHeader
        standalone
        eyebrow={<span className={eyebrow}>GET STARTED</span>}
        title="Get Sayso"
        intro="Set up Sayso on your computer to get real-time call guidance, automatic call notes, and live market data on every prospecting call. The download takes about a minute, and you can start your first call right after."
      >
        <DownloadButton analyticsId="cta-download-page" />
      </PageHeader>
      <WidgetFigure
        preset="cues"
        label="The Sayso widget during a call, showing live cues and the LPMAMA letters"
        caption="Sample call: cues update as the prospect talks."
        className="mx-auto w-full max-w-[880px] px-4 pb-20 sm:px-6 md:pb-28"
      />
    </main>
  );
}
