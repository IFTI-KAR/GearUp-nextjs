'use client';

import React from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { BarChart3, TrendingUp, DollarSign, Users, ShoppingBag } from 'lucide-react';

const MONTHLY_GROWTH = [
  { month: 'Jan', revenue: 4200, users: 120, rentals: 48 },
  { month: 'Feb', revenue: 5600, rentals: 62, users: 180 },
  { month: 'Mar', revenue: 7800, rentals: 84, users: 290 },
  { month: 'Apr', revenue: 9400, rentals: 105, users: 410 },
  { month: 'May', revenue: 12500, rentals: 142, users: 580 },
  { month: 'Jun', revenue: 15800, rentals: 178, users: 740 },
  { month: 'Jul', revenue: 18400, rentals: 210, users: 890 },
  { month: 'Aug', revenue: 21200, rentals: 245, users: 933 },
];

const CATEGORY_SHARE = [
  { name: 'Cycling', value: 38, color: '#10b981' },
  { name: 'Camping', value: 27, color: '#06b6d4' },
  { name: 'Water Sports', value: 18, color: '#8b5cf6' },
  { name: 'Winter Sports', value: 12, color: '#f59e0b' },
  { name: 'Other', value: 5, color: '#ec4899' },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold">
          <BarChart3 className="w-3.5 h-3.5" /> Platform Intelligence
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Detailed Analytics & Growth Reports</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Track financial trajectory, active user registration velocity, and category breakdowns</p>
      </div>

      {/* Revenue & Rental Line Chart */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-4 shadow-sm">
        <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-500" /> Platform Revenue & User Growth Trend
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MONTHLY_GROWTH}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', color: '#fff', fontSize: '12px' }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} name="Revenue ($)" />
              <Line type="monotone" dataKey="users" stroke="#06b6d4" strokeWidth={2} name="Total Users" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Share & Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-4 shadow-sm">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Category Market Share (%)</h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={CATEGORY_SHARE} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={4} dataKey="value">
                  {CATEGORY_SHARE.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-4 shadow-sm flex flex-col justify-center">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Key Performance Indicators</h3>
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
              <span className="text-xs text-slate-600 dark:text-slate-400">Average Order Value</span>
              <span className="font-extrabold text-slate-900 dark:text-white text-base">$86.50</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
              <span className="text-xs text-slate-600 dark:text-slate-400">Repeat Rental Rate</span>
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-base">42.8%</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
              <span className="text-xs text-slate-600 dark:text-slate-400">Dispute Resolution Rate</span>
              <span className="font-extrabold text-cyan-600 dark:text-cyan-400 text-base">99.1%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
