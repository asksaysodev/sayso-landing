/**
 * Shared types for the webinar-exclusive offer page.
 */

export interface OfferLineItem {
  /** What the attendee is getting. */
  name: string;
  /** Optional supporting detail shown under the name. */
  detail?: string;
  /**
   * Dollar value counted toward the total. Use null for non-priced items
   * (like the guarantee) that should not add to the value total.
   */
  value: number | null;
  /** Text shown on the right when value is null (e.g. "Risk: $0"). */
  displayValue?: string;
}
