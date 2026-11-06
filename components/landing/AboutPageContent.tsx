import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export function AboutPageContent() {
  return (
    <main className="bg-[#F4F4F5] min-h-screen">
      <div className="max-w-[760px] mx-auto px-6 py-16 md:py-24">

        {/* Header */}
        <div className="mb-10">
          <p className="mb-4">
            <span className="inline-block rounded-md bg-[#FFDE59] px-2.5 py-px font-comic text-[17px] tracking-[0.08em] text-[#1D4871]">ABOUT</span>
          </p>
          <h1 className="font-hero font-extrabold tracking-[-0.035em] text-[#10233A] text-4xl md:text-[56px] leading-[1.08] mb-4">
            Built by an agent, for agents
          </h1>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            Sayso was born from years of watching talented agents struggle on calls,
            not because they lacked skill, but because they lacked structure in the moment.
          </p>
          <div className="mt-8 border-t border-[#1D4871]/10" />
        </div>

        {/* Founder Section */}
        <section className="mt-10">
          <div className="flex flex-col items-center text-center">
            {/* Photo */}
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-[20px] overflow-hidden shadow-card mb-6">
              <Image
                src="/images/founder-kuvaal-patel.png"
                alt="Kuvaal Patel, Founder of Sayso"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 192px, 224px"
                priority
              />
            </div>

            {/* Name & Title */}
            <h2 className="font-hero text-2xl font-extrabold tracking-[-0.02em] text-[#10233A] mb-1">
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
          <h2 className="font-hero text-2xl md:text-[28px] font-extrabold tracking-[-0.02em] text-[#10233A]">
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
          <h2 className="font-hero text-2xl md:text-[28px] font-extrabold tracking-[-0.02em] text-[#10233A]">
            See it in action
          </h2>
          <p className="text-base text-[#1D4871]/80 leading-relaxed">
            Want to see how Sayso can help you or your team? Book a demo and we'll
            walk you through it.
          </p>
          <div>
            <Button href="/demo/" withArrow>
              Book a Demo
            </Button>
          </div>
        </section>

        {/* Bottom spacing */}
        <div className="mt-16" />
      </div>
    </main>
  );
}
