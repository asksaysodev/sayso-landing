/** One How it works card: a static widget picture over a numbered headline. */
import SaysoWidget, { WidgetScaler } from '@/components/SaysoWidget';
import { WIDGET_PRESETS, type WidgetPreset } from '@/components/SaysoWidget/data';
import { panel, shot } from '../../HomeShared/styles';

interface HowCardProps {
  number: number;
  title: string;
  preset: WidgetPreset;
}

export function HowCard({ number, title, preset }: HowCardProps) {
  return (
    <article className={`${panel} flex flex-col p-3.5`}>
      <div className={`${shot} flex min-h-[210px] items-center rounded-[14px] px-2.5 pb-10 pt-4`}>
        <WidgetScaler width={604} initialHeight={120}>
          <SaysoWidget {...WIDGET_PRESETS[preset]} />
        </WidgetScaler>
      </div>
      <h3 className="mx-1.5 mb-1.5 mt-4 flex items-baseline gap-2.5 font-hero text-[18.5px] font-bold leading-[1.3] text-[#10233A]">
        <span aria-hidden="true" className="font-comic text-2xl font-normal text-[#2367EE]">
          {number}
        </span>
        {title}
      </h3>
    </article>
  );
}
