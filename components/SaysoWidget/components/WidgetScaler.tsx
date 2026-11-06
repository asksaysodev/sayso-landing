'use client';

/**
 * Scaling frame for the widget. Renders its children at their true design
 * width, then scales them down uniformly to fit the container: never above
 * 1, never distorted. With `narrowWidth`, containers narrower than
 * `stackBelow` switch to the narrow design width and tell the widget to stack
 * Playbook under the column. With `maxHeight`, the frame has a fixed height and
 * the content is also scaled to fit it and centered vertically.
 *
 * The frame reserves `initialHeight` (or `maxHeight`) before it measures so
 * the page does not shift when the widget appears.
 */
import { createContext, useCallback, useContext, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/hooks/useIsomorphicLayoutEffect';

interface WidgetScalerProps {
  /** Design width of the content in px, e.g. 604 for the widget column, 1010 with Playbook beside it. */
  width: number;
  /** Design width used below `stackBelow`. Turns on the stacked widget layout. */
  narrowWidth?: number;
  /** Container width (px) under which `narrowWidth` applies. Default 760. */
  stackBelow?: number;
  /** Fixed frame height. Content scales to fit and is centered vertically. */
  maxHeight?: number;
  /**
   * Also fit the window's height: the scaled content is at most
   * `window.innerHeight - fitViewport` px tall. Tracks window resizes.
   */
  fitViewport?: number;
  /** Height reserved before measuring (px or any CSS length). Ignored when `maxHeight` is set. */
  initialHeight?: number | string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

interface WidgetFit {
  /** True when the frame is in its narrow layout. */
  stacked: boolean;
}

const WidgetFitContext = createContext<WidgetFit>({ stacked: false });

/** Read the frame's layout decision from inside the widget. */
export function useWidgetFit(): WidgetFit {
  return useContext(WidgetFitContext);
}

export function WidgetScaler({
  width,
  narrowWidth,
  stackBelow = 760,
  maxHeight,
  fitViewport,
  initialHeight = 0,
  className,
  style,
  children,
}: WidgetScalerProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const sensorRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [designWidth, setDesignWidth] = useState(width);
  const [ready, setReady] = useState(false);

  // Reads the container width and content height, then writes the transform
  // and frame height straight to the DOM so resizes stay in step frame by frame.
  // Switching design width goes through state, so the change lands in a React
  // commit rather than inside the ResizeObserver callback.
  const measure = useCallback(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    const cw = outer.clientWidth;
    if (!cw) return;
    const narrow = !!narrowWidth && cw < stackBelow;
    const target = narrow && narrowWidth ? narrowWidth : width;
    if (target !== designWidth) {
      setDesignWidth(target);
      return;
    }
    const ih = inner.offsetHeight || 1;
    const byViewport = fitViewport === undefined ? 1 : Math.max(0.3, (window.innerHeight - fitViewport) / ih);
    const scale = Math.min(1, byViewport, cw / target, maxHeight ? maxHeight / ih : 1);
    inner.style.transform = `translateX(-50%) scale(${scale})`;
    inner.style.top = maxHeight ? `${(maxHeight - ih * scale) / 2}px` : '0px';
    outer.style.height = `${maxHeight || ih * scale}px`;
    setReady(true);
  }, [width, narrowWidth, stackBelow, maxHeight, fitViewport, designWidth]);

  // Re-measure after every render: the widget's content may have changed.
  useIsomorphicLayoutEffect(measure);

  useEffect(() => {
    // The sensor tracks the container width and never changes height, and the
    // inner box tracks content height. Neither is resized by `measure`, so the
    // observer never loops.
    const ro = new ResizeObserver(() => measure());
    if (sensorRef.current) ro.observe(sensorRef.current);
    if (innerRef.current) ro.observe(innerRef.current);
    if (fitViewport !== undefined) window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure, fitViewport]);

  const stacked = !!narrowWidth && designWidth === narrowWidth && narrowWidth !== width;

  return (
    <div
      ref={outerRef}
      className={className}
      style={{ position: 'relative', width: '100%', height: maxHeight ?? initialHeight, ...style }}
    >
      <div ref={sensorRef} aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 0 }} />
      <div
        ref={innerRef}
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          width: designWidth,
          transformOrigin: '50% 0',
          transform: 'translateX(-50%)',
          visibility: ready ? 'visible' : 'hidden',
        }}
      >
        <WidgetFitContext.Provider value={{ stacked }}>{children}</WidgetFitContext.Provider>
      </div>
    </div>
  );
}
