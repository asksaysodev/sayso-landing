import Image from 'next/image';
import { Hourglass, ChartColumn, ChevronLeft, ChevronRight } from 'lucide-react';
import { COACH_TIPS, WEEKLY_ACTIVITY } from '../data';

/** The dashboard cards row: Coach Tips, Time Remaining, and Activity. */
export function DashboardTop() {
  const maxActivity = Math.max(...WEEKLY_ACTIVITY.map((d) => d.value), 1);

  return (
    <div className="dashboard-cards-container">
      {/* Coach Tips */}
      <div className="informative-card-container dashboard-cards-left-column tips-widget-container">
        <div className="tips-widget-header-title">
          <Image className="tips-widget-logo" src="/logos/logo-pos-horizontal.png" alt="Sayso" width={76} height={22} />
          <h3>Coach Tips</h3>
        </div>
        <div className="tips-cards">
          {COACH_TIPS.map((tip, i) => (
            <div key={tip.title} className="tips-widget-card">
              <div className="tips-widget-card-icon-wrap">{i + 1}</div>
              <h4 className="tips-widget-card-title">{tip.title}</h4>
              {tip.body.map((p, j) => (
                <p key={j} className="tips-widget-card-text">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className="tips-widget-lines">
          <span className="tips-widget-line active" />
          <span className="tips-widget-line" />
          <span className="tips-widget-line" />
        </div>
      </div>

      <div className="dashboard-cards-right-column">
        {/* Time Remaining */}
        <div className="informative-card-container">
          <div className="info-card-head">
            <Hourglass className="info-card-icon" size={18} />
            Time Remaining
          </div>
          <div className="tr-value">
            30<span>hours</span>
          </div>
          <div className="tr-bar">
            <div className="tr-bar-fill" style={{ width: '2%' }} />
          </div>
          <div className="tr-sub">0% used of your 30 plan hours</div>
        </div>

        {/* Activity */}
        <div className="informative-card-container">
          <div className="act-head-row">
            <div className="info-card-head">
              <ChartColumn className="info-card-icon" size={18} />
              Activity
            </div>
            <div className="act-week">
              <button aria-label="Previous week">
                <ChevronLeft size={16} />
              </button>
              Jun 8 - Jun 14
              <button aria-label="Next week">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="act-bars">
            {WEEKLY_ACTIVITY.map((d, i) => {
              const h = d.value > 0 ? Math.max(8, (d.value / maxActivity) * 60) : 4;
              return (
                <div key={i} className="act-bar-col">
                  <span className="act-bar" data-empty={d.value === 0} style={{ height: h }} />
                  <span className="act-day">{d.day}</span>
                </div>
              );
            })}
          </div>
          <div className="act-total">39 total minutes this week</div>
        </div>
      </div>
    </div>
  );
}
