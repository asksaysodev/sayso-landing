import type { Metadata } from 'next'
import { Manrope, Bangers } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { DemoCalendarProvider } from '@/app/context/landing/DemoCalendarContext'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asksayso.com';

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
  url: siteUrl,
  logo: `${siteUrl}/logo-pos-horizontal.png`,
  description: 'Sayso helps real estate agents turn messy prospecting conversations into booked appointments.',
  sameAs: [
    'https://www.linkedin.com/company/asksayso',
    'https://www.instagram.com/asksayso',
  ],
};

const siteNavigationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Site Navigation',
  itemListElement: [
    {
      '@type': 'SiteNavigationElement',
      position: 1,
      name: 'Book a Demo',
      description: 'Schedule an intro call with the Sayso founders',
      url: `${siteUrl}/demo`,
    },
    {
      '@type': 'SiteNavigationElement',
      position: 2,
      name: 'Blog',
      description: 'Tips and strategies for real estate prospecting',
      url: `${siteUrl}/blog`,
    },
    {
      '@type': 'SiteNavigationElement',
      position: 3,
      name: 'Home',
      description: 'Sayso — Fix Where Prospecting Breaks Down',
      url: siteUrl,
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Sayso — Fix Where Prospecting Breaks Down',
    template: '%s | Sayso',
  },
  description: 'Sayso helps real estate agents turn messy prospecting conversations into booked appointments.',
  openGraph: {
    siteName: 'Sayso',
    type: 'website',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Sayso — Fix the Hardest Part of Prospecting' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: '/logo-sayso.png',
    apple: '/logo-sayso.png',
    shortcut: '/logo-sayso.png',
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
      <Script
        id="vtag-ai-js"
        src="https://r2.leadsy.ai/tag.js"
        data-pid="1nhqD1cnSGYVDeXLS"
        data-version="062024"
        strategy="afterInteractive"
      />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
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
      </body>
    </html>
  )
}
