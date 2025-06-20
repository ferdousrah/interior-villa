import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Interior Villa - Elevating Interiors with Passion and Purpose',
  description: 'Discover the art of interior design with Interior Villa. Transform your space with our expert insights and innovative ideas.',
  keywords: 'Interior Villa, Interior Design, Home Decor, Modern Interiors, Luxury Interiors',
  authors: [{ name: 'Technocrats' }],
  openGraph: {
    title: 'Interior Villa - Elevating Interiors with Passion and Purpose',
    description: 'Discover the art of interior design with Interior Villa. Transform your space with our expert insights and innovative ideas.',
    url: 'https://interiorvillabd.com',
    siteName: 'Interior Villa',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interior Villa - Elevating Interiors with Passion and Purpose',
    description: 'Discover the art of interior design with Interior Villa. Transform your space with our expert insights and innovative ideas.',
    images: ['/images/twitter-image.jpg'],
    creator: '@InteriorVilla',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css?family=Fahkwang:600,500,400,700|DM+Sans:700|Inter:500,600|Darker+Grotesque:700|Work+Sans:600|Assistant:var(--text-regular-semi-bold-font-weight),var(--text-regular-normal-font-weight),var(--text-medium-normal-font-weight)" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}