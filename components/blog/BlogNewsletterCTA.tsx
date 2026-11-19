import { EmbedIframe } from '@/components/embeds/EmbedIframe';

export function BlogNewsletterCTA() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-10">
      <div className="bg-[#1D4871] rounded-[20px] shadow-[0_1px_2px_rgba(16,35,58,0.1),0_18px_40px_-18px_rgba(16,35,58,0.55)] overflow-hidden">
        <div className="px-8 py-12 md:py-14 text-center">
          <h2 className="font-hero font-extrabold tracking-[-0.03em] text-3xl md:text-4xl text-white mb-3">
            Never Miss a Moment
          </h2>
          <p className="text-base text-white/70 max-w-md mx-auto mb-8 font-sans">
            Subscribe for weekly tips on cold calling, lead conversion, and winning more appointments.
          </p>
          <div className="max-w-md mx-auto">
            {/* 57px = the slim form's loaded height at every width. */}
            <EmbedIframe
              src="https://subscribe-forms.beehiiv.com/de7b925b-6f1f-4557-9fde-cf8005c34c5f"
              className="w-full h-[57px] border-0 block"
              frameClassName="mx-auto max-w-[414px]"
              compactSkeleton
              data-test-id="beehiiv-embed"
              data-analytics-id="form-newsletter-blog"
              scrolling="no"
              style={{ backgroundColor: 'transparent' }}
              title="Newsletter signup"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
