'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { generateFAQPageJsonLd } from '@/lib/seo/schema';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  headline?: string;
  items: FAQItem[];
}

export function FAQ({ headline = 'Common Questions', items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const jsonLd = generateFAQPageJsonLd(items);

  return (
    <section data-faq="" className="max-w-[800px] mx-auto px-6 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 className="text-balance font-hero font-extrabold tracking-[-0.03em] text-[#10233A] text-[28px] md:text-4xl leading-[1.1] mb-6">
        {headline}
      </h2>
      <div className="divide-y divide-[#1D4871]/10 rounded-[20px] bg-white overflow-hidden shadow-card">
        {items.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between px-6 py-4 text-left"
              aria-expanded={openIndex === index}
            >
              <span className="font-semibold text-[#10233A] text-base font-sans pr-4">
                {item.question}
              </span>
              <Plus
                size={20}
                className={`text-[#2367EE] flex-shrink-0 transition-transform duration-200 ${
                  openIndex === index ? 'rotate-45' : ''
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
