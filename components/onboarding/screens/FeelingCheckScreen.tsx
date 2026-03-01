'use client';

import Image from 'next/image';

const FEELINGS = [
  { img: '/anxious_emoji_no_background.png', label: 'Anxious', size: 45 },
  { img: '/nervous_emoji_no_background.png', label: 'Nervous', size: 54 },
  { img: '/scared_emoji_no_background.png', label: 'Scared', size: 51 },
  { img: '/excited_emoji_no_background.png', label: 'Excited', size: 45 },
  { img: '/confidence_emoji_no_background.png', label: 'Confident', size: 45 },
];

interface FeelingCheckScreenProps {
  value: string | null;
  onChange: (value: string) => void;
  onAutoAdvance: () => void;
}

export function FeelingCheckScreen({ value, onChange, onAutoAdvance }: FeelingCheckScreenProps) {
  const handleSelect = (label: string) => {
    onChange(label);
    onAutoAdvance();
  };

  return (
    <div className="text-center">
      <h1 className="text-xl md:text-2xl font-bold text-[#1D4871]">
        How do you feel when you think about making calls?
      </h1>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 max-w-lg mx-auto mt-6">
        {FEELINGS.map((feeling) => {
          const isSelected = value === feeling.label;
          return (
            <button
              key={feeling.label}
              onClick={() => handleSelect(feeling.label)}
              className={`rounded-xl p-3 cursor-pointer text-center transition-all duration-200 border-2 ${
                isSelected
                  ? 'bg-[#2367EE]/5 border-[#2367EE] shadow-md ring-2 ring-[#2367EE]/20'
                  : 'bg-white border-[#D7DEE1] hover:border-[#2367EE] hover:shadow-md'
              } focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2`}
            >
              <span className="block mb-1 flex justify-center">
                <Image
                  src={feeling.img}
                  alt={feeling.label}
                  width={feeling.size}
                  height={feeling.size}
                  className="object-contain"
                />
              </span>
              <span className="text-xs font-bold text-[#1D4871]">{feeling.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
