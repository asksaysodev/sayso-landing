'use client';

import { LeadChipGrid } from './LeadChipGrid';

interface TeamLeadTypeScreenProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function TeamLeadTypeScreen({ value, onChange }: TeamLeadTypeScreenProps) {
  return (
    <LeadChipGrid
      title="What leads do your agents call?"
      value={value}
      onChange={onChange}
    />
  );
}
