'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { ProductShowcaseVideo } from '@/components/landing/ProductShowcaseSection/ProductShowcaseVideo';
import { useShowcaseState } from '@/components/landing/ProductShowcaseSection/hooks/useShowcaseState';

function ProductShowcaseExportContent() {
  const params = useSearchParams();
  const greenScreen = params.get('bg') === 'green';
  const bg = greenScreen ? '#00FF00' : '#0d1b2a';

  const { timerSeconds, cycleKey, currentSuggestion, visibleSignals } =
    useShowcaseState();

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <div style={{ width: 1200 }}>
        <ProductShowcaseVideo
          timerSeconds={timerSeconds}
          cycleKey={cycleKey}
          currentSuggestion={currentSuggestion}
          visibleSignals={visibleSignals}
        />
      </div>
    </div>
  );
}

export default function ProductShowcaseExportPage() {
  return (
    <Suspense>
      <ProductShowcaseExportContent />
    </Suspense>
  );
}
