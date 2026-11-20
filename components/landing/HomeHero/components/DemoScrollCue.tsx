/** Small scroll cue at the foot of the hero that jumps to the guided demo right below it. */
import { focusRing } from '../../HomeShared/styles';

export function DemoScrollCue() {
  return (
    <a
      href="#demo"
      data-analytics-id="cta-try-demo-hero"
      className={`mt-6 inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[13px] font-semibold text-[#2367EE] hover:text-[#1F5AD6] ${focusRing}`}
    >
      Try the interactive demo <span aria-hidden="true">&darr;</span>
    </a>
  );
}
