'use client';

import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full glass-panel p-8 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-500 dark:text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto shadow-lg shadow-rose-500/20">
          <AlertCircle className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Something went wrong!</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {error.message || 'An unexpected error occurred while rendering this page.'}
          </p>
        </div>
        <button
          onClick={() => reset()}
          className="w-full py-3 rounded-xl bg-emerald-500 text-white dark:text-slate-950 font-bold text-xs hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Try Again
        </button>
      </div>
    </div>
  );
}
