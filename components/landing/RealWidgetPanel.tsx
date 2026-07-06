'use client';

/**
 * The actual Sayso coach widget, rendered exactly as it appears in the app
 * (navy-slate toolbar with the lead-type and zip pills, the market overlay, the
 * live AI suggestion that types in, and the LPMAMA capture row). It uses the
 * same coach colorway the product uses (the --sayso-coach-bg #1d2d40 surface)
 * and holds one solid size so nothing resizes mid-cycle.
 *
 * A small "On a live call" intro sits above it; a quiet "Works with any CRM and
 * dialer" line sits below.
 *
 * This is the real component from CRMDialerShowcase, not a stylised stand-in, so
 * the hero shows visitors the genuine product.
 */
import { SaysoWidget, useSaysoWidget } from '@/components/landing/CRMDialerShowcase';
import { LiveCallIntro } from './LiveCallIntro';

export function RealWidgetPanel() {
  const widget = useSaysoWidget();

  return (
    <div className="mx-auto w-full max-w-[380px]">
      <LiveCallIntro />
      <SaysoWidget
        currentCycle={widget.currentCycle}
        showPrompt={widget.showPrompt}
        timerSeconds={widget.timerSeconds}
        variant="app"
      />
      <p className="mt-3 text-center text-[11px] font-medium text-[#1D4871]/45">
        Works with any CRM and dialer
      </p>
    </div>
  );
}
