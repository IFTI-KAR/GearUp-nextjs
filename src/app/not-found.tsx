import React from 'react';
import Link from 'next/link';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full glass-panel p-8 rounded-3xl border border-slate-800 text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/20">
          <Compass className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <span className="text-3xl font-black text-white">404</span>
          <h2 className="text-xl font-bold text-white">Page Not Found</h2>
          <p className="text-xs text-slate-400">The requested gear page or route does not exist.</p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Home
        </Link>
      </div>
    </div>
  );
}
