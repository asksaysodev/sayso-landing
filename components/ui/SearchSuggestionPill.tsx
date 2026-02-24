import { LightningIcon } from '@/components/icons/LightningIcon';

export function SearchSuggestionPill() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F4F4F5] border border-gray-200/60 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <LightningIcon size={16} color="#2367EE" className="flex-shrink-0" />
      {/* "sayso" text */}
      <span className="text-sm font-semibold text-[#1D4871] lowercase">sayso</span>
    </div>
  );
}
