'use client';

const SELLERS = [
  'Portal (Homelight, etc)',
  'Expireds',
  'FSBOs (For Sale By Owner)',
  'SOI',
  'Open House',
  'Home Value Requests',
  'Social Media',
];

const BUYERS = [
  'Portal Leads (Zillow, Redfin, etc)',
  'Pond Leads',
  'Open House Leads',
  'Social Media',
  'SOI',
];

const ALL_LEADS = [...SELLERS, ...BUYERS];

interface TeamLeadTypeScreenProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function TeamLeadTypeScreen({ value, onChange }: TeamLeadTypeScreenProps) {
  const isAllSelected = value.includes('All of the above');

  const toggleChip = (lead: string) => {
    if (lead === 'All of the above') {
      if (isAllSelected) {
        onChange([]);
      } else {
        onChange(['All of the above', ...ALL_LEADS]);
      }
      return;
    }

    // If "All of the above" was selected, deselect it when picking individual
    const withoutAll = value.filter((v) => v !== 'All of the above');
    if (withoutAll.includes(lead)) {
      onChange(withoutAll.filter((v) => v !== lead));
    } else {
      onChange([...withoutAll, lead]);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-xl md:text-2xl font-bold text-[#1D4871]">
        What leads do your agents call?
      </h1>

      <div className="max-w-lg mx-auto mt-6 flex flex-col gap-4 text-left">
        {/* Sellers */}
        <div>
          <p className="text-base font-bold text-[#1D4871] px-1 py-2">Sellers</p>
          <div className="flex flex-wrap gap-2">
            {SELLERS.map((lead) => {
              const isSelected = isAllSelected || value.includes(lead);
              return (
                <button
                  key={lead}
                  onClick={() => toggleChip(lead)}
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold cursor-pointer transition-all duration-200 border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2 ${
                    isSelected
                      ? 'bg-[#2367EE] border-[#2367EE] text-white'
                      : 'bg-white border-[#D7DEE1] text-[#1D4871] hover:border-[#2367EE] hover:bg-[#2367EE]/5'
                  }`}
                >
                  {lead}
                </button>
              );
            })}
          </div>
        </div>

        {/* Buyers */}
        <div>
          <p className="text-base font-bold text-[#1D4871] px-1 py-2">Buyers</p>
          <div className="flex flex-wrap gap-2">
            {BUYERS.map((lead) => {
              const isSelected = isAllSelected || value.includes(lead);
              return (
                <button
                  key={lead}
                  onClick={() => toggleChip(lead)}
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold cursor-pointer transition-all duration-200 border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2 ${
                    isSelected
                      ? 'bg-[#2367EE] border-[#2367EE] text-white'
                      : 'bg-white border-[#D7DEE1] text-[#1D4871] hover:border-[#2367EE] hover:bg-[#2367EE]/5'
                  }`}
                >
                  {lead}
                </button>
              );
            })}
          </div>
        </div>

        {/* All of the above */}
        <div className="pt-1 border-t border-[#D7DEE1]">
          <button
            onClick={() => toggleChip('All of the above')}
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold cursor-pointer transition-all duration-200 border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2 ${
              isAllSelected
                ? 'bg-[#2367EE] border-[#2367EE] text-white'
                : 'bg-white border-[#D7DEE1] text-[#1D4871] hover:border-[#2367EE] hover:bg-[#2367EE]/5'
            }`}
          >
            All of the above
          </button>
        </div>
      </div>
    </div>
  );
}
