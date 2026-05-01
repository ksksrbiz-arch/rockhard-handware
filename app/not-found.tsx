import Link from 'next/link';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-4 py-24 text-center">
          <h1 className="heading-mega text-6xl md:text-8xl mb-4">404</h1>
          <p className="text-muted mb-8">Page not found. Wrong trail.</p>
          <Link href="/" className="btn-primary">GO HOME</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
