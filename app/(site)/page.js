import Link from 'next/link';
import Icon from '@/components/Icon';
import CategoryTiles from '@/components/CategoryTiles';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/lib/store';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await getProducts();
  const tagged = products.filter((p) => p.tag);
  const featured = (tagged.length ? tagged : products).slice(0, 4);
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-10 pt-16 md:grid-cols-[1.3fr_1fr] md:pt-28">
        <div>
          <h1 className="animate-rise font-display text-5xl font-semibold leading-[.98] md:text-8xl">Dressed for every room you walk into.</h1>
          <p className="mb-7 mt-5 max-w-md animate-rise text-lg text-muted [animation-delay:.12s]">Dresses, bags and heels, chosen for women who like their style simple and sure of itself.</p>
          <Link href="/shop" className="inline-block animate-rise rounded-full bg-accent px-7 py-3.5 font-semibold text-accent-ink transition hover:-translate-y-0.5 hover:shadow-lg [animation-delay:.24s]">Shop the collection</Link>
        </div>
        <div className="relative h-72 animate-rise [animation-delay:.3s] md:h-[420px]" aria-hidden="true">
          {[['left-0 h-[92%]', 'Dresses', '#a63d6f', 'color-mix(in srgb,#a63d6f 22%,var(--surface))', ''],
            ['left-[27%] z-10 h-[74%]', 'Bags', '#8a6a35', 'color-mix(in srgb,#c4a06a 30%,var(--surface))', '[animation-delay:-2s]'],
            ['right-0 h-[84%]', 'Heels', '#2a1a2e', 'color-mix(in srgb,var(--ink) 12%,var(--surface))', '[animation-delay:-4s]']].map(([pos, cat, fg, bg, delay]) => (
            <div key={cat} style={{ background: bg }} className={`absolute bottom-0 grid w-[46%] animate-float place-items-center rounded-t-full rounded-b-2xl ${pos} ${delay}`}>
              <Icon category={cat} color={fg} className="w-3/5" />
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-12">
        <h2 className="mb-6 font-display text-4xl font-semibold">Shop by category</h2>
        <CategoryTiles />
      </section>
      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-12">
          <div className="mb-6 flex items-end justify-between"><h2 className="font-display text-4xl font-semibold">Featured pieces</h2><Link href="/shop" className="text-accent underline">See all</Link></div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">{featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}</div>
        </section>
      )}
    </>
  );
}