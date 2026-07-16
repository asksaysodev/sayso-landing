/**
 * Shared types for the webinar-exclusive offer page.
 */

export interface OfferItem {
  /** The product or bonus name, shown in bold. */
  name: string;
  /** Optional supporting line shown after the name. */
  detail?: string;
}

export interface OfferColumn {
  /** Card heading (e.g. "The full Sayso platform, 12 months"). */
  label: string;
  /** Light card sits on white, dark card sits on navy. */
  variant: 'light' | 'dark';
  /** Combined dollar value of this column, shown as a pill and summed for totals. */
  value: number;
  items: OfferItem[];
}
