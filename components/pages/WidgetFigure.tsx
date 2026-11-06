/**
 * A static picture of the real Sayso widget on the soft product backdrop,
 * inside a white card, with a short caption underneath. Used wherever the
 * product, solution, integration and download pages show Sayso. The widget
 * keeps its true proportions through WidgetScaler and never scales above 1.
 */
import SaysoWidget, { WidgetScaler } from '@/components/SaysoWidget';
import { WIDGET_PRESETS, type WidgetPreset } from '@/components/SaysoWidget/data';
import { panel, shot } from '@/components/landing/HomeShared/styles';

/** Rendered height of each preset at full size (measured), used to reserve space before the first measurement. */
const PRESET_HEIGHT: Record<WidgetPreset, number> = {
  alert: 90,
  bar: 58,
  cues: 264,
  notes: 199,
  smartCapture: 199,
  pulse: 153,
  playbook: 410,
};

/** Presets that show a note bubble, which hangs below the widget and needs extra room. */
const NOTE_PRESETS: WidgetPreset[] = ['notes', 'smartCapture'];

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
        <div
          role="img"
          aria-label={label}
          className={`${shot} rounded-[14px] px-3 py-6 sm:px-10 sm:py-10 ${NOTE_PRESETS.includes(preset) ? 'pb-12 sm:pb-16' : ''}`}
        >
          <div className="relative mx-auto max-w-[604px]">
            {/* Before the first measurement the frame keeps the widget's aspect ratio at the real container width, so nothing shifts. */}
            <WidgetScaler width={604} initialHeight="auto" style={{ aspectRatio: `604 / ${PRESET_HEIGHT[preset]}` }}>
              <SaysoWidget {...WIDGET_PRESETS[preset]} />
            </WidgetScaler>
          </div>
        </div>
      </div>
      {caption && <figcaption className="mt-3 text-center text-[13px] text-[#556B86]">{caption}</figcaption>}
    </figure>
  );
}
