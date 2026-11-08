/**
 * For teams: three value props for team leaders and brokers, then a proof
 * band with the Anderson Real Estate Group result (styled like the case study
 * PDF's pace card), a case study link and Book a demo. Used on the homepage,
 * /broker and /sales-leader.
 */
import Link from 'next/link';
import { SectionHead } from '../HomeShared/SectionHead';
import { focusRing, muted, panel, section, soft, wrap } from '../HomeShared/styles';
import { TeamDemoButton } from './components/TeamDemoButton';
import { TEAM_PROOF, TEAM_VALUE_PROPS } from './data';

/**
 * `analyticsSuffix` keeps GTM ids distinct per page: the homepage omits it
 * (`cta-team-section-demo`), /broker passes 'broker' (`cta-team-section-demo-broker`).
 */
export function HomeTeams({ className = '', analyticsSuffix }: { className?: string; analyticsSuffix?: string }) {
  const suffix = analyticsSuffix ? `-${analyticsSuffix}` : '';
  return (
    <section id="teams" className={`${section} ${className}`} aria-labelledby="teams-title">
      <div className={wrap}>
        <SectionHead
          id="teams-title"
          eyebrow="FOR TEAMS"
          title={
            <>
              Coach the whole team. <span className={soft}>On every call.</span>
            </>
          }
        />

        <ul className="grid grid-cols-1 gap-5 min-[861px]:grid-cols-3">
          {TEAM_VALUE_PROPS.map((prop, i) => (
            <li key={prop.title} className={`${panel} p-6`}>
              <h3 className="flex items-baseline gap-2.5 font-hero text-[18.5px] font-bold leading-[1.3] text-[#10233A]">
                <span aria-hidden="true" className="font-comic text-2xl font-normal text-[#2367EE]">
                  {i + 1}
                </span>
                {prop.title}
              </h3>
              <p className={`mt-2 text-[15px] leading-relaxed ${muted}`}>{prop.body}</p>
            </li>
          ))}
        </ul>

        <div
          className={`${panel} mt-5 grid grid-cols-1 items-center gap-7 border-l-[5px] !border-l-[#FFDE59] p-7 min-[861px]:grid-cols-[1.1fr_1fr_auto] min-[861px]:gap-10 min-[861px]:px-10`}
        >
          <div>
            <p className={`text-[12px] font-bold uppercase tracking-[0.12em] ${muted}`}>{TEAM_PROOF.label}</p>
            <p className="mt-1.5 font-hero text-[22px] font-extrabold leading-snug tracking-[-0.01em] text-[#10233A]">
              {TEAM_PROOF.team}
            </p>
            <p className={`mt-1 text-[15px] ${muted}`}>{TEAM_PROOF.detail}</p>
          </div>

          <div>
            <p className="font-hero text-[17px] font-bold text-[#1D4871]">{TEAM_PROOF.statLabel}</p>
            <p className="mt-1 flex items-baseline gap-2.5">
              <span className="font-hero text-[52px] font-extrabold leading-none tracking-[-0.03em] text-[#1D4871] tabular-nums underline decoration-[#FFDE59] decoration-[6px] underline-offset-[6px]">
                {TEAM_PROOF.stat}
              </span>
              <span className="text-[15px] font-bold text-[#1D4871]">{TEAM_PROOF.statUnit}</span>
            </p>
            <p className={`mt-3 text-[15px] ${muted}`}>{TEAM_PROOF.sub}</p>
          </div>

          <div className="flex flex-col items-start gap-3 min-[861px]:items-end">
            <TeamDemoButton analyticsId={`cta-team-section-demo${suffix}`} />
            <Link
              href={TEAM_PROOF.href}
              data-analytics-id={`link-team-case-study${suffix}`}
              className={`rounded text-sm font-bold text-[#2367EE] ${focusRing}`}
            >
              {TEAM_PROOF.linkText} &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
