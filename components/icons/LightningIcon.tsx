interface LightningIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function LightningIcon({ size = 16, color = 'currentColor', className }: LightningIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" fill="none" className={className}>
      <path
        d="M294.4 25.6L115.2 281.6H256L217.6 486.4L396.8 230.4H256L294.4 25.6Z"
        fill={color}
        stroke={color}
        strokeWidth="20"
      />
    </svg>
  );
}
