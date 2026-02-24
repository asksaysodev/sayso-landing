import { SMART_CAPTURE_SIGNALS } from './data';
import { CheckCircleIcon } from './icons';

export function SmartCapturePanel({ visibleSignals }: { visibleSignals: number }) {
  return (
    <div className="showcase-glass-strong rounded-2xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(114,126,137,0.4)] overflow-hidden">
      <div className="px-3 pt-2.5 pb-1.5">
        <span className="text-[11px] font-semibold text-white/60 uppercase tracking-wider">Smart Capture</span>
      </div>
      <div className="px-2 pb-2">
        {SMART_CAPTURE_SIGNALS.map((signal, i) => {
          const isVisible = i < visibleSignals;
          const isNew = i === visibleSignals - 1;
          return (
            <div
              key={signal.label}
              className={`flex items-start gap-2 px-2 py-1.5 rounded-lg transition-all duration-500 ${
                isNew ? 'showcase-signal-enter bg-white/8' : ''
              } ${isVisible ? 'opacity-100' : 'opacity-30'}`}
            >
              <div className={`mt-0.5 flex-shrink-0 transition-all duration-300 ${isVisible ? 'scale-100' : 'scale-75'}`}>
                {isVisible ? (
                  <CheckCircleIcon />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-white/20" />
                )}
              </div>
              <div className="min-w-0">
                <span className={`text-[12px] font-semibold block ${isVisible ? 'text-white/90' : 'text-white/40'}`}>
                  {signal.label}
                </span>
                {isVisible && (
                  <p className="text-[11px] text-white/50 leading-tight mt-0.5 showcase-fade-in">
                    {signal.quote}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
