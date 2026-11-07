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
 * `onSuccess` fires once after a successful submit with the email and phone the
 * visitor typed (read at submit time, since the embed hides the form after).
 */

import { useEffect, useRef } from 'react';

export interface SsFormValues {
  email?: string;
  phone?: string;
}

declare global {
  interface Window {
    SSFormLoaded?: Record<string, boolean>;
  }
}

interface SsFormEmbedProps {
  /** Sure Send embed code, e.g. "LmIZLgSzGPfy" */
  embedCode: string;
  /** Optional id for the wrapper, e.g. an in-page anchor target. */
  id?: string;
  className?: string;
  /** Called once when the embed shows its success state. */
  onSuccess?: (values: SsFormValues) => void;
}

export default function SsFormEmbed({ embedCode, id, className, onSuccess }: SsFormEmbedProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;

  // Read the fields on submit, then watch for the embed's success panel to appear.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let values: SsFormValues = {};
    let done = false;
    const onSubmit = () => {
      values = {
        email: root.querySelector<HTMLInputElement>('input[type="email"]')?.value.trim() || undefined,
        phone: root.querySelector<HTMLInputElement>('input[type="tel"]')?.value.trim() || undefined,
      };
    };
    const observer = new MutationObserver(() => {
      const success = root.querySelector<HTMLElement>('.ss-form-success');
      if (!done && success && success.style.display === 'block') {
        done = true;
        onSuccessRef.current?.(values);
      }
    });
    root.addEventListener('submit', onSubmit, true);
    observer.observe(root, { subtree: true, childList: true, attributes: true, attributeFilter: ['style'] });
    return () => {
      root.removeEventListener('submit', onSubmit, true);
      observer.disconnect();
    };
  }, []);

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

  return (
    <div id={id} ref={rootRef} className={className}>
      <div id={`ss-form-${embedCode}`} />
    </div>
  );
}
