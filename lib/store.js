// Product storage with two modes, picked automatically:
//  - Upstash Redis when its env vars exist (Vercel)
//  - a JSON file in /data otherwise (local development, VPS)
import fs from 'node:fs/promises';
import path from 'node:path';
import { Redis } from '@upstash/redis';

const DATA = path.join(process.cwd(), 'data');
const FILE = path.join(DATA, 'products.json');
export const UPLOADS = path.join(DATA, 'uploads');

const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;
const KEY = 'products';

export async function getProducts() {
  if (redis) return (await redis.get(KEY)) || [];
  try { return JSON.parse(await fs.readFile(FILE, 'utf8')); } catch { return []; }
}
export async function getProduct(id) {
  return (await getProducts()).find((p) => p.id === id);
}
export async function saveProducts(list) {
  if (redis) return void (await redis.set(KEY, list));
  await fs.mkdir(DATA, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(list, null, 2));
}