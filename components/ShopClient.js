'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import ProductCard from './ProductCard';
import { CATEGORIES } from '@/lib/products';

export default function ShopClient({ products }) {
  const category = useSearchParams().get('category') || 'All';
  const [sort, setSort] = useState('featured');
  const list = products.filter((p) => category === 'All' || p.category === category);
  if (sort === 'lo') list.sort((a, b) => a.price - b.price);
  if (sort === 'hi') list.sort((a, b) => b.price - a.price);
  return (
    <>
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {['All', ...CATEGORIES].map((c) => (
            <Link key={c} href={c === 'All' ? '/shop' : `/shop?category=${c}`} scroll={false}
              className={`rounded-full border px-5 py-2.5 transition ${c === category ? 'border-ink bg-ink text-bg' : 'border-line hover:border-accent'}`}>{c}</Link>
          ))}
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products" className="rounded-full border border-line bg-surface px-4 py-2.5">
          <option value="featured">Featured</option><option value="lo">Price: low to high</option><option value="hi">Price: high to low</option>
        </select>
      </div>
      {list.length === 0 ? (
        <p className="animate-pop rounded-3xl bg-surface p-8 text-muted">
          {products.length === 0 ? 'New pieces are coming soon. Please check back shortly.' : `Nothing in ${category} yet.`}
        </p>
      ) : (
        <div key={category + sort} className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
          {list.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      )}
    </>
  );
}