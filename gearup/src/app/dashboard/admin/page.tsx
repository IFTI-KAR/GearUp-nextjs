'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '@/lib/api-client';
import { User, GearItem, RentalOrder } from '@/lib/types';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';
import { 
  ShieldAlert, 
  Users, 
  Layers, 
  ShoppingBag, 
  DollarSign, 
  Search, 
  TrendingUp, 
  BarChart2, 
  PieChart as PieIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';

const REVENUE_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

const buildRevenueChart = (orders: RentalOrder[]) => {
  const revenue = new Map<string, number>();
  const rentals = new Map<string, number>();
  orders
    .filter(o => o.paymentStatus === 'COMPLETED' || o.status === 'PAID')
    .forEach(o => {
      const key = o.createdAt ? o.createdAt.slice(0, 7) : '2026-08';
      const label = new Date(`${key}-01T00:00:00`).toLocaleString('en-US', { month: 'short' });
      revenue.set(label, (revenue.get(label) || 0) + (Number(o.totalPrice) || 0));
      rentals.set(label, (rentals.get(label) || 0) + 1);
    });
  return REVENUE_MONTHS.map(month => ({ month, revenue: revenue.get(month) || 0, rentals: rentals.get(month) || 0 }));
};

const buildRoleDistribution = (users: User[]) => {
  const counts: Record<string, number> = {};
  users.forEach(u => { counts[u.role] = (counts[u.role] || 0) + 1; });
  return [
    { name: 'Customers', value: counts.CUSTOMER || 0, color: '#10b981' },
    { name: 'Providers', value: counts.PROVIDER || 0, color: '#06b6d4' },
    { name: 'Admins', value: counts.ADMIN || 0, color: '#f59e0b' },
  ];
};

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [userSearch, setUserSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

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

  const totalPages = Math.ceil(filteredUsers.length / pageSize) || 1;
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const totalVolume = ordersList.filter(o => o.paymentStatus === 'COMPLETED').reduce((sum, o) => sum + o.totalPrice, 0);
  const revenueChartData = buildRevenueChart(ordersList);
  const roleChartData = buildRoleDistribution(usersList);
  const growthPct = revenueChartData.length > 1
    ? Math.round(((revenueChartData[revenueChartData.length - 1].revenue - revenueChartData[0].revenue) / (revenueChartData[0].revenue || 1)) * 100)
    : 0;

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold">
            <ShieldAlert className="w-3.5 h-3.5" /> Admin Control Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Platform Analytics & Management</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Monitor revenue growth, user distribution, and moderate platform accounts</p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
          Admin: <span className="text-emerald-600 dark:text-emerald-400">{user?.email || 'admin@gearup.com'}</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-1 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Registered Users</span>
          <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{usersList.length}</span>
        </div>
        <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-1 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Active Gear Catalog</span>
          <span className="text-3xl font-black text-cyan-600 dark:text-cyan-400">{gearList.length}</span>
        </div>
        <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-1 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Rental Bookings</span>
          <span className="text-3xl font-black text-purple-600 dark:text-purple-400">{ordersList.length}</span>
        </div>
        <div className="p-6 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-1 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Gross Rental Volume</span>
          <span className="text-3xl font-black text-amber-600 dark:text-amber-400">${totalVolume}</span>
        </div>
      </div>

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Revenue Bar Chart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-emerald-500" /> Platform Gross Volume ($)
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{growthPct >= 0 ? `+${growthPct}%` : `${growthPct}%`} vs first period</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueChartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="revenue" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Distribution Pie Chart */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-4 shadow-sm flex flex-col justify-between">
          <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <PieIcon className="w-5 h-5 text-cyan-500" /> Role Distribution
          </h3>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roleChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {roleChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', color: '#fff', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2">
            {roleChartData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-bold text-slate-900 dark:text-white">{item.value} users</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Management Section with Pagination */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-500" /> Platform User Management
          </h2>

          <div className="flex items-center gap-3">
            <select
              value={roleFilter}
              onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }}
              className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="ALL">All Roles</option>
              <option value="CUSTOMER">Customers</option>
              <option value="PROVIDER">Providers</option>
              <option value="ADMIN">Admins</option>
            </select>

            <div className="relative w-48 sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search user..."
                value={userSearch}
                onChange={(e) => { setUserSearch(e.target.value); setCurrentPage(1); }}
                className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {loadingUsers ? (
          <div className="h-48 rounded-2xl bg-slate-200 dark:bg-slate-900 animate-pulse border border-slate-200 dark:border-slate-800" />
        ) : (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-100 dark:bg-slate-900/80 text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3 font-semibold">User Info</th>
                    <th className="p-3 font-semibold">Role</th>
                    <th className="p-3 font-semibold">Contact Phone</th>
                    <th className="p-3 font-semibold">Status</th>
                    <th className="p-3 font-semibold text-right">Moderation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {paginatedUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                            alt={u.name}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                          />
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block">{u.name}</span>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400">{u.email}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-3 whitespace-nowrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          u.role === 'ADMIN' 
                            ? 'bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-500/30'
                            : u.role === 'PROVIDER'
                            ? 'bg-cyan-100 dark:bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-300 dark:border-cyan-500/30'
                            : 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/30'
                        }`}>
                          {u.role}
                        </span>
                      </td>

                      <td className="p-3 whitespace-nowrap text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                        {u.phone || '+1 (555) 234-5678'}
                      </td>

                      <td className="p-3 whitespace-nowrap">
                        {u.status === 'ACTIVE' ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30">
                            Active
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400 border border-rose-300 dark:border-rose-500/30">
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
                              ? 'bg-rose-100 dark:bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-500/30 hover:bg-rose-200 dark:hover:bg-rose-500/30'
                              : 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/30 hover:bg-emerald-200 dark:hover:bg-emerald-500/30'
                          } disabled:opacity-40`}
                        >
                          {u.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination controls */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Showing {paginatedUsers.length} of {filteredUsers.length} users
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold text-slate-900 dark:text-white px-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 disabled:opacity-40"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
