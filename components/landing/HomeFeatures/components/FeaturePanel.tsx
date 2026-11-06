/**
 * The selected product's panel: its static widget view in a fixed-height
 * frame, then the headline, copy and a link to the product page.
 */
import Link from 'next/link';
import SaysoWidget, { WidgetScaler } from '@/components/SaysoWidget';
import { WIDGET_PRESETS } from '@/components/SaysoWidget/data';
import { shot } from '../../HomeShared/styles';
import type { Feature } from '../data';

export function FeaturePanel({ feature }: { feature: Feature }) {
  return (
    <div
      role="tabpanel"
      id="feature-panel"
      aria-labelledby={`feature-tab-${feature.id}`}
      className="grid min-w-0 animate-[fadeIn_0.3s_ease-out] grid-cols-1 items-center gap-1 p-3 motion-reduce:animate-none min-[641px]:p-5 min-[961px]:h-[396px] min-[961px]:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] min-[961px]:gap-[22px]"
    >
      <div className={`${shot} rounded-2xl px-2 pb-11 pt-4 min-[641px]:px-5 min-[641px]:pb-[58px] min-[641px]:pt-[26px]`}>
        <WidgetScaler width={604} maxHeight={250}>
          <SaysoWidget {...WIDGET_PRESETS[feature.preset]} />
        </WidgetScaler>
      </div>
      <div className="min-h-[178px] px-1 pb-1 pt-3.5 min-[961px]:min-h-0 min-[961px]:p-1.5">
        <h3 className="font-hero text-[22px] font-bold tracking-[-0.02em] text-white min-[961px]:text-[clamp(24px,3vw,30px)]">
          {feature.title}
        </h3>
        <p className="mt-2.5 max-w-[62ch] text-[15px] text-[rgba(244,244,245,0.68)] min-[961px]:text-base">{feature.body}</p>
        <Link
          href={feature.href}
          className="mt-[18px] inline-flex rounded text-[14.5px] font-semibold text-[#8fb3ff] hover:text-white focus:outline-none focus-visible:ring-[3px] focus-visible:ring-[#FFDE59]"
        >
          Learn more about {feature.name} &rarr;
        </Link>
      </div>
    </div>
  );
}
