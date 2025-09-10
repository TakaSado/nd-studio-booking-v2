import './globals.css'
import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME || 'NDスタジオ予約システム',
  description: 'NDPromotion スタジオの無人予約システム MVP'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body style={{ ['--accent' as any]: process.env.NEXT_PUBLIC_ACCENT_HEX || '#B3E5FC' }}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

