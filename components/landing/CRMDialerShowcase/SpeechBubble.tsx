export function SpeechBubble({
  text,
  visible,
  side,
}: {
  text: string;
  visible: boolean;
  side: 'buyer' | 'seller';
}) {
  const isBuyer = side === 'buyer';

  return (
    <div
      className="transition-all duration-500 overflow-hidden"
      style={{
        maxHeight: visible ? '200px' : '0',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
      }}
    >
      <div
        className="relative mt-3 px-4 py-3 rounded-xl text-sm leading-relaxed"
        style={{
          background: isBuyer ? '#fff' : '#EEF4FF',
          color: '#1D4871',
          border: '2px solid #1D4871',
          boxShadow: '3px 3px 0px #1D4871',
          fontWeight: 500,
        }}
      >
        {/* Bubble tail */}
        <div
          className="absolute -top-[9px] w-0 h-0"
          style={{
            left: isBuyer ? '20px' : undefined,
            right: isBuyer ? undefined : '20px',
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderBottom: '9px solid #1D4871',
          }}
        />
        <div
          className="absolute -top-[7px] w-0 h-0"
          style={{
            left: isBuyer ? '21px' : undefined,
            right: isBuyer ? undefined : '21px',
            borderLeft: '7px solid transparent',
            borderRight: '7px solid transparent',
            borderBottom: `8px solid ${isBuyer ? '#fff' : '#EEF4FF'}`,
          }}
        />
        &ldquo;{text}&rdquo;
      </div>
    </div>
  );
}
