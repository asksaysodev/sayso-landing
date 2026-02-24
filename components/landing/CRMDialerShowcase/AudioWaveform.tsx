export function AudioWaveform({ active, color }: { active: boolean; color: string }) {
  return (
    <div className="flex items-center gap-[3px] h-5">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="w-[3px] rounded-full transition-all duration-300"
          style={{
            backgroundColor: color,
            height: active ? undefined : '4px',
            animation: active ? `audioBarDialer 0.${6 + i}s ease-in-out ${i * 0.08}s infinite` : 'none',
            opacity: active ? 1 : 0.3,
          }}
        />
      ))}
    </div>
  );
}
