/**
 * "Learn more" style internal link pinned to the bottom of a card.
 */

import Link from 'next/link';

type ArrowLinkProps = {
  href: string;
  label: string;
};

export function ArrowLink({ href, label }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className="mt-auto pt-4 font-extrabold text-[15px] text-cta underline-offset-[3px] hover:text-primary"
    >
      {label} →
    </Link>
  );
}
