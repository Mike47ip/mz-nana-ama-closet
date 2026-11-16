'use client';
import Image from 'next/image';
import { useState } from 'react';
import Icon from './Icon';
import { COLORS, tint } from '@/lib/products';

// Shows the real photo; falls back to a tinted placeholder until the photo file exists.
export default function ProductImage({ product, sizes = '(min-width:1024px) 25vw, 50vw', priority = false }) {
  const [failed, setFailed] = useState(false);
  const color = product.colors[0];
  const src = product.images?.[0] || `/products/${product.id}.jpg`;
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: tint(color) }}>
      {failed ? (
        <div className="grid h-full w-full place-items-center">
          <Icon category={product.category} color={COLORS[color]} className="w-1/2" />
        </div>
      ) : (
        <Image src={src} alt={product.name} fill sizes={sizes} priority={priority} onError={() => setFailed(true)}
          className="object-cover transition-transform duration-500 group-hover:scale-105" />
      )}
    </div>
  );
}
