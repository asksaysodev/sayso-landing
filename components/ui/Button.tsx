import type { ReactNode } from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  /** Opens href in a new tab with rel="noopener noreferrer". Only set this for off-site links. */
  external?: boolean;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
  'data-analytics-id'?: string;
}

/**
 * Pill button: solid blue primary, white secondary with a hairline ring. Flat, soft shadow, no offset borders.
 * Renders a next/link for internal hrefs ("/..."), a new-tab anchor when `external` is set, a plain anchor for
 * any other href (hash, mailto) and a type="button" button otherwise.
 */
export function Button({
  children,
  variant = 'primary',
  onClick,
  className = '',
  href,
  external = false,
  'data-analytics-id': dataAnalyticsId,
}: ButtonProps) {
  const baseStyles =
    'inline-flex h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-6 text-[15px] font-semibold transition duration-150 hover:-translate-y-px active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2';

  const variantStyles = {
    primary:
      'bg-[#2367EE] text-white shadow-button hover:bg-[#1F5AD6]',
    secondary:
      'bg-white text-[#10233A] shadow-card-sm hover:shadow-card-sm-hover',
  };

  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;
  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={classes}
        data-analytics-id={dataAnalyticsId}
      >
        {children}
      </a>
    );
  }

  if (href?.startsWith('/')) {
    return (
      <Link href={href} onClick={onClick} className={classes} data-analytics-id={dataAnalyticsId}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes} data-analytics-id={dataAnalyticsId}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} data-analytics-id={dataAnalyticsId}>
      {children}
    </button>
  );
}
