import { notFound } from 'next/navigation';
import { getDb } from '@/lib/db';
import { ProductForm } from '@/components/admin/ProductForm';

export const dynamic = 'force-dynamic';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const db = getDb();
  if (!db) notFound();
  const rows = await db.sql`SELECT * FROM products WHERE id=${params.id}`;
  const product = rows[0];
  if (!product) notFound();
  product.price = Number(product.price);
  if (product.compare_at_price != null) product.compare_at_price = Number(product.compare_at_price);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="heading-mega text-4xl md:text-5xl mb-8">EDIT: {product.name}</h1>
      <ProductForm mode="edit" product={product as any} />
    </div>
  );
}
