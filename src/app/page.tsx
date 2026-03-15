'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export default function Home() {
  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    if (token && token.trim() !== '') {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [token, router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}
