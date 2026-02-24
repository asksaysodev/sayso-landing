export function HeroStarburst() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg viewBox="0 0 600 600" className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]" fill="none">
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 15) * (Math.PI / 180);
          const innerR = 60;
          const outerR = i % 2 === 0 ? 280 : 200;
          const x1 = 300 + Math.cos(angle) * innerR;
          const y1 = 300 + Math.sin(angle) * innerR;
          const x2 = 300 + Math.cos(angle) * outerR;
          const y2 = 300 + Math.sin(angle) * outerR;
          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#FFDE59"
              strokeWidth={i % 2 === 0 ? 3 : 1.5}
              opacity={i % 2 === 0 ? 0.25 : 0.15}
            />
          );
        })}
      </svg>
    </div>
  );
}
