import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  'data-analytics-id'?: string;
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  href,
  'data-analytics-id': dataAnalyticsId,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm md:text-base font-semibold transition-all duration-200';

  const variantStyles = {
    primary: 'bg-[#2367EE] text-white shadow-sm hover:bg-[#1F5FE0] hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2',
    secondary: 'border border-[#1D4871]/20 bg-transparent text-[#1D4871] hover:bg-[#1D4871]/5 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2367EE] focus-visible:ring-offset-2',
  };

  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} data-analytics-id={dataAnalyticsId}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} data-analytics-id={dataAnalyticsId}>
      {children}
    </button>
  );
}
