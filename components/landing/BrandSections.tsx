/**
 * Shared brand blocks (beliefs, values, how we work) used by the About and
 * Careers pages. Copy comes from the founder's brand identity doc.
 */
import type { ReactNode } from 'react';

const body = 'text-base text-[#1D4871]/80 leading-relaxed';

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-hero text-2xl md:text-[28px] font-extrabold tracking-[-0.02em] text-[#10233A]">
      {children}
    </h2>
  );
}

export function SectionDivider() {
  return <div className="mt-10 border-t border-[#1D4871]/10" />;
}

const BELIEFS = [
  {
    label: 'Core belief',
    text: 'Better execution creates better outcomes, and it happens when people have the right support at the right moment.',
  },
  {
    label: 'Mission',
    text: 'Improve sales execution through real-time conversation guidance, helping people turn more opportunities into meaningful outcomes.',
  },
  {
    label: 'Vision',
    text: 'Make real-time guidance a standard part of sales conversations so people can perform at their best when it matters most.',
  },
];

export function BeliefList({ includePurpose = false }: { includePurpose?: boolean }) {
  const items = includePurpose
    ? [
        BELIEFS[1],
        { label: 'Purpose', text: 'Close the gap between knowing what to do and doing it when it matters.' },
      ]
    : BELIEFS;
  return (
    <dl className="space-y-4">
      {items.map((b) => (
        <div key={b.label}>
          <dt className="font-comic text-[15px] tracking-[0.08em] text-[#1D4871]/70">{b.label.toUpperCase()}</dt>
          <dd className={body}>{b.text}</dd>
        </div>
      ))}
    </dl>
  );
}

const VALUES = [
  {
    title: 'The Agent Stays the Agent',
    lines: [
      'Technology should improve human performance, not replace human relationships or judgment.',
      'Sayso supports the person having the conversation. It does not take the conversation away from them.',
    ],
  },
  {
    title: 'Truth Over Flattery',
    lines: [
      'Honest, useful feedback creates improvement.',
      'We won’t tell customers what they want to hear at the expense of helping them get better.',
    ],
  },
  {
    title: 'Do It Right',
    lines: [
      'We care about the quality of what we build, the promises we make, and the experience we deliver.',
      'We’d rather solve the right problem well than release something simply to say we did.',
    ],
  },
];

export function ValuesGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {VALUES.map((v, i) => (
        <div key={v.title} className="rounded-[20px] bg-white p-5 shadow-card">
          <p className="font-comic text-[15px] tracking-[0.08em] text-[#1D4871]/60 mb-1">0{i + 1}</p>
          <h3 className="font-hero text-lg font-extrabold tracking-[-0.01em] text-[#10233A] mb-2">{v.title}</h3>
          {v.lines.map((line) => (
            <p key={line} className="text-sm text-[#1D4871]/80 leading-relaxed mt-2">{line}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

export function HowWeWork() {
  return (
    <>
      <p className={body}>
        We approach customers, partners, and teammates as collaborative thought partners. We listen, ask
        questions, challenge assumptions, and help people think through what will produce the best outcome.
      </p>
      <p className={body}>
        We don’t automatically agree with every request, and we don’t assume we always have the right answer.
        We want people to feel that we’re working alongside them, with a shared interest in getting things right,
        and to leave every interaction better informed, more confident, and more capable.
      </p>
    </>
  );
}
