'use client';

import { Check, TrendingUp, Users, Zap } from 'lucide-react';
import { Footer } from '@/components/landing/Footer';
import { AdPageCTAButton } from '@/components/landing/AdPageCTAButton';
import { PersonaAdHero } from '@/components/landing/PersonaAdShared/PersonaAdHero';
import { PersonaStepWidget } from '@/components/landing/PersonaAdShared/PersonaStepWidget';
import { HomeTeams } from '@/components/landing/HomeTeams';

export function BrokerAdPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero ── */}
      <PersonaAdHero
        persona="broker"
        label="BROKERS"
        headline="Give every agent a coach on every call."
        subheadline="Sayso prompts your agents on live prospecting calls. New agents get productive sooner, and you have real support to recruit with and a reason for agents to stay."
        proof="By the time a call is reviewed, the opportunity to change its outcome is gone."
      />

      {/* ── Trust strip ── */}
      <div className="max-w-xl mx-auto px-6 pb-10">
        <div className="flex items-center gap-3 text-sm text-[#1D4871]/60">
          <div className="hidden sm:block h-px flex-1 bg-[#1D4871]/15" />
          <span className="text-center">
            Built for brokers who recruit, develop and keep agents.
          </span>
          <div className="hidden sm:block h-px flex-1 bg-[#1D4871]/15" />
        </div>
      </div>

      {/* ── Problem ── */}
      <section className="max-w-xl mx-auto px-6 py-8 text-center">
        <h2 className="font-comic text-2xl sm:text-3xl text-[#1D4871] mb-3 leading-snug">
          Leads are getting wasted because conversations break down.
        </h2>
        <ul className="space-y-3">
          {[
            "You generate a ton of leads but agents struggle to convert them",
            "Agents aren't asking for the appointment enough",
            "Appointments aren't qualified so everyone's spinning their wheels with no result",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Check size={16} className="text-[#2367EE] mt-0.5 flex-shrink-0" />
              <span className="text-[#1D4871]/75 text-sm italic">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Mid-hook ── */}
      <section className="max-w-xl mx-auto px-6 py-4 text-center">
        <p className="font-comic text-xl sm:text-2xl text-[#1D4871]">
          Agents aren&apos;t asking the right questions and you&apos;re missing opportunities every day
        </p>
      </section>

      {/* ── How Sayso helps ── */}
      <section className="bg-[#f0f2f5] py-10">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-comic text-2xl sm:text-3xl text-[#1D4871] mb-6">
            How Sayso helps during calls
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="px-4 pt-4 pb-2">
                <h3 className="font-comic text-lg text-[#1D4871] mb-1">1. Turn Sayso on</h3>
                <p className="text-xs text-[#1D4871]/60">Agents start Sayso when they begin calling</p>
              </div>
              <div className="h-36 mx-3 mb-3 rounded-xl overflow-hidden">
                <PersonaStepWidget preset="bar" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="px-4 pt-4 pb-2">
                <h3 className="font-comic text-lg text-[#1D4871] mb-1">2. Get live guidance</h3>
                <p className="text-xs text-[#1D4871]/60">Real-time prompts keep the conversation on track</p>
              </div>
              <div className="h-36 mx-3 mb-3 rounded-xl overflow-hidden">
                <PersonaStepWidget preset="cues" />
              </div>
            </div>
          </div>

          {/* ── Benefits ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            {[
              {
                icon: <Zap size={18} />,
                title: 'Ramp new agents faster',
                desc: 'Get agents into activity and production faster',
              },
              {
                icon: <TrendingUp size={18} />,
                title: 'See better performance',
                desc: 'Coaching now scales without your key leaders needing to micro manage',
              },
              {
                icon: <Users size={18} />,
                title: 'Get more out of your team',
                desc: 'Confidence and conversion rate go up across the team.',
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

      {/* ── Teams and brokerages ── */}
      <HomeTeams className="bg-[#F4F4F5]" analyticsSuffix="broker" />

      {/* ── Closing CTA ── */}
      <section className="max-w-xl mx-auto px-6 py-10 text-center">
        <h2 className="font-comic text-2xl sm:text-3xl text-[#1D4871] mb-8">
          Maximize the potential in the leads you&apos;re already generating.
        </h2>
        <AdPageCTAButton location="broker-footer" />
      </section>

      <Footer />
    </div>
  );
}
