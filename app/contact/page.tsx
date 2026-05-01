'use client';
import { useState } from 'react';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-4 py-16">
          <h1 className="heading-mega text-4xl md:text-6xl mb-8">CONTACT</h1>
          {sent ? (
            <p className="text-accent font-display tracking-wider-2 uppercase">★ Message received. We&apos;ll be in touch.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="name" required placeholder="Your name" className="w-full bg-card border border-border px-4 py-3" />
              <input name="email" type="email" required placeholder="Your email" className="w-full bg-card border border-border px-4 py-3" />
              <textarea name="message" required rows={6} placeholder="Your message" className="w-full bg-card border border-border px-4 py-3" />
              <button type="submit" disabled={submitting} className="btn-primary">
                {submitting ? 'SENDING…' : 'SEND MESSAGE'}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
