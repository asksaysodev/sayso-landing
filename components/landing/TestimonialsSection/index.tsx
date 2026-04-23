'use client';

import { useState } from 'react';

const VIDEO_ID = 'Vcxo-Gp2iOk';
const THUMBNAIL = `https://i.ytimg.com/vi/${VIDEO_ID}/oar2.jpg`;

const testimonial = {
  number: 1,
  name: 'Alejandro Barrera',
  attribution: 'Anderson Real Estate Group, eXp Long Beach',
  badge: 'Top 250 eXp team',
  videoId: VIDEO_ID,
  stat: {
    value: '12×',
    label: 'more efficient at turning live conversations into booked appointments',
  },
  quote:
    'The prompts were really helping me out, giving me more direction toward booking the appointment. I felt more confident about where I was going with the conversation, and I was just coming up with a solution to give the prospect for the next question.',
};

export function TestimonialsSection() {
  return (
    <section className="relative bg-[#F4F4F5] py-12 md:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative">
        {/* Section header */}
        <div className="text-center mb-10 md:mb-14 max-w-2xl mx-auto">
          <span className="inline-block text-xs md:text-sm font-bold tracking-widest uppercase text-[#2367EE] mb-3">
            What agents are saying
          </span>
          <h2 className="font-comic text-3xl md:text-4xl lg:text-5xl text-[#1D4871] tracking-wide mb-4">
            Real agents, real conversations
          </h2>
          <p className="text-base md:text-lg text-[#1D4871]/70 leading-relaxed">
            Agents using Sayso share how the prompts change the way they handle live prospecting conversations and guide them toward booked appointments.
          </p>
        </div>

        {/* Unified testimonial group */}
        <div className="max-w-4xl mx-auto">
          {/* Single wide label bar spanning both cards */}
          <div className="mb-4 md:mb-5 rounded-lg bg-[#2367EE]/10 border-2 border-[#2367EE]/25 px-5 py-4 md:px-6 md:py-5">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              {/* Identity */}
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm font-bold text-[#2367EE] mb-1">
                  Testimonial #{testimonial.number}
                </p>
                <p className="text-sm md:text-base text-[#1D4871] leading-snug">
                  <span className="font-bold">{testimonial.name}</span>
                  <span className="text-[#1D4871]/60"> - {testimonial.attribution}</span>
                </p>
              </div>

              {/* Divider */}
              <div className="hidden md:block h-14 w-0.5 bg-[#2367EE]/25 flex-shrink-0" />

              {/* Stat */}
              <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
                <p className="font-comic text-4xl md:text-5xl leading-none text-[#2367EE] tracking-wide">
                  {testimonial.stat.value}
                </p>
                <p className="text-xs md:text-sm text-[#1D4871]/80 leading-tight max-w-[22ch]">
                  {testimonial.stat.label}
                </p>
              </div>
            </div>
          </div>

          {/* Video + quote grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <VideoCard />
            <QuoteCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoCard() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl bg-black v2-comic-border v2-comic-shadow"
      style={{ aspectRatio: '9 / 14' }}
    >
      {isPlaying ? (
        <iframe
          src={`https://www.youtube.com/embed/${testimonial.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={`${testimonial.name} testimonial`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          aria-label={`Play ${testimonial.name}'s testimonial video`}
          className="group absolute inset-0 h-full w-full focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2367EE] focus-visible:ring-inset"
        >
          <img
            src={THUMBNAIL}
            alt={`${testimonial.name} testimonial thumbnail`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />

          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/Youtube_shorts_icon.svg"
              alt=""
              aria-hidden="true"
              className="w-20 h-auto md:w-24 drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)] transition-transform duration-200 group-hover:scale-110"
            />
          </div>
        </button>
      )}
    </div>
  );
}

function QuoteCard() {
  return (
    <div
      className="relative overflow-hidden rounded-xl bg-white v2-comic-border v2-comic-shadow p-6 md:p-8 flex flex-col"
      style={{ aspectRatio: '9 / 14' }}
    >
      <svg
        className="absolute top-5 right-5 md:top-6 md:right-6 text-[#FFDE59]"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M7.17 6C4.86 6 3 7.86 3 10.17c0 2.31 1.86 4.17 4.17 4.17.41 0 .8-.07 1.18-.18-.68 1.92-2.48 3.34-4.6 3.58v2.09c4.38-.27 7.83-3.9 7.83-8.33V10.17C11.58 7.86 9.72 6 7.17 6zm9.66 0c-2.31 0-4.17 1.86-4.17 4.17 0 2.31 1.86 4.17 4.17 4.17.41 0 .8-.07 1.18-.18-.68 1.92-2.48 3.34-4.6 3.58v2.09c4.38-.27 7.83-3.9 7.83-8.33V10.17C21.24 7.86 19.38 6 16.83 6z" />
      </svg>

      <blockquote className="relative z-10 flex-1 flex items-center">
        <p className="font-hero text-lg md:text-xl lg:text-2xl text-[#1D4871] leading-snug">
          {testimonial.quote}
        </p>
      </blockquote>

      <div className="relative z-10 pt-5 mt-5 border-t-2 border-dashed border-[#1D4871]/15">
        <p className="font-comic text-lg md:text-xl text-[#1D4871] tracking-wide">
          {testimonial.name}
        </p>
        <p className="text-sm md:text-base text-[#1D4871]/70 leading-snug">
          {testimonial.attribution}
        </p>
        <span className="mt-2 inline-block bg-[#FFDE59] text-[#1D4871] text-[10px] md:text-xs font-bold tracking-widest uppercase px-2 py-0.5 rounded border-2 border-[#1D4871]">
          {testimonial.badge}
        </span>
      </div>
    </div>
  );
}
