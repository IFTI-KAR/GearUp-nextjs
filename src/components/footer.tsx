import React from 'react';
import Link from 'next/link';
import { Dumbbell, ShieldCheck, CreditCard, RefreshCw, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/20">
                <Dumbbell className="w-5 h-5 -rotate-45" />
              </div>
              <span className="font-extrabold text-xl text-white">
                Gear<span className="text-emerald-400">Up</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400">
              The premium sports and outdoor gear rental marketplace. Rent top-tier mountain bikes, camping gear, kayaks, snowboards & fitness equipment on demand.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-300">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Providers
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2.5 py-1 rounded-full">
                <CreditCard className="w-3.5 h-3.5" /> Stripe & SSLCommerz
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Categories</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/gear?category=Cycling" className="hover:text-emerald-400 transition">Cycling & Mountain Bikes</Link></li>
              <li><Link href="/gear?category=Camping" className="hover:text-emerald-400 transition">Camping & Hiking Tents</Link></li>
              <li><Link href="/gear?category=Water+Sports" className="hover:text-emerald-400 transition">Water Sports & SUP Boards</Link></li>
              <li><Link href="/gear?category=Winter+Sports" className="hover:text-emerald-400 transition">Winter Sports & Snowboards</Link></li>
              <li><Link href="/gear?category=Fitness+%26+Gym" className="hover:text-emerald-400 transition">Fitness & Gym Equipment</Link></li>
            </ul>
          </div>

          {/* Role Portals */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform Roles</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/dashboard/customer" className="hover:text-emerald-400 transition">Customer Rental Dashboard</Link></li>
              <li><Link href="/dashboard/provider" className="hover:text-cyan-400 transition">Provider Inventory Portal</Link></li>
              <li><Link href="/dashboard/admin" className="hover:text-amber-400 transition">Admin Moderation Center</Link></li>
              <li><Link href="/auth/login" className="hover:text-emerald-400 transition">Authentication Portal</Link></li>
            </ul>
          </div>

          {/* Platform Security */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Payment & Security</h4>
            <p className="text-xs text-slate-400 mb-3">
              All transactions are encrypted with 256-bit SSL protection. Rent with complete peace of mind.
            </p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] space-y-1 text-slate-300">
              <div className="flex items-center justify-between">
                <span>Payment Gateways:</span>
                <span className="font-semibold text-white">Stripe / SSLCommerz</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Cancellation:</span>
                <span className="text-emerald-400 font-semibold">100% Refundable</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 GearUp Inc. All rights reserved. Built for Assignment 5.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              Made with <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400 inline" /> for Sports Enthusiasts
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
