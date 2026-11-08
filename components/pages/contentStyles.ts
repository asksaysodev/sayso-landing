/**
 * Shared Tailwind class strings for the product, solution and Why Sayso
 * pages, matching the flat redesign: Manrope 800 headings, white cards with a
 * hairline ring and soft shadow, and the 800px reading column.
 */

/** 800px reading column used by the content templates. */
export const column = 'mx-auto w-full max-w-[800px] px-6';

/** Section H2. */
export const h2 = 'font-hero text-2xl font-extrabold leading-tight tracking-[-0.02em] text-[#10233A] md:text-[28px]';

/** Smaller H2 for link lists (related products, blog). */
export const h2Small = 'font-hero text-xl font-extrabold tracking-[-0.02em] text-[#10233A]';

/** Body paragraph. */
export const body = 'font-sans text-base leading-relaxed text-[#1D4871]/80';

/** Soft card shadow with a hairline ring. */
const cardShadow = 'shadow-card';

/** White card. */
export const card = `rounded-2xl bg-white p-5 ${cardShadow}`;

/** White card that links somewhere: the shadow deepens on hover. */
export const linkCard = `${card} block transition-shadow hover:shadow-card-hover`;

/** Inline text link. */
export const textLink = 'font-sans text-[#2367EE] hover:underline';

/** Agent quote: yellow left rule on a white card. */
export const quote = `rounded-r-2xl border-l-4 border-[#FFDE59] bg-white px-6 py-4 ${cardShadow}`;
