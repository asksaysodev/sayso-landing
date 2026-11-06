/**
 * Homepage FAQ: an intro column with contact links and grouped questions that
 * open in place (native details / summary, no JavaScript needed).
 */
import Link from 'next/link';
import { section, wash, wrap, eyebrow, focusRing } from '../HomeShared/styles';
import { FAQ_GROUPS } from './data';

export function HomeFAQ() {
  return (
    <section id="faq" className={`${section} ${wash}`} aria-labelledby="faq-title">
      <div className={`${wrap} grid max-w-[1040px] grid-cols-1 gap-10 min-[961px]:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]`}>
        <div>
          <span className={eyebrow}>FAQ</span>
          <h2 id="faq-title" className="mt-[18px] text-balance font-hero text-[clamp(28px,4vw,40px)] font-extrabold tracking-[-0.03em] text-[#10233A]">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-[#556B86]">
            Something else?{' '}
            <Link href="/contact/" className={`rounded font-semibold text-[#2367EE] ${focusRing}`}>
              Contact us
            </Link>{' '}
            or browse the{' '}
            <a href="https://asksayso.notion.site/helpcenter" target="_blank" rel="noopener noreferrer" className={`rounded font-semibold text-[#2367EE] ${focusRing}`}>
              help center
            </a>
            .
          </p>
        </div>
        <div>
          {FAQ_GROUPS.map((group, gi) => (
            <div key={group.title} className={gi ? 'mt-[30px]' : undefined}>
              <h3 className="mb-1 font-comic text-[21px] font-normal tracking-[0.06em] text-[#1D4871]">{group.title}</h3>
              {group.items.map((item) => (
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
                  <p className="max-w-[62ch] px-1 pb-[18px] text-[#556B86]">{item.answer}</p>
                </details>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
