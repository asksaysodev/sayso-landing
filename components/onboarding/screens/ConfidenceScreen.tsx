'use client';

import Image from 'next/image';

const CONFIDENCE_OPTIONS = [
  { img: '/scared_emoji_no_background.png', size: 51 },
  { img: '/anxious_emoji_no_background.png', size: 45 },
  { img: '/neutral_emoji_no_background.png', size: 54 },
  { img: '/confidence_emoji_no_background.png', size: 45 },
  { img: '/excited_emoji_no_background.png', size: 45 },
];

interface ConfidenceScreenProps {
  value: number | null;
  onChange: (n: number) => void;
  onAutoAdvance: () => void;
}

export function ConfidenceScreen({ value, onChange, onAutoAdvance }: ConfidenceScreenProps) {
  const handleSelect = (n: number) => {
    onChange(n);
    onAutoAdvance();
  };

  return (
    <div className="text-center">
      <h1 className="text-xl md:text-2xl font-bold text-[#1D4871]">
        How confident are you in your agents during live prospecting conversations?
      </h1>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 max-w-lg mx-auto mt-6">
        {CONFIDENCE_OPTIONS.map((option, i) => {
          const n = i + 1;
          const isSelected = value === n;
          return (
            <button
              key={n}
              onClick={() => handleSelect(n)}
              className={`rounded-xl p-3 cursor-pointer text-center transition-all duration-200 border-2 ${
                isSelected
                  ? 'bg-[#2367EE]/5 border-[#2367EE] shadow-md ring-2 ring-[#2367EE]/20'
                  : 'bg-white border-[#D7DEE1] hover:border-[#2367EE] hover:shadow-md'
              } focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2`}
            >
              <span className="block mb-1 flex justify-center">
                <Image
                  src={option.img}
                  alt={String(n)}
                  width={option.size}
                  height={option.size}
                  className="object-contain"
                />
              </span>
              <span className="text-xs font-bold text-[#1D4871]">{n}</span>
            </button>
          );
        })}
      </div>

      <div className="flex justify-between max-w-lg mx-auto mt-3 px-1">
        <span className="text-xs text-[#1D4871]/50 font-medium">Not confident</span>
        <span className="text-xs text-[#1D4871]/50 font-medium">Very confident</span>
      </div>
    </div>
  );
}
