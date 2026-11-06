/** A small heading over a list of links (related features, objection scripts, blog posts). */
import type { ReactNode } from 'react';
import Link from 'next/link';
import { h2Small, textLink } from '@/components/pages/contentStyles';

interface LinkListProps {
  heading: string;
  links: { title: string; href: string }[];
  /** Bold link text, used for the related features list. */
  bold?: boolean;
  /** Extra list item after the links, e.g. a "See all" link. */
  footer?: ReactNode;
}

export function LinkList({ heading, links, bold = false, footer }: LinkListProps) {
  return (
    <>
      <h2 className={`${h2Small} mb-3 mt-6`}>{heading}</h2>
      <ul className="mb-6 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={`${textLink} ${bold ? 'font-bold' : ''}`}>
              {link.title}
            </Link>
          </li>
        ))}
        {footer && <li>{footer}</li>}
      </ul>
    </>
  );
}
