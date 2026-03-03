'use client';

import { LeadChipGrid } from './LeadChipGrid';

interface LeadTypeScreenProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function LeadTypeScreen({ value, onChange }: LeadTypeScreenProps) {
  return (
    <LeadChipGrid
      title="What types of calls do you make consistently?"
      value={value}
      onChange={onChange}
    />
  );
}
