import { notFound } from 'next/navigation';
import { sql, safeOne } from '@/lib/db';
import { ProductForm } from '@/components/admin/ProductForm';

export const dynamic = 'force-dynamic';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await safeOne<any>(() => sql`select * from products where id = ${params.id}`);
  if (!product) notFound();
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="heading-mega text-4xl md:text-5xl mb-8">EDIT: {product.name}</h1>
      <ProductForm mode="edit" product={product} />
    </div>
  );
}
