import { NextResponse } from 'next/server';
import { getProducts, saveProducts } from '@/lib/store';
import { clean } from '@/lib/validate';

export async function PUT(req, { params }) {
  const r = clean(await req.json().catch(() => ({})));
  if (r.error) return NextResponse.json({ error: r.error }, { status: 400 });
  const list = await getProducts();
  if (!list.some((p) => p.id === params.id)) return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  await saveProducts(list.map((p) => (p.id === params.id ? { id: p.id, ...r } : p)));
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req, { params }) {
  await saveProducts((await getProducts()).filter((p) => p.id !== params.id));
  return NextResponse.json({ ok: true });
}
