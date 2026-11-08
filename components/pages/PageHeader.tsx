import type { ReactNode } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

interface PageHeaderProps {
  /** Breadcrumb trail. Omit to render the header without a breadcrumb row. */
  breadcrumbs?: { label: string; href?: string }[];
  title: ReactNode;
  /** Small label above the H1 (badge, category). */
  eyebrow?: ReactNode;
  /** Centered intro paragraph under the H1. */
  intro?: ReactNode;
  /** Extra centered content under the intro (search box, meta row, buttons). */
  children?: ReactNode;
  /** Extra classes on the H1 (rarely needed). */
  titleClassName?: string;
  /**
   * Page sits straight under the navbar with no breadcrumb row and no layout
   * padding (About, Careers, legal, form and confirmation pages). Reserves the
   * same space so the header lands where it does on breadcrumb pages.
   */
  standalone?: boolean;
}

/**
 * Navbar-to-header offset on pages without a breadcrumb row. Matches the
 * content layout: main pt-6 + breadcrumb pt-6 + 20px breadcrumb line + header pt-6.
 */
export const standaloneTopClass = 'pt-[92px]';

/** Page H1 scale shared by every content and resource page. */
const pageTitleClass =
  'font-hero text-[34px] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#10233A] md:text-5xl';

/** Intro paragraph under the H1. */
const pageIntroClass = 'font-sans text-lg leading-relaxed text-[#1D4871]/80';

/**
 * The one header used by content and resource pages: breadcrumb row at the
 * page container, then a centered H1 and intro in a 760px column. Spacing
 * from breadcrumb to H1 lives here so every page matches.
 */
export function PageHeader({
  breadcrumbs,
  title,
  eyebrow,
  intro,
  children,
  titleClassName = '',
  standalone = false,
}: PageHeaderProps) {
  return (
    <>
      {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumb items={breadcrumbs} />}
      <header className={`mx-auto w-full max-w-[1200px] px-6 pb-8 md:pb-10 ${standalone ? standaloneTopClass : 'pt-6'}`}>
        <div className="mx-auto max-w-[760px] text-center">
          {eyebrow && <div className="mb-4">{eyebrow}</div>}
          <h1 className={`${pageTitleClass} ${titleClassName}`.trim()}>{title}</h1>
          {intro &&
            (typeof intro === 'string' ? (
              <p className={`mt-4 ${pageIntroClass}`}>{intro}</p>
            ) : (
              <div className={`mt-4 ${pageIntroClass}`}>{intro}</div>
            ))}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </header>
    </>
  );
}
