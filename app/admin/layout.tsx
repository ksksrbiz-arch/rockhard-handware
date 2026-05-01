import Link from 'next/link';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getAdminSession } from '@/lib/auth';
import { LogoutButton } from './LogoutButton';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();
  // Middleware already redirects unauthed; this is belt-and-suspenders.
  if (!session) return null;

  return (
    <>
      <AnnouncementBar />
      <Header />
      <div className="bg-bg-alt border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-6 text-sm font-display tracking-wider-2 uppercase flex-wrap">
          <span className="text-accent">★ ADMIN</span>
          <Link href="/admin" className="hover:text-accent">Dashboard</Link>
          <Link href="/admin/products" className="hover:text-accent">Products</Link>
          <Link href="/admin/orders" className="hover:text-accent">Orders</Link>
          <span className="ml-auto flex items-center gap-3 text-muted">
            <span className="text-xs normal-case">{session.email}</span>
            <LogoutButton />
          </span>
        </div>
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
