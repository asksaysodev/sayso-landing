import { MapPin, CalendarCheck } from 'lucide-react';
import { LPMAMA_CONFIG, type DemoConversation } from '../data';

/** The LPMAMA signals pill shown on each conversation row (count + letters + icons). */
export function SignalsPill({ conversation }: { conversation: DemoConversation }) {
  const captured = new Set(conversation.captures.map((c) => c.topic));
  const count = conversation.insights.length;
  const hasPulse = !!conversation.pulse;
  const hasAppointment = conversation.appointmentBooked === true;

  return (
    <div className="conv-signals">
      {count > 0 && (
        <>
          <span className="conv-signals-count">{count}</span>
          <span className="conv-signals-div" />
        </>
      )}
      <div className="conv-signals-letters">
        {LPMAMA_CONFIG.map((f, i) => {
          const isCaptured = captured.has(f.key);
          return (
            <span
              key={i}
              className="conv-signals-letter"
              style={{
                color: isCaptured ? 'var(--sayso-indigo)' : 'var(--sayso-indigo-washed)',
                fontWeight: isCaptured ? 700 : 400,
              }}
            >
              {f.letter}
            </span>
          );
        })}
      </div>
      {hasPulse && (
        <>
          <span className="conv-signals-div" />
          <span className="conv-signals-icon">
            <MapPin size={13} />
          </span>
        </>
      )}
      {hasAppointment && (
        <>
          <span className="conv-signals-div" />
          <span className="conv-signals-icon">
            <CalendarCheck size={13} />
          </span>
        </>
      )}
    </div>
  );
}
