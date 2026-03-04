'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { useAuth } from '@/lib/auth';
import { apiClient } from '@/lib/api';
import { User } from '@/types';
import { StatsCards } from '@/components/StatsCards';
import { UsersTable } from '@/components/UsersTable';
import { UserModal } from '@/components/UserModal';

const fetcher = (token: string) => () => apiClient.getUsers(token);

export default function DashboardPage() {
  const router = useRouter();
  const { token, logout} = useAuth();
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
          <h1 className="text-xl font-semibold text-foreground mb-2">Error loading data</h1>
          <p className="text-muted-foreground mb-4">Please try again later</p>
          <button
            onClick={logout}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
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
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome back
              </span>
              <button
                onClick={logout}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-muted-foreground mt-4">Loading dashboard...</p>
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
