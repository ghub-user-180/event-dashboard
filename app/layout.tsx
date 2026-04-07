import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Event Dashboard',
  description: 'Persönliches Event-Dashboard',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        {children}
      </body>
    </html>
  )
}
