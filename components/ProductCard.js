import Link from 'next/link';
import ProductImage from './ProductImage';
import { money } from '@/lib/products';

export default function ProductCard({ product, index = 0 }) {
  return (
    <Link href={`/shop/${product.id}`} className="group block animate-pop" style={{ animationDelay: `${index * 60}ms` }}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl transition-transform duration-500 group-hover:-translate-y-1">
        <ProductImage product={product} />
        {product.tag && <span className="absolute left-3 top-3 rounded-full bg-surface px-3 py-1 text-xs font-semibold">{product.tag}</span>}
        <span className="absolute inset-x-3 bottom-3 translate-y-16 rounded-full bg-ink py-2.5 text-center text-sm font-semibold text-bg transition-transform duration-300 group-hover:translate-y-0 [@media(hover:none)]:translate-y-0">View details</span>
      </div>
      <div className="flex justify-between gap-3 px-1 pt-3.5">
        <b className="font-semibold">{product.name}</b>
        <span className="text-muted">{money(product.price)}</span>
      </div>
    </Link>
  );
}
