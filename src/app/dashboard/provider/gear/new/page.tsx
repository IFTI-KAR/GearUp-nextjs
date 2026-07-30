'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { fetchApi } from '@/lib/api-client';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';
import { Store, ArrowLeft, Image as ImageIcon, Plus } from 'lucide-react';

const CATEGORIES = ['Cycling', 'Camping', 'Water Sports', 'Winter Sports', 'Fitness & Gym', 'Climbing'];

const gearSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  category: z.string().min(1, 'Please select a category'),
  brand: z.string().min(1, 'Brand is required'),
  pricePerDay: z.coerce.number().min(1, 'Daily rate must be at least $1'),
  deposit: z.coerce.number().min(0, 'Deposit must be 0 or greater'),
  stock: z.coerce.number().min(1, 'Stock must be at least 1 unit'),
  location: z.string().min(2, 'Location is required'),
  imageUrl: z.string().url('Please enter a valid image URL').or(z.string().min(5)),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
});

type GearFormValues = z.infer<typeof gearSchema>;

export default function AddGearPage() {
  const router = useRouter();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<GearFormValues>({
    resolver: zodResolver(gearSchema),
    defaultValues: {
      title: '',
      category: 'Cycling',
      brand: 'Trek',
      pricePerDay: 35,
      deposit: 100,
      stock: 2,
      location: 'Boulder, CO',
      imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1000&q=80',
      description: 'High quality sports equipment ready for rental. Maintained and inspected regularly.',
    },
  });

  const previewUrl = watch('imageUrl');

  const onSubmit = async (values: GearFormValues) => {
    const res = await fetchApi('/gear', {
      method: 'POST',
      body: JSON.stringify({
        ...values,
        images: [values.imageUrl],
        providerId: user?.id || 'usr-provider-1',
        providerName: user?.name || 'Mountain Peak Rentals',
        providerEmail: user?.email || 'provider@gearup.com',
      }),
    });

    if (res.success) {
      toast.success('Equipment listed successfully!');
      router.push('/dashboard/provider');
    } else {
      toast.error('Listing failed', { description: res.error });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Provider Portal
      </button>

      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 space-y-8 shadow-2xl shadow-cyan-950/20">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold">
            <Store className="w-3.5 h-3.5" /> Provider Form
          </div>
          <h1 className="text-2xl font-black text-white">List New Rental Equipment</h1>
          <p className="text-xs text-slate-400">Add equipment details, daily rental rate, security deposit, and image URL</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title & Brand */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">Equipment Title</label>
              <input
                type="text"
                {...register('title')}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                placeholder="e.g. Specialized Trail Mountain Bike"
              />
              {errors.title && <p className="text-[11px] text-red-400 font-medium">{errors.title.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">Brand / Manufacturer</label>
              <input
                type="text"
                {...register('brand')}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                placeholder="e.g. Specialized, Burton, MSR"
              />
              {errors.brand && <p className="text-[11px] text-red-400 font-medium">{errors.brand.message}</p>}
            </div>
          </div>

          {/* Category & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">Category</label>
              <select
                {...register('category')}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">Pickup Location / City</label>
              <input
                type="text"
                {...register('location')}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                placeholder="e.g. Denver, CO"
              />
              {errors.location && <p className="text-[11px] text-red-400 font-medium">{errors.location.message}</p>}
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">Daily Rental Rate ($)</label>
              <input
                type="number"
                {...register('pricePerDay')}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 font-extrabold text-emerald-400"
              />
              {errors.pricePerDay && <p className="text-[11px] text-red-400 font-medium">{errors.pricePerDay.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">Refundable Deposit ($)</label>
              <input
                type="number"
                {...register('deposit')}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300 block">Available Units / Stock</label>
              <input
                type="number"
                {...register('stock')}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Image URL & Live Preview */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">Equipment Image URL</label>
            <input
              type="text"
              {...register('imageUrl')}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
            {previewUrl && (
              <div className="mt-2 relative w-48 h-32 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                <span className="absolute bottom-1 right-1 text-[10px] bg-slate-950/80 px-1.5 py-0.5 rounded text-slate-300">
                  Image Preview
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">Description & Specs</label>
            <textarea
              rows={4}
              {...register('description')}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            {errors.description && <p className="text-[11px] text-red-400 font-medium">{errors.description.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-emerald-500 text-slate-950 font-extrabold hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
          >
            <Plus className="w-5 h-5" />
            {isSubmitting ? 'Publishing Listing...' : 'Publish Equipment Listing'}
          </button>
        </form>
      </div>
    </div>
  );
}
