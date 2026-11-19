import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext'
import { CalendlyBookingTracker } from '@/components/CalendlyBookingTracker'
import { headerNav, primaryNav, resourcesFeatured } from '@/lib/navigation'
import { siteUrl, gtmId, metaPixelId } from '@/lib/config'
import { SAYSO_ORG_ID } from '@/lib/seo/schema'
import { AUTHORS } from '@/lib/authors'

/** Analytics only load on the production domain. */
const PRODUCTION_HOSTNAME = 'www.asksayso.com'
import './globals.css'

// Load Manrope for hero text (800 for the homepage headlines)
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': SAYSO_ORG_ID,
  name: 'Sayso',
  legalName: 'AskSayso, Inc.',
  alternateName: ['AskSayso', 'Ask Sayso', 'Sayso Real Estate'],
  url: siteUrl,
  logo: `${siteUrl}/logos/logo-pos-horizontal.png`,
  description: 'Sayso improves sales execution with real-time conversation guidance for real estate agents, teams, and brokerages.',
  slogan: 'Fix where real estate prospecting breaks down',
  knowsAbout: [
    'real estate prospecting',
    'real estate agents',
    'real estate lead conversion',
    'objection handling',
    'live call coaching for real estate agents',
  ],
  foundingDate: '2025-08',
  founder: {
    '@type': 'Person',
    '@id': `${siteUrl}/author/kuvaal-patel/#person`,
    name: 'Kuvaal Patel',
    url: `${siteUrl}/author/kuvaal-patel/`,
    sameAs: AUTHORS['kuvaal-patel'].sameAs,
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'PO Box 244',
    addressLocality: 'Tolleson',
    addressRegion: 'AZ',
    postalCode: '85353',
    addressCountry: 'US',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'support@asksayso.com',
    telephone: '+1-623-321-3061',
  },
  sameAs: [
    'https://www.linkedin.com/company/asksayso',
    'https://www.instagram.com/asksayso',
    'https://www.youtube.com/@asksayso',
    'https://www.crunchbase.com/organization/sayso-124c',
    'https://www.facebook.com/61591170566423',
    // Google Business Profile (Ask Sayso, Inc)
    'https://maps.google.com/?cid=13566026824632094354',
  ],
};

const webSiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Sayso',
  alternateName: ['Sayso Real Estate', 'AskSayso'],
  url: siteUrl,
  description: 'Sayso helps real estate agents turn messy prospecting conversations into booked appointments.',
  publisher: {
    '@type': 'Organization',
    '@id': SAYSO_ORG_ID,
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
    ...[...primaryNav.filter((link) => !link.href.includes('#')), ...resourcesFeatured.filter((link) => !link.external)].map((link, i) => ({
      '@type': 'SiteNavigationElement' as const,
      position: 2 + i,
      name: link.label,
      url: `${siteUrl}${link.href}`,
    })),
    ...headerNav.flatMap((section, sIdx) =>
      section.links.map((link, lIdx) => ({
        '@type': 'SiteNavigationElement' as const,
        position: 10 + sIdx * 10 + lIdx,
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
    <html lang="en" className={manrope.variable}>
      <head>
      {/* GTM (and the GA4 tag inside it) loads only on www.asksayso.com, so Vercel
          previews and localhost stay out of the live GA4 property. */}
      {gtmId && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});if(w.location.hostname!=='${PRODUCTION_HOSTNAME}')return;var f=d.getElementsByTagName(s)[0],
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
      {/* lazyOnload: visitor ID tags wait for the page's load event so they do
          not compete with the hero for bandwidth. GTM above stays afterInteractive
          so GA4 still records visitors who leave quickly. */}
      <Script
        id="vtag-ai-js"
        src="https://r2.leadsy.ai/tag.js"
        data-pid="1nhqD1cnSGYVDeXLS"
        data-version="062024"
        strategy="lazyOnload"
      />
      {/*
        Calendly booking widget loaded once globally: the script powers both the
        inline scheduler on /demo and the "Book a Demo" popup triggered from
        buttons across the site (see lib/calendly.ts). It stays afterInteractive
        so an early click still gets the popup. Its stylesheet is added from
        lib/calendly.ts after load, not here, because a <link> in <head> blocks
        the first paint.
      */}
      {/* Warm up the connection to calendly.com so the popup iframe loads faster. */}
      <link rel="preconnect" href="https://calendly.com" />
      <Script
        id="calendly-widget"
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
      </head>
      <body>
        {gtmId && process.env.VERCEL_ENV === 'production' && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
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
        <Script id="vector-pixel" strategy="lazyOnload">{`
          !function(e,r){try{if(e.vector)return void console.log("Vector snippet included more than once.");var t={};t.q=t.q||[];for(var o=["load","identify","on"],n=function(e){return function(){var r=Array.prototype.slice.call(arguments);t.q.push([e,r])}},c=0;c<o.length;c++){var a=o[c];t[a]=n(a)}if(e.vector=t,!t.loaded){var i=r.createElement("script");i.type="text/javascript",i.async=!0,i.src="https://cdn.vector.co/pixel.js";var l=r.getElementsByTagName("script")[0];l.parentNode.insertBefore(i,l),t.loaded=!0}}catch(e){console.error("Error loading Vector:",e)}}(window,document);
          vector.load("80c5a758-0d80-4bfc-a31f-ca301c7405b8");
        `}</Script>
        <DemoCalendarProvider>
          {children}
        </DemoCalendarProvider>
        <CalendlyBookingTracker />
        <Analytics />
        <SpeedInsights />
        <Script
          src="https://subscribe-forms.beehiiv.com/attribution.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
