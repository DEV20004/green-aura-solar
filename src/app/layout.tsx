import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'
import ChatBot from '@/components/ui/ChatBot'
import ScrollProgress from '@/components/ui/ScrollProgress'
import CursorGlow from '@/components/ui/CursorGlow'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: { default: 'Green Aura Solar | Powered by Sun, Driven by Green', template: '%s | Green Aura Solar' },
  description: 'Green Aura Solar — 6+ years, 600+ PM Surya Ghar projects in Odisha. Best residential, commercial & industrial solar installation in Bhubaneswar.',
  keywords: ['solar energy', 'solar panels', 'PM Surya Ghar', 'renewable energy', 'solar installation', 'Bhubaneswar', 'Odisha'],
  metadataBase: new URL('https://www.greenaurasolar.com'),
  openGraph: { title: 'Green Aura Solar', description: 'Powered by Sun, Driven by Green', siteName: 'Green Aura Solar', type: 'website' },
  themeColor: '#F5A623',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Nunito:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="icon" href="/logo.jpeg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logo.jpeg" />
      </head>
      <body className="bg-navy-900 text-white">
        <ScrollProgress />
        <CursorGlow />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <ChatBot />
        <Toaster position="top-right" toastOptions={{ style: { background: '#1A2540', color: '#fff', border: '1px solid rgba(245,166,35,0.3)', fontFamily: 'Nunito, sans-serif' } }} />
      </body>
    </html>
  )
}
