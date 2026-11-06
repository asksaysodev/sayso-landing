'use client';

/**
 * SaysoWidget: a faithful, props-driven rebuild of the Sayso desktop widget
 * for marketing pages. Renders the call alert or the full widget. See
 * types.ts for the API and data.ts for ready-made static views. Import
 * presets from `@/components/SaysoWidget/data` (not from this client module)
 * so server components receive plain objects.
 *
 *   <WidgetScaler width={604}>
 *     <SaysoWidget {...WIDGET_PRESETS.cues} />
 *   </WidgetScaler>
 */
import { inter } from './font';
import { cx } from '@/lib/utils/cx';
import styles from './SaysoWidget.module.css';
import { makeBind } from './bind';
import { CallAlert } from './components/CallAlert';
import { WidgetBody } from './components/WidgetBody';
import { useWidgetFit } from './components/WidgetScaler';
import type { SaysoWidgetProps } from './types';

export default function SaysoWidget(props: SaysoWidgetProps) {
  const fit = useWidgetFit();
  const interactive = props.interactive ?? false;

  if (props.view === 'alert') {
    return (
      <div className={cx(inter.variable, styles.root, !interactive && styles.static, props.className)} aria-hidden={interactive ? undefined : true}>
        <CallAlert
          leaving={props.alertLeaving}
          nudge={props.alertNudge}
          bind={makeBind(interactive, props.highlight, props.onAction)}
        />
      </div>
    );
  }

  return <WidgetBody {...props} stacked={props.stacked ?? fit.stacked} />;
}

export { WidgetScaler } from './components/WidgetScaler';
export type { LeadType, SaysoWidgetProps, WidgetControl } from './types';
