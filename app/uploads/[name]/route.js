import fs from 'node:fs/promises';
import path from 'node:path';
import { UPLOADS } from '@/lib/store';

// Serves uploaded photos from data/uploads (files added after build are not served from /public).
const TYPES = { jpg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };

export async function GET(_req, { params }) {
  const name = params.name;
  const ext = name.split('.').pop();
  if (!/^[\w-]+\.(jpg|png|webp)$/.test(name)) return new Response('Not found', { status: 404 });
  try {
    const file = await fs.readFile(path.join(UPLOADS, name));
    return new Response(file, { headers: { 'Content-Type': TYPES[ext], 'Cache-Control': 'public, max-age=31536000, immutable' } });
  } catch { return new Response('Not found', { status: 404 }); }
}
