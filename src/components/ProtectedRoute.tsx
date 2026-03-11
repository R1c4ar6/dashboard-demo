'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { token } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            setTimeout(() => {
                router.push('/login');
            }, 3000); // Delay of 2 seconds
        }
    }, [token, router]);

    if (!token) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                <h3>Redirecting...</h3>
            </div>
        );
    }

    return <>{children}</>;
}