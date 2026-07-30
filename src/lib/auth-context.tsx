'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserRole } from './types';
import { fetchApi } from './api-client';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  isLoading: boolean;
  login: (email: string, role?: UserRole) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, role: UserRole, phone?: string) => Promise<{ success: boolean; error?: string }>;
  quickLogin: (targetRole: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ROLE_EMAILS: Record<UserRole, string> = {
  CUSTOMER: 'customer@gearup.com',
  PROVIDER: 'provider@gearup.com',
  ADMIN: 'admin@gearup.com',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const setAuthCookieAndStorage = (userData: User, token: string) => {
    localStorage.setItem('gearup_token', token);
    localStorage.setItem('gearup_user', JSON.stringify(userData));
    // Set cookie accessible by Middleware
    document.cookie = `gearup_user_role=${userData.role}; path=/; max-age=86400; SameSite=Lax`;
    document.cookie = `gearup_user_id=${userData.id}; path=/; max-age=86400; SameSite=Lax`;
    setUser(userData);
  };

  const clearAuthCookieAndStorage = () => {
    localStorage.removeItem('gearup_token');
    localStorage.removeItem('gearup_user');
    document.cookie = 'gearup_user_role=; path=/; max-age=0';
    document.cookie = 'gearup_user_id=; path=/; max-age=0';
    setUser(null);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('gearup_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        // Ensure cookie is synced
        document.cookie = `gearup_user_role=${parsed.role}; path=/; max-age=86400; SameSite=Lax`;
        document.cookie = `gearup_user_id=${parsed.id}; path=/; max-age=86400; SameSite=Lax`;
      } catch {
        clearAuthCookieAndStorage();
      }
    } else {
      // Default to customer on initial demo load for smooth user experience if non-authenticated
      const defaultDemoUser: User = {
        id: 'usr-customer-1',
        name: 'Alex Johnson',
        email: 'customer@gearup.com',
        role: 'CUSTOMER',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        phone: '+1 (555) 234-5678',
        status: 'ACTIVE',
        createdAt: '2026-01-15T10:00:00Z',
      };
      setAuthCookieAndStorage(defaultDemoUser, 'token-customer-demo');
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, requestedRole?: UserRole) => {
    setIsLoading(true);
    const res = await fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, role: requestedRole }),
    });

    if (res.success && res.data) {
      setAuthCookieAndStorage(res.data.user, res.data.token);
      setIsLoading(false);
      return { success: true };
    } else {
      setIsLoading(false);
      return { success: false, error: res.error || 'Login failed' };
    }
  };

  const register = async (name: string, email: string, role: UserRole, phone?: string) => {
    setIsLoading(true);
    const res = await fetchApi('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, role, phone }),
    });

    if (res.success && res.data) {
      setAuthCookieAndStorage(res.data.user, res.data.token);
      setIsLoading(false);
      return { success: true };
    } else {
      setIsLoading(false);
      return { success: false, error: res.error || 'Registration failed' };
    }
  };

  const quickLogin = async (targetRole: UserRole) => {
    const email = ROLE_EMAILS[targetRole];
    await login(email, targetRole);
    if (targetRole === 'CUSTOMER') router.push('/dashboard/customer');
    else if (targetRole === 'PROVIDER') router.push('/dashboard/provider');
    else if (targetRole === 'ADMIN') router.push('/dashboard/admin');
  };

  const logout = () => {
    clearAuthCookieAndStorage();
    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isLoading,
        login,
        register,
        quickLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
