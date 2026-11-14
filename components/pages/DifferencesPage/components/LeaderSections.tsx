/**
 * Body sections of /differences for team leaders: the timing split, the
 * tool-by-tool table, the notes comparison, the live demo, what leaders get,
 * support, proof and a short leader FAQ.
 */

import { eyebrow, panel, section, wash } from '@/components/landing/HomeShared/styles';
import { FaqList } from '@/components/pages/FaqList';
import { HomeLiveDemo } from '@/components/landing/HomeLiveDemo';
import { DrumWheel } from './DrumWheel';
import {
  AVAILABLE_TODAY,
  COMING_SOON,
  COMPARE_DRUM_WORDS,
  LEADER_FAQ,
  PROOF_STATS,
  SAYSO_NOTES,
  SAYSO_ROW,
  SUMMARY_LINES,
  SUPPORT_ITEMS,
  TIMING,
  TIMING_LABEL,
  TOOL_ROWS,
} from '../data';
import type { Timing, ToolRow } from '../types';
import { sectionTitle, sectionWrap } from '../styles';

const lead = 'mx-auto mt-5 max-w-3xl text-[1.1rem] leading-relaxed text-[#556B86]';
const yellowTag =
  'inline-block whitespace-nowrap rounded-full bg-[#FFDE59] px-2.5 py-0.5 text-xs font-bold text-[#1D4871]';

function TimingPill({ timing }: { timing: Timing }) {
  const during = timing === 'during';
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-bold ${
        during ? 'bg-[#FFDE59] text-[#1D4871]' : 'bg-[#D7DEE1] text-[#556B86]'
      }`}
    >
      {TIMING_LABEL[timing]}
    </span>
  );
}

/** 2. Everything else works after the call. */
export function TimingSection() {
  return (
    <section id="how" className={`${wash} ${section}`}>
      <div className={sectionWrap}>
        <h2 className={`${sectionTitle} mx-auto max-w-4xl`}>
          Everything else works after the call. Sayso works during it.
        </h2>
        <div className="mx-auto mt-12 grid max-w-[960px] grid-cols-1 gap-4 text-left md:grid-cols-2">
          <div className={`${panel} border-[#2367EE] p-6`}>
            <span className={yellowTag}>Sayso lives here</span>
            <p className="mt-3 font-extrabold text-[#10233A]">The call is happening</p>
            <p className="mt-2 leading-relaxed text-[#556B86]">{TIMING.sayso}</p>
          </div>
          <div className="rounded-[20px] border border-[rgba(16,35,58,0.12)] bg-[#EEF1F4] p-6">
            <span className="inline-block rounded-full bg-[#D7DEE1] px-2.5 py-0.5 text-xs font-bold text-[#556B86]">
              Everyone else works here
            </span>
            <p className="mt-3 font-extrabold text-[#7f92aa]">The call is over</p>
            <p className="mt-2 leading-relaxed text-[#556B86]">{TIMING.everyoneElse}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ToolCard({ row, highlight }: { row: ToolRow; highlight?: boolean }) {
  return (
    <div className={`${panel} p-5 ${highlight ? '!border-2 !border-[#2367EE]' : ''}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className={`font-extrabold ${highlight ? 'text-[#2367EE]' : 'text-[#10233A]'}`}>{row.tool}</h3>
        <TimingPill timing={row.timing} />
      </div>
      <dl className="mt-3 space-y-2 text-sm">
        <div>
          <dt className="font-bold text-[#10233A]">What agents get</dt>
          <dd className="text-[#556B86]">{row.agent}</dd>
        </div>
        <div>
          <dt className="font-bold text-[#10233A]">What leaders get</dt>
          <dd className="text-[#556B86]">{row.leader}</dd>
        </div>
      </dl>
    </div>
  );
}

/** 4. Tool-by-tool comparison: a table on desktop, stacked cards on mobile. */
export function ComparisonSection() {
  const rows = [SAYSO_ROW, ...TOOL_ROWS];
  return (
    <section id="compare" className={`${section} scroll-mt-20`}>
      <div className={sectionWrap}>
        <h2
          className={`${sectionTitle} mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-[0.25em] gap-y-2`}
        >
          <span>Doesn’t</span>
          <DrumWheel words={COMPARE_DRUM_WORDS} />
          <span>already do this?</span>
        </h2>

        <div className="mx-auto mt-12 hidden max-w-[1100px] overflow-hidden rounded-[20px] border border-[rgba(16,35,58,0.12)] bg-white text-left md:block">
          <table className="w-full text-sm">
            <thead className="bg-[#F4F4F5] text-[#10233A]">
              <tr>
                <th scope="col" className="px-4 py-3 font-extrabold">Tool</th>
                <th scope="col" className="px-4 py-3 font-extrabold">
                  When it helps <strong className="font-black underline decoration-[#FFDE59] decoration-4">most</strong>
                </th>
                {['What agents get', 'What leaders get'].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-extrabold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const sayso = i === 0;
                return (
                  <tr
                    key={row.tool}
                    className={sayso ? 'bg-[#2367EE]/[0.07] outline outline-2 -outline-offset-2 outline-[#2367EE]' : 'border-t border-[#D7DEE1]'}
                  >
                    <th scope="row" className={`px-4 py-3.5 font-extrabold ${sayso ? 'text-[#2367EE]' : 'text-[#10233A]'}`}>
                      {row.tool}
                    </th>
                    <td className="px-4 py-3.5">
                      <TimingPill timing={row.timing} />
                    </td>
                    <td className="px-4 py-3.5 text-[#556B86]">{row.agent}</td>
                    <td className="px-4 py-3.5 text-[#556B86]">{row.leader}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-10 flex flex-col gap-3 text-left md:hidden">
          {rows.map((row, i) => (
            <ToolCard key={row.tool} row={row} highlight={i === 0} />
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl font-bold text-[#10233A]">
          Sayso is the only tool on this list that’s working while your agent is still on the phone.
        </p>
      </div>
    </section>
  );
}

/** 5. A call summary vs. Sayso notes, as text. */
export function NotesSection() {
  return (
    <section className={`${wash} ${section}`}>
      <div className={sectionWrap}>
        <h2 className={`${sectionTitle} mx-auto max-w-4xl`}>
          A summary of what was said isn’t the same as notes your agent can use.
        </h2>
        <div className="mx-auto mt-12 grid max-w-[960px] grid-cols-1 gap-4 text-left md:grid-cols-2">
          <div className="rounded-[20px] border border-[rgba(16,35,58,0.12)] bg-[#EEF1F4] p-6">
            <h3 className="font-extrabold text-[#7f92aa]">Typical call summary</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[#556B86]">
              {SUMMARY_LINES.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[20px] border-2 border-[#2367EE] bg-white p-6">
            <h3 className="font-extrabold text-[#2367EE]">Sayso notes</h3>
            <dl className="mt-3 space-y-1.5">
              {SAYSO_NOTES.map(({ label, value }) => (
                <div key={label} className="grid grid-cols-[110px_1fr] gap-3">
                  <dt className="font-bold text-[#10233A]">{label}</dt>
                  <dd className="text-[#556B86]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-[#556B86]">
          Add to CRM and move on to the next. Nobody needs to re-listen to the recording.
        </p>
      </div>
    </section>
  );
}

/** 6. What it looks like on a live call: the homepage's interactive demo. */
export function DailyUseSection() {
  return (
    <section className={section}>
      <div className={sectionWrap}>
        <h2 className={sectionTitle}>What it looks like on a live call.</h2>
      </div>
      <HomeLiveDemo />
    </section>
  );
}

/** 7. What leaders and coaches get, today and coming soon. */
export function LeadersGetSection() {
  return (
    <section className={`${wash} ${section}`}>
      <div className={sectionWrap}>
        <h2 className={sectionTitle}>What you and your coaches get.</h2>
        <div className="mx-auto mt-12 grid max-w-[960px] grid-cols-1 gap-4 text-left md:grid-cols-2">
          <div className={`${panel} p-6`}>
            <h3 className="font-extrabold text-[#10233A]">Currently</h3>
            <ul className="mt-3 space-y-2.5">
              {AVAILABLE_TODAY.map((item) => (
                <li key={item} className="leading-relaxed text-[#556B86]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${panel} p-6`}>
            <h3 className="font-extrabold text-[#10233A]">Coming soon</h3>
            <ul className="mt-3 space-y-2.5">
              {COMING_SOON.map((item) => (
                <li key={item} className="leading-relaxed text-[#556B86]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <blockquote className="mx-auto mt-10 max-w-3xl rounded-[20px] border-l-4 border-[#FFDE59] bg-white px-6 py-5 text-left font-hero text-xl font-extrabold leading-snug text-[#1D4871]">
          Your coaches stop spending hours re-listening to calls and start coaching the patterns.
        </blockquote>
      </div>
    </section>
  );
}

/** 8. Support: office hours, leadership meetings and a founder group chat. */
export function SupportSection() {
  return (
    <section className={section}>
      <div className={sectionWrap}>
        <h2 className={sectionTitle}>Support from the people who built it.</h2>
        <div className="mx-auto mt-12 grid max-w-[1100px] grid-cols-1 gap-4 text-left md:grid-cols-3">
          {SUPPORT_ITEMS.map(({ title, body }) => (
            <div key={title} className={`${panel} p-6`}>
              <h3 className="font-extrabold text-[#10233A]">{title}</h3>
              <p className="mt-2 leading-relaxed text-[#556B86]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 9. Proof from Anderson Real Estate Group: activity numbers only. */
export function ProofSection() {
  return (
    <section className={`${wash} ${section}`}>
      <div className={sectionWrap}>
        <h2 className={sectionTitle}>What happened on our own team.</h2>
        <p className={lead}>
          Sayso was built and tested on the Anderson Real Estate Group, a 50-agent team. From January through
          mid-August 2026, the team had already passed its full-year 2025 totals:
        </p>
        <div className="mx-auto mt-10 grid max-w-[880px] grid-cols-1 gap-4 sm:grid-cols-3">
          {PROOF_STATS.map(({ value, label }) => (
            <div key={label} className={`${panel} p-6`}>
              <p className="font-hero text-[40px] font-extrabold leading-none tracking-[-0.03em] text-[#1D4871]">
                {value}
              </p>
              <p className="mt-2 font-semibold text-[#556B86]">{label}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-sm text-[#7f92aa]">
          January–mid-August 2026 year to date vs. all of 2025, Anderson Real Estate Group.
          <br />
          <a
            href="/case-studies/areg-case-study.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#1D4871] underline-offset-2 hover:underline"
            data-analytics-id="link-case-study-differences"
          >
            Read the full case study
          </a>
        </p>
      </div>
    </section>
  );
}

/** Short FAQ for leaders. */
export function LeaderFaqSection() {
  return (
    <section className={`${wash} ${section}`}>
      <div className={`${sectionWrap} max-w-[800px]`}>
        <span className={eyebrow}>FAQ</span>
        <h2 className={`${sectionTitle} mt-5`}>Questions leaders ask.</h2>
        <div className="mt-10 text-left">
          <FaqList items={LEADER_FAQ} />
        </div>
      </div>
    </section>
  );
}

