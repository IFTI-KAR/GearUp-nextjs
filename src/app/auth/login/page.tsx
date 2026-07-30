'use client';

import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/lib/auth-context';
import { UserRole } from '@/lib/types';
import { toast } from 'sonner';
import { Dumbbell, Mail, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  role: z.enum(['CUSTOMER', 'PROVIDER', 'ADMIN'] as const).default('CUSTOMER'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login, quickLogin, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'customer@gearup.com',
      role: 'CUSTOMER',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    const res = await login(values.email, values.role);
    if (res.success) {
      toast.success('Logged in successfully!');
    } else {
      toast.error('Authentication Error', { description: res.error });
    }
  };

  const handleQuickDemo = (role: UserRole) => {
    quickLogin(role);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl shadow-emerald-950/20">
        {/* Brand logo header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center text-slate-950 font-bold mx-auto shadow-lg shadow-emerald-500/20">
            <Dumbbell className="w-6 h-6 -rotate-45" />
          </div>
          <h2 className="text-2xl font-black text-white">Welcome Back to GearUp</h2>
          <p className="text-xs text-slate-400">Sign in to access your rental dashboard & orders</p>
        </div>

        {/* 1-Click Quick Demo Login Box */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
            <Zap className="w-4 h-4 fill-emerald-400" /> 1-Click Quick Demo Login:
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs font-medium">
            <button
              type="button"
              onClick={() => handleQuickDemo('CUSTOMER')}
              className="py-2 px-2 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 transition text-center"
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('PROVIDER')}
              className="py-2 px-2 rounded-xl bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/25 transition text-center"
            >
              Provider
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('ADMIN')}
              className="py-2 px-2 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 transition text-center"
            >
              Admin
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                {...register('email')}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                placeholder="customer@gearup.com"
              />
            </div>
            {errors.email && <p className="text-[11px] text-red-400 font-medium">{errors.email.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">Account Role</label>
            <select
              {...register('role')}
              className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="CUSTOMER">Customer (Rent Equipment)</option>
              <option value="PROVIDER">Provider (List Equipment)</option>
              <option value="ADMIN">Admin (Moderator)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-extrabold hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
          >
            {isLoading ? 'Signing In...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-400">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-emerald-400 font-bold hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
