import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rockhard-handware.netlify.app'),
  title: { default: 'Rockhard Handware — Built for Glory.', template: '%s · Rockhard Handware' },
  description: 'Built for Glory.',
  openGraph: {
    title: 'Rockhard Handware',
    description: 'Built for Glory.',
    type: 'website',
    siteName: 'Rockhard Handware',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-bg text-ink antialiased font-body min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
