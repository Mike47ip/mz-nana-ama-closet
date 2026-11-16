'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CATEGORIES, COLORS, DEFAULT_SIZES } from '@/lib/products';

const inp = 'w-full rounded-xl border border-line bg-surface px-4 py-2.5';
const lbl = 'mb-1.5 block text-sm text-muted';

export default function ProductForm({ product }) {
  const router = useRouter();
  const edit = !!product;
  const [f, setF] = useState({
    name: product?.name || '', category: product?.category || 'Dresses', price: product?.price ?? '', tag: product?.tag || '',
    description: product?.description || '', colors: product?.colors || ['Noir'],
    sizes: (product?.sizes || [DEFAULT_SIZES.Dresses]).join(', ').replace(/^XS, S, M, L, XL$/, DEFAULT_SIZES.Dresses) || DEFAULT_SIZES.Dresses,
    images: product?.images || [],
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));

  function setCategory(c) {
    const isDefault = Object.values(DEFAULT_SIZES).includes(f.sizes);
    setF((s) => ({ ...s, category: c, sizes: isDefault ? DEFAULT_SIZES[c] : s.sizes }));
  }
  async function upload(e) {
    const files = [...e.target.files];
    if (!files.length) return;
    setBusy(true); setErr('');
    const fd = new FormData();
    files.forEach((x) => fd.append('files', x));
    const r = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    const d = await r.json().catch(() => ({}));
    setBusy(false); e.target.value = '';
    if (!r.ok) return setErr(d.error || 'Upload failed.');
    set('images', [...f.images, ...d.urls]);
  }
  async function save(e) {
    e.preventDefault(); setBusy(true); setErr('');
    const body = { ...f, price: Number(f.price), sizes: f.sizes.split(',').map((s) => s.trim()).filter(Boolean) };
    const r = await fetch(edit ? `/api/admin/products/${product.id}` : '/api/admin/products', { method: edit ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) { setBusy(false); return setErr(d.error || 'Could not save.'); }
    router.push('/admin'); router.refresh();
  }
  async function del() {
    if (!confirm(`Delete ${product.name}? This cannot be undone.`)) return;
    setBusy(true);
    await fetch(`/api/admin/products/${product.id}`, { method: 'DELETE' });
    router.push('/admin'); router.refresh();
  }

  return (
    <form onSubmit={save} className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div><label className={lbl}>Name</label><input className={inp} value={f.name} onChange={(e) => set('name', e.target.value)} required /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={lbl}>Category</label><select className={inp} value={f.category} onChange={(e) => setCategory(e.target.value)}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></div>
          <div><label className={lbl}>Price (GH₵)</label><input className={inp} type="number" min="0" step="1" value={f.price} onChange={(e) => set('price', e.target.value)} required /></div>
        </div>
        <div><label className={lbl}>Label (optional, e.g. New, Bestseller)</label><input className={inp} value={f.tag} onChange={(e) => set('tag', e.target.value)} /></div>
        <div><label className={lbl}>Description</label><textarea className={`${inp} min-h-[110px]`} value={f.description} onChange={(e) => set('description', e.target.value)} /></div>
        <div>
          <label className={lbl}>Colours</label>
          <div className="flex flex-wrap gap-2">
            {Object.keys(COLORS).map((c) => {
              const on = f.colors.includes(c);
              return (
                <button type="button" key={c} onClick={() => set('colors', on ? f.colors.filter((x) => x !== c) : [...f.colors, c])}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition ${on ? 'border-ink bg-ink text-bg' : 'border-line'}`}>
                  <span className="h-4 w-4 rounded-full ring-1 ring-line" style={{ background: COLORS[c] }} />{c}
                </button>
              );
            })}
          </div>
        </div>
        <div><label className={lbl}>Sizes (comma separated)</label><input className={inp} value={f.sizes} onChange={(e) => set('sizes', e.target.value)} required /></div>
      </div>

      <div>
        <label className={lbl}>Photos (first one is the main photo)</label>
        <div className="grid grid-cols-3 gap-3">
          {f.images.map((src, n) => (
            <div key={src} className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
              {n === 0 && <span className="absolute left-1.5 top-1.5 rounded-full bg-surface px-2 py-0.5 text-xs font-semibold">Main</span>}
              <div className="absolute inset-x-1.5 bottom-1.5 flex gap-1 opacity-100 md:opacity-0 md:transition md:group-hover:opacity-100">
                {n > 0 && <button type="button" onClick={() => set('images', [src, ...f.images.filter((x) => x !== src)])} className="flex-1 rounded-full bg-ink py-1 text-xs text-bg">Make main</button>}
                <button type="button" onClick={() => set('images', f.images.filter((x) => x !== src))} className="flex-1 rounded-full bg-surface py-1 text-xs">Remove</button>
              </div>
            </div>
          ))}
          <label className="grid aspect-[4/5] cursor-pointer place-items-center rounded-xl border-2 border-dashed border-line text-center text-sm text-muted transition hover:border-accent hover:text-ink">
            <span>＋ Add photos<br /><small>JPG, PNG, WebP</small></span>
            <input type="file" accept="image/jpeg,image/png,image/webp" multiple hidden onChange={upload} />
          </label>
        </div>
        <p className="mt-2 text-xs text-muted">Portrait photos (4:5) look best on the store.</p>
        {err && <p className="mt-4 rounded-xl bg-accent/10 px-4 py-3 text-sm text-accent" role="alert">{err}</p>}
        <div className="mt-6 flex flex-wrap gap-3">
          <button disabled={busy} className="rounded-full bg-accent px-7 py-3 font-semibold text-accent-ink transition hover:-translate-y-0.5 disabled:opacity-50">{busy ? 'Working…' : edit ? 'Save changes' : 'Create product'}</button>
          {edit && <button type="button" disabled={busy} onClick={del} className="rounded-full border border-line px-6 py-3 text-muted transition hover:border-accent hover:text-accent">Delete</button>}
        </div>
      </div>
    </form>
  );
}
