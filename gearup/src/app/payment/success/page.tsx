'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchApi } from '@/lib/api-client';
import { RentalOrder } from '@/lib/types';
import { CheckCircle2, ShieldCheck, ShoppingBag, ArrowRight } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('order_id');
  const paymentId = searchParams.get('payment_id') || `pay-${Date.now()}`;
  const gateway = searchParams.get('gateway') || 'STRIPE';

  const [order, setOrder] = useState<RentalOrder | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (orderId) {
      fetchApi(`/rentals/${orderId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          status: 'PAID',
          paymentStatus: 'COMPLETED',
          paymentId,
        }),
      }).then((res) => {
        if (res.success && res.data) {
          setOrder(res.data);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [orderId, paymentId]);

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center space-y-6">
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-2xl shadow-emerald-950/20">
        <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-bounce">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Transaction Approved</span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Payment Successful!</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Your rental equipment order has been confirmed and paid.</p>
        </div>

        {order && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-left space-y-2 text-xs">
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Order ID:</span>
              <span className="font-mono text-slate-900 dark:text-white font-bold">{order.id}</span>
            </div>
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Payment Ref:</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{paymentId}</span>
            </div>
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Gateway:</span>
              <span className="font-semibold text-slate-900 dark:text-white">{gateway}</span>
            </div>
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Item:</span>
              <span className="font-bold text-slate-900 dark:text-white truncate max-w-[180px]">{order.gearTitle}</span>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between text-sm font-extrabold text-slate-900 dark:text-white">
              <span>Total Paid</span>
              <span className="text-emerald-600 dark:text-emerald-400">${order.totalPrice}</span>
            </div>
          </div>
        )}

        <div className="pt-2 space-y-3">
          <Link
            href="/dashboard/customer"
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 text-white dark:text-slate-950 font-extrabold text-xs hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
          >
            Go to My Customer Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/gear"
            className="block text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
          >
            Rent Additional Gear
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="h-64 rounded-3xl bg-slate-200 dark:bg-slate-900 animate-pulse border border-slate-200 dark:border-slate-800" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
