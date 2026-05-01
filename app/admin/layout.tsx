import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth/session';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  if (!user) redirect('/login?next=/admin');
  if (user.role !== 'admin') redirect('/account');

  return (
    <>
      <AnnouncementBar />
      <Header />
      <div className="bg-bg-alt border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-6 text-sm font-display tracking-wider-2 uppercase">
          <span className="text-accent">★ ADMIN</span>
          <Link href="/admin" className="hover:text-accent">Dashboard</Link>
          <Link href="/admin/products" className="hover:text-accent">Products</Link>
          <Link href="/admin/orders" className="hover:text-accent">Orders</Link>
          <Link href="/account" className="ml-auto text-muted hover:text-accent">← Back to account</Link>
        </div>
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
