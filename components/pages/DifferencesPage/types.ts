/** When a tool helps in the life of a call. */
export type Timing = 'during' | 'before' | 'after' | 'beforeAfter';

/** One row of the tool-by-tool comparison. */
export interface ToolRow {
  tool: string;
  timing: Timing;
  agent: string;
  leader: string;
}
