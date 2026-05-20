'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type Testimonial = {
  number: number;
  name: string;
  attribution: string;
  badge: string;
  badgeSubtext?: string;
  videoId: string;
  stat: {
    value: string;
    label: string;
  };
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    number: 1,
    name: 'Alejandro Barrera',
    attribution: 'Anderson Real Estate Group, eXp Long Beach',
    badge: 'Top 250 eXp team',
    videoId: 'Vcxo-Gp2iOk',
    stat: {
      value: '12×',
      label: 'more efficient at booking appointments from his calls',
    },
    quote:
      'The prompts were really helping me out, giving me more direction toward booking the appointment. I felt more confident about where I was going with the conversation, and I was just coming up with a solution to give the prospect for the next question.',
  },
  {
    number: 2,
    name: 'David Simpson',
    attribution: 'Whissel-Beer Group, eXp San Diego',
    badge: '#1 eXp Team Worldwide',
    badgeSubtext: 'out of 82,980+ agents',
    videoId: 'ktBXjEoyvUc',
    stat: {
      value: '6 mo',
      label: 'faster on the phone with Sayso',
    },
    quote:
      'Sayso has accelerated me by 6 months or more in skills on the phone.',
  },
];

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

        {/* Testimonials grid: stacked on mobile/tablet, side-by-side on lg+ */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8">
          {testimonials.map((t) => (
            <TestimonialBlock key={t.number} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialBlock({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div>
      {/* Single wide label bar spanning both cards */}
      <div className="mb-4 rounded-lg bg-[#2367EE]/10 border-2 border-[#2367EE]/25 px-4 py-3 md:px-5 md:py-4">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
          {/* Identity */}
          <div className="flex-1 min-w-0">
            <p className="text-[10px] md:text-xs font-bold text-[#2367EE] mb-0.5 tracking-wider uppercase">
              Testimonial #{testimonial.number}
            </p>
            <p className="text-sm md:text-[15px] text-[#1D4871] leading-snug">
              <span className="font-bold">{testimonial.name}</span>
              <span className="text-[#1D4871]/60"> - {testimonial.attribution}</span>
            </p>
          </div>

          {/* Divider */}
          <div className="hidden md:block h-12 w-0.5 bg-[#2367EE]/25 flex-shrink-0" />

          {/* Stat */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0 text-[#2367EE]">
            <p className="font-comic text-3xl md:text-4xl leading-none tracking-wide">
              {testimonial.stat.value}
            </p>
            <p className="text-[11px] md:text-xs font-semibold leading-tight max-w-[18ch]">
              {testimonial.stat.label}
            </p>
          </div>
        </div>
      </div>

      {/* Video + quote grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <VideoCard testimonial={testimonial} />

        {/* Desktop: full quote card inline */}
        <div className="hidden md:block">
          <QuoteCard testimonial={testimonial} />
        </div>

        {/* Mobile: collapsible "Read testimonial" disclosure */}
        <div className="md:hidden">
          <ReadTestimonialDisclosure testimonial={testimonial} />
        </div>
      </div>
    </div>
  );
}

function VideoCard({ testimonial }: { testimonial: Testimonial }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnail = `https://i.ytimg.com/vi/${testimonial.videoId}/oar2.jpg`;

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
          referrerPolicy="strict-origin-when-cross-origin"
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
            src={thumbnail}
            onError={(e) => {
              const img = e.currentTarget;
              const fallback = `https://i.ytimg.com/vi/${testimonial.videoId}/hqdefault.jpg`;
              if (img.src !== fallback) img.src = fallback;
            }}
            alt={`${testimonial.name} testimonial thumbnail`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />

          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/icons/youtube-shorts-icon.svg"
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

function QuoteCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div
      className="relative overflow-hidden rounded-xl bg-white v2-comic-border v2-comic-shadow p-4 md:p-5 flex flex-col"
      style={{ aspectRatio: '9 / 14' }}
    >
      <svg
        className="absolute top-3 right-3 md:top-4 md:right-4 text-[#FFDE59]"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M7.17 6C4.86 6 3 7.86 3 10.17c0 2.31 1.86 4.17 4.17 4.17.41 0 .8-.07 1.18-.18-.68 1.92-2.48 3.34-4.6 3.58v2.09c4.38-.27 7.83-3.9 7.83-8.33V10.17C11.58 7.86 9.72 6 7.17 6zm9.66 0c-2.31 0-4.17 1.86-4.17 4.17 0 2.31 1.86 4.17 4.17 4.17.41 0 .8-.07 1.18-.18-.68 1.92-2.48 3.34-4.6 3.58v2.09c4.38-.27 7.83-3.9 7.83-8.33V10.17C21.24 7.86 19.38 6 16.83 6z" />
      </svg>

      <blockquote className="relative z-10 flex-1 flex items-center">
        <p className="font-hero text-xs md:text-sm lg:text-sm text-[#1D4871] leading-snug">
          {testimonial.quote}
        </p>
      </blockquote>

      <div className="relative z-10 pt-3 mt-3 border-t-2 border-dashed border-[#1D4871]/15">
        <p className="font-comic text-sm md:text-base text-[#1D4871] tracking-wide leading-tight">
          {testimonial.name}
        </p>
        <p className="text-[11px] md:text-xs text-[#1D4871]/70 leading-snug mt-0.5">
          {testimonial.attribution}
        </p>
        <BadgePill testimonial={testimonial} className="mt-1.5" />
      </div>
    </div>
  );
}

function ReadTestimonialDisclosure({ testimonial }: { testimonial: Testimonial }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = `testimonial-quote-panel-${testimonial.number}`;

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-white v2-comic-border v2-comic-shadow">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full px-5 py-4 flex items-center gap-4 text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2367EE] focus-visible:ring-inset"
      >
        <span className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-[#FFDE59] border-2 border-[#1D4871]">
          <svg
            className="text-[#1D4871]"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M7.17 6C4.86 6 3 7.86 3 10.17c0 2.31 1.86 4.17 4.17 4.17.41 0 .8-.07 1.18-.18-.68 1.92-2.48 3.34-4.6 3.58v2.09c4.38-.27 7.83-3.9 7.83-8.33V10.17C11.58 7.86 9.72 6 7.17 6zm9.66 0c-2.31 0-4.17 1.86-4.17 4.17 0 2.31 1.86 4.17 4.17 4.17.41 0 .8-.07 1.18-.18-.68 1.92-2.48 3.34-4.6 3.58v2.09c4.38-.27 7.83-3.9 7.83-8.33V10.17C21.24 7.86 19.38 6 16.83 6z" />
          </svg>
        </span>

        <span className="flex-1 min-w-0">
          <span className="block font-comic text-base text-[#1D4871] tracking-wide leading-tight">
            Read testimonial
          </span>
          <span className="block text-xs text-[#1D4871]/60 leading-snug mt-0.5 truncate">
            {testimonial.name} - {testimonial.attribution}
          </span>
        </span>

        <ChevronDown
          size={22}
          strokeWidth={2.5}
          className={`flex-shrink-0 text-[#2367EE] transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          id={panelId}
          className="px-5 pb-5 pt-1 border-t-2 border-dashed border-[#1D4871]/15"
        >
          <blockquote className="pt-4">
            <p className="font-hero text-base text-[#1D4871] leading-snug">
              {testimonial.quote}
            </p>
          </blockquote>

          <div className="pt-4 mt-4 border-t-2 border-dashed border-[#1D4871]/15">
            <p className="font-comic text-lg text-[#1D4871] tracking-wide">
              {testimonial.name}
            </p>
            <p className="text-sm text-[#1D4871]/70 leading-snug">
              {testimonial.attribution}
            </p>
            <BadgePill testimonial={testimonial} className="mt-2" />
          </div>
        </div>
      )}
    </div>
  );
}

function BadgePill({
  testimonial,
  className = '',
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  return (
    <span
      className={`inline-block bg-[#FFDE59] text-[#1D4871] px-2 py-1 rounded border-2 border-[#1D4871] ${className}`}
    >
      <span className="block text-[10px] md:text-xs font-bold tracking-widest uppercase leading-tight">
        {testimonial.badge}
      </span>
      {testimonial.badgeSubtext && (
        <span className="block text-[9px] md:text-[10px] font-semibold tracking-wide uppercase leading-tight opacity-80 mt-0.5">
          {testimonial.badgeSubtext}
        </span>
      )}
    </span>
  );
}
