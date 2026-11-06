/**
 * Internal helper that turns a widget control into button props: click
 * handler, focusability and the guided-demo highlight. Static widgets get
 * unfocusable buttons with no handlers.
 */
import type { ButtonHTMLAttributes } from 'react';
import { cx } from '@/lib/utils/cx';
import styles from './SaysoWidget.module.css';
import type { WidgetControl } from './types';

export type ControlProps = ButtonHTMLAttributes<HTMLButtonElement> & { 'data-tour-target'?: 'true' };
export interface BindOptions {
  /** Never show the guided-demo ring on this button (e.g. a second button for the same control). */
  noHighlight?: boolean;
  /** The button sits in a collapsed panel: keep it out of the tab order. */
  hidden?: boolean;
}

export type BindControl = (control: WidgetControl, className: string, options?: BindOptions) => ControlProps;

export function makeBind(
  interactive: boolean,
  highlight: WidgetControl | null | undefined,
  onAction?: (control: WidgetControl) => void,
): BindControl {
  return (control, className, options = {}) => {
    const isTarget = !options.noHighlight && highlight === control;
    return {
      type: 'button',
      className: cx(className, isTarget && styles.target),
      tabIndex: interactive && !options.hidden ? undefined : -1,
      onClick: interactive ? () => onAction?.(control) : undefined,
      ...(isTarget ? { 'data-tour-target': 'true' as const } : {}),
    };
  };
}
