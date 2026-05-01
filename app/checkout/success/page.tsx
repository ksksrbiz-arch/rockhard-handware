import Link from 'next/link';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata = { title: 'Order Confirmed' };

export default function SuccessPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-4 py-20 text-center">
          <p className="text-accent font-display tracking-wider-2 uppercase mb-3">★ Order confirmed ★</p>
          <h1 className="heading-mega text-4xl md:text-6xl mb-6">YOU&apos;RE IN.</h1>
          <p className="text-muted mb-10">
            We just got your order. Check your email for the receipt.
            We&apos;ll ping you again the moment it ships.
          </p>
          <Link href="/shop" className="btn-secondary">KEEP SHOPPING</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
