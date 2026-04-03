'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Image from 'next/image';
import { LightningIcon } from '@/components/icons/LightningIcon';
import { BlogInArticleCTA } from '@/components/blog/BlogInArticleCTA';

const logos = [
  { name: 'eXp Realty', src: '/exp realty.png' },
  { name: 'Anderson Group', src: '/anderson group.png' },
  { name: 'Olaf', src: '/olaf logo.png' },
];

function CTABrandingContent() {
  const params = useSearchParams();
  const greenScreen = params.get('bg') === 'green';
  const bg = greenScreen ? '#00FF00' : 'transparent';

  return (
    <div
      style={{ background: bg, padding: 60 }}
      className="min-h-screen flex flex-col items-center gap-16"
    >
      {/* ── "Download Sayso" CTA Button (Yellow / Comic Style) ── */}
      <div data-export-id="cta-download">
        <button
          className="inline-flex items-center justify-center rounded-full bg-[#FFDE59] px-8 py-3.5 text-lg font-semibold text-[#1D4871] border-2 border-[#1D4871] whitespace-nowrap"
          style={{ boxShadow: '3px 3px 0px #1D4871' }}
        >
          <LightningIcon size={16} className="mr-2 flex-shrink-0" />
          Download Sayso
        </button>
      </div>

      {/* ── "Book a Demo" CTA Button (Blue / Glowing) ── */}
      <div data-export-id="cta-book-demo">
        <button
          className="inline-flex items-center justify-center rounded-full bg-[#2367EE] px-8 py-3.5 text-lg font-bold text-white v4-hero-glow border-2 border-[#1D4871] whitespace-nowrap"
        >
          Book a Demo
        </button>
      </div>

      {/* ── Both CTAs side by side ── */}
      <div data-export-id="cta-pair" className="flex gap-4 items-center">
        <button
          className="inline-flex items-center justify-center rounded-full bg-[#FFDE59] px-6 py-3.5 text-[1.1rem] font-bold text-[#1D4871] border-2 border-[#1D4871] whitespace-nowrap"
          style={{ boxShadow: '3px 3px 0px #1D4871' }}
        >
          <LightningIcon size={16} color="#1D4871" className="mr-1.5" />
          Download Sayso
        </button>
        <button
          className="inline-flex items-center justify-center rounded-full bg-[#2367EE] px-6 py-3.5 text-[1.1rem] font-bold text-white v4-hero-glow border-2 border-[#1D4871] whitespace-nowrap"
        >
          Book a Demo
        </button>
      </div>

      {/* ── "Works with existing dialer or CRM!" Badge ── */}
      <div data-export-id="badge-dialer-crm">
        <div
          className="bg-[#FFDE59] border-[2.5px] border-[#1D4871] px-5 py-2.5 rounded-lg transform -rotate-2"
          style={{ boxShadow: '3px 3px 0px #1D4871' }}
        >
          <span className="font-comic text-[#1D4871] text-2xl tracking-wide whitespace-nowrap">
            Works with existing dialer or CRM!
          </span>
        </div>
      </div>

      {/* ── "Case Studies Coming Soon" Badge ── */}
      <div data-export-id="badge-case-studies">
        <div
          className="inline-flex items-center gap-2 bg-[#FFDE59] border-[2.5px] border-[#1D4871] px-5 py-2.5 rounded-lg transform -rotate-1"
          style={{ boxShadow: '3px 3px 0px #1D4871' }}
        >
          <span className="text-lg" aria-hidden="true">📋</span>
          <span className="font-comic text-[#1D4871] text-lg tracking-wide whitespace-nowrap">
            Case Studies Coming Soon
          </span>
        </div>
      </div>

      {/* ── "MOST POPULAR" Pow Badge ── */}
      <div data-export-id="badge-most-popular">
        <div className="v2-pow-badge px-4 py-1.5 text-base transform -rotate-2">
          MOST POPULAR
        </div>
      </div>

      {/* ── Social Proof — "Trusted By" Logos ── */}
      <div data-export-id="social-proof" className="bg-white rounded-2xl p-8">
        <div className="flex justify-center mb-5">
          <span
            className="text-base font-bold tracking-widest uppercase text-black text-center"
            style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
          >
            Trusted by Top Teams and Agents Nationwide
          </span>
        </div>
        <div className="flex items-center justify-center gap-20">
          {logos.map((logo) => (
            <div key={logo.name} className="flex items-center justify-center max-w-[260px]">
              <Image
                src={logo.src}
                alt={logo.name}
                width={260}
                height={100}
                className="h-24 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Blog CTA Block ── */}
      <div data-export-id="blog-cta" style={{ width: 600 }}>
        <BlogInArticleCTA />
      </div>
    </div>
  );
}

export default function CTABrandingExportPage() {
  return (
    <Suspense>
      <CTABrandingContent />
    </Suspense>
  );
}
