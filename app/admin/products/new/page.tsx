import { ProductForm } from '@/components/admin/ProductForm';

export const metadata = { title: 'New Product' };

export default function NewProductPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="heading-mega text-4xl md:text-5xl mb-8">NEW PRODUCT</h1>
      <ProductForm mode="create" />
    </div>
  );
}
