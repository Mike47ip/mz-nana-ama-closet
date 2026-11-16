'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from './CartProvider';
import { COLORS } from '@/lib/products';

export default function AddToCart({ product }) {
  const { add } = useCart();
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);
  return (
    <div>
      <span className="mb-2 block text-sm text-muted">Colour: {color}</span>
      <div className="mb-5 flex gap-2">
        {product.colors.map((c) => (
          <button key={c} aria-label={c} aria-pressed={c === color} onClick={() => setColor(c)} style={{ background: COLORS[c] }}
            className={`h-8 w-8 rounded-full border-2 border-surface ring-1 ring-line transition ${c === color ? 'scale-110 ring-2 ring-accent' : ''}`} />
        ))}
      </div>
      <span className="mb-2 block text-sm text-muted">Size</span>
      <div className="mb-6 flex flex-wrap gap-2">
        {product.sizes.map((s) => (
          <button key={s} aria-pressed={s === size} onClick={() => setSize(s)}
            className={`min-w-[46px] rounded-xl border px-3.5 py-2 transition ${s === size ? 'border-ink bg-ink text-bg' : 'border-line'}`}>{s}</button>
        ))}
      </div>
      <button onClick={() => { add(product, color, size); setAdded(true); setTimeout(() => setAdded(false), 2000); }}
        className="w-full rounded-full bg-accent py-3.5 font-semibold text-accent-ink transition hover:-translate-y-0.5 hover:shadow-lg">
        {added ? 'Added to bag ✓' : 'Add to bag'}
      </button>
      <p className="mt-3 text-center text-sm text-muted">Delivery across Ghana · Easy 7-day returns · <Link className="text-accent underline" href="/cart">View bag</Link></p>
    </div>
  );
}
