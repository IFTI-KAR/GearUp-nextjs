'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';

function CancelContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('order_id');

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center space-y-6">
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-6 shadow-2xl shadow-rose-950/20">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto shadow-lg shadow-rose-500/20">
          <AlertCircle className="w-9 h-9" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-400">Checkout Cancelled</span>
          <h1 className="text-2xl font-black text-white">Payment Was Not Completed</h1>
          <p className="text-xs text-slate-400">
            You exited the payment process before finishing. No charges were made to your account.
          </p>
        </div>

        <div className="pt-2 space-y-3">
          {orderId ? (
            <Link
              href={`/dashboard/customer/orders/${orderId}/pay`}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Retry Payment Now
            </Link>
          ) : null}

          <Link
            href="/dashboard/customer"
            className="w-full py-3.5 px-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-800 transition flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Customer Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="h-64 rounded-3xl bg-slate-900 animate-pulse border border-slate-800" />
      </div>
    }>
      <CancelContent />
    </Suspense>
  );
}
