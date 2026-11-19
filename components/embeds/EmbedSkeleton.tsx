/**
 * EmbedSkeleton
 *
 * Brand placeholder shown while a third-party embed (Calendly, beehiiv, Sure
 * Send form) loads: a white card with a 16px radius, the site's soft card
 * shadow and grey shimmer bars. `compact` lays two bars side by side for slim
 * one-line embeds such as the beehiiv email field and button.
 */

interface EmbedSkeletonProps {
  className?: string;
  compact?: boolean;
}

export function EmbedSkeleton({ className = '', compact = false }: EmbedSkeletonProps) {
  if (compact) {
    return (
      <div aria-hidden="true" className={`flex items-center gap-2 rounded-2xl bg-white px-3 shadow-card ${className}`}>
        <div className="embed-shimmer h-5 flex-1 rounded-full" />
        <div className="embed-shimmer h-5 w-24 rounded-full" />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className={`rounded-2xl bg-white p-6 shadow-card md:p-8 ${className}`}>
      <div className="embed-shimmer h-5 w-2/5 rounded-full" />
      <div className="embed-shimmer mt-5 h-11 w-full rounded-xl" />
      <div className="embed-shimmer mt-5 h-11 w-3/4 rounded-xl" />
    </div>
  );
}
