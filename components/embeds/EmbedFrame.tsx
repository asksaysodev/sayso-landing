/**
 * EmbedFrame
 *
 * Reserves space for a third-party embed so the page does not jump when it
 * loads. Until `loaded` is true the box keeps `reserveClassName` (min-height
 * classes set to the embed's measured loaded height at each breakpoint) and an
 * EmbedSkeleton covers the embed, which renders underneath and keeps loading.
 * Once loaded the skeleton is removed and the reserve is dropped, so a later
 * height change (a success message after submit) is not padded out.
 */

import { EmbedSkeleton } from './EmbedSkeleton';

interface EmbedFrameProps {
  loaded: boolean;
  /** Tailwind min-height classes, e.g. "min-h-[772px] sm:min-h-[704px]". */
  reserveClassName?: string;
  className?: string;
  compactSkeleton?: boolean;
  children: React.ReactNode;
}

export function EmbedFrame({
  loaded,
  reserveClassName = '',
  className = '',
  compactSkeleton = false,
  children,
}: EmbedFrameProps) {
  return (
    <div className={`relative ${loaded ? '' : reserveClassName} ${className}`} aria-busy={!loaded}>
      {children}
      {!loaded && <EmbedSkeleton compact={compactSkeleton} className="absolute inset-0 z-[1]" />}
    </div>
  );
}
