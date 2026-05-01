'use client';
import { useState } from 'react';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-4 py-16">
          <h1 className="heading-mega text-4xl md:text-6xl mb-8">CONTACT</h1>
          {status === 'sent' ? (
            <div className="border border-accent bg-card p-6 text-center">
              <p className="text-accent font-display tracking-wider-2 uppercase mb-2">★ Message sent</p>
              <p className="text-muted">We&apos;ll be back at you within one business day.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <input
                required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Name"
                className="w-full bg-card border border-border px-4 py-3 focus:outline-none focus:border-accent"
              />
              <input
                type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email"
                className="w-full bg-card border border-border px-4 py-3 focus:outline-none focus:border-accent"
              />
              <textarea
                required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={6} placeholder="What&apos;s up?"
                className="w-full bg-card border border-border px-4 py-3 focus:outline-none focus:border-accent"
              />
              <button type="submit" disabled={status === 'sending'} className="btn-primary">
                {status === 'sending' ? 'SENDING…' : 'SEND MESSAGE'}
              </button>
              {status === 'error' && <p className="text-accent text-sm">Something went sideways. Try again?</p>}
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
