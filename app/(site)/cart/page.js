'use client';
import Link from 'next/link';
import ProductImage from '@/components/ProductImage';
import { useCart } from '@/components/CartProvider';
import { money } from '@/lib/products';

export default function CartPage() {
  const { items, remove, total } = useCart();
  return (
    <section className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="mb-6 font-display text-5xl font-semibold">Your bag</h1>
      {items.length === 0 ? (
        <p className="text-muted">Your bag is empty. <Link href="/shop" className="text-accent underline">Pick a dress, bag or pair of heels.</Link></p>
      ) : (
        <>
          {items.map((i) => (
            <div key={i.key} className="flex animate-pop items-center gap-4 border-b border-line py-4">
              <div className="h-20 w-16 flex-none overflow-hidden rounded-xl"><ProductImage product={i.product} sizes="64px" /></div>
              <div className="flex-1 text-sm"><b className="block text-base">{i.product.name}</b><span className="text-muted">{i.color} · {i.size} · Qty {i.qty}</span><br />{money(i.product.price * i.qty)}</div>
              <button onClick={() => remove(i.key)} className="text-sm text-muted underline">Remove</button>
            </div>
          ))}
          <div className="flex justify-between py-5 text-lg font-semibold"><span>Total</span><span>{money(total)}</span></div>
          {/* TODO: connect payment (Paystack, Flutterwave, Stripe) here. */}
          <button className="w-full rounded-full bg-accent py-3.5 font-semibold text-accent-ink" onClick={() => alert('Payment is not connected yet.')}>Checkout</button>
        </>
      )}
    </section>
  );
}
