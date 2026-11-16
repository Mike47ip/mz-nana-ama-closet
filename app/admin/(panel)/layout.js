import Link from 'next/link';

export const metadata = { title: 'Admin | Nana Ama Closet.' };

export default function PanelLayout({ children }) {
  return (
    <>
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-4">
          <b className="font-display text-2xl">Adwoa &amp; Co. <span className="text-muted">Admin</span></b>
          <nav className="flex gap-1 text-sm">
            <Link className="rounded-full px-4 py-2 hover:bg-bg" href="/admin">Products</Link>
            <Link className="rounded-full px-4 py-2 hover:bg-bg" href="/admin/products/new">Add product</Link>
            <Link className="rounded-full px-4 py-2 hover:bg-bg" href="/" target="_blank">View store ↗</Link>
            <a className="rounded-full px-4 py-2 text-muted hover:bg-bg" href="/api/admin/logout">Log out</a>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-5 py-10">{children}</div>
    </>
  );
}
