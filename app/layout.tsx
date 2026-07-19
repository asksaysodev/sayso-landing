import type { Metadata } from 'next'
import { Manrope, Bangers } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext'
import { headerNav } from '@/lib/navigation'
import { siteUrl, gtmId, metaPixelId } from '@/lib/config'
import './globals.css'

// Load Manrope for hero text
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-manrope',
  display: 'swap',
})

const bangers = Bangers({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bangers',
  display: 'swap',
})

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sayso',
  alternateName: 'Sayso for Real Estate Agents',
  url: siteUrl,
  logo: `${siteUrl}/logos/logo-pos-horizontal.png`,
  description: 'Sayso helps real estate agents turn messy prospecting conversations into booked appointments.',
  slogan: 'Fix where real estate prospecting breaks down',
  knowsAbout: [
    'real estate prospecting',
    'real estate agents',
    'real estate lead conversion',
    'objection handling',
    'live call coaching for real estate agents',
  ],
  sameAs: [
    'https://www.linkedin.com/company/asksayso',
    'https://www.instagram.com/asksayso',
  ],
};

const webSiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Sayso',
  alternateName: 'Sayso Real Estate',
  url: siteUrl,
  description: 'Sayso helps real estate agents turn messy prospecting conversations into booked appointments.',
  publisher: {
    '@type': 'Organization',
    name: 'Sayso',
    url: siteUrl,
  },
};

const siteNavigationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Site Navigation',
  itemListElement: [
    {
      '@type': 'SiteNavigationElement',
      position: 1,
      name: 'Home',
      url: siteUrl,
    },
    ...headerNav.flatMap((section, sIdx) =>
      section.links.map((link, lIdx) => ({
        '@type': 'SiteNavigationElement' as const,
        position: 2 + sIdx * 10 + lIdx,
        name: link.label,
        url: `${siteUrl}${link.href}`,
      })),
    ),
    {
      '@type': 'SiteNavigationElement',
      position: 100,
      name: 'Book a Demo',
      url: `${siteUrl}/demo`,
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Sayso: Fix Where Real Estate Prospecting Breaks Down',
    template: '%s | Sayso',
  },
  description: 'Sayso helps real estate agents turn messy prospecting conversations into booked appointments.',
  openGraph: {
    siteName: 'Sayso',
    type: 'website',
    images: [{ url: '/images/og-default.png', width: 1200, height: 630, alt: 'Sayso | Fix Where Real Estate Prospecting Breaks Down' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: '/logos/logo-sayso.png',
    apple: '/logos/logo-sayso.png',
    shortcut: '/logos/logo-sayso.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${bangers.variable}`}>
      <head>
      {gtmId && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
          }}
        />
      )}
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
      <Script
        id="vtag-ai-js"
        src="https://r2.leadsy.ai/tag.js"
        data-pid="1nhqD1cnSGYVDeXLS"
        data-version="062024"
        strategy="afterInteractive"
      />
      {/*
        Calendly booking widget loaded once globally: the styles + script power
        both the inline scheduler on /demo and the "Book a Demo" popup triggered
        from buttons across the site (see lib/calendly.ts).
      */}
      {/* Warm up the connection to calendly.com so the popup iframe loads
          faster. assets.calendly.com needs no hint: the stylesheet link below
          already opens that connection in the same parse pass. */}
      <link rel="preconnect" href="https://calendly.com" />
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />
      <Script
        id="calendly-widget"
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
      </head>
      <body>
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        {metaPixelId && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationJsonLd) }}
        />
        <Script id="vector-pixel" strategy="afterInteractive">{`
          !function(e,r){try{if(e.vector)return void console.log("Vector snippet included more than once.");var t={};t.q=t.q||[];for(var o=["load","identify","on"],n=function(e){return function(){var r=Array.prototype.slice.call(arguments);t.q.push([e,r])}},c=0;c<o.length;c++){var a=o[c];t[a]=n(a)}if(e.vector=t,!t.loaded){var i=r.createElement("script");i.type="text/javascript",i.async=!0,i.src="https://cdn.vector.co/pixel.js";var l=r.getElementsByTagName("script")[0];l.parentNode.insertBefore(i,l),t.loaded=!0}}catch(e){console.error("Error loading Vector:",e)}}(window,document);
          vector.load("80c5a758-0d80-4bfc-a31f-ca301c7405b8");
        `}</Script>
        <DemoCalendarProvider>
          {children}
        </DemoCalendarProvider>
        <Analytics />
        <SpeedInsights />
        <Script
          src="https://subscribe-forms.beehiiv.com/attribution.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
