import { sql, safeQuery } from '@/lib/db';

export const metadata = { title: 'Orders · Admin' };
export const dynamic = 'force-dynamic';

export default async function AdminOrders() {
  const orders = await safeQuery<any>(() => sql`select * from orders order by created_at desc limit 100`);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="heading-mega text-4xl md:text-6xl mb-8">ORDERS</h1>
      <div className="border border-border bg-card overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead className="bg-bg-alt">
            <tr className="text-left text-muted text-xs tracking-wider-2 uppercase">
              <th className="p-3">Date</th><th className="p-3">Order</th>
              <th className="p-3">Customer</th><th className="p-3">Items</th>
              <th className="p-3">Status</th><th className="p-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o: any) => (
              <tr key={o.id} className="border-t border-border align-top">
                <td className="p-3 text-muted text-xs whitespace-nowrap">{new Date(o.created_at).toLocaleString()}</td>
                <td className="p-3 font-mono text-xs">{o.id.slice(0, 8)}</td>
                <td className="p-3">
                  <div>{o.customer_name ?? '—'}</div>
                  <div className="text-muted text-xs">{o.customer_email ?? '—'}</div>
                </td>
                <td className="p-3 text-xs text-muted">
                  {Array.isArray(o.items) ? o.items.map((i: any, idx: number) => (
                    <div key={idx}>{i.quantity}× {i.name}</div>
                  )) : '—'}
                </td>
                <td className="p-3 text-accent uppercase tracking-wider-2 text-xs">{o.status}</td>
                <td className="p-3 text-right">${(o.amount_total / 100).toFixed(2)}</td>
              </tr>
            ))}
            {orders.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-muted">No orders yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
