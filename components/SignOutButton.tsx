'use client';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export function SignOutButton() {
  const router = useRouter();
  async function signOut() {
    await fetch('/api/auth/signout', { method: 'POST' });
    router.push('/');
    router.refresh();
  }
  return (
    <button onClick={signOut} className="btn-secondary inline-flex items-center gap-2">
      <LogOut size={16} /> SIGN OUT
    </button>
  );
}
