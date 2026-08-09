import React from 'react';
import { Metadata } from 'next';
import { FileText, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | GearUp',
  description: 'Terms and conditions governing the use of GearUp sports and outdoor rental platform.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold">
          <FileText className="w-4 h-4" /> Legal Terms
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">Terms of Service</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Effective Date: August 1, 2026</p>
      </div>

      <div className="glass-panel border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 rounded-3xl p-8 space-y-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed shadow-sm">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">1. Platform Scope & User Responsibilities</h2>
          <p>GearUp provides a marketplace matching equipment owners (Providers) with equipment renters (Customers). Renters agree to inspect all equipment upon pickup and report any defects immediately prior to use.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">2. Rental Period & Return Deadlines</h2>
          <p>Renters must return equipment at or before the scheduled return time. Late returns without prior provider agreement incur a late fee equivalent to 1.5x the daily rental rate for each additional day.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">3. Security Deposits & Damage Policy</h2>
          <p>Providers may set a refundable security deposit. In the event of minor wear and tear, no fees apply. In cases of severe negligence, loss, or theft, the renter is liable for repair or replacement cost up to the fair market value of the item.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">4. Cancellation & Refunds</h2>
          <p>Cancellations requested 48 hours or more before the rental start date receive a 100% full refund. Cancellations made within 24 to 48 hours receive a 50% refund.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">5. Limitation of Liability</h2>
          <p>GearUp is not responsible for injuries or accidents occurring during outdoor activities. Adventurers use sports equipment at their own risk and are advised to wear appropriate safety helmets, protective padding, and life jackets.</p>
        </section>
      </div>
    </div>
  );
}
