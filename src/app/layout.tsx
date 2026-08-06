import type { Metadata, Viewport } from 'next';
import { Orbitron, JetBrains_Mono, Inter } from 'next/font/google';
import { LangProvider } from '@/lib/LangProvider';
import { SmoothScroll } from '@/components/SmoothScroll';
import { BootScreen } from '@/components/BootScreen';
import { StructuredData } from '@/components/StructuredData';
import '@/styles/globals.css';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
  variable: '--font-orbitron',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'cyrillic', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://a-and-i-automation.com'),
  title: 'A&I Automation: Automatizare AI pentru afaceri din Moldova',
  description:
    'A&I Automation ajută afacerile din Moldova să elimine munca repetitivă cu instrumente AI, chatboți și agenți inteligenți.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'A&I Automation',
    description: 'AI tools, chatbots, and intelligent agents. Deployed into your operations.',
    type: 'website',
    url: 'https://a-and-i-automation.com',
    // TODO(P3-4): replace with a real 1200x630 OG image
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A&I Automation',
    description: 'AI tools, chatbots, and intelligent agents. Deployed into your operations.',
    // TODO(P3-4): replace with a real 1200x630 OG image
    images: ['/logo.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#050514',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={`${orbitron.variable} ${jetbrains.variable} ${inter.variable}`}>
      <body>
        <StructuredData />
        <LangProvider>
          <BootScreen />
          <SmoothScroll>{children}</SmoothScroll>
        </LangProvider>
      </body>
    </html>
  );
}
