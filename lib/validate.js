import { CATEGORIES, COLORS } from './products';

export const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'product';

export function clean(b) {
  const name = String(b.name || '').trim();
  if (!name) return { error: 'Name is required.' };
  if (!CATEGORIES.includes(b.category)) return { error: 'Choose a category.' };
  const price = Number(b.price);
  if (!Number.isFinite(price) || price < 0) return { error: 'Enter a valid price.' };
  const colors = (b.colors || []).filter((c) => c in COLORS);
  if (!colors.length) return { error: 'Pick at least one colour.' };
  const sizes = (b.sizes || []).map((s) => String(s).trim()).filter(Boolean);
  if (!sizes.length) return { error: 'Add at least one size.' };
  const images = (b.images || []).filter((u) => typeof u === 'string' && /^(\/uploads\/[\w.-]+|\/products\/[\w.-]+|https:\/\/.+)$/.test(u));
  return { name, category: b.category, price, colors, sizes, images, description: String(b.description || '').trim(), tag: String(b.tag || '').trim() };
}
