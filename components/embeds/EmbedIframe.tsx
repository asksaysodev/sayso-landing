'use client';

/**
 * EmbedIframe
 *
 * A third-party iframe inside an EmbedFrame: the skeleton covers it until the
 * iframe fires its load event. The iframe's own className should fix its height
 * (the measured loaded height), so the box never changes size.
 */

import { useEffect, useRef, useState } from 'react';
import { EmbedFrame } from './EmbedFrame';
import { crossOriginFrameLoaded } from './crossOriginFrameLoaded';

type EmbedIframeProps = React.IframeHTMLAttributes<HTMLIFrameElement> & {
  title: string;
  frameClassName?: string;
  compactSkeleton?: boolean;
  'data-test-id'?: string;
  'data-analytics-id'?: string;
};

export function EmbedIframe({ frameClassName = '', compactSkeleton, onLoad, ...iframeProps }: EmbedIframeProps) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLIFrameElement>(null);

  // The iframe is in the server HTML, so it can finish loading before React
  // hydrates and attaches onLoad.
  useEffect(() => {
    if (ref.current && crossOriginFrameLoaded(ref.current)) setLoaded(true);
  }, []);

  return (
    <EmbedFrame loaded={loaded} className={frameClassName} compactSkeleton={compactSkeleton}>
      <iframe
        {...iframeProps}
        ref={ref}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
      />
    </EmbedFrame>
  );
}
