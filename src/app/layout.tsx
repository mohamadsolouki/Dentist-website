import type { Metadata } from 'next'
import { dmSans, cormorant, vazirmatn } from '@/lib/fonts'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '@/app/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://drarefehlotfi.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${dmSans.variable} ${cormorant.variable} ${vazirmatn.variable}`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
