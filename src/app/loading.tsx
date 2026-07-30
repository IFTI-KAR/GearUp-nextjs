import React from 'react';
import { Dumbbell } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center text-slate-950 font-bold animate-bounce shadow-lg shadow-emerald-500/20">
        <Dumbbell className="w-6 h-6 -rotate-45" />
      </div>
      <span className="text-xs font-bold text-slate-400 tracking-wider uppercase animate-pulse">
        Loading GearUp Equipment...
      </span>
    </div>
  );
}
