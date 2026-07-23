/**
 * Shared types for the webinar-exclusive offer page ("The Stack" layout).
 */

export interface StackItem {
  /** What you get, shown in bold. */
  name: string;
  /** Supporting description. */
  detail: string;
  /** Standalone value, e.g. "$4,200" or "Included". */
  value: string;
}

export interface Bonus {
  title: string;
  body: string;
}

export interface PriceAnchor {
  label: string;
  value: string;
}

export interface Step {
  title: string;
  body: string;
}
