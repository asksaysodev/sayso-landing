'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { CRMDialerShowcase } from '@/components/landing/CRMDialerShowcase';

function CRMDialerExportContent() {
  const params = useSearchParams();
  const greenScreen = params.get('bg') === 'green';
  const bg = greenScreen ? '#00FF00' : '#f0f2f5';

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        position: 'relative',
        background: bg,
        overflow: 'hidden',
      }}
    >
      <CRMDialerShowcase />
    </div>
  );
}

export default function CRMDialerExportPage() {
  return (
    <Suspense>
      <CRMDialerExportContent />
    </Suspense>
  );
}
