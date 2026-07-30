'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '@/lib/api-client';
import { GearItem } from '@/lib/types';
import { GearCard } from '@/components/gear-card';
import { 
  Search, 
  Sparkles, 
  Bike, 
  Tent, 
  Waves, 
  Snowflake, 
  Dumbbell, 
  Mountain, 
  ShieldCheck, 
  CalendarCheck, 
  CreditCard,
  ArrowRight,
  Star,
  Users,
  CheckCircle2
} from 'lucide-react';

const CATEGORIES = [
  { name: 'Cycling', icon: Bike, color: 'from-emerald-500 to-teal-600', count: '120+ Items' },
  { name: 'Camping', icon: Tent, color: 'from-amber-500 to-orange-600', count: '250+ Items' },
  { name: 'Water Sports', icon: Waves, color: 'from-cyan-500 to-blue-600', count: '90+ Items' },
  { name: 'Winter Sports', icon: Snowflake, color: 'from-indigo-500 to-purple-600', count: '140+ Items' },
  { name: 'Fitness & Gym', icon: Dumbbell, color: 'from-rose-500 to-pink-600', count: '180+ Items' },
  { name: 'Climbing', icon: Mountain, color: 'from-lime-500 to-emerald-700', count: '75+ Items' },
];

export default function HomePage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: gearData, isLoading } = useQuery({
    queryKey: ['featured-gear'],
    queryFn: async () => {
      const res = await fetchApi<GearItem[]>('/gear');
      return res.data || [];
    },
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/gear?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push('/gear');
    }
  };

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Banner */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        {/* Glow backdrop shapes */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[250px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold backdrop-blur-md shadow-sm">
              <Sparkles className="w-4 h-4" /> Next-Gen Sports & Outdoor Rental Marketplace
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Rent Premium Sports & <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Outdoor Gear Instantly
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Skip the heavy equipment purchase. Browse top mountain bikes, camping gear, paddle boards, and snowboards with flexible daily rentals & verified local providers.
            </p>

            {/* Interactive Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="mt-8 flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl glass-panel border border-slate-700/80 shadow-2xl shadow-emerald-950/30 max-w-2xl mx-auto"
            >
              <div className="relative flex-1 w-full flex items-center px-3">
                <Search className="w-5 h-5 text-emerald-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search mountain bike, tent, paddle board, Burton..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent border-none px-3 py-3 text-sm text-white placeholder-slate-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 font-bold text-slate-950 hover:from-emerald-400 hover:to-teal-300 transition shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 shrink-0"
              >
                Find Gear <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Popular Search tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 pt-2">
              <span className="font-semibold text-slate-500">Popular:</span>
              <button onClick={() => router.push('/gear?search=Trek')} className="hover:text-emerald-400 transition">Trek Bike</button>
              <span>•</span>
              <button onClick={() => router.push('/gear?search=MSR')} className="hover:text-emerald-400 transition">MSR Tent</button>
              <span>•</span>
              <button onClick={() => router.push('/gear?search=SUP')} className="hover:text-emerald-400 transition">Paddle Board</button>
              <span>•</span>
              <button onClick={() => router.push('/gear?search=Burton')} className="hover:text-emerald-400 transition">Snowboard</button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Explore by Category</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">High-end sports equipment tailored for every outdoor adventure</p>
          </div>
          <Link
            href="/gear"
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            View All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                onClick={() => router.push(`/gear?category=${encodeURIComponent(cat.name)}`)}
                className="group p-5 rounded-2xl glass-card text-center flex flex-col items-center justify-center space-y-3 cursor-pointer hover:-translate-y-1 transition duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${cat.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] text-slate-400 block mt-0.5">{cat.count}</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Equipment Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Top Rated Gear
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Featured Outdoor Equipment</h2>
          </div>
          <Link
            href="/gear"
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 hover:text-white hover:border-slate-700 transition"
          >
            Browse Full Catalog ({gearData?.length || 6} items)
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 rounded-2xl bg-slate-900/60 animate-pulse border border-slate-800" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gearData?.slice(0, 6).map((gear) => (
              <GearCard key={gear.id} gear={gear} />
            ))}
          </div>
        )}
      </section>

      {/* How it Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-800/80 relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Seamless Experience</span>
            <h2 className="text-3xl font-extrabold text-white">How GearUp Works</h2>
            <p className="text-sm text-slate-400">Rent premium gear in 3 simple steps with complete buyer safety</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black text-xl">
                <CalendarCheck className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white">1. Select Dates & Gear</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose your adventure gear and pick your exact rental date range using our interactive calendar preventing overlaps.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-black text-xl">
                <CreditCard className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white">2. Provider Confirmation & Pay</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Provider confirms item availability. Complete instant 256-bit encrypted checkout via Stripe or SSLCommerz.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-black text-xl">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white">3. Pick Up & Enjoy</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pick up equipment from verified local shop locations. Return after your trip and leave a community review!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Statistics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-6 rounded-2xl glass-card border border-slate-800">
            <span className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent block">1,250+</span>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1 block">Active Gear Listings</span>
          </div>
          <div className="p-6 rounded-2xl glass-card border border-slate-800">
            <span className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent block">99.4%</span>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1 block">On-Time Fulfillment</span>
          </div>
          <div className="p-6 rounded-2xl glass-card border border-slate-800">
            <span className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent block">14,800+</span>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1 block">Completed Rentals</span>
          </div>
          <div className="p-6 rounded-2xl glass-card border border-slate-800">
            <span className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent block">4.9 / 5</span>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1 block">Customer Satisfaction</span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Loved by Athletes & Explorers</h2>
          <p className="text-xs text-slate-400 mt-1">See what verified outdoor enthusiasts have to say about GearUp</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "Renting the Trek mountain bike saved me $4,000 for a weekend trip to Colorado. The bike was tuned perfectly and pickup was super easy!"
            </p>
            <div className="flex items-center gap-3 pt-2">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
              <div>
                <h4 className="text-xs font-bold text-white">Alex Johnson</h4>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Verified Customer</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "As a gear rental shop owner, GearUp gave us 40% more monthly rental orders. Managing inventory and order updates from the provider dashboard is seamless."
            </p>
            <div className="flex items-center gap-3 pt-2">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
              <div>
                <h4 className="text-xs font-bold text-white">Mountain Peak Rentals</h4>
                <span className="text-[10px] text-cyan-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Verified Provider</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "Rented a 3-person tent and stand-up paddleboard for our family lake camping trip. Everything arrived in clean, top condition."
            </p>
            <div className="flex items-center gap-3 pt-2">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
              <div>
                <h4 className="text-xs font-bold text-white">David Miller</h4>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Verified Customer</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
