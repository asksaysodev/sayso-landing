/**
 * "Sayso vs. AI calling tools" section. AI calling tools place and run the
 * call themselves; Sayso supports the agent who makes the call. Two cards
 * contrast who is on the phone, then a statement line closes the point.
 */

import { eyebrow, panel, section } from '@/components/landing/HomeShared/styles';
import { sectionTitle, sectionWrap } from '../styles';

const AI_CALLING_POINTS = [
  'The software places the call and does the talking.',
  'The conversation runs on what the tool was set up to say.',
  'The relationship starts with a system, not a person.',
];

const SAYSO_POINTS = [
  'You make the call and do the talking.',
  'Sayso listens and shows context-aware cues while you speak.',
  'Your judgment and your relationship with the client stay human.',
];

export function AiCallingSection() {
  return (
    <section className={section}>
      <div className={sectionWrap}>
        <span className={eyebrow}>SAYSO VS. AI CALLING TOOLS</span>
        <h2 className={`${sectionTitle} mt-5 max-w-3xl mx-auto`}>
          Sayso doesn&apos;t make the call. You do.
        </h2>
        <div className="mx-auto max-w-[960px] mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div className={`${panel} p-6`}>
            <h3 className="font-extrabold text-[#7f92aa] text-lg mb-3">AI calling tools</h3>
            <ul className="space-y-2.5">
              {AI_CALLING_POINTS.map((point) => (
                <li key={point} className="text-[#556B86] leading-relaxed">
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${panel} p-6`}>
            <h3 className="font-extrabold text-[#2367EE] text-lg mb-3">Sayso</h3>
            <ul className="space-y-2.5">
              {SAYSO_POINTS.map((point) => (
                <li key={point} className="text-[#556B86] leading-relaxed">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
