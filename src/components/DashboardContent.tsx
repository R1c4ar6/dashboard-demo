'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { useAuth } from '@/lib/auth';
import { apiClient } from '@/lib/api';
import { User } from '@/types';
import { StatsCards } from './StatsCards';
import { UsersTable } from './UsersTable';
import { UserModal } from './UserModal';

const fetcher = (token: string) => () => apiClient.getUsers(token);

export function DashboardContent() {
    const router = useRouter();
    const { user, token, logout } = useAuth();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: usersData, error, isLoading } = useSWR(
        token ? 'users' : null,
        fetcher(token!)
    );

    if (error) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-lg sm:text-xl font-semibold text-foreground mb-2">Error loading data</h1>
                    <p className="text-muted-foreground mb-4 text-sm sm:text-base">Please try again later</p>
                    <button
                        onClick={logout}
                        className="bg-primary text-primary-foreground px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-primary/90 transition-colors text-xs sm:text-sm"
                    >
                        Logout
                    </button>
                </div>
            </div>
        );
    }

    const users = usersData?.users || [];

    const handleUserClick = (user: User) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <div className="min-h-screen bg-background">
            <header className="bg-card border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-12 sm:h-16">
                        <h1 className="font-semibold text-base sm:text-lg">Dummy Dashboard For Your Tired Eyes</h1>
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <span className="text-xs sm:text-sm text-muted-foreground">
                                Welcome back {user?.firstName}
                            </span>
                            <button
                                onClick={logout}
                                className="bg-red-700 text-primary-foreground px-3 py-1.5 sm:px-4 sm:py-2 rounded-md hover:bg-red-900 transition-colors text-xs sm:text-sm"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-primary"></div>
                        <p className="text-muted-foreground mt-3 text-sm sm:text-base">Loading dashboard...</p>
                    </div>
                ) : (
                    <>
                        <StatsCards users={users} />
                        <UsersTable users={users} onUserClick={handleUserClick} />
                    </>
                )}
            </main>

            <UserModal
                user={selectedUser}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );

}
