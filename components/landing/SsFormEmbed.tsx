'use client';

/**
 * SsFormEmbed
 *
 * Renders a Sure Send (suresend.ai / ssforms.com) form using their JavaScript
 * embed. The embed script fetches the form config and injects the form markup
 * directly into the target div, so it works cross-domain (unlike the iframe
 * embed, which the form host blocks via X-Frame-Options).
 *
 * Pass the form's embed code (the id in the snippet, e.g. "LmIZLgSzGPfy").
 */

import { useEffect } from 'react';

declare global {
  interface Window {
    SSFormLoaded?: Record<string, boolean>;
  }
}

interface SsFormEmbedProps {
  /** Sure Send embed code, e.g. "LmIZLgSzGPfy" */
  embedCode: string;
  className?: string;
}

export default function SsFormEmbed({ embedCode, className }: SsFormEmbedProps) {
  useEffect(() => {
    // The embed script self-guards against double init via window.SSFormLoaded.
    // Clear the flag so the form re-renders on client-side navigation back here.
    if (window.SSFormLoaded) {
      delete window.SSFormLoaded[embedCode];
    }

    const script = document.createElement('script');
    script.src = `https://suresend.ai/forms/embed/${embedCode}.js`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
      if (window.SSFormLoaded) {
        delete window.SSFormLoaded[embedCode];
      }
    };
  }, [embedCode]);

  return <div id={`ss-form-${embedCode}`} className={className} />;
}
