import { buildMetadata } from '@/lib/seo/metadata';
import { PageHeader } from '@/components/pages/PageHeader';
import { ContentCTA } from '@/components/pages/ContentCTA';
import { FAQ } from '@/components/pages/FAQ';
import { BeehiivForm } from '@/components/tools/BeehiivForm';

export const metadata = buildMetadata({
  title: 'Free Real Estate Script Book for Agents',
  description:
    'Free real estate script book: buyer, seller, open house, FSBO, expired and follow-up scripts, plus LPMAMA questions. Enter your email to get it.',
  path: '/resources/script-book',
});

const SCRIPT_BOOK_FORM_ID = 'b6486f44-f9b1-4327-8213-83b47517bd05';

const audience = [
  'New agents who want a clear structure for their first prospecting calls.',
  'Experienced agents who want tighter language for lead calls, listing appointments and follow-up.',
  'ISAs and inside sales agents who set appointments for a team.',
  'Team leaders who want one shared set of talk tracks to train and role-play from.',
];

const contents: { title: string; items: string[] }[] = [
  {
    title: 'Call mentality',
    items: [
      'Book the meeting: position today or tomorrow, or lock in a next step',
      'Why you should not default to sending homes, and who should get listing alerts',
      'The three layers of motivation and how motivation reveals the timeline',
      'Urgency, the commitment standard and your three limited resources',
      'The buyer agreement standard and keeping calls moving',
    ],
  },
  {
    title: 'Questions that qualify',
    items: [
      'LPMAMA questions for buyers: location, price, motivation, agent, mortgage, appointment',
      'LPMAMA questions for sellers',
      'Motivation first: getting to the reason behind the move',
      'Lead temperatures: hot, warm and cold buckets and the follow-up cadence for each',
    ],
  },
  {
    title: 'Scripts by lead type',
    items: [
      'Buyer openers and older buyer leads',
      'Home value requests',
      'New inbound online leads and home search site leads',
      'Appointment setting after a previous conversation',
      'Investor buyers',
      'Open house visitor follow-up calls',
      'Portal tour requests',
      'Circle prospecting: "I have a buyer" and open house invites',
      'Reverse prospecting',
      'FSBO, expired and pre-foreclosure',
      'Buyers for an off-market listing',
      'Social media poll voters and land owners',
    ],
  },
  {
    title: 'Open houses, showings and follow-up',
    items: [
      'Door knocking before the open house',
      'Open house sign-in, setting expectations and the appointment ask',
      'Showing scripts: touring agreement, buyer packet, gauging fit after each home',
      'Showing to offer or next appointment',
      'Introducing a lender',
      'Listing appointment confirmation call',
      '10 Days of Pain: a day-by-day follow-up plan with example touches',
      'Open house 10 Days of Pain, from the evening of the open house to closing the loop',
      'When to stop following up',
    ],
  },
];

const faqItems = [
  {
    question: 'Is the script book free?',
    answer:
      'Yes. Enter your email on this page and we send you the script book at no cost. You do not need a Sayso account.',
  },
  {
    question: 'What is included in the script book?',
    answer:
      'Call mentality and standards, LPMAMA questions for buyers and sellers, lead temperature buckets, scripts for common lead types such as home value requests, FSBO, expired and open house visitors, open house talk tracks, showing scripts and the 10 Days of Pain follow-up framework.',
  },
  {
    question: 'Who is the script book for?',
    answer:
      'Real estate agents, ISAs and team leaders who make prospecting and lead follow-up calls and want clear structure for what to say next. It works for new agents learning the calls and experienced agents tightening their language.',
  },
];

const h2 = 'font-hero font-extrabold tracking-[-0.02em] leading-tight text-2xl md:text-[28px] text-[#10233A] mt-12 mb-4';

export default function ScriptBookPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
          { label: 'Script Book' },
        ]}
        title="Ultimate Real Estate Script Book"
        intro="A free script book with the language for the calls that drive your business: lead calls, appointment setting, open houses, showings and follow-up. It gives you structure so you are not guessing what to say, and every script moves the conversation toward a defined next step."
      />

      <article className="max-w-[1000px] mx-auto px-6 pb-10">

        <div className="mx-auto max-w-[560px] rounded-[20px] border border-[rgba(16,35,58,0.12)] border-t-4 border-t-[#FFDE59] bg-white px-6 pt-6 pb-4 md:px-8 md:pt-7 text-center shadow-[0_1px_2px_rgba(16,35,58,0.06),0_14px_34px_-16px_rgba(16,35,58,0.25)]">
          <h2 className="font-hero font-bold text-[22px] text-[#10233A]">Get the script book</h2>
          <p className="mt-1 mb-4 text-[15px] text-[#556B86]">Enter your email and we&apos;ll send the script book.</p>
          <BeehiivForm formId={SCRIPT_BOOK_FORM_ID} data-analytics-id="form-script-book" className="mx-auto w-full max-w-[420px] text-left" />
        </div>

        <section className="mx-auto max-w-[800px] font-sans text-[#1D4871]/80 leading-relaxed">
          <h2 className={h2}>Who it&apos;s for</h2>
          <ul className="list-disc pl-6 mb-5 space-y-2">
            {audience.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2 className={h2}>What&apos;s inside</h2>
          <p className="mb-6">
            The book is organized the way a call unfolds: the mindset first, then the questions, then scripts for each
            lead type, then the follow-up that turns a first conversation into an appointment.
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            {contents.map((group) => (
              <div key={group.title} className="rounded-[16px] bg-white p-5 ring-1 ring-[#1D4871]/10">
                <h3 className="font-hero font-bold text-lg text-[#10233A] mb-2">{group.title}</h3>
                <ul className="list-disc pl-5 space-y-1.5 text-[15px]">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h2 className={h2}>How to use it</h2>
          <ul className="list-disc pl-6 mb-5 space-y-2">
            <li>
              <strong className="text-[#10233A]">Practice out loud.</strong> Read the scripts aloud and role-play them
              with a partner before you use them on a live call.
            </li>
            <li>
              <strong className="text-[#10233A]">Adapt to your voice.</strong> The scripts are not meant to be memorized
              word for word. Change the phrasing so it sounds like you.
            </li>
            <li>
              <strong className="text-[#10233A]">Keep the structure.</strong> The order of the questions is what moves
              the call forward. Adjust the words, keep the steps.
            </li>
          </ul>

          <h2 className={h2}>A sample: when someone asks for homes</h2>
          <p className="mb-4">
            Prospects often ask for listings early in the call. Acknowledge the request, then bring the conversation
            back to the move itself:
          </p>
          <blockquote className="mb-4 rounded-r-xl border-l-4 border-[#FFDE59] bg-white px-5 py-4 text-[#10233A] italic">
            &ldquo;I&apos;d be happy to send homes. Tell me about your goals. What&apos;s got you thinking about making a move right
            now?&rdquo;
          </blockquote>
          <p className="mb-5">
            Then keep asking questions that clarify the situation. Once the situation is clear, scheduling the next step
            gets easier.
          </p>
        </section>
      </article>

      <FAQ items={faqItems} />

      <ContentCTA location="script-book" />
    </>
  );
}
