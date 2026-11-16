import { NextResponse } from 'next/server';
import { COOKIE, sessionToken } from '@/lib/auth';

export async function POST(req) {
  const token = await sessionToken();
  if (!token) return NextResponse.json({ error: 'Set ADMIN_PASSWORD in .env.local first.' }, { status: 500 });
  const { password } = await req.json().catch(() => ({}));
  if (password !== process.env.ADMIN_PASSWORD) return NextResponse.json({ error: 'Wrong password.' }, { status: 401 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, token, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 7, secure: process.env.NODE_ENV === 'production' });
  return res;
}
