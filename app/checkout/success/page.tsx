import Link from 'next/link';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata = { title: 'Order Confirmed' };

export default function CheckoutSuccess({ searchParams }: { searchParams: { session_id?: string } }) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-4 py-20 text-center">
          <p className="text-accent font-display tracking-wider-3 uppercase text-sm mb-4">★ ORDER CONFIRMED</p>
          <h1 className="heading-mega text-4xl md:text-6xl mb-6">THANKS FOR<br />THE SUPPORT.</h1>
          <p className="text-muted mb-8 max-w-md mx-auto">
            Your order&apos;s in. You&apos;ll get a confirmation email with the details.
            We&apos;ll ship as soon as it&apos;s packed up tight.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/shop" className="btn-primary">KEEP SHOPPING</Link>
            <Link href="/orders" className="btn-secondary">TRACK YOUR ORDER</Link>
          </div>
          {searchParams.session_id && (
            <p className="text-muted text-xs mt-8 font-mono">Reference: {searchParams.session_id.slice(-12)}</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
