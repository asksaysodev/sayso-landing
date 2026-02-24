export function VideoCallMockup() {
  return (
    <div className="absolute inset-0 flex">
      {/* Left participant - Seller */}
      <div className="flex-1 relative bg-[#0d1b2a] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/sayso_seller.mp4" type="video/mp4" />
        </video>
        {/* Name tag */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 z-10">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
            <span className="text-[11px] text-white/80 font-medium">You</span>
          </div>
        </div>
      </div>

      {/* Right participant - Buyer */}
      <div className="flex-1 relative bg-[#0d1b2a] overflow-hidden border-l border-white/5">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/sayso_buyer.mp4" type="video/mp4" />
        </video>
        {/* Name tag */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 z-10">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm">
            <span className="text-[11px] text-white/80 font-medium">Jane Smith</span>
          </div>
        </div>
        {/* Speaking indicator */}
        <div className="absolute bottom-3 right-3 z-10">
          <div className="flex gap-1 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
            <div className="w-1 h-3 rounded-full bg-green-400/80 showcase-bar-1" />
            <div className="w-1 h-3 rounded-full bg-green-400/80 showcase-bar-2" />
            <div className="w-1 h-3 rounded-full bg-green-400/80 showcase-bar-3" />
            <div className="w-1 h-3 rounded-full bg-green-400/80 showcase-bar-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
