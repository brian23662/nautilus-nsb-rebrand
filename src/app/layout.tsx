import type { Metadata } from 'next';
import { Anton, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';

// Heavy condensed display font — gives the grunge/cinematic punch
const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
  display: 'swap'
});

// Body font — clean utility
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

// Mono accents for eyebrow/labels
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Nautilus Fitness NSB | New Smyrna Beach Premier Gym',
  description:
    "New Smyrna Beach's premier gym. State-of-the-art equipment, group classes, personal training, and wellness coaching.",
  icons: { icon: '/logo.svg' },
  openGraph: {
    title: 'Nautilus Fitness NSB',
    description:
      'New Smyrna Beach\u2019s premier gym \u2014 state-of-the-art equipment, expert coaching, and a community built to lift you higher.',
    type: 'website',
    locale: 'en_US'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="grain">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
