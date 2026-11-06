/**
 * "Ask AI about Sayso": round links that open ChatGPT, Claude, Perplexity or
 * Gemini with a question about Sayso already filled in.
 */
import { focusRing } from '../../HomeShared/styles';
import { ASK_AI_LINKS } from '../data';

export function AskAiLinks() {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[13px] text-[#556B86]">
      <span>Ask AI about Sayso</span>
      {ASK_AI_LINKS.map((ai) => (
        <a
          key={ai.name}
          href={ai.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ask ${ai.name} about Sayso`}
          title={`Ask ${ai.name}`}
          className={`grid h-[34px] w-[34px] place-items-center rounded-full border-[1.5px] border-[rgba(29,72,113,0.14)] bg-white transition hover:-translate-y-0.5 hover:border-[#1D4871] ${focusRing}`}
        >
          <svg aria-hidden="true" className="h-[17px] w-[17px]" viewBox="0 0 24 24" fill={ai.color}>
            <path d={ai.path} />
          </svg>
        </a>
      ))}
    </div>
  );
}
