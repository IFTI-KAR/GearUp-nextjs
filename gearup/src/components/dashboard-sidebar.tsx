'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  BarChart3, 
  Settings, 
  User, 
  PlusCircle, 
  Compass, 
  Grid,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Dumbbell
} from 'lucide-react';

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user, role, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  if (!user || !role) return null;

  const adminLinks = [
    { label: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
    { label: 'Users Management', href: '/dashboard/admin#users', icon: Users },
    { label: 'Analytics', href: '/dashboard/admin/analytics', icon: BarChart3 },
    { label: 'Categories', href: '/dashboard/admin/categories', icon: Grid },
    { label: 'Profile', href: '/dashboard/admin/profile', icon: User },
    { label: 'Settings', href: '/dashboard/admin/settings', icon: Settings },
  ];

  const providerLinks = [
    { label: 'Overview', href: '/dashboard/provider', icon: LayoutDashboard },
    { label: 'Add New Gear', href: '/dashboard/provider/gear/new', icon: PlusCircle },
    { label: 'Rental Orders', href: '/dashboard/provider/orders', icon: ShoppingBag },
    { label: 'Profile', href: '/dashboard/provider/profile', icon: User },
    { label: 'Settings', href: '/dashboard/provider/settings', icon: Settings },
  ];

  const customerLinks = [
    { label: 'Overview', href: '/dashboard/customer', icon: LayoutDashboard },
    { label: 'Browse Catalog', href: '/gear', icon: Compass },
    { label: 'Profile', href: '/dashboard/customer/profile', icon: User },
    { label: 'Settings', href: '/dashboard/customer/settings', icon: Settings },
  ];

  const navLinks = role === 'ADMIN' ? adminLinks : role === 'PROVIDER' ? providerLinks : customerLinks;

  return (
    <aside
      className={`hidden lg:flex flex-col justify-between h-[calc(100vh-4.5rem)] sticky top-18 z-40 transition-all duration-300 border-r border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md ${
        collapsed ? 'w-20' : 'w-64'
      } p-4`}
    >
      <div className="space-y-6">
        {/* Header / Collapse Toggle */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                role === 'ADMIN' ? 'bg-amber-500/20 text-amber-500' :
                role === 'PROVIDER' ? 'bg-cyan-500/20 text-cyan-500' : 'bg-emerald-500/20 text-emerald-500'
              }`}>
                {role} PORTAL
              </span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition mx-auto"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-emerald-500 text-white dark:text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
                title={collapsed ? link.label : undefined}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!collapsed && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User info & Sign out at bottom */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
        {!collapsed && user && (
          <div className="flex items-center gap-2.5 px-2 py-1">
            <img
              src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
            />
            <div className="flex flex-col truncate">
              <span className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.name}</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{user.email}</span>
            </div>
          </div>
        )}

        <button
          onClick={logout}
          className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition ${
            collapsed ? 'p-2' : ''
          }`}
          title={collapsed ? 'Sign Out' : undefined}
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
