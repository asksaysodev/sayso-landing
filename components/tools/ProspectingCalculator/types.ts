export interface CalculatorInputs {
  /** Closed clients (buyers or sellers) the agent wants this year. */
  goalClients: number;
  /** % of dials that turn into a real conversation. */
  contactRate: number;
  /** % of conversations that turn into a booked appointment. */
  appointmentRate: number;
  /** % of appointments that turn into a signed client. */
  signRate: number;
  /** % of signed clients that close. */
  closeRate: number;
  /** Weeks per year the agent prospects. */
  weeks: number;
  /** Prospecting days per week. */
  daysPerWeek: number;
}

/** Field values as typed, so a field can be cleared and retyped. */
export type CalculatorDraft = Record<keyof CalculatorInputs, string>;

export type CalculatorField = {
  key: keyof CalculatorInputs;
  label: string;
  hint: string;
  suffix?: string;
  min: number;
  max: number;
  step: number;
};

export interface FunnelStage {
  label: string;
  perYear: number;
  perWeek: number;
  perDay: number;
}
