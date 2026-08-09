import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { ShieldCheck, Users, Dumbbell, Award, ArrowRight, HeartHandshake, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | GearUp Sports & Outdoor Rental',
  description: 'Learn about GearUp mission to make high-performance sports and outdoor equipment accessible to everyone through peer-to-peer and shop rentals.',
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
          <Globe className="w-4 h-4" /> Our Story & Mission
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Empowering Outdoor Adventures <br />
          <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Without the Cost of Ownership
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          GearUp was founded on a simple vision: high-quality sports and outdoor equipment shouldn't sit in garages for 350 days a year. We connect passionate adventurers with verified gear owners and local shops for instant, hassle-free daily rentals.
        </p>
      </div>

      {/* Core Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Dumbbell className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Accessibility For All</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Try premium carbon mountain bikes, 4-season tents, and high-end snowboards for a fraction of retail prices without long-term commitment.
          </p>
        </div>

        <div className="p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Empowering Local Shops</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            We partner with independent outdoor retailers and local gear owners to monetize their inventory and build strong community connections.
          </p>
        </div>

        <div className="p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Trust & Safety First</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Every equipment listing undergo strict verification, clear condition reports, and protected payments with full insurance coverage.
          </p>
        </div>
      </div>

      {/* Impact Stats Banner */}
      <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 relative overflow-hidden border border-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="text-3xl sm:text-4xl font-black text-emerald-400 block">50,000+</span>
            <span className="text-xs text-slate-400 mt-1 block">Happy Adventurers</span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-black text-cyan-400 block">1,200+</span>
            <span className="text-xs text-slate-400 mt-1 block">Verified Gear Listings</span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-black text-purple-400 block">45+</span>
            <span className="text-xs text-slate-400 mt-1 block">Cities Served</span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-black text-amber-400 block">4.9/5</span>
            <span className="text-xs text-slate-400 mt-1 block">Average User Rating</span>
          </div>
        </div>
      </div>

      {/* Team / Values */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Our Leadership Team</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Passionate outdoor enthusiasts building the future of gear sharing</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 text-center space-y-3">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" alt="CEO" className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-emerald-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Sarah Jenkins</h3>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Co-Founder & CEO</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Former downhill MTB racer & outdoor tech lead.</p>
          </div>

          <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 text-center space-y-3">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" alt="CTO" className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-cyan-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Marcus Vance</h3>
            <p className="text-xs text-cyan-600 dark:text-cyan-400 font-medium">Head of Product</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Backcountry skier & full-stack architect.</p>
          </div>

          <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 text-center space-y-3">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" alt="Operations" className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-purple-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Elena Rostova</h3>
            <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">Head of Operations</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Alpinist & community safety lead.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
