'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { UserRole } from '@/lib/types';
import { 
  Dumbbell, 
  Compass, 
  LayoutDashboard, 
  LogOut, 
  User as UserIcon, 
  ShieldAlert, 
  Store, 
  ShoppingBag,
  Menu,
  X,
  Zap
} from 'lucide-react';

export function Navbar() {
  const { user, role, logout, quickLogin } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getDashboardLink = () => {
    if (role === 'CUSTOMER') return '/dashboard/customer';
    if (role === 'PROVIDER') return '/dashboard/provider';
    if (role === 'ADMIN') return '/dashboard/admin';
    return '/auth/login';
  };

  const getRoleIcon = (r: UserRole | null) => {
    if (r === 'ADMIN') return <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />;
    if (r === 'PROVIDER') return <Store className="w-3.5 h-3.5 text-cyan-400" />;
    return <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />;
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      {/* Quick Role Switcher Banner */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-1.5 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 font-semibold text-emerald-400">
            <Zap className="w-3.5 h-3.5 fill-emerald-400" /> Demo Quick Switcher:
          </span>
          <span className="hidden sm:inline text-slate-500">Test platform roles with 1 click:</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => quickLogin('CUSTOMER')}
            className={`px-2.5 py-0.5 rounded-full font-medium transition ${
              role === 'CUSTOMER' 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 ring-1 ring-emerald-500/30' 
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Customer
          </button>
          <button
            onClick={() => quickLogin('PROVIDER')}
            className={`px-2.5 py-0.5 rounded-full font-medium transition ${
              role === 'PROVIDER' 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 ring-1 ring-cyan-500/30' 
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Provider
          </button>
          <button
            onClick={() => quickLogin('ADMIN')}
            className={`px-2.5 py-0.5 rounded-full font-medium transition ${
              role === 'ADMIN' 
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 ring-1 ring-amber-500/30' 
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Admin
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
            <Dumbbell className="w-5 h-5 -rotate-45" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Gear<span className="text-emerald-400">Up</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold -mt-1">
              Sports & Outdoors
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            href="/"
            className={`transition ${pathname === '/' ? 'text-emerald-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
          >
            Home
          </Link>
          <Link
            href="/gear"
            className={`flex items-center gap-1.5 transition ${pathname.startsWith('/gear') ? 'text-emerald-400 font-semibold' : 'text-slate-300 hover:text-white'}`}
          >
            <Compass className="w-4 h-4" /> Browse Gear
          </Link>
          {role && (
            <Link
              href={getDashboardLink()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition ${
                pathname.startsWith('/dashboard')
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{role === 'CUSTOMER' ? 'Customer' : role === 'PROVIDER' ? 'Provider' : 'Admin'} Dashboard</span>
            </Link>
          )}
        </nav>

        {/* Auth / User Control */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5 bg-slate-900/90 border border-slate-800 rounded-full py-1 px-3">
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover border border-slate-700"
                />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-white leading-none truncate max-w-[100px]">
                    {user.name}
                  </span>
                  <span className="text-[10px] font-bold tracking-wider text-slate-400 flex items-center gap-1 leading-tight mt-0.5">
                    {getRoleIcon(role)} {role}
                  </span>
                </div>
              </div>
              <button
                onClick={logout}
                title="Logout"
                className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/auth/login"
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition shadow-md shadow-emerald-500/20"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-slate-800 px-4 py-4 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-white font-medium py-1"
          >
            Home
          </Link>
          <Link
            href="/gear"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-white font-medium py-1"
          >
            Browse Gear
          </Link>
          {user && (
            <Link
              href={getDashboardLink()}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-emerald-400 font-medium py-1"
            >
              My Dashboard ({role})
            </Link>
          )}
          {user ? (
            <button
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left text-red-400 font-medium py-1 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          ) : (
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 text-slate-200 bg-slate-900 border border-slate-800 rounded-lg"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 font-semibold text-slate-950 bg-emerald-500 rounded-lg"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
