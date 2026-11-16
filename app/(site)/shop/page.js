import { Suspense } from 'react';
import ShopClient from '@/components/ShopClient';
import { getProducts } from '@/lib/store';

export const metadata = { title: 'Shop | Nana Ama Closet.' };
export const dynamic = 'force-dynamic';

export default async function ShopPage() {
  const products = await getProducts();
  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      <h1 className="font-display text-5xl font-semibold">The collection</h1>
      <p className="mb-8 mt-2 text-muted">Pick a piece to see colours and sizes.</p>
      <Suspense fallback={null}><ShopClient products={products} /></Suspense>
    </section>
  );
}
