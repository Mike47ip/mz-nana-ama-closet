import { NextResponse } from 'next/server';
import { getProducts, saveProducts } from '@/lib/store';
import { clean, slug } from '@/lib/validate';

export async function POST(req) {
  const r = clean(await req.json().catch(() => ({})));
  if (r.error) return NextResponse.json({ error: r.error }, { status: 400 });
  const list = await getProducts();
  let id = slug(r.name), n = 2;
  while (list.some((p) => p.id === id)) id = `${slug(r.name)}-${n++}`;
  const product = { id, ...r };
  await saveProducts([...list, product]);
  return NextResponse.json(product);
}
