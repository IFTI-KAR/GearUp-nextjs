import React from 'react';
import { OrderStatus } from '@/lib/types';

interface StatusBadgeProps {
  status: OrderStatus;
  size?: 'sm' | 'md' | 'lg';
}

const STATUS_CONFIG: Record<OrderStatus, { label: string; className: string }> = {
  PLACED: {
    label: 'Order Placed',
    className: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  },
  CONFIRMED: {
    label: 'Confirmed',
    className: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  },
  PAID: {
    label: 'Paid',
    className: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  },
  PICKED_UP: {
    label: 'Picked Up',
    className: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  },
  RETURNED: {
    label: 'Returned',
    className: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
  },
  CANCELLED: {
    label: 'Cancelled',
    className: 'bg-red-500/15 text-red-400 border-red-500/30',
  },
};

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] || { label: status, className: 'bg-slate-700 text-slate-300' };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1 font-medium',
    lg: 'text-sm px-3 py-1.5 font-semibold',
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full border ${config.className} ${sizeClasses} shadow-sm backdrop-blur-md`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse" />
      {config.label}
    </span>
  );
}
