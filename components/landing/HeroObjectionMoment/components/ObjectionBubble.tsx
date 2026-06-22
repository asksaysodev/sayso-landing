/**
 * The prospect's objection, rendered as a comic-style speech bubble that lands
 * (slides up) at the start of each cycle. Left-aligned, like the other side of
 * the conversation.
 */
export function ObjectionBubble({ text }: { text: string }) {
  return (
    <div
      className="max-w-[88%] self-start"
      style={{ animation: 'slideInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both' }}
    >
      <div
        className="relative rounded-2xl rounded-tl-md border-2 border-[#1D4871] bg-white px-4 py-2.5"
        style={{ boxShadow: '3px 3px 0px #1D4871' }}
      >
        <p className="text-[15px] font-medium leading-snug text-[#1D4871] sm:text-base">
          &ldquo;{text}&rdquo;
        </p>
      </div>
    </div>
  );
}
