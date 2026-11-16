// Simple password session. The cookie holds a hash derived from ADMIN_PASSWORD, checked in middleware.js.
export const COOKIE = 'admin_session';
export async function sessionToken() {
  const pw = process.env.ADMIN_PASSWORD || '';
  if (!pw) return null;
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${pw}|mz-nana-ama-closet`));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
