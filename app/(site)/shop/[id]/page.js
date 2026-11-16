import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCart from '@/components/AddToCart';
import ProductGallery from '@/components/ProductGallery';
import ProductCard from '@/components/ProductCard';
import { getProduct, getProducts } from '@/lib/store';
import { money } from '@/lib/products';

export const dynamic = 'force-dynamic';
export async function generateMetadata({ params }) {
  const p = await getProduct(params.id);
  return { title: `${p?.name ?? 'Product'} | Nana Ama Closet.` };
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);
  if (!product) notFound();
  const related = (await getProducts()).filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  return (
    <section className="mx-auto max-w-6xl px-5 py-10">
      <Link href="/shop" className="text-sm text-muted hover:text-ink">← Back to shop</Link>
      <div className="mt-5 grid gap-10 md:grid-cols-2">
        <ProductGallery product={product} />
        <div className="animate-rise self-center">
          <p className="text-sm text-muted">{product.category}</p>
          <h1 className="font-display text-5xl font-semibold leading-none">{product.name}</h1>
          <p className="my-3 text-xl font-semibold">{money(product.price)}</p>
          <p className="mb-6 text-muted">{product.description}</p>
          <AddToCart product={product} />
        </div>
      </div>
      {related.length > 0 && (<>
        <h2 className="mb-6 mt-20 font-display text-3xl font-semibold">You may also like</h2>
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">{related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}</div>
      </>)}
    </section>
  );
}
