import { sql, safeQuery } from '@/lib/db';

export const metadata = { title: 'Admin' };
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const stats = await safeQuery<{ orders: number; products: number; revenue: number }>(() => sql`
    select
      (select count(*)::int from orders) as orders,
      (select count(*)::int from products) as products,
      (select coalesce(sum(amount_total), 0)::int from orders where status = 'paid') as revenue
  `);
  const s = stats[0] ?? { orders: 0, products: 0, revenue: 0 };

  const recent = await safeQuery<any>(() => sql`
    select id, customer_email, amount_total, status, created_at
    from orders order by created_at desc limit 10
  `);

  const cards = [
    { label: 'TOTAL REVENUE', value: `$${(s.revenue / 100).toFixed(2)}` },
    { label: 'TOTAL ORDERS', value: String(s.orders) },
    { label: 'PRODUCTS', value: String(s.products) },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="heading-mega text-4xl md:text-6xl mb-8">DASHBOARD</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {cards.map((c) => (
          <div key={c.label} className="border border-border bg-card p-6">
            <p className="text-muted text-xs tracking-wider-2 uppercase">{c.label}</p>
            <p className="font-display tracking-wider-2 text-3xl mt-1">{c.value}</p>
          </div>
        ))}
      </div>

      <h2 className="font-display tracking-wider-2 uppercase text-xl mb-4">Recent Orders</h2>
      <div className="border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg-alt">
            <tr className="text-left text-muted text-xs tracking-wider-2 uppercase">
              <th className="p-3">Order</th><th className="p-3">Customer</th>
              <th className="p-3">Status</th><th className="p-3 text-right">Total</th>
              <th className="p-3 text-right">Date</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((o: any) => (
              <tr key={o.id} className="border-t border-border">
                <td className="p-3 font-mono text-xs">{o.id.slice(0, 8)}</td>
                <td className="p-3">{o.customer_email ?? '—'}</td>
                <td className="p-3 text-accent uppercase tracking-wider-2 text-xs">{o.status}</td>
                <td className="p-3 text-right">${(o.amount_total / 100).toFixed(2)}</td>
                <td className="p-3 text-right text-muted text-xs">{new Date(o.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
            {recent.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-muted">No orders yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
