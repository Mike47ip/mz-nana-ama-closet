// Client-safe constants and helpers. Product data itself lives in data/products.json (managed from /admin).
export const COLORS = { Blush: '#e9a9c0', Noir: '#2b2230', Emerald: '#1f7a5c', Gold: '#c4a06a', Ruby: '#b3263f', Ivory: '#efe6d6' };
export const CATEGORIES = ['Dresses', 'Bags', 'Heels'];
export const DEFAULT_SIZES = { Dresses: 'XS, S, M, L, XL', Bags: 'One size', Heels: '36, 37, 38, 39, 40, 41' };
export const money = (n) => `GH₵ ${Number(n).toLocaleString()}`;
export const tint = (color) => `color-mix(in srgb, ${COLORS[color]} 28%, var(--surface))`;
