import type { Metadata } from 'next'
import { Manrope, Bangers } from 'next/font/google'
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
  description: 'Real-time AI coaching for sales agents — handle objections, ask better questions, and book more appointments.',
  sameAs: [
    'https://www.linkedin.com/company/asksayso',
    'https://www.instagram.com/asksayso',
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Sayso | Real-Time AI Sales Coaching',
    template: '%s | Sayso',
  },
  description: 'Real-time AI coaching for sales agents — handle objections, ask better questions, and book more appointments.',
  openGraph: {
    siteName: 'Sayso',
    type: 'website',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Sayso — Real-Time AI Sales Coaching' }],
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
        <DemoCalendarProvider>
          {children}
        </DemoCalendarProvider>
      </body>
    </html>
  )
}
