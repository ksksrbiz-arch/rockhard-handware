import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://rockhardhandware.com'),
  title: { default: "Rockhard Handware \u2014 Built for Glory. Worn for Work.", template: "%s \u00b7 Rockhard Handware" },
  description: "Heavy-duty work gloves, tactical handware, and built-tough gear for crews who don't quit.",
  openGraph: {
    title: "Rockhard Handware",
    description: "Heavy-duty work gloves, tactical handware, and built-tough gear for crews who don't quit.",
    type: 'website',
    siteName: "Rockhard Handware",
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
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-bg text-ink antialiased font-body min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
