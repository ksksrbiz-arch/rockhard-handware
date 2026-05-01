import type { Metadata } from 'next';
import { Oswald, Inter } from 'next/font/google';
import './globals.css';

const display = Oswald({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rockhardhandware.com'),
  title: {
    default: 'Rockhard Handware — Built for Glory.',
    template: '%s | Rockhard Handware',
  },
  description: "Real gloves for real work.",
  openGraph: {
    title: 'Rockhard Handware',
    description: "Real gloves for real work.",
    type: 'website',
    siteName: 'Rockhard Handware',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
