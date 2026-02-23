import type { Metadata } from 'next'
import { Manrope, Bangers } from 'next/font/google'
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

export const metadata: Metadata = {
  title: 'Sayso',
  description: 'Real-time AI coaching for sales agents — handle objections, ask better questions, and book more appointments.',
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
      <body>{children}</body>
    </html>
  )
}
