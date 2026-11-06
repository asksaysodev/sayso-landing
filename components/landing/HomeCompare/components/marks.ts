/** Shared yes / no / partly marks for the Compare cards and table. */
import type { Mark } from '../data';

export const MARK_TEXT: Record<Mark, { icon: string; sr: string }> = {
  y: { icon: '✓', sr: 'Yes' },
  n: { icon: '✕', sr: 'No' },
  p: { icon: '~', sr: 'Partly' },
};

export const markClass = (mark: Mark, us: boolean) => {
  if (mark === 'y') return us ? 'bg-[#22c06d] text-white' : 'bg-[#dcf5e8] text-[#127a45]';
  if (mark === 'n') return 'bg-[#fbe4e2] text-[#b4423c]';
  return 'bg-[#fdf1d6] text-[#9a6a06]';
};
