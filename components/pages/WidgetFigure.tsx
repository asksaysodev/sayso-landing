/**
 * A static picture of the real Sayso widget on the soft product backdrop,
 * inside a white card, with a short caption underneath. Used wherever the
 * product, solution, integration and download pages show Sayso. The widget
 * keeps its true proportions through WidgetScaler and never scales above 1.
 */
import SaysoWidget, { WidgetScaler } from '@/components/SaysoWidget';
import { WIDGET_PRESETS, type WidgetPreset } from '@/components/SaysoWidget/data';
import { panel, shot } from '@/components/landing/HomeShared/styles';

/** Rough rendered height of each preset at full size, reserved before the first measurement. */
const PRESET_HEIGHT: Record<WidgetPreset, number> = {
  alert: 90,
  bar: 70,
  cues: 330,
  notes: 330,
  smartCapture: 330,
  pulse: 250,
  playbook: 560,
};

interface WidgetFigureProps {
  preset: WidgetPreset;
  /** Describes the picture for screen readers (the widget itself is decorative). */
  label: string;
  /** Short line under the picture, e.g. "Sample call and market data". */
  caption?: string;
  className?: string;
}

export function WidgetFigure({ preset, label, caption, className = '' }: WidgetFigureProps) {
  return (
    <figure className={className}>
      <div className={`${panel} p-2.5 sm:p-3.5`}>
        <div role="img" aria-label={label} className={`${shot} rounded-[14px] px-3 py-6 sm:px-10 sm:py-10`}>
          <div className="relative mx-auto max-w-[604px]">
            <WidgetScaler width={604} initialHeight={PRESET_HEIGHT[preset] * 0.6}>
              <SaysoWidget {...WIDGET_PRESETS[preset]} />
            </WidgetScaler>
          </div>
        </div>
      </div>
      {caption && <figcaption className="mt-3 text-center text-[13px] text-[#556B86]">{caption}</figcaption>}
    </figure>
  );
}
