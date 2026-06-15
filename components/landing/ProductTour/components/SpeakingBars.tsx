/**
 * Animated audio bars that pulse while someone is speaking. Sits next to the
 * call timer in the Follow Up Boss call bar so it is obvious who is talking.
 * Purely a demo affordance; the bars animate via CSS keyframes when `active`.
 */
interface SpeakingBarsProps {
  active: boolean;
  /** Tailwind color class for the bars, e.g. "bg-emerald-400". */
  colorClass?: string;
}

const BAR_DELAYS = ['0ms', '120ms', '240ms', '360ms', '180ms'];

export function SpeakingBars({ active, colorClass = 'bg-emerald-300' }: SpeakingBarsProps) {
  return (
    <span className="flex h-3.5 items-end gap-[2px]" aria-hidden="true">
      {BAR_DELAYS.map((delay, i) => (
        <span
          key={i}
          className={`w-[2.5px] rounded-full ${colorClass} ${
            active ? 'pt-speaking-bar' : 'h-[3px] opacity-40'
          }`}
          style={active ? { animationDelay: delay } : undefined}
        />
      ))}
    </span>
  );
}
