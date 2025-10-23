import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { FaviconHead } from '@/components/layout/FaviconHead'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'FalaAtípica - Dando voz a quem ainda não pode falar',
  description: 'Sistema completo de auxílio para crianças com atraso de fala através de tecnologia educativa e gamificação',
  keywords: 'autismo, atraso de fala, TEA, fonoaudiologia, tecnologia educativa, gamificação',
  authors: [{ name: 'FalaAtípica Team' }],
  openGraph: {
    title: 'FalaAtípica - Dando voz a quem ainda não pode falar',
    description: 'Sistema completo de auxílio para crianças com atraso de fala',
    type: 'website',
    locale: 'pt_BR',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <FaviconHead />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-poppins`} suppressHydrationWarning>
        <Navbar />
        {children}
      </body>
    </html>
  )
}