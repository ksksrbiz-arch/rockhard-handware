import Link from 'next/link';
import { getDb } from '@/lib/db';

export const metadata = { title: 'Products · Admin' };
export const dynamic = 'force-dynamic';

export default async function AdminProducts() {
  const db = getDb();
  let products: any[] = [];
  if (db) {
    try {
      products = await db.sql`SELECT id, slug, name, price, category, status, inventory FROM products ORDER BY created_at DESC`;
    } catch { /* fall through */ }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-3">
        <h1 className="heading-mega text-4xl md:text-6xl">PRODUCTS</h1>
        <Link href="/admin/products/new" className="btn-primary">+ NEW PRODUCT</Link>
      </div>
      <div className="border border-border bg-card overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-bg-alt">
            <tr className="text-left text-muted text-xs tracking-wider-2 uppercase">
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Inventory</th>
              <th className="p-3">Status</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="p-3 font-display tracking-wider-2 uppercase">{p.name}</td>
                <td className="p-3 text-muted">{p.category}</td>
                <td className="p-3">${Number(p.price).toFixed(2)}</td>
                <td className="p-3">{p.inventory ?? 0}</td>
                <td className="p-3"><span className="text-accent uppercase tracking-wider-2 text-xs">{p.status}</span></td>
                <td className="p-3 text-right">
                  <Link href={`/admin/products/${p.id}`} className="text-accent hover:underline tracking-wider-2 uppercase text-xs">EDIT</Link>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr><td colSpan={6} className="p-8 text-center text-muted">No products yet. Click &quot;+ NEW PRODUCT&quot; to add one.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
