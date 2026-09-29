import Link from 'next/link';
import { buildMetadata } from '@/lib/seo/metadata';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { ContentCTA } from '@/components/pages/ContentCTA';
import { FAQ } from '@/components/pages/FAQ';
import { ProspectingCalculator } from '@/components/tools/ProspectingCalculator';

export const metadata = buildMetadata({
  title: 'Real Estate Prospecting Calculator: Dials to Listings',
  description:
    'Work backward from your yearly goal to the dials, conversations and appointments you need each day. Use your own conversion rates and see where to improve.',
  path: '/tools/prospecting-calculator',
});

const faqItems = [
  {
    question: 'How many listing appointments does it take to get a listing?',
    answer:
      'It depends on your own sign rate, which is why the calculator asks for it. If you sign 40% of appointments, you need about 2.5 appointments per signed client. Track your last 10 appointments in your CRM to find your real number.',
  },
  {
    question: 'How many calls does a real estate agent need to make per day?',
    answer:
      'Divide your yearly goal back through each step of your funnel: closed clients, signed clients, appointments, conversations and dials. Then split the yearly dials across the weeks and days you actually prospect. The calculator does this math for you.',
  },
  {
    question: 'Where do I find my own conversion rates?',
    answer:
      'Your dialer shows how many dials became conversations. Your CRM shows how many conversations became appointments and how many appointments became signed clients. Use the last 90 days if you have them, since older numbers may not reflect your current scripts and lead sources.',
  },
  {
    question: 'Which number should I work on first?',
    answer:
      'Usually the conversation-to-appointment rate. Doubling it cuts the dials you need in half, and it depends mostly on what you say on the call, which is the part you control the most.',
  },
];

export default function ProspectingCalculatorPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Tools' },
          { label: 'Prospecting Calculator' },
        ]}
      />

      <article className="max-w-[1000px] mx-auto px-6 pb-10">
        <h1 className="font-comic text-3xl md:text-4xl text-[#1D4871] tracking-wide mt-6 mb-4">
          Real Estate Prospecting Calculator
        </h1>
        <p className="text-[#1D4871]/80 text-lg leading-relaxed font-sans mb-8 max-w-[70ch]">
          Enter how many clients you want to close this year and your own conversion rates. The calculator works
          backward to the dials, conversations and appointments you need each day and each week.
        </p>

        <ProspectingCalculator />

        <section className="max-w-[800px] mt-12 font-sans text-[#1D4871]/80 leading-relaxed">
          <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mb-4">How the math works</h2>
          <p className="mb-5">
            Each step divides by your rate for that step. With the starting numbers, 12 closed clients at an 80% close
            rate means 15 signed clients. At a 40% sign rate that is 37.5 appointments. At a 5% appointment rate that is
            750 conversations, and at a 10% contact rate that is 7,500 dials, or about 31 dials per prospecting day over
            48 weeks.
          </p>
          <p className="mb-5">
            The starting numbers are placeholders, not benchmarks. Your own numbers depend on your lead sources, your
            market and your scripts, so replace them with what your dialer and CRM show.
          </p>

          <h2 className="font-hero text-2xl md:text-[28px] text-[#1D4871] mt-10 mb-4">Improve the step that moves the most</h2>
          <p className="mb-5">
            Raising your conversation-to-appointment rate from 5% to 7% cuts the dials you need by almost a third. That
            rate depends on what you say in the first 30 seconds and how you handle objections. These guides cover the
            calls that matter most:
          </p>
          <ul className="list-disc pl-6 mb-5 space-y-2">
            <li><Link className="text-[#2367EE] hover:underline font-bold" href="/blog/real-estate-cold-calling-guide/">Real estate cold calling scripts</Link></li>
            <li><Link className="text-[#2367EE] hover:underline font-bold" href="/blog/real-estate-isa-scripts/">ISA scripts for the calls an ISA makes every day</Link></li>
            <li><Link className="text-[#2367EE] hover:underline font-bold" href="/blog/listing-appointment-questions/">Listing appointment questions and checklist</Link></li>
            <li><Link className="text-[#2367EE] hover:underline font-bold" href="/objections/">The objection library</Link></li>
          </ul>
          <p className="mb-5">
            Sayso helps with that step on the live call. It shows you the next line as the prospect talks and{' '}
            <Link className="text-[#2367EE] hover:underline font-bold" href="/products/cue/">suggests a response</Link>{' '}
            when they push back, so more conversations end with an appointment on the calendar.
          </p>
        </section>
      </article>

      <FAQ items={faqItems} />

      <ContentCTA location="prospecting-calculator" />
    </>
  );
}
