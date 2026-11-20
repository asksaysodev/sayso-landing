'use client';

/**
 * Meta pixel, Vector, Leadsy and beehiiv attribution: advertising and visitor
 * identification tags. beehiiv's attribution.js sets an attribution_data cookie
 * (campaign source and referrer) for newsletter signups, so it waits for
 * consent too.
 * They render only after the visitor allows Advertising, and load right away
 * when consent arrives mid-visit (no reload). Ids and config are unchanged from
 * the old root layout tags.
 */
import Script from 'next/script';
import { metaPixelId } from '@/lib/config';

export function AdvertisingScripts() {
  return (
    <>
      {metaPixelId && (
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${metaPixelId}');
fbq('track', 'PageView');`,
          }}
        />
      )}
      {/* lazyOnload: visitor ID tags wait for the page's load event so they do
          not compete with the hero for bandwidth. */}
      <Script
        id="vtag-ai-js"
        src="https://r2.leadsy.ai/tag.js"
        data-pid="1nhqD1cnSGYVDeXLS"
        data-version="062024"
        strategy="lazyOnload"
      />
      <Script id="vector-pixel" strategy="lazyOnload">{`
          !function(e,r){try{if(e.vector)return void console.log("Vector snippet included more than once.");var t={};t.q=t.q||[];for(var o=["load","identify","on"],n=function(e){return function(){var r=Array.prototype.slice.call(arguments);t.q.push([e,r])}},c=0;c<o.length;c++){var a=o[c];t[a]=n(a)}if(e.vector=t,!t.loaded){var i=r.createElement("script");i.type="text/javascript",i.async=!0,i.src="https://cdn.vector.co/pixel.js";var l=r.getElementsByTagName("script")[0];l.parentNode.insertBefore(i,l),t.loaded=!0}}catch(e){console.error("Error loading Vector:",e)}}(window,document);
          vector.load("80c5a758-0d80-4bfc-a31f-ca301c7405b8");
        `}</Script>
      <Script
        id="beehiiv-attribution"
        src="https://subscribe-forms.beehiiv.com/attribution.js"
        strategy="lazyOnload"
      />
    </>
  );
}
