'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';
import { ShieldAlert, Mail, Save, Lock } from 'lucide-react';

export default function AdminProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || 'System Administrator');
  const [email] = useState(user?.email || 'admin@gearup.com');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Admin credentials saved.');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Admin Profile & Permissions</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">System superuser profile</p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-6 shadow-sm">
        <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-xl">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h2 className="font-extrabold text-lg text-slate-900 dark:text-white">{name}</h2>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-bold">SUPERADMIN ACCESS LEVEL</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Admin Display Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Superadmin Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-500 dark:text-slate-400 cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-white dark:text-slate-950 font-bold text-xs transition shadow-md shadow-amber-500/20 flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}
