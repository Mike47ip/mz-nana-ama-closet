'use client';
import { useState } from 'react';

const fld = 'mb-3 w-full rounded-2xl border border-line bg-surface px-4 py-3';
export default function ContactForm() {
  const [sent, setSent] = useState(false);
  if (sent) return <p className="animate-pop rounded-2xl bg-surface p-6">Thank you. We will reply within one day.</p>;
  // TODO: send to your backend or email service.
  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
      <input className={fld} placeholder="Your name" aria-label="Your name" required />
      <input className={fld} type="email" placeholder="Email address" aria-label="Email address" required />
      <textarea className={`${fld} min-h-[120px]`} placeholder="How can we help?" aria-label="Message" required />
      <button className="rounded-full bg-accent px-7 py-3.5 font-semibold text-accent-ink transition hover:-translate-y-0.5 hover:shadow-lg">Send message</button>
    </form>
  );
}
