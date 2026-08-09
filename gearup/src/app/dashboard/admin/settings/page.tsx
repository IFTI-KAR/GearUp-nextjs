'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { ShieldAlert, Save, Lock, Database } from 'lucide-react';

export default function AdminSettingsPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [commissionFee, setCommissionFee] = useState('10');

  const handleSave = () => {
    toast.success('Platform global settings saved!');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Platform System Settings</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Global commission rates, marketplace maintenance, and security parameters</p>
      </div>

      <div className="space-y-6">
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-4 shadow-sm">
          <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <Database className="w-5 h-5 text-amber-500" /> Financial & Marketplace Parameters
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Platform Commission Fee (%)</label>
            <input
              type="number"
              value={commissionFee}
              onChange={(e) => setCommissionFee(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 max-w-xs"
            />
          </div>

          <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 cursor-pointer">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Maintenance Mode</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Temporarily pause new rental checkout bookings.</span>
            </div>
            <input
              type="checkbox"
              checked={maintenanceMode}
              onChange={(e) => setMaintenanceMode(e.target.checked)}
              className="w-4 h-4 text-amber-500 rounded accent-amber-500"
            />
          </label>
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-white dark:text-slate-950 font-bold text-xs transition shadow-md shadow-amber-500/20 flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> Save System Settings
        </button>
      </div>
    </div>
  );
}
