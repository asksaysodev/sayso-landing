import Image from 'next/image';

export function AboutPageContent() {
  return (
    <main className="bg-[#F4F4F5] min-h-screen">
      <div className="max-w-[760px] mx-auto px-6 py-16 md:py-24">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-[#1D4871]/60 mb-3">
            About
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1D4871] leading-tight mb-3">
            Built by an agent, for agents
          </h1>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            Sayso was born from years of watching talented agents struggle on calls,
            not because they lacked skill, but because they lacked structure in the moment.
          </p>
          <div className="mt-6 border-t-2 border-[#FFDE59]" />
        </div>

        {/* Founder Section */}
        <section className="mt-10">
          <div className="flex flex-col items-center text-center">
            {/* Photo */}
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-[3px] border-[#1D4871] v2-comic-shadow mb-6">
              <Image
                src="/founder-kuvaal-patel.png"
                alt="Kuvaal Patel, Founder of Sayso"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 192px, 224px"
                priority
              />
            </div>

            {/* Name & Title */}
            <h2 className="text-2xl font-bold text-[#1D4871] mb-1">
              Kuvaal Patel
            </h2>
            <p className="text-sm text-[#1D4871]/60 font-medium uppercase tracking-wide mb-2">
              Founder of Sayso
            </p>
            <p className="text-sm text-[#1D4871]/50">
              Director of Agent Development at Anderson Real Estate Group (top 250 @ eXp)
            </p>
          </div>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* Origin Story */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            The Story
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            I watched great agents lose listings and buyers on calls every single day.
            It wasn't because they didn't know what to say. It was because they didn't
            have structure in the moment, when it actually mattered.
          </p>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            So I built it.
          </p>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            Sayso gives real estate agents the structure, confidence, and real-time
            guidance they need to convert more calls into booked appointments. Every
            feature exists because I saw agents struggle without it firsthand.
          </p>
        </section>

        <div className="mt-10 border-t border-[#1D4871]/10" />

        {/* CTA */}
        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-bold text-[#1D4871] uppercase tracking-wide">
            See it in action
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            Want to see how Sayso can help you or your team? Book a demo and we'll
            walk you through it.
          </p>
          <a
            href="/demo"
            className="inline-flex items-center gap-2 bg-[#FFDE59] hover:bg-[#f5d400] text-[#1D4871] font-bold px-6 py-3 rounded-lg transition-colors text-sm uppercase tracking-wide"
          >
            Book a Demo
          </a>
        </section>

        {/* Bottom spacing */}
        <div className="mt-16" />
      </div>
    </main>
  );
}
