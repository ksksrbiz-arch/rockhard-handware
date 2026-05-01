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
        <div className="mx-auto max-w-xl px-4 py-32 text-center">
          <p className="text-accent font-display tracking-wider-3 uppercase text-sm mb-4">★ ERROR 404</p>
          <h1 className="heading-mega text-6xl md:text-8xl mb-6">WRONG<br />TURN.</h1>
          <p className="text-muted mb-8">This page doesn&apos;t exist. Or it ran off down a logging road.</p>
          <Link href="/" className="btn-primary">BACK TO HOME</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
