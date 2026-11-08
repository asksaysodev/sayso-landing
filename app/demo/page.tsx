import type { Metadata } from 'next';
import SaysoNavbar from '@/components/landing/SaysoNavbar';
import { Footer } from '@/components/landing/Footer';
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext';
import Image from 'next/image';
import { REVIEWS } from '@/components/landing/HomeReviews/data';
import { CalendlyInlineWidget } from '@/components/CalendlyInlineWidget';
import { siteUrl } from '@/lib/config';
import { PageHeader } from '@/components/pages/PageHeader';

export const metadata: Metadata = {
  title: 'Book a Demo',
  description:
    'Schedule a meeting with the founders to see how Sayso can help your real estate team book more appointments.',
  alternates: {
    canonical: `${siteUrl}/demo/`,
  },
  openGraph: {
    title: 'Book a Demo | Sayso',
    description:
      'Schedule a meeting with the founders to see how Sayso can help your real estate team book more appointments.',
    url: `${siteUrl}/demo/`,
    type: 'website',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Book a Demo with Sayso',
      },
    ],
  },
  twitter: {
    title: 'Book a Demo | Sayso',
    description:
      'Schedule a meeting with the founders to see how Sayso can help your real estate team book more appointments.',
    images: ['/images/og-default.png'],
  },
};

/** Calendly booking page with the landing details hidden, so only the scheduler shows. */
const DEMO_BOOKING_URL = 'https://calendly.com/asksayso/demo?hide_event_type_details=1&hide_landing_page_details=1&hide_gdpr_banner=1';

const COVERED = [
  'What Sayso does',
  'How Sayso works',
  'Why Sayso gives you an edge',
  'A setup plan and pricing for your team',
];

const REVIEW = REVIEWS.find((r) => r.name === 'David Simpson') ?? REVIEWS[0];

export default function DemoPage() {
  return (
    <DemoCalendarProvider>
      {/* On desktop the navbar, header and booking area fill exactly one screen
          height, so the calendar and side card fit without scrolling. Phones stack
          and scroll normally. */}
      <div className="relative min-h-screen bg-[#F4F4F5]">
        <div className="lg:flex lg:h-[100dvh] lg:flex-col">
        <SaysoNavbar />
        <main className="lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
          <PageHeader
            standalone
            title="Book a 25-min Demo"
            className="lg:[@media(max-height:860px)]:!pb-6 lg:[@media(max-height:860px)]:!pt-10"
          />

          <section className="w-full px-4 pb-16 md:px-6 lg:min-h-0 lg:flex-1 lg:pb-6">
            <div className="mx-auto grid max-w-[1100px] gap-6 lg:h-full lg:grid-cols-[320px_1fr] lg:items-start">
              <div className="order-1 h-[700px] min-w-[320px] overflow-hidden rounded-[20px] bg-white shadow-card lg:order-2 lg:h-full lg:min-h-[480px]">
                <CalendlyInlineWidget url={DEMO_BOOKING_URL} className="h-full w-full" />
              </div>

              <aside className="order-2 space-y-6 rounded-[20px] bg-white p-6 shadow-card lg:order-1 lg:[@media(max-height:860px)]:space-y-4 lg:[@media(max-height:860px)]:p-5">
                <div>
                  <p className="font-hero text-lg font-bold text-[#10233A]">What we&apos;ll cover</p>
                  <ul className="mt-3 space-y-2.5 text-[15px] leading-relaxed text-[#1D4871]/80">
                    {COVERED.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-[#2367EE]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-3 border-t border-[#1D4871]/10 pt-6 lg:[@media(max-height:860px)]:pt-4">
                  <Image
                    src="/images/founder-kuvaal-patel.png"
                    alt="Kuvaal Patel"
                    width={56}
                    height={56}
                    className="h-14 w-14 flex-none rounded-full object-cover"
                  />
                  <p className="text-[15px] leading-snug text-[#1D4871]/80">
                    <span className="block font-bold text-[#10233A]">Kuvaal Patel</span>
                    Founder of Sayso. Director of Agent Development at Anderson Real Estate Group.
                  </p>
                </div>

                <figure className="border-t border-[#1D4871]/10 pt-6 lg:[@media(max-height:860px)]:pt-4">
                  <blockquote className="text-[15px] italic leading-relaxed text-[#10233A]">
                    &ldquo;{REVIEW.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-2 text-sm text-[#556B86]">
                    {REVIEW.name}, {REVIEW.team}
                  </figcaption>
                </figure>

                <p className="border-t border-[#1D4871]/10 pt-6 lg:[@media(max-height:860px)]:pt-4 text-sm text-[#556B86]">
                  Want to try it first?{' '}
                  <a
                    href="https://app.asksayso.com/signup?signup=true"
                    data-analytics-id="link-demo-get-sayso"
                    className="font-bold text-[#2367EE] hover:underline"
                  >
                    Get Sayso &rarr;
                  </a>
                </p>
              </aside>
            </div>
          </section>
        </main>
        </div>
        <Footer />
      </div>
    </DemoCalendarProvider>
  );
}
