import Link from 'next/link';

const col = 'block py-1 text-bg/70 transition hover:text-bg';
export default function Footer() {
  return (
    <footer className="mt-10 bg-ink text-bg">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 pb-8 pt-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="font-display text-3xl font-bold">Nana Ama Closet</Link>
          <p className="mb-4 mt-2 max-w-xs text-bg/65">Dresses, bags and heels for women who dress with confidence.</p>
          <form className="flex gap-2" action="#">
            <input type="email" required placeholder="Email for new arrivals" aria-label="Email for new arrivals" className="min-w-0 flex-1 rounded-full border border-bg/30 bg-transparent px-4 py-2.5 placeholder:text-bg/50" />
            <button className="rounded-full bg-bg px-5 py-2.5 font-semibold text-ink">Join</button>
          </form>
        </div>
        <div><h4 className="mb-3 font-semibold">Shop</h4>{['Dresses', 'Bags', 'Heels'].map((c) => <Link key={c} className={col} href={`/shop?category=${c}`}>{c}</Link>)}</div>
        <div><h4 className="mb-3 font-semibold">Company</h4><Link className={col} href="/">Home</Link><Link className={col} href="/about">About</Link><Link className={col} href="/contact">Contact</Link></div>
        <div><h4 className="mb-3 font-semibold">Help</h4>{['Delivery', 'Returns', 'Size guide', 'Instagram'].map((t) => <span key={t} className={col}>{t}</span>)}</div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 border-t border-bg/20 px-5 py-5 text-sm text-bg/60">
        <span>© 2026 Nana Ama Closet. All rights reserved.</span><span>Mobile Money · Visa · Mastercard</span>
      </div>
    </footer>
  );
}
