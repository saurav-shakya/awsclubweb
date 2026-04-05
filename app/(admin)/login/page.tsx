'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogin = () => {
    setError(null);
    startTransition(async () => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { setError(error.message); return; }
      router.push('/admin');
      router.refresh();
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-xl font-semibold text-white text-center">Admin Login</h1>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
          placeholder="Email" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}
          placeholder="Password" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white" />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button onClick={handleLogin} disabled={isPending}
          className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-zinc-950 font-semibold text-sm rounded-lg py-2.5">
          {isPending ? 'Signing in...' : 'Sign In'}
        </button>
      </div>
    </div>
  );
}
