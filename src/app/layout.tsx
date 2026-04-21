import type { Metadata } from 'next'
import { geist, vazirmatn } from '@/lib/fonts'
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
      <body className={`${geist.variable} ${vazirmatn.variable}`}>
        {children}
      </body>
    </html>
  )
}
