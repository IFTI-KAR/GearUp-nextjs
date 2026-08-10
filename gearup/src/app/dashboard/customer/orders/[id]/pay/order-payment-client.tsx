'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchApi } from '@/lib/api-client';
import { RentalOrder } from '@/lib/types';
import { toast } from 'sonner';
import { CreditCard, ShieldCheck, Lock, ArrowRight, ArrowLeft } from 'lucide-react';

export default function OrderPaymentClient() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  const [gateway, setGateway] = useState<'STRIPE' | 'SSLCOMMERZ'>('STRIPE');

  const { data: order, isLoading } = useQuery({
    queryKey: ['order-payment-detail', orderId],
    queryFn: async () => {
      const res = await fetchApi<RentalOrder>(`/rentals/${orderId}`);
      return res.data;
    },
  });

  const payMutation = useMutation({
    mutationFn: async () => {
      const res = await fetchApi('/payments/create', {
        method: 'POST',
        body: JSON.stringify({ rentalOrderId: orderId, method: gateway }),
      });
      if (!res.success) throw new Error(res.error || 'Payment creation failed');
      return res.data;
    },
    onSuccess: (data) => {
      toast.success('Redirecting to payment gateway...', {
        description: `Gateway: ${gateway}`,
      });
      // Redirect to checkout URL
      window.location.href = data.checkoutUrl;
    },
    onError: (err: any) => {
      toast.error('Payment initiation error', { description: err.message });
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4">
        <div className="h-80 rounded-3xl bg-slate-200 dark:bg-slate-900 animate-pulse border border-slate-200 dark:border-slate-800" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Order not found</h2>
        <button onClick={() => router.push('/dashboard/customer')} className="text-emerald-600 dark:text-emerald-400 text-xs font-bold">
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl shadow-slate-200/50 dark:shadow-emerald-950/20">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              <Lock className="w-3 h-3" /> Secure 256-Bit SSL Payment
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white mt-1">Complete Rental Checkout</h1>
          </div>
          <CreditCard className="w-8 h-8 text-emerald-500 dark:text-emerald-400" />
        </div>

        {/* Order Breakdown */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={order.gearImage} alt={order.gearTitle} className="w-14 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-800" />
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">{order.gearTitle}</h3>
              <span className="text-xs text-slate-500 dark:text-slate-400 block font-mono">Order #{order.id}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1 text-xs">
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Rental Period ({order.totalDays} days)</span>
              <span>{order.startDate} to {order.endDate}</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Daily Rate</span>
              <span>${order.pricePerDay} / day</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Provider</span>
              <span>{order.providerName}</span>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex justify-between text-base font-extrabold text-slate-900 dark:text-white">
              <span>Total Payment Amount</span>
              <span className="text-emerald-600 dark:text-emerald-400">${order.totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Gateway Selection */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
            Select Payment Gateway
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setGateway('STRIPE')}
              className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
                gateway === 'STRIPE'
                  ? 'bg-emerald-500/10 border-emerald-500 text-slate-900 dark:text-white ring-1 ring-emerald-500/40'
                  : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <span className="font-extrabold text-sm text-slate-900 dark:text-white">Stripe Checkout</span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">Visa, MasterCard, Amex</span>
            </button>

            <button
              type="button"
              onClick={() => setGateway('SSLCOMMERZ')}
              className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
                gateway === 'SSLCOMMERZ'
                  ? 'bg-cyan-500/10 border-cyan-500 text-slate-900 dark:text-white ring-1 ring-cyan-500/40'
                  : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <span className="font-extrabold text-sm text-slate-900 dark:text-white">SSLCommerz</span>
              <span className="text-[11px] text-cyan-600 dark:text-cyan-400 mt-1">Local & Global Cards</span>
            </button>
          </div>
        </div>

        {/* Action button */}
        <button
          onClick={() => payMutation.mutate()}
          disabled={payMutation.isPending}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 font-black text-white dark:text-slate-950 hover:from-emerald-400 hover:to-teal-300 transition shadow-lg shadow-emerald-500/25 disabled:opacity-50 flex items-center justify-center gap-2 text-base"
        >
          {payMutation.isPending ? 'Connecting Gateway...' : `Proceed with ${gateway} ($${order.totalPrice})`}
          <ArrowRight className="w-5 h-5" />
        </button>

        <div className="text-center text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          <span>Encrypted payment connection. Guarantee full refund on cancellation.</span>
        </div>
      </div>
    </div>
  );
}