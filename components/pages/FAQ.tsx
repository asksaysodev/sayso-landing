'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { generateFAQPageJsonLd } from '@/lib/seo/schema';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  headline?: string;
  items: FAQItem[];
}

export function FAQ({ headline = 'Frequently Asked Questions', items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const jsonLd = generateFAQPageJsonLd(items);

  return (
    <section className="max-w-[800px] mx-auto px-6 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 className="font-comic text-2xl md:text-3xl text-[#1D4871] tracking-wide mb-6">
        {headline}
      </h2>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white border-2 border-[#1D4871]/10 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between px-6 py-4 text-left"
              aria-expanded={openIndex === index}
            >
              <span className="font-bold text-[#1D4871] text-base font-sans pr-4">
                {item.question}
              </span>
              <ChevronDown
                size={20}
                className={`text-[#1D4871]/40 flex-shrink-0 transition-transform duration-200 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-6 pb-5">
                <p className="text-[#1D4871]/70 text-base leading-relaxed font-sans">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
