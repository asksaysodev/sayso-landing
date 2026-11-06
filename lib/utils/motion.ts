/** True when the visitor asked the OS for reduced motion. Safe to call on the server (returns false). */
export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
