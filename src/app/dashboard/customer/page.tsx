'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '@/lib/api-client';
import { RentalOrder } from '@/lib/types';
import { useAuth } from '@/lib/auth-context';
import { StatusBadge } from '@/components/status-badge';
import { toast } from 'sonner';
import { format, parseISO } from 'date-fns';
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  CreditCard, 
  Star, 
  ArrowRight, 
  XCircle, 
  Calendar,
  MessageSquare,
  Sparkles
} from 'lucide-react';

export default function CustomerDashboardPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [reviewModalOrder, setReviewModalOrder] = useState<RentalOrder | null>(null);
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>('');

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['customer-orders', user?.id],
    queryFn: async () => {
      const res = await fetchApi<RentalOrder[]>(`/rentals?customerId=${user?.id || 'usr-customer-1'}`);
      return res.data || [];
    },
  });

  const submitReviewMutation = useMutation({
    mutationFn: async () => {
      if (!reviewModalOrder) return;
      const res = await fetchApi('/reviews', {
        method: 'POST',
        body: JSON.stringify({
          gearId: reviewModalOrder.gearId,
          rentalId: reviewModalOrder.id,
          customerId: user?.id || 'usr-customer-1',
          customerName: user?.name || 'Alex Johnson',
          rating: reviewRating,
          comment: reviewComment,
        }),
      });
      if (!res.success) throw new Error(res.error || 'Failed to submit review');
      return res.data;
    },
    onSuccess: () => {
      toast.success('Thank you! Review submitted successfully.');
      setReviewModalOrder(null);
      setReviewComment('');
      queryClient.invalidateQueries({ queryKey: ['customer-orders'] });
    },
    onError: (err: any) => {
      toast.error('Review Error', { description: err.message });
    },
  });

  const activeRentals = orders.filter(o => o.status === 'PLACED' || o.status === 'CONFIRMED' || o.status === 'PAID' || o.status === 'PICKED_UP');
  const completedRentals = orders.filter(o => o.status === 'RETURNED');
  const totalSpent = orders.filter(o => o.paymentStatus === 'PAID').reduce((acc, o) => acc + o.totalPrice, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
            <ShoppingBag className="w-3.5 h-3.5" /> Customer Dashboard
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Welcome back, {user?.name || 'Alex'}!</h1>
          <p className="text-xs text-slate-400">Track your gear rentals, payment statuses, and submit gear reviews</p>
        </div>

        <Link
          href="/gear"
          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 font-bold text-slate-950 text-xs transition shadow-lg shadow-emerald-500/20 flex items-center gap-2 self-start sm:self-auto"
        >
          Rent More Gear <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Active Rentals</span>
          <span className="text-3xl font-black text-white text-emerald-400">{activeRentals.length}</span>
        </div>
        <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Completed Returns</span>
          <span className="text-3xl font-black text-white text-cyan-400">{completedRentals.length}</span>
        </div>
        <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Total Spent</span>
          <span className="text-3xl font-black text-white">${totalSpent}</span>
        </div>
      </div>

      {/* Orders Table Section */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-400" /> My Rental Orders History
        </h2>

        {isLoading ? (
          <div className="h-48 rounded-2xl bg-slate-900 animate-pulse border border-slate-800" />
        ) : orders.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <ShoppingBag className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-white">No rental orders placed yet</h3>
            <p className="text-xs text-slate-400">Explore our sports equipment catalog and start your adventure today.</p>
            <Link href="/gear" className="inline-block text-xs font-bold text-emerald-400 underline">
              Browse Equipment
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="p-3 font-semibold">Equipment</th>
                  <th className="p-3 font-semibold">Dates</th>
                  <th className="p-3 font-semibold">Total Price</th>
                  <th className="p-3 font-semibold">Order Status</th>
                  <th className="p-3 font-semibold">Payment</th>
                  <th className="p-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-900/40 transition">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={order.gearImage}
                          alt={order.gearTitle}
                          className="w-12 h-10 rounded-lg object-cover border border-slate-800"
                        />
                        <div>
                          <span className="font-bold text-white block line-clamp-1">{order.gearTitle}</span>
                          <span className="text-[10px] text-slate-500 font-mono">ID: {order.id}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-3 whitespace-nowrap">
                      <div className="flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{order.startDate} to {order.endDate}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">({order.totalDays} {order.totalDays === 1 ? 'day' : 'days'})</span>
                    </td>

                    <td className="p-3 font-extrabold text-white text-sm">
                      ${order.totalPrice}
                    </td>

                    <td className="p-3 whitespace-nowrap">
                      <StatusBadge status={order.status} />
                    </td>

                    <td className="p-3 whitespace-nowrap">
                      {order.paymentStatus === 'PAID' ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          Paid
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                          Pending
                        </span>
                      )}
                    </td>

                    <td className="p-3 text-right whitespace-nowrap">
                      {order.status === 'CONFIRMED' && order.paymentStatus !== 'PAID' && (
                        <Link
                          href={`/dashboard/customer/orders/${order.id}/pay`}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition shadow-md shadow-emerald-500/20 inline-flex items-center gap-1"
                        >
                          <CreditCard className="w-3.5 h-3.5" /> Pay Now
                        </Link>
                      )}

                      {order.status === 'RETURNED' && (
                        <button
                          onClick={() => setReviewModalOrder(order)}
                          className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 font-bold text-xs transition inline-flex items-center gap-1"
                        >
                          <Star className="w-3.5 h-3.5 fill-cyan-300" /> Leave Review
                        </button>
                      )}

                      {order.status === 'PLACED' && (
                        <span className="text-[11px] text-amber-400 font-medium italic">
                          Awaiting Provider Confirmation
                        </span>
                      )}

                      {order.status === 'PAID' && (
                        <span className="text-[11px] text-purple-400 font-medium italic">
                          Ready for Pick Up
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

      {/* Review Modal */}
      {reviewModalOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md glass-panel p-6 rounded-3xl border border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" /> Leave Equipment Review
              </h3>
              <button
                onClick={() => setReviewModalOrder(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-400 block font-medium">Equipment</span>
              <p className="text-xs font-bold text-white">{reviewModalOrder.gearTitle}</p>
            </div>

            {/* Star selector */}
            <div className="space-y-1">
              <span className="text-xs text-slate-400 block font-medium">Rating</span>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewRating(star)}
                    className="p-1 hover:scale-110 transition"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= reviewRating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div className="space-y-1">
              <span className="text-xs text-slate-400 block font-medium">Your Feedback / Review</span>
              <textarea
                rows={3}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="How was the equipment condition and rental process?"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setReviewModalOrder(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => submitReviewMutation.mutate()}
                disabled={submitReviewMutation.isPending || !reviewComment.trim()}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs hover:bg-emerald-400 transition disabled:opacity-50"
              >
                {submitReviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
