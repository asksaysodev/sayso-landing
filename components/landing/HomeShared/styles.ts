/**
 * Shared Tailwind class strings for the homepage sections, so every section
 * uses the same container, spacing, panel and label treatment.
 */

/** Centered page column, 1160px max with a 16px gutter. */
export const wrap = 'mx-auto w-full max-w-[1160px] px-4';

/** Vertical rhythm for a homepage section; scroll margin clears the sticky navbar. */
export const section = 'scroll-mt-20 py-[68px] min-[641px]:py-24';

/** Light blue-gray section background with the faint halftone dots. */
export const wash =
  "relative isolate bg-[#E3E8EC] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle,#1D4871_0.6px,transparent_0.7px)] before:bg-[length:12px_12px] before:opacity-[0.06] before:content-['']";

/** Soft panel shadow used by cards. */
export const panelShadow = 'shadow-[0_1px_2px_rgba(16,35,58,0.06),0_14px_34px_-16px_rgba(16,35,58,0.25)]';

/** White card with a hairline border and soft shadow. */
export const panel = `rounded-[20px] border border-[rgba(16,35,58,0.12)] bg-white ${panelShadow}`;

/** Yellow Bangers section label. */
export const eyebrow =
  'inline-block rounded-md border border-[rgba(16,35,58,0.14)] bg-[#FFDE59] px-3 py-0.5 font-comic text-[20px] tracking-[0.07em] text-[#1D4871]';

/** Muted second half of a headline. #6b7f99 keeps 3:1 contrast for large text on #F4F4F5 (3.7:1) and the wash (3.3:1). */
export const soft = 'text-[#6b7f99]';

/** Muted body text. */
export const muted = 'text-[#556B86]';

/** Focus ring for custom links and buttons. */
export const focusRing = 'focus:outline-none focus-visible:ring-[3px] focus-visible:ring-[#2367EE] focus-visible:ring-offset-2';

/** Soft blue-to-cream backdrop with fine dots, behind static widget pictures. */
export const shot =
  "relative overflow-hidden bg-[radial-gradient(500px_260px_at_90%_-10%,#d3e6ff_0,transparent_60%),linear-gradient(135deg,#e9eff7,#f5f0e6)] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle,#1D4871_0.8px,transparent_0.9px)] before:bg-[length:10px_10px] before:opacity-[0.07] before:content-['']";
