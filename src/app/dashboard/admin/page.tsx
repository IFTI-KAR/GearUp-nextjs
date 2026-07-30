'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '@/lib/api-client';
import { User, GearItem, RentalOrder } from '@/lib/types';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';
import { format, parseISO } from 'date-fns';
import { 
  ShieldAlert, 
  Users, 
  Layers, 
  ShoppingBag, 
  DollarSign, 
  Search, 
  Ban, 
  CheckCircle2, 
  Tag, 
  Eye
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [userSearch, setUserSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');

  const { data: usersList = [], isLoading: loadingUsers } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const res = await fetchApi<User[]>('/admin/users');
      return res.data || [];
    },
  });

  const { data: gearList = [] } = useQuery({
    queryKey: ['admin-gear'],
    queryFn: async () => {
      const res = await fetchApi<GearItem[]>('/gear');
      return res.data || [];
    },
  });

  const { data: ordersList = [] } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const res = await fetchApi<RentalOrder[]>('/rentals');
      return res.data || [];
    },
  });

  const toggleUserStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'ACTIVE' | 'SUSPENDED' }) => {
      const newStatus = status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
      const res = await fetchApi(`/admin/users/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.success) throw new Error(res.error || 'Failed to update user status');
      return res.data;
    },
    onSuccess: (updated) => {
      toast.success(`User status updated to ${updated.status}`, {
        description: `User: ${updated.name}`,
      });
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
    onError: (err: any) => {
      toast.error('Admin action failed', { description: err.message });
    },
  });

  const filteredUsers = usersList.filter((u) => {
    const matchesQuery = u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesQuery && matchesRole;
  });

  const totalVolume = ordersList.filter(o => o.paymentStatus === 'PAID').reduce((sum, o) => sum + o.totalPrice, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold">
            <ShieldAlert className="w-3.5 h-3.5" /> Admin Moderation Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Platform Overview & Management</h1>
          <p className="text-xs text-slate-400">Oversee global platform health, moderate users, and inspect active gear listings</p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300">
          Admin Email: <span className="text-emerald-400">admin@gearup.com</span>
        </div>
      </div>

      {/* Platform Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Total Registered Users</span>
          <span className="text-3xl font-black text-white text-emerald-400">{usersList.length}</span>
        </div>
        <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Active Gear Listings</span>
          <span className="text-3xl font-black text-white text-cyan-400">{gearList.length}</span>
        </div>
        <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Total Rental Orders</span>
          <span className="text-3xl font-black text-white text-purple-400">{ordersList.length}</span>
        </div>
        <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Platform Rental Volume</span>
          <span className="text-3xl font-black text-white">${totalVolume}</span>
        </div>
      </div>

      {/* User Management Section */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-400" /> Platform User Management
          </h2>

          <div className="flex items-center gap-3">
            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="ALL">All Roles</option>
              <option value="CUSTOMER">Customers</option>
              <option value="PROVIDER">Providers</option>
              <option value="ADMIN">Admins</option>
            </select>

            {/* User Search */}
            <div className="relative w-48 sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search user name or email..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {loadingUsers ? (
          <div className="h-48 rounded-2xl bg-slate-900 animate-pulse border border-slate-800" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="p-3 font-semibold">User Info</th>
                  <th className="p-3 font-semibold">Platform Role</th>
                  <th className="p-3 font-semibold">Contact Phone</th>
                  <th className="p-3 font-semibold">Account Status</th>
                  <th className="p-3 font-semibold text-right">Moderation Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-900/40 transition">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                          alt={u.name}
                          className="w-9 h-9 rounded-full object-cover border border-slate-800"
                        />
                        <div>
                          <span className="font-bold text-white block">{u.name}</span>
                          <span className="text-[10px] text-slate-400">{u.email}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-3 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        u.role === 'ADMIN' 
                          ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                          : u.role === 'PROVIDER'
                          ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
                          : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                      }`}>
                        {u.role}
                      </span>
                    </td>

                    <td className="p-3 whitespace-nowrap text-slate-400 font-mono text-[11px]">
                      {u.phone || 'N/A'}
                    </td>

                    <td className="p-3 whitespace-nowrap">
                      {u.status === 'ACTIVE' ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          Active
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                          Suspended
                        </span>
                      )}
                    </td>

                    <td className="p-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => toggleUserStatusMutation.mutate({ id: u.id, status: u.status })}
                        disabled={u.role === 'ADMIN'}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition border ${
                          u.status === 'ACTIVE'
                            ? 'bg-rose-500/15 text-rose-300 border-rose-500/30 hover:bg-rose-500/30'
                            : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30'
                        } disabled:opacity-40`}
                      >
                        {u.status === 'ACTIVE' ? 'Suspend User' : 'Activate User'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Content Moderation Section */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" /> Platform Gear Listings Moderation
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gearList.map((item) => (
            <div key={item.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
              <img src={item.images[0]} alt={item.title} className="w-16 h-14 rounded-xl object-cover border border-slate-800" />
              <div className="flex-1 space-y-1">
                <span className="font-bold text-white text-xs block line-clamp-1">{item.title}</span>
                <span className="text-[10px] text-slate-400 block">{item.category} • ${item.pricePerDay}/day</span>
                <span className="text-[10px] text-cyan-400 font-semibold block">Owner: {item.providerName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
