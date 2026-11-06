/**
 * Small inline SVG icons used inside the widget (search, chevrons, reset,
 * list, check, copy, mouse cursor). Decorative: every one is aria-hidden and
 * the button around it carries the label.
 */

type IconProps = { className?: string };

export function SearchIcon({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

export function ChevronUpIcon({ className }: IconProps) {
  return (
    <svg aria-hidden="true" className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 15l6-6 6 6" />
    </svg>
  );
}

export function ChevronDownIcon() {
  return (
    <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function ResetIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 12a8 8 0 1 1-2.3-5.7" />
      <path d="M20 4v5h-5" />
    </svg>
  );
}

export function ListIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
      <path d="M9 6h11M9 12h11M9 18h11" />
      <circle cx="4.5" cy="6" r="1" fill="#fff" />
      <circle cx="4.5" cy="12" r="1" fill="#fff" />
      <circle cx="4.5" cy="18" r="1" fill="#fff" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.8 2.8L16 10" />
    </svg>
  );
}

export function CopyIcon() {
  return (
    <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M5 15V6a2 2 0 0 1 2-2h8" />
    </svg>
  );
}

export function BoltIcon() {
  return (
    <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="#fff">
      <path d="M13.5 2L4 14h7l-1.5 8L19 10h-7z" />
    </svg>
  );
}

export function CursorIcon({ className, style }: IconProps & { style?: React.CSSProperties }) {
  return (
    <svg aria-hidden="true" className={className} style={style} viewBox="0 0 26 30">
      <path d="M3 2l19 13-8.5 1.6L18 26l-3.6 1.7-4.4-9.5L3 24z" fill="#fff" stroke="#111" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
