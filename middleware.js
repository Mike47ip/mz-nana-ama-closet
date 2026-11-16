import { NextResponse } from 'next/server';
import { COOKIE, sessionToken } from '@/lib/auth';

// Everything under /admin and /api/admin needs the session cookie, except the login page and login API.
export async function middleware(req) {
  const { pathname } = req.nextUrl;
  if (pathname === '/admin/login' || pathname === '/api/admin/login') return NextResponse.next();
  const token = await sessionToken();
  if (token && req.cookies.get(COOKIE)?.value === token) return NextResponse.next();
  if (pathname.startsWith('/api/')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const url = req.nextUrl.clone();
  url.pathname = '/admin/login';
  url.search = '';
  return NextResponse.redirect(url);
}
export const config = { matcher: ['/admin/:path*', '/api/admin/:path*'] };
