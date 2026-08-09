'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { Bell, Lock, Shield, Eye, Save } from 'lucide-react';

export default function CustomerSettingsPage() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  const handleSaveSettings = () => {
    toast.success('Account settings saved!');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Account Settings</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Configure notifications, password security, and privacy preferences</p>
      </div>

      <div className="space-y-6">
        {/* Notifications Section */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-4 shadow-sm">
          <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-500" /> Notifications & Alerts
          </h3>
          
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 cursor-pointer">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">Email Rental Updates</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Receive confirmations, return reminders, and shop messages via email.</span>
              </div>
              <input
                type="checkbox"
                checked={emailNotifs}
                onChange={(e) => setEmailNotifs(e.target.checked)}
                className="w-4 h-4 text-emerald-500 rounded accent-emerald-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 cursor-pointer">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">SMS Notifications</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Instant SMS alerts when provider confirms or item is ready for pickup.</span>
              </div>
              <input
                type="checkbox"
                checked={smsNotifs}
                onChange={(e) => setSmsNotifs(e.target.checked)}
                className="w-4 h-4 text-emerald-500 rounded accent-emerald-500"
              />
            </label>
          </div>
        </div>

        {/* Security Section */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-4 shadow-sm">
          <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-500" /> Security & Authentication
          </h3>

          <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 cursor-pointer">
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">Two-Factor Authentication (2FA)</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Add an extra layer of protection using authenticator app or SMS code.</span>
            </div>
            <input
              type="checkbox"
              checked={twoFactor}
              onChange={(e) => setTwoFactor(e.target.checked)}
              className="w-4 h-4 text-emerald-500 rounded accent-emerald-500"
            />
          </label>
        </div>

        <button
          onClick={handleSaveSettings}
          className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white dark:text-slate-950 font-bold text-xs transition shadow-md shadow-emerald-500/20 flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> Save Preferences
        </button>
      </div>
    </div>
  );
}
