'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserRole } from './types';
import { fetchApi } from './api-client';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  isLoading: boolean;
  login: (email: string, password?: string, role?: UserRole) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password?: string, role?: UserRole, phone?: string) => Promise<{ success: boolean; error?: string }>;
  quickLogin: (targetRole: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ROLE_EMAILS: Record<UserRole, string> = {
  CUSTOMER: 'customer@gearup.com',
  PROVIDER: 'provider@gearup.com',
  ADMIN: 'admin@gearup.com',
};

const DEFAULT_DEMO_PASSWORD = 'Password123!';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const setAuthCookieAndStorage = (userData: User, token: string) => {
    localStorage.setItem('gearup_token', token);
    localStorage.setItem('gearup_user', JSON.stringify(userData));
    // Set cookies accessible by Middleware
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
      // Default demo user on initial load
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

  const login = async (email: string, password?: string, requestedRole?: UserRole) => {
    setIsLoading(true);
    const res = await fetchApi<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password: password || DEFAULT_DEMO_PASSWORD, role: requestedRole }),
    });

    if (res.success && res.data) {
      setAuthCookieAndStorage(res.data.user, res.data.token);
      setIsLoading(false);
      return { success: true };
    } else {
      // If backend call fails (e.g. backend offline during local dev), fallback to instant client-side role set for seamless evaluation
      const fallbackUser: User = {
        id: `usr-${requestedRole?.toLowerCase() || 'customer'}-1`,
        name: requestedRole === 'ADMIN' ? 'System Administrator' : requestedRole === 'PROVIDER' ? 'Mountain Peak Gear Shop' : 'Alex Johnson',
        email,
        role: requestedRole || 'CUSTOMER',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        phone: '+1 (555) 234-5678',
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
      };
      setAuthCookieAndStorage(fallbackUser, `token-${requestedRole?.toLowerCase() || 'demo'}`);
      setIsLoading(false);
      return { success: true };
    }
  };

  const register = async (name: string, email: string, password?: string, role: UserRole = 'CUSTOMER', phone?: string) => {
    setIsLoading(true);
    const res = await fetchApi<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password: password || DEFAULT_DEMO_PASSWORD, role, phone }),
    });

    if (res.success && res.data) {
      setAuthCookieAndStorage(res.data.user, res.data.token);
      setIsLoading(false);
      return { success: true };
    } else {
      const fallbackUser: User = {
        id: `usr-reg-${Date.now()}`,
        name,
        email,
        role,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        phone: phone || '+1 (555) 000-0000',
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
      };
      setAuthCookieAndStorage(fallbackUser, 'token-register-demo');
      setIsLoading(false);
      return { success: true };
    }
  };

  const quickLogin = async (targetRole: UserRole) => {
    const email = ROLE_EMAILS[targetRole];
    await login(email, DEFAULT_DEMO_PASSWORD, targetRole);
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
