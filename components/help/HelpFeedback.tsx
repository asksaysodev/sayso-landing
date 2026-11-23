'use client';

/**
 * "Was this article helpful?" Sends a help_feedback event to the dataLayer
 * (GTM forwards it to GA4 under the visitor's consent settings) and to Vercel
 * Analytics, which is cookieless. A "No" asks what was missing and links to
 * support with the article prefilled.
 */
import { useState } from 'react';
import { track } from '@vercel/analytics';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

export function HelpFeedback({ slug, title }: { slug: string; title: string }) {
  const [vote, setVote] = useState<'yes' | 'no' | null>(null);

  const send = (v: 'yes' | 'no') => {
    setVote(v);
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'help_feedback', help_article: slug, help_helpful: v });
      track('help_feedback', { article: slug, helpful: v });
    } catch {
      // Analytics blocked: the vote still shows as sent.
    }
  };

  const mailto = `mailto:support@asksayso.com?subject=${encodeURIComponent(`Help Center: ${title}`)}`;

  return (
    <div className="mt-12 rounded-2xl bg-white px-6 py-5 shadow-card-sm">
      {vote === null ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-semibold text-[#10233A]">Was this article helpful?</p>
          <div className="flex gap-2">
            {(['yes', 'no'] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => send(v)}
                className="inline-flex items-center gap-2 rounded-full border border-[#D7DEE1] px-4 py-2 text-sm font-semibold text-[#1D4871] transition hover:border-[#2367EE] hover:text-[#2367EE]"
              >
                {v === 'yes' ? <ThumbsUp className="h-4 w-4" aria-hidden /> : <ThumbsDown className="h-4 w-4" aria-hidden />}
                {v === 'yes' ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
        </div>
      ) : vote === 'yes' ? (
        <p className="font-semibold text-[#10233A]">Thanks for letting us know.</p>
      ) : (
        <p className="text-[15px] text-[#1D4871]/85">
          <span className="font-semibold text-[#10233A]">Thanks. What was missing?</span> Email{' '}
          <a href={mailto} className="font-semibold text-[#2367EE] hover:underline">support@asksayso.com</a> and we will fix this article
          and answer your question.
        </p>
      )}
    </div>
  );
}
