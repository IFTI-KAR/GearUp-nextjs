'use client';

import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/lib/auth-context';
import { UserRole } from '@/lib/types';
import { toast } from 'sonner';
import { Dumbbell, Mail, User, Phone, ShieldCheck, ArrowRight } from 'lucide-react';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Please enter a valid email address'),
  role: z.enum(['CUSTOMER', 'PROVIDER', 'ADMIN'] as const),
  phone: z.string().optional(),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register: registerUser, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'CUSTOMER',
      phone: '',
    },
  });

  const selectedRole = watch('role');

  const onSubmit = async (values: RegisterFormValues) => {
    const res = await registerUser(values.name, values.email, values.role, values.phone);
    if (res.success) {
      toast.success('Registration successful!', {
        description: `Welcome to GearUp as a ${values.role}`,
      });
    } else {
      toast.error('Registration Error', { description: res.error });
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl shadow-emerald-950/20">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center text-slate-950 font-bold mx-auto shadow-lg shadow-emerald-500/20">
            <Dumbbell className="w-6 h-6 -rotate-45" />
          </div>
          <h2 className="text-2xl font-black text-white">Create GearUp Account</h2>
          <p className="text-xs text-slate-400">Join thousands of athletes & gear providers today</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 block text-center">Select Your Account Role</label>
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900 border border-slate-800 rounded-2xl">
            <button
              type="button"
              onClick={() => setValue('role', 'CUSTOMER')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center gap-1 ${
                selectedRole === 'CUSTOMER'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Customer</span>
              <span className="text-[10px] font-normal opacity-80">Rent Sports Gear</span>
            </button>

            <button
              type="button"
              onClick={() => setValue('role', 'PROVIDER')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center gap-1 ${
                selectedRole === 'PROVIDER'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Provider</span>
              <span className="text-[10px] font-normal opacity-80">List Gear Inventory</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                {...register('name')}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                placeholder="Alex Johnson"
              />
            </div>
            {errors.name && <p className="text-[11px] text-red-400 font-medium">{errors.name.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                {...register('email')}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                placeholder="alex@example.com"
              />
            </div>
            {errors.email && <p className="text-[11px] text-red-400 font-medium">{errors.email.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">Phone Number (Optional)</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                {...register('phone')}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-extrabold hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
          >
            {isLoading ? 'Creating Account...' : 'Complete Registration'}{' '}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-400">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-emerald-400 font-bold hover:underline">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}
