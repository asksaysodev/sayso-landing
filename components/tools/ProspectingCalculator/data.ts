import type { CalculatorField, CalculatorInputs, FunnelStage } from './types';

/** Starting numbers only. The page tells agents to replace them with their own CRM or dialer data. */
export const DEFAULT_INPUTS: CalculatorInputs = {
  goalClients: 12,
  contactRate: 10,
  appointmentRate: 5,
  signRate: 40,
  closeRate: 80,
  weeks: 48,
  daysPerWeek: 5,
};

export const FIELDS: CalculatorField[] = [
  { key: 'goalClients', label: 'Closed clients you want this year', hint: 'Buyers and sellers combined', min: 1, max: 200, step: 1 },
  { key: 'contactRate', label: 'Dials that become a conversation', hint: 'Someone picks up and talks with you', suffix: '%', min: 1, max: 100, step: 1 },
  { key: 'appointmentRate', label: 'Conversations that become an appointment', hint: 'A booked meeting or consultation', suffix: '%', min: 1, max: 100, step: 1 },
  { key: 'signRate', label: 'Appointments that become a signed client', hint: 'Listing or buyer agreement signed', suffix: '%', min: 1, max: 100, step: 1 },
  { key: 'closeRate', label: 'Signed clients who close', hint: 'Some agreements fall through', suffix: '%', min: 1, max: 100, step: 1 },
  { key: 'weeks', label: 'Weeks you prospect per year', hint: 'Leave out vacation weeks', min: 1, max: 52, step: 1 },
  { key: 'daysPerWeek', label: 'Prospecting days per week', hint: 'Days you block time for calls', min: 1, max: 7, step: 1 },
];

/** Works backward from the yearly goal to the dials, conversations and appointments it takes. */
export function calculateFunnel(inputs: CalculatorInputs): FunnelStage[] {
  const pct = (v: number) => Math.max(v, 0.01) / 100;
  const closed = inputs.goalClients;
  const signed = closed / pct(inputs.closeRate);
  const appointments = signed / pct(inputs.signRate);
  const conversations = appointments / pct(inputs.appointmentRate);
  const dials = conversations / pct(inputs.contactRate);
  const weeks = Math.max(inputs.weeks, 1);
  const days = weeks * Math.max(inputs.daysPerWeek, 1);

  return [
    { label: 'Dials', perYear: dials, perWeek: dials / weeks, perDay: dials / days },
    { label: 'Conversations', perYear: conversations, perWeek: conversations / weeks, perDay: conversations / days },
    { label: 'Appointments', perYear: appointments, perWeek: appointments / weeks, perDay: appointments / days },
    { label: 'Signed clients', perYear: signed, perWeek: signed / weeks, perDay: signed / days },
    { label: 'Closed clients', perYear: closed, perWeek: closed / weeks, perDay: closed / days },
  ];
}
