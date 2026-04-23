'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Check, MessageCircle, Zap, FileText } from 'lucide-react';
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
          <span className="text-[#2367EE] font-bold flex-shrink-0" style={{ fontFamily: 'inherit' }}>✓</span>
          <span className="font-handwriting text-[#1D4871] leading-snug" style={{ fontSize: '17px' }}>
            What change are you hoping to make by moving?
          </span>
        </li>
        <li className="font-handwriting text-[#1D4871]/70 leading-snug" style={{ fontSize: '17px' }}>
          Before we go too far, I&apos;d like to just confirm one...
        </li>
        <li className="font-handwriting text-[#1D4871]/70 leading-snug" style={{ fontSize: '17px' }}>
          - Motivation: Retiring to FL...
        </li>
        <li className="font-handwriting text-[#1D4871]/70 leading-snug" style={{ fontSize: '17px' }}>
          - Timeline: 3-6 months...
        </li>
      </ul>
    </div>
  );
}

export function AgentAdPage() {
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
            Know what to say
          </h1>
          <p className="font-comic text-2xl sm:text-3xl text-[#1D4871] mb-6 leading-snug">
            when the conversation goes off script.
          </p>
          <p className="text-base text-[#1D4871]/70 mb-8 leading-relaxed">
            Real-time guidance during prospecting calls. Ask better questions, handle objections,
            and book appointments that actually happen.
          </p>
          <AdPageCTAButton location="agent-hero" />
        </div>
      </section>

      {/* ── Trust strip ── */}
      <div className="max-w-xl mx-auto px-6 pb-10">
        <div className="flex items-center gap-3 text-sm text-[#1D4871]/60">
          <div className="hidden sm:block h-px flex-1 bg-[#1D4871]/15" />
          <span className="text-center">
            Built for agents who prospect and want to convert more appointments.
          </span>
          <div className="hidden sm:block h-px flex-1 bg-[#1D4871]/15" />
        </div>
      </div>

      {/* ── Problem ── */}
      <section className="max-w-xl mx-auto px-6 py-8">
        <h2 className="font-comic text-2xl sm:text-3xl text-[#1D4871] mb-1 leading-snug text-center">
          You&apos;re making the calls.
        </h2>
        <p className="font-comic text-2xl sm:text-3xl text-[#1D4871] text-center mb-6 leading-snug">
          but not booking the appointments
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          {/* Left: narrative */}
          <div className="space-y-4">
            <p className="text-sm text-[#1D4871]/70 italic">
              The problem happens during the call.
            </p>

            <ul className="space-y-3">
              {['You start strong.', 'Then the prospect says something unexpected.'].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check size={16} className="text-[#2367EE] mt-0.5 flex-shrink-0" />
                  <span className="text-[#1D4871]/75 text-sm italic">{item}</span>
                </li>
              ))}
              <li className="flex items-start gap-2">
                <Check size={16} className="text-[#2367EE] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[#1D4871]/75 text-sm italic">Now you&apos;re thinking:</span>
                  <ul className="mt-1.5 space-y-1.5 pl-1">
                    {['What should I ask next?', 'Did I miss something important?'].map((sub) => (
                      <li key={sub} className="flex items-start gap-2">
                        <Check size={13} className="text-[#2367EE]/60 mt-0.5 flex-shrink-0" />
                        <span className="text-[#1D4871]/60 text-sm italic">{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>

            <p className="text-sm text-[#1D4871]/70 italic">
              And after the call, you realize the questions you should&apos;ve asked.
            </p>
          </div>

          {/* Right: handwritten note */}
          <HandwrittenNote />
        </div>
      </section>

      {/* ── Mid-hook ── */}
      <section className="max-w-xl mx-auto px-6 py-6 text-center">
        <p className="font-comic text-2xl sm:text-3xl text-[#1D4871] leading-snug">
          Most agents don&apos;t have a lead problem.
        </p>
        <p className="font-comic text-2xl sm:text-3xl text-[#1D4871] leading-snug mt-1">
          They have a conversation problem.
        </p>
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
                <p className="text-xs text-[#1D4871]/60">Open the app before your prospecting block</p>
              </div>
              <div className="h-36 mx-3 mb-3 rounded-xl overflow-hidden">
                <StepVisualStartSayso />
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="px-4 pt-4 pb-2">
                <h3 className="font-comic text-lg text-[#1D4871] mb-1">2. Sayso listens</h3>
                <p className="text-xs text-[#1D4871]/60">It detects what the prospect says and surfaces the right prompts in real time</p>
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
                title: 'Know what to ask next',
                desc: 'Guidance appears when conversations go off script.',
              },
              {
                icon: <Zap size={18} />,
                title: 'Handle objections calmly',
                desc: 'Prompts help you slow down and respond clearly.',
              },
              {
                icon: <FileText size={18} />,
                title: 'Capture notes automatically',
                desc: 'Your conversation details stay organized.',
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
        <AdPageCTAButton location="agent-footer" />
      </section>

      <Footer />
    </div>
  );
}
