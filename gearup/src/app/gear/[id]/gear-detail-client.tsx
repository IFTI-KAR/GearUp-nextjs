'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '@/lib/api-client';
import { GearItem, Review } from '@/lib/types';
import { useAuth } from '@/lib/auth-context';
import { GearCard } from '@/components/gear-card';
import { toast } from 'sonner';
import { format, addDays, differenceInDays, parseISO } from 'date-fns';
import { 
  Star, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  User, 
  CheckCircle2, 
  ArrowLeft,
  ShoppingBag,
  Sparkles
} from 'lucide-react';

export default function GearDetailClient() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [startDate, setStartDate] = useState(format(addDays(new Date(), 1), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState(format(addDays(new Date(), 4), 'yyyy-MM-dd'));

  const { data, isLoading } = useQuery({
    queryKey: ['gear-detail', id],
    queryFn: async () => {
      const res = await fetchApi<GearItem & { reviews: Review[] }>(`/gear/${id}`);
      return res.data;
    },
  });

  const { data: allGear = [] } = useQuery({
    queryKey: ['all-gear-related'],
    queryFn: async () => {
      const res = await fetchApi<GearItem[]>('/gear');
      return res.data || [];
    },
  });

  const relatedGear = allGear.filter(g => g.id !== id && (g.category === data?.category || g.brand === data?.brand)).slice(0, 3);

  const placeOrderMutation = useMutation({
    mutationFn: async () => {
      const res = await fetchApi('/rentals', {
        method: 'POST',
        body: JSON.stringify({
          gearId: id,
          startDate,
          endDate,
        }),
      });
      if (!res.success) throw new Error(res.error || 'Failed to place rental order');
      return res.data;
    },
    onSuccess: (order) => {
      toast.success('Rental order placed successfully! Provider will confirm shortly.', {
        description: `Order ID: ${order.id}`,
      });
      queryClient.invalidateQueries({ queryKey: ['customer-orders'] });
      router.push('/dashboard/customer');
    },
    onError: (err: any) => {
      toast.error('Booking failed', { description: err.message });
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <div className="h-96 rounded-3xl bg-slate-200 dark:bg-slate-900 animate-pulse border border-slate-200 dark:border-slate-800" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Gear item not found</h2>
        <button onClick={() => router.push('/gear')} className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
          Return to Catalog
        </button>
      </div>
    );
  }

  const start = parseISO(startDate);
  const end = parseISO(endDate);
  const totalDays = Math.max(1, differenceInDays(end, start));
  const rentalSubtotal = data.pricePerDay * totalDays;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Left (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden glass-panel border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
              <Image
                src={data.images[activeImageIdx] || data.images[0]}
                alt={data.name}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
                priority
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900/80 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                  {data.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900/80 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
                  {data.brand}
                </span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {data.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {data.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition ${
                      activeImageIdx === idx ? 'border-emerald-500 scale-105' : 'border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="Thumbnail" fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Specs */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-6 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-500" /> Location: {data.location}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                  <Star className="w-4 h-4 fill-amber-400" /> {data.rating} ({data.reviewCount} reviews)
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{data.name}</h1>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">About this Equipment</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{data.description}</p>
            </div>

            {/* Technical Specifications */}
            <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(data.specifications || {}).map(([key, val]) => (
                  <div key={key} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">{key}</span>
                    <span className="font-bold text-slate-900 dark:text-white">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Provider Card */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{data.providerName}</h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Verified Equipment Owner</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified Shop
              </span>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" /> Customer Reviews ({data.reviews?.length || 0})
            </h3>

            {(!data.reviews || data.reviews.length === 0) ? (
              <p className="text-xs text-slate-500 dark:text-slate-400 italic">No customer reviews yet. Be the first to rent and review this item!</p>
            ) : (
              <div className="space-y-4">
                {data.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{rev.customerName}</span>
                      <div className="flex items-center gap-1 text-amber-400 text-xs">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 italic">"{rev.comment}"</p>
                    <span className="text-[10px] text-slate-400 block">
                      {format(parseISO(rev.createdAt), 'MMM dd, yyyy')}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Rental Booking Sidebar (4 cols) */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 space-y-6 shadow-xl">
            {/* Price Header */}
            <div className="flex items-baseline justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">${data.pricePerDay}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400"> / day</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Deposit</span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">${data.deposit} (Refundable)</span>
              </div>
            </div>

            {/* Date Pickers */}
            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-500" /> Select Rental Dates
              </label>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">Start Date</span>
                  <input
                    type="date"
                    min={format(new Date(), 'yyyy-MM-dd')}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">End Date</span>
                  <input
                    type="date"
                    min={startDate}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span>${data.pricePerDay} × {totalDays} {totalDays === 1 ? 'day' : 'days'}</span>
                <span className="font-semibold text-slate-900 dark:text-white">${rentalSubtotal}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span>Security Deposit (Hold)</span>
                <span className="font-semibold text-slate-500 dark:text-slate-400">${data.deposit}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-sm font-bold text-slate-900 dark:text-white">
                <span>Rental Total</span>
                <span className="text-emerald-600 dark:text-emerald-400 text-lg">${rentalSubtotal}</span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => placeOrderMutation.mutate()}
              disabled={placeOrderMutation.isPending || data.status !== 'ACTIVE'}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 font-extrabold text-white dark:text-slate-950 hover:from-emerald-600 hover:to-teal-500 transition shadow-lg shadow-emerald-500/25 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              {placeOrderMutation.isPending ? 'Processing Rental...' : 'Rent Equipment Now'}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Instant Confirmation • Cancel Anytime</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Items Section */}
      {relatedGear.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Similar Outdoor Equipment You Might Like</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedGear.map((gear) => (
              <GearCard key={gear.id} gear={gear} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
