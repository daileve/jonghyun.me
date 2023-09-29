import './globals.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react';
import { Noto_Sans_KR } from 'next/font/google'

const inter = Noto_Sans_KR({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Welcome',
  description: 'Daileve\'s Homepage',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
