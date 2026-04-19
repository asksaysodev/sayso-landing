'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Check, MessageCircle, Clock, Users } from 'lucide-react';
import { Footer } from '@/components/landing/Footer';
import { AdPageCTAButton } from '@/components/landing/AdPageCTAButton';
import { StepVisualStartSayso, StepVisualPrompts } from '@/components/landing/ThreeStepsSection/StepVisuals';

function HandwrittenNote() {
  return (
    <div
      className="rounded-2xl shadow-sm border border-[#E0D9C0] px-5 py-5"
      style={{ background: '#FFFEF0' }}
    >
      {/* Handwritten header */}
      <p
        className="font-handwriting text-[#1D4871] mb-4 pb-2 border-b-2 border-[#1D4871]/20"
        style={{ fontSize: '20px' }}
      >
        Call Notes
      </p>
      {/* Notes */}
      <ul className="space-y-3">
        <li className="flex gap-2.5">
          <span className="text-[#2367EE] font-bold flex-shrink-0">✓</span>
          <span className="font-handwriting text-[#1D4871] leading-snug" style={{ fontSize: '17px' }}>
            Retiring to Florida
          </span>
        </li>
        <li className="flex gap-2.5">
          <span className="text-[#2367EE] font-bold flex-shrink-0">✓</span>
          <span className="font-handwriting text-[#1D4871] leading-snug" style={{ fontSize: '17px' }}>
            Within 3 months
          </span>
        </li>
        <li className="flex gap-2.5">
          <span className="text-[#2367EE] font-bold flex-shrink-0">✓</span>
          <span className="font-handwriting text-[#1D4871] leading-snug" style={{ fontSize: '17px' }}>
            Might need to sell first
          </span>
        </li>
      </ul>
    </div>
  );
}

export function IsaAdPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero ── */}
      <section className="pt-10 pb-8 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <div className="flex justify-center mb-8">
            <Link href="/" aria-label="Sayso home">
              <Image
                src="/logo-pos-horizontal.png"
                alt="Sayso"
                width={100}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
          </div>
          <h1 className="font-comic text-3xl sm:text-4xl text-[#1D4871] leading-tight mb-2">
            Don&apos;t miss the details
          </h1>
          <p className="font-comic text-2xl sm:text-3xl text-[#1D4871] mb-6 leading-snug">
            that could book the appointment
          </p>
          <p className="text-base text-[#1D4871]/70 mb-8 leading-relaxed">
            Stay organized, never miss the important details, and have cleaner lead hand-offs to your agents.
          </p>
          <AdPageCTAButton location="isa-hero" />
        </div>
      </section>

      {/* ── Trust strip ── */}
      <div className="max-w-xl mx-auto px-6 pb-10">
        <div className="flex items-center gap-3 text-sm text-[#1D4871]/60">
          <div className="h-px flex-1 bg-[#1D4871]/15" />
          <span className="whitespace-nowrap text-center">
            Built for ISAs who make the calls and own the pipeline.
          </span>
          <div className="h-px flex-1 bg-[#1D4871]/15" />
        </div>
      </div>

      {/* ── Problem ── */}
      <section className="max-w-xl mx-auto px-6 py-8">
        <h2 className="font-comic text-2xl sm:text-3xl text-[#1D4871] mb-1 leading-snug text-center">
          Your job is the phone. All day.
        </h2>
        <p className="font-comic text-2xl sm:text-3xl text-[#1D4871] text-center mb-6 leading-snug">
          Call after call. Conversation after conversation.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          {/* Left: narrative */}
          <div className="space-y-4">
            <p className="text-sm text-[#1D4871]/70 italic">
              Most of the time you already know what to say.
            </p>
            <p className="text-sm text-[#1D4871]/70 italic">
              But after dozens of calls it&apos;s easy to slip into autopilot.
            </p>

            <ul className="space-y-3">
              {[
                "And that's when things get missed.",
                'Details your agent will need later.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check size={16} className="text-[#2367EE] mt-0.5 flex-shrink-0" />
                  <span className="text-[#1D4871]/75 text-sm italic">{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-sm text-[#1D4871]/70 italic">
              And later you realize the question you should have asked.
            </p>
          </div>

          {/* Right: handwritten note */}
          <HandwrittenNote />
        </div>
      </section>

      {/* ── Mid-hook ── */}
      <section className="max-w-xl mx-auto px-6 py-6 text-center">
        <p className="font-comic text-2xl sm:text-3xl text-[#1D4871] leading-snug">
          ISAs don&apos;t struggle with scripts.
        </p>
        <p className="font-comic text-2xl sm:text-3xl text-[#1D4871] leading-snug mt-1">
          They struggle with keeping every conversation organized.
        </p>
        <div className="mt-4 space-y-1 text-sm text-[#1D4871]/65 italic">
          <p>Notes get rushed.</p>
          <p>Important details get missed.</p>
          <p>And the handoff to the agent isn&apos;t always clear.</p>
        </div>
      </section>

      {/* ── How Sayso helps ── */}
      <section className="bg-[#f0f2f5] py-10">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-comic text-2xl sm:text-3xl text-[#1D4871] mb-6">
            Sayso supports you during the call.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="px-4 pt-4 pb-2">
                <h3 className="font-comic text-lg text-[#1D4871] mb-1">1. Start Sayso</h3>
                <p className="text-xs text-[#1D4871]/60">Open the app before your next call block</p>
              </div>
              <div className="h-36 mx-3 mb-3 rounded-xl overflow-hidden">
                <StepVisualStartSayso />
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="px-4 pt-4 pb-2">
                <h3 className="font-comic text-lg text-[#1D4871] mb-1">2. Stay organized</h3>
                <p className="text-xs text-[#1D4871]/60">It captures key details from every conversation automatically</p>
              </div>
              <div className="h-36 mx-3 mb-3 rounded-xl overflow-hidden">
                <StepVisualPrompts />
              </div>
            </div>
          </div>

          {/* ── Benefits ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            {[
              {
                icon: <MessageCircle size={18} />,
                title: 'Better conversations',
                desc: 'Support when you need different questions to ask.',
              },
              {
                icon: <Clock size={18} />,
                title: 'Real time support',
                desc: 'Always be the expert on every call.',
              },
              {
                icon: <Users size={18} />,
                title: 'Hand off better',
                desc: 'Your notes are already organized when the call ends.',
              },
            ].map((b) => (
              <div key={b.title} className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-2">
                <div className="w-9 h-9 rounded-full bg-[#2367EE]/10 flex items-center justify-center text-[#2367EE]">
                  {b.icon}
                </div>
                <h3 className="font-semibold text-[#1D4871] text-sm leading-tight">{b.title}</h3>
                <p className="text-xs text-[#1D4871]/65 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section className="max-w-xl mx-auto px-6 py-10 text-center">
        <h2 className="font-comic text-2xl sm:text-3xl text-[#1D4871] mb-3">
          Win the Moment
        </h2>
        <p className="text-[#1D4871]/70 mb-8 text-base">
          Better conversations lead to better appointments.
        </p>
        <AdPageCTAButton location="isa-footer" />
      </section>

      <Footer />
    </div>
  );
}
