'use client';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();
  async function out() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  }
  return (
    <button onClick={out} className="text-muted hover:text-accent text-xs tracking-wider-2 uppercase">
      Sign out
    </button>
  );
}
