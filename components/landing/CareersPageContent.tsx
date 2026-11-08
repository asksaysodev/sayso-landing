import { BeliefList, HowWeWork, SectionDivider, SectionHeading, ValuesGrid } from '@/components/landing/BrandSections';
import { PageHeader } from '@/components/pages/PageHeader';

const body = 'text-base text-[#1D4871]/80 leading-relaxed';

const BUILDING_HERE = [
  {
    title: 'Early stage',
    text: 'Sayso is a small team. You’ll work fast, be extremely responsive, and care deeply about the problem we are solving and the people we are helping.',
  },
  {
    title: 'Close to customers',
    text: 'Our customers are real estate agents, teams, and brokerages. You will work with them directly and hear their feedback firsthand.',
  },
  {
    title: 'Honest feedback',
    text: 'We give each other useful feedback, even when it’s uncomfortable, because that is how people and products get better.',
  },
  {
    title: 'Built with care',
    text: 'We would rather solve the right problem well than ship something to say we did.',
  },
];

export function CareersPageContent() {
  return (
    <main className="bg-[#F4F4F5] min-h-screen">
      <PageHeader
        standalone
        eyebrow={<span className="inline-block rounded-md bg-[#FFDE59] px-2.5 py-px font-comic text-[17px] tracking-[0.08em] text-[#1D4871]">CAREERS</span>}
        title="Build Sayso with us"
        intro="Sayso gives real estate agents real-time conversation guidance while they are still on the call."
      />
      <div className="max-w-[760px] mx-auto px-6 pb-16 md:pb-24">
        <div className="border-t border-[#1D4871]/10" />

        <section className="mt-10 space-y-4">
          <SectionHeading>Why we exist</SectionHeading>
          <BeliefList includePurpose />
        </section>

        <SectionDivider />

        <section className="mt-10 space-y-4">
          <SectionHeading>Our values</SectionHeading>
          <ValuesGrid />
        </section>

        <SectionDivider />

        <section className="mt-10 space-y-4">
          <SectionHeading>How we work</SectionHeading>
          <HowWeWork />
        </section>

        <SectionDivider />

        <section className="mt-10 space-y-4">
          <SectionHeading>What’s it like?</SectionHeading>
          <ul className="space-y-4">
            {BUILDING_HERE.map((item) => (
              <li key={item.title}>
                <p className="font-hero text-lg font-extrabold tracking-[-0.01em] text-[#10233A]">{item.title}</p>
                <p className={body}>{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <SectionDivider />

        <section className="mt-10 space-y-4">
          <SectionHeading>Get in touch</SectionHeading>
          <p className={body}>
            Send your resume to{' '}
            <a
              href="mailto:careers@asksayso.com"
              data-analytics-id="cta-careers-email"
              className="font-semibold text-[#1D4871] underline decoration-[#FFDE59] decoration-2 underline-offset-4 hover:text-[#10233A]"
            >
              careers@asksayso.com
            </a>
          </p>
        </section>

        <div className="mt-16" />
      </div>
    </main>
  );
}
