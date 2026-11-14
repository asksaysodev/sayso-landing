'use client';

/**
 * Hero "See how" button: a navy outline pill that glides down to the
 * comparison section. Reduced-motion users get an instant jump.
 */

import { Button } from '@/components/ui/Button';

export function SeeHowButton() {
  const scroll = () => {
    const target = document.getElementById('compare');
    if (!target) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <Button
      variant="secondary"
      onClick={scroll}
      className="!bg-transparent !shadow-none border-2 border-[#1D4871] !text-[#1D4871] hover:!bg-[#1D4871]/[0.06]"
      data-analytics-id="cta-see-how-differences-hero"
    >
      See how
    </Button>
  );
}
