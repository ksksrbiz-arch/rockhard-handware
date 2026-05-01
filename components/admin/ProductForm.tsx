'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Product } from '@/lib/types';

interface Props {
  mode: 'create' | 'edit';
  product?: Product & { id?: string };
}

export function ProductForm({ mode, product }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    slug: product?.slug ?? '',
    name: product?.name ?? '',
    tagline: product?.tagline ?? '',
    description: product?.description ?? '',
    price: product?.price ?? 0,
    compare_at_price: product?.compare_at_price ?? 0,
    category: product?.category ?? '',
    image_url: product?.image_url ?? '',
    inventory: product?.inventory ?? 0,
    status: product?.status ?? 'draft',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/products', {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, id: (product as any)?.id }),
      });
      if (!res.ok) {
        const j = await res.json();
        throw new Error(j.error ?? 'Save failed');
      }
      router.push('/admin/products');
      router.refresh();
    } catch (e: any) {
      setError(e.message);
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <Field label="URL Slug" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} required placeholder="cold-beer-tee" />
      <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
      <Field label="Tagline" value={form.tagline} onChange={(v) => setForm({ ...form, tagline: v })} />
      <label className="block">
        <span className="text-muted text-xs tracking-wider-2 uppercase">Description</span>
        <textarea
          value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4}
          className="w-full bg-card border border-border px-4 py-2 mt-1 focus:outline-none focus:border-accent"
        />
      </label>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Price (USD)" value={form.price} onChange={(v) => setForm({ ...form, price: Number(v) })} type="number" required />
        <Field label="Compare-at price" value={form.compare_at_price} onChange={(v) => setForm({ ...form, compare_at_price: Number(v) })} type="number" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Inventory" value={form.inventory} onChange={(v) => setForm({ ...form, inventory: Number(v) })} type="number" />
        <Field label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} />
      </div>
      <Field label="Image URL" value={form.image_url} onChange={(v) => setForm({ ...form, image_url: v })} placeholder="https://…" />
      <label className="block">
        <span className="text-muted text-xs tracking-wider-2 uppercase">Status</span>
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value as any })}
          className="w-full bg-card border border-border px-4 py-2 mt-1 focus:outline-none focus:border-accent"
        >
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </label>
      {error && <p className="text-accent text-sm">{error}</p>}
      <div className="flex gap-3 pt-2">
        <button onClick={save} disabled={saving} className="btn-primary flex-1">
          {saving ? 'SAVING…' : mode === 'create' ? 'CREATE PRODUCT' : 'SAVE CHANGES'}
        </button>
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}

function Field({ label, value, onChange, type = 'text', required, placeholder }: FieldProps) {
  return (
    <label className="block">
      <span className="text-muted text-xs tracking-wider-2 uppercase">{label}</span>
      <input
        type={type} value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required} placeholder={placeholder}
        className="w-full bg-card border border-border px-4 py-2 mt-1 focus:outline-none focus:border-accent"
        step={type === 'number' ? '0.01' : undefined}
      />
    </label>
  );
}
