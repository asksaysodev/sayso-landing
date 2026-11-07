/**
 * Class strings shared by the /founderpricing panels. Panels reuse the homepage
 * card style so this page matches the rest of the site.
 */
import { panel } from '../HomeShared/styles';

/** White card, same as the homepage cards. */
export const whitePanel = panel;

/** Navy card with a soft navy shadow (Sayso's column in Compare uses the same look). */
export const navyPanel = 'rounded-[20px] bg-[#1D4871] shadow-[0_18px_40px_-18px_rgba(29,72,113,0.6)]';

/** Section headline on the light background. */
export const heading = 'font-hero font-extrabold tracking-[-0.03em] text-[#10233A] text-[clamp(28px,4vw,40px)] leading-[1.1]';

/** Section headline on a navy panel. */
export const headingOnNavy = 'font-hero font-extrabold tracking-[-0.03em] text-white text-[clamp(28px,4vw,40px)] leading-[1.1]';

/** Small yellow tag. */
export const yellowTag = 'rounded-full bg-[#FFDE59] px-2.5 py-[3px] text-xs font-semibold text-[#1D4871] whitespace-nowrap';
