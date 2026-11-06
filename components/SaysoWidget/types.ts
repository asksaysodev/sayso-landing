/**
 * Public API of the Sayso widget rebuild.
 *
 * The widget is fully props-driven: it renders whatever state it is given and
 * reports clicks through `onAction` / `onDotSelect`. A page can render a fixed
 * picture of one moment (leave `interactive` off) or drive a live demo by
 * holding the state itself and updating these props.
 *
 * Wrap it in `WidgetScaler` so it renders at its true size and scales down to
 * fit the container.
 */

/** Lead type shown in the lead pill. B = Buyer, S = Seller. */
export type LeadType = 'B' | 'S';

/** Every clickable control on the widget, reported through `onAction`. */
export type WidgetControl =
  | 'start' // Start on the call alert
  | 'dismiss' // X on the call alert
  | 'lead' // lead type pill
  | 'zip' // Zip Code pill, and the minimize button on Pulse
  | 'reset' // orange reset button (live only)
  | 'stop' // red stop button (live only)
  | 'cues' // check button: shows or hides the cues and LPMAMA panel
  | 'play' // list button, and the minimize button on Playbook
  | 'copy'; // copy captured notes

/** One Playbook script: a title and sections of lines. `[Placeholders]` render highlighted. */
export interface PlaybookScript {
  title: string;
  sections: { heading: string; lines: string[] }[];
}

/** Sample market data shown in the Pulse panel. */
export interface MarketSample {
  zip: string;
  place: string;
  daysOnMarket: number;
  priceTrend: string;
  pricePerSqft: number;
  inventory: string;
}

export interface SaysoWidgetProps {
  /** `alert` shows the "Sayso identified a call" alert, `widget` the toolbar and panels. Default `widget`. */
  view?: 'alert' | 'widget';
  /** Plays the alert's exit animation (used right before switching to `widget`). */
  alertLeaving?: boolean;
  /** Increment to shake the alert, e.g. when someone presses X during the demo. */
  alertNudge?: number;

  /** Lead type in the lead pill and the Playbook script shown. Default `B`. */
  lead?: LeadType;
  /** Live call: shows reset, stop and the timer. */
  live?: boolean;
  /** Timer text, e.g. `0:02:14`. */
  time?: string;

  /** Cues and LPMAMA panel open (the check button). */
  insightOpen?: boolean;
  /** Cues, newest first. Up to four are shown; the first one is highlighted as new. */
  cues?: string[];
  /** Six flags, one per LPMAMA letter. A captured letter takes its color. */
  captured?: boolean[];
  /** Index of the LPMAMA letter whose note bubble is shown (only while the cues panel is open). */
  note?: number | null;
  /** Draws a mouse cursor next to the note bubble, for static pictures. */
  showCursor?: boolean;

  /** Pulse panel open. */
  pulseOpen?: boolean;
  /** Text in the zip pill. Defaults to the sample zip when Pulse is open, otherwise "Zip Code". */
  zipText?: string;
  /** Count the Pulse numbers up from zero when the panel opens. */
  animatePulse?: boolean;

  /** Playbook panel open. */
  playbookOpen?: boolean;
  /** Playbook stacks under the column instead of beside it. Defaults to what WidgetScaler decides. */
  stacked?: boolean;

  /** Toolbar plays the alert-to-toolbar morph when it mounts. */
  morph?: boolean;
  /** Yellow ring around one control (guided demo). */
  highlight?: WidgetControl | null;
  /** Yellow ring around one LPMAMA letter (guided demo). */
  highlightDot?: number | null;
  /** Yellow outline around the cues panel (guided demo). */
  watchInsight?: boolean;

  /**
   * Clickable widget. When false (default) the widget is a picture: hidden from
   * assistive tech, no pointer cursor and no pointer events.
   */
  interactive?: boolean;
  /** Called when a control is clicked. */
  onAction?: (control: WidgetControl) => void;
  /** Called when an LPMAMA letter is clicked or tapped. */
  onDotSelect?: (index: number) => void;
  className?: string;
}
