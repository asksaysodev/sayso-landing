'use client';

/**
 * Embeds a beehiiv v3 subscribe form. The v3 loader renders the form where its
 * <script> tag sits, so the tag is appended inside this wrapper on mount. The
 * wrapper check keeps React strict mode's second effect run (and remounts)
 * from injecting a second form. beehiiv's attribution.js is already loaded
 * site-wide in app/layout.tsx.
 */
import { useEffect, useRef } from 'react';

const LOADER_SRC = 'https://subscribe-forms.beehiiv.com/v3/loader.js';

interface BeehiivFormProps {
  formId: string;
  className?: string;
  'data-analytics-id'?: string;
}

export function BeehiivForm({ formId, className = '', 'data-analytics-id': dataAnalyticsId }: BeehiivFormProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || wrap.querySelector(`script[data-beehiiv-form="${formId}"]`)) return;

    const loader = document.createElement('script');
    loader.async = true;
    loader.src = LOADER_SRC;
    loader.setAttribute('data-beehiiv-form', formId);
    wrap.appendChild(loader);
  }, [formId]);

  return <div ref={wrapRef} className={className} data-analytics-id={dataAnalyticsId} />;
}
