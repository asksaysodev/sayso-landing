'use client';

import Image from 'next/image';
import { useState } from 'react';

/* ─── Chevron Icon ─── */
function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={`w-8 h-8 text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

/* ─── Mock case study data ─── */
const CASE_STUDIES = [
  {
    id: 'exp-realty',
    logo: '/exp realty.png',
    name: 'Marcus Rivera',
    role: 'Team Lead',
    brokerage: 'eXp Realty',
    teamName: 'Rivera Real Estate Group',
    agentCount: 12,
    market: 'Phoenix, AZ',
    crm: 'Follow Up Boss',
    dialer: 'Mojo Dialer',
    customerSince: 'October 2025',
    housesSold: '150 houses sold in 2025',
    heroQuote:
      '"Sayso turned our cold calls from guessing games into real conversations. My newer agents are booking like veterans now."',
    beforeSayso: {
      problem:
        'Marcus\'s team was making 200+ cold calls per day but converting less than 2% into appointments. Newer agents especially struggled when prospects threw objections — they\'d freeze, fumble, or rush through scripted responses that felt robotic.',
      triedBefore:
        'They tried weekly role-play sessions, printed objection-handling scripts taped to monitors, and even had senior agents listen in on calls to coach afterward.',
      whyItFailed:
        'Role-play didn\'t replicate the pressure of a live call. Scripts couldn\'t cover every scenario. Post-call coaching came too late — the moment was already gone.',
    },
    howTheyUseSayso: {
      leadType: 'Seller leads (expired listings, FSBOs)',
      callTypes: 'Cold calls and follow-ups',
      description:
        'Every agent on the team turns on Sayso before their power hour. When a homeowner pushes back — "I\'m not interested," "We already have an agent," "Now isn\'t the right time" — Sayso surfaces the next best question in real time. Agents stay in the conversation instead of retreating to a script.',
    },
    results: {
      appointmentsBefore: '3–4 per week (team avg)',
      appointmentsAfter: '9–11 per week (team avg)',
      setRateChange: '2.1% → 5.4%',
      confidenceImprovement: 'New agents report feeling "call-ready" within their first week instead of their first month',
      timeSaved: '~6 hrs/week on coaching and call review',
    },
    momentStory: {
      quote:
        '"One of my newer agents was on a cold call with an expired listing. The seller said, \'We already tried with another agent and it didn\'t sell.\' She would have normally said \'I understand\' and moved on. But Sayso prompted her to ask what specifically didn\'t work with the last agent. The seller opened up for 10 minutes. She booked the appointment."',
      agent: 'Marcus Rivera',
    },
  },
  {
    id: 'anderson-group',
    logo: '/anderson group.png',
    name: 'Sarah Anderson',
    role: 'Broker / Owner',
    brokerage: 'Anderson Group Realty',
    teamName: 'Anderson Group',
    agentCount: 6,
    market: 'Austin, TX',
    crm: 'KVCore',
    dialer: 'KVCore built-in dialer',
    customerSince: 'November 2025',
    housesSold: '89 houses sold in 2025',
    heroQuote:
      '"I can\'t sit on every call with every agent. Sayso is like having me whispering in their ear — except it\'s actually there when it matters."',
    beforeSayso: {
      problem:
        'Sarah built her brokerage on her own outbound skills, but scaling that to her team was the bottleneck. She was spending 10+ hours a week listening to recorded calls, leaving notes, and running 1-on-1 coaching sessions. Her agents still struggled to handle live objections independently.',
      triedBefore:
        'Invested in a call coaching platform that analyzed recordings after the fact. Also tried a shared Google Doc of "best responses" that agents could reference.',
      whyItFailed:
        'Post-call analysis meant agents kept making the same mistakes before getting feedback. The Google Doc was too slow to search during a live call — you can\'t scroll through a document while a prospect is talking.',
    },
    howTheyUseSayso: {
      leadType: 'Buyer and seller leads',
      callTypes: 'Cold calls, warm follow-ups, and re-engagements',
      description:
        'Sarah\'s agents use Sayso on every outbound session. For buyer leads, it helps navigate budget conversations and urgency. For seller leads, it handles pricing objections and commission discussions. Sarah herself uses Sayso on her own calls and says it still surfaces angles she hadn\'t considered.',
    },
    results: {
      appointmentsBefore: '5–6 per week (team total)',
      appointmentsAfter: '12–14 per week (team total)',
      setRateChange: '3.8% → 7.2%',
      confidenceImprovement: 'Agent self-reported call confidence up from 5.2/10 to 8.1/10 (internal survey)',
      timeSaved: '~10 hrs/week Sarah personally saved on coaching',
    },
    momentStory: {
      quote:
        '"I was on a follow-up call with a seller who\'d gone cold for 3 weeks. He hit me with \'We decided to just wait until spring.\' Normally I\'d accept that and schedule a callback. But Sayso prompted me to ask what specifically changes for them in spring. He paused, then admitted nothing really — they were just nervous. I booked the listing appointment right there."',
      agent: 'Sarah Anderson',
    },
  },
];

/* ─── Stat Card ─── */
function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border-2 border-[#1D4871] rounded-2xl p-4 v2-comic-shadow-sm text-center">
      <p className="text-2xl md:text-3xl font-bold text-[#1D4871] font-comic">{value}</p>
      <p className="text-xs md:text-sm text-[#1D4871]/70 font-bold mt-1">{label}</p>
    </div>
  );
}

/* ─── Section Heading ─── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="v2-pow-badge px-3 py-1 rounded-lg text-xs font-comic tracking-wider">
        {children}
      </span>
    </div>
  );
}

/* ─── Individual Case Study Card ─── */
function CaseStudySection({ study }: { study: (typeof CASE_STUDIES)[number] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id={study.id} className="scroll-mt-24">
      <div className="bg-white border-2 border-[#1D4871] rounded-3xl v2-comic-shadow overflow-hidden">
        {/* ─── Header (Clickable) ─── */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-left bg-[#1D4871] px-6 md:px-10 py-8 md:py-10 cursor-pointer hover:bg-[#1a3f63] transition-colors"
        >
          {/* Mobile: Logo + Houses Sold side by side */}
          <div className="flex md:hidden items-start justify-between gap-4 mb-4">
            <div className="bg-white rounded-2xl p-3 border-2 border-white/20 v2-comic-shadow-sm flex-shrink-0">
              <Image
                src={study.logo}
                alt={study.brokerage}
                width={64}
                height={64}
                className="h-16 w-16 object-contain"
              />
            </div>
            <div className="flex-1 text-right">
              <p className="text-2xl font-comic text-[#FFDE59] tracking-wide leading-tight">
                {study.housesSold}
              </p>
              <p className="text-xs text-white/50 uppercase tracking-widest font-bold mt-2">Customer since</p>
              <p className="text-white font-bold text-sm mt-0.5">{study.customerSince}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Logo - desktop only */}
            <div className="hidden md:block bg-white rounded-2xl p-3 border-2 border-white/20 v2-comic-shadow-sm flex-shrink-0">
              <Image
                src={study.logo}
                alt={study.brokerage}
                width={64}
                height={64}
                className="h-16 w-16 object-contain"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl md:text-3xl font-comic text-white tracking-wide">
                {study.brokerage}
              </h2>
              <p className="text-white/80 font-bold text-sm md:text-base mt-1">
                {study.name} &bull; {study.role}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {[
                  study.teamName,
                  `${study.agentCount} agents`,
                  study.market,
                  study.crm,
                  study.dialer,
                ].map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm md:text-base font-bold border border-white/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Houses sold - desktop only */}
            <div className="hidden md:block flex-shrink-0 text-right">
              <p className="text-5xl lg:text-6xl font-comic text-[#FFDE59] tracking-wide leading-tight">
                {study.housesSold}
              </p>
              <p className="text-base text-white/50 uppercase tracking-widest font-bold mt-4">Customer since</p>
              <p className="text-white font-bold text-lg mt-1">{study.customerSince}</p>
            </div>

            {/* Expand/Collapse Chevron */}
            <div className="flex-shrink-0 self-center hidden md:block">
              <ChevronIcon isOpen={isExpanded} />
            </div>
          </div>

          {/* Mobile: Show chevron and hint */}
          <div className="flex items-center justify-center gap-2 mt-4 md:hidden">
            <span className="text-white/60 text-sm font-bold">
              {isExpanded ? 'Tap to collapse' : 'Tap to expand'}
            </span>
            <ChevronIcon isOpen={isExpanded} />
          </div>
        </button>

        {/* ─── Collapsible Content ─── */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isExpanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {/* ─── Hero Quote ─── */}
          <div className="px-6 md:px-10 py-8 bg-[#FFDE59]/10 border-b-2 border-[#1D4871]">
            <blockquote className="text-xl md:text-2xl font-bold text-[#1D4871] leading-relaxed max-w-3xl">
              {study.heroQuote}
            </blockquote>
          </div>

          {/* ─── Key Metrics ─── */}
          <div className="px-6 md:px-10 py-8 border-b-2 border-[#1D4871]/10">
            <SectionLabel>RESULTS AT A GLANCE</SectionLabel>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <StatCard label="Appts/Week (After)" value={study.results.appointmentsAfter.split(' ')[0]} />
              <StatCard label="Set Rate" value={study.results.setRateChange} />
              <StatCard label="Time Saved/Week" value={study.results.timeSaved.replace('~', '')} />
              <StatCard
                label="Confidence Score"
                value={
                  study.results.confidenceImprovement.includes('8.1')
                    ? '8.1/10'
                    : 'Week 1 ready'
                }
              />
            </div>
          </div>

          {/* ─── Before Sayso ─── */}
          <div className="px-6 md:px-10 py-8 border-b-2 border-[#1D4871]/10">
            <SectionLabel>BEFORE SAYSO</SectionLabel>
            <div className="space-y-4 max-w-3xl">
              <div>
                <h4 className="font-bold text-[#1D4871] text-sm uppercase tracking-wide mb-1">The Problem</h4>
                <p className="text-[#1D4871]/80 leading-relaxed">{study.beforeSayso.problem}</p>
              </div>
              <div>
                <h4 className="font-bold text-[#1D4871] text-sm uppercase tracking-wide mb-1">What They Tried</h4>
                <p className="text-[#1D4871]/80 leading-relaxed">{study.beforeSayso.triedBefore}</p>
              </div>
              <div>
                <h4 className="font-bold text-[#1D4871] text-sm uppercase tracking-wide mb-1">Why It Didn&apos;t Work</h4>
                <p className="text-[#1D4871]/80 leading-relaxed">{study.beforeSayso.whyItFailed}</p>
              </div>
            </div>
          </div>

          {/* ─── How They Use Sayso ─── */}
          <div className="px-6 md:px-10 py-8 border-b-2 border-[#1D4871]/10">
            <SectionLabel>HOW THEY USE SAYSO</SectionLabel>
            <div className="max-w-3xl space-y-3">
              <div className="flex flex-wrap gap-2">
                {[study.howTheyUseSayso.leadType, study.howTheyUseSayso.callTypes].map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-4 py-1.5 rounded-full bg-[#2367EE]/10 text-[#2367EE] text-xs font-bold border border-[#2367EE]/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-[#1D4871]/80 leading-relaxed">{study.howTheyUseSayso.description}</p>
            </div>
          </div>

          {/* ─── The Moment ─── */}
          <div className="px-6 md:px-10 py-8 border-b-2 border-[#1D4871]/10">
            <SectionLabel>THE MOMENT</SectionLabel>
            <div className="max-w-3xl">
              {/* Speech-bubble style quote */}
              <div className="relative bg-[#F4F4F5] border-2 border-[#1D4871] rounded-2xl p-6 v2-comic-shadow-sm">
                <p className="text-[#1D4871] leading-relaxed italic">{study.momentStory.quote}</p>
                {/* Bubble tail */}
                <div className="absolute -bottom-3 left-10 w-6 h-6 bg-[#F4F4F5] border-b-2 border-r-2 border-[#1D4871] rotate-45" />
              </div>
              <p className="mt-5 ml-10 font-bold text-[#1D4871] text-sm">— {study.momentStory.agent}</p>
            </div>
          </div>

          {/* ─── Detailed Results ─── */}
          <div className="px-6 md:px-10 py-8">
            <SectionLabel>FULL RESULTS</SectionLabel>
            <div className="max-w-3xl">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b-2 border-[#1D4871]">
                    <th className="py-2 text-[#1D4871] font-bold uppercase tracking-wide text-xs">Metric</th>
                    <th className="py-2 text-[#1D4871] font-bold uppercase tracking-wide text-xs">Result</th>
                  </tr>
                </thead>
                <tbody className="text-[#1D4871]/80">
                  <tr className="border-b border-[#1D4871]/10">
                    <td className="py-3 font-bold">Appointments / Week (Before)</td>
                    <td className="py-3">{study.results.appointmentsBefore}</td>
                  </tr>
                  <tr className="border-b border-[#1D4871]/10">
                    <td className="py-3 font-bold">Appointments / Week (After)</td>
                    <td className="py-3">{study.results.appointmentsAfter}</td>
                  </tr>
                  <tr className="border-b border-[#1D4871]/10">
                    <td className="py-3 font-bold">Appointment Set Rate</td>
                    <td className="py-3">{study.results.setRateChange}</td>
                  </tr>
                  <tr className="border-b border-[#1D4871]/10">
                    <td className="py-3 font-bold">Confidence Improvement</td>
                    <td className="py-3">{study.results.confidenceImprovement}</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold">Time Saved</td>
                    <td className="py-3">{study.results.timeSaved}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Page ─── */
export function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <div className="max-w-[1200px] mx-auto px-6 pt-24 md:pt-32 pb-10 md:pb-14 text-center">
        <span className="v2-pow-badge px-4 py-1.5 rounded-lg text-sm font-comic tracking-wider inline-block mb-6">
          CASE STUDIES
        </span>
        <h1 className="text-5xl md:text-7xl font-comic text-[#1D4871] tracking-wide leading-tight">
          Real agents.<br />Real results.
        </h1>
        <p className="text-[#1D4871]/70 text-base md:text-lg max-w-xl mx-auto mt-4 leading-relaxed">
          See how teams use Sayso to win more appointments, ramp faster, and stay confident on every call.
        </p>
      </div>

      {/* Case Studies */}
      <div className="max-w-[1200px] mx-auto px-6 pb-16 md:pb-24 space-y-12 md:space-y-16">
        {CASE_STUDIES.map((study) => (
          <CaseStudySection key={study.id} study={study} />
        ))}
      </div>

      {/* CTA */}
      <div className="max-w-[1200px] mx-auto px-6 pb-16 md:pb-24 text-center">
        <div className="bg-[#1D4871] border-2 border-[#1D4871] rounded-3xl v2-comic-shadow px-6 md:px-10 py-12 md:py-16">
          <h2 className="text-3xl md:text-5xl font-comic text-white tracking-wide mb-4">
            Ready to win your next call?
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-lg mx-auto mb-8">
            Join teams already using Sayso to book more appointments and ramp agents faster.
          </p>
          <a
            href="/v3#get-started"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#FFDE59] text-[#1D4871] font-bold text-base md:text-lg v2-comic-btn border-2 border-[#1D4871]"
          >
            Get Started
          </a>
        </div>
      </div>
    </main>
  );
}
