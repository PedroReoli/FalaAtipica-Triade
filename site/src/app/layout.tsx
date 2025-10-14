import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import '../styles/puzzle-shapes.css'

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
    icon: '/images/falaatipica-logo.png',
    shortcut: '/images/falaatipica-logo.png',
    apple: '/images/falaatipica-logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-poppins`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}