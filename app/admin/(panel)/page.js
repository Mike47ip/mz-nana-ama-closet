import Link from 'next/link';
import { getProducts } from '@/lib/store';
import { money } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function AdminHome() {
  const products = await getProducts();
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-4xl font-semibold">Products <span className="text-muted">({products.length})</span></h1>
        <Link href="/admin/products/new" className="rounded-full bg-accent px-6 py-2.5 font-semibold text-accent-ink transition hover:-translate-y-0.5">Add product</Link>
      </div>
      <div className="divide-y divide-line rounded-3xl bg-surface">
        {products.map((p) => (
          <Link key={p.id} href={`/admin/products/${p.id}`} className="flex items-center gap-4 p-4 transition hover:bg-bg/60 first:rounded-t-3xl last:rounded-b-3xl">
            <div className="h-16 w-12 flex-none overflow-hidden rounded-lg bg-bg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {p.images?.[0] ? <img src={p.images[0]} alt="" className="h-full w-full object-cover" /> : <span className="grid h-full place-items-center text-xs text-muted">No photo</span>}
            </div>
            <div className="flex-1"><b className="block">{p.name}</b><span className="text-sm text-muted">{p.category}{p.tag ? ` · ${p.tag}` : ''}</span></div>
            <span className="text-muted">{money(p.price)}</span>
            <span className="text-sm text-accent">Edit</span>
          </Link>
        ))}
        {products.length === 0 && <p className="p-6 text-muted">No products yet. Add your first one.</p>}
      </div>
    </>
  );
}
