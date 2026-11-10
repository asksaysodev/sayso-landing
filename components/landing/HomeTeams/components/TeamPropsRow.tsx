/**
 * The three team value props: a 3-column grid on desktop, and at 960px and
 * below the site's shared carousel (swipe row with prev / next arrows).
 */
import Carousel from '@/components/ui/Carousel';
import { muted, panel } from '../../HomeShared/styles';
import type { TeamValueProp } from '../data';

export function TeamPropsRow({ props }: { props: TeamValueProp[] }) {
  return (
    <Carousel label="Sayso for teams" itemName="card" trackClassName="grid grid-cols-3 gap-5">
      {props.map((prop, i) => (
        <div key={prop.title} className={`${panel} h-full p-6`}>
          <h3 className="flex items-baseline gap-2.5 font-hero text-[18.5px] font-bold leading-[1.3] text-[#10233A]">
            <span aria-hidden="true" className="font-comic text-2xl font-normal text-[#2367EE]">
              {i + 1}
            </span>
            {prop.title}
          </h3>
          <p className={`mt-2 text-[15px] leading-relaxed ${muted}`}>{prop.body}</p>
        </div>
      ))}
    </Carousel>
  );
}
