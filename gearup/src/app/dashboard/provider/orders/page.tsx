'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '@/lib/api-client';
import { RentalOrder, OrderStatus } from '@/lib/types';
import { useAuth } from '@/lib/auth-context';
import { StatusBadge } from '@/components/status-badge';
import { toast } from 'sonner';
import { 
  ShoppingBag, 
  CheckCircle2, 
  Truck, 
  RotateCcw, 
  ArrowLeft, 
  User, 
  Calendar,
  DollarSign
} from 'lucide-react';

export default function ProviderOrdersPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['provider-incoming-orders', user?.id],
    queryFn: async () => {
      const res = await fetchApi<RentalOrder[]>(`/rentals?providerId=${user?.id || 'usr-provider-1'}`);
      return res.data || [];
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: OrderStatus }) => {
      const res = await fetchApi(`/rentals/${orderId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      if (!res.success) throw new Error(res.error || 'Failed to update order status');
      return res.data;
    },
    onSuccess: (updatedOrder) => {
      toast.success(`Order Status Updated: ${updatedOrder.status}`, {
        description: `Order #${updatedOrder.id} is now ${updatedOrder.status}`,
      });
      queryClient.invalidateQueries({ queryKey: ['provider-incoming-orders'] });
      queryClient.invalidateQueries({ queryKey: ['provider-orders-overview'] });
    },
    onError: (err: any) => {
      toast.error('Status update failed', { description: err.message });
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <button
        onClick={() => history.back()}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard Overview
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold mb-2">
            <ShoppingBag className="w-3.5 h-3.5" /> Order Fulfillment
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Manage Incoming Rental Orders</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Confirm new requests, mark items as picked up or returned</p>
        </div>

        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl">
          {orders.length} Total Rental Orders
        </span>
      </div>

      {/* Orders Table */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
        {isLoading ? (
          <div className="h-64 rounded-2xl bg-slate-200 dark:bg-slate-900 animate-pulse border border-slate-200 dark:border-slate-800" />
        ) : orders.length === 0 ? (
          <div className="text-center py-12 space-y-2">
            <ShoppingBag className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No incoming orders yet</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">When customers place rental bookings for your gear, they will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-100 dark:bg-slate-900/80 text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3 font-semibold">Order & Equipment</th>
                  <th className="p-3 font-semibold">Customer</th>
                  <th className="p-3 font-semibold">Dates & Days</th>
                  <th className="p-3 font-semibold">Total Revenue</th>
                  <th className="p-3 font-semibold">Status</th>
                  <th className="p-3 font-semibold text-right">Provider Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={order.gearImage}
                          alt={order.gearTitle}
                          className="w-12 h-10 rounded-lg object-cover border border-slate-200 dark:border-slate-800"
                        />
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white block line-clamp-1">{order.gearTitle}</span>
                          <span className="text-[10px] text-slate-400 font-mono">ID: #{order.id}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white block">{order.customerName}</span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">{order.customerEmail}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-3 whitespace-nowrap">
                      <div className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-200">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{order.startDate} to {order.endDate}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold">({order.totalDays} days)</span>
                    </td>

                    <td className="p-3 font-extrabold text-emerald-600 dark:text-emerald-400 text-sm whitespace-nowrap">
                      ${order.totalPrice}
                    </td>

                    <td className="p-3 whitespace-nowrap">
                      <StatusBadge status={order.status} />
                    </td>

                    <td className="p-3 text-right whitespace-nowrap">
                      {order.status === 'PLACED' && (
                        <button
                          onClick={() => updateStatusMutation.mutate({ orderId: order.id, status: 'CONFIRMED' })}
                          disabled={updateStatusMutation.isPending}
                          className="px-3.5 py-1.5 rounded-xl bg-cyan-500 text-white dark:text-slate-950 font-extrabold text-xs hover:bg-cyan-400 transition shadow-md shadow-cyan-500/20 inline-flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Confirm Order
                        </button>
                      )}

                      {order.status === 'CONFIRMED' && (
                        <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-medium italic">
                          Awaiting Customer Payment
                        </span>
                      )}

                      {order.status === 'PAID' && (
                        <button
                          onClick={() => updateStatusMutation.mutate({ orderId: order.id, status: 'PICKED_UP' })}
                          disabled={updateStatusMutation.isPending}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-white dark:text-slate-950 font-extrabold text-xs hover:bg-emerald-400 transition shadow-md shadow-emerald-500/20 inline-flex items-center gap-1"
                        >
                          <Truck className="w-3.5 h-3.5" /> Mark Picked Up
                        </button>
                      )}

                      {order.status === 'PICKED_UP' && (
                        <button
                          onClick={() => updateStatusMutation.mutate({ orderId: order.id, status: 'RETURNED' })}
                          disabled={updateStatusMutation.isPending}
                          className="px-3.5 py-1.5 rounded-xl bg-slate-600 dark:bg-slate-700 text-white font-extrabold text-xs hover:bg-slate-500 dark:hover:bg-slate-600 transition inline-flex items-center gap-1"
                        >
                          <RotateCcw className="w-3.5 h-3.5" /> Mark Returned
                        </button>
                      )}

                      {order.status === 'RETURNED' && (
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> Rental Fulfilled
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}