import { getDb } from '@/lib/db';

export const metadata = { title: 'Admin' };
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const db = getDb();
  let orderCount = 0, productCount = 0, revenue = 0;
  let recent: any[] = [];

  if (db) {
    try {
      const [oc] = await db.sql`SELECT COUNT(*)::int AS c FROM orders`;
      const [pc] = await db.sql`SELECT COUNT(*)::int AS c FROM products`;
      const [rev] = await db.sql`SELECT COALESCE(SUM(amount_total), 0)::int AS r FROM orders WHERE status='paid'`;
      orderCount = oc?.c ?? 0;
      productCount = pc?.c ?? 0;
      revenue = (rev?.r ?? 0) / 100;
      recent = await db.sql`
        SELECT id, customer_email, customer_name, amount_total, status, created_at
        FROM orders ORDER BY created_at DESC LIMIT 10
      `;
    } catch { /* DB not provisioned yet */ }
  }

  const stats = [
    { label: 'TOTAL REVENUE', value: `$${revenue.toFixed(2)}` },
    { label: 'TOTAL ORDERS', value: String(orderCount) },
    { label: 'PRODUCTS', value: String(productCount) },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="heading-mega text-4xl md:text-6xl mb-8">DASHBOARD</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {stats.map((s) => (
          <div key={s.label} className="border border-border bg-card p-6">
            <p className="text-muted text-xs tracking-wider-2 uppercase">{s.label}</p>
            <p className="font-display tracking-wider-2 text-3xl mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      <h2 className="font-display tracking-wider-2 uppercase text-xl mb-4">Recent Orders</h2>
      <div className="border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg-alt">
            <tr className="text-left text-muted text-xs tracking-wider-2 uppercase">
              <th className="p-3">Order</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Total</th>
              <th className="p-3 text-right">Date</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((o) => (
              <tr key={o.id} className="border-t border-border">
                <td className="p-3 font-mono text-xs">{o.id.slice(0, 8)}</td>
                <td className="p-3">{o.customer_name ?? o.customer_email ?? '—'}</td>
                <td className="p-3 text-accent uppercase tracking-wider-2 text-xs">{o.status}</td>
                <td className="p-3 text-right">${(o.amount_total / 100).toFixed(2)}</td>
                <td className="p-3 text-right text-muted text-xs">{new Date(o.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
            {recent.length === 0 && (
              <tr><td colSpan={5} className="p-8 text-center text-muted">No orders yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
