'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { Product } from '@/lib/types';

interface Props { mode: 'create' | 'edit'; product?: Product & { id?: string } }

export function ProductForm({ mode, product }: Props) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    slug: product?.slug ?? '',
    name: product?.name ?? '',
    tagline: product?.tagline ?? '',
    description: (product as any)?.description ?? '',
    price: product?.price ?? 0,
    category: product?.category ?? '',
    image_url: product?.image_url ?? '',
    inventory: (product as any)?.inventory ?? 0,
    status: product?.status ?? 'draft',
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function uploadImage() {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    const j = await res.json();
    if (!res.ok) setError(j.error ?? 'Upload failed');
    else setForm({ ...form, image_url: j.url });
    setUploading(false);
  }

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

  function field(key: keyof typeof form, label: string, type = 'text', extra: any = {}) {
    return (
      <label className="block">
        <span className="text-muted text-xs tracking-wider-2 uppercase">{label}</span>
        <input
          type={type}
          value={form[key] as any}
          onChange={(e) => setForm({ ...form, [key]: type === 'number' ? Number(e.target.value) : e.target.value })}
          className="w-full bg-card border border-border px-4 py-2 mt-1 focus:outline-none focus:border-accent"
          {...extra}
        />
      </label>
    );
  }

  return (
    <div className="space-y-4">
      {field('slug', 'URL Slug', 'text', { required: true, placeholder: 'cold-beer-tee' })}
      {field('name', 'Name', 'text', { required: true })}
      {field('tagline', 'Tagline (one-liner)')}
      <label className="block">
        <span className="text-muted text-xs tracking-wider-2 uppercase">Description</span>
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4}
          className="w-full bg-card border border-border px-4 py-2 mt-1 focus:outline-none focus:border-accent" />
      </label>
      <div className="grid grid-cols-2 gap-4">
        {field('price', 'Price (USD)', 'number', { step: 0.01, min: 0, required: true })}
        {field('inventory', 'Inventory', 'number', { min: 0 })}
      </div>
      {field('category', 'Category')}

      <div className="space-y-2">
        <span className="text-muted text-xs tracking-wider-2 uppercase">Image</span>
        {form.image_url && <img src={form.image_url} alt="" className="w-32 h-32 object-cover border border-border" />}
        <div className="flex gap-2 flex-wrap items-center">
          <input ref={fileRef} type="file" accept="image/*" className="text-sm" />
          <button type="button" onClick={uploadImage} disabled={uploading} className="btn-secondary text-xs">
            {uploading ? 'UPLOADING…' : 'UPLOAD'}
          </button>
        </div>
        <input type="text" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          placeholder="…or paste an HTTPS URL"
          className="w-full bg-card border border-border px-4 py-2 focus:outline-none focus:border-accent" />
      </div>

      <label className="block">
        <span className="text-muted text-xs tracking-wider-2 uppercase">Status</span>
        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as any })}
          className="w-full bg-card border border-border px-4 py-2 mt-1 focus:outline-none focus:border-accent">
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
