/** The gray picture box at the top of a Made to fit card: partner logos, pills, the widget toolbar or a big label. */
import Image from 'next/image';
import SaysoWidget, { WidgetScaler } from '@/components/SaysoWidget';
import { WIDGET_PRESETS } from '@/components/SaysoWidget/data';
import type { FitArt as FitArtData } from '../data';

export function FitArt({ art }: { art: FitArtData }) {
  return (
    <div className="grid h-[120px] place-items-center overflow-hidden rounded-[10px] bg-[#F4F4F5]">
      {art.kind === 'logos' && (
        <div className="flex items-center justify-center gap-[22px]">
          {art.logos.map((logo) => (
            <Image
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              sizes="160px"
              className="h-auto max-h-9 w-auto max-w-[40%]"
            />
          ))}
        </div>
      )}
      {art.kind === 'pills' && (
        <ul className="flex flex-wrap justify-center gap-2 px-3">
          {art.items.map((item) => (
            <li
              key={item}
              className={`rounded-full border-[1.5px] border-[rgba(29,72,113,0.14)] bg-white font-semibold text-[#1D4871] ${
                art.small ? 'px-2.5 py-1 text-xs' : 'px-3 py-[5px] text-[13px]'
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      {art.kind === 'widget' && (
        <WidgetScaler width={604} initialHeight={53} style={{ width: '92%' }}>
          <SaysoWidget {...WIDGET_PRESETS.bar} />
        </WidgetScaler>
      )}
      {art.kind === 'big' && (
        <span className="font-comic text-[56px] leading-none tracking-[0.04em] text-[#1D4871]">{art.text}</span>
      )}
    </div>
  );
}
