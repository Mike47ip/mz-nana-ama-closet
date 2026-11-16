import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { UPLOADS } from '@/lib/store';

const EXT = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };

// Vercel Blob when BLOB_READ_WRITE_TOKEN exists (Vercel), otherwise saves to data/uploads (local).
export async function POST(req) {
  const files = (await req.formData()).getAll('files');
  if (!files.length) return NextResponse.json({ error: 'No files.' }, { status: 400 });
  const urls = [];
  for (const f of files) {
    const ext = EXT[f.type];
    if (!ext) return NextResponse.json({ error: 'Only JPG, PNG or WebP images.' }, { status: 400 });
    if (f.size > 8 * 1024 * 1024) return NextResponse.json({ error: 'Each image must be under 8 MB.' }, { status: 400 });
    const name = `${randomUUID()}.${ext}`;
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`products/${name}`, f, { access: 'public', contentType: f.type });
      urls.push(blob.url);
    } else {
      await fs.mkdir(UPLOADS, { recursive: true });
      await fs.writeFile(path.join(UPLOADS, name), Buffer.from(await f.arrayBuffer()));
      urls.push(`/uploads/${name}`);
    }
  }
  return NextResponse.json({ urls });
}