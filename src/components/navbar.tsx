'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { UserRole } from '@/lib/types';
import { ThemeToggle } from './theme-toggle';
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
  Zap,
  Info,
  Mail,
  BookOpen,
  Settings,
  ChevronDown
} from 'lucide-react';

export function Navbar() {
  const { user, role, logout, quickLogin } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const getDashboardLink = () => {
    if (role === 'CUSTOMER') return '/dashboard/customer';
    if (role === 'PROVIDER') return '/dashboard/provider';
    if (role === 'ADMIN') return '/dashboard/admin';
    return '/auth/login';
  };

  const getRoleIcon = (r: UserRole | null) => {
    if (r === 'ADMIN') return <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />;
    if (r === 'PROVIDER') return <Store className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />;
    return <ShoppingBag className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
  };

  const navLinkClass = (active: boolean) =>
    `transition ${active ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`;

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      {/* Quick Role Switcher Banner */}
      <div className="bg-slate-100 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 px-4 py-1.5 text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
            <Zap className="w-3.5 h-3.5 fill-emerald-500 dark:fill-emerald-400" /> Demo Quick Switcher:
          </span>
          <span className="hidden sm:inline text-slate-400 dark:text-slate-500">Test platform roles with 1 click:</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => quickLogin('CUSTOMER')}
            className={`px-2.5 py-0.5 rounded-full font-medium transition ${
              role === 'CUSTOMER' 
                ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40 ring-1 ring-emerald-200 dark:ring-emerald-500/30' 
                : 'bg-slate-200 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            Customer
          </button>
          <button
            onClick={() => quickLogin('PROVIDER')}
            className={`px-2.5 py-0.5 rounded-full font-medium transition ${
              role === 'PROVIDER' 
                ? 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/40 ring-1 ring-cyan-200 dark:ring-cyan-500/30' 
                : 'bg-slate-200 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            Provider
          </button>
          <button
            onClick={() => quickLogin('ADMIN')}
            className={`px-2.5 py-0.5 rounded-full font-medium transition ${
              role === 'ADMIN' 
                ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40 ring-1 ring-amber-200 dark:ring-amber-500/30' 
                : 'bg-slate-200 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
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
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
            <Dumbbell className="w-5 h-5 -rotate-45" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
              Gear<span className="text-emerald-600 dark:text-emerald-400">Up</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold -mt-1">
              Sports & Outdoors
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium">
          <Link href="/" className={navLinkClass(pathname === '/')}>
            Home
          </Link>
          <Link href="/gear" className={`flex items-center gap-1.5 ${navLinkClass(pathname.startsWith('/gear'))}`}>
            <Compass className="w-4 h-4" /> Browse Gear
          </Link>
          <Link href="/about" className={navLinkClass(pathname === '/about')}>
            About
          </Link>
          <Link href="/blog" className={navLinkClass(pathname === '/blog' || pathname.startsWith('/blog/'))}>
            Blog
          </Link>
          <Link href="/contact" className={navLinkClass(pathname === '/contact')}>
            Contact
          </Link>
          {role && (
            <Link
              href={getDashboardLink()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition ${
                pathname.startsWith('/dashboard')
                  ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400'
                  : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{role === 'CUSTOMER' ? 'Customer' : role === 'PROVIDER' ? 'Provider' : 'Admin'} Dashboard</span>
            </Link>
          )}
        </nav>

        {/* Auth / User Control + Theme */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-full py-1 px-3 hover:border-slate-300 dark:hover:border-slate-700 transition"
              >
                <Image
                  src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                  alt={user.name}
                  width={28}
                  height={28}
                  className="rounded-full object-cover border border-slate-200 dark:border-slate-700"
                />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-slate-900 dark:text-white leading-none truncate max-w-[100px]">
                    {user.name}
                  </span>
                  <span className="text-[10px] font-bold tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1 leading-tight mt-0.5">
                    {getRoleIcon(role)} {role}
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl dark:shadow-2xl shadow-slate-200/50 dark:shadow-black/40 z-50">
                  <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                  </div>
                  <Link
                    href={getDashboardLink()}
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                  >
                    <LayoutDashboard className="w-4 h-4 text-emerald-500" /> Dashboard
                  </Link>
                  <Link
                    href={`/dashboard/${role?.toLowerCase()}/profile`}
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                  >
                    <UserIcon className="w-4 h-4 text-cyan-500" /> Profile
                  </Link>
                  <Link
                    href={`/dashboard/${role?.toLowerCase()}/settings`}
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                  >
                    <Settings className="w-4 h-4 text-purple-500" /> Settings
                  </Link>
                  <div className="border-t border-slate-100 dark:border-slate-800 mt-1 pt-1">
                    <button
                      onClick={() => { logout(); setProfileDropdownOpen(false); }}
                      className="flex items-center gap-2.5 w-full px-4 py-2.5 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/auth/login"
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white dark:text-slate-950 transition shadow-md shadow-emerald-500/20"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-t border-slate-200 dark:border-slate-800 px-4 py-4 space-y-1">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50">
            Home
          </Link>
          <Link href="/gear" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50">
            <Compass className="w-4 h-4" /> Browse Gear
          </Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50">
            <Info className="w-4 h-4" /> About
          </Link>
          <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50">
            <BookOpen className="w-4 h-4" /> Blog
          </Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50">
            <Mail className="w-4 h-4" /> Contact
          </Link>
          {user && (
            <Link
              href={getDashboardLink()}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium py-2 px-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-500/10"
            >
              <LayoutDashboard className="w-4 h-4" /> My Dashboard ({role})
            </Link>
          )}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-3 mt-3">
            {user ? (
              <div className="space-y-1">
                <Link
                  href={`/dashboard/${role?.toLowerCase()}/profile`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50"
                >
                  <UserIcon className="w-4 h-4" /> Profile
                </Link>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="w-full text-left text-red-500 font-medium py-2 px-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 font-semibold text-white dark:text-slate-950 bg-emerald-500 rounded-lg"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
