'use client';

/**
 * Inline beehiiv v3 subscribe form, rendered as a plain iframe in the page HTML.
 *
 * beehiiv's loader.js fetches the script, then the form config, then creates the
 * iframe and keeps it hidden until the iframe reports its size: three round trips
 * after hydration before anything shows. Rendering the iframe directly lets the
 * browser start loading the form with the page.
 *
 * Kept from the loader:
 * - Sizing: the iframe posts `beehiiv:child-loaded`; we answer with
 *   `beehiiv:resize` and apply the height it sends back in `beehiiv:styles`.
 * - Attribution: `referrer` (double-encoded, as the loader sends it) and any
 *   utm_* params on the current URL.
 * Submissions still go through beehiiv's own form, so form-based automations fire.
 */
import { useEffect, useRef } from 'react';
import { siteUrl } from '@/lib/config';

const BEEHIIV_ORIGIN = 'https://subscribe-forms.beehiiv.com';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
/** Height of the slim layout (email field + button) so nothing shifts while it loads. */
const INITIAL_HEIGHT = 47;

interface BeehiivFormProps {
  formId: string;
  /** Site path of the page the form is on, e.g. '/resources/script-book/'. Sent as the referrer. */
  pagePath: string;
  layout?: 'slim' | 'regular';
  title?: string;
  className?: string;
  'data-analytics-id'?: string;
}

function formSrc(formId: string, layout: string, referrer: string, utm?: URLSearchParams) {
  const url = new URL(`${BEEHIIV_ORIGIN}/v3/forms/${formId}`);
  if (layout !== 'regular') url.searchParams.set('layout', layout);
  utm?.forEach((value, key) => url.searchParams.set(key, value));
  url.searchParams.set('referrer', encodeURIComponent(referrer));
  return url.toString();
}

export function BeehiivForm({
  formId,
  pagePath,
  layout = 'slim',
  title = 'Subscribe form',
  className = '',
  'data-analytics-id': dataAnalyticsId,
}: BeehiivFormProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const referrer = `${siteUrl}${pagePath}`;

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Carry utm_* params through like the loader does. Only visitors who arrive
    // with them pay for a reload of the iframe.
    const pageParams = new URLSearchParams(window.location.search);
    const utm = new URLSearchParams();
    UTM_KEYS.forEach((key) => {
      const value = pageParams.get(key);
      if (value) utm.set(key, value);
    });
    if (utm.toString()) iframe.src = formSrc(formId, layout, referrer, utm);

    const requestSize = () => iframe.contentWindow?.postMessage({ type: 'beehiiv:resize' }, BEEHIIV_ORIGIN);

    const onMessage = (e: MessageEvent) => {
      if (e.source !== iframe.contentWindow || e.origin !== BEEHIIV_ORIGIN) return;
      const msg = e.data as { type?: string; payload?: { height?: string } } | null;
      if (msg?.type === 'beehiiv:child-loaded') requestSize();
      if (msg?.type === 'beehiiv:styles' && msg.payload?.height) iframe.style.height = msg.payload.height;
    };

    window.addEventListener('message', onMessage);
    window.addEventListener('resize', requestSize);
    return () => {
      window.removeEventListener('message', onMessage);
      window.removeEventListener('resize', requestSize);
    };
  }, [formId, layout, referrer]);

  return (
    <div className={className} data-analytics-id={dataAnalyticsId}>
      <iframe
        ref={iframeRef}
        src={formSrc(formId, layout, referrer)}
        title={title}
        scrolling="no"
        className="block w-full border-0"
        style={{ height: INITIAL_HEIGHT }}
      />
    </div>
  );
}
