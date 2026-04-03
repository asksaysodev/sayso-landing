'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import {
  StepVisualStartSayso,
  StepVisualPrompts,
  StepVisualBooked,
} from '@/components/landing/ThreeStepsSection/StepVisuals';

function ThreeStepsExportContent() {
  const params = useSearchParams();
  const greenScreen = params.get('bg') === 'green';
  const bg = greenScreen ? '#00FF00' : 'transparent';

  return (
    <div
      style={{ background: bg, padding: 40 }}
      className="min-h-screen flex flex-col items-center gap-10"
    >
      <div
        data-export-id="step-start"
        style={{ width: 560, height: 420 }}
      >
        <StepVisualStartSayso />
      </div>

      <div
        data-export-id="step-prompts"
        style={{ width: 560, height: 420 }}
      >
        <StepVisualPrompts />
      </div>

      <div
        data-export-id="step-booked"
        style={{ width: 560, height: 420 }}
      >
        <StepVisualBooked />
      </div>
    </div>
  );
}

export default function ThreeStepsExportPage() {
  return (
    <Suspense>
      <ThreeStepsExportContent />
    </Suspense>
  );
}
