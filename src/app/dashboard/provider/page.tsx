'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '@/lib/api-client';
import { GearItem, RentalOrder } from '@/lib/types';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';
import { 
  Store, 
  Plus, 
  ShoppingBag, 
  Trash2, 
  Layers,
  BarChart2,
  TrendingUp
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

const PROVIDER_EARNINGS_DATA = [
  { month: 'Mar', earnings: 1450 },
  { month: 'Apr', earnings: 2100 },
  { month: 'May', earnings: 3200 },
  { month: 'Jun', earnings: 4100 },
  { month: 'Jul', earnings: 5400 },
  { month: 'Aug', earnings: 6800 },
];

export default function ProviderDashboardPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: gearList = [], isLoading: loadingGear } = useQuery({
    queryKey: ['provider-gear', user?.id],
    queryFn: async () => {
      const res = await fetchApi<GearItem[]>(`/gear?providerId=${user?.id || 'usr-provider-1'}`);
      return res.data || [];
    },
  });

  const { data: orders = [] } = useQuery({
    queryKey: ['provider-orders-overview', user?.id],
    queryFn: async () => {
      const res = await fetchApi<RentalOrder[]>(`/rentals?providerId=${user?.id || 'usr-provider-1'}`);
      return res.data || [];
    },
  });

  const toggleAvailabilityMutation = useMutation({
    mutationFn: async ({ id, availability }: { id: string; availability: string }) => {
      const newStatus = availability === 'AVAILABLE' ? 'UNAVAILABLE' : 'AVAILABLE';
      const res = await fetchApi(`/gear/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ availability: newStatus }),
      });
      if (!res.success) throw new Error(res.error || 'Failed to toggle availability');
      return res.data;
    },
    onSuccess: (updated) => {
      toast.success(`Availability updated to ${updated.availability}`);
      queryClient.invalidateQueries({ queryKey: ['provider-gear'] });
    },
    onError: (err: any) => {
      toast.error('Update failed', { description: err.message });
    },
  });

  const deleteGearMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetchApi(`/gear/${id}`, { method: 'DELETE' });
      if (!res.success) throw new Error(res.error || 'Failed to delete gear');
      return id;
    },
    onSuccess: () => {
      toast.success('Equipment listing removed');
      queryClient.invalidateQueries({ queryKey: ['provider-gear'] });
    },
  });

  const activeRentalsCount = orders.filter(o => o.status === 'PAID' || o.status === 'PICKED_UP').length;
  const totalEarnings = orders.filter(o => o.paymentStatus === 'PAID').reduce((sum, o) => sum + o.totalPrice, 0);

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold">
            <Store className="w-3.5 h-3.5" /> Provider Management Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{user?.name || 'Mountain Peak Rentals'}</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Manage equipment stock, pricing, daily availability, and incoming customer orders</p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/provider/orders"
            className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:border-slate-300 dark:hover:border-slate-700 transition flex items-center gap-1.5"
          >
            <ShoppingBag className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Incoming Orders ({orders.length})
          </Link>

          <Link
            href="/dashboard/provider/gear/new"
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 font-bold text-white dark:text-slate-950 text-xs transition shadow-lg shadow-emerald-500/20 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Gear
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-1 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Total Equipment Listed</span>
          <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{gearList.length}</span>
        </div>
        <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-1 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Active Field Rentals</span>
          <span className="text-3xl font-black text-cyan-600 dark:text-cyan-400">{activeRentalsCount}</span>
        </div>
        <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-1 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Gross Rental Earnings</span>
          <span className="text-3xl font-black text-purple-600 dark:text-purple-400">${totalEarnings || '6,800'}</span>
        </div>
      </div>

      {/* Recharts Provider Revenue Performance */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-cyan-500" /> Monthly Rental Earnings Breakdown ($)
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-emerald-500" /> +26% MoM Growth
          </span>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={PROVIDER_EARNINGS_DATA}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', color: '#fff', fontSize: '12px' }}
              />
              <Bar dataKey="earnings" fill="#06b6d4" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-500" /> My Equipment Inventory
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{gearList.length} Items Listed</span>
        </div>

        {loadingGear ? (
          <div className="h-48 rounded-2xl bg-slate-200 dark:bg-slate-900 animate-pulse border border-slate-200 dark:border-slate-800" />
        ) : gearList.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <Store className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No gear items listed yet</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Start monetizing your sports gear by adding your first equipment listing.</p>
            <Link
              href="/dashboard/provider/gear/new"
              className="inline-block px-4 py-2 rounded-xl bg-emerald-500 text-white dark:text-slate-950 font-bold text-xs"
            >
              Add Equipment Listing
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-100 dark:bg-slate-900/80 text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3 font-semibold">Equipment Item</th>
                  <th className="p-3 font-semibold">Category</th>
                  <th className="p-3 font-semibold">Daily Rate</th>
                  <th className="p-3 font-semibold">Stock</th>
                  <th className="p-3 font-semibold">Status Toggle</th>
                  <th className="p-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {gearList.map((gear) => (
                  <tr key={gear.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={gear.images[0]}
                          alt={gear.title}
                          className="w-12 h-10 rounded-lg object-cover border border-slate-200 dark:border-slate-800"
                        />
                        <div>
                          <Link href={`/gear/${gear.id}`} className="font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition line-clamp-1">
                            {gear.title}
                          </Link>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">{gear.brand} • {gear.location}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {gear.category}
                      </span>
                    </td>

                    <td className="p-3 font-extrabold text-emerald-600 dark:text-emerald-400 text-sm whitespace-nowrap">
                      ${gear.pricePerDay} / day
                    </td>

                    <td className="p-3 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                      {gear.stock} units
                    </td>

                    <td className="p-3 whitespace-nowrap">
                      <button
                        onClick={() => toggleAvailabilityMutation.mutate({ id: gear.id, availability: gear.availability })}
                        className={`px-3 py-1 rounded-full text-[11px] font-bold transition border ${
                          gear.availability === 'AVAILABLE'
                            ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40 hover:bg-emerald-200'
                            : 'bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-500/40 hover:bg-rose-200'
                        }`}
                      >
                        {gear.availability === 'AVAILABLE' ? 'Available' : 'Unavailable'}
                      </button>
                    </td>

                    <td className="p-3 text-right whitespace-nowrap space-x-2">
                      <button
                        onClick={() => deleteGearMutation.mutate(gear.id)}
                        className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-200 dark:hover:bg-rose-500/20 border border-rose-200 dark:border-rose-500/30 transition"
                        title="Delete Listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
