/**
 * The real Sayso widget in a persona page step card, on the soft product
 * backdrop: the live toolbar for "Start Sayso" and live cues for "Sayso
 * listens". Replaces the older hand-drawn mockups.
 */
import SaysoWidget, { WidgetScaler } from '@/components/SaysoWidget';
import { WIDGET_PRESETS, type WidgetPreset } from '@/components/SaysoWidget/data';
import { shot } from '@/components/landing/HomeShared/styles';

export function PersonaStepWidget({ preset }: { preset: Extract<WidgetPreset, 'bar' | 'cues'> }) {
  return (
    <div className={`${shot} flex h-full items-center justify-center rounded-xl px-3 py-3`}>
      <WidgetScaler width={604} maxHeight={120}>
        <SaysoWidget {...WIDGET_PRESETS[preset]} />
      </WidgetScaler>
    </div>
  );
}
