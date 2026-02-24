import { SparkleIcon } from './icons';

export function ActionBar() {
  return (
    <div className="flex items-center gap-2">
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2367EE] text-white text-[12px] font-semibold shadow-[0_4px_12px_rgba(35,103,238,0.4)] showcase-glow-pulse">
        <SparkleIcon />
        What should I say?
      </button>
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/80 text-[12px]">
        Follow-up questions
      </button>
    </div>
  );
}
