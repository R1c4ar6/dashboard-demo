import { LoginCredentials, LoginResponse, UsersResponse, User } from '@/types';

const API_BASE = 'https://dummyjson.com/auth';

export const apiClient = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  },

  async getUsers(token: string): Promise<UsersResponse> {
    const response = await fetch(`${API_BASE}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    return response.json();
  },

  async getUserById(id: number, token: string): Promise<User> {
    const response = await fetch(`${API_BASE}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    return response.json();
  },
};