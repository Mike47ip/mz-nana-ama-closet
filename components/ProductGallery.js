'use client';
import Image from 'next/image';
import { useState } from 'react';
import ProductImage from './ProductImage';

export default function ProductGallery({ product }) {
  const imgs = product.images || [];
  const [i, setI] = useState(0);
  const shown = { ...product, images: imgs.length ? [imgs[i]] : [] };
  return (
    <div>
      <div className="aspect-[4/5] animate-pop overflow-hidden rounded-3xl">
        <ProductImage key={shown.images[0] || 'none'} product={shown} priority sizes="(min-width:768px) 50vw, 100vw" />
      </div>
      {imgs.length > 1 && (
        <div className="mt-3 flex gap-2">
          {imgs.map((src, n) => (
            <button key={src} onClick={() => setI(n)} aria-label={`Photo ${n + 1}`}
              className={`relative h-20 w-16 overflow-hidden rounded-xl border-2 transition ${n === i ? 'border-accent' : 'border-transparent opacity-70 hover:opacity-100'}`}>
              <Image src={src} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
