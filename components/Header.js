'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useCart } from './CartProvider';
import logo from '@/app/assets/images/nana-ama-logo.png';

const links = [['/', 'Home'], ['/shop', 'Shop'], ['/about', 'About'], ['/contact', 'Contact']];

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const active = (h) => (h === '/' ? path === '/' : path.startsWith(h));
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2.5 font-display text-3xl font-bold">
          <Image src={logo} alt="Nana Ama logo" priority className="h-12 w-auto" />
          Mz Nana Ama Closet 
        </Link>
        <nav className={`${open ? 'flex' : 'hidden md:flex'} absolute left-0 right-0 top-full flex-col gap-1 border-b border-line bg-bg px-5 pb-4 md:static md:flex-row md:border-0 md:bg-transparent md:p-0`}>
          {links.map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              className={`rounded-full px-4 py-2 font-medium transition ${active(href) ? 'bg-ink text-bg' : 'text-muted hover:text-ink'}`}>{label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2.5">
          <Link href="/cart" className="flex items-center gap-2.5 rounded-full border border-line px-4 py-2 transition hover:border-accent" aria-label="Open bag">
            Bag <span className="grid h-[22px] min-w-[22px] place-items-center rounded-full bg-accent px-1.5 text-xs font-semibold text-accent-ink">{count}</span>
          </Link>
          <button className="h-10 w-10 rounded-full border border-line md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
        </div>
      </div>
    </header>
  );
}