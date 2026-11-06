/**
 * Compare section: how Sayso and three common training methods cover the
 * same five needs. `y` = yes, `n` = no, `p` = partly.
 */

export type Mark = 'y' | 'n' | 'p';

export interface CompareRow {
  mark: Mark;
  label: string;
}

export interface CompareMethod {
  name: string;
  when: string;
  highlight?: boolean;
  rows: CompareRow[];
}

export const METHODS: CompareMethod[] = [
  {
    name: 'Sayso',
    when: 'During the call',
    highlight: true,
    rows: [
      { mark: 'y', label: 'Help while the prospect is talking' },
      { mark: 'y', label: 'Follows what was just said' },
      { mark: 'y', label: 'Your own scripts' },
      { mark: 'y', label: 'Local market data mid-call' },
      { mark: 'y', label: 'Captures what the prospect told you' },
    ],
  },
  {
    name: 'Role-play',
    when: 'Before the call',
    rows: [
      { mark: 'n', label: 'Help while the prospect is talking' },
      { mark: 'n', label: 'Follows what was just said' },
      { mark: 'y', label: 'Your own scripts' },
      { mark: 'n', label: 'Local market data mid-call' },
      { mark: 'n', label: 'Captures what the prospect told you' },
    ],
  },
  {
    name: 'Call recording review',
    when: 'After the call',
    rows: [
      { mark: 'n', label: 'Help while the prospect is talking' },
      { mark: 'p', label: 'Follows what was just said' },
      { mark: 'n', label: 'Your own scripts' },
      { mark: 'n', label: 'Local market data mid-call' },
      { mark: 'p', label: 'Captures what the prospect told you' },
    ],
  },
  {
    name: 'Printed scripts',
    when: 'If you find the page',
    rows: [
      { mark: 'p', label: 'Help while the prospect is talking' },
      { mark: 'n', label: 'Follows what was just said' },
      { mark: 'y', label: 'Your own scripts' },
      { mark: 'n', label: 'Local market data mid-call' },
      { mark: 'n', label: 'Captures what the prospect told you' },
    ],
  },
];
