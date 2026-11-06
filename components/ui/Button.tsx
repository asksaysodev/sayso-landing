import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary';
  /** Adds the round white arrow badge used on primary CTAs. */
  withArrow?: boolean;
  onClick?: () => void;
  className?: string;
  'data-analytics-id'?: string;
}

/** Pill button: solid blue primary, white secondary with a hairline ring. Flat, soft shadow, no offset borders. */
export function Button({
  children,
  variant = 'primary',
  withArrow = false,
  onClick,
  className = '',
  href,
  'data-analytics-id': dataAnalyticsId,
}: ButtonProps) {
  const baseStyles =
    'inline-flex h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-6 text-[15px] font-semibold transition duration-150 hover:-translate-y-px active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2';

  const variantStyles = {
    primary:
      'bg-[#2367EE] text-white shadow-[0_1px_2px_rgba(16,35,58,0.18),0_8px_20px_-8px_rgba(35,103,238,0.55)] hover:bg-[#1F5AD6]',
    secondary:
      'bg-white text-[#10233A] shadow-[0_0_0_1px_rgba(16,35,58,0.12),0_1px_2px_rgba(16,35,58,0.06)] hover:shadow-[0_0_0_1px_rgba(16,35,58,0.22),0_4px_12px_-4px_rgba(16,35,58,0.15)]',
  };

  const arrowPad = withArrow && variant === 'primary' ? 'pr-1.5' : '';
  const classes = `${baseStyles} ${variantStyles[variant]} ${arrowPad} ${className}`;
  const content = (
    <>
      {children}
      {withArrow && (
        <span
          aria-hidden="true"
          className={`grid h-[34px] w-[34px] place-items-center rounded-full ${
            variant === 'primary' ? 'bg-white text-[#2367EE]' : 'bg-[#2367EE] text-white'
          }`}
        >
          &rarr;
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} data-analytics-id={dataAnalyticsId}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes} data-analytics-id={dataAnalyticsId}>
      {content}
    </button>
  );
}
