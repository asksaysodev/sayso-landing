export function ParticipantAvatar({
  initials,
  color,
  speaking,
  ringColor,
}: {
  initials: string;
  color: string;
  speaking: boolean;
  ringColor: string;
}) {
  return (
    <div className="relative">
      {/* Speaking ring */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-500"
        style={{
          transform: speaking ? 'scale(1.18)' : 'scale(1)',
          background: speaking ? ringColor : 'transparent',
          opacity: speaking ? 0.35 : 0,
          filter: speaking ? 'blur(6px)' : 'none',
        }}
      />
      <div
        className="relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 transition-all duration-300"
        style={{
          background: color,
          borderColor: speaking ? ringColor : 'rgba(255,255,255,0.15)',
          boxShadow: speaking ? `0 0 20px ${ringColor}40` : 'none',
        }}
      >
        <span className="text-white text-lg md:text-xl font-bold">{initials}</span>
      </div>
    </div>
  );
}
