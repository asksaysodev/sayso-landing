/**
 * FAQ accordion shared by the homepage and /faq: native details / summary, so
 * questions open in place with no JavaScript. Answers render [text](href) links.
 */
import Image from 'next/image';
import Link from 'next/link';
import { focusRing } from '@/components/landing/HomeShared/styles';
import { faqAnswerParts, type FaqItem } from '@/lib/content/faq';

const linkClass = `rounded font-semibold text-[#2367EE] underline-offset-2 hover:underline ${focusRing}`;

function FaqAnswer({ answer }: { answer: string }) {
  return (
    <>
      {faqAnswerParts(answer).map((part, i) => {
        if (!('href' in part)) return part.text;
        if (part.href.startsWith('/')) {
          return (
            <Link key={i} href={part.href} className={linkClass}>
              {part.text}
            </Link>
          );
        }
        const external = part.href.startsWith('http');
        return (
          <a
            key={i}
            href={part.href}
            className={linkClass}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {part.text}
          </a>
        );
      })}
    </>
  );
}

export function FaqList({ items, showImages = false }: { items: FaqItem[]; showImages?: boolean }) {
  return (
    <>
      {items.map((item) => (
        <details key={item.question} className="group border-b border-[rgba(29,72,113,0.14)]">
          <summary
            className={`flex cursor-pointer list-none justify-between gap-3.5 rounded px-1 py-4 text-base font-semibold text-[#10233A] [&::-webkit-details-marker]:hidden ${focusRing}`}
          >
            {item.question}
            <span
              aria-hidden="true"
              className="text-[22px] leading-none text-[#2367EE] transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
            >
              +
            </span>
          </summary>
          <p className="max-w-[62ch] px-1 pb-[18px] text-[#556B86]">
            <FaqAnswer answer={item.answer} />
          </p>
          {showImages && item.image && (
            <Image
              src={item.image.src}
              alt={item.image.alt}
              width={item.image.width}
              height={item.image.height}
              className="mb-5 h-auto w-full rounded-xl ring-1 ring-[#1D4871]/10"
              sizes="(min-width: 800px) 760px, 100vw"
            />
          )}
        </details>
      ))}
    </>
  );
}
