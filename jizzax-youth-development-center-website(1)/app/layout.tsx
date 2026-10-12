import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { LanguageProvider } from '@/lib/LanguageContext'
import ScrollToTop from '@/components/scroll-to-top'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://kelajakmarkazi.uz'),
  title: {
    default: 'Jizzax viloyati "Kelajak markazi" | Yoshlar rivojlanish markazi',
    template: '%s | Kelajak Markazi',
  },
  description:
    'Jizzax viloyati "Kelajak markazi" – STEM, robototexnika, san\'at va yetakchilik dasturlari orqali O\'zbekistonning yangi avlod innovatorlari, yetakchilari va ijodkorlarini ilhomlantiruvchi yoshlar markazi.',
  keywords: ['Kelajak markazi', 'Jizzax', 'yoshlar markazi', 'STEM', 'O\'zbekiston', 'robototexnika'],
  authors: [{ name: 'Jizzax viloyati "Kelajak markazi"' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'Jizzax viloyati "Kelajak markazi"',
    description: 'Jizzax yoshlarining porloq kelajagini bunyod etamiz',
    type: 'website',
    locale: 'uz_UZ',
    url: 'https://kelajakmarkazi.uz',
    siteName: 'Kelajak Markazi',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Kelajak Markazi logotipi',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Jizzax viloyati "Kelajak markazi"',
    description: 'STEM, robototexnika, san\'at va yetakchilik dasturlari orqali yoshlarni rivojlantirish markazi.',
    images: ['/logo.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#1a3a6b',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uz" className="bg-background">
      <body className={`${inter.className} font-sans antialiased`}>
        <ScrollToTop />
        <LanguageProvider>
          {children}
        </LanguageProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
