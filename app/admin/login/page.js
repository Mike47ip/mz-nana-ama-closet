'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  async function submit(e) {
    e.preventDefault(); setErr('');
    const r = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: pw }) });
    if (r.ok) { router.push('/admin'); router.refresh(); } else setErr((await r.json().catch(() => ({}))).error || 'Login failed.');
  }
  return (
    <div className="grid min-h-screen place-items-center px-5">
      <form onSubmit={submit} className="w-full max-w-sm animate-rise rounded-3xl bg-surface p-8">
        <h1 className="mb-1 font-display text-4xl font-semibold">Admin</h1>
        <p className="mb-6 text-muted">Adwoa &amp; Co. store management</p>
        <input type="password" autoFocus value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Password" aria-label="Password" className="mb-3 w-full rounded-xl border border-line bg-bg px-4 py-3" />
        {err && <p className="mb-3 text-sm text-accent" role="alert">{err}</p>}
        <button className="w-full rounded-full bg-accent py-3 font-semibold text-accent-ink">Log in</button>
      </form>
    </div>
  );
}
