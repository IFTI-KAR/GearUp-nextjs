'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { Bell, CreditCard, Shield, Save } from 'lucide-react';

export default function ProviderSettingsPage() {
  const [instantBooking, setInstantBooking] = useState(true);
  const [payoutMethod, setPayoutMethod] = useState('Stripe Direct Deposit');
  const [orderAlerts, setOrderAlerts] = useState(true);

  const handleSave = () => {
    toast.success('Provider business settings updated!');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Provider Business Settings</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Configure payout accounts, booking preferences, and order alerts</p>
      </div>

      <div className="space-y-6">
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-4 shadow-sm">
          <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-cyan-500" /> Payout & Banking Configuration
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Active Payout Method</label>
              <select
                value={payoutMethod}
                onChange={(e) => setPayoutMethod(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="Stripe Direct Deposit">Stripe Direct Deposit (Express Payouts)</option>
                <option value="SSLCommerz Merchant Account">SSLCommerz Bank Transfer</option>
                <option value="PayPal Business">PayPal Merchant Account</option>
              </select>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-4 shadow-sm">
          <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-500" /> Booking Rules
          </h3>

          <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 cursor-pointer">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Auto-Approve Instant Bookings</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Allow customers to instantly confirm rentals without manual provider approval.</span>
            </div>
            <input
              type="checkbox"
              checked={instantBooking}
              onChange={(e) => setInstantBooking(e.target.checked)}
              className="w-4 h-4 text-cyan-500 rounded accent-cyan-500"
            />
          </label>
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white dark:text-slate-950 font-bold text-xs transition shadow-md shadow-cyan-500/20 flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> Save Business Settings
        </button>
      </div>
    </div>
  );
}
