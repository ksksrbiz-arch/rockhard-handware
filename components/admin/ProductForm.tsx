'use client';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Product } from '@/lib/types';

interface Props {
  mode: 'create' | 'edit';
  product?: Product & { id?: string; images?: string[] };
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
    images: (product?.images as string[]) ?? [],
    inventory: product?.inventory ?? 0,
    status: product?.status ?? 'draft',
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const heroPickerRef = useRef<HTMLInputElement>(null);
  const galleryPickerRef = useRef<HTMLInputElement>(null);

  async function uploadFile(file: File): Promise<string> {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/upload-image', { method: 'POST', body: fd });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      throw new Error(j.error ?? 'upload failed');
    }
    const j = await res.json();
    return j.url as string;
  }

  async function onHeroPicked(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploading(true); setError(null);
    try {
      const url = await uploadFile(f);
      setForm({ ...form, image_url: url });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  async function onGalleryPicked(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setUploading(true); setError(null);
    try {
      const urls = await Promise.all(files.map(uploadFile));
      setForm({ ...form, images: [...form.images, ...urls] });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  function removeGalleryImage(i: number) {
    setForm({ ...form, images: form.images.filter((_, idx) => idx !== i) });
  }

  function moveGalleryImage(i: number, delta: number) {
    const next = [...form.images];
    const j = i + delta;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    setForm({ ...form, images: next });
  }

  async function save() {
    setSaving(true); setError(null);
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
    <div className="space-y-5">
      <Field label="URL Slug" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} required placeholder="cold-beer-tee" />
      <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
      <Field label="Tagline" value={form.tagline} onChange={(v) => setForm({ ...form, tagline: v })} />
      <label className="block">
        <span className="text-muted text-xs tracking-wider-3 uppercase">Description</span>
        <textarea
          value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4}
          className="w-full bg-card border border-border px-4 py-2 mt-1 focus:outline-none focus:border-accent text-ink"
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

      {/* HERO IMAGE — file picker + URL input */}
      <div className="border border-border bg-card p-4 space-y-3">
        <p className="font-display tracking-wider-3 uppercase text-sm text-ink">Hero image</p>
        {form.image_url ? (
          <div className="flex items-start gap-4">
            <img src={form.image_url} alt="" className="w-32 h-32 object-cover border border-border" />
            <div className="flex-1 space-y-2">
              <input
                type="url"
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                placeholder="https://… or click upload"
                className="w-full bg-bg border border-border px-3 py-2 text-sm focus:outline-none focus:border-accent text-ink"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => heroPickerRef.current?.click()}
                  className="text-xs font-display tracking-wider-3 uppercase border border-border hover:border-accent text-ink hover:text-accent px-3 py-2 transition-colors"
                  disabled={uploading}
                >
                  {uploading ? 'UPLOADING…' : 'REPLACE FILE'}
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, image_url: '' })}
                  className="text-xs font-display tracking-wider-3 uppercase text-muted hover:text-accent px-3 py-2"
                >
                  REMOVE
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            onClick={() => heroPickerRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); }}
            onDrop={(e) => {
              e.preventDefault();
              const f = e.dataTransfer.files?.[0];
              if (f && heroPickerRef.current) {
                const dt = new DataTransfer();
                dt.items.add(f);
                heroPickerRef.current.files = dt.files;
                heroPickerRef.current.dispatchEvent(new Event('change', { bubbles: true }));
              }
            }}
            className="border-2 border-dashed border-border hover:border-accent transition-colors p-8 text-center cursor-pointer"
          >
            <p className="text-muted text-sm mb-1">Drop a file here, or click to choose</p>
            <p className="text-muted text-xs">JPG / PNG / WebP / GIF, up to 10 MB</p>
          </div>
        )}
        <input
          ref={heroPickerRef}
          type="file"
          accept="image/*"
          onChange={onHeroPicked}
          className="hidden"
        />
        <p className="text-muted text-xs">
          Or paste an external URL (e.g. <code>https://images.unsplash.com/…</code>)
        </p>
      </div>

      {/* GALLERY IMAGES — multi-file */}
      <div className="border border-border bg-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-display tracking-wider-3 uppercase text-sm text-ink">Gallery ({form.images.length})</p>
          <button
            type="button"
            onClick={() => galleryPickerRef.current?.click()}
            className="text-xs font-display tracking-wider-3 uppercase border border-border hover:border-accent text-ink hover:text-accent px-3 py-2 transition-colors"
            disabled={uploading}
          >
            {uploading ? 'UPLOADING…' : '+ ADD IMAGES'}
          </button>
        </div>
        {form.images.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {form.images.map((url, i) => (
              <div key={url + i} className="relative group">
                <img src={url} alt="" className="w-full aspect-square object-cover border border-border" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 flex items-center justify-center transition-colors">
                  <div className="hidden group-hover:flex flex-col gap-1">
                    <button
                      type="button"
                      onClick={() => moveGalleryImage(i, -1)}
                      disabled={i === 0}
                      className="bg-white/20 text-white text-[10px] font-display tracking-wider-2 uppercase px-2 py-1 disabled:opacity-30"
                    >
                      ← Move
                    </button>
                    <button
                      type="button"
                      onClick={() => moveGalleryImage(i, 1)}
                      disabled={i === form.images.length - 1}
                      className="bg-white/20 text-white text-[10px] font-display tracking-wider-2 uppercase px-2 py-1 disabled:opacity-30"
                    >
                      Move →
                    </button>
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(i)}
                      className="bg-accent text-white text-[10px] font-display tracking-wider-2 uppercase px-2 py-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                {i === 0 && (
                  <span className="absolute top-1 left-1 bg-accent text-white text-[9px] font-display tracking-wider-2 uppercase px-1.5 py-0.5">
                    1st
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
        <input
          ref={galleryPickerRef}
          type="file"
          accept="image/*"
          multiple
          onChange={onGalleryPicked}
          className="hidden"
        />
        <p className="text-muted text-xs">
          The first gallery image becomes the hero on PDP if no hero is set. Drag to reorder.
        </p>
      </div>

      <label className="block">
        <span className="text-muted text-xs tracking-wider-3 uppercase">Status</span>
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value as any })}
          className="w-full bg-card border border-border px-4 py-2 mt-1 focus:outline-none focus:border-accent text-ink"
        >
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </label>

      {error && <p className="text-accent text-sm">{error}</p>}
      <div className="flex gap-3 pt-2">
        <button onClick={save} disabled={saving || uploading} className="btn-primary flex-1">
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
      <span className="text-muted text-xs tracking-wider-3 uppercase">{label}{required ? ' *' : ''}</span>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-card border border-border px-4 py-2 mt-1 focus:outline-none focus:border-accent text-ink"
      />
    </label>
  );
}
