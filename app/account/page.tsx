import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth/session';
import { sql, safeQuery } from '@/lib/db';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SignOutButton } from '@/components/SignOutButton';

export const metadata = { title: 'Account' };
export const dynamic = 'force-dynamic';

export default async function AccountPage() {
  const user = await getSessionUser();
  if (!user) redirect('/login?next=/account');

  const orders = await safeQuery<any>(() => sql`
    select id, amount_total, currency, status, created_at, items
    from orders
    where user_id = ${user.id} or customer_email = ${user.email}
    order by created_at desc
    limit 20
  `);

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
            <div>
              <p className="text-accent font-display tracking-wider-2 uppercase mb-2">★ Your Account</p>
              <h1 className="heading-mega text-3xl md:text-5xl">{(user.full_name ?? user.email).toUpperCase()}</h1>
              <p className="text-muted text-sm mt-2">{user.email}</p>
            </div>
            <div className="flex gap-2">
              {user.role === 'admin' && <Link href="/admin" className="btn-secondary">ADMIN</Link>}
              <SignOutButton />
            </div>
          </div>

          <h2 className="font-display tracking-wider-2 uppercase text-xl mb-4">Order History</h2>
          {orders.length === 0 ? (
            <div className="border border-border bg-card p-8 text-center">
              <p className="text-muted mb-4">No orders yet.</p>
              <Link href="/shop" className="btn-primary">START SHOPPING</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((o: any) => (
                <div key={o.id} className="border border-border bg-card p-4 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-display tracking-wider-2 uppercase text-sm truncate">ORDER #{o.id.slice(0, 8)}</p>
                    <p className="text-muted text-xs">
                      {new Date(o.created_at).toLocaleDateString()} · {Array.isArray(o.items) ? o.items.length : 0} items
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display tracking-wider-2">${(o.amount_total / 100).toFixed(2)}</p>
                    <p className="text-xs text-accent uppercase tracking-wider-2">{o.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
