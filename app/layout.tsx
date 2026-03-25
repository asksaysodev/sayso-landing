import type { Metadata } from 'next'
import { Manrope, Bangers } from 'next/font/google'
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
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationJsonLd) }}
        />
        <DemoCalendarProvider>
          {children}
        </DemoCalendarProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
