import React from 'react';
import Link from 'next/link';
import { Dumbbell, ShieldCheck, CreditCard, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950 text-slate-600 dark:text-slate-400 mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Col (2 cols) */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-500/20">
                <Dumbbell className="w-5 h-5 -rotate-45" />
              </div>
              <span className="font-extrabold text-xl text-slate-900 dark:text-white">
                Gear<span className="text-emerald-600 dark:text-emerald-400">Up</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 max-w-sm">
              The premier sports and outdoor gear rental marketplace. Rent top-tier mountain bikes, camping gear, kayaks, snowboards & fitness equipment on demand with verified local providers.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Providers
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 px-2.5 py-1 rounded-full">
                <CreditCard className="w-3.5 h-3.5" /> Stripe & SSLCommerz
              </span>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Company</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link href="/about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Outdoor Journal & Guides</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Contact Support</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Categories</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link href="/gear?category=Cycling" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Cycling & Bikes</Link></li>
              <li><Link href="/gear?category=Camping" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Camping & Tents</Link></li>
              <li><Link href="/gear?category=Water+Sports" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Water Sports & SUP</Link></li>
              <li><Link href="/gear?category=Winter+Sports" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Winter Snowboards</Link></li>
              <li><Link href="/gear?category=Fitness+%26+Gym" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Fitness & Gym</Link></li>
            </ul>
          </div>

          {/* Role Dashboards */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Dashboards</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link href="/dashboard/customer" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Customer Portal</Link></li>
              <li><Link href="/dashboard/provider" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition">Provider Inventory</Link></li>
              <li><Link href="/dashboard/admin" className="hover:text-amber-600 dark:hover:text-amber-400 transition">Admin Moderation</Link></li>
              <li><Link href="/auth/login" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Sign In Account</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© 2026 GearUp Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for Sports Enthusiasts
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
