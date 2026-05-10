import type {Metadata} from 'next';
import { Inter, Space_Grotesk, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { PageTransition } from '@/components/page-transition';
import LoadingScreen from '@/components/LoadingScreen';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  style: ['italic', 'normal'],
});

const LOGO_URL = 'https://i.ibb.co/Y7wKvYJ5/122151.png';

export const metadata: Metadata = {
  metadataBase: new URL('https://thecapitalguru.net'),
  title: "The Capital Guru | Institutional-Grade Trading Signals India",
  description: "Premium NSE/BSE F&O trading signals with 80%+ accuracy. Trusted by 4,800+ elite members. Real-time Telegram alerts, expert risk management.",
  icons: {
    icon: [
      { url: LOGO_URL },
    ],
    apple: LOGO_URL,
  },
  openGraph: {
    title: "The Capital Guru | Institutional-Grade Trading Signals India",
    description: "Premium NSE/BSE F&O trading signals with 80%+ accuracy. Trusted by 4,800+ elite members. Real-time Telegram alerts, expert risk management.",
    url: 'https://thecapitalguru.net',
    siteName: 'The Capital Guru',
    images: [
      {
        url: LOGO_URL,
        width: 1200,
        height: 630,
        alt: 'The Capital Guru - Institutional Grade Trading Signals',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "The Capital Guru | Institutional-Grade Trading Signals India",
    description: "Premium NSE/BSE F&O trading signals with 80%+ accuracy.",
    images: [LOGO_URL],
  }
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${playfair.variable} dark`}>
      <head>
        {process.env.NEXT_PUBLIC_SUPABASE_URL && (
          <link rel="preconnect" href={process.env.NEXT_PUBLIC_SUPABASE_URL} />
        )}
      </head>
      <body className="bg-brand-black text-white min-h-screen flex flex-col font-sans" suppressHydrationWarning>
        <LoadingScreen />
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
        <Toaster 
          theme="dark" 
          position="top-right" 
          toastOptions={{
            style: {
              background: '#0c0c0c',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  );
}
