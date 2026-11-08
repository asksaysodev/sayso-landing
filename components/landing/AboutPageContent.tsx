import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { BeliefList, HowWeWork, SectionDivider, SectionHeading, ValuesGrid } from '@/components/landing/BrandSections';
import { PageHeader } from '@/components/pages/PageHeader';

const STORY = [
  'Sayso started from a problem I kept seeing while reviewing calls with real estate agents.',
  'I was spending time listening to conversations, identifying missed opportunities, and coaching agents on what they could have done differently. While the coaching was valuable, only part of it would stick.',
  'Agents would understand what they should have said or asked during a call review, but when the next prospect conversation took an unexpected turn, applying that knowledge became much harder. A question would be missed. An objection wouldn’t be fully explored. An opportunity to move the conversation forward would pass.',
  'I realized the problem wasn’t a lack of knowledge or effort. It was the gap between knowing what to do and doing it in the moment. Traditional coaching happens after the conversation, when the opportunity to change the outcome has already passed.',
  'I believed there had to be a better way to support agents while they were still on the phone, without requiring me or another coach to be present for every conversation. That’s where Sayso started.',
  'Sayso provides real-time, context-aware conversation guidance to help agents apply what they know, make better decisions, and turn more conversations into qualified appointments.',
  'We’re not replacing the agent, the coach, or the relationship. We’re making great coaching more accessible and good execution easier to repeat.',
];

const GOING = [
  'In five years, I want Sayso to be known across real estate and increasingly recognized across direct sales industries.',
  'I want real-time conversation guidance to become a standard part of how companies develop their people and improve performance.',
  'We want to help establish a new standard for coaching: one that improves performance during the conversation, not only after it.',
];

const body = 'text-base text-[#1D4871]/80 leading-relaxed';

export function AboutPageContent() {
  return (
    <main className="bg-[#F4F4F5] min-h-screen">
      <PageHeader
        standalone
        title="Win the Moment."
        intro="Close the gap between knowing what to do and doing it when it matters."
      />
      <div className="max-w-[760px] mx-auto px-6 pb-16 md:pb-24">
        <div className="border-t border-[#1D4871]/10" />

        {/* Founder Section */}
        <section className="mt-10">
          <div className="flex flex-col items-center text-center">
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-[20px] overflow-hidden shadow-card mb-6">
              <Image
                src="/images/founder-kuvaal-patel.png"
                alt="Kuvaal Patel, Founder of Sayso"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 192px, 224px"
                priority
              />
            </div>
            <h2 className="font-hero text-2xl font-extrabold tracking-[-0.02em] text-[#10233A] mb-1">
              Kuvaal Patel
            </h2>
            <p className="text-sm text-[#1D4871]/60 font-medium uppercase tracking-wide mb-2">
              Founder of Sayso
            </p>
            <p className="text-sm text-[#1D4871]/50">
              Director of Agent Development at Anderson Real Estate Group (top 250 @ eXp)
            </p>
          </div>
        </section>

        <SectionDivider />

        {/* Origin Story */}
        <section className="mt-10 space-y-4">
          <SectionHeading>Why Sayso exists</SectionHeading>
          {STORY.map((p) => (
            <p key={p} className={body}>{p}</p>
          ))}
        </section>

        <SectionDivider />

        <section className="mt-10 space-y-4">
          <SectionHeading>What we believe</SectionHeading>
          <BeliefList />
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
          <SectionHeading>Where we’re going</SectionHeading>
          {GOING.map((p) => (
            <p key={p} className={body}>{p}</p>
          ))}
        </section>

        <SectionDivider />

        {/* CTA */}
        <section className="mt-10 space-y-4">
          <SectionHeading>See it in action</SectionHeading>
          <p className={body}>
            Want to see how Sayso can help you or your team? Book a demo and we’ll
            walk you through it.
          </p>
          <div>
            <Button href="/demo/">
              Book a demo
            </Button>
          </div>
        </section>

        <div className="mt-16" />
      </div>
    </main>
  );
}
